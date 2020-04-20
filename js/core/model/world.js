export default class World {
	constructor(maxAgents) {
		
		this.agents = [];
		this.engines = {};
		this.services = {};
		this.behaviors = [];
		
		this.maxAgents = maxAgents;
		this.step = 0;
		
		this.mouse = {};
	}
	
	withEngine(name, engine) {
		this.engines[name] = engine;
		return this;
	}
	
	withService(name, service) {
		this.services[name] = service;
		return this;
	}
	
	getService(name) {
		return this.services[name];
	}
	
	addAgent(agent) {
		if(this.agents.length < this.maxAgents) {
			this.agents.push(agent);
			return agent;
		}
		return null;
	}
	
	addAgentWithBehavior(agent, behavior) {
		if(this.addAgent(agent)) {
			this.addBehavior(behavior);
			return agent;
		}
		return null;
	}
	
	addBehavior(behavior) {
		this.behaviors.push(behavior);
	}
	
	advance() {		
		// Run engines
		for(let name in this.engines) {
			this.engines[name].run(this);
		}
		
		// Run behaviors
		for(let i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].apply(this);
		}
		
		this.step++;
	}
}
