import World from './core/model/world';
import ClearEngine from './core/model/engine/clear-engine';
import WorldGrid from './core/service/path/world-grid';
import GridService from './core/service/grid-service';
import MobileMeanExtractor from './core/statistics/mobile-mean-extractor';

import Agent from './core/model/agent/agent';
import Polygone from './core/model/shape/polygone';
import BasicPhysics from './core/model/physics/basic-physics';

import Behavior from './core/model/behavior/behavior';
import Circle from './core/model/shape/circle';
import TypedAgent from './utils/agent/typed-agent';
import MoveBehavior from './utils/behavior/move-behavior';
import {computeDistanceInfo} from './core/math';

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

class Dupe extends Agent {
	constructor(position) {
		const speed = {amp: 1, angle: 0, max: 0.1};
		const followTargetBehavior = new FollowTargetBehavior();
		
		super(
			new Circle(position, 1), 
			new BasicPhysics(speed, 0),
			followTargetBehavior
		);
		
		this.followTargetBehavior = followTargetBehavior;
	}
	
	react(world, info) {
		if(info.target) {
			this.followTargetBehavior.setTarget(info.target);
		}
	}
	
	interact() {
		return {
		};
	}
}

class Target extends Agent {
	constructor(position) {
		
		super(
			new Circle(position, 1), 
			new BasicPhysics()
		);
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}

class FollowTargetBehavior extends Behavior {
	constructor() {
		super();
		
		this.pathToTarget = null;
		this.moveBehavior = new MoveBehavior();
	}
	
	setTarget(target) {
		this.target = target;
		this.nextNode = null;
		this.pathToTarget = null;
		
	}
	
	apply(agent, world) {
		const center = agent.getShape().center;
		const speed = agent.getPhysics().speed;
		
		if(this.target && !this.pathToTarget) {
			this.pathToTarget = world.getService('grid').getShortestPath(world, center, this.target.getShape().center);
			this.nextNode = this.pathToTarget.pop();
		}
		
		if(this.nextNode) {
			const distanceInfo = computeDistanceInfo(center, this.nextNode);
			const d = Math.sqrt(distanceInfo.std);

			if(d < speed.amp) {
				this.nextNode = this.pathToTarget.pop();
			} else {
				if(distanceInfo.dy > 0) {
					speed.angle = Math.acos(distanceInfo.dx / d);
				} else {
					speed.angle = -Math.acos(distanceInfo.dx / d);
				}
				this.moveBehavior.apply(agent, world);
			}
		}
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
			{x:10,y:10}, 
			{x:0,y:30}, 
			{x:50,y:50},
			{x:50,y:10});
		this.world.addAgent(new Wall(p));
		
		const d = new TypedAgent(new Dupe({x:5,y:5}), 'dupe');
		this.world.addAgent(d);
		
		this.agentsMobileMean = new MobileMeanExtractor(this.world, w => w.agents.length, 20);
	}
	
	handleClientMouseClick(event) {
		const target = new Target(event);
		this.world.broadcast({target: target});
	}
	
	advance() {
		if(!this.pause) {
			this.world.advance();
		}
	}
	
	togglePause(pause) {
		this.pause = pause;
	}
	
	getInfo() {
		return {
			length: this.length,
			width: this.width
		};
	}
	
	getState() {
		return {
			agents: this.world.agents.map(mapAgentToClient),
			agentsMobileMean: this.agentsMobileMean.update(),
			grid: this.world.getService('grid').getGrid(this.world)
			
		};
	}
}
