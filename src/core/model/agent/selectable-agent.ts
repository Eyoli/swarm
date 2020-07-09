import Rectangle from '../shape/rectangle';
import AgentDecorator from './agent-decorator';
import AgentInterface from './agent-interface';

export default class SelectableAgent extends AgentDecorator {
	selected: boolean;

	constructor(agent: AgentInterface) {
		super(agent);
		
		this.selected = false;
	}
	
	react(world: any, info: any) {
		if(info.selection) {
			if(info.selection.width) {
				const rect = new Rectangle(info.selection, info.selection.width, info.selection.height);
				this.selected = rect.contains(this.agent.getShape().center);
			} else {
				this.selected = this.agent.getShape().contains(info.selection);
			}
		}
		
		if(this.selected) {
			this.agent.react(world, info);
		}
	}
	
	interact() {
		var info = this.agent.interact();
		info.selected = this.selected;
		return info;
	}
}
