export default class Physics {
	constructor({amp, angle, max, acc} = {}) {
		
		if (this.constructor === Physics) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.speed = {
			amp: amp,
			angle: angle,
			max: max
		};
		this.acc = acc;
	}
}
