$(document).ready(
function() {
var STATE_THREE_SUBMISSION = 3;
var STATE_TWO_PLAYING = 2;
var STATE_ONE_PREVIEW = 1;
var state = 1;
var win_height;
var win_width;

resizedw();
$(window).resize(resize);
var doit;
function resize(){
	clearTimeout(doit);
	doit = setTimeout(resizedw, 50);
}
function resizedw(){
	win_height = $(window).height();
	win_width = $(window).width();
	console.log("resize");
	$("#container").css("height",win_height);
	$("body").css("height",win_height);
	var tipsbox_width = $("#tips-box").outerWidth();
	$("#tips-box").css("left",win_width/2-tipsbox_width/2);
}

$("#container").css("height",$(window).height()) ;

$("#wrong_time").click(
randomPlayingBoxSlides
);

 creatPlayingBoxSlides("B2CEF4C2-AAC3-F4FD-5AD1-A99B87CEE265");
//creatPlayingBoxSlides("e52499a5-e88e-4ef9-ad53-8e58453ef4a7");
 // creatPlayingBoxSlides("53712e7e-3cae-4fa1-bd76-1887a4b1b8b4");
 // creatPlayingBoxSlides("e0c066ba-f866-4e8b-85af-f490dcc6fb14");
function creatPlayingBoxSlides(planID) {

	
	$.ajax({
		url:"http://192.168.1.32:8080/iTS5/service/plan/getConfigs/"+planID
	}).done(function(result){
		if(result == undefined){
			showMessage("連線失敗");
			return;
		}
		var pageConfig = xml2json.parser(result.planConfigs[0]);
		var pages_obj = pageConfig.pages.page;
		console.log(pages_obj);
		creatSubmissionEmptyBox();
		randomPlayingBoxSlides();
		var obj_size = 0;//初始值為0 ,非空白投影片大小
		var obj_load_count = 0;
		
		$.each(pages_obj,function(index,obj) {
			var image_type = obj.type;//教案投影片型態
			var image_path = obj.path;//教案投影片圖片
			if(image_type=="ppt"){
				$( "body" ).data( image_path,obj_size);
				obj_size++;
			}

		});
		console.log("obj_size:"+obj_size);
		$.each(pages_obj,function(index,obj) {//處理各頁圖片
			var image_path = obj.path;//教案投影片圖片
			var image_type = obj.type;//教案投影片型態
			var generate_id = $( "body" ).data(image_path);
			console.log(image_type);
			console.log(index+": pagepath :"+obj.path);
			if(image_type="ppt"){


			
			var tempImgURL = new Array(2);
				tempImgURL[0] = "http://192.168.1.32:8080/iTS5/service/file/pageDatas/"+planID+"/ppts/"+image_path;
				tempImgURL[1] = "http://192.168.1.32:8080/iTS5/service/file/ppts/"+image_path;
				$.ajax({
					type: 'GET',
					url: tempImgURL[0],
					//dataType:'text',
					success: function(data) {
						$("#playing-box").append("<img class=\"draggable-slide in-playing\" id="+("img"+generate_id)+" value="+generate_id+" src="+this.url+">");
						
						obj_load_count++;
						if(obj_load_count>=obj_size){
							creatSubmissionEmptyBox(obj_size);
							randomPlayingBoxSlides();
							setPlayingBoxDnD();
						}
					},
					error: function() {
						console.log('Page not found.');
						$.ajax({
							type: 'GET',
							url:tempImgURL[1],
							success:function(data){
								$("#playing-box").append("<img class=\"draggable-slide in-playing\" id="+("img"+generate_id)+" value="+generate_id+" src="+this.url+">");
								
								obj_load_count++;
								if(obj_load_count>=obj_size){
									creatSubmissionEmptyBox(obj_size);
									randomPlayingBoxSlides();
									setPlayingBoxDnD();
								}
							}
						});
					}
				});
				}
		});
		
	});



};

var z_index_count = 5;
var pre_obj_id = "";
function setPlayingBoxDnD() {
$(".in-playing.draggable-slide").draggable({
	revert: "invalid",
	distance: 5,
	// scope:"PreviewToPlaying",
	 drag: function( event, ui ) {
	 	//console.log(ui.offset);
	 },
	 start: function( event, ui ) {
	 	$(ui.helper).css("z-index",z_index_count);
	 	var now_id = $(ui.helper).attr("id");
	 	// console.log("pre_obj_id:"+pre_obj_id);
	 		// console.log("now_id:"+now_id);
	 		// console.log(z_index_count);
	 	// if(pre_obj_id!=now_id){//上一個拖動的物件相同的話，不用疊加拖動次數
	 	// 	z_index_count++;
	 	// 	pre_obj_id =now_id;
	 	// }
	 	z_index_count++;
	 	pre_z_index=z_index_count;
	 	hideTips();
	 },
	 stop: function( event, ui ) {


	 }
});
$("#playing-box").droppable({ 
	accept: ".in-playing",
	hoverClass: "ui-state-invalid",
	over: function( event, ui ) {
	 	console.log("drop");
	 }
});

var pre_z_index=0;
$.each($(".in-playing.draggable-slide"),function(index,obj) {
	$(obj).mouseover(function() {
		pre_z_index = $(this).css("z-index");
		$(this).css("z-index",99999);
	}).mouseout(function() {
		$(this).css("z-index",pre_z_index);
	});


});




};







//randomPlayingBoxSlides();
function randomPlayingBoxSlides() {
	var box_width = parseFloat($("#playing-box").css("width"));
	var box_height = parseFloat($("#playing-box").css("height"));
	var slide_width = parseFloat($(".in-playing").css("width"));
	var slide_height = parseFloat($(".in-playing").css("height"));
	$(".draggable-slide").css("transition","1s");
	$.each($(".in-playing"),function(index,obj) {
		var top = Math.floor(Math.random()*(box_height-slide_height-10));
		var left = Math.floor(Math.random()*(box_width-slide_width-10));
		console.log("top"+top);
		console.log("left"+left);
		$(obj).css("top",top);
		$(obj).css("left",left);
	});
	setTimeout(function() {$(".draggable-slide").css("transition","0");},1200)
	


};



//creatSubmissionEmptyBox();
function creatSubmissionEmptyBox(number) {
	//var number = $(".in-playing").size();
	for(var i = 0;i<=number-1;i++){
		$('#sliders_end_space').before(
						"<div class='slide none in-submission' id=submission"+i+" value='"+i+"'>"+
							"<div class='numindex' style='background-color: rgb(149, 198, 71); color: rgb(255, 255, 255);'>"+(i+1)+"</div>"+
							"<img src=''>"+
						"</div>");
	}
	setSlidersLength();
	setSlidesDnD();
	setSubmissionBoxControll();
};
function showSubmissionBoxToFull() {
	// setTimeout(function() {$("#submission-box").css("height","100%");},1);
	$("#playing-box").css("height","100%");
	$("#playing-box").css("top","0");
	$("#wrong_time").animate({"bottom":"-120px"},1000,"linear");
	setTimeout(function() {$("#submission-box").css({"height":"100%",top:0});
		state = STATE_THREE_SUBMISSION;
	var scale_rate = 1.5;
	var sliders_width = parseFloat($("#sliders").css("width"));
	var slide_width = parseFloat($(".slide").css("width"));
	var slide_height = parseFloat($(".slide").css("height"));
	sliders_width*=scale_rate;
	slide_width*=scale_rate;
	slide_height*=scale_rate;
	$("#sliders").css("width",sliders_width);
	$(".slide").css("width",slide_width);
	$(".slide").css("height",slide_height);
	$(".sliders_edge_space").css("height","100%");


   },1000)
	
	//setTimeout(function() {$("#submission-box").animate({scrollLeft:0},1500,"linear");},1500);
	

};
// function showSubmissionBox(){
// 	creatSubmissionEmptyBox();
// 	$("#preview-box").css("height","100%");
// 	// $("#playing-box").css("height","60%");
// 	// setTimeout(function() {$("#preview-box").hide();},1000);
// 	setTimeout(function() {$("#playing-box").css("height","100%");},1);
// 	setTimeout(function() {$("#submission-box").css("height","40%");},500);
// 	$("#submission-box").show();
// 	$("#submission-box").show();
// 	state = STATE_TWO_PLAYING;
// 	var win_height =$(window).height();
// 	var in_playing_offset = win_height*0.4;
// 	var temptimeout;
// 	$(".in-playing").css("transition","1s");
// 	$.each($(".in-playing"),function(index, obj) {
// 	$(obj).css("top","+="+in_playing_offset);
// 	clearTimeout(temptimeout);	
// 	temptimeout = setTimeout(function() {
// 		$(".in-playing").css("transition","0s");
// 	},1000)
	
// 	});
// 	showTips();
// 	$("#step2tips").addClass("current");
// };


/*跳至投影片位置並置中*/
function jumpToSlider(s, time){
	if($('#sliders').css('-webkit-transform')!=='none'){
		scaleValue = parseFloat($('#sliders').css('-webkit-transform').split(',')[3]);
	}
	else
		scaleValue = 1;
//	console.log(scaleValue);
//	console.log(time);
	
	if(time =='undefined')
		time=100;
	var slider_width = $('.slide').outerWidth() * scaleValue;
	var nowScrollLeftCount  = $("#submission"+s).offset().left;

	var slide_top = $('#submission'+s).css('top');
	if(slide_top =='auto')
		slide_top = 0;
	else
		slide_top = parseFloat(slide_top);

	var nowTop = $('body').height()/2 - ($('.toolsfunction').height()*inEditMode)/2;
	var changeTop = parseFloat(nowTop) - slide_top*scaleValue;

	$('body').animate({
		scrollLeft: nowScrollLeftCount - ($('body').width()-slider_width)/2
	}, time, 'linear');

	$('#sliders').css('top', changeTop+'px');
};


var isTipsOpen = 1;
$("#openbtn").click(function() {
		if(isTipsOpen==1){
			hideTips();
		}else{
			showTips();
			
		}
	}	
);
function showTips() {
	$("#tips-box").css("top",0);
	$("#openbtn").text("hide");
	isTipsOpen=1;
};
function hideTips() {
	$("#tips-box").css("top","-80px");
	$("#openbtn").text("open");
	isTipsOpen=0;
};








// $("#playing"+img_value+"").draggable({
// 	revert:"invalid",
// 	start: function(event,ui) {
// 		ui.helper.css("z-index",99);

// 	},
// 	drag: function(event,ui) {
// 		hideTips();
// 		if(state == STATE_TWO_PLAYING){
// 			if(ui.position.top>=absolute_playing_box_height){
// 				$("#preview-box").addClass("ui-state-invalid");
// 			}
// 			if(ui.position.top<absolute_playing_box_height){
// 				$("#preview-box").removeClass("ui-state-invalid");
// 			}
// 		}

// 	},
// 	stop: function(event,ui) {
// 		ui.helper.css("z-index",2);
// 		$("#preview-box").removeClass("ui-state-invalid");
// 	}
// });


function getSlidesNumber() {

	return $(".slide").size();
};

function setSlidersLength() {

	var slide_width = parseFloat($(".slide").css("width"));
	var edge_space = 100;
	var sliders_length = (slide_width*1.2)*getSlidesNumber()+edge_space*2;
	if(sliders_length<win_width){
		sliders_length=win_width;
	}
	$("#sliders").css("width",sliders_length);

};
var haveBeenOvered = 0;
var wrong_time = 0

var error_info = ["你需要再認真點!!","哈哈哈哈哈哈~遜斃了","其實你在睡覺對吧?","這題對你來說太難了!","你確定嗎?"];
function setSlidesDnD() {
	var all_slide = $(".slide");
	var slide_width = all_slide.css("width");
	var slide_height = all_slide.css("height");
	var drag_slide_width = $(".draggable-slide").css("width");
	var drag_slide_height = $(".draggable-slide").css("height");
	$.each(all_slide, function(index,obj) {
		var accept_id = "img"+index;
		$(obj).droppable({
			
			drop: function(event,ui) {
				if(haveBeenOvered!=0){
					hideComment(1000);
				}
				$(this).css("background-color","rgba(0,0,0,0.3)");//防止over後沒有out，CSS沒有還原

				if($(ui.draggable).attr("id")==accept_id){
					playRightAudio();
					$(obj).find("img").attr("src",ui.draggable.attr("src"));
					$(obj).addClass("slide-glow");
					setTimeout(function() {$(obj).removeClass("slide-glow");},1000)
					$(ui.draggable).draggable("destroy");
					$(ui.helper).remove();
					$(ui.draggable).remove();
				}else{
					playWrongAudio()
					$(ui.helper).css("transition","width 1s,height 1s,box-shadow 0.5s linear");
					$(obj).addClass("slide-glow-red");
					$(ui.helper).addClass("slide-glow-red");
					setTimeout(function() {$(ui.helper).removeClass("slide-glow-red");},1000)
					setTimeout(function() {$(obj).removeClass("slide-glow-red");},1000)
					$(ui.helper).animate({"top":0},250,"linear");
					$(ui.helper).css({"width":drag_slide_width,"height":drag_slide_height});
					// $(ui.helper).css("left",)
					var wrongtime = parseInt($("#wrong_time").text());
					$("#wrong_time").text(wrongtime+1);
					$("#wrong_time").css("background","rgba(255,0,0,0.5)");
					setTimeout(function() {$("#wrong_time").css("background","rgba(255,255,255,0.5)");},1000)
					wrong_time++;
					if(wrong_time ==1){
						showComment("錯第一次囉要小心!",2000);

					}else if(wrong_time ==3){
						showComment("錯太多次囉，請加油!!",2000);

					}else if(wrong_time >=5){
						var temp_error_info = error_info[Math.floor(Math.random()*(error_info.length))];
						showComment(temp_error_info,2000);
					}
					


				}
				if($("#playing-box .draggable-slide.in-playing").size()==0){
					showSubmissionBoxToFull();
				}

			},
			over: function( event, ui ) {
				//alert("HAHAH");
				$(this).css("background-color","rgba(255,255,255,0.3)");
				ui.draggable.css("transition","width 0.5s,height 0.5s");
				ui.draggable.css({"width":parseFloat(drag_slide_width)*3,"height":parseFloat(drag_slide_height)*3});
				if(haveBeenOvered==0){
					showComment("確認拖進去白色虛線方框就開始計分囉");
					haveBeenOvered++;
				}

 			},
 			out: function( event, ui ) {
				//alert("HAHAH");
				$(this).css("background-color","rgba(0,0,0,0.3)");
				ui.helper.css("transition","width 1s,height 1s");
				ui.helper.css({"width":drag_slide_width,"height":drag_slide_height});
 			}
		});
	});
};

function setSubmissionBoxControll() {
	var intervaltemp;
	var init_offset=50;
	var scroll_offset=50;
	var control_sense = 50;//靈敏度:邊界觸發控制距離
	$("#submission-box").mouseenter(function(event) {

		$(this).clearQueue();
 		$(this).stop();


	}).mousemove(function(event) {

		if(event.pageX<=control_sense&&event.pageX>=0){
			if($("#submission-box").scrollLeft()==0){
				$("#sliders_start_space").addClass("sliders_edge_space_glow_left");
			}
			clearInterval(intervaltemp);
			$(this).clearQueue();
 			$(this).stop();
			$(this).animate({scrollLeft:$(this).scrollLeft()-scroll_offset},100,"linear");
			//$(this).scrollLeft($(this).scrollLeft()-scroll_offset);
			intervaltemp = setTimeout(function() {
				$(this).animate({scrollLeft:$(this).scrollLeft()-scroll_offset},100,"linear");
				if(scroll_offset<400){
					scroll_offset+=init_offset;
				}
			},110);
		}else if(event.pageX>=(win_width-control_sense)&&event.pageX<=win_width+10){
			if($("#submission-box").scrollLeft()>=parseFloat($("#sliders").css("width"))-$(window).width()){
				$("#sliders_end_space").addClass("sliders_edge_space_glow_right");
			}
			clearInterval(intervaltemp);
			$(this).clearQueue();
 			$(this).stop();
			$(this).animate({scrollLeft:$(this).scrollLeft()+scroll_offset},100,"linear");
			//$(this).scrollLeft($(this).scrollLeft()-scroll_offset);
			intervaltemp = setTimeout(function() {
				$(this).animate({scrollLeft:$(this).scrollLeft()+scroll_offset},100,"linear");
				if(scroll_offset<800){
					scroll_offset+=init_offset;
				}
			},110);
		}else{
			clearInterval(intervaltemp);
			$("#sliders_start_space").removeClass("sliders_edge_space_glow_left");
			$("#sliders_end_space").removeClass("sliders_edge_space_glow_right");
			$(this).clearQueue();
 			$(this).stop();
			scroll_offset = init_offset;
		}

	});



};

var comment_hide_timeout;
function showComment(str,hide_duration) {
	console.log("s:"+ str);
	console.log("hide_duration:"+ hide_duration);
	comment_obj = $("#comment");
	comment_obj.stop(true,true);
	clearTimeout(comment_hide_timeout);
	$("#comment").css({height:60,width:200});
	comment_obj.text(str);
	comment_obj.show();
	if(hide_duration==null){

	}else{
		hideComment(hide_duration);
	}

	
};
function hideComment(hide_duration) {
	comment_hide_timeout = setTimeout(function() {
		$("#comment").text(" ");
		$("#comment").animate(
		{height:0,width:0},
		500,
		function() {$("#comment").hide();}
		);},hide_duration);


};
var pra_count= 0;
function playRightAudio() {
	var sound1 = document.getElementById("sound11");
	var sound2 = document.getElementById("sound12");
	var sound3 = document.getElementById("sound13");
	var sound_arr = [sound1,sound2,sound3];
	sound_arr[pra_count%3].play();
	pra_count++
};
var pwa_count= 0;
function playWrongAudio() {
	var sound1 = document.getElementById("sound21");
	var sound2 = document.getElementById("sound22");
	var sound3 = document.getElementById("sound23");
	var sound_arr = [sound1,sound2,sound3];
	sound_arr[pwa_count%3].play();
	pwa_count++
};
//setInterval(function() {playRightAudio()},500);


});