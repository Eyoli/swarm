import Behavior from "../../core/model/behavior/behavior";
import AgentInterface from "../../core/model/agent/agent-interface";
import World from "../../core/model/world";

export default class PeriodicBehavior implements Behavior {
	period: number;
	behavior: Behavior;
	lastCall: number;

	constructor(behavior: Behavior, period: number) {		
		this.period = period;
		this.behavior = behavior;
		this.lastCall = 0;
	}
	
	apply(agent: AgentInterface, world: World) {		
		if(world.step - this.lastCall >= this.period) {
			this.behavior.apply(agent, world);
			this.lastCall = world.step;
		}
	}
	
	isInvalid() {
		return this.behavior.isInvalid();
	}
}