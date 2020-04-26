import AgentDecorator from './agent-decorator';

export default class SelectableAgent extends AgentDecorator {
	constructor(agent, type) {
		super(agent);
		
		this.selected = false;
	}
	
	react(world, info) {
		if(info.selected) {
			this.selected = info.selected;
		} else {
			agent.react(world, info);
		}
	}
	
	interact() {
		var info = this.agent.interact();
		info.selected = this.selected;
		return info;
	}
}
