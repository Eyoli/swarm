import BehaviorInterface from './behavior-interface';

export default class Behavior {
	constructor() {
		BehaviorInterface.checkImplements(this);
		
		if (this.constructor === Behavior) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
	}
	
	apply(world) {
		throw new Error('You must implement this function');
	}
}