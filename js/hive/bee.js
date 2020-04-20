"use strict";

import Interface from '../core/interface';
import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

import {generatePheromon} from './hive-agent-factory';

export default class Bee extends Agent {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 10};
		
		super(
			new Circle(position, 10), 
			new BasicPhysics(speed, 0.1)
		);
		
		this.searchingFlower = true;
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
