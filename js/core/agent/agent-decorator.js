const Interface = require('../interface');
const AgentInterface = require('./agent-interface');

class AgentDecorator {
	constructor(agent) {
		Interface.checkImplements(this, AgentInterface);
		
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
	
	isDestroyed() {
		return this.agent.isDestroyed();
	}
}

module.exports = AgentDecorator;
