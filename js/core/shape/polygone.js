import Shape from './shape';
import {computeCenter, iTranslate, computeBoundingRect} from '../math'

export default class Polygone extends Shape {
	constructor(...summits) {
		let center = computeCenter(summits);
		
		super(center);
		
		this.summits = summits.map(s => iTranslate(s, center));
	}
	
	contains(point) {
		let test = iTranslate(point, this.center);
		
		let yMax = Math.max(...this.summits.map(s => s.y));
		let R = {
			x: test.x, 
			y: yMax + 1
		};
		
		let c = 0, m, p, Pi, PiPlus1, I = {
			x: test.x, 
			y: this.summits[0].y
		};
		
		for(let i = 0; i < this.summits.length; i++) {
			Pi = this.summits[i];
			PiPlus1 = i === this.summits.length - 1 ? this.summits[0] : this.summits[i+1];
			if(Pi.x != PiPlus1.x) {
				m = (PiPlus1.y - Pi.y) / (PiPlus1.x - Pi.x);
				p = Pi.y - (m * Pi.x);
				I.y = m * I.x + p;
			}
			
			if((I.x - Pi.x) * (I.x - PiPlus1.x) < 0 
				&& (I.y - R.y) * (I.y - test.y) < 0) {
				c++;
			}
		}
		
		return c % 2 !== 0;
	}
	
	boundary() {
		if(!this.boundingRect) {
			this.boundingRect = computeBoundingRect(this.summits);
		}
		return this.boundingRect;
	}
}
