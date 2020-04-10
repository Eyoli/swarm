const UnmovableAgent = require('./unmovable-agent');

class Pheromon extends UnmovableAgent {
	constructor(position, sourceAngle) {
		super(position);
		
		this.sourceAngle = sourceAngle;
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
			sourceAngle: this.sourceAngle
		};
	}
}

module.exports = Pheromon;