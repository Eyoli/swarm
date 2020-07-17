import AgentInterface from "./agent-interface";
import AgentWithId from "./agent-with-id";

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
	
	release(id: string) {
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
	agents: AgentWithId[];
	groups: Map<string, AgentWithId[]>;
	identifierHolder: IdentifierHolder;

	constructor(maxAgents: number) {
		this.maxAgents = maxAgents;
		this.agents = [];
		this.groups = new Map<string, AgentWithId[]>();
		this.identifierHolder = new IdentifierHolder(maxAgents);
	}
	
	withGroup(groupName: string) {
		this.groups.set(groupName, []);
		return this;
	}
	
	add(agent: AgentInterface, groupName?: string): AgentWithId | null {
		const id = this.identifierHolder.get();
		if(id) {
			const agentWrapper = new AgentWithId(agent, id);
			this.agents.push(agentWrapper);
			
			if(groupName) {
				const group = this.groups.get(groupName);
				if(group) {
					group.push(agentWrapper);
				}
			}
			
			return agentWrapper;
		}

		return null;
	}
	
	get(groupName?: string) {
		if(groupName) {
			return this.groups.get(groupName) || [];
		}
		return this.agents;
	}
	
	filter(fn: any) {
		return this.agents.filter(fn);
	}
	
	clear() {
		const identifierHolder = this.identifierHolder;
		this.agents
			.filter(a => a.isDestroyed())
			.map(a => a.getId())
			.forEach(id => {
				if(id) {
					identifierHolder.release(id);
				}
			});
		this.agents = this.agents.filter(a => !a.isDestroyed());
	}
}