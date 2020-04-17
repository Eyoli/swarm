export default class Shape {
	constructor(center) {		
		if (this.constructor === Shape) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.center = center;
	}
	
	contains(point) {
		throw new Error('You must implement this function');
	}
	
	boundary() {
		throw new Error('You must implement this function');
	}
}
