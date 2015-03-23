var Desktop = function(dom) {
		this.dom = dom;
		this.icons = [];
		this.windows = [];
	};

var _ = Desktop.prototype;

_.addIcon = function(icon) {
	this.icons.push(icon);
};


var Icon = function(desktop, type) {
		this.desktop = desktop;
		this.type = type;

		this.isMouseDown = false;
		this.mCoordNow = [0, 0];

		this._initialize();
	};

var _ = Icon.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	this.dom = document.createElement('div');
	this.dom.className = 'icon ' + this.type;
	this.dom.style.left = (this.desktop.icons.length % 9) * 110 + 'px';
	this.dom.style.top = Math.floor(this.desktop.icons.length / 9) * 110 + 'px';

	this.desktop.dom.appendChild(this.dom);
};

_._bindEvents = function() {
	var that = this;

	this.dom.ondblclick = function() {
		if(that.type !== 'folder') return;

		that.desktop.windows.push(new Win(that.desktop, that));
	};

	this.dom.onmousedown = function(e) {
		that.isMouseDown = true;
		that.mCoordNow = [e.clientX, e.clientY];
		that.dom.className += ' onmousedown';
	};

	this.dom.onmousemove = function(e) {
		if(!that.isMouseDown) return;

		var delta = [e.clientX - that.mCoordNow[0], e.clientY - that.mCoordNow[1]];

		that.dom.style.left = Number(that.dom.style.left.replace('px', '')) + delta[0] + 'px';
		that.dom.style.top = Number(that.dom.style.top.replace('px', '')) + delta[1] + 'px';

		that.mCoordNow = [e.clientX, e.clientY];
	};

	this.dom.onmouseup = function() {
		that.isMouseDown = false;
		that.dom.className = that.dom.className.replace(' onmousedown', '');
	};

	this.dom.onmouseleave = function() {
		that.isMouseDown = false;
		that.dom.className = that.dom.className.replace(' onmousedown', '');
	};
};


var Win = function(desktop, icon) {
		this.desktop = desktop;
		this.icon = icon;
		this.type = icon.type;

		this._initialize();
	};

var _ = Win.prototype;

_._initialize = function() {
	// this._setDom();
	// this._bindEvents();
};

// function Icon(name){
// 	this.name = name;
// 	//this.drag = function(){};
// }
// function Folder(name, Window){
// 	this.name = name;
// 	this.window = Window;
// 	//this.open = function(){}; //더블클릭하면 폴더가 열리는 함수
// 	//this.click = function(){};
// }
// function Window(content){//열린 폴더의 창
// 	this.content = content;
// 	//this.drag = function(){}
// }

// Folder.prototype = new Icon(); //inherit


// var window1 = new Window("Hello world");
// var window2 = new Window("Bye world");

// var icon1 = new Icon("chrome");
// var icon2 = new Folder("bird", window1);
// var icon3 = new Folder("pigeon", window2);

// //--------------------------------------------------------------------------이전 퀘스트

// document.getElementById('chrome').onmousedown = function() {
// 	var icon = this;

// 	document.onmousemove = function(e) {
// 		e = e || event
// 		icon.style.left = e.clientX-60+'px'
// 		icon.style.top = e.clientY-60+'px'
// 	}

// 	this.onmouseup = function() {
// 		document.onmousemove = null
// 	}

// }
// document.getElementById('chrome').ondragstart = function() { return false }


// document.getElementById('folder1').onmousedown = function() {
// 	var icon = this;

// 	document.onmousemove = function(e) {
// 		e = e || event
// 		icon.style.left = e.clientX-60+'px'
// 		icon.style.top = e.clientY-60+'px'
// 	}

// 	this.onmouseup = function() {
// 		document.onmousemove = null
// 	}

// }
// document.getElementById('folder1').ondragstart = function() { return false }


// document.getElementById('folder2').onmousedown = function() {
// 	var icon = this

// 	document.onmousemove = function(e) {
// 		e = e || event
// 		icon.style.left = e.clientX-60+'px'
// 		icon.style.top = e.clientY-60+'px'
// 	}

// 	this.onmouseup = function() {
// 		document.onmousemove = null
// 	}

// }
// document.getElementById('folder2').ondragstart = function() { return false }

// document.getElementById('folder1').ondblclick = function(e) {
// 	var x = e.clientX;
// 	var y = e.clientY;

// 	popwin1 = window.open("","popwin1", "width=400, height=300");
// 	popwin1.document.write("I am folder1");
// 	popwin1.moveTo(x,y);
// 	popwin1.focus();
// }

// document.getElementById('folder2').ondblclick = function(e) {
// 	var x = e.clientX;
// 	var y = e.clientY;

// 	popwin2 = window.open("","popwin2", "width=400, height=300");
// 	popwin2.document.write("I am folder2");
// 	popwin2.moveTo(x,y);
// 	popwin2.focus();
// }

// //document.getElementById('rest').ondragover= function(){return false;}
// document.getElementById('rest').ondragstart= function(){return false;}
// document.getElementById('rest').ondrag= function(){return false;}
// document.getElementById('rest').ondragend= function(){return false;}
// document.getElementById('rest').ondragenter= function(){return false;}

// //배경화면 이외는 드래그 못하게 하기 
