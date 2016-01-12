/**
 * sliderPhoto.js 
 * @description [图片缩略展示插件]
 * @author [惊鸿三世]
 * @version [0.1.0]
 * @date [2016.01.12]
 */

var sliderPhotoPlugin = (function(){
	//定义初始化当前、之前、之后要显示图片的排位
	var curPic=0, nextPic=-1, prePic=-1, preShowPic=-1;
	var allPic= 0, curPhotoNumber = 0;
	var _data_list;				   
	//mouseover效果
	function liMouseOn(){
		$(".scrolltab .ulBigPic li").attr("class","");
		for(var i=0; i<$(".scrolltab .ulBigPic li").length;i++) {
			(function(j){
				$(".scrolltab .ulBigPic li:eq("+j+")").mouseover(function(){
					if($(".scrolltab").attr("class") == "dSmallList" || $(".scrolltab").attr("class") == "dMiddleList") {
						if($(this).attr("class") != "liSelected") {
							$(this).attr("class","liSelected");
						}
					}
				});
				$(".scrolltab .ulBigPic li:eq("+j+")").mouseout(function(){
					if($(".scrolltab").attr("class") == "dSmallList" || $(".scrolltab").attr("class") == "dMiddleList") {
						if($(this).attr("class") == "liSelected") {
							$(this).attr("class","");
						}
					}
				});
			}) (i);
		}
	}
	
	function numInit(num){
		if(num=="init"){
			if(allPic > 1) {
				nextPic = curPic + 1;
				// prePic=allPic - 1;
				prePic = curPic - 1;
			}else if(allPic == 1){
				nextPic=0;
				prePic=0;
			}
			$(".scrolltab .ulBigPic li:eq("+curPic+")").attr("class","liSelected");
		}else if(num == "plus"){
			preShowPic=curPic;
			prePic=curPic;
			curPic=nextPic;
			if(curPic < (allPic-1)) {
				nextPic=curPic+1;
			}else if(curPic == (allPic-1)) {
				nextPic=0;
			}
			$(".scrolltab .ulBigPic li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".scrolltab .ulBigPic li:eq("+preShowPic+")").attr("class","");
			}
		}else if(num == "minus") {
			preShowPic=curPic;
			nextPic=curPic;
			curPic=prePic;
			if(curPic > 0) {
				prePic=curPic-1;
			}else if(curPic == 0 && allPic > 1) {
				prePic=allPic-1;
			}
			$(".scrolltab .ulBigPic li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".scrolltab .ulBigPic li:eq("+preShowPic+")").attr("class","");
			}
		}else{
			preShowPic=curPic;
			curPic=num;
			if(curPic == (allPic-1)) {
				nextPic=0;
				if(allPic > 1) {
					prePic=curPic-1;
				}else if(allPic == 1) {
					prePic=0;
				}
			}else if(curPic == 0) {
				prePic=allPic-1;
				if(allPic > 1) {
					nextPic=1;
				}else if(allPic == 1) {
					nextPic=0;
				}
			}else{
				nextPic=curPic+1;
				prePic=curPic-1;
			}
			$(".scrolltab .ulBigPic li:eq("+curPic+")").attr("class","liSelected");
			if(preShowPic != curPic) {
				$(".scrolltab .ulBigPic li:eq("+preShowPic+")").attr("class","");
			}
		}
	}
	
	//大图左右按钮初始化
	function bBtnInit(){
		if(allPic < 2) {
			$("#bBtnLeft").attr("class","bBtnLeftBan");
			$("#bBtnRight").attr("class","bBtnRightBan");
		}else{
			if(curPic == 0) {
				$("#bBtnLeft").attr("class","bBtnLeftBan");
				$("#bBtnRight").attr("class","bBtnRight");
			}else if(curPic == (allPic-1)) {
				$("#bBtnLeft").attr("class","bBtnLeft");
				$("#bBtnRight").attr("class","bBtnRightBan");
			}else{
				$("#bBtnLeft").attr("class","bBtnLeft");
				$("#bBtnRight").attr("class","bBtnRight");
			}
		}
	}
	
	//小图左右按钮初始化
	function sBtnLeftInit(){
		if(allPic > 6) {
			$("#sBtnRight").attr("class","sBtnRight");
		}
	}
	
	function sBtnRightInit(){
		if(curPic > 2 && (allPic-curPic) > 4) {
			if($("#sBtnRight").attr("class") != "sBtnRight") {$("#sBtnRight").attr("class","sBtnRight");}
			if($("#sBtnRight").attr("class") != "sBtnRight") {$("#sBtnRight").attr("class","sBtnRight");}
		}else if(curPic < 3){
			if($("#sBtnRight").attr("class") != "sBtnRightBan") {$("#sBtnRight").attr("class","sBtnRightBan");}
			if(allPic > 6) {
				if($("#sBtnRight").attr("class") != "sBtnRight") {$("#sBtnRight").attr("class","sBtnRight");}
			}else{
				if($("#sBtnRight").attr("class") != "sBtnRightBan") {$("#sBtnRight").attr("class","sBtnRightBan");}
			}
		}else if(curPic > (allPic-4)) {
			if($("#sBtnRight").attr("class") != "sBtnRightBan") {$("#sBtnRight").attr("class","sBtnRightBan");}
			if(allPic > 6) {
				if($("#sBtnRight").attr("class") != "sBtnRight") {$("#sBtnRight").attr("class","sBtnRight");}
			}else{
				if($("#sBtnRight").attr("class") != "sBtnRightBan") {$("#sBtnRight").attr("class","sBtnRightBan");}
			}
		}
	}
	
	//小图标签selected函数
	function smallPicSelected(){
		if(!$(".scrolltab .ulSmallPic li:eq("+curPic+")").hasClass("liSelected")) {
			$(".scrolltab .ulSmallPic li:eq("+curPic+")").addClass("liSelected");
			$('.photoNums .cur_num').text(curPic + 1);
		}
		if(preShowPic!=(-1)) {
			if($(".scrolltab .ulSmallPic li:eq("+preShowPic+")").hasClass("liSelected")) {
				$(".scrolltab .ulSmallPic li:eq("+preShowPic+")").removeClass("liSelected");
			}
		}
		if (_data_list && _data_list.length) {
				$('.photoInfo .photo_title').text(_data_list[curPic].title || '');
				$('.photoInfo .createTime').text(formatDate(_data_list[curPic].createdAt) || '');
		}else {
			$('.photoInfo').hide();
		}
	}
	function formatDate(date) {
		if (!date) {
			return;
		}
		var res = new Date(date);
		return res.getHours() + ':' + res.getMinutes();
	}
	
	//小图滚动函数
	function smallPicScroll(){
		if(curPic != preShowPic) {
			var leftPosition=0;
			if(curPic>2 && curPic<($(".scrolltab .ulSmallPic li").length-3)) {
				leftPosition=-(curPic-2)*147;
			}else if(curPic > ($(".scrolltab .ulSmallPic li").length-4) && $(".scrolltab .ulSmallPic li").length>6) {
				leftPosition=-($(".scrolltab .ulSmallPic li").length-6)*147;
			}
			leftPosition+="px";
			$(".scrolltab .ulSmallPic").attr("rel","moving");
			$(".scrolltab .ulSmallPic").animate({left:leftPosition},200,function(){$(".scrolltab .ulSmallPic").attr("rel","stop");});
		}
	}
	
	//大图按钮效果
	$(document).delegate('#bBtnLeft', 'mouseover', function() {
		if($(this).attr("class")=="bBtnLeft") {
			$(this).attr("class","bBtnLeftSel");
		}
	});
	$(document).delegate('#bBtnLeft', 'mouseout', function() {
		if($(this).attr("class")=="bBtnLeftSel") {
			$(this).attr("class","bBtnLeft");
		}
	});
	
	$(document).delegate('#bBtnLeft', 'click', function() {
		if($(this).attr("class")=="bBtnLeftSel") {
			numInit("minus");
			sBtnRightInit();
			smallPicSelected();
			smallPicScroll();
			if(curPic == 0) {$("#bBtnLeft").attr("class","bBtnLeftBan");}
			if(curPic < (allPic-1) && $("#bBtnRight").attr("class")=="bBtnRightBan") {$("#bBtnRight").attr("class","bBtnRight");}
		}
	});
	$(document).delegate('#bBtnRight', 'mouseover', function() {
		if($(this).attr("class")=="bBtnRight") {
			$(this).attr("class","bBtnRightSel");
		}
	});
	$(document).delegate('#bBtnRight', 'mouseout', function() {
		if($(this).attr("class")=="bBtnRightSel") {
			$(this).attr("class","bBtnRight");
		}
	});
	
	$(document).delegate('#bBtnRight', 'click', function() {
		if($(this).attr("class")=="bBtnRightSel") {
			numInit("plus");
			sBtnRightInit();
			smallPicSelected();
			smallPicScroll();
			if(curPic == (allPic-1)) {$("#bBtnRight").attr("class","bBtnRightBan");}
			if(curPic > 0 && $("#bBtnLeft").attr("class")=="bBtnLeftBan") {$("#bBtnLeft").attr("class","bBtnLeft");}
		}
	})
	
	//小图左右按键效果
	$(document).delegate('#sBtnRight', 'mouseover', function() {
		if($(this).attr("class")=="sBtnRight") {
			$(this).attr("class","sBtnRightSel");
		}
	});
	$(document).delegate('#sBtnRight', 'mouseout', function() {
		if($(this).attr("class")=="sBtnRightSel") {
			$(this).attr("class","sBtnRight");
		}
	});
	$(document).delegate('#sBtnRight', 'click', function() {
		if($(this).attr("class")=="sBtnRightSel") {
			var leftPosition=$(".scrolltab .ulSmallPic").css("left");
			var leftPositionNum=Number(leftPosition.substring(0,(leftPosition.length-2)));
			leftPosition=leftPositionNum+147+"px";
			if(leftPosition=="0px") {if($(this).attr("class") != "sBtnRightBan") {$(this).attr("class","sBtnRightBan");}}
			var bestLeftNum=-($(".scrolltab .ulSmallPic li").length-6)*147;
			if((leftPositionNum+147) > bestLeftNum && $("sBtnRight").attr("class") != "sBtnRight") {$("#sBtnRight").attr("class","sBtnRight")}
			if($(".scrolltab .ulSmallPic").attr("rel")=="stop"){
				$(".scrolltab .ulSmallPic").attr("rel","moving");
				$(".scrolltab .ulSmallPic").stop();
				$(".scrolltab .ulSmallPic").animate({left:leftPosition},200,function(){$(".scrolltab .ulSmallPic").attr("rel","stop");});
			}
		}
	})
	$(document).delegate('#sBtnRight', 'mouseover', function() {
		if($(this).attr("class")=="sBtnRight") {
			$(this).attr("class","sBtnRightSel");
		}
	});
	$(document).delegate('#sBtnRight', 'mouseout', function() {
		if($(this).attr("class")=="sBtnRightSel") {
			$(this).attr("class","sBtnRight");
		}
	});
	$(document).delegate('#sBtnRight', 'click', function() {
		if($(this).attr("class")=="sBtnRightSel"){
			var leftPosition=$(".scrolltab .ulSmallPic").css("left");
			var leftPositionNum=Number(leftPosition.substring(0,(leftPosition.length-2)));
			leftPosition=leftPositionNum-147+"px";
			var bestLeftNum=-($(".scrolltab .ulSmallPic li").length-6)*147;
			if((leftPositionNum-147)==bestLeftNum) {$(this).attr("class","sBtnRightBan");}
			if(leftPositionNum==0 && $("#sBtnRight").attr("class")=="sBtnRightBan") {$("#sBtnRight").attr("class","sBtnRight");}
			if($(".scrolltab .ulSmallPic").attr("rel")=="stop") {
				$(".scrolltab .ulSmallPic").attr("rel","moving");
				$(".scrolltab .ulSmallPic").stop();
				$(".scrolltab .ulSmallPic").animate({left:leftPosition},200,function(){$(".scrolltab .ulSmallPic").attr("rel","stop");});
			}
		}
	});
	$(document).delegate('.sliderPhoto', 'click', function(e) {
        e = e || window.event;
        e.stopPropagation();
        return false;
    });
    $(document).delegate('.closeSlider', 'click', function() {
        $('#bg_modal').hide(); 
        $('.sliderPhoto').animate({
            'opacity': '0'
        },{
            'speed': 1000
        });
        setTimeout(function() {
            $('.sliderPhoto').hide();
        }, 1000);
    });
    $(document).on('click', function(e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;    
        if (target.id !== 'sliderPhoto') {
            var _sliderPhoto = $('#sliderPhoto');
            if (_sliderPhoto.css('display') == 'block') {
                _sliderPhoto.animate({
                    'opacity': '0'
                },{
                    'speed': 1000
                });
                setTimeout(function() {
                    _sliderPhoto.hide();
                }, 1000);
                $('#bg_modal').hide();
                return false;
            }
        }
    });
	function reInit() {	
		//小图li按键效果
		for (var i=0;i<$(".scrolltab .ulSmallPic li").length;i++) {
			(function(j) {
				$(".scrolltab .ulSmallPic li:eq("+ j+")").click(function() {
					if($(this).attr("class") != "liSelected") {
						numInit(j);
						bBtnInit();
						smallPicSelected();
					}
				});
			}) (i);
		}
		// curPic = parseInt(window.localStorage.getItem('curPhotoNumber')) || 0;
		curPic = curPhotoNumber || 0;
		allPic = $(".scrolltab .ulBigPic li").length;
		liMouseOn();
		numInit("init");
		bBtnInit();
		sBtnLeftInit();
		smallPicSelected();	
	}

	function listPhoto(e, list, id) {
		        e = e || window.event;
		        e.stopPropagation();
		        var _list = list || [];
		        _data_list = _list;
		        $('#bg_modal').show(); 
		        $('.sliderPhoto').show();
		        $('.sliderPhoto').animate({
		            'opacity': '1'
		        },{
		            'speed': 1000
		        });
		  
		        
		        var _bhtml = '', _shtml = '';
		        var _id = id;
		        if (_list.length) {
		            // wl.setItem('sliderAllPhoto', _list.length);
		            $('.photoNums .total_nums').text(_list.length);
		            for (var i = 0; i < _list.length; i++) {
		                if (_id == _list[i].id) {
		                    // wl.setItem('curPhotoNumber', i);
		                    curPhotoNumber = i;
		                    $('.photoNums .cur_num').text(i + 1);
		                }
		                _bhtml += '<li data-order="' + i + '" class="' + ((_id == _list[i].id) ? "liSelected" : "") + '"><span class="sPic">'
		                    + '<i class="iBigPic"><img alt="大图" src="' + _list[i].img+ '" /></i>'                      
		                    + '</span></li>';
		                _shtml += '<li data-order="' + i + '" class="' + ((_id == _list[i].id) ? "liSelected" : "") + '"><span class="sPic">'
		                    + '<img alt="小图" src="' + _list[i].img + '" />'
		                    + '</span></li>'
		            }

		            $('#sliderPhoto .ulBigPic').html('');
		            $('#sliderPhoto .ulSmallPic').html('');
		            $('#sliderPhoto .ulBigPic').append(_bhtml);
		            $('#sliderPhoto .ulSmallPic').append(_shtml);
		        }
		        reInit();
		    }



	return {
		listPhoto: listPhoto
	};

})();

