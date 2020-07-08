export default class World {
	constructor(agentHolder) {
		
		this.agentHolder = agentHolder;
		this.engines = {};
		this.services = {};
		
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
	
	agents(group) {
		return this.agentHolder.get(group);
	}
	
	getService(name) {
		return this.services[name];
	}
	
	addAgent(agent, group) {
		return this.agentHolder.add(agent, group);
	}
	
	broadcast(event, group) {
		this.agentHolder.get(group).forEach(agent => agent.react(this, event));
	}
	
	advance() {		
		// Run engines
		for(let name in this.engines) {
			this.engines[name].run(this);
		}
		
		// make agents act
		this.agentHolder.get().forEach(agent => agent.act(this));
		
		this.step++;
	}
}
