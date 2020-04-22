import Interface from '../../interface';
import AgentInterface from './agent-interface.js';

export default class Agent {
	constructor(shape, physics, behavior) {
		Interface.checkImplements(this, AgentInterface);
		
		if (this.constructor === Agent) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.physics = physics;
		this.shape = shape;
		this.behavior = behavior;
		this.destroyed = false;
	}
	
	act(world) {
		if(this.behavior) {
			this.behavior.apply(this, world);
		}
	}
	
	react(info) {
		throw new Error('You must implement this function');
	}
	
	interact() {
		throw new Error('You must implement this function');
	}
	
	getShape() {
		return this.shape;
	}
	
	getPhysics() {
		return this.physics;
	}
	
	destroy() {
		this.destroyed = true;
	}
	
	isDestroyed() {
		return this.destroyed;
	}
}
