"use strict";

class Shape {
	constructor(center) {		
		if (this.constructor === Shape) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.center = center;
	}
}

class RoundShape extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
	}
}
