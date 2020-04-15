import SpatialSearchCollisionFinder from './core/collision/spatial-search-collision-finder';
import CircleCollisionResolver from './core/collision/circle-collision-resolver';
import World from './core/world';

import CollisionEngine from './core/engine/collision-engine';
import RoundWorldEngine from './core/engine/round-world-engine';
import ClearEngine from './core/engine/clear-engine';

import MobileMeanExtractor from './core/statistics/mobile-mean-extractor';

import {generateFlower, generateHive} from './hive/hive-agent-factory';

function mapAgentToClient(agent) {
	return {
		info: agent.interact(),
		physics: agent.getPhysics(),
		shape: agent.getShape()
	};
}

export default class HiveWorld {
	constructor(width, length) {
		this.length = length;
		this.width = width;
		this.pause = true;
		
		//var collisionEngine = new CollisionEngine(new BasicCollisionFinder());
		this.collisionEngine = new CollisionEngine(
			new SpatialSearchCollisionFinder(
				new CircleCollisionResolver(), width / 2, length / 2));

		this.world = new World(100)
					.withEngine(new ClearEngine())
					.withEngine(new RoundWorldEngine(width, length))
					.withEngine(this.collisionEngine);
					
		generateFlower(this.world, {x: 300, y: 300});
		generateHive(this.world, {x: 10, y: 10}, 5);
					
		this.collisionsMobileMean = new MobileMeanExtractor(this.collisionEngine, e => e.collisionFinder.getLastComputations(), 20);
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
			collisionsMobileMean: this.collisionsMobileMean.update(),
			agentsMobileMean: this.agentsMobileMean.update(),
			behaviorsMobileMean: this.behaviorsMobileMean.update(),
			length: this.length,
			width: this.width
			
		};
	}
}
