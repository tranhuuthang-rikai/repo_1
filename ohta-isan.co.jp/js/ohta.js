$(document).ready(function (){

  // mv 順番で出る
  $('.close-btn,.movie-modal').on('click',function(){
    $('.sct-mv').addClass('js_ac');
    $('.sct-chase').addClass('js_ac');
    $('html').removeClass('ovr');
  });

  $(window).on('load', function() {

    // スクロールで要素を表示する
    $(window).on('scroll',function(){
      $('.js-tar,section').each(function(){
        var elemPos = $(this).offset().top;
        scroll = $(window).scrollTop();
        windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 300){
          $(this).addClass('js_ac');
        }
      });
      $('.cat-members,.campaign-prize,.campaign-prize-sp,.campaign-unmem,.page-top').each(function(){
        var elemPos = $(this).offset().top;
        scroll = $(window).scrollTop();
        windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100){
          $(this).addClass('js_ac');
        }
      });
      $('.sct-spMovie').each(function(){
        var elemPos = $(this).offset().top;
            scroll = $(window).scrollTop();
            windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 40){
          $('.sct-spMovie').addClass('active');
        }
      });
      $('.nav-content').each(function(){
        var elemPos = $(this).offset().top;
            scroll = $(window).scrollTop();
            windowHeight = $(window).height();
        if (scroll > 1){
          $(this).addClass('show');
        }else {
          $(this).removeClass('show');
        }
      });
    });
  });

  // Youtube再生モーダル
  var link = $('.play-content').find('iframe');
  $('.call-movie').on('click',function(){
    var cod = $(this).data('cod');
        src = 'https://www.youtube.com/embed/'+cod+'?rel=0&modestbranding=1';
    link.attr('src',src);
    $('.movie-modal').addClass('active');
  });
  $('.close-btn,.movie-modal').on('click',function(){
        src = '';
    $('.movie-modal').removeClass('active');
    link.attr('src',src);
  });

  // スムーズスクロール
  $('a[href^="#"]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html, body').animate({scrollTop:position}, speed, '');
    return false;
  });

  // もっと見るボタン
  var news = $('.news');
  var youtube = $('.youtube2');
  $('.more-news').on('click',function(){
    var that = $(this);
    var p = $(this).find('p');
    var icon = $(this).find('.icon-loading');
    p.hide();
    icon.show();
    setTimeout(function(){
      news.show();
      that.css('visibility','hidden');
      p.show();
      icon.hide();
    },500);
  });
    
    var cooking = $('.cooking_dn');
    var youtube = $('.youtube2');
    $('.more-cooking').on('click',function(){
        var that = $(this);
        var p = $(this).find('p');
        var icon = $(this).find('.icon-loading');
        p.hide();
        icon.show();
        setTimeout(function(){
            cooking.show();
            that.css('display','none');
            p.show();
            icon.hide();
        },500);
    });

  $('.more-youtube').on('click',function(){
    var that = $(this);
    var p = $(this).find('p');
    var icon = $(this).find('.icon-loading');
    p.hide();
    icon.show();
    setTimeout(function(){
      youtube.show();
      that.css('visibility','hidden');
      p.show();
      icon.hide();
    },500);
  });

  // ハンバーガーメニュー
  $('.hamburger,.menu-list li a').on('click',function(){
    $('.hamburger').toggleClass('active').addClass('wait');
    $('.menu-list').slideToggle(500);
    setTimeout(function(){
      $('.hamburger').removeClass('wait');
    },500);
  });
});