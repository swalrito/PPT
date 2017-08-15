var li_width=$("li").width();//每张幻灯片的宽度
var li_height=$(".content").height();//幻灯片的高度
var ul_width=$("ul").width();//幻灯片水平长度
var ul_height=$("ul").height();//幻灯片垂直长度

//内容数组初始位置
var row=0;
var cul=0;
<!--点击按钮切换幻灯片-->
(function changePPT(){
	$("span").click(function(e){
		//切换幻灯片
		//判断点击的按钮
		if($(e.target).hasClass('right')){
			row++;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				row--;
				return false;
			}
			if(content[row][cul]==undefined){
				$('ul').animate({left:'-='+li_width+'px'},0);
			}
			else {
				$('ul').animate({left:'-='+li_width+'px'});
			}
			$('ul').animate({top:'0px'},0);
			cul=0;
			changeColor();
		}
		else if($(e.target).hasClass('left')){
			row--;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				row++;
				return false;
			}
			if(content[row][cul]==undefined){
				$('ul').animate({left:'+='+li_width+'px'},0);
			}
			else {
				$('ul').animate({left:'+='+li_width+'px'});
			}
			$('ul').animate({top:'0px'},0);
			cul=0;
			changeColor();
		}
		else if($(e.target).hasClass('down')){
			cul++;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				cul--;
				return false;
			}
			changeColor();
			$('ul').animate({top:'-='+li_height+'px'});
		}
		else if($(e.target).hasClass('up')){
			cul--;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				cul++;
				return false;
			}
			changeColor();
			$('ul').animate({top:'+='+li_height+'px'});
		}
	})
})();

<!--键盘方向键控制幻灯片方向-->
$(function(){
	$('body').bind('keyup',function(event){
		//左移动
		if(event.keyCode==37){
			row--;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				row++;
				return false;
			}
			if(content[row][cul]==undefined){
				$('ul').animate({left:'+='+li_width+'px'},0);
			}
			else {
				$('ul').animate({left:'+='+li_width+'px'});
			}
			$('ul').animate({top:'0px'},0);
			cul=0;
			changeColor();
		}
		//上移动
		else if(event.keyCode==38){
			cul--;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				cul++;
				return false;
			}
			changeColor();
			$('ul').animate({top:'+='+li_height+'px'});
		}
		//右移动
		else if(event.keyCode==39){
			row++;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				row--;
				return false;
			}
			if(content[row][cul]==undefined){
				$('ul').animate({left:'-='+li_width+'px'},0);
			}
			else {
				$('ul').animate({left:'-='+li_width+'px'});
			}
			$('ul').animate({top:'0px'},0);
			cul=0;
			changeColor();
		}
		//下移动
		else if(event.keyCode==40){
			cul++;
			//是否移动
			var move=position(row,cul,event);
			if(move==false) {
				cul--;
				return false;
			}
			changeColor();
			$('ul').animate({top:'-='+li_height+'px'});
		}
	})
})

<!--根据幻灯片位置，决定是否能够移动-->
var content=new Array();//幻灯片内容存为一个数组
var li_lg=$('li').length;
for(var i=0;i<li_lg;i++){
	var contetn_li=$('li:eq('+i+') div');
	content.push(contetn_li);
	content_li=null;
	}
function position(row,cul,event){
	if(row<0||cul<0) return false;
	if(row>=li_lg) return false;
	if($(event.target).hasClass('right')||$(event.target).hasClass('left')){
		if(content[row][0]==undefined) return false;
	}
	if($(event.target).hasClass('up')||$(event.target).hasClass('down')){
		if(content[row][cul]==undefined) return false;
	}
	if(event.keyCode==37||event.keyCode==39){
		if(content[row][0]==undefined) return false;
	}
	if(event.keyCode==38||event.keyCode==40){
		if(content[row][cul]==undefined) return false;
	}
}

<!--判断幻灯片位置，显示按钮颜色-->
function changeColor(){
	$('span').addClass('choose');
	if(row-1<0){
		$(".left").removeClass('choose');
	}
	if(row+1>=li_lg){
		$(".right").removeClass('choose');
	}
	if(cul-1<0||content[row][cul-1]==undefined){
		$(".up").removeClass('choose');
	}
	if(cul+1<0||content[row][cul+1]==undefined){
		$(".down").removeClass('choose');
	}
};
changeColor();