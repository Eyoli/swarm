import Shape from './shape';

export default class Circle extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
	}
}
