var Page = function(tabmemo, newbutton, savebutton){
	this.tabmemo = tabmemo;
	this.newbutton = newbutton;
	this.savebutton = savebutton;

	this._initialize();
};

var _ = Page.prototype;

_.load = function(){
	var that = this;
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			var data = request.responseText;
			var dataArray = data.split(',');
			for ( i = 0 ; i < dataArray.length ; i++ ){
				new FileName(that.tabmemo, dataArray[i], false);
			}
		}
	};

	request.open("GET", "http://localhost:8888/load", true);
	request.send(null);
};

_._initialize = function(){
	this._bindEvents();
};

_._bindEvents = function(){
	var that = this;

	this.newbutton.onclick = function(){
		that.tabmemo.addmemo(new MemoContent(that.tabmemo, "Content"), new MemoTitle(that.tabmemo, "Title", true));
		that.tabmemo.setColor();
	};


	this.savebutton.onclick = function(){
		console.log("save");
		var memotitle;
		var memocontent;
		for( i = 0 ; i < that.tabmemo.memotitles.length; i++){
			if(that.tabmemo.memotitles[i].dom.className === "title clicked"){
				memotitle = that.tabmemo.memotitles[i];
				memocontent = that.tabmemo.memocontents[i];
			}
		}

		if(memotitle.newflag || (memotitle.pretitle === memotitle.title) || (memotitle.pretitle === "default") ){
			var data = "title="+memotitle.title+"&content="+memocontent.content;
			var request = new XMLHttpRequest();
			request.onreadystatechange = function(){
				if(request.readyState === 4 && request.status === 200){
					if(memotitle.newflag){
						memotitle.newflag = false;
						new FileName(that.tabmemo, memotitle.title, true);
					}
				}
			};
			request.open("POST", "http://localhost:8888/save", true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(data);
		}else{
			var data = "pretitle="+memotitle.pretitle+"&title="+memotitle.title+"&content="+memocontent.content;
			var request = new XMLHttpRequest();
			request.onreadystatechange = function(){
				if(request.readyState === 4 && request.status === 200){
					that.tabmemo.deleteFileName(memotitle.pretitle);
					new FileName(that.tabmemo, memotitle.title, true);
				}
			};
			request.open("POST", "http://localhost:8888/save_title_changed", true);
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			request.send(data);
		}

	};

};



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

_.setColor = function(){
	var num = this.memotitles.length;
	for ( i = 0 ; i < num ; i++) {
	    var tab = document.getElementsByClassName('title');	  
	    if (i != num-1 ){ 
	    	tab[i].className = "title"
		} else {
			tab[i].className = "title clicked"
		}
	}
};

_.deleteFileName = function(filename){
	var filelist = document.getElementsByClassName('filename');
	var files = document.getElementById("files");
	for (i = 0 ; i < filelist.length ; i++){
		console.log(filelist[i]);
		if(filelist[i].innerHTML === filename){
			console.log("delete");
			files.removeChild(filelist[i]);
		}
	}
};


var MemoTitle = function(tabmemo, title, newflag){
	this.tabmemo = tabmemo;
	this.title = title;
	this.newflag = newflag;
	this.number = this.tabmemo.memotitles.length;
	this.pretitle = "default";

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
		that.pretitle = that.title;
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

var FileName = function(tabmemo, filename, intab){
	this.tabmemo = tabmemo;
	this.filename = filename;
	this.intab = intab;
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
		if(that.intab){
			for ( i = 0 ; i < that.tabmemo.memotitles.length ; i++) {
			    var tab = document.getElementsByClassName('title');	  
			    var content = document.getElementById('tab_' + i);	

			    if (tab[i].value === that.filename ){ 
			    	tab[i].className = "title clicked"
					content.style.display = "block"; 	
				} else {
					tab[i].className = "title"
			    	content.style.display = "none";
				}
			}
		}else{
			var request = new XMLHttpRequest;
			request.onreadystatechange = function(){
				if(request.readyState === 4 && request.status === 200){
					var data = request.responseText;

					that.tabmemo.addmemo(new MemoContent(that.tabmemo, data), new MemoTitle(that.tabmemo, that.filename, false));
					that.tabmemo.setColor();
					that.intab = true;
				}
			}
			request.open("POST", "http://localhost:8888/fileload", true);
			request.setRequestHeader("Content-Type", "text/plain");
			request.send(that.filename);
		}
	};
};


