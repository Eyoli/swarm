export default class AgentHolder {
	constructor(maxAgents) {
		this.maxAgents = maxAgents;
		this.agents = [];
		this.groups = {};
	}
	
	withGroup(group) {
		this.groups[group] = [];
		return this;
	}
	
	add(agent, group) {
		if(this.agents.length < this.maxAgents) {
			this.agents.push(agent);
			
			if(group) {
				this.groups[group].push(agent);
			}
			
			return agent;
		}
	}
	
	get(group) {
		if(group) {
			return this.groups[group];
		}
		return this.agents;
	}
	
	filter(fn) {
		return this.agents.filter(fn);
	}
	
	clear() {
		this.agents = this.agents.filter(a => !a.isDestroyed());
	}
}