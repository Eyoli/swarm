import Shape from './shape';
import Rectangle from './rectangle';
import {computeDistanceInfo} from '../../math';
import Position2D from '../physics/position2d';

export default class Circle extends Shape {
	radius: number;
	squareRadius: number;

	constructor(center: Position2D, radius: number) {
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
	
	contains(point: Position2D) {
		const distanceInfo = computeDistanceInfo(this.center, point);
		return distanceInfo.std <= this.squareRadius;
	}
}
