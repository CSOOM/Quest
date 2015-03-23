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

	var x = this.dom.style.left;
	var y = this.dom.style.top;
	this.mCoordNow = [x,y];
};

_._bindEvents = function() {
	var that = this;

	this.dom.ondblclick = function() {
		if(that.type !== 'folder') return;

		that.desktop.windows.push(new Win(that.desktop, that, that.mCoordNow));
	};

	this.dom.onmousedown = function(e) {
		that.isMouseDown = true;
		that.mCoordNow = [e.clientX, e.clientY];
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
	};

	this.dom.onmouseleave = function() {
		that.isMouseDown = false;
	};
};


var Win = function(desktop, icon, mCoordNow) {
	this.desktop = desktop;
	this.icon = icon;
	this.type = icon.type;
	this.mCoordNow = mCoordNow;
	this.isMouseDown = false;
	this._initialize();
};

var _ = Win.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('div');
	this.dom.className = 'win';
	this.desktop.dom.appendChild(this.dom);
	this.dom.style.left = this.mCoordNow[0]+'px'; 
	this.dom.style.top = this.mCoordNow[1]+'px'; 
};

_._bindEvents = function(){
	var that = this;

	this.dom.ondblclick = function(){
		console.log(this);
		that.desktop.dom.removeChild(this);
	};

	this.dom.onmousedown = function(e) {
		that.isMouseDown = true;
		that.mCoordNow = [e.clientX, e.clientY];
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
	};

	this.dom.onmouseleave = function() {
		that.isMouseDown = false;
	};
};


