import Behavior from '../../core/model/behavior/behavior';
import AgentInterface from '../../core/model/agent/agent-interface';
import World from '../../core/model/world';

export default class TransientBehavior implements Behavior {
	expirationTime: number;
	time: number;
	
	constructor(expirationTime: number) {
		this.expirationTime = expirationTime;
		this.time = 0;
	}

	isInvalid(): boolean {
		throw new Error("Method not implemented.");
	}
	
	apply(agent: AgentInterface, world: World) {
		if(this.time > this.expirationTime) {
			agent.destroy();
		}
		
		this.time++;
	}
}
