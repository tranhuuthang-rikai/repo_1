function toOripaDetail(oripaId) {
  $("#loadingOverlay").show();
  window.location.href = window.location.origin
      + com.bitware.toreca_web._ORIPA_DETAIL_URL + "?oripaId=" + oripaId;
}

function callback(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // フラッシュ効果
      const shineElements = entry.target.getElementsByClassName("shine")
      for (let item of shineElements) {
        item.classList.add("shine_animation")
      }

      //テキストのアニメーション
      // const charElements = entry.target.getElementsByClassName("char")
      // for (let item of charElements) {
      //   item.classList.add("char_animation")
      // }

    } else {
      //フラッシュ効果
      const shineElements = entry.target.getElementsByClassName("shine")
      for (let item of shineElements) {
        item.classList.remove("shine_animation")
      }

      //テキストのアニメーション
      // const charElements = entry.target.getElementsByClassName("char")
      // for (let item of charElements) {
      //   item.classList.remove("char_animation")
      // }

    }
  });
}

$(function () {
  const status = $('#top_status').val();
  const msg = $('#top_msg').val();

  const signUpAuthSuccessDialog = function () {
    $("#dialog").dialog({
      autoOpen: false,
      minWidth: 360,
      //minHeight: 200,
      height: 260,
      modal: true,
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
          $(this).dialog("close");
          pageJump(window.location.origin + com.bitware.toreca_web._LOGIN_URL)
        }
      }
    });
    $("#dialogMsg").text(msg);
    dialogOpen()
    $("#dialog").dialog("open");
  }

  if (msg != '' && msg != null) {
    signUpAuthSuccessDialog();
  }

  function cardWidthAuto() {
    const windowWidth = window.innerWidth;
    const elements = document.querySelectorAll(".oripa_card_detail");
    const slider = document.querySelectorAll(".parent");

    elements.forEach(element => {
      element.style.height = windowWidth - 30 + 'px';
      if (windowWidth > 600) {
        element.style.height = 600 - 30 + 'px';
      }
      if (windowWidth <= 300) {
        element.style.height = 300 - 30 + 'px';
      }
    });

      slider[0].style.height = windowWidth - 30 + 'px';
      if (windowWidth > 600) {
        slider[0].style.height = 600 - 30 + 'px';
       }
      if (windowWidth <= 300) {
        slider[0].style.height = 300 - 20 + 'px';
       }
    const right = document.querySelectorAll(".right");
    const left = document.querySelectorAll(".left");
	if (windowWidth > 400) {
  		if (!(navigator.userAgent.indexOf('iPhone') > 0 || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0))
    	left[0].style.top = '47%';
  		right[0].style.top = '47%';
	} else {
  		left[0].style.top = '45%';
  		right[0].style.top = '45%';
	}
  }

  cardWidthAuto()

  window.addEventListener('resize', cardWidthAuto);

  Splitting();

  //IntersectionObserver
  const options = {
    root: null, //ブラウザビューポートを参照領域として使用する
    rootMargin: "0px", // オフセットなし
    threshold: [0], // コールバックをトリガする5つのしきい値
  };
  const observer = new IntersectionObserver(callback, options);
  const elements = document.getElementsByClassName("oripa_card_detail")
  for (let i = 0; i < elements.length; i++) {
    observer.observe(elements[i])
  }

  const imageOptions = {
    rootMargin: "0px 0px 600px 0px",
    threshold: [0], // コールバックをトリガする5つのしきい値
  };
  const imageObserver = new IntersectionObserver(imageCallback, imageOptions);
  for (let i = 0; i < elements.length; i++) {
    imageObserver.observe(elements[i])
  }

  function imageCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const backgroundUrl = entry.target.getAttribute('data-background-img');
        entry.target.style.background = 'url(' + backgroundUrl
            + ') no-repeat center center';
        entry.target.style.backgroundSize = 'cover';
        entry.target.removeAttribute('data-background-img');

        const lazyImages = entry.target.querySelectorAll('img[data-src]');
        for (const lazyImage of lazyImages) {
          const imgSrc = lazyImage.getAttribute('data-src');

          if (imgSrc) {
            lazyImage.setAttribute('src', imgSrc);
            lazyImage.removeAttribute('data-src');
          }
        }

        imageObserver.unobserve(entry.target);
      }
    });
  }

})
