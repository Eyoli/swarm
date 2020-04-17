import Shape from './shape';

function computeCenter(points) {
	let center = points.reduce((res, s) => {
			res.x += s.x;
			res.y += s.y;
			return res;
		}, {x: 0, y: 0});
	center.x = center.x * 1.0 / points.length;
	center.y = center.y * 1.0 / points.length;
	
	return center;
}

function computeBoundingRect(points) {
	let extremities = {
		xMin: points[0].x,
		xMax: points[0].x,
		yMin: points[0].y,
		yMax: points[0].y
	};
	
	for(let i = 1; i < points.length; i++) {
		if(extremities.xMin > points[i].x) {
			extremities.xMin = points[i].x;
		}
		if(extremities.xMax < points[i].x) {
			extremities.xMax = points[i].x;
		}
		if(extremities.yMin > points[i].y) {
			extremities.yMin = points[i].y;
		}
		if(extremities.yMax < points[i].y) {
			extremities.yMax = points[i].y;
		}
	}
	
	return new Rectangle(
		{x: extremities.xMin, y: extremities.yMax},
		{x: extremities.xMax, y: extremities.yMax},
		{x: extremities.xMax, y: extremities.yMin},
		{x: extremities.xMin, y: extremities.yMin}
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
		let test = iTranslate(point, center);
		
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
				p = Pi.y - m * Pi.x;
				I.y = m * Pi.x + p;
				
				if((I.x - Pi.x) * (I.x - PiPlus1.x) < 0 && (I.y - R.y) * (I.y - test.y) < 0) {
					c++;
				}
			}
		}
		
		return c % 2 !== 0;
	}
	
	boundary() {
		return computeBoundingRect(this.summits);
	}
}

export class Rectangle extends Polygone {
	constructor(topLeft, topRight, downRight, downLeft) {
		super(topLeft, topRight, downRight, downLeft);
	}
	
	topLeft() {
		return translate(this.summits[0], this.center);
	}
	
	topRight() {
		return translate(this.summits[1], this.center);
	}
	
	downRight() {
		return translate(this.summits[2], this.center);
	}
	
	downLeft() {
		return translate(this.summits[3], this.center);
	}
}

export default {Polygone, Rectangle};