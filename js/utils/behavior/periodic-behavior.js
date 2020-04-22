import Interface from '../../core/interface';
import BehaviorInterface from '../../core/model/behavior/behavior-interface';

export default class PeriodicBehavior {
	constructor(behavior, period) {
		Interface.checkImplements(this, BehaviorInterface);
		
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