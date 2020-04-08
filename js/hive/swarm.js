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
	
	function generateBee(position) {
		return new Bee(position, 2 * Math.PI * Math.random());
	}
	
	function generatePheromon(position) {
		return new TimedAgent(new Pheromon(position), 100);
	}
	
	function init() {
		ctx = document.getElementById("myCanvas").getContext("2d");
		
		world = new World(10)
			.withEngine(new ClearEngine())
			.withEngine(new RoundWorldEngine(context.L, context.H))
			.withEngine(new CollisionEngine(new BasicCollisionFinder()))
			.withAgent(generateBee({x: 200, y: 200}))
			.withAgent(generateBee({x: 400, y: 400}))
			.withAgent(new Flower({x: 300, y: 300}))
			.withAgent(generatePheromon({x: 500, y: 500}));
        		
		window.requestAnimationFrame(draw);
	}
    
	function draw(timestamp) {
		
		world.advance();
			        
        ctx.clearRect(0, 0, context.L, context.H);
                
        for(var i = 0; i < world.agents.length; i++) {
			var agent = world.agents[i];
			var shape = agent.getPhysics().shape;
			
			ctx.fillStyle = "#ff0000";
			ctx.globalAlpha = 1;
			ctx.beginPath();
			ctx.arc(shape.center.x, shape.center.y, shape.radius, 0, 2 * Math.PI);
			ctx.fill();
        }
		
		window.requestAnimationFrame(draw);
	}
    
    init();
};

