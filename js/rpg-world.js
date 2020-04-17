import World from './core/world';
import ClearEngine from './core/engine/clear-engine';
import GridEngine from './core/engine/grid-engine';
import MobileMeanExtractor from './core/statistics/mobile-mean-extractor';

import Agent from './core/agent/agent';
import {Polygone} from './core/shape/polygone';
import BasicPhysics from './core/physics/basic-physics';

class Wall extends Agent {
	constructor(polygone) {
		super(polygone, new BasicPhysics());
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}

function mapAgentToClient(agent) {
	return {
		info: agent.interact(),
		physics: agent.getPhysics(),
		shape: agent.getShape()
	};
}

export default class RPGWorld {
	constructor(width, length) {
		this.length = length;
		this.width = width;
		this.pause = true;
		
		this.gridEngine = new GridEngine(20, 20);

		this.world = new World(100)
					.withEngine('clear', new ClearEngine())
					.withEngine('grid', this.gridEngine);
		
		let c = new Wall(new Polygone(
			{x:50,y:50}, 
			{x:50,y:100}, 
			{x:100,y:100}, 
			{x:100,y:50}));
		this.world.addAgent(c);
										
		this.agentsMobileMean = new MobileMeanExtractor(this.world, w => w.agents.length, 20);
		this.behaviorsMobileMean = new MobileMeanExtractor(this.world, w => w.behaviors.length, 20);
	}
	
	advance() {
		if(!this.pause) {
			this.world.advance();
		}
	}
	
	togglePause(pause) {
		this.pause = pause;
	}
	
	getState() {
		return {
			agents: this.world.agents.map(mapAgentToClient),
			agentsMobileMean: this.agentsMobileMean.update(),
			behaviorsMobileMean: this.behaviorsMobileMean.update(),
			length: this.length,
			width: this.width,
			grid: this.gridEngine.grid
			
		};
	}
}
