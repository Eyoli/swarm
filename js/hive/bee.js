"use strict";

class BeePhysics extends BasicPhysics {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 10};
		super(new RoundShape(position, 20), speed, 0.1);
		
		this.fuzziness = {
			amp: 3,
			period: 25,
			t: 0
		};
	}
	
	move() {
		BasicPhysics.prototype.move.call(this);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.fuzziness.t / this.fuzziness.period);
		this.shape.center.x += actualFuzziness * Math.cos(this.speed.angle + Math.PI / 2);
		this.shape.center.y += actualFuzziness * Math.sin(this.speed.angle + Math.PI / 2);
		
		this.fuzziness.t++;
	}
}

class Bee extends Agent {
	constructor(position, angle) {
		super(new BeePhysics(position, angle));
		
		var searchingFlower = false;
		var pheromonReleasingPeriod = 15;
	}
	
	act(world) {
		this.physics.move();
	}
	
	react(world, info) {
		if(info.type == "FLOWER") {
			
		}
	}
	
	interact() {
		return {};
	}
}

class UnmovableAgent extends Agent {
	constructor(position) {
		var speed = {amp: 0, angle: 0, max: 0};
		super(new BasicPhysics(new RoundShape(position, 40), speed, 0));
	}
}

class Hive extends UnmovableAgent {
	constructor(position) {
		super(position);
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
			type: "HIVE"
		};
	}
}

class Pheromon extends UnmovableAgent {
	constructor(position) {
		super(position);
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
			type: "PHEROMON",
			sourceAngle: this.sourceAngle
		};
	}
}

class Flower extends UnmovableAgent {
	constructor(position) {
		super(position);
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
			type: "FLOWER"
		};
	}
}