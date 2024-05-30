
var searchBox = ".search-box"; // 絞り込む項目を選択するエリア
var listItem = ".list_item"; // 絞り込み対象のアイテム
var hideClass = "is-hide"; // 絞り込み対象外の場合に付与されるclass名
var disableClass = "is-disable";

$(function () {
	// 絞り込み項目を変更した時
	$(document).on("change", searchBox + " input", function () {
		search_filter();
	});
});

/**
 * リストの絞り込みを行う
 */
function search_filter() {
	// 年代と薄毛のタイプの両方が選択されているか確認
	var ageSelected = get_selected_input_items("d_age").length > 0;
	var typeSelected = get_selected_input_items("d_type").length > 0;

	// 両方選択されていなければ、全てのアイテムと.plan_04を非表示にする
	if (!ageSelected || !typeSelected) {
		$(listItem).addClass(hideClass);
		$(".plan_04").addClass(hideClass);
		return;
	}

	// 非表示状態を解除
	$(".plan_04").removeClass(hideClass);
	$(listItem).removeClass(hideClass);
	$("#d_type01").removeClass(disableClass);
	$("#d_type02").removeClass(disableClass);
	$("#d_age04").removeClass(disableClass);

	for (var i = 0; i < $(searchBox).length; i++) {
		var name = $(searchBox).eq(i).find("input").attr("name");
		// 選択されている項目を取得
		var searchData = get_selected_input_items(name);

		// 選択されている項目がない、またはALLを選択している場合は飛ばす
		if (searchData.length === 0 || searchData[0] === "") {
			continue;
		}

		if (searchData == "50代〜") {
			$("#d_type01").addClass(disableClass);
			$("#d_type02").addClass(disableClass);
		}

		if (searchData == "生え際" || searchData == "頭頂部") {
			$("#d_age04").addClass(disableClass);
		}

		// リスト内の各アイテムをチェック
		for (var j = 0; j < $(listItem).length; j++) {
			// アイテムに設定している項目を取得
			var itemData = $(listItem).eq(j).data(name);
			// 絞り込み対象かどうかを調べる
			if (searchData.indexOf(itemData) === -1) {
				$(listItem).eq(j).addClass(hideClass);
			}
		}
	}
}

function get_selected_input_items(name) {
	var searchData = [];
	$("[name=" + name + "]:checked").each(function () {
		searchData.push($(this).val());
	});
	return searchData;
}

function fadeAnime() {
	// ふわっ
	$(".fadeUpTrigger").each(function () {
		//fadeUpTriggerというクラス名が
		var elemPos = $(this).offset().top - 10; //要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass("fadeUp"); // 画面内に入ったらfadeUpというクラス名を追記
		} 
	});
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面をスクロールをしたら動かしたい場合の記述

// 画面が読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
	fadeAnime(); /* アニメーション用の関数を呼ぶ*/
}); // ここまで画面が読み込まれたらすぐに動かしたい場合の記述

$(function () {
	new ScrollHint('.reason_chart', {
		suggestiveShadow: false,
		remainingTime: 5000,
		i18n: {
		scrollable: 'スクロールできます'
		}
	});
});
$(function () {
$.prototype.draggable = function() {
	var t;
	$(this).each(function(i,e) {
	  $(e).mousedown(function(e2) {
		e2.preventDefault();
		t = $(e);
		$(e).data({
		  down: true,
		  x: e2.clientX,
		  y: e2.clientY,
		  left: $(e).scrollLeft(),
		  top: $(e).scrollTop()
		});
	  });
	});
	$(document).mousemove(function(e) {
	  if($(t).data("down")) {
		e.preventDefault();
		$(t).scrollLeft($(t).data("x")+$(t).data("left")-e.clientX);
		$(t).scrollTop($(t).data("y")+$(t).data("top")-e.clientY);
	  }
	}).mouseup(function(e) {
	  $(t).data("down", false);
	});
  };
  $(".reason_chart").draggable();
});

// アコーディオン
$(function () {
	$(".btn_more").click(function () {
		$(this).toggleClass("open").next().slideToggle(300);
	});
});

// クリックで画像切替
$(function () {
	$(".effect .btn_more").click(function () {
		$(".btn_more-on").toggleClass("active");
	});
});

// 追従cta
$(function() {
  var btn = $('.cv_fixed');
  
  //スクロールしてページトップから100に達したらボタンを表示
  $(window).on('load scroll', function(){
    if($(this).scrollTop() > 1150) {
      btn.addClass('active');
    }else{
      btn.removeClass('active');
    }

		if (window.matchMedia( "(max-width: 750px)" ).matches) {
			if($(this).scrollTop() > 200) {
				btn.addClass('active');
			}else{
				btn.removeClass('active');
			}
		}
  });
});