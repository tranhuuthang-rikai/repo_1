// タブレット以上のサイズでviewport固定
$(function(){
    var ua = navigator.userAgent;
    if((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)){
        $('head').prepend('<meta name="viewport" content="width=device-width,initial-scale=1">');
        // Pace.on('done', function () {
          $('#loadWrap').fadeOut();
          sliderMV();

        // });
        
    } else {
        $('head').prepend('<meta name="viewport" content="width=1350">');
        // Pace.on('done', function () {
          $('#loadWrap').fadeOut();
          sliderMV();

        // });
    }
  /*------------------------*/
  //slick slider
  /*------------------------*/

});

function sliderMV() {
  $('.slider').slick({
    autoplay: true,
    arrows: false,
    infinite: true,
    speed: 2000,
    fade: true,
    pauseOnHover: false,
    cssEase: 'linear',
    lazyLoad: 'ondemand'

  });
}


// Ainmation
$(window).on('load scroll', function(){
	// itemのinnerをセレクタに指定
	var elem = $('.anime');
	elem.each(function () {
	var isActv = 'isActv';
	var elemOffset = $(this).offset().top;
	var scrollPos = $(window).scrollTop();
	var wh = $(window).height();
	
	if(scrollPos > elemOffset - wh + (wh / 10)){
	  $(this).addClass(isActv);
	}
  });
  
  var elemSolo = $('.solo-anime');
  elemSolo.each(function () {
	var isActv = 'isActv';
    var elemOffsetSolo = $(this).offset().top;
    var scrollPosSolo = $(window).scrollTop();
	var wh = $(window).height();
	
    if (scrollPosSolo > elemOffsetSolo - wh + (wh / 10)){
	  $(this).addClass(isActv);
	}
  });
});

// footer_SNS

// SNSボタンを追加するエリア
var footer_snsArea = document.getElementById('footer-sns-area');
 
// シェア時に使用する値
var shareUrl = 'https://sucorn.koikeya.co.jp/'; // 現在のページURLを使用する場合 location.href;
var shareText = '湖池屋 スコーン #スコーン｜株式会社湖池屋'; // 現在のページタイトルを使用する場合 document.title;
 
generate_share_button(footer_snsArea, shareUrl, shareText);
 
// シェアボタンを生成する関数
function generate_share_button(area, url, text) {
    // シェアボタンの作成
    var f_twBtn = document.createElement('li');
    f_twBtn.className = 'footer-twitter-btn';
    var f_fbBtn = document.createElement('li');
    f_fbBtn.className = 'footer-facebook-btn';
    var f_liBtn = document.createElement('li');
    f_liBtn.className = 'footer-line-btn';
 
    // 各シェアボタンのリンク先
    var twHref = 'https://twitter.com/share?text='+encodeURIComponent(text)+'&url='+encodeURIComponent(url);
    var fbHref = 'http://www.facebook.com/share.php?u='+encodeURIComponent(url);
    var liHref = 'https://line.me/R/msg/text/?'+encodeURIComponent(text)+' '+encodeURIComponent(url);
 
    // シェアボタンにリンクを追加
    var clickEv = 'onclick="popupWindow(this.href); return false;"';
    var twLink = '<a href="' + twHref + '" ' + clickEv + '><img src="https://koikeya.co.jp/images/socialmedia/icon_twitter.svg" alt="Twitter"></a>';
    var fbLink = '<a href="' + fbHref + '" ' + clickEv + '><img src="https://koikeya.co.jp/images/socialmedia/icon_facebook.svg" alt="Facebook"></a>';
    var liLink = '<a href="' + liHref + '" target="_blank"><img src="https://koikeya.co.jp/images/socialmedia/icon_line.svg" alt="LINE"></a>';
    f_twBtn.innerHTML = twLink;
    f_fbBtn.innerHTML = fbLink;
    f_liBtn.innerHTML = liLink;
 
    // シェアボタンを表示
    area.appendChild(f_twBtn);
    area.appendChild(f_fbBtn);
    area.appendChild(f_liBtn);
}
 
// クリック時にポップアップで表示させる関数
function popupWindow(url) {
    window.open(url, '', 'width=580,height=400,menubar=no,toolbar=no,scrollbars=yes');
}


$windowWidth = window.innerWidth;

$breakPointA = 768;
$breakPointB = 1024;

isMobileSize = ($windowWidth < $breakPointA);
// isTabletSize = ($windowWidth <= $breakPointB) && ($windowWidth > $breakPointA);
isPcSize = ($windowWidth >= $breakPointA);



$(window).scroll(function () {
  if ($(window).scrollTop() > 400) {
    $('.bnrWrapper').fadeIn().addClass('active');
  } else {
    $('.bnrWrapper').fadeOut();
  }
});



// NaV
$(function () {
  $('.menu').on('click', function () {
    $('body,html').toggleClass('menu-open');
    $('.menu__line').toggleClass('active');
    $('.gnav').fadeToggle();
  });
  $('.gnav__menu__item a').on('click', function () {
    $('.gnav').fadeToggle();
    $('.menu__line').removeClass('active');
    $('body,html').toggleClass('menu-open');
  });
});



// // //右クリック禁止
$(document).on('contextmenu', function (e) {
  return false;
});
//画像のドラッグ&ドロップ禁止処理
$('img').mousedown(
  function (e) {
    e.preventDefault();
  }
);
$('img').mouseup(
  function (e) {
    e.preventDefault();
  }
);



// Magnific Popup Movie用

$('.movie_iframe-link').magnificPopup({
  type: 'iframe',
  mainClass: 'youtubeWrap',
  removalDelay: 200,
  preloader: false,
  fixedContentPos: true,
  showCloseBtn: false,
  removalDelay: 200,
  iframe: {
    markup: '<div class="mfp-iframe-scaler iframe_h">' +
      '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
      '<div id="movie04"></div>' +
      '</div>'
  },
  // // 開いたとき背景スクロール固定
  callbacks: {
    open: function () {
      console.log('open')
      scrollPosition = $(window).scrollTop();
      $('body').addClass('fixed').css({ 'top': -scrollPosition });
      $('body').addClass('movieH');
      // closeBtn();

    },
    close: function () {
      $('body').removeClass('fixed').css({ 'top': 0 });
      window.scrollTo(0, scrollPosition);
    }
  }
});
$(document).on("click", ".movie_iframe-link", function (e) {
  $(".mfp-iframe-scaler").append('<div class="modalClose mfp-close"><span class="modalClose__line top"></span><span class="modalClose__line bottom"></span></div>');

});