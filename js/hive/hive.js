const UnmovableAgent = require('./unmovable-agent');

class Hive extends UnmovableAgent {
	constructor(position, beesInside) {
		super(position);
		
		this.beesInside = beesInside || 0;
		this.currentBees = 0;
		this.releaseBeePeriod = 50;
		this.lastReleaseStep = 0;
	}
	
	act(world) {
		if(this.beesInside > 0 && (world.step - this.lastReleaseStep) >= this.releaseBeePeriod) {
			var hivePosition = {
				x: this.shape.center.x,
				y: this.shape.center.y
			};
			world.withAgent(require('./hive-agent-factory').generateBee(hivePosition));
			
			this.beesInside--;
			this.lastReleaseStep = world.step;
		}
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}

module.exports = Hive;