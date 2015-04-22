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
		that.title = this.value;
	};

	this.dom.onclick = function(){
		for ( i = 0 ; i < that.tabmemo.memotitles.length ; i++) {
		    var content = document.getElementById('tab_' + i);
		    var tab = document.getElementsByClassName('title');	  
		    if (i != that.number){ 
		    	content.style.display = "none";
		    	tab[i].className = "title"
			} else {
				content.style.display = "block";
				tab[i].className = "title clicked"
			}
		}
	};
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
	this.dom = document.createElement('textarea');
	this.dom.value = this.content;
	this.dom.className = 'content';
	this.dom.id = 'tab_'+ this.number;

	var tabcontent = document.getElementsByClassName("tabcontent")[0];
	tabcontent.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.onblur = function(){
		that.content = this.value;
	};
};

var FileName = function(filename){
	this.filename = filename;

	this._initialize();
};

var _ = FileName.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	this.dom = document.createElement('li');
	this.dom.className = 'filename';
	this.dom.innerHTML = this.filename;

	var files = document.getElementById("files");
	files.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.ondblclick = function(){ //해당 파일 load
		console.log(that.filename);
		var request = new XMLHttpRequest;
		request.onreadystatechange = function(){
			if(request.readyState === 4 && request.status === 200){
				var data = request.responseText;
				var tabmemo = document.getElementsByClassName('tabmemo')[0];
				tabmemo.addMemo(new MemoContent(tabmemo, data), new MemoTitle(tabmemo, that.filename));
			}
		}
		request.open("POST", "http://localhost:8888/fileload", true);
		request.setRequestHeader("Content-Type", "text/plain");
		request.send(that.filename);
	};
}


//save: display가 block인 것을 저장!

