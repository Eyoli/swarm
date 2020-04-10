"use strict";

const Interface = require('../interface');
const CollisionResolver = require('./collision-resolver');

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

class BinarySearchTree {
	constructor() {
		this.predicates = [];
		this.data = {};
	}
	
	addPredicate(predicate) {
		this.predicates.push(predicate);
	}
	
	put(o) {
		var mask = this.getMask(o);
		this.data[mask] = this.data[mask] || [];
		this.data[mask].push(o);
	}
	
	putAll(list) {
		for(var i = 0; i < list.length; i++) {
			this.put(list[i]);
		}
	}
	
	clear() {
		this.data = {};
	}
	
	siblings(o) {
		return this.data[this.getMask(o)];
	}
	
	getMask(o) {
		var mask = 0;
		for(var i = 0; i < this.predicates.length; i++) {
			mask |= this.predicates[i](o) << i;
		}
		return mask;
	}
}
