import Interface from '../interface';
import EngineInterface from './engine-interface';

export default class ClearEngine {
	constructor() {
		Interface.checkImplements(this, EngineInterface);
	}
	
	run(world) {
		// Remove destroyed agents
		var i = 0;
		while(i < world.agents.length) {
			if(world.agents[i].isDestroyed()) {
				world.agents.splice(i, 1);
			} else {
				i++;
			}
		}
	}
}
