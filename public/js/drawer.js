const Drawer = {
	drawCircle: (ctx, circle) => {
		ctx.beginPath();
		ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
		ctx.fill();
	},
	
	drawPolygone: (ctx, polygone) => {
		ctx.beginPath(); 
		ctx.moveTo(polygone.center.x + polygone.summits[0].x, polygone.center.y + polygone.summits[0].y);
		polygone.summits.forEach(summit => {
			ctx.lineTo(polygone.center.x + summit.x, polygone.center.y + summit.y);
		});
		ctx.lineTo(polygone.center.x + polygone.summits[0].x, polygone.center.y + polygone.summits[0].y);
		ctx.stroke();
	}
};