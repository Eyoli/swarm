window.onload = function() {
	var ctx = document.getElementById("myCanvas").getContext("2d");
    var lastTimestamp = 0;
    var interval = 100;
	var start = true;
	
	var context = {
		length: 800,
		width: 800
	};
	
	var agentsMobileMean = 0, behaviorsMobileMean = 0;
	
	var state = {
		agents: []
	};
	
	var socket = io.connect('http://localhost:3000/grid');
	
	let ui = new GameUI();
	ui.layout('props').at(context.length - 200)
		.preDraw(ctx => {
			ctx.fillStyle = "#000000";
		})
		.property('agents').at(0, 30).withLabel('Agents').up()
		.property('behaviors').at(0, 60).withLabel('Behaviors');
	
	socket.on('update', function(data) {
		agentsMobileMean = data.agentsMobileMean;
		behaviorsMobileMean = data.behaviorsMobileMean;
		
		state.cx = context.length * 1.0 / data.length;
		state.cy = context.width * 1.0 / data.width;
			
		state.agents = data.agents || [];
		state.grid = data.grid;
    })
    
	function draw(timestamp) {
					        
        ctx.clearRect(0, 0, context.length, context.width);
		
		ctx.font = "20px Georgia";
		ui.layout('props')
			.property("agents").withValue(agentsMobileMean.toFixed(0)).up()
			.property("behaviors").withValue(behaviorsMobileMean.toFixed(0));
				
		drawGrid(state.grid);
		state.agents.forEach(a => drawPolygone(a));
		
		ui.draw(ctx);
		
		window.requestAnimationFrame(draw);
	}
	
	function drawGrid(grid) {
		ctx.globalAlpha = 0.2;
		
		if(grid) {
			let nodeSpan = context.width / grid.length;
			
			grid.forEach(
				(row, i) => row.forEach((node, j) => {
					ctx.beginPath();
					ctx.fillStyle = node ? "#ff0000" : "#000000";
					ctx.beginPath();
					ctx.arc((nodeSpan / 2) + i * nodeSpan, (nodeSpan / 2) + j * nodeSpan, nodeSpan / 2, 0, 2 * Math.PI);
					ctx.fill();
				}));
		}
	}
	
	function drawPolygone(polygone) {
		ctx.globalAlpha = 1;
		
		var shape = polygone.shape;
		
		ctx.beginPath(); 
		ctx.moveTo(state.cx * (shape.center.x + shape.summits[0].x), state.cy * (shape.center.y + shape.summits[0].y));
		shape.summits.forEach(summit => {
			ctx.lineTo(state.cx * (shape.center.x + summit.x), state.cy * (shape.center.y + summit.y));
		});
		ctx.lineTo(state.cx * (shape.center.x + shape.summits[0].x), state.cx * (shape.center.y + shape.summits[0].y));
		ctx.stroke();
	}
    
    window.requestAnimationFrame(draw);
};
