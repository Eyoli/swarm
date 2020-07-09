"use strict";

import Interface from '../core/interface';
import Agent from '../core/model/agent/agent';
import Circle from '../core/model/shape/circle';
import BasicPhysics from '../core/model/physics/basic-physics';

import GeneratorBehavior from'../utils/behavior/generator-behavior';
import ComposedBehavior from '../core/model/behavior/composed-behavior';
import PeriodicBehavior from '../utils/behavior/periodic-behavior';
import FuzzyMoveBehavior from '../utils/behavior/fuzzy-move-behavior';

import LineTrajectory from '../core/model/trajectory/line-trajectory';

import {generatePheromon} from './hive-agent-factory';

class ReleasePheromonBehavior extends GeneratorBehavior {
	constructor(max) {
		super(max);
	}
	
	generate(agent, world) {
		const agentPosition = {
			x: agent.getShape().center.x,
			y: agent.getShape().center.y
		};
		const agentSourceAngle = agent.getPhysics().speed.angle + Math.PI;
		const type = agent.searchingFlower ? "TOWARD_HIVE" : "TOWARD_FLOWER";
		
		return generatePheromon(world, agentPosition, agentSourceAngle, type);
	}
}

export default class Bee extends Agent {
	constructor(position, angle) {
		const config = {
			amp: 0, 
			angle: angle, 
			max: 10, 
			acc: 0.1
		};
		
		const fuzziness = {
			amp: 3,
			period: 25
		};
		
		const trajectory = new LineTrajectory(position, config);
		
		super(
			new Circle(position, 10), 
			new BasicPhysics(config),
			new ComposedBehavior(
				new FuzzyMoveBehavior(trajectory, fuzziness),
				new PeriodicBehavior(
					new ReleasePheromonBehavior(), 30))
		);
		
		this.searchingFlower = true;
		this.trajectory = trajectory;
	}
	
	react(world, info) {
		if(info.type === "FLOWER") {
			this.searchingFlower = false;
		} else if(info.type === "HIVE") {
			this.searchingFlower = true;
		} else if(info.type === "TOWARD_FLOWER" && this.searchingFlower) {
			this.trajectory.speed.angle = info.sourceAngle;
		} else if(info.type === "TOWARD_HIVE" && !this.searchingFlower) {
			this.trajectory.speed.angle = info.sourceAngle;
		}
	}
	
	interact() {
		return {
		};
	}
}
