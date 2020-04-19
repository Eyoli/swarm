import Interface from '../interface';
import CollisionResolver from './collision-resolver';
import {computeDistanceInfo} from '../math';

export default class CircleCollisionResolver {
	constructor() {
		Interface.checkImplements(this, CollisionResolver);
	}
	
	resolve(shape1, shape2) {
		var distanceInfo = computeDistanceInfo(shape1.center, shape2.center);
		
		return distanceInfo.std < (shape1.radius + shape2.radius) * (shape1.radius + shape2.radius);
	}
}
