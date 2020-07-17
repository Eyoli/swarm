import Behavior from '../../core/model/behavior/behavior';
import AgentInterface from '../../core/model/agent/agent-interface';
import World from '../../core/model/world';

export default class MoveBehavior implements Behavior {
	trajectory: any;

	constructor(trajectory?: any) {
		this.trajectory = trajectory;
	}

	isInvalid(): boolean {
		throw new Error("Method not implemented.");
	}
	
	setTrajectory(trajectory: any) {
		this.trajectory = trajectory;
	}
	
	apply(agent: AgentInterface, world: World) {
		if(this.trajectory) {
			agent.getShape().center = this.trajectory.getNextPosition();
		}
	}
}