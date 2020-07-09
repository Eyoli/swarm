import AgentDecorator from '../../core/model/agent/agent-decorator';

export default class TypedAgent extends AgentDecorator {
	constructor(agent, type) {
		super(agent);
		
		this.type = type;
	}
	
	interact() {
		var info = this.agent.interact();
		info.type = this.type;
		return info;
	}
}
