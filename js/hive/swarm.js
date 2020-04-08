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
	
	var world;
	var agents = [];
	
	function init() {
		ctx = document.getElementById("myCanvas").getContext("2d");
		
		world = new World(100)
			.withEngine(new ClearEngine())
			.withEngine(new RoundWorldEngine(context.L, context.H))
			.withEngine(new CollisionEngine(new BasicCollisionFinder()))
			.withAgent(HiveAgentFactory.generateFlower({x: 300, y: 300}))
			.withAgent(HiveAgentFactory.generateHive({x: 10, y: 10}, 5));
        		
		window.requestAnimationFrame(draw);
	}
    
	function draw(timestamp) {
		
		world.advance();
			        
        ctx.clearRect(0, 0, context.L, context.H);
		
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
		var shape = bee.getPhysics().shape;
		
		ctx.fillStyle = "#ff0000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawPheromon(pheromon) {
		var shape = pheromon.getPhysics().shape;
		
		ctx.fillStyle = "#00ff00";
		ctx.globalAlpha = 0.2;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawHive(hive) {
		var shape = hive.getPhysics().shape;
		
		ctx.fillStyle = "#0000ff";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function drawFlower(flower) {
		var shape = flower.getPhysics().shape;
		
		ctx.fillStyle = "#000000";
		ctx.globalAlpha = 1;
		ctx.beginPath();
		ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
		ctx.fill();
	}
    
    init();
};

