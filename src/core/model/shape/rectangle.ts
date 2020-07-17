import Polygone from './polygone';
import Position2D from '../physics/position2d';

export default class Rectangle extends Polygone {
	constructor(p: Position2D, length: number, width: number) {
		super(
			{x: p.x, y: p.y}, 
			{x: p.x + length, y: p.y}, 
			{x: p.x + length, y: p.y + width}, 
			{x: p.x, y: p.y + width}
		);
	}
	
	topLeft() {
		return this.summits[0];
	}
	
	topRight() {
		return this.summits[1];
	}
	
	downRight() {
		return this.summits[2];
	}
	
	downLeft() {
		return this.summits[3];
	}
	
	boundary() {
		return this;
	}
}