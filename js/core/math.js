import Rectangle from './model/shape/rectangle';

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

/**
* k: Index of knot interval that contains x.
* x: Position.
* t: Array of knot positions, needs to be padded : [0,1,2] for p=2 => [0,0,0,1,2,2,2]
* c: Array of control points
* p: Degree of B-spline.
*/
export const deBoorAlgorithm = function(x, k, t, c, p) {
    const d = c.slice(k - p, k + 1);
		
    for(let r = 1; r < p+1; r++) {
        for(let j = p; j > r-1; j--) {
			const alpha = (x - t[j+k-p]) / (t[j+1+k-r] - t[j+k-p]);
            if(alpha) {
				d[j] = (1.0 - alpha) * d[j-1] + alpha * d[j];
			} else {
				d[j] = d[j-1];
			}
		}
	}
			
    return d[p];
}

/**
* k: Index of interval that contains x.
* x: Parameter
* t: Array of stop points, needs to be padded : [0,0.5,1] for p=2 => [0,0,0,0.5,1,1,1]
* c=(c1, c2): Array of control points
* p: Degree of B-spline.
*/
export const deBoorAlgorithm2D = function(x, k, t, c1, c2, p) {
    const d = c.slice(k - p, k + 1);

    for(let r = 1; r < p+1; r++) {
        for(let j = p; j > r-1; j--) {
            const alpha = (x - t[j+k-p]) / (t[j+1+k-r] - t[j+k-p]);
            d[j][0] = (1.0 - alpha) * d[j-1][0] + alpha * d[j][0];
			d[j][1] = (1.0 - alpha) * d[j-1][1] + alpha * d[j][1];
		}
	}
	
    return d[p];
}