import Shape from './shape';

function computeExtremities(points) {
	let init = {
		xMin: points[0].x,
		xMax: points[0].x,
		yMin: points[0].y,
		yMax: points[0].y
	};
	
	return points.reduce((res, point) => {
		if(res.xMin > point.x) {
			res.xMin = point.x;
		}
		if(res.xMax < point.x) {
			res.xMax = point.x;
		}
		if(res.yMin > point.y) {
			res.yMin = point.y;
		}
		if(res.yMax < point.y) {
			res.yMax = point.y;
		}
		return res;
	}, init);
}

function computeCenter(points) {
	let extremities = computeExtremities(points);
	return {
		x: (extremities.xMax + extremities.xMin) / 2,
		y: (extremities.yMax + extremities.yMin) / 2
	};
}

function computeBoundingRect(points) {
	let extremities = computeExtremities(points);
	
	return new Rectangle(
		{x: extremities.xMin, y: extremities.yMin},
		extremities.xMax - extremities.xMin,
		extremities.yMax - extremities.yMin
	);
}

function translate(point, translation) {
	return {
		x: point.x + translation.x,
		y: point.y + translation.y
	};
}

function iTranslate(point, translation) {
	return {
		x: point.x - translation.x,
		y: point.y - translation.y
	};
}

export class Polygone extends Shape {
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
			//console.log('Pi:', translate(Pi, this.center));
			//console.log('Pi+1:', translate(PiPlus1, this.center));
			//console.log('m:', m, 'p:', p);
			//console.log('I:', translate(I, this.center));
			
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

export class Rectangle extends Polygone {
	constructor({x, y}, length, width) {
		super(
			{x: x, y: y}, 
			{x: x + length, y: y}, 
			{x: x + length, y: y + width}, 
			{x: x, y: y + width}
		);
	}
	
	topLeft() {
		return this.summits[0];
	}
	
	topRight() {
		return this.summits[1];
	}
	
	downRight() {
		return this.summits[2];
	}
	
	downLeft() {
		return this.summits[3];
	}
	
	boundary() {
		return this;
	}
}

export default {Polygone, Rectangle};