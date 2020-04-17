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
	
	var agents = [];
	
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
			
		agents = data.agents || [];
		agents.forEach((agent, i) => {
			agent.shape.center = correctPosition(agent.shape.center, context.length * 1.0 / data.length, context.width * 1.0 / data.width);
		});
    })
	
	function correctPosition(position, lengthCorrection, widthCorrection) {
		return {
			x: position.x * lengthCorrection,
			y: position.y * widthCorrection
		};
	}
    
	function draw(timestamp) {
					        
        ctx.clearRect(0, 0, context.length, context.width);
		
		ctx.font = "20px Georgia";
		ui.layout('props')
			.property("agents").withValue(agentsMobileMean.toFixed(0)).up()
			.property("behaviors").withValue(behaviorsMobileMean.toFixed(0));
				
		agents.forEach(a => drawPolygone(a));
		
		ui.draw(ctx);
		
		window.requestAnimationFrame(draw);
	}
	
	function drawPolygone(polygone) {
		var shape = polygone.shape;
		
		ctx.beginPath(); 
		ctx.moveTo(shape.center.x + shape.summits[0].x, shape.center.y + shape.summits[0].y);
		shape.summits.forEach(summit => {
			ctx.lineTo(shape.center.x + summit.x, shape.center.y + summit.y);
		});
		ctx.lineTo(shape.center.x + shape.summits[0].x, shape.center.y + shape.summits[0].y);
		ctx.stroke();
	}
    
    window.requestAnimationFrame(draw);
};
