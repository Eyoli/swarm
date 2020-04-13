import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import BasicPhysics from '../core/physics/basic-physics';
import PeriodicBehavior from '../core/behavior/periodic-behavior';

import SpawnBehavior from './spawn-behavior';

import {generateBee} from './hive-agent-factory';

export default class Hive extends Agent {
	constructor(position, beesInside) {
		super(
			new RoundShape(position, 40), 
			new BasicPhysics(), 
			new PeriodicBehavior(new SpawnBehavior(source => {
				var hivePosition = {
					x: source.shape.center.x,
					y: source.shape.center.y
				};
				return generateBee(hivePosition);
			}, 5), 50)
		);
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}
