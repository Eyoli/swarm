import Interface from '../interface';
import BehaviorInterface from './behavior-interface';

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
}