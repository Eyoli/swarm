import Polygone from './polygone';

export default class Rectangle extends Polygone {
	constructor({x, y}, length, width) {
		super(
			{x: x, y: y}, 
			{x: x + length, y: y}, 
			{x: x + length, y: y + width}, 
			{x: x, y: y + width}
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