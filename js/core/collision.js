"use strict";

var CollisionResolver = new Interface('CollisionResolver', 'resolve');

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

class CircleCollisionResolver {
	constructor() {
		Interface.checkImplements(this, CollisionResolver);
	}
	
	resolve(shape1, shape2) {
		var distanceInfo = computeDistanceInfo(shape1.center, shape2.center);
		
		return distanceInfo.std < (shape1.radius + shape2.radius) * (shape1.radius + shape2.radius);
	}
}

class CollisionFinder {
	constructor() {
		if (this.constructor === CollisionFinder) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.lastComputations = 0;
	}
	
	search(shapes) {
		throw new Error('You must implement this function');
	}
	
	getLastComputations() {
		return this.lastComputations;
	}
}

/**
	Basic collision engine : we test every collision possible in a set of shapes
*/
class BasicCollisionFinder extends CollisionFinder {
	constructor(collisionResolver) {
		super();
		
		this.collisionResolver = collisionResolver;
	}

	search(shapes) {
		var collidingIndexes = [];
		
		for(var i = 0; i < shapes.length; i++) {
			for(var j = i + 1; j < shapes.length; j++) {
				if(this.collisionResolver.resolve(shapes[i], shapes[j])) {
					collidingIndexes.push({
						i1: i,
						i2: j
					});
				}
			}
		}
		this.lastComputations = shapes.length * (shapes.length - 1) / 2;
		
		return collidingIndexes;
	}
}

class SpatialSearchCollisionFinder extends CollisionFinder {
	constructor(collisionResolver, xCut, yCut) {
		super();
		
		this.collisionFinder = new BasicCollisionFinder(collisionResolver);
		this.binarySearchTree = new BinarySearchTree();
		this.binarySearchTree.addPredicate(s => s.center.x < xCut);
		this.binarySearchTree.addPredicate(s => s.center.y < yCut);
	}
	
	search(shapes) {
		var collidingIndexes = [];
		this.lastComputations = 0;
		
		this.binarySearchTree.clear();
		this.binarySearchTree.putAll(shapes);
		
		for(var mask in this.binarySearchTree.data) {
			collidingIndexes.concat(this.collisionFinder.search(this.binarySearchTree.data[mask]));
			this.lastComputations += this.collisionFinder.getLastComputations();
		}
		
		return collidingIndexes;
	}
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
