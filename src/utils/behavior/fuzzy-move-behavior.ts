import MoveBehavior from './move-behavior';
import Behavior from '../../core/model/behavior/behavior';
import AgentInterface from '../../core/model/agent/agent-interface';
import World from '../../core/model/world';

export default class FuzzyMoveBehavior implements Behavior {
	moveBehavior: MoveBehavior;
	fuzziness: any;
	t: number;

	constructor(trajectory: any, fuzziness: any) {
		this.moveBehavior = new MoveBehavior(trajectory);
		
		this.fuzziness = fuzziness;
		this.t = 0;
	}

	isInvalid(): boolean {
		return this.moveBehavior.isInvalid();
	}
	
	apply(agent: AgentInterface, world: World) {
		this.moveBehavior.apply(agent, world);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.t / this.fuzziness.period);
		
		this.t = (this.t + 1) % this.fuzziness.period;
		
		agent.getShape().center.x += actualFuzziness * Math.cos(agent.getPhysics().speed.angle + Math.PI / 2);
		agent.getShape().center.y += actualFuzziness * Math.sin(agent.getPhysics().speed.angle + Math.PI / 2);
	}
}
