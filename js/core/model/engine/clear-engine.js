import Interface from '../../interface';
import EngineInterface from './engine-interface';

export default class ClearEngine {
	constructor() {
		Interface.checkImplements(this, EngineInterface);
	}
	
	run(world) {
		// Remove destroyed agents
		world.agents = world.agents.filter(a => !a.isDestroyed());
	}
}
