import EngineInterface from './engine-interface';

export default class CollisionEngine {
	constructor(collisionFinder) {
		EngineInterface.checkImplements(this);
		
		this.collisionFinder = collisionFinder;
	}
	
	run(world) {
		this.collisionFinder.search(world.agents().map(a => a.getShape()))
			// Handle collisions
			.forEach(collision => {
				var agent1 = world.agents()[collision.i1];
				var agent2 = world.agents()[collision.i2];
				
				agent1.react(world, agent2.interact());
				agent2.react(world, agent1.interact());
			});
	}
}
