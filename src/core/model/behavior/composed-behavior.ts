import Behavior from './behavior'
import Agent from '../agent/agent';
import AgentInterface from '../agent/agent-interface';
import World from '../world';

export default class ComposedBehavior implements Behavior {
	behaviors: Behavior[];

	constructor(...behaviors: Behavior[]) {		
		this.behaviors = behaviors || [];
	}

	isInvalid(): boolean {
		return this.behaviors.find(b => b.isInvalid()) !== undefined;
	}
	
	addBehavior(behavior: Behavior) {
		this.behaviors.push(behavior);
		return this;
	}
	
	apply(agent: AgentInterface, world: World) {
		for(var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].apply(agent, world);
		}
	}
}