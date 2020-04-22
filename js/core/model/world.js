export default class World {
	constructor(maxAgents) {
		
		this.agents = [];
		this.engines = {};
		this.services = {};
		
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
	
	broadcast(event) {
		this.agents.forEach(agent => agent.react(this, event));
	}
	
	advance() {		
		// Run engines
		for(let name in this.engines) {
			this.engines[name].run(this);
		}
		
		// make agents act
		this.agents.forEach(agent => agent.act(this));
		
		this.step++;
	}
}
