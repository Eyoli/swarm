import Interface from '../interface';
import Behavior from './behavior';

export default class MoveBehavior extends Behavior {
	constructor(agent) {
		super(agent);
	}
	
	apply(world) {
		this.agent.getShape().center = this.agent.getPhysics().move(this.agent.getShape().center);
	}
}