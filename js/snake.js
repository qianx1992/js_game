var ran=0;
(function(){
	var wrap = document.getElementById("wrap");
	var wrcon = "";
	for (var i = 0; i < 160; i++) {
		wrcon += "<div></div>";
	}
	wrap.innerHTML += wrcon;
})();
var divs = document.querySelectorAll("#wrap div");
var a = [22, 23, 24, 25];
var snake=[];
var prev = 0;
var newhead = 0;
var present = 0;
var zha=false;
function init(){
	for (var i = 0; i < snake.length; i++) {
		divs[snake[i]].style.backgroundColor = "";
	}
	snake=[];
	for (var i = 0; i < a.length; i++) {
		snake.push(a[i]);
		divs[a[i]].style.backgroundColor = "green";
	}
	prev = snake[0];
	newhead = snake[snake.length - 1];
	present = snake[snake.length - 1];
	for(var i=0;i<divs.length;i++){
		divs[i].innerHTML="";
	}
	for(var i=0;i<20;i++){
		ran=Math.floor(Math.random()*159);
		divs[ran].innerHTML="<span style='background-color:rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+");'></span>";
	}
}
var flag=true;
init();
function move(){
	if(newhead>=160||newhead<=-1){
		return false;
	}
	for (var i = 0; i < snake.length; i++) {
		if (newhead == snake[i]) {
			flag = false;
			break;
		}
	}
	if (flag) {
		prev = snake.shift();
		divs[prev].style.backgroundColor = "";
		divs[present].style.backgroundColor = "green";
		divs[newhead].style.backgroundColor = "yellow";
		present = newhead;
		snake.push(newhead);
	}
	console.log(snake);
}
function changeFn(){
	flag = true;
	eat();
	move();
	wall();
}
document.onkeyup=function(ev){
	if(ev.keyCode==37){
		newhead = snake[snake.length - 1] - 1;
	}
	if(ev.keyCode==38){
		newhead = snake[snake.length - 1] - 16;	
	}
	if(ev.keyCode==39){
		newhead = snake[snake.length - 1] + 1;
	}
	if(ev.keyCode==40){
		newhead = snake[snake.length - 1] + 16;
	}
	changeFn();
}
document.getElementById("left").onclick = function() {
	newhead = snake[snake.length - 1] - 1;
	changeFn();
}
document.getElementById("up").onclick = function() {
	newhead = snake[snake.length - 1] - 16;	
	changeFn();
}
document.getElementById("right").onclick = function() {
	newhead = snake[snake.length - 1] + 1;		
	changeFn();
}
document.getElementById("down").onclick = function() {
	newhead = snake[snake.length - 1] + 16;	
	changeFn();
}
function wall(){
	for(var i = 0; i < snake.length; i++){
		if(snake[i]<16){
			zha=true;
			break;
		}
		if((snake[i]<160)&&(snake[i]>143)){
			zha=true;
			break;
		}
		if(snake[i]%16==0){
			zha=true;
			break;
		}
		if((snake[i]+1)%16==0){
			zha=true;
			break;
		}
	}
	if(zha){
		for (var i = 0; i < snake.length; i++) {
			divs[snake[i]].style.backgroundColor = "";
		}
	}
}
document.getElementById("resetBtn").onclick = function() {
	init();
	zha=false;
}
function eat(){
	for (var i = 0; i < snake.length; i++) {
		if(divs[snake[i]].innerHTML!=""){
			divs[snake[i]].innerHTML="";
			if(divs[snake[0]-1].style.backgroundColor==""){
				prev=snake[0]-1;
			}else if(divs[snake[0]+1].style.backgroundColor==""){
				prev=snake[0]+1;
			}else if(divs[snake[0]-16].style.backgroundColor==""){
				prev=snake[0]-16;
			}else if(divs[snake[0]+16].style.backgroundColor==""){
				prev=snake[0]+16;
			}
			snake.unshift(prev);
			divs[ snake[0]].style.backgroundColor = "green";
		}
	}
}
