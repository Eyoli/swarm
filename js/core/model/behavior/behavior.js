import Interface from '../../interface';
import BehaviorInterface from './behavior-interface';

export default class Behavior {
	constructor(agent) {
		Interface.checkImplements(this, BehaviorInterface);
		
		if (this.constructor === Behavior) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.agent = agent;
	}
	
	apply(world) {
		throw new Error('You must implement this function');
	}
	
	isDestroyed() {
		return this.agent.isDestroyed();
	}
}