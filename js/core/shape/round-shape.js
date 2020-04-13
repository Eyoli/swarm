import Shape from './shape';

export default class RoundShape extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
	}
}
