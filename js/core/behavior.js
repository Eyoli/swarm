"use strict";

var BehaviorInterface = new Interface('Behavior', 'act');

class StraightMoveBehavior {
	constructor(range) {
		Interface.checkImplements(this, BehaviorInterface);
		
		this.range = range;
	}
	
	act(agent, context) {
		agent.physics.move();
		
		var center = agent.physics.getCenter();
		if(center.x < 0 || center.x > context.L
				|| center.y < 0 || center.y > context.H) {
			agent.destroyed = true;
		}
	}
}