import AgentInterface from "./agent-interface";

export default abstract class AgentDecorator implements AgentInterface {
	agent: AgentInterface;

	constructor(agent: AgentInterface) {		
		this.agent = agent;
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
