import AgentInterface from './agent-interface';

export default class AgentDecorator {
	constructor(agent) {
		AgentInterface.checkImplements(this);
		
		if (this.constructor === AgentDecorator) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.agent = agent;
	}
	
	act(world) {
		this.agent.act(world);
	}
	
	react(world, info) {
		this.agent.react(world, info);
	}
	
	interact() {
		return this.agent.interact();
	}
	
	getShape() {
		return this.agent.getShape();
	}
	
	getPhysics() {
		return this.agent.getPhysics();
	}
	
	destroy() {
		this.agent.destroy();
	}
	
	isDestroyed() {
		return this.agent.isDestroyed();
	}
}
