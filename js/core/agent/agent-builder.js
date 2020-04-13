import Agent from './agent';

export default class AgentBuilder {
	constructor() {
		this.behaviors = [];
	}
	
	withPhysics() {
		this.physics = physics;
	}
	
	withShape() {
		this.shape = shape;
	}
	
	addBehavior(behavior) {
		this.behaviors.add(behavior);
	}
	
	build() {
		return new Agent(this.shape, this.physics, this.behaviors);
	}
}
