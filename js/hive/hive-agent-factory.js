import TypedAgent from '../core/model/agent/typed-agent';

import ComposedBehavior from '../core/model/behavior/composed-behavior';
import FuzzyMoveBehavior from '../utils/behavior/fuzzy-move-behavior';
import PeriodicBehavior from '../utils/behavior/periodic-behavior';
import GeneratorBehavior from'../utils/behavior/generator-behavior';
import TransientBehavior from'../utils/behavior/transient-behavior';

import Bee from './bee';
import Hive from './hive';
import Flower from './flower';
import Pheromon from './pheromon';

class ReleaseBeeBehavior extends GeneratorBehavior {
	constructor(agent, max) {
		super(agent, max);
	}
	
	generate(world) {
		var hivePosition = {
				x: this.agent.getShape().center.x,
				y: this.agent.getShape().center.y
			};
		return generateBee(world, hivePosition);
	}
}

class ReleasePheromonBehavior extends GeneratorBehavior {
	constructor(agent, max) {
		super(agent, max);
	}
	
	generate(world) {
		var agentPosition = {
			x: this.agent.getShape().center.x,
			y: this.agent.getShape().center.y
		};
		var agentSourceAngle = this.agent.getPhysics().speed.angle + Math.PI;
		var type = this.agent.searchingFlower ? "TOWARD_HIVE" : "TOWARD_FLOWER";
		
		return generatePheromon(world, agentPosition, agentSourceAngle, type);
	}
}

export const generateBee = (world, position) => {
	var bee = new TypedAgent(new Bee(position, 2 * Math.PI * Math.random()), "BEE");
	
	var fuzziness = {
		amp: 3,
		period: 25
	};
	
	return world.addAgentWithBehavior(
		bee,
		new ComposedBehavior(
				new FuzzyMoveBehavior(bee, fuzziness),
				new PeriodicBehavior(
					new ReleasePheromonBehavior(bee), 30)));
};
	
export const generateHive = (world, position, beesInside) => {
	var hive = new TypedAgent(new Hive(position, beesInside), "HIVE");
	
	return world.addAgentWithBehavior(
		hive,
		new PeriodicBehavior(
			new ReleaseBeeBehavior(hive, 5), 50));
};

export const generateFlower = (world, position) => {
	return world.addAgent(new TypedAgent(new Flower(position), "FLOWER"));
};

export const generatePheromon = (world, position, sourceAngle, type) => {
	var pheromon = new TypedAgent(new Pheromon(position, sourceAngle), type);
	return world.addAgentWithBehavior(
		pheromon,
		new TransientBehavior(pheromon, 200));
};
