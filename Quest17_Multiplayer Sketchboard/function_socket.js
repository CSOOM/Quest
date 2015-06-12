var svg = new Svg(document.getElementsByTagName("svg")[0]);
new ButtonCircle(svg, document.getElementById("circle"));
new ButtonRectangle(svg, document.getElementById("rectangle"));
new ButtonTriangle(svg, document.getElementById("triangle"));

var socket = io.connect('http://localhost:2222', {
	'reconnect': true,
	'resource' : 'socket.io'
});

socket.on('connect', function(){
	console.log('연결됐습니다');
});

socket.on('information', function(data){
	socket.emit('information', {figures: figures});
});

socket.on('set', function(data){
	if(figures.length == 0){
		var set_figures = data.figures;
		for(var i=0;i<set_figures.length;i++){
			if(set_figures[i].type == "circle"){
				var circle = new Circle(svg, set_figures[i].r);
				circle.dom.setAttribute("cx", set_figures[i].cx);
				circle.dom.setAttribute("cy", set_figures[i].cy);
				figures[i].cx = set_figures[i].cx;
				figures[i].cy = set_figures[i].cy;
			}else if(set_figures[i].type == "rectangle"){
				var rectangle = new Rectangle(svg, set_figures[i].width, set_figures[i].height);
				rectangle.dom.setAttribute("x", set_figures[i].x);
				rectangle.dom.setAttribute("y", set_figures[i].y);
				figures[i].x = set_figures[i].x;
				figures[i].y = set_figures[i].y;
			}else if(set_figures[i].type == "triangle"){
				new Triangle(svg, set_figures[i].point_a, set_figures[i].point_b, set_figures[i].point_c);
			}

			if(set_figures[i].active == 1){
				figures[i].active = 1;
				figures[i].dom.style.stroke="#eed570";
				figures[i].dom.style.strokeWidth=5;
				figures[i].dom.style.strokeOpacity=0.8;
			}
		}
		console.log("setting finish");
	}
	
});

socket.on('new circle', function(data){
	new Circle(svg, data.r);
});

socket.on('new rectangle', function(data){
	new Rectangle(svg, data.x, data.y);
});

socket.on('new triangle', function(data){
	new Triangle(svg, data.a, data.b, data.c);
});

socket.on('active', function(data){
	var active_figures = data.figures;
	for(var i=0;i<active_figures.length;i++){
		figures[i].active = active_figures[i].active;
		if(figures[i].active == 0) { //비활성화
			figures[i].dom.style.stroke="none";
		}else{ //활성화
			figures[i].dom.style.stroke="#eed570";
			figures[i].dom.style.strokeWidth=5;
			figures[i].dom.style.strokeOpacity=0.8;
		}
	}
});

socket.on('keydown', function(data){
	for( var i=0 ; i<figures.length ; i++){
		if(figures[i].active==1){
			if(data.key == 37){//left
				if(figures[i].type == "circle"){
					figures[i].dom.cx.baseVal.value -= 1;
					figures[i].cx -= 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.x.baseVal.value -= 1
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
			}else if(data.key== 38){//up
				if(figures[i].type == "circle"){
					figures[i].dom.cy.baseVal.value -= 1;
					figures[i].cy -= 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.y.baseVal.value -= 1
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
			}else if(data.key == 39){//right
				if(figures[i].type == "circle"){
					figures[i].dom.cx.baseVal.value += 1;
					figures[i].cx += 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.x.baseVal.value += 1
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
			}else if(data.key == 40){//down
				if(figures[i].type == "circle"){
					figures[i].dom.cy.baseVal.value += 1;
					figures[i].cy += 1;
				}else if(figures[i].type == "rectangle"){
					figures[i].dom.y.baseVal.value += 1
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
			}else if(data.key == 46){//delete
				figures[i].svg.dom.removeChild(figures[i].dom);
				figures.splice(i,1);
				i--;
			}
		}
	}
});