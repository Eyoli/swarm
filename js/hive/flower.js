import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

export default class Flower extends Agent {
	constructor(position) {
		super(
			new Circle(position, 40), 
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
