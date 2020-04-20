export default class Physics {
	constructor(speed, acc) {
		
		if (this.constructor === Physics) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.speed = speed;
		this.acc = acc;
	}
	
	move(center) {
		throw new Error('You must implement this function');
	}
}
