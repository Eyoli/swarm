import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

export default class Hive extends Agent {
	constructor(position, beesInside) {
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
