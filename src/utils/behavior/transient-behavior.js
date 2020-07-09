import Behavior from '../../core/model/behavior/behavior';

export default class TransientBehavior extends Behavior {
	constructor(expirationTime) {
		super();
		
		this.expirationTime = expirationTime;
		this.time = 0;
	}
	
	apply(agent, world) {
		if(this.time > this.expirationTime) {
			agent.destroy();
		}
		
		this.time++;
	}
}
