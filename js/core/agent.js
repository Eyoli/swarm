"use strict";

var AgentInterface = new Interface('Agent', 'act', 'react', 'interact', 'getPhysics', 'isDestroyed');

class Agent {
	constructor(physics) {
		Interface.checkImplements(this, ShapeInterface, AgentInterface);
		
		if (this.constructor === Agent) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.physics = physics;
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
	
	getPhysics() {
		return this.physics;
	}
	
	isDestroyed() {
		return this.destroyed;
	}
	
	intersect(agent) {
		return this.physics.intersect(agent);
	}
	
	getClosestPoint(position) {
		return this.physics.getClosestPoint(position);
	}
}

class AgentDecorator {
	constructor(agent) {
		Interface.checkImplements(this, ShapeInterface, AgentInterface);
		
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
	
	getPhysics() {
		return this.agent.getPhysics();
	}
	
	isDestroyed() {
		return this.agent.isDestroyed();
	}
	
	intersect(agent) {
		return this.agent.intersect(agent);
	}
	
	getClosestPoint(position) {
		return this.agent.getClosestPoint(position);
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