//Let the leadboard sroll
var scrollarea=document.getElementById("scroll");
var p1=document.getElementById("p1");
var p2=document.getElementById("p2");
p2.innerHTML=p1.innerHTML;

var scroll = function(){
	scrollarea.scrollTop++;
	if(scrollarea.scrollTop >= p1.offsetHeight){

		scrollarea.scrollTop = 0;
	}
}

var i = setInterval(scroll,100);

var tz = function(){
	clearInterval(i);
}

var ks = function(){
	i = setInterval(scroll,100);
}