import AgentInterface from "./agent-interface";

export default abstract class AgentDecorator implements AgentInterface {
	agent: AgentInterface;

	constructor(agent: AgentInterface) {		
		this.agent = agent;
	}
	getId(): string | undefined {
		return this.agent.getId();
	}
	setId(id: string): void {
		this.agent.setId(id);
	}
	
	act(world: any) {
		this.agent.act(world);
	}
	
	react(world: any, info: any) {
		this.agent.react(world, info);
	}
	
	interact() {
		return this.agent.interact();
	}
	
	getShape() {
		return this.agent.getShape();
	}
	
	getPhysics() {
		return this.agent.getPhysics();
	}
	
	destroy() {
		this.agent.destroy();
	}
	
	isDestroyed() {
		return this.agent.isDestroyed();
	}
}
