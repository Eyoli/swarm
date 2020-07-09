import AgentInterface from "./agent-interface";

class IdentifierHolder {
	ids: string[];

	constructor(capacity: number) {
		this.ids = [];
		for(let i = 0; i < capacity; i++) {
			this.ids.push(i.toString());
		}
	}
	
	get() {
		return this.ids.shift();
	}
	
	release(id: string | undefined) {
		if(id) {
			let i = 0
			while(i < this.ids.length && this.ids[i] < id) {
				i++;
			}
			this.ids.splice(i, 0, id);
		}
	}
}

export default class AgentHolder {
	maxAgents: number;
	agents: AgentInterface[];
	groups: Map<string, AgentInterface[]>;
	identifierHolder: IdentifierHolder;

	constructor(maxAgents: number) {
		this.maxAgents = maxAgents;
		this.agents = [];
		this.groups = new Map<string, AgentInterface[]>();
		this.identifierHolder = new IdentifierHolder(maxAgents);
	}
	
	withGroup(groupName: string) {
		this.groups.set(groupName, []);
		return this;
	}
	
	add(agent: AgentInterface, groupName: string) {
		const id = this.identifierHolder.get();
		if(id) {
			agent.setId(id);
			this.agents.push(agent);
			
			const group = this.groups.get(groupName);
			if(group) {
				group.push(agent);
			}
			
			return agent;
		}
	}
	
	get(groupName: string) {
		if(groupName) {
			return this.groups.get(groupName);
		}
		return this.agents;
	}
	
	filter(fn: any) {
		return this.agents.filter(fn);
	}
	
	clear() {
		const identifierHolder = this.identifierHolder;
		const idsToRelease = this.agents
			.filter(a => a.isDestroyed())
			.forEach(a => identifierHolder.release(a.getId()));
		this.agents = this.agents.filter(a => !a.isDestroyed());
	}
}