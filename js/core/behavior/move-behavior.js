import Interface from '../interface';
import BehaviorInterface from './behavior-interface';

export default class MoveBehavior {
	constructor() {
		Interface.checkImplements(this, BehaviorInterface);
	}
	
	apply(agent, world) {
		agent.getShape().center = agent.getPhysics().move(agent.getShape().center);
	}
}