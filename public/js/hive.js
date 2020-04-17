window.onload = function() {
	var ctx = document.getElementById("myCanvas").getContext("2d");
    var lastTimestamp = 0;
    var interval = 100;
	var start = true;
	
	var context = {
		length: 800,
		width: 800
	};
	
	var collisionsMobileMean = 0, agentsMobileMean = 0, behaviorsMobileMean = 0;
	
	var agents = {
		flowers: [],
		pheromons: [],
		hives: [],
		bees: []
	};
	
	var socket = io.connect('http://localhost:3000/hive');
	
	let ui = new GameUI();
	ui.layout('props').at(context.length - 200)
		.preDraw(ctx => {
			ctx.fillStyle = "#000000";
		})
		.property('collisions').at(0, 30).withLabel('Collision tests').up()
		.property('agents').at(0, 60).withLabel('Agents').up()
		.property('behaviors').at(0, 90).withLabel('Behaviors');
	
	socket.on('update', function(data) {
		collisionsMobileMean = data.collisionsMobileMean;
		agentsMobileMean = data.agentsMobileMean;
		behaviorsMobileMean = data.behaviorsMobileMean;
		
		agents.hives = [];
		agents.flowers = [];
		agents.pheromons = [];
		agents.bees = [];
			
		data.agents.forEach((agent, i) => {
			agent.shape.center = correctPosition(agent.shape.center, context.length * 1.0 / data.length, context.width * 1.0 / data.width);
			
			switch(agent.info.type) {
				case "HIVE":
					agents.hives.push(agent);
					break;
				case "FLOWER":
					agents.flowers.push(agent);
					break;
				case "TOWARD_HIVE":
				case "TOWARD_FLOWER":
					agents.pheromons.push(agent);
					break;
				case "BEE":
					agents.bees.push(agent);
					break;
				default:
					break;
			}
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
			.property("collisions").withValue(collisionsMobileMean.toFixed(0)).up()
			.property("agents").withValue(agentsMobileMean.toFixed(0)).up()
			.property("behaviors").withValue(behaviorsMobileMean.toFixed(0));
				
		agents.hives.forEach(a => drawHive(a));
		agents.flowers.forEach(a => drawFlower(a));
		agents.pheromons.forEach(a => drawPheromon(a));
		agents.bees.forEach(a => drawBee(a));
		
		ui.draw(ctx);
		
		window.requestAnimationFrame(draw);
	}
	
	function drawBee(bee) {
		var shape = bee.shape;
		
		ctx.fillStyle = "#ff0000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawPheromon(pheromon) {
		var shape = pheromon.shape;
		
		ctx.fillStyle = "#00ff00";
		ctx.globalAlpha = 0.2;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawHive(hive) {
		var shape = hive.shape;
		
		ctx.fillStyle = "#0000ff";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawFlower(flower) {
		var shape = flower.shape;
		
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
    
    window.requestAnimationFrame(draw);
};
