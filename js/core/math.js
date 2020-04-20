import Rectangle from './shape/rectangle';

export const computeDistanceInfo = function(p1, p2) {
	var dx = p2.x - p1.x;
	var dy = p2.y - p1.y;
	var std = dx * dx + dy * dy;
	
	return {
		dx: dx,
		dy: dy,
		std: std
	};
}

export const computeExtremities = function(points) {
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

export const computeCenter = function(points) {
	let extremities = computeExtremities(points);
	return {
		x: (extremities.xMax + extremities.xMin) / 2,
		y: (extremities.yMax + extremities.yMin) / 2
	};
}

export const computeBoundingRect = function(points) {
	let extremities = computeExtremities(points);
	
	return new Rectangle(
		{x: extremities.xMin, y: extremities.yMin},
		extremities.xMax - extremities.xMin,
		extremities.yMax - extremities.yMin
	);
}

export const translate = function(point, translation) {
	return {
		x: point.x + translation.x,
		y: point.y + translation.y
	};
}

export const iTranslate = function(point, translation) {
	return {
		x: point.x - translation.x,
		y: point.y - translation.y
	};
}