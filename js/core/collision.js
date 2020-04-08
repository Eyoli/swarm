"use strict";

/**
	Basic collision engine : we test every collision possible in a set of shapes
*/
class BasicCollisionFinder {
	constructor() {
	}
	
	search(shapes) {
		var collidingIndexes = [];
		
		for(var i = 0; i < shapes.length; i++) {
			for(var j = i + 1; j < shapes.length; j++) {
				if(shapes[i].intersect(shapes[j])) {
					collidingIndexes.push({
						i1: i,
						i2: j
					});
				}
			}
		}
		
		return collidingIndexes;
	}
}