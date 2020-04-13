import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import BasicPhysics from '../core/physics/basic-physics';

export default class Pheromon extends Agent {
	constructor(position, sourceAngle) {
		super(
			new RoundShape(position, 40), 
			new BasicPhysics()
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
