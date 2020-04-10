"use strict";

const EngineInterface = require('./engine-interface');





class CollisionEngine {
	constructor(collisionFinder) {
		Interface.checkImplements(this, EngineInterface);
		
		this.collisionFinder = collisionFinder;
	}
	
	run(world) {
		var collisions = this.collisionFinder.search(world.agents.map(a => a.getShape()));
		
		// Handle collisions
		for(var i = 0; i < collisions.length; i++) {
			var agent1 = world.agents[collisions[i].i1];
			var agent2 = world.agents[collisions[i].i2];
			
			agent1.react(world, agent2.interact());
			agent2.react(world, agent1.interact());
		}
	}
}

class ClearEngine {
	constructor() {
		Interface.checkImplements(this, EngineInterface);
	}
	
	run(world) {
		// Remove destroyed agents
		var i = 0;
		while(i < world.agents.length) {
			if(world.agents[i].isDestroyed()) {
				world.agents.splice(i, 1);
			} else {
				i++;
			}
		}
	}
}

class RoundWorldEngine {
	constructor(width, height) {
		Interface.checkImplements(this, EngineInterface);
		
		this.width = width;
		this.height = height;
	}
	
	run(world) {
		for(var i = 0; i < world.agents.length; i++) {
			var center = world.agents[i].getShape().center;
			if(center.x < 0) {
				center.x = this.width;
			} else if(center.x > this.width) {
				center.x = 0;
			} else if(center.y < 0) {
				center.y = this.height;
			} else if(center.y > this.height) {
				center.y = 0;
			}
		}
	}
}

module.exports = CollisionEngine;