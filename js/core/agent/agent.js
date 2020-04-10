"use strict";

const Interface = require('../interface');
const AgentInterface = require('./agent-interface');

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

module.exports = Agent;
