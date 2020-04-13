"use strict";

import Interface from '../core/interface';
import Agent from '../core/agent/agent';
import RoundShape from '../core/shape/round-shape';
import FuzzyPhysics from '../core/physics/fuzzy-physics';

import BehaviorInterface from '../core/behavior/behavior-interface';
import ComposedBehavior from '../core/behavior/composed-behavior';
import MoveBehavior from '../core/behavior/move-behavior';
import PeriodicBehavior from '../core/behavior/periodic-behavior';

import {generatePheromon} from './hive-agent-factory';

class ReleasePheromonBehavior {
	constructor() {
		Interface.checkImplements(this, BehaviorInterface);
	}
	
	apply(agent, world) {		
		var agentPosition = {
			x: agent.shape.center.x,
			y: agent.shape.center.y
		};
		var agentSourceAngle = agent.physics.speed.angle + Math.PI;
		var type = agent.searchingFlower ? "TOWARD_HIVE" : "TOWARD_FLOWER";
		
		world.addAgent(generatePheromon(agentPosition, agentSourceAngle, type));
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
			new RoundShape(position, 10), 
			new FuzzyPhysics(speed, 0.1, fuzziness),
			new ComposedBehavior(
				new MoveBehavior(),
				new PeriodicBehavior(new ReleasePheromonBehavior(), 30)
			)
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
