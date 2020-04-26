import World from './core/model/world';
import AgentHolder from './core/model/agent/agent-holder';
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
import BSplineTrajectory from './core/model/trajectory/b-spline-trajectory';

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
		const config = {amp: 1, angle: 0, max: 0.1};
		const moveBehavior = new MoveBehavior();
		
		super(
			new Circle(position, 1), 
			new BasicPhysics(config),
			moveBehavior
		);
		
		this.moveBehavior = moveBehavior;
	}
	
	react(world, info) {
		if(info.target) {
			const pathToTarget = world.getService('grid').getShortestPath(world, this.getShape().center, info.target.getShape().center);
			this.target = info.target;
			
			let newTrajectory = null;
			const p = 2;
			if(pathToTarget.length > p) {
				newTrajectory = new BSplineTrajectory(this.getShape().center, {
						control: pathToTarget, 
						p: p, 
						amp: 1,
						sampling: 2});
			}
			this.moveBehavior.setTrajectory(newTrajectory);
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
		
		const gridService = new GridService(new WorldGrid(width, length, 25, 25));

		this.world = new World(new AgentHolder(100).withGroup('selectable'))
					.withService('grid', gridService);
		
		const p = new Polygone(
			{x:10,y:10}, 
			{x:0,y:30}, 
			{x:50,y:50},
			{x:50,y:10});
		this.world.addAgent(new Wall(p));
		
		const d = new TypedAgent(new Dupe({x:5,y:5}), 'dupe');
		this.world.addAgent(d);
		
		this.agentsMobileMean = new MobileMeanExtractor(this.world, w => w.agents().length, 20);
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
			agents: this.world.agents().map(mapAgentToClient),
			agentsMobileMean: this.agentsMobileMean.update(),
			grid: this.world.getService('grid').getGrid(this.world)
			
		};
	}
}
