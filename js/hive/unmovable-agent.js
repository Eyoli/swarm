const Agent = require('../core/agent/agent');
const RoundShape = require('../core/shape/round-shape');
const BasicPhysics = require('../core/physics/basic-physics');

class UnmovableAgent extends Agent {
	constructor(position) {
		var speed = {amp: 0, angle: 0, max: 0};
		super(new RoundShape(position, 40), new BasicPhysics(speed, 0));
	}
}

module.exports = UnmovableAgent;