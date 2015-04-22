window.tabmemo = new Tabmemo(document.querySelectorAll('.tabmemo')[0]);
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab1 Content hahaha"), new MemoTitle(tabmemo, "Tab1"));
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab2 Content hahahaha"), new MemoTitle(tabmemo, "Tab2"));
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab3 Content hahahahahaha"), new MemoTitle(tabmemo, "Tab3"));

var NewButton = document.getElementById('newfile');

NewButton.onclick = function(){
	tabmemo.addmemo(new MemoContent(tabmemo, "Content"), new MemoTitle(tabmemo, "Title"));
	var num = tabmemo.memotitles.length;
	for ( i = 0 ; i < num ; i++) {
	    var tab = document.getElementsByClassName('title');	  
	    if (i != num-1 ){ 
	    	tab[i].className = "title"
		} else {
			tab[i].className = "title clicked"
		}
	}
};

var SaveButton = document.getElementById('save');

SaveButton.onclick = function(){
	console.log("save");
};

var LoadButton = document.getElementById('load');

LoadButton.onclick = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			var data = request.responseText;
			var dataArray = data.split(',');
			for ( i = 0 ; i < dataArray.length ; i++ ){
				new FileName(dataArray[i]);
			}
		}
	};

	request.open("GET", "http://localhost:8888/load", true);
	//request.setRequestHeader("Content-Type", "text/plain")
	request.send(null);
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
				tabmemo.addmemo(new MemoContent(tabmemo, data), new MemoTitle(tabmemo, that.filename));
				var num = tabmemo.memotitles.length;
				for ( i = 0 ; i < num ; i++) {
				    var tab = document.getElementsByClassName('title');	  
				    if (i != num-1 ){ 
				    	tab[i].className = "title"
					} else {
						tab[i].className = "title clicked"
					}
				}
			}
		}
		request.open("POST", "http://localhost:8888/fileload", true);
		request.setRequestHeader("Content-Type", "text/plain");
		request.send(that.filename);
	};
}


//new FileName("Memo1");
//new FileName("Memo2");