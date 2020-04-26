import BehaviorInterface from '../../core/model/behavior/behavior-interface';

export default class PeriodicBehavior {
	constructor(behavior, period) {
		BehaviorInterface.checkImplements(this);
		
		this.period = period;
		this.behavior = behavior;
		this.lastCall = 0;
	}
	
	apply(agent, world) {		
		if(world.step - this.lastCall >= this.period) {
			this.behavior.apply(agent, world);
			this.lastCall = world.step;
		}
	}
	
	isDestroyed() {
		return this.behavior.isDestroyed();
	}
}