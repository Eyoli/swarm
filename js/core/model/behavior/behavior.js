import Interface from '../../interface';
import BehaviorInterface from './behavior-interface';

export default class Behavior {
	constructor() {
		Interface.checkImplements(this, BehaviorInterface);
		
		if (this.constructor === Behavior) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
	}
	
	apply(world) {
		throw new Error('You must implement this function');
	}
}