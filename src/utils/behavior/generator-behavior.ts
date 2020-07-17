import Behavior from '../../core/model/behavior/behavior';
import AgentInterface from '../../core/model/agent/agent-interface';
import World from '../../core/model/world';

export default abstract class GeneratorBehavior implements Behavior {
	max: number;
	generatedAgents: AgentInterface[];

	constructor(max: number) {		
		this.max = max;
		this.generatedAgents = [];
	}
	
	isInvalid(): boolean {
		throw new Error("Method not implemented.");
	}
	
	apply(agent: AgentInterface, world: World) {
		this.generatedAgents = this.generatedAgents.filter(a => !a.isDestroyed());
		
		if(this.max) {
			if(this.generatedAgents.length < this.max) {
				var generatedAgent = this.generate(agent, world);
				if(generatedAgent) {
					this.generatedAgents.push(generatedAgent);
				}
			}
		} else {
			this.generate(agent, world);
		}
	}
	
	abstract generate(agent: AgentInterface, world: World): AgentInterface;
}
