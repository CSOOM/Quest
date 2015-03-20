
function Icon(name){
	this.name = name;
	//this.drag = function(){};
}
function Folder(name, Window){
	this.name = name;
	this.window = Window;
	//this.open = function(){}; //더블클릭하면 폴더가 열리는 함수
	//this.click = function(){};
}
function Window(content){//열린 폴더의 창
	this.content = content;
	//this.drag = function(){}
}

Folder.prototype = new Icon(); //inherit


var window1 = new Window("Hello world");
var window2 = new Window("Bye world");

var icon1 = new Icon("chrome");
var icon2 = new Folder("bird", window1);
var icon3 = new Folder("pigeon", window2);

//--------------------------------------------------------------------------이전 퀘스트

document.getElementById('chrome').onmousedown = function() {
	var icon = this;

	document.onmousemove = function(e) {
		e = e || event
		icon.style.left = e.clientX-60+'px'
		icon.style.top = e.clientY-60+'px'
	}

	this.onmouseup = function() {
		document.onmousemove = null
	}

}
document.getElementById('chrome').ondragstart = function() { return false }


document.getElementById('folder1').onmousedown = function() {
	var icon = this;

	document.onmousemove = function(e) {
		e = e || event
		icon.style.left = e.clientX-60+'px'
		icon.style.top = e.clientY-60+'px'
	}

	this.onmouseup = function() {
		document.onmousemove = null
	}

}
document.getElementById('folder1').ondragstart = function() { return false }


document.getElementById('folder2').onmousedown = function() {
	var icon = this

	document.onmousemove = function(e) {
		e = e || event
		icon.style.left = e.clientX-60+'px'
		icon.style.top = e.clientY-60+'px'
	}

	this.onmouseup = function() {
		document.onmousemove = null
	}

}
document.getElementById('folder2').ondragstart = function() { return false }

document.getElementById('folder1').ondblclick = function(e) {
	var x = e.clientX;
	var y = e.clientY;

	popwin1 = window.open("","popwin1", "width=400, height=300");
	popwin1.document.write("I am folder1");
	popwin1.moveTo(x,y);
	popwin1.focus();
}

document.getElementById('folder2').ondblclick = function(e) {
	var x = e.clientX;
	var y = e.clientY;

	popwin2 = window.open("","popwin2", "width=400, height=300");
	popwin2.document.write("I am folder2");
	popwin2.moveTo(x,y);
	popwin2.focus();
}

//document.getElementById('rest').ondragover= function(){return false;}
document.getElementById('rest').ondragstart= function(){return false;}
document.getElementById('rest').ondrag= function(){return false;}
document.getElementById('rest').ondragend= function(){return false;}
document.getElementById('rest').ondragenter= function(){return false;}

//배경화면 이외는 드래그 못하게 하기 
