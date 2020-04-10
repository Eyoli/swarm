const Shape = require('./shape');

class RoundShape extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
	}
}

module.exports = RoundShape;
