"use strict";

var AgentInterface = new Interface('Agent', 'act', 'react', 'interact', 'getShape', 'getPhysics', 'isDestroyed');

class Agent {
	constructor(shape, physics) {
		Interface.checkImplements(this, AgentInterface);
		
		if (this.constructor === Agent) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.physics = physics;
		this.shape = shape;
		this.destroyed = false;
	}
	
	act(world) {
		throw new Error('You must implement this function');
	}
	
	react(info) {
		throw new Error('You must implement this function');
	}
	
	interact() {
		throw new Error('You must implement this function');
	}
	
	getShape() {
		return this.shape;
	}
	
	getPhysics() {
		return this.physics;
	}
	
	isDestroyed() {
		return this.destroyed;
	}
}

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

class TimedAgent extends AgentDecorator {
	constructor(agent, expirationTime) {
		super(agent);
		
		this.expirationTime = expirationTime;
		this.time = 0;
	}
	
	act(world) {
		this.agent.act(world);
		
		if(this.time > this.expirationTime) {
			this.agent.destroyed = true;
		}
		
		this.time++;
	}
}

class TypedAgent extends AgentDecorator {
	constructor(agent, type) {
		super(agent);
		
		this.type = type;
	}
	
	interact() {
		var info = this.agent.interact();
		info.type = this.type;
		return info;
	}
}