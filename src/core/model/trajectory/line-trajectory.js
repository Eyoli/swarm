import TrajectoryInterface from './trajectory-interface';

export default class LineTrajectory {
	constructor(position, config) {
		TrajectoryInterface.checkImplements(this);
		
		this.position = position;
		this.config = config;
	}
	
	getNextPosition() {
		if(this.config.amp < this.config.max) {
			this.config.amp = Math.min(this.config.amp + this.config.acc, this.config.max);
		}
		
		this.position.x += this.config.amp * Math.cos(this.config.angle);
		this.position.y += this.config.amp * Math.sin(this.config.angle);
		
		return this.position;
	}
}