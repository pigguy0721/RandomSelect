$(function(){
	////////////////////////////////////////////////////////
	// ユーザー運用（適宜、追加削除してください）

	// 初期の画像配置設定
	// {src: 画像ファイル名, id:メッセージ出力名, type: 0(前衛)or1(後衛)}
	var inputImage = [
		{src: "akuta.jpg", id: "アクタ", type: 0}, 
		{src: "aruruxu.jpg", id: "アルルゥ", type: 0}, 
		{src: "anzyu.jpg", id: "アンジュ", type: 0},
		{src: "itaku.jpg", id: "イタク", type: 0},
		{src: "inui.jpg", id: "イヌイ", type: 0},
		{src: "urusara.jpg", id: "ウルサラ", type: 1},
		{src: "vurai.jpg", id: "ヴライ", type: 0}, 
		{src: "ukon.jpg", id: "ウコン", type: 0},
		{src: "uruto.jpg", id: "ウルトリィ", type: 1},
		{src: "eruruxu.jpg", id: "エルルゥ", type: 1}, 
		{src: "oboro.jpg", id: "オボロ", type: 0}, 
		{src: "ougi.jpg", id: "オウギ", type: 0},
		{src: "karura.jpg", id: "カルラ", type: 0},
		{src: "kamyu.jpg", id: "カミュ", type: 1}, 
		{src: "kamutya.jpg", id: "カムチャタール", type: 0},
		{src: "kiuru.jpg", id: "キウル", type: 1},
		{src: "kuon.jpg", id: "クオン", type: 0},
		{src: "kurou.jpg", id: "クロウ", type: 0},
		{src: "kuxuran.jpg", id: "クゥラン", type: 0}, 
		{src: "genji.jpg", id: "ゲンジマル", type: 0}, 
		{src: "shisu.jpg", id: "シス", type: 0}, 
		{src: "zyutushikuon.jpg", id: "術師クオン", type: 1},
		{src: "shitiriya.jpg", id: "シチーリヤ", type: 1},
		{src: "suonkasu.jpg", id: "スオンカス", type: 1},
		{src: "suzuri.jpg", id: "スズリ", type: 0},
		{src: "teoro.jpg", id: "テオロ", type: 0}, 
		{src: "derihourai.jpg", id: "デリホウライ", type: 0}, 
		{src: "touka.jpg", id: "トウカ", type: 0},
		{src: "tokihusa.jpg", id: "トキフサ", type: 1},
		{src: "nuwangi.jpg", id: "ヌワンギ", type: 0}, 
		{src: "nekone.jpg", id: "ネコネ", type: 1},
		{src: "nosuri.jpg", id: "ノスリ", type: 1}, 
		{src: "haregikokopo.jpg", id: "晴れ着ココポ", type: 0},
		{src: "benauxi.jpg", id: "ベナウィ", type: 0}, 
		{src: "maroro.jpg", id: "マロロ", type: 1},
		{src: "mito.jpg", id: "ミト", type: 0}, 
		{src: "mikaduti.jpg", id: "ミカヅチ", type: 0}, 
		{src: "muthumi.jpg", id: "ムツミ", type: 0}, 
		{src: "munetcika.jpg", id: "ムネチカ", type: 0},
		{src: "yakutowaruto.jpg", id: "ヤクトワルト", type: 0}, 
		{src: "yuzuha.jpg", id: "ユズハ", type: 0},
		{src: "rurutexie.jpg", id: "ルルティエ", type: 0}, 
	];

	////////////////////////////////////////////////////////

	// 初期配置
	for (var i = 0; i < inputImage.length; i++){
		$('#imgArray1').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
		$('#imgArray2').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
		$('#imgArray3').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
		$('#imgArray4').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
		$('#imgArray5').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
		$('.img_container').append(`<img src="./chara_img/${inputImage[i].src}" id="${inputImage[i].id}">`)
	}

	console.log(inputImage)
	var count = 0;
	// 削除対象記録
	var deleteImage = [];
	// 変更後リスト記録
	var changeImage = inputImage;
	var changeFrontImage = inputImage.filter(x => x.type == 0);
	var changeBackImage = inputImage.filter(x => x.type == 1);
	// 非同期処理による選出の複数実行をフラグで管理
	var selectFlg = true;
	// div.roulette要素にrulette.jsを適用
	var rouletter = $('div.roulette');	
	rouletter.roulette(p);

	////////////////////////////////
	// message出力処理
	////////////////////////////////
	var appendLogImg = function(msg) {
		$('#msg')
		.append('<img src="./chara_img/'+msg.split('/').pop()+'">');
	}
	var appendLogMsg = function(msg) {
		$('#msg')
		.append('<span class="muted">' + msg + "," + '</span>')
	}
	var appendBrMsg = function() {
		$('#msg')
		.append('<br />')
	}
	var appendMatchMsg = function(count) {
		$('#msg')
		.append('<span class="muted">' + `編成${count}: ` + '</span>')
	}

	////////////////////////////////
	// 画像化処理
	////////////////////////////////
	var element = $("#msg");
	var getCanvas;
	//プレビュー
	$("#btn-Preview-Image").on('click', function () {
		html2canvas(element, {
			allowTaint: true, useCORS: true, taintTest: false,
			onrendered: function (canvas) {
				$("#previewImage").append(canvas);
				getCanvas = canvas;
			}
		});
	});

	////////////////////////////////
	// ルーレットのcallback処理
	////////////////////////////////
	var p = {
		startCallback : function() {
			appendBrMsg();
		},
		slowDownCallback : function() {
			appendLogMsg('');
		},
		stopCallback : function($stopElm) {
			setDisplayImage($stopElm[0].id);
			appendLogImg($stopElm[0].src);
			$('#speed, #duration').slider('enable');
			$('#stopImageNumber').spinner('enable');
			$('.stop').attr('disabled', 'true');
			// ボタン連打制御
			$(".set").prop('disabled', false);
		}
	}

	// private function: 次回候補の削除対象としてリストに追加
	var setDisplayImage = function(targetId) {
		$('.img_container #' + targetId).css('opacity', 0.3);
		deleteImage.unshift(targetId)
	}
	

	////////////////////////////////
	// クリック処理
	////////////////////////////////
	$('.set').click(function(){
		// 削除対象を最新のリストから除外する
		for (n=0; n < deleteImage.length; n++) {
			changeImage = changeImage.filter(item => item.id !== deleteImage[n])
			changeFrontImage = changeFrontImage.filter(item => item.id !== deleteImage[n])
			changeBackImage = changeBackImage.filter(item => item.id !== deleteImage[n])
		}
		// 重複削除処理
		changeFrontImage = changeFrontImage.filter(function (x, i, self) {
			return self.indexOf(x) === i;
		});
		changeBackImage = changeBackImage.filter(function (x, i, self) {
			return self.indexOf(x) === i;
		});

		// リストの残り前衛、後衛キャラが1体のみになった際は補充する
		if (changeFrontImage.length < 2 && changeBackImage.length < 2){
			chargeCharaList(0)
			chargeCharaList(1)
			alert('足りない前衛キャラ、後衛キャラを継ぎ足しました！')
		} else if (changeFrontImage.length < 2) {
			chargeCharaList(0)
			alert('足りない前衛キャラを継ぎ足しました！')
		} else if (changeBackImage.length < 2) {
			chargeCharaList(1)
			alert('足りない後衛キャラを継ぎ足しました！')
		}
		$(".start").prop('disabled', false);
		selectFlg = true;
	});
	
	$('.start').click(function(){
		rouletter.roulette('start');
		// ボタン連打制御
		$(".start").prop('disabled', true);
		$(".set").prop('disabled', true);
		if (count != 0) {
			appendBrMsg();
		};
		randumImageNum();
		count++;
		appendMatchMsg(count);
	});

	// private method: 継ぎ足しロジック(type_idで挿入するデータが変える)
	var chargeCharaList = function(type_id){
		changeImage = changeImage.concat(inputImage.filter(x => x.type == type_id))
		// 重複削除処理
		changeImage = changeImage.filter(function (x, i, self) {
			return self.indexOf(x) === i;
		});
		var setDisplayChara = changeImage.filter(x => x.type == type_id)
		// 重複削除処理
		setDisplayChara = setDisplayChara.filter(function (x, i, self) {
			return self.indexOf(x) === i;
		});
		for(var i = 0; i < setDisplayChara.length; i++) {
			$('.img_container #' + setDisplayChara[i].id).css('opacity', 1);
		}
		if (type_id === 0) {
			changeFrontImage = [];
			changeFrontImage = changeFrontImage.concat(inputImage.filter(x => x.type == type_id))
			for(var i = 0; i < changeFrontImage.length; i++) {
				deleteImage = deleteImage.filter(function (charaId) {
					return charaId !== changeFrontImage[i].id
				})
			}
		}
		if (type_id === 1) {
			changeBackImage = [];
			changeBackImage = changeBackImage.concat(inputImage.filter(x => x.type == type_id))
			for(var i = 0; i < changeBackImage.length; i++) {
				deleteImage = deleteImage.filter(function (charaId) {
					return charaId !== changeBackImage[i].id
				})
			}
		}
	}	

	// private method: キャラ選出ロジック（止めるべき画像対象の選出）
	var randumImageNum = function(){
		if (selectFlg) {
			selectFlg = false
	
			// 前衛、後衛でそれぞれリスト作成
			var frontList = changeImage.filter(x => x.type == 0);
			var backList = changeImage.filter(x => x.type == 1);

			// 前衛、後衛から一人ずつ選出
			var rouletteChara2 = frontList.splice(Math.floor(Math.random() * frontList.length),1);
			var rouletteChara3 = frontList.splice(Math.floor(Math.random() * frontList.length),1);
			var rouletteChara4 = backList.splice(Math.floor(Math.random() * backList.length),1);
			var rouletteChara5 = backList.splice(Math.floor(Math.random() * backList.length),1);

			// 余った前衛キャラ、後衛キャラリストをマージさせる
			var selectList = $.merge(frontList, backList)

			// マージさせたリストから一人選出
			var rouletteChara1 = selectList.splice(Math.floor(Math.random() * selectList.length), 1);

			// webコンソール確認用
			// console.log(rouletteChara1)
			// console.log(rouletteChara2)
			// console.log(rouletteChara3)
			// console.log(rouletteChara4)
			// console.log(rouletteChara5)

			// 選出したキャラidから止める画像の番号を各自取得
			var rouletteNum1 = inputImage.findIndex(({id}) => id === rouletteChara1[0].id)
			var rouletteNum2 = inputImage.findIndex(({id}) => id === rouletteChara2[0].id)
			var rouletteNum3 = inputImage.findIndex(({id}) => id === rouletteChara3[0].id)
			var rouletteNum4 = inputImage.findIndex(({id}) => id === rouletteChara4[0].id)
			var rouletteNum5 = inputImage.findIndex(({id}) => id === rouletteChara5[0].id)

			// 該当の画像で止まるよう制御を設定
			p['stopImageNumber'] = rouletteNum1
			$('div.roulette1').roulette('option', p);
			p['stopImageNumber'] = rouletteNum2
			$('div.roulette2').roulette('option', p);
			p['stopImageNumber'] = rouletteNum3
			$('div.roulette3').roulette('option', p);
			p['stopImageNumber'] = rouletteNum4
			$('div.roulette4').roulette('option', p);
			p['stopImageNumber'] = rouletteNum5
			$('div.roulette5').roulette('option', p);
			// 上記の設定完了後に停止処理をかける
			rouletter.roulette('stop');
		}
	}


	////////////////////////////////
	// 初期設定　以下はいじらなくて問題ない
	////////////////////////////////
	var updateParamater = function(){
		p['speed'] = 10;
		p['duration'] = 4;
		p['stopImageNumber'] = -1;
		rouletter.roulette('option', p);	
	}
	var updateSpeed = function(speed){
		$('.speed_param').text(speed);
	}
	$('#speed').slider({
		min: 1,
		max: 30,
		value : 10,
		slide: function( event, ui ) {
			updateSpeed(ui.value);
			updateParamater();
		}
	});
	updateSpeed($('#speed').slider('value'));

	var updateDuration = function(duration){
		$('.duration_param').text(duration);
	}
	$('#duration').slider({
		min: 2,
		max: 10,
		value : 3,
		slide: function( event, ui ) {
			updateDuration(ui.value);
			updateParamater();
		}
	});
	updateDuration($('#duration').slider('value'));

	var updateStopImageNumber = function(stopImageNumber) {
		$('.image_sample').children().css('opacity' , 0.2);
		$('.image_sample').children().filter('[data-value="' + stopImageNumber + '"]').css('opacity' , 1);
		$('.stop_image_number_param').text(stopImageNumber);
		updateParamater();
	}

	$('#stopImageNumber').spinner({
		spin: function( event, ui ) {
			var imageNumber = ui.value;
			if ( ui.value > 4 ) {
				$( this ).spinner( "value", -1 );
				imageNumber = 0;	
				updateStopImageNumber(-1);		
				return false;
			} else if ( ui.value < -1 ) {
				$( this ).spinner( "value", 4 );
				imageNumber = 4;	
				updateStopImageNumber(4);		
				return false;
			}
			updateStopImageNumber(imageNumber);		
		}
	});
	$('#stopImageNumber').spinner('value', 0);
	updateStopImageNumber($('#stopImageNumber').spinner('value'));		

	$('.image_sample').children().click(function(){
		var stopImageNumber = $(this).attr('data-value');
		$('#stopImageNumber').spinner('value', stopImageNumber);
		updateStopImageNumber(stopImageNumber);
	});
});

