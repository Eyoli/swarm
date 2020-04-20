import Interface from '../../interface';
import AgentInterface from './agent-interface.js';

export default class Agent {
	constructor(shape, physics) {
		Interface.checkImplements(this, AgentInterface);
		
		if (this.constructor === Agent) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.physics = physics;
		this.shape = shape;
		this.destroyed = false;
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
