$(function () {
  const loginStatus = $('#header_loginStatus').val()
  if (loginStatus == '1') {
    getPoint();
  }
})

/** ページジャンプ/ブラウザ履歴処理 */
function pageJump(url) {
  $("#loadingOverlay").show();
  history.pushState({page: window.location.href}, "", window.location.href);
  window.location.replace(url);
}

/** ポイント購入ボタン押下処理 */
function pointPurchase() {
  const loginStatus = $('#header_loginStatus').val()
  if (loginStatus == '1') {
    this.pageJump(window.location.origin
    + com.bitware.toreca_web._POINT_PURCHASE_URL);
  } else {
    pageJump(window.location.origin + com.bitware.toreca_web._LOGIN_URL)
  }

}

//TOPリンク押下時
function topBtn() {
  this.pageJump(window.location.origin + com.bitware.toreca_web._TOP_URL);
}

function toMyPage() {
  this.pageJump(window.location.origin + com.bitware.toreca_web._MY_PAGE_URL);
}

function toInvite() {
  this.pageJump(window.location.origin + com.bitware.toreca_web._INVITE_URL);
}

function toMyCard() {
  this.pageJump(window.location.origin + com.bitware.toreca_web._MY_CARD_URL);
}

function toLogin() {
  pageJump(window.location.origin + com.bitware.toreca_web._LOGIN_URL)
}

function toMyItem() {
  this.pageJump(window.location.origin + com.bitware.toreca_web._MY_ITEM_URL);
}

function getPoint() {
  $.ajax({
    type: 'GET',
    cache: false,
    url: window.location.origin + com.bitware.toreca_web._GET_MY_POINT_API,
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    async: false,
    success: function (data) {
      const currency = data.holdingPoint.toLocaleString();
      $('#point_amount').text(currency + "Pt")
      const currencyMile = data.holdingMile.toLocaleString();
      $('#mile_amount').text(currencyMile + "Mile")
    },
  }).catch(function (xhr, textStatus, errorThrown) {
  	if (xhr.responseText == 'userLocked') {
        pageJump(window.location.origin + com.bitware.toreca_web._LOGIN_URL+'?status=9');
    } else if (xhr.responseText == 'maintenance') {
       	pageJump(window.location.origin + '/maintenance');
    }
  });
}

/* ログアウト実行 */
function logout() {
  const self = this
  $("#dialog").dialog({
    autoOpen: false,
    minWidth: 360,
    //minHeight: 200,
    height: 260,
    modal: true,
    title: " ",
    open: function () {
      $('body').css('overflow', 'hidden');
      $('.cover').css('display', '')
    },
    close: function () {
      $('body').css('overflow', 'auto');
      $('.cover').css('display', 'none')
    },
    buttons: {
      "OK": function () {
        $.ajax({
          type: 'DELETE',
          cache: false,
          url: window.location.origin + com.bitware.toreca_web._LOGOUT_URL,
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          async: false,
          success: function (data) {
            self.pageJump(window.location.origin
            + com.bitware.toreca_web._TOP_URL);
          },
        }).catch(function (xhr, textStatus, errorThrown) {
          // pageJump(window.location.origin + jp.co.nippan.rakuden._SYSTEM_ERROR_URL);
        });
      },
      "キャンセル": function () {
        $(this).dialog("close");
      }
    }
  })
  $("#dialogMsg").text("ログアウトしますか");
  dialogOpen()
  $("#dialog").dialog("open");
}

function dialogOpen() {
  const $dialog = $('.ui-widget.ui-widget-content');
  if ($dialog.find('.dialog_card2').length > 0) {
    const dialog_card2 = $('.dialog_card2');
    $dialog.children().last().appendTo(dialog_card2);
  } else {
    $dialog.addClass('dialog_card');
    const $newWrapper = $('<div class="dialog_card2"></div>');
    $dialog.children().appendTo($newWrapper);
    $dialog.append($newWrapper);
  }
}

/* メールボックスフォーマットの検証 */
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

function hiddenMenu() {
  $('#drawer_input').prop('checked', false);
  document.removeEventListener('touchmove', preventTouchMove, {passive: false});
}

function checkOrientation() {
  const menuNavElement = document.getElementById('menu_nav')
  if (menuNavElement != null) {
    if (window.orientation === 0 || window.orientation === 180) {
      menuNavElement.classList.remove('menu_horizontal_screen')
    } else if (window.orientation === 90 || window.orientation === -90) {
      menuNavElement.classList.add('menu_horizontal_screen')
    }
  }
}

function preventTouchMove(e) {
  e.preventDefault();
}

$(function () {
  document.removeEventListener('touchmove', preventTouchMove, {passive: false});
  $('#drawer_input').on('change', function () {
    if ($(this).prop('checked')) {
        var navContentElements = document.getElementsByClassName("nav_content");
        var elements = document.querySelectorAll(".parentH");
        //var menuElement = document.querySelector('.menu'); // 
        //var distanceToRight = window.innerWidth - menuElement.getBoundingClientRect().left;
        //console.log("distanceToRight：" + distanceToRight + "px");
        for (var i = 0; i < navContentElements.length; i++) {
            // navContentElements[i].style.paddingRight = distanceToRight + 18 +"px";
            navContentElements[i].style.width = window.innerWidth * 0.6 - (window.innerWidth - elements[0].offsetWidth) / 2 + "px";
        }
        document.addEventListener('touchmove', preventTouchMove, { passive: false });
    } else {
        document.removeEventListener('touchmove', preventTouchMove, { passive: false });
    }
  });

  checkOrientation();
  window.addEventListener("orientationchange", function () {
    checkOrientation()
  });
  /*var is_mobi = true;
  is_mobi = navigator.userAgent.toLowerCase().match(/(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i) != null;
  if (document.getElementsByTagName("header")[0]) {
    if (is_mobi) {
      $('.company')[0].style.marginTop = "5px"
      $('.com_name')[0].style.marginTop = "5px"
    }else {
      // $('.company')[0].style.marginTop = "5px"
      $('.obj_name')[0].style.marginTop = "5px"
    }
  }*/
  headerWidthAuto()
})
  window.addEventListener('resize', headerWidthAuto);

  function headerWidthAuto() {
    const windowWidth = window.innerWidth;
    const elements = document.querySelectorAll(".parentH");
    const footerElements = document.querySelectorAll(".parentF");

    elements.forEach(element => {
       element.style.width = windowWidth + 'px';
     if (windowWidth > 600) {
        element.style.width = 600 + 'px';
      }
      if (windowWidth <= 300) {
        element.style.width = 300 + 'px';
      }
    });
    footerElements.forEach(element => {
       element.style.width = windowWidth + 'px';
     if (windowWidth > 600) {
        element.style.width = 600 + 'px';
      }
      if (windowWidth <= 300) {
        element.style.width = 300 + 'px';
      }
    });
	var footerContainer = document.querySelector('.footer_container');
	if (footerContainer) {
		if (windowWidth > 500) {
		footerContainer.style.marginLeft = 'auto';
		footerContainer.style.marginRight = 'auto';
	} else {
		footerContainer.style.marginLeft = '0';
		footerContainer.style.marginRight = '0';
	 }
	}
  }
  
window.addEventListener("unload", function(event) {
    $("#loadingOverlay").hide();
});