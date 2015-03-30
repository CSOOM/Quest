var Background = function(dom) {
	this.dom = dom;
	this.categories = [];
};

var _ = Background.prototype;

_.addCategory = function(category){
	this.categories.push(category);
};

var Button_addCategory = function(back, dom){
	this.back = back;
	this.dom = dom;
	
	this._initialize();
};

var _ = Button_addCategory.prototype;

_._initialize = function(){
	this._bindEvents();
}

_._bindEvents = function(){
	var that = this;
	this.dom.onclick = function(){
		var name = document.getElementsByClassName("addCate name")[0].value;
		var color = document.getElementsByClassName("addCate color")[0].value;
		that.back.addCategory(new Category(that.back, name, color));
	}
};

var Category = function(back, name, color){
	this.back = back;
	this.name = name;
	this.color = color;
	this.memo = [];

	this._initialize();
};

var _ = Category.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};


_._setDom = function(){
	this.dom = document.createElement('div');
	this.dom.className = 'category';
	this.dom.style.left = (this.back.categories.length % 3) * 635 + 15 + 'px';
	this.dom.style.top = Math.floor(this.back.categories.length / 3) * 425 + 15 + 'px';
	this.dom.style.backgroundColor = this.color;
	this.dom.innerHTML = this.name;
	this.back.dom.appendChild(this.dom);

	var add_Memo = new Button_addMemo(this);
};

_._bindEvents = function(){
	var that = this;
}

_.addMemo = function(memo){
	this.memo.push(memo);
};

var Button_addMemo = function(category){
	this.category = category;

	this._initialize();
};

var _ = Button_addMemo.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('div');
	this.dom.className = 'addMemo';
	this.category.dom.appendChild(this.dom);
}

_._bindEvents = function(){
	var that = this;
	this.dom.onclick = function(){
		that.category.addMemo(new Memo(that.category, "Title", "Content"));
	}
}



var Memo = function(category, title, content){
	this.category = category;
	this.title = title;
	this.content = content;

	this._initialize();
};

var _ = Memo.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('div');
	this.dom.className = 'memo';
	this.dom.style.left = (this.category.memo.length % 2) * 290 + 20 + 'px';
	this.dom.style.top = Math.floor(this.category.memo.length / 2) * 360 + 45 + 'px';
	this.category.dom.appendChild(this.dom);

	var title = document.createElement('input');
	title.type = "text";
	title.className = "input_title";
	title.value = this.title;
	this.dom.appendChild(title);

	var content = document.createElement('textarea');
	content.className = "textarea_content";
	content.value = this.content;
	this.dom.appendChild(content);

};

_._bindEvents = function(){
	var that = this;


};

