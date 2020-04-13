import Physics from './physics';
import BasicPhysics from './basic-physics';

export default class FuzzyPhysics extends Physics {
	constructor(speed, acc, fuzziness) {
		super(speed, acc, fuzziness);
		
		this.fuzziness = fuzziness;
		this.t = 0;
	}
	
	move(center) {
		var newCenter = BasicPhysics.prototype.move.call(this, center);
		
		var actualFuzziness = this.fuzziness.amp * Math.cos(2 * Math.PI * this.t / this.fuzziness.period);
		
		this.t = (this.t + 1) % this.fuzziness.period;
		
		newCenter.x += actualFuzziness * Math.cos(this.speed.angle + Math.PI / 2);
		newCenter.y += actualFuzziness * Math.sin(this.speed.angle + Math.PI / 2);
		
		return newCenter;
	}
}
