import Behavior from '../../core/model/behavior/behavior';

export default class MoveBehavior extends Behavior {
	constructor(trajectory) {
		super();
		
		this.trajectory = trajectory;
	}
	
	setTrajectory(trajectory) {
		this.trajectory = trajectory;
	}
	
	apply(agent, world) {
		if(this.trajectory) {
			agent.getShape().center = this.trajectory.getNextPosition();
		}
	}
}