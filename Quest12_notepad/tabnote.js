var Tabmemo = function(dom){
	this.dom = dom;
	this.memotitles = [];
	this.memocontents = [];
};

var _ = Tabmemo.prototype;

_.addmemo = function(memocontent, memotitle){
	this.memocontents.push(memocontent);
	this.memotitles.push(memotitle);
};
/*
function ShowTab(tabmemo, val){
	for ( i = 0 ; i < tabmemo.memotitles.length ; i++) {
	    var tab = document.getElementById('tab_' + i);
	    if (i != val) tab.style.display = "none";
	    else tab.style.display = "block";
	}
}
*/
var MemoTitle = function(tabmemo, title){
	this.tabmemo = tabmemo;
	this.title = title;
	this.number = this.tabmemo.memotitles.length;

	this._initialize();
};

var _ = MemoTitle.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('input');
	this.dom.type = "text";
	this.dom.className = 'title';
	this.dom.value = this.title;
	
	var tabtitle = document.getElementsByClassName("tabtitle")[0];
	tabtitle.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.onblur = function(){
		that.title = that.value;
	};

	this.dom.onclick = function(){
		for ( i = 0 ; i < that.tabmemo.memotitles.length ; i++) {
		    var content = document.getElementById('tab_' + i);	  
		    if (i != that.number) content.style.display = "none";
		    else content.style.display = "block";
		}
	}
};

var MemoContent = function(tabmemo, content){
	this.tabmemo = tabmemo;
	this.content = content;
	this.number = this.tabmemo.memocontents.length;

	this._initialize();
};

var _ = MemoContent.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('input');
	this.dom.type = "text";
	this.dom.value = this.content;
	this.dom.className = 'content';
	this.dom.id = 'tab_'+ this.number;

	var tabcontent = document.getElementsByClassName("tabcontent")[0];
	tabcontent.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.onblur = function(){
		that.content = that.value;
	};
};
//save: display가 block인 것을 저장!

/*
var Memo = function(tabmemo, title, content){
	this.tabmemo = tabmemo;
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

};

_._bindEvents = function(){

};
*/



/* Setting - Users에서
{
	"font_face": "나눔고딕코딩",
	"font_size": 10,
	"line_padding_top": 2,
	"line_padding_bottom": 2,
	"ignored_packages":
	[
		"Vintage"
	]
}
*/