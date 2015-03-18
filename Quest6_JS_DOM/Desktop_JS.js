function Icon(name){
	this.name = name;
	this.drag = function(){};
}
function Folder(name, Window){
	this.name = name;
	this.window = Window;
	this.open = function(){}; //더블클릭하면 폴더가 열리는 함수
	this.click = function(){};
}
function Window(content){//열린 폴더의 창
	this.content = content;
	this.drag = function(){}
}

Folder.prototype = new Icon(); //inherit


var window1 = new Window("Hello world");
var window2 = new Window("Bye world");

var icon1 = new Icon("chrome");
var icon2 = new Folder("bird", window1);
var icon3 = new Folder("pigeon", window2);


function drop(event) {
    event.preventDefault();
    //var data = event.dataTransfer.getData("Text");
    //event.target.appendChild(document.getElementById(data));
    //document.getElementById("demo").innerHTML = "The p element was dropped";
}

function allowDrop(event) {
    event.preventDefault();
}
