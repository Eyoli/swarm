class IdentifierHolder {
	constructor(capacity) {
		this.ids = [];
		for(let i = 0; i < capacity; i++) {
			this.ids.push(i);
		}
	}
	
	get() {
		return this.ids.shift();
	}
	
	release(id) {
		let i = 0
		while(i < this.ids.length && this.ids[i] < id) {
			i++;
		}
		this.ids.splice(i, 0, id);
	}
}

export default class AgentHolder {
	constructor(maxAgents) {
		this.maxAgents = maxAgents;
		this.agents = [];
		this.groups = {};
		this.identifierHolder = new IdentifierHolder(maxAgents);
	}
	
	withGroup(group) {
		this.groups[group] = [];
		return this;
	}
	
	add(agent, group) {
		const id = this.identifierHolder.get();
		if(id) {
			agent.id = id;
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
		const identifierHolder = this.identifierHolder;
		const idsToRelease = this.agents
			.filter(a => a.isDestroyed())
			.forEach(a => identifierHolder.release(a.id));
		this.agents = this.agents.filter(a => !a.isDestroyed());
	}
}