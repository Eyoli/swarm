const Drawer = {
	drawCircle: (ctx, {center, radius}) => {
		ctx.beginPath();
		ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		ctx.fill();
	},
	
	drawPolygone: (ctx, {center, summits}) => {
		ctx.beginPath(); 
		ctx.moveTo(center.x + summits[0].x, center.y + summits[0].y);
		summits.forEach(summit => {
			ctx.lineTo(center.x + summit.x, center.y + summit.y);
		});
		ctx.lineTo(center.x + summits[0].x, center.y + summits[0].y);
		ctx.stroke();
	},
	
	drawCurvedPolygone: (ctx, {center, summits}) => {
		const points = [];
		summits.forEach(s => {
			points.push(center.x + s.x);
			points.push(center.y + s.y);
		});
			
		ctx.beginPath();
		ctx.moveTo(points[0], points[1]);
		ctx.curve(points, 0.5, 20, true);
		ctx.stroke();
	}
};