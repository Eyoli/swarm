import Interface from '../../core/interface';
import BehaviorInterface from '../../core/model/behavior/behavior-interface'
import MoveBehavior from './move-behavior';

export default class FuzzyMoveBehavior {
	constructor(agent, fuzziness) {
		Interface.checkImplements(this, BehaviorInterface);
		
		this.moveBehavior = new MoveBehavior(agent);
		
		this.fuzziness = fuzziness;
		this.t = 0;
	}
	
	apply(world) {
		this.moveBehavior.apply(this.moveBehavior.agent);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.t / this.fuzziness.period);
		
		this.t = (this.t + 1) % this.fuzziness.period;
		
		this.moveBehavior.agent.getShape().center.x += actualFuzziness * Math.cos(this.moveBehavior.agent.getPhysics().speed.angle + Math.PI / 2);
		this.moveBehavior.agent.getShape().center.y += actualFuzziness * Math.sin(this.moveBehavior.agent.getPhysics().speed.angle + Math.PI / 2);
	}
	
	isDestroyed() {
		return this.moveBehavior.isDestroyed();
	}
}
