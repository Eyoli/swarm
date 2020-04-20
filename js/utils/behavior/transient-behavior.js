import Behavior from '../../core/behavior/behavior';

export default class TransientBehavior extends Behavior {
	constructor(agent, expirationTime) {
		super(agent);
		
		this.expirationTime = expirationTime;
		this.time = 0;
	}
	
	apply(world) {
		if(this.time > this.expirationTime) {
			this.agent.destroy();
		}
		
		this.time++;
	}
}
