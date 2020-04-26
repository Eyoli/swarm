import BehaviorInterface from './behavior-interface'

export default class ComposedBehavior {
	constructor(...behaviors) {
		BehaviorInterface.checkImplements(this);
		
		this.behaviors = behaviors || [];
	}
	
	addBehavior(behavior) {
		this.behaviors.push(behavior);
		return this;
	}
	
	apply(agent, world) {
		for(var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].apply(agent, world);
		}
	}
}