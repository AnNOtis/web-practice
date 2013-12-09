<%@ include file = "../../chkAuth.jsp"%>
<%
System.out.println("in plan/navbar.jsp");
/*

navbar包含預載CSS 以及會用到的js library
不需要特別放置位置 瀏覽器會自己調整tag應該要在的位置

*/
%>
<%@ include file = "../../js/importjs.jsp"%>
<%@ page contentType="text/html;charset=UTF-8" %>   
<%
	String school_id = (String)session.getAttribute("school_id");
	String school_name = (String)session.getAttribute("school_name");
	String roleName = (String)session.getAttribute("role_name");

%>
<!--boostrap css-->
<link href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/>
<link href="<%=pURL%>bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
<title>iTS 5</title>
<!--self script-->
<script type="text/javascript">

</script>  

<!--self css-->
<style type="text/css">
body{
/*	overflow: hidden;
	width: 100%;*/
}

.naviBtn {
	margin: 4px 18px;
	cursor: pointer;
}
.brand{
	font-family: 'DFKai-sb';
}
.navbar{
	top:0px;
	position:absolute;
	width:100%;
	z-index: 10;
/*	left:240px;*/
}

#blockLien{
	border-left: 2px solid #FFF;
	height: 20px;
	display: inline-block;
	margin: -5px 0px;
}

.menuClose {
	width : 100%;
/*	-webkit-transform: translateX(-240px);*/
	transition: all 240ms ease-out;
}
.menuOpen {
	width : 100%;
/*	-webkit-transform: none;*/
	transition: all 240ms ease-out;
}
.menuClose >div>span>.menu-trigger>img {

}



