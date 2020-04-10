"use strict";

var EngineInterface = new Interface('Engine', 'run');

class StatisticExtractor {
	constructor(source, extractorFn) {
		this.extractorFn = extractorFn;
		this.source = source;
		this.statistic = null;
	}
	
	update() {
		var newValue = this.extractorFn(this.source);
		this.statistic = this.processNewValue(newValue);
		return this.statistic;
	}
	
	processNewValue(newValue) {
		return newValue;
	}
}

class MobileMeanExtractor extends StatisticExtractor {
	constructor(source, extractorFn, maxValuesNb) {
		super(source, extractorFn);
		
		this.maxValuesNb = maxValuesNb;
		this.lastValues = [];
	}
	
	processNewValue(newValue) {
		var n = this.lastValues.length;
		
		this.lastValues.push(newValue);

		if(n > 0) {
			if(n > this.maxValuesNb) {
				var oldestValue = this.lastValues.shift();
				return this.statistic + (newValue - oldestValue) / n;
			}
			return (this.statistic * n + newValue) / (n + 1);
		}
		
		return newValue;
	}
}

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