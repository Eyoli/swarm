import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import BasicPhysics from '../core/physics/basic-physics';

export default class Flower extends Agent {
	constructor(position) {
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
