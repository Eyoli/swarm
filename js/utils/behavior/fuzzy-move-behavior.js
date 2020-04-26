import Interface from '../../core/interface';
import BehaviorInterface from '../../core/model/behavior/behavior-interface'
import MoveBehavior from './move-behavior';

export default class FuzzyMoveBehavior {
	constructor(trajectory, fuzziness) {
		Interface.checkImplements(this, BehaviorInterface);
		
		this.moveBehavior = new MoveBehavior(trajectory);
		
		this.fuzziness = fuzziness;
		this.t = 0;
	}
	
	apply(agent, world) {
		this.moveBehavior.apply(agent, world);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.t / this.fuzziness.period);
		
		this.t = (this.t + 1) % this.fuzziness.period;
		
		agent.getShape().center.x += actualFuzziness * Math.cos(agent.getPhysics().speed.angle + Math.PI / 2);
		agent.getShape().center.y += actualFuzziness * Math.sin(agent.getPhysics().speed.angle + Math.PI / 2);
	}
	
	isDestroyed() {
		return this.moveBehavior.isDestroyed();
	}
}
