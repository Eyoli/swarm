"use strict";

var PhysicsInterface = new Interface('Physics', 'move', 'getCenter');

class Physics extends ShapeDecorator {
	constructor(shape, speed, acc) {
		super(shape);
		
		Interface.checkImplements(this, PhysicsInterface);
		
		if (this.constructor === Physics) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.speed = speed;
		this.acc = acc;
	}
	
	getCenter() {
		return this.shape.center;
	}
	
	move() {
		throw new Error('You must implement this function');
	}
}

class BasicPhysics extends Physics {
	constructor(shape, speed, acc) {
		super(shape, speed, acc);
	}
	
	move() {
		if(this.speed.amp < this.speed.max) {
			this.speed.amp = Math.min(this.speed.amp + this.acc, this.speed.max);
		}
		
		this.shape.center.x += this.speed.amp * Math.cos(this.speed.angle);
		this.shape.center.y += this.speed.amp * Math.sin(this.speed.angle);
	}
}