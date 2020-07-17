import AgentInterface from './agent-interface';
import Shape from '../shape/shape';

export default abstract class Agent implements AgentInterface {
	physics: any;
	shape: Shape;
	behavior: any;
	destroyed: boolean;

	constructor(shape: Shape, physics: any, behavior?: any) {		
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
