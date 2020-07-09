import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

import GeneratorBehavior from'../utils/behavior/generator-behavior';
import PeriodicBehavior from '../utils/behavior/periodic-behavior';

import {generateBee} from './hive-agent-factory';

class ReleaseBeeBehavior extends GeneratorBehavior {
	constructor(max) {
		super(max);
	}
	
	generate(agent, world) {
		var hivePosition = {
				x: agent.getShape().center.x,
				y: agent.getShape().center.y
			};
		return generateBee(world, hivePosition);
	}
}

export default class Hive extends Agent {
	constructor(position, beesInside) {
		super(
			new Circle(position, 40), 
			new BasicPhysics(),
			new PeriodicBehavior(new ReleaseBeeBehavior(5), 50)
		);
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}
