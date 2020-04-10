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
	
	var agents = [], collisionsMobileMean = 0, agentsMobileMean = 0;
	
	var socket = io.connect('http://localhost:3000');
	
	function init() {
		ctx = document.getElementById("myCanvas").getContext("2d");
		window.requestAnimationFrame(draw);
	}
	
	socket.on('update', function(data) {
        agents = data.agents;
		collisionsMobileMean = data.collisionsMobileMean;
		agentsMobileMean = data.agentsMobileMean;
    })
    
	function draw(timestamp) {
					        
        ctx.clearRect(0, 0, context.L, context.H);
		
		ctx.font = "20px Georgia";
		ctx.fillText(collisionsMobileMean.toFixed(0), context.L - 100, 30);
		ctx.fillText(agentsMobileMean.toFixed(0), context.L - 100, 60);
		
		for(var i = 0; i < agents.length; i++) {
			var agent = agents[i];			
			if(agent.info.type === "HIVE") {
				drawHive(agent);
			} else if(agent.info.type === "FLOWER") {
				drawFlower(agent);
			}
        }
		
		for(var i = 0; i < agents.length; i++) {
			var agent = agents[i];
			if(agent.info.type === "TOWARD_HIVE" || agent.info.type === "TOWARD_FLOWER") {
				drawPheromon(agent);
			}
        }
                
        for(var i = 0; i < agents.length; i++) {
			var agent = agents[i];
			if(agent.info.type === "BEE") {
				drawBee(agent);
			}
        }
		
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
    
    init();
};
