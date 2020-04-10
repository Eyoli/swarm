const Interface = require('../interface');
const EngineInterface = require('./engine-interface');

class ClearEngine {
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

module.exports = ClearEngine;
