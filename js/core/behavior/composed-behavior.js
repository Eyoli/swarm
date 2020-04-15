import Interface from '../interface';
import BehaviorInterface from './behavior-interface'

export default class ComposedBehavior {
	constructor(...behaviors) {
		Interface.checkImplements(this, BehaviorInterface);
		
		this.behaviors = behaviors || [];
	}
	
	addBehavior(behavior) {
		this.behaviors.push(behavior);
		return this;
	}
	
	apply(world) {
		for(var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].apply(world);
		}
	}
	
	isDestroyed() {
		return this.behaviors.every(b => b.isDestroyed());
	}
}