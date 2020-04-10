"use strict";

class HiveAgentFactory {
	constructor() {
		throw new TypeError('Static class cannot be instantiated');
	}
	
	static generateBee(position) {
		return new TypedAgent(new Bee(position, 2 * Math.PI * Math.random()), "BEE");
	}
	
	static generateHive(position, beesInside) {
		return new TypedAgent(new Hive(position, beesInside), "HIVE");
	}
	
	static generateFlower(position) {
		return new TypedAgent(new Flower(position), "FLOWER");
	}
	
	static generatePheromon(position, sourceAngle, type) {
		return new TypedAgent(new TimedAgent(new Pheromon(position, sourceAngle), 200), type);
	}
}

class Bee extends Agent {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 5};
		
		var fuzziness = {
			amp: 3,
			period: 25
		};
		
		super(
			new RoundShape(position, 10), 
			new FuzzyPhysics(speed, 0.1, fuzziness));
		
		this.searchingFlower = true;
		this.releasingPeriod = 30;
		this.lastReleaseStep = 0;
	}
	
	act(world) {
		this.shape.center = this.physics.move(this.shape.center);
		
		var rand = Math.random();
		
		if(rand > 0.99) {
			this.physics.speed.angle = 2 * Math.PI * Math.random();
		}
		
		if(world.step - this.lastReleaseStep >= this.releasingPeriod) {
			this.releasePheromon(world);
		}
	}
	
	releasePheromon(world) {
		var beePosition = {
			x: this.shape.center.x,
			y: this.shape.center.y
		};
		var beeSourceAngle = this.physics.speed.angle + Math.PI;
		var type = this.searchingFlower ? "TOWARD_HIVE" : "TOWARD_FLOWER";
		
		world.withAgent(HiveAgentFactory.generatePheromon(beePosition, beeSourceAngle, type));
		
		this.lastReleaseStep = world.step;
	}
	
	react(world, info) {
		if(info.type === "FLOWER") {
			this.searchingFlower = false;
		} else if(info.type === "HIVE") {
			this.searchingFlower = true;
		} else if(info.type === "TOWARD_FLOWER" && this.searchingFlower) {
			this.physics.speed.angle = info.sourceAngle;
		} else if(info.type === "TOWARD_HIVE" && !this.searchingFlower) {
			this.physics.speed.angle = info.sourceAngle;
		}
	}
	
	interact() {
		return {
		};
	}
}

class UnmovableAgent extends Agent {
	constructor(position) {
		var speed = {amp: 0, angle: 0, max: 0};
		super(new RoundShape(position, 40), new BasicPhysics(speed, 0));
	}
}

class Hive extends UnmovableAgent {
	constructor(position, beesInside) {
		super(position);
		
		this.beesInside = beesInside || 0;
		this.currentBees = 0;
		this.releaseBeePeriod = 50;
		this.lastReleaseStep = 0;
	}
	
	act(world) {
		if(this.beesInside > 0 && (world.step - this.lastReleaseStep) >= this.releaseBeePeriod) {
			var hivePosition = {
				x: this.shape.center.x,
				y: this.shape.center.y
			};
			world.withAgent(HiveAgentFactory.generateBee(hivePosition));
			
			this.beesInside--;
			this.lastReleaseStep = world.step;
		}
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
		};
	}
}

class Pheromon extends UnmovableAgent {
	constructor(position, sourceAngle) {
		super(position);
		
		this.sourceAngle = sourceAngle;
	}
	
	act(world) {
	}
	
	react(world, info) {
	}
	
	interact() {
		return {
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
		};
	}
}