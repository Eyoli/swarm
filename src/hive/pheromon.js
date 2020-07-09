import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

import TransientBehavior from'../utils/behavior/transient-behavior';

export default class Pheromon extends Agent {
	constructor(position, sourceAngle) {
		super(
			new Circle(position, 40), 
			new BasicPhysics(),
			new TransientBehavior(200)
		);
		
		this.sourceAngle = sourceAngle;
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
			sourceAngle: this.sourceAngle
		};
	}
}
