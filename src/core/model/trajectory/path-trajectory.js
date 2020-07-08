import TrajectoryInterface from './trajectory-interface';
import {computeDistanceInfo} from '../../math';

export default class PathTrajectory {
	constructor(position, path, config) {
		TrajectoryInterface.checkImplements(this);
		
		this.position = position;
		this.path = path;
		this.config = config;
		this.nextNode = this.path.shift();
	}
	
	getNextPosition() {
		if(this.nextNode) {
			const distanceInfo = computeDistanceInfo(this.position, this.nextNode);
			const d = Math.sqrt(distanceInfo.std);

			if(d < this.config.amp) {
				this.nextNode = this.path.shift();
			} else {
				if(distanceInfo.dy > 0) {
					this.config.angle = Math.acos(distanceInfo.dx / d);
				} else {
					this.config.angle = -Math.acos(distanceInfo.dx / d);
				}
				
				this.position.x += this.config.amp * Math.cos(this.config.angle);
				this.position.y += this.config.amp * Math.sin(this.config.angle);
			}
		}
		return this.position;
	}
}