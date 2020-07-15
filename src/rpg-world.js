import World from './core/model/world';
import AgentHolder from './core/model/agent/agent-holder';
import WorldGrid from './core/service/path/world-grid';
import GridService from './core/service/grid-service';
import MobileMeanExtractor from './core/statistics/mobile-mean-extractor';

import AgentDecorator from './core/model/agent/agent-decorator';
import Agent from './core/model/agent/agent';
import SelectableAgent from './core/model/agent/selectable-agent';
import Polygone from './core/model/shape/polygone';
import BasicPhysics from './core/model/physics/basic-physics';

import Behavior from './core/model/behavior/behavior';
import Circle from './core/model/shape/circle';
import TypedAgent from './utils/agent/typed-agent';
import MoveBehavior from './utils/behavior/move-behavior';
import BSplineTrajectory from './core/model/trajectory/b-spline-trajectory';

import Random from './core/random';

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
			const pathToTarget = world.getService('grid').getShortestPath(this.getShape().center, info.target.getShape().center);
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

class Playable extends AgentDecorator {
	constructor(agent, type) {
		super(new TypedAgent(new SelectableAgent(agent), type));
	}
}

function mapAgentToClient(agent) {
	return {
		info: agent.interact(),
		physics: agent.getPhysics(),
		shape: agent.getShape()
	};
}

function generatePolygone(center, n, mu, sigma) {
	const summits = [];
	for(let i = 0; i < n; i++) {
		const angle = 2 * Math.PI * i / n;
		const rand = Random.truncNormal2D([mu, mu], [sigma, sigma]);
		summits.push({
			x: center.x + rand.x * Math.cos(angle),
			y: center.y + rand.y * Math.sin(angle)
		});
	}
	
	return new Polygone(...summits);
}

function generatePolygones(w, n, sMin, sMax, mu, sigma) {
	const polygones = [];
	for(let i = 0; i < n; i++) {
		polygones.push(generatePolygone(
			Random.uniformInt2D([0,0], [w.length,w.width]), Random.uniformInt(sMin, sMax), mu, sigma));
	}
	return polygones;
}

export default class RPGWorld {
	constructor(width, length) {
		this.length = length;
		this.width = width;
		this.pause = true;

		this.world = new World(new AgentHolder(100).withGroup('selectable'));

		const gridService = new GridService(
			new WorldGrid(this.world, width, length, 25, 25));
		this.world.withService('grid', gridService);
		
		const p = generatePolygones(this, Random.uniformInt(3, 6), 4, 6, 10, 8);
		for(let i = 0; i < p.length; i++) {
			this.world.addAgent(new Wall(p[i]));
		}
		
		this.world.addAgent(new Playable(new Dupe({x:5,y:5}), 'dupe'), 'selectable');
		this.world.addAgent(new Playable(new Dupe({x:10,y:10}), 'dupe'), 'selectable');
		
		this.agentsMobileMean = new MobileMeanExtractor(this.world, w => w.agents().length, 20);
	}
	
	handleClientMouseRightClick(event) {
		const target = new Target(event);
		this.world.broadcast({target: target});
	}
	
	handleSelection(selection) {
		this.world.broadcast({selection: selection}, 'selectable');
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
