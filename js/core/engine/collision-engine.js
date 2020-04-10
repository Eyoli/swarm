"use strict";

const Interface = require('../interface');
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

module.exports = CollisionEngine;