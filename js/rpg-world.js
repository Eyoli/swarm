import World from './core/world';
import ClearEngine from './core/engine/clear-engine';
import WorldGrid from './core/service/path/world-grid';
import GridService from './core/service/grid-service';
import MobileMeanExtractor from './core/statistics/mobile-mean-extractor';

import Agent from './core/agent/agent';
import Polygone from './core/shape/polygone';
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
		
		const gridService = new GridService(new WorldGrid(width, length, 10, 10));

		this.world = new World(100)
					.withEngine('clear', new ClearEngine())
					.withService('grid', gridService);
		
		const p = new Polygone(
			{x:1,y:1}, 
			{x:0,y:3}, 
			{x:5,y:5},
			{x:5,y:1});
		this.world.addAgent(new Wall(p));		
		
		this.shortestPath = this.world.getService('grid').getShortestPath(this.world, {x:0, y:0}, {x:9, y:9});
										
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
			grid: this.world.getService('grid').getGrid(this.world),
			path: this.shortestPath
			
		};
	}
}
