import Behavior from '../../core/model/behavior/behavior';

export default class MoveBehavior extends Behavior {
	constructor() {
		super();
	}
	
	apply(agent, world) {
		agent.getShape().center = agent.getPhysics().move(agent.getShape().center);
	}
}