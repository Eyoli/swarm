const UnmovableAgent = require('./unmovable-agent');

class Flower extends UnmovableAgent {
	constructor(position) {
		super(position);
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}

module.exports = Flower;