import Interface from '../interface';
import CollisionResolver from './collision-resolver';

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

export default class CircleCollisionResolver {
	constructor() {
		Interface.checkImplements(this, CollisionResolver);
	}
	
	resolve(shape1, shape2) {
		var distanceInfo = computeDistanceInfo(shape1.center, shape2.center);
		
		return distanceInfo.std < (shape1.radius + shape2.radius) * (shape1.radius + shape2.radius);
	}
}
