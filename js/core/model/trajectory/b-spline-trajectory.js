import PathTrajectory from './path-trajectory';
import {computeDistanceInfo,deBoorAlgorithm} from '../../math';

export default class BSplineTrajectory extends PathTrajectory {
	constructor(position, config) {
		
		if(config.control.length <= config.p) {
			throw 'Not enougt control points to create b-spline';
		}
		
		// Increase influence of the last point
		config.control.push(config.control[config.control.length-1]);
		config.control.push(config.control[config.control.length-1]);
		
		const cx = config.control.map(c => c.x);
		const cy = config.control.map(c => c.y);
		const t = 0;
		const kMax = config.control.length;
		const w = config.control.slice(0).fill(1);
		const sampling = Math.floor((config.sampling || 1) * config.control.length);
		
		const steps = [0];
		for(let i = 1; i < config.control.length; i++) {
			steps[i] = steps[i-1] + Math.sqrt(computeDistanceInfo(config.control[i-1], config.control[i]).std);
		}
		const dMax = steps[steps.length-1];
		
		for(let i = 1; i < config.control.length; i++) {
			steps[i] /= dMax;
		}
		
		for(let i = 0; i < config.p; i++) {
			steps.unshift(0);
			steps.push(1);
		}
		
		
		const path = [];
		const dt = 1 / config.control.length;
		
		for(let i = 0, t = dt, k = config.p; i < sampling; i++, t += dt) {
			while(k < kMax && t >= steps[k]) {
				k++;
			}
			if(k <= kMax && t < 1) {
				path.push({
					x: deBoorAlgorithm(t, k - 1, steps, cx, config.p),
					y: deBoorAlgorithm(t, k - 1, steps, cy, config.p)
				});
			}
		}
				
		super(position, path, config);
	}
}