window.tabmemo = new Tabmemo(document.querySelectorAll('.tabmemo')[0]);
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab1 Content hahaha"), new MemoTitle(tabmemo, "Tab1"));
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab2 Content hahahaha"), new MemoTitle(tabmemo, "Tab2"));
//tabmemo.addmemo(new MemoContent(tabmemo, "Tab3 Content hahahahahaha"), new MemoTitle(tabmemo, "Tab3"));
var load = function(){
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			var data = request.responseText;
			var dataArray = data.split(',');
			for ( i = 0 ; i < dataArray.length ; i++ ){
				new FileName(tabmemo, dataArray[i]);
			}
		}
	};

	request.open("GET", "http://localhost:8888/load", true);
	request.send(null);
};


window.onload = load();


var NewButton = document.getElementById('newfile');

NewButton.onclick = function(){
	tabmemo.addmemo(new MemoContent(tabmemo, "Content"), new MemoTitle(tabmemo, "Title", true));
	setColor(tabmemo);
};

var SaveButton = document.getElementById('save');

SaveButton.onclick = function(){
	console.log("save");
	var memotitle;
	var memocontent;
	for( i = 0 ; i < tabmemo.memotitles.length; i++){
		if(tabmemo.memotitles[i].dom.className === "title clicked"){

			memotitle = tabmemo.memotitles[i];
			memocontent = tabmemo.memocontents[i];
		}
	}

	if(memotitle.newflag || (memotitle.pretitle === memotitle.title)){

		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState === 4 && request.status === 200){
				

			}
		};

		request.open("POST", "http://localhost:8888/save", true);
		request.setRequestHeader("Content-Type", "text/plain");
		request.send(memotitle.title &  memocontent.content);

	}else{

		var request = new XMLHttpRequest();
		request.onreadystatechange = function(){
			if(request.readyState === 4 && request.status === 200){
				

			}
		};

		request.open("POST", "http://localhost:8888/save_title_changed", true);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send("pretitle=memotitle.pretitle & title=memotitle.title & content=memocontent.content");
		//post data 보내는 방법, 받는 방법 !!!!!!!!!!!!!!!!!!!!

	}

/*
	var request = new XMLHttpRequest();
	request.onreadystatechange = function(){
		if(request.readyState === 4 && request.status === 200){
			

		}
	};

	request.open("POST", "http://localhost:8888/save", true);
	request.setRequestHeader("Content-Type", "text/plain");
	request.send(memotitle.title &  memocontent.content);
*/
};

