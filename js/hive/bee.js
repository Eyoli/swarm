"use strict";

import Interface from '../core/interface';
import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import FuzzyPhysics from '../core/physics/fuzzy-physics';

import {generatePheromon} from './hive-agent-factory';

export default class Bee extends Agent {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 10};
		
		var fuzziness = {
			amp: 3,
			period: 25
		};
		
		super(
			new RoundShape(position, 10), 
			new FuzzyPhysics(speed, 0.1, fuzziness)
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
