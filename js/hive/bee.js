"use strict";

import Interface from '../core/interface';
import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

import GeneratorBehavior from'../utils/behavior/generator-behavior';
import ComposedBehavior from '../core/model/behavior/composed-behavior';
import PeriodicBehavior from '../utils/behavior/periodic-behavior';
import FuzzyMoveBehavior from '../utils/behavior/fuzzy-move-behavior';

import {generatePheromon} from './hive-agent-factory';

class ReleasePheromonBehavior extends GeneratorBehavior {
	constructor(max) {
		super(max);
	}
	
	generate(agent, world) {
		var agentPosition = {
			x: agent.getShape().center.x,
			y: agent.getShape().center.y
		};
		var agentSourceAngle = agent.getPhysics().speed.angle + Math.PI;
		var type = agent.searchingFlower ? "TOWARD_HIVE" : "TOWARD_FLOWER";
		
		return generatePheromon(world, agentPosition, agentSourceAngle, type);
	}
}

export default class Bee extends Agent {
	constructor(position, angle) {
		var speed = {amp: 0, angle: angle, max: 10};
		
		var fuzziness = {
			amp: 3,
			period: 25
		};
		
		super(
			new Circle(position, 10), 
			new BasicPhysics(speed, 0.1),
			new ComposedBehavior(
				new FuzzyMoveBehavior(fuzziness),
				new PeriodicBehavior(
					new ReleasePheromonBehavior(), 30))
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