.naviMenu, .naviSearch, .naviTools, .naviHot, .naviLayout{
	display: inline-block;
}
.itsnavbar{
	-webkit-border-radius: 0px;
	   -moz-border-radius: 0px;
	        border-radius: 0px;
	border: 0px;
/*	border-bottom: 1px solid #d4d4d4;*/
	padding: 0px;
}
.itstopbar{
	background-color: #A8D066;
	background-image:-webkit-linear-gradient(top,#B4D467,#9DCC66);
	background-image:		 linear-gradient(top,#B4D467,#9DCC66);	
	border-bottom: 1px solid #8AC562;
	min-height: 41px;
}
.pull-middle {
	margin-left: 		 calc(50% - 78px);
	margin-left: 	-moz-calc(50% - 78px);
	margin-left: -webkit-calc(50% - 78px);
}
.fullmenu{
	width: 240px;
	float: left;
	background-color: cornflowerblue;
	height: 100%;
	position: absolute;
	top: 0px;
	z-index: 0;
	overflow: auto;
/*	padding: 10px 10px;*/
	max-height: 574px;
}
/*.ma::-webkit-scrollbar{
	width:10px;
}
.ma::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
.ma::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
*/
.main{
	z-index: 2;
	background-color:#DCDCDC;
	position: absolute;
/*	height: calc(100% - 96px);
	height: -webkit-calc(100% - 96px);
*/	width: 100%;
/*	left:240px;*/
	height:100%;
}


/***/
.ma{
/*	height: calc(100% - 10px);*/
	height:100%;
	overflow:auto;
	background-color: #EDEDED;
}
@media all and (max-width: 818px) {
	.itstopbar {
		background-image: none;
	}
	.fullmenu {
		max-height: 414px;
	}
}
</style>

<!--navbar+menu-->
<header class="navbar">
	<div class="navbar-inner navbar-state-top itsnavbar itstopbar">
		<span class="pull-left">
			<span id="menuTrigger" onClick="javascript:history.back(1)" class="menu-trigger naviMenu">
				<img class="naviBtn" src="<%=pURL%>images/naviBar/return.svg"/>
			</span>
			<!--<span id="blockLien"></span>-->
		</span>
<!--		<span >
			<img class="naviBtn" src="<%=pURL%>images/icon/iTSLogo_32X32.png"/>
		</span>
-->		<span class="pull-right">
<!--			<a id="layoutTrigger" href="#layout" class="layout-trigger naviLayout">
				<img class="naviBtn" src="<%=pURL%>images/naviBar/layout_1.png"/>
			</a>
-->			<span id="searchTrigger" onClick="save()" class="search-trigger naviSearch">
				<img class="naviBtn" src="img/save.svg"/>
			</span>		
		</span>
	</div>
</header>
<script>
//	$('#menuTrigger')[0].addEventListener('touchstart', menu_click, false);
//	$('#menuTrigger')[0].addEventListener('click', menu_click, false);


/*	function menu_click(evt){
		history.back(1);
		if($('body').scrollLeft()==240) {
			$('body').animate({scrollLeft:0},240);
			return;
		}

		console.log(evt);
		if(evt.type=="click"){
		//	$('.navbar').css({'position':'absolute'});
		}
		else if(evt.type=="touchstart"){
		//	$('.navbar').css({'position':'absolute'});
			evt.preventDefault();  
			evt.stopPropagation(); 
		}

		if($('.navbar').hasClass('menuClose')) {
			menu_open();
		}
		else 
			menu_close();
		
	}

	function menu_open() {
		$('.navbar').switchClass('menuClose', 'menuOpen', 200);
		$('.main').switchClass('menuClose', 'menuOpen', 200);
	}
	function menu_close() {
		$('.navbar').switchClass('menuOpen', 'menuClose', 200);
		$('.main').switchClass('menuOpen', 'menuClose', 200);
	}




//	$('#searchTrigger').click(search_open);
//	$('#toolsTrigger').click(tools_open);

	function search_open(){
		var isOpen = $('.itsSearchBar').css('display');
		if(isOpen=='none') {
			$('.itsToolBar').hide(20, function(){
				$('.itsSearchBar').show(200);
			});
		}
		else if(isOpen=='block') {
			$('.itsSearchBar').hide(200);
		}
	}
	function tools_open() {
		var isOpen = $('.itsToolBar').css('display');
		if(isOpen=='none') {
			$('.itsSearchBar').hide(20, function(){
				$('.itsToolBar').show(200);
			});
		}
		else if(isOpen=='block') {
			$('.itsToolBar').hide(200);
		}
	}
	var aa=0;
	var bb=0;
	var wait;
	var conutAC = new Array();
	window.onscroll = function(evt){
		if(bb==0){
			bb=1;
			wait = setInterval('waitonscrollstop()',100);
		}
		if(aa==0) {
			var count = $('body').scrollLeft();
			conutAC.push(count);
		}
		console.log('aa:'+aa+" , bb:"+bb);
	}
	var tempCountAClast=-1;
	function waitonscrollstop() {
		if(conutAC.length==1)
			return;
		console.log('a:tempCountAClast:'+tempCountAClast+" , conutAC:"+conutAC);
		if(tempCountAClast!=conutAC[conutAC.length-1]) {
			tempCountAClast=conutAC[conutAC.length-1];
		}
		else{
			clearTimeout(wait);
			console.log('b:tempCountAClast:'+tempCountAClast+" , conutAC:"+conutAC);
			aa=1;
			if(conutAC[0]<conutAC[conutAC.length-1]) {	//拖曳開的過程
				if(conutAC[conutAC.length-1]<120)		//拖曳不到一半
					$('body').animate({scrollLeft:0},$('body').scrollLeft(), function(){aa=0;bb=0});
				else
					$('body').animate({scrollLeft:240},240 - $('body').scrollLeft(), function(){aa=0;bb=0});
			}
			else{
				if(conutAC[conutAC.length-1]>=120)		//拖曳不到一半
					$('body').animate({scrollLeft:240},240 - $('body').scrollLeft(), function(){aa=0;bb=0});
				else
					$('body').animate({scrollLeft:0},$('body').scrollLeft(), function(){aa=0;bb=0});
			}
			conutAC = new Array();
		}
	}
*/		/*
		if(onscrollstart==0 ){
			onscrollstart=1;
			wait = setTimeout(function(){
				if(conutAC[0]<conutAC[conutAC.length-1]) {	//拖曳開的過程
					if(conutAC[conutAC.length-1]<120)		//拖曳不到一半
						$('body').animate({scrollLeft:0},$('body').scrollLeft(), function(){onscrollstart=0;});
					else
						$('body').animate({scrollLeft:240},240 - $('body').scrollLeft(), function(){onscrollstart=0;});
				}
				else{
					if(conutAC[conutAC.length-1]<120)		//拖曳不到一半
						$('body').animate({scrollLeft:240},240 - $('body').scrollLeft(), function(){onscrollstart=0;});
					else
						$('body').animate({scrollLeft:0},$('body').scrollLeft(), function(){onscrollstart=0;});
				}
				clearTimeout(wait);
				console.log(123);
				console.log(conutAC);
			}, 1000)
		}
		*/
/*		console.log($('body').scrollLeft());
		if(count<=10){
//			menu_close();
			//$('fullmenu').css('width',240);
			return;
			
		}
//		$('body').scrollLeft(count*9/10);
//		$('body').scrollLeft(count);
		$('body').scrollLeft(0);
	
	function scrollbody(leftcount){
		if(leftcount==0) {
			if($('body').scrollLeft()<120)
				$('body').animate({scrollLeft:0},240);
			else if($('body').scrollLeft()>=120)
				$('body').animate({scrollLeft:240},240);
		}
		else if(leftcount==240){
			if($('body').scrollLeft()<120)
				$('body').animate({scrollLeft:240},240);
			else if($('body').scrollLeft()>=120)
				$('body').animate({scrollLeft:0},240);
		}
	}
*/
</script>
