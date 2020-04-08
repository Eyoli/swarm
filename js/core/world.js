"use strict";

var WorldInterface = new Interface('World', 'advance');

class World {
	constructor(maxAgents) {
		Interface.checkImplements(this, WorldInterface);
		
		this.agents = [];
		this.engines = [];
		this.maxAgents = maxAgents;
		this.step = 0;
	}
	
	withEngine(engine) {
		this.engines.push(engine);
		return this;
	}
	
	withAgent(agent) {
		if(this.agents.length < this.maxAgents) {
			this.agents.push(agent);
		}
		return this;
	}
	
	advance() {		
		// Run engines
		for(var i = 0; i < this.engines.length; i++) {
			this.engines[i].run(this);
		}
		
		// Make agents act
		for(var i = 0; i < this.agents.length; i++) {
			this.agents[i].act(this);
		}
		
		this.step++;
	}
}
