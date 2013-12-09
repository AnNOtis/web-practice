$(document).ready(
function() {
var STATE_THREE_SUBMISSION = 3;
var STATE_TWO_PLAYING = 2;
var STATE_ONE_PREVIEW = 1;
var state = 1;
var win_height;
var win_width;
var drag_slide_width = $(".draggable-slide").css("width");
var drag_slide_height = $(".draggable-slide").css("height");
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
	$("#container").css("height",$(window).height()) ;
	var tipsbox_width = $("#tips-box").outerWidth();
	console.log(tipsbox_width);
	$("#tips-box").css("left",win_width/2-tipsbox_width/2);
}

$("#container").css("height",$(window).height()) ;

$("#testbtn").click(
showSubmissionBox
);

function creatSubmissionEmptyBox() {
	var number = $(".in-playing").size();
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
	$("#submission-box").css("height","100%");
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
	//setTimeout(function() {$("#submission-box").animate({scrollLeft:0},1500,"linear");},1500);
	

};
function showSubmissionBox(){
	creatSubmissionEmptyBox();
	$("#preview-box").css("height","100%");
	// $("#playing-box").css("height","60%");
	// setTimeout(function() {$("#preview-box").hide();},1000);
	setTimeout(function() {$("#playing-box").css("height","100%");},1);
	setTimeout(function() {$("#submission-box").css("height","40%");},500);
	$("#submission-box").show();
	$("#submission-box").show();
	state = STATE_TWO_PLAYING;
	var win_height =$(window).height();
	var in_playing_offset = win_height*0.4;
	var temptimeout;
	$(".in-playing").css("transition","1s");
	$.each($(".in-playing"),function(index, obj) {
	$(obj).css("top","+="+in_playing_offset);
	clearTimeout(temptimeout);	
	temptimeout = setTimeout(function() {
		$(".in-playing").css("transition","0s");
	},1000)
	
	});
	showTips();
	$("#step2tips").addClass("current");
};


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

$(".in-preview.draggable-slide").draggable({
	zIndex: 100,
	revert: "invalid",
	containment:".playing-box",
	distance: 5,
	// scope:"PreviewToPlaying",
	 drag: function( event, ui ) {
	 	//console.log(ui.offset);
	 },
	 start: function( event, ui ) {
	 	hideTips();
	 },
	 stop: function( event, ui ) {


	 }
});
$("#preview-box").droppable({ 
	accept: ".isn-playing",
	hoverClass: "ui-state-invalid",
	over: function( event, ui ) {
	 	console.log("drop");
	 }
});
$("#playing-box").droppable({ 
	accept: ".draggable-slide",
	hoverClass: "ui-state-highlight",
	// scope:"PreviewToPlaying",
	drop: function(event,ui) {
		if(ui.draggable.hasClass("in-preview")){
			var img_src = ui.draggable.attr("src");
			var img_value = ui.draggable.attr("value");
			var img_top = ui.draggable.offset().top;
			var img_left = ui.draggable.offset().left;

			var img_height = ui.draggable.outerHeight() ;
			var img_width = ui.draggable.outerWidth();
			var playing_box_height =  $("#playing-box").outerHeight();
			var playing_box_width = $("#playing-box").outerWidth();

			var absolute_playing_box_height = playing_box_height-img_height;
			var absolute_playing_box_width = playing_box_width-img_width
			if(img_top>=absolute_playing_box_height-10){
				img_top = absolute_playing_box_height-20;
			}else if(img_top<=0){
				img_top = 0;
			}else if(img_left>=absolute_playing_box_width-10){
				img_left = absolute_playing_box_width-20;
			}else if(img_left<=0){
				img_left = 0;
			}


			$("#playing-box").append("<img class=\"draggable-slide in-playing\" id =playing"+img_value+" src="+img_src+">");

			$("#playing"+img_value+"").css({"position":"absolute","left":img_left,"top":img_top,"z-index":2});
			
			var intervaltemp;
			var init_offset=50;
			var scroll_offset=50;
			var control_sense = 30;//靈敏度:邊界觸發控制距離
			$("#playing"+img_value+"").draggable({
				containment:".playing-box",
				revert:"invalid",
				start: function(event,ui) {
					ui.helper.css("z-index",99);
					$("#submission-box").clearQueue();
			 		$("#submission-box").stop();
				},
				drag: function(event,ui) {
					hideTips();
					if(state == STATE_TWO_PLAYING){
						if(ui.position.top>=absolute_playing_box_height){
							$("#preview-box").addClass("ui-state-invalid");
						}
						if(ui.position.top<absolute_playing_box_height){
							$("#preview-box").removeClass("ui-state-invalid");
						}
					}


					// if(event.pageX<=control_sense&&event.pageX>=0){
					// 	if($("#submission-box").scrollLeft()==0){
					// 		$("#sliders_start_space").addClass("sliders_edge_space_glow_left");
					// 	}
						
					// 	clearInterval(intervaltemp);
					// 	// $("#submission-box").clearQueue();
			 	// 		// 	$("#submission-box").stop();
					// 	$("#submission-box").animate({scrollLeft:$("#submission-box").scrollLeft()-scroll_offset},100,"linear");
					// 	//$(this).scrollLeft($(this).scrollLeft()-scroll_offset);
					// 	intervaltemp = setTimeout(function() {
					// 		$("#submission-box").animate({scrollLeft:$("#submission-box").scrollLeft()-scroll_offset},100,"linear");
					// 		if(scroll_offset<400){
					// 			scroll_offset+=init_offset;
					// 		}
					// 	},110);
					// }else if(event.pageX>=(win_width-control_sense)&&event.pageX<=win_width){
					// 	if($("#submission-box").scrollLeft()==parseFloat($("#sliders").css("width"))-$(window).width()){
					// 		$("#sliders_end_space").addClass("sliders_edge_space_glow_right");
					// 	}
					// 	clearInterval(intervaltemp);
					// 	// $("#submission-box").clearQueue();
			 	// 	// 	$("#submission-box").stop();
					// 	$("#submission-box").animate({scrollLeft:$("#submission-box").scrollLeft()+scroll_offset},100,"linear");
					// 	//$(this).scrollLeft($(this).scrollLeft()-scroll_offset);
					// 	intervaltemp = setTimeout(function() {
					// 		$("#submission-box").animate({scrollLeft:$("#submission-box").scrollLeft()+scroll_offset},100,"linear");
					// 		if(scroll_offset<400){
					// 			scroll_offset+=init_offset;
					// 		}
					// 	},110);
					// }else{
					// 	clearInterval(intervaltemp);
					// 	$("#sliders_start_space").removeClass("sliders_edge_space_glow_left");
					// 	$("#sliders_end_space").removeClass("sliders_edge_space_glow_right");
					// 	$("#submission-box").clearQueue();
			 	// 		$("#submission-box").stop();
					// 	scroll_offset = init_offset;
					// }


				},
				stop: function(event,ui) {
					ui.helper.css("z-index",2);
					$("#preview-box").removeClass("ui-state-invalid");
				}
			});

			ui.draggable.css({left:0,top:0});
			ui.draggable.attr("src","");
			ui.draggable.removeClass("draggable-slide ui-draggable ui-draggable-dragging").addClass("empty-dragbox");
			// ui.draggable.css("transition","1s");
			// ui.draggable.css("width","196px");			
			// ui.draggable.css("margin","0px");
			if($("#preview-box .draggable-slide.in-preview").size()==0){
				showSubmissionBox();

			}
		}
		
	},
	over: function( event, ui ) {

 	}
});

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

function setSlidesDnD() {
	var all_slide = $(".slide");
	var slide_width = all_slide.css("width");
	var slide_height = all_slide.css("height");
	$.each(all_slide, function(index,obj) {
		$(obj).droppable({
			accept:"#playing"+index,
			drop: function(event,ui) {
				$(obj).addClass();
				$(obj).find("img").attr("src",ui.draggable.attr("src"));
				$(obj).addClass("slide-glow");
				setTimeout(function() {$(obj).removeClass("slide-glow");},1000)
				$(ui.draggable).draggable("destroy");
				$(ui.helper).remove();
				$(ui.draggable).remove();
				console.log(state);
				if(state!=STATE_THREE_SUBMISSION){
					state = STATE_THREE_SUBMISSION;
					showTips();
					$("#step3tips").addClass("current");
				}
				if($("#playing-box .draggable-slide.in-playing").size()==0){
					showSubmissionBoxToFull();
				}

			},
			over: function( event, ui ) {
				//alert("HAHAH");
				ui.helper.css("transition","width 0.5s,height 0.5s");
				ui.helper.css({"width":slide_width,"height":slide_height});
				

 			},
 			out: function( event, ui ) {
				//alert("HAHAH");
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
	var control_sense = 30;//靈敏度:邊界觸發控制距離
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
		}else if(event.pageX>=(win_width-control_sense)&&event.pageX<=win_width){
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
				if(scroll_offset<400){
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


});