var figures = [];

document.onkeydown = function(e){
	socket.emit('keydown',{key: e.keyCode});
	for( var i=0 ; i<figures.length ; i++){
		if(figures[i].active==1){
			if(e.keyCode == 37){//left
				if(figures[i].type == "circle"){
					figures[i].dom.cx.baseVal.value -= 1;
					figures[i].cx -= 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.x.baseVal.value -= 1;
					figures[i].x -= 1;
				}else{
					var x_a = (figures[i].point_a).split(",")[0];
					var y_a = (figures[i].point_a).split(",")[1];
					x_a = x_a*1 - 1;
					figures[i].point_a = x_a + "," +y_a;

					var x_b = (figures[i].point_b).split(",")[0];
					var y_b = (figures[i].point_b).split(",")[1];
					x_b = x_b*1 - 1;
					figures[i].point_b = x_b + "," +y_b;

					var x_c = (figures[i].point_c).split(",")[0];
					var y_c = (figures[i].point_c).split(",")[1];
					x_c = x_c*1 - 1;
					figures[i].point_c = x_c + "," +y_c;

					var points = figures[i].point_a+" "+figures[i].point_b+" "+figures[i].point_c;
					figures[i].dom.setAttribute("points", points);
				}
			}else if(e.keyCode == 38){//up
				if(figures[i].type == "circle"){
					figures[i].dom.cy.baseVal.value -= 1;
					figures[i].cy -= 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.y.baseVal.value -= 1;
					figures[i].y -= 1;
				}else{
					var x_a = (figures[i].point_a).split(",")[0];
					var y_a = (figures[i].point_a).split(",")[1];
					y_a = y_a*1 - 1;
					figures[i].point_a = x_a + "," +y_a;

					var x_b = (figures[i].point_b).split(",")[0];
					var y_b = (figures[i].point_b).split(",")[1];
					y_b = y_b*1 - 1;
					figures[i].point_b = x_b + "," +y_b;

					var x_c = (figures[i].point_c).split(",")[0];
					var y_c = (figures[i].point_c).split(",")[1];
					y_c = y_c*1 - 1;
					figures[i].point_c = x_c + "," +y_c;

					var points = figures[i].point_a+" "+figures[i].point_b+" "+figures[i].point_c;
					figures[i].dom.setAttribute("points", points);
				}
			}else if(e.keyCode == 39){//right
				if(figures[i].type == "circle"){
					figures[i].dom.cx.baseVal.value += 1;
					figures[i].cx += 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.x.baseVal.value += 1;
					figures[i].x += 1;
				}else{
					var x_a = (figures[i].point_a).split(",")[0];
					var y_a = (figures[i].point_a).split(",")[1];
					x_a = x_a*1 + 1;
					figures[i].point_a = x_a + "," +y_a;

					var x_b = (figures[i].point_b).split(",")[0];
					var y_b = (figures[i].point_b).split(",")[1];
					x_b = x_b*1 + 1;
					figures[i].point_b = x_b + "," +y_b;

					var x_c = (figures[i].point_c).split(",")[0];
					var y_c = (figures[i].point_c).split(",")[1];
					x_c = x_c*1 + 1;
					figures[i].point_c = x_c + "," +y_c;

					var points = figures[i].point_a+" "+figures[i].point_b+" "+figures[i].point_c;
					figures[i].dom.setAttribute("points", points);
				}
			}else if(e.keyCode == 40){//down
				if(figures[i].type == "circle"){
					figures[i].dom.cy.baseVal.value += 1;
					figures[i].cy += 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.y.baseVal.value += 1;
					figures[i].y += 1;
				}else{
					var x_a = (figures[i].point_a).split(",")[0];
					var y_a = (figures[i].point_a).split(",")[1];
					y_a = y_a*1 + 1;
					figures[i].point_a = x_a + "," +y_a;

					var x_b = (figures[i].point_b).split(",")[0];
					var y_b = (figures[i].point_b).split(",")[1];
					y_b = y_b*1 + 1;
					figures[i].point_b = x_b + "," +y_b;

					var x_c = (figures[i].point_c).split(",")[0];
					var y_c = (figures[i].point_c).split(",")[1];
					y_c = y_c*1 + 1;
					figures[i].point_c = x_c + "," +y_c;

					var points = figures[i].point_a+" "+figures[i].point_b+" "+figures[i].point_c;
					figures[i].dom.setAttribute("points", points);
				}
			}else if(e.keyCode == 46){//delete
				figures[i].svg.dom.removeChild(figures[i].dom);
				figures.splice(i,1);
				i--;
			}
		}
	}
}


var Svg = function(dom){
	this.dom = dom;
};

var Circle = function(svg, r){
	this.svg = svg;
	this.r = r;
	this.cx = r*1+10;
	this.cy = r*1+10;
	this.active = 0;
	this.type = "circle";

	figures.push(this);

	this._initialize();
};

var _ = Circle.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	var svgns = "http://www.w3.org/2000/svg";
	this.dom = document.createElementNS(svgns, "circle");
	this.dom.setAttribute("r", this.r);
	this.dom.setAttribute("cx", this.cx);
	this.dom.setAttribute("cy", this.cy);
	this.dom.style.fill="red";

	this.svg.dom.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.ondblclick = function(){
		if(that.active == 1) { //비활성화시키기
			that.active = 0;
			that.dom.style.stroke="none";
		}else{ //활성화시키기
			that.active = 1;
			that.dom.style.stroke="#eed570";
			that.dom.style.strokeWidth=5;
			that.dom.style.strokeOpacity=0.8;
		}
		socket.emit("active", {figures: figures});
	}

	


};

var Rectangle = function(svg, x, y){
	this.svg = svg;
	this.width = x;
	this.height = y;
	this.x = 10;
	this.y = 10;
	this.active = 0;
	this.type = "rectangle";

	figures.push(this);

	this._initialize();
};

var _ = Rectangle.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	var svgns = "http://www.w3.org/2000/svg";
	this.dom = document.createElementNS(svgns, "rect");
	this.dom.setAttribute("width", this.width);
	this.dom.setAttribute("height", this.height);
	this.dom.setAttribute("x", this.x);
	this.dom.setAttribute("y", this.y);
	this.dom.style.fill="red";

	this.svg.dom.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.ondblclick = function(){
		if(that.active == 1) { //비활성화
			that.active = 0;
			that.dom.style.stroke="none";
		}else{ //활성화
			that.active = 1;
			that.dom.style.stroke="#eed570";
			that.dom.style.strokeWidth=5;
			that.dom.style.strokeOpacity=0.8;
		}
		socket.emit("active", {figures: figures});
	}


};

var Triangle = function(svg, point_a, point_b, point_c){
	this.svg = svg;
	this.point_a = point_a;
	this.point_b = point_b;
	this.point_c = point_c;
	this.active = 0;
	this.type = "triangle";

	figures.push(this);

	this._initialize();
};

var _ = Triangle.prototype;

_._initialize = function(){
	this._setDom();
	this._bindEvents();
};

_._setDom = function(){
	var svgns = "http://www.w3.org/2000/svg";
	this.dom = document.createElementNS(svgns, "polygon");
	var points = this.point_a+" "+this.point_b+" "+this.point_c;
	this.dom.setAttribute("points", points);
	this.dom.style.fill="red";

	this.svg.dom.appendChild(this.dom);
};

_._bindEvents = function(){
	var that = this;

	this.dom.ondblclick = function(){
		if(that.active == 1) { //비활성화
			that.active = 0;
			that.dom.style.stroke="none";
		}else{ //활성화
			that.active = 1;
			that.dom.style.stroke="#eed570";
			that.dom.style.strokeWidth=5;
			that.dom.style.strokeOpacity=0.8;
		}
		socket.emit("active", {figures: figures});
	}


};

//Buttons//////////////////////////////////////////////////////////////////////////////////////

var ButtonCircle = function(svg, dom){
	this.dom = dom;
	this.svg = svg;

	this._bindEvents();
};

var _ = ButtonCircle.prototype;

_._bindEvents = function(){
	var that = this;
	this.dom.onclick = function(){
		var r = document.getElementById("r").value;
		new Circle(that.svg, r);
		console.log("new circle");
		socket.emit('new circle', {r: r});
	}

};

var ButtonRectangle = function(svg, dom){
	this.dom = dom;
	this.svg = svg;

	this._bindEvents();
};

var _ = ButtonRectangle.prototype;

_._bindEvents = function(){
	var that = this;
	this.dom.onclick = function(){
		var x = document.getElementById("x").value;
		var y = document.getElementById("y").value;
		new Rectangle(that.svg, x, y);
		console.log("new rectangle");
		socket.emit('new rectangle', {x: x, y: y});
	}
};

var ButtonTriangle = function(svg, dom){
	this.dom = dom;
	this.svg = svg;

	this._bindEvents();
};

var _ = ButtonTriangle.prototype;

_._bindEvents = function(){
	var that = this;
	this.dom.onclick = function(){
		var point_a = document.getElementById("a").value;
		var point_b = document.getElementById("b").value;
		var point_c = document.getElementById("c").value;
		new Triangle(that.svg, point_a, point_b, point_c);
		console.log("new triangle");
		socket.emit('new triangle', {a: point_a, b: point_b, c: point_c});
	}
};

