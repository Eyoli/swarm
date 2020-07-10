import AgentInterface from './agent-interface';

export default abstract class Agent implements AgentInterface {
	physics: any;
	shape: any;
	behavior: any;
	destroyed: boolean;

	constructor(shape: any, physics: any, behavior: any) {		
		this.physics = physics;
		this.shape = shape;
		this.behavior = behavior;
		this.destroyed = false;
	}

	act(world: any) {
		if(this.behavior) {
			this.behavior.apply(this, world);
		}
	}
	
	abstract react(world: any, info: any): void;
	
	abstract interact(): void;
	
	getShape() {
		return this.shape;
	}
	
	getPhysics() {
		return this.physics;
	}
	
	destroy() {
		this.destroyed = true;
	}
	
	isDestroyed() {
		return this.destroyed;
	}
}
