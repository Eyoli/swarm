import AgentDecorator from './agent-decorator';
import AgentInterface from './agent-interface';

export default class AgentWithId extends AgentDecorator {
	id: string;

	constructor(agent: AgentInterface, id: string) {
		super(agent);
		this.id = id;
	}

	getId() {
		return this.id;
	}

	setId(id: string) {
		this.id = id;
	}
}
