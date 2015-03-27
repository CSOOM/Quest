var Background = function(dom) {
	this.dom = dom;
	this.categories = [];
	this.memo = [];
};

var _ = Background.prototype;

_.addCategory = function(category){
	this.categories.push(category);
};

var Button_addCategory = function(back, dom){
	this.dom = dom;
	this.back = back;

	this._initialize();
};

var _ = Button_addCategory.prototype;

_.initialize = function(){
	this._bindEvents();
}

_._bindEvents = function(){
	var that = this;

	this.dom.onclick = function(){

	}
}//미완성 카테고리 더하는 거 구현하기!!!!!!!

var Category = function(back, name, color){
	this.back = back;
	this.name = name;
	this.color = color;

	this._initialize();
};

var _ = Category.prototype;

_._initialize = function(){
	this._setDom();
//	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('div');
	this.dom.className = 'category';
	this.dom.style.left = (this.back.categories.length % 3) * 630 + 20 + 'px';
	this.dom.style.top = Math.floor(this.back.categories.length / 3) * 420 + 10 + 'px';
	this.dom.style.backgroundColor = this.color;
	this.dom.innerHTML = this.name;
	this.back.dom.appendChild(this.dom);
};

