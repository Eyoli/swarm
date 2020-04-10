"use strict";

window.onload = function() {
	var ctx;
    var lastTimestamp = 0;
    var interval = 100;
	var start = true;
	
	var context = {
		L: 1000,
		H: 800
	};
	
	var world, collisionsMobileMean, agentsMobileMean;
	
	function init() {
		ctx = document.getElementById("myCanvas").getContext("2d");
		
		//var collisionEngine = new CollisionEngine(new BasicCollisionFinder());
		var collisionEngine = new CollisionEngine(
			new SpatialSearchCollisionFinder(
				new CircleCollisionResolver(), context.L / 2, context.H / 2));
		
		world = new World(100)
			.withEngine(new ClearEngine())
			.withEngine(new RoundWorldEngine(context.L, context.H))
			.withEngine(collisionEngine)
			.withAgent(HiveAgentFactory.generateFlower({x: 300, y: 300}))
			.withAgent(HiveAgentFactory.generateHive({x: 10, y: 10}, 5));
			
		collisionsMobileMean = new MobileMeanExtractor(collisionEngine, e => e.collisionFinder.getLastComputations(), 20);
		agentsMobileMean = new MobileMeanExtractor(world, w => w.agents.length, 20);
        		
		window.requestAnimationFrame(draw);
	}
    
	function draw(timestamp) {
		
		world.advance();
					        
        ctx.clearRect(0, 0, context.L, context.H);
		
		ctx.font = "20px Georgia";
		ctx.fillText(collisionsMobileMean.update().toFixed(0), context.L - 100, 30);
		ctx.fillText(agentsMobileMean.update().toFixed(0), context.L - 100, 60);
		
		for(var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			if(agent.interact().type === "HIVE") {
				drawHive(agent);
			} else if(agent.interact().type === "FLOWER") {
				drawFlower(agent);
			}
        }
		
		for(var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			if(agent.interact().type === "TOWARD_HIVE" || agent.interact().type === "TOWARD_FLOWER") {
				drawPheromon(agent);
			}
        }
                
        for(var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			if(agent.interact().type === "BEE") {
				drawBee(agent);
			}
        }
		
		window.requestAnimationFrame(draw);
	}
	
	function drawBee(bee) {
		var shape = bee.getShape();
		
		ctx.fillStyle = "#ff0000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawPheromon(pheromon) {
		var shape = pheromon.getShape();
		
		ctx.fillStyle = "#00ff00";
		ctx.globalAlpha = 0.2;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawHive(hive) {
		var shape = hive.getShape();
		
		ctx.fillStyle = "#0000ff";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawFlower(flower) {
		var shape = flower.getShape();
		
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
    
    init();
};

