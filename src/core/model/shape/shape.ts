import Position2D from "../physics/position2d";

export default abstract class Shape {
	center: Position2D;

	constructor(center: Position2D) {		
		this.center = center;
	}
	
	abstract contains(point: Position2D): boolean;
	
	abstract boundary(): Shape;
}
