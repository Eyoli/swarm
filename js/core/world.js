export default class World {
	constructor(maxAgents) {
		
		this.agents = [];
		this.engines = [];
		this.behaviors = [];
		
		this.maxAgents = maxAgents;
		this.step = 0;
		
		this.mouse = {};
	}
	
	withEngine(engine) {
		this.engines.push(engine);
		return this;
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
		for(var i = 0; i < this.engines.length; i++) {
			this.engines[i].run(this);
		}
		
		// Run behaviors
		for(var i = 0; i < this.behaviors.length; i++) {
			this.behaviors[i].apply(this);
		}
		
		this.step++;
	}
}
