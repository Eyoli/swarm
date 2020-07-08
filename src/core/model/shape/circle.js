import Shape from './shape';
import Rectangle from './rectangle';
import {computeDistanceInfo} from '../../math';

export default class Circle extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
		this.squareRadius = this.radius * this.radius;
	}
	
	boundary() {
		return new Rectangle(
			{x: -this.radius, y: -this.radius},
			2 * this.radius,
			2 * this.radius
		);
	}
	
	contains(point) {
		const distanceInfo = computeDistanceInfo(this.center, point);
		return distanceInfo.std <= this.squareRadius;
	}
}
