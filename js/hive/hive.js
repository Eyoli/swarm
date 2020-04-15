import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import BasicPhysics from '../core/physics/basic-physics';

export default class Hive extends Agent {
	constructor(position, beesInside) {
		super(
			new RoundShape(position, 40), 
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
