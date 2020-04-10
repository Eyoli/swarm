"use strict";

var PhysicsInterface = new Interface('Physics', 'move');

class Physics {
	constructor(speed, acc) {
		
		Interface.checkImplements(this, PhysicsInterface);
		
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

class BasicPhysics extends Physics {
	constructor(speed, acc) {
		super(speed, acc);
	}
	
	move(center) {
		if(this.speed.amp < this.speed.max) {
			this.speed.amp = Math.min(this.speed.amp + this.acc, this.speed.max);
		}
		
		return {
			x: center.x + this.speed.amp * Math.cos(this.speed.angle),
			y: center.y + this.speed.amp * Math.sin(this.speed.angle)
		};
	}
}

class FuzzyPhysics extends Physics {
	constructor(speed, acc, fuzziness) {
		super(speed, acc, fuzziness);
		
		this.fuzziness = fuzziness;
		this.t = 0;
	}
	
	move(center) {
		var newCenter = BasicPhysics.prototype.move.call(this, center);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.t / this.fuzziness.period);
		
		this.t = (this.t + 1) % this.fuzziness.period;
		
		newCenter.x += actualFuzziness * Math.cos(this.speed.angle + Math.PI / 2);
		newCenter.y += actualFuzziness * Math.sin(this.speed.angle + Math.PI / 2);
		
		return newCenter;
	}
}