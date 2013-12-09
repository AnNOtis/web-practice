/**             
 * 
 *
 *
 *
 *
 *
 *
 *
 */


 $(function(){
 	var shadowOffset	=	1.08;
 	var lightswitch		=	$("#switch");
 	var lightbulb		=	$("#light-bulb");
 	var lightbulb2		=	$("#light-bulb2");
 	var lightCenterX	=	parseInt(lightbulb.width()/2);
 	var lightCenterY	=	parseInt(lightbulb.height()/2);
 	var logo			=	$(".answer-block");
 	var lightAlogo		=	$("#light-bulb");
 	var logoCenterX		=	parseInt(logo.width()/2);
 	var logoCenterY		=	parseInt(logo.height()/2);
 	var logoshadow		=	$("#answer-block-shadow");
 	var logoShdwCenterX	=	parseInt(logoshadow.width()/2);
 	var logoShdwCenterY	=	parseInt(logoshadow.height()/2);
 	var statustext		=	$("#statustext");
 	var defaulttxt		=	"Drag the light-bulb or the logo!";
 	var ontxt			=	"Let there be light!";
 	var offtxt			=	"Switch off the light!";

 	var tiptool = $(".tiptool");
 	var stupidmode = $("#stupidmode");

 	var sound1 = document.getElementById("sound1");
 	var sound2 = document.getElementById("sound2");
 	var sound3 = document.getElementById("sound3");

 	statustext.text(defaulttxt);
 	logoshadow.fadeTo(0,0);
 	lightbulb2.fadeTo(0,0);
 	moveShadow();

 	lightAlogo.draggable({
 		containment: "body", scroll: false,
 		drag: function(event, ui){

 			moveShadow();
 		},
 		stop: function(event, ui){

 		}
 	});
 	$(window).resize(function(){
 		moveShadow();
 	});

 	lightswitch.click(function(){
 		if(lightbulb.hasClass("off")){
 			lightbulb.removeClass("off");
 			lightswitch.css("backgroundPosition","0 0");
 			logoshadow.stop().fadeTo(750,setOpacity(shadowDistance));
 			lightbulb2.stop().fadeTo(750,1);
 			statustext.text(offtxt);
 		}else{
 			lightbulb.addClass("off");
 			lightswitch.css("backgroundPosition","-80px 0");
 			logoshadow.stop().fadeTo(750,0);
 			lightbulb2.stop().fadeTo(750,0);
 			statustext.text(ontxt);
 		}
 	});



 	function setOpacity(getDistance){
 		if(lightbulb.hasClass("off")){
 			return 0;
 		}else{
 			var calopacity = (1.2 - getDistance*1.5/1000);
 			if(calopacity<=0){
 				calopacity = 0 ; 
 			}
 			return calopacity;
 		}
 	}

 	function moveShadow(){
 		lightX			=	parseInt(lightbulb.offset().left) + lightCenterX;
 		lightY			=	parseInt(lightbulb.offset().top) + lightCenterY;
 		logoX			=	parseInt(logo.offset().left) + logoCenterX;
 		logoY			=	parseInt(logo.offset().top) + logoCenterY;
 		distanceX		=	logoX - lightX;
 		distanceY		=	logoY - lightY;
 		distance		=	Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
 		shadowDistance	=	distance * shadowOffset;
 		shadowPosLeft	=	(distanceX / distance * shadowDistance + lightX - logoShdwCenterX) + "px";
 		shadowPosTop	=	(distanceY / distance * shadowDistance + lightY - logoShdwCenterY) + "px";
 		logoshadow.css({ "left": shadowPosLeft, "top": shadowPosTop, "opacity": setOpacity(shadowDistance) });
 	}

 	function disableShadow(){
 		logoshadow.css({"opacity": 0 });
 	};

 	function selectTipItem(selectitem) {
 		logo = selectitem;
 		moveShadow();
 	};



 	$( ".question-block" ).droppable({
 		accept: ".answer-block",
 		activeClass: "drop-hover",
 		zIndex: 3,
 		drop: function( event, ui ) {

 			disableShadow();
 			var m_answer = ui.draggable.attr("value");
 			var answer = $(this).attr("answer");

 			console.log(m_answer);
 			console.log(answer);

 			if(m_answer==answer){
 				showright(ui.draggable);
 				ui.draggable( "option", "revert", false );
      		// $(this).droppable( "disable" );
      			ui.draggable( "disable" );
      		}else{
      		
      			showwrong(answer,$(this));

      		}
      	}
  	});

 	$(".answer-block").draggable({
 		cursor: "move",
 		snap:".question-block",
 		snapMode: "inner",
 		snapTolerance: 75,
 		cursorAt: { top: 75, left: 75 },
 		revert: true,
 		zIndex: 100,
 		drag: function(event, ui){
 			moveShadow();
 		},
 		stop: function(event, ui){
 			moveShadow();
 		}
 	});

 	var wrong = 0;
 	var isStupid = false;
 	function showright(object) {

 		if(isStupid){
 			youarenotstupid();
 			sound3.play();
 		}else{
 			sound1.play();
 		}
 		wrong = 0;
 		$("#msg").text("Wrong Number:"+ wrong);
 		$("#comment").hide();
 		$("#showright").show(100,function() {
 			setTimeout(function() {
 				$("#showright").hide();
 			},500)
 		});
 	};	






 	function showwrong(answer,select) {
 		wrong++;
 		sound2.play();
 		$("#msg").text("Wrong Number:"+ wrong);
 		if(wrong>=3){
 			youarestupid(select);
 			selectTipItem($(".answer-block[value="+answer+"]"));
 			//$("#msg").text(answer);
 		}

 		$("#showwrong").show(100,function() {
 			setTimeout(function() {
 				$("#showwrong").hide();
 			},500)});

 	};

 	function youarestupid(select) {
 		$(".question-block").removeClass("selected-item");
 		select.addClass("selected-item");
 		isStupid = true;
 		tiptool.show();
 		stupidmode.show();
 	};

 	function youarenotstupid() {
 		$(".question-block").removeClass("selected-item");
 		isStupid = false;
 		tiptool.hide();
 		stupidmode.hide();
 	};

 });