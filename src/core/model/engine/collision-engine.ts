import EngineInterface from './engine-interface';
import World from '../world';

export default class CollisionEngine implements EngineInterface {
	collisionFinder: any;

	constructor(collisionFinder: any) {
		this.collisionFinder = collisionFinder;
	}
	
	run(world: World) {
		this.collisionFinder.search(world.agents().map(a => a.getShape()))
			// Handle collisions
			.forEach((collision: { i1: number; i2: number; }) => {
				var agent1 = world.agents()[collision.i1];
				var agent2 = world.agents()[collision.i2];
				
				agent1.react(world, agent2.interact());
				agent2.react(world, agent1.interact());
			});
	}
}
