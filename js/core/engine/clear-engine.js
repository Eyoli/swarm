import Interface from '../interface';
import EngineInterface from './engine-interface';

export default class ClearEngine {
	constructor() {
		Interface.checkImplements(this, EngineInterface);
	}
	
	run(world) {
		// Remove destroyed behaviors
		world.behaviors = world.behaviors.filter(b => !b.isDestroyed());
		
		// Remove destroyed agents
		world.agents = world.agents.filter(a => !a.isDestroyed());
	}
}
