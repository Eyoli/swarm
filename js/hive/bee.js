"use strict";

const Agent = require('../core/agent/agent');
const RoundShape = require('../core/shape/round-shape');
const FuzzyPhysics = require('../core/physics/fuzzy-physics');

class Bee extends Agent {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 10};
		
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
		
		world.withAgent(require('./hive-agent-factory').generatePheromon(beePosition, beeSourceAngle, type));
		
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

module.exports = Bee;
