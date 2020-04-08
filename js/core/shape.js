"use strict";

var ShapeInterface = new Interface('Shape', 'intersect', 'getClosestPoint');

function computeDistanceInfo(p1, p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var std = dx * dx + dy * dy;
	
	return {
		dx: dx,
		dy: dy,
		std: std
	};
}

class Shape {
	constructor(center) {
		Interface.checkImplements(this, ShapeInterface);
		
		if (this.constructor === Shape) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.center = center;
	}
}

class ShapeDecorator {
	constructor(shape) {
		Interface.checkImplements(this, ShapeInterface);
		
		if (this.constructor === ShapeDecorator) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.shape = shape;
	}
	
	intersect(shape) {
		return this.shape.intersect(shape);
	}
	
	getClosestPoint(position) {
		return this.shape.getClosestPoint(position);
	}
}

class RoundShape extends Shape {
	constructor(center, radius) {
		super(center);
		
		this.radius = radius;
	}
	
	intersect(shape) {
		var closestPoint = shape.getClosestPoint(this.center);
		var distanceInfo = computeDistanceInfo(this.center, closestPoint);
		
		return distanceInfo.std < this.radius * this.radius;
	}
	
	getClosestPoint(position) {
		var distanceInfo = computeDistanceInfo(this.center, position);
		var d = Math.sqrt(distanceInfo.std);
		
		return {
			x: this.center.x + distanceInfo.dx * this.radius / d,
			y: this.center.y + distanceInfo.dy * this.radius / d
		};
	}
}
