import AgentHolder from "./agent/agent-holder";
import AgentInterface from "./agent/agent-interface";
import EngineInterface from "./engine/engine-interface";

export default class World {
	agentHolder: AgentHolder;
	engines: Map<string, EngineInterface>;
	services: Map<string, any>;
	step: number;

	constructor(agentHolder: AgentHolder) {

		this.agentHolder = agentHolder;
		this.engines = new Map<string, EngineInterface>();
		this.services = new Map<string, any>();

		this.step = 0;
	}

	withEngine(engineName: string, engine: any) {
		this.engines.set(engineName, engine);
		return this;
	}

	withService(serviceName: string, service: any) {
		this.services.set(serviceName, service);
		return this;
	}

	agents(groupName?: string) {
		return this.agentHolder.get(groupName);
	}

	getService(serviceName: string) {
		return this.services.get(serviceName);
	}

	addAgent(agent: AgentInterface, groupName?: string) {
		return this.agentHolder.add(agent, groupName);
	}

	broadcast(event: any, groupName?: string) {
		this.agentHolder.get(groupName).forEach(agent => agent.react(this, event));
	}

	advance() {
		// Run engines
		this.engines.forEach(engine => engine.run(this));

		// make agents act
		this.agentHolder.get().forEach(agent => agent.act(this));

		this.step++;
	}
}
