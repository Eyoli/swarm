function getCanvasMousePosition(e) {
	const target = e.target;
	const canvasPosition = target.getBoundingClientRect();
	
	return {
		x: e.pageX - canvasPosition.left,
		y: e.pageY - canvasPosition.top
	};
}

window.onload = function() {
	const canvas = document.getElementById("myCanvas");
	const ctx = canvas.getContext("2d");
	
	const context = {
		length: 800,
		width: 800
	};
		
	const state = {
		agentsMobileMean: 0,
		agents: []
	};
	
	const socket = io.connect('http://localhost:3000/grid');
	
	const selectionHandler = new SelectionHandler(canvas, selection => {
		selection.x /= state.sx;
		selection.y /= state.sy;
		selection.width /= state.sx;
		selection.height /= state.sy;
		socket.emit('selection', selection);
	});
	
	const ui = new GameUI();
	ui.layout('props').at(context.length - 200)
		.preDraw(ctx => {
			ctx.fillStyle = "#000000";
		})
		.property('agents').at(0, 30).withLabel('Agents').up()
		.property('behaviors').at(0, 60).withLabel('Behaviors');
		
	socket.on('init', function(data) {
		if(state.sx && state.sy) {
			ctx.scale(1 / state.sx, 1 / state.sy);
		}
		state.sx = context.length * 1.0 / data.length;
		state.sy = context.width * 1.0 / data.width;
		ctx.scale(state.sx, state.sy);
	});
	
	socket.on('update', function(data) {
		state.agentsMobileMean = data.agentsMobileMean;			
		state.agents = data.agents || [];
    });
    
	function draw(timestamp) {
					        
        ctx.clearRect(0, 0, context.length, context.width);
		
		ctx.font = "20px Georgia";
		ui.layout('props')
			.property("agents").withValue(state.agentsMobileMean.toFixed(0));
		
		state.agents.forEach(a => {
			if(a.info.type === 'dupe') {
				ctx.globalAlpha = 1;
				if(a.info.selected) {
					ctx.fillStyle = "#ff0000";
					Drawer.drawCircle(ctx, {center: a.shape.center, radius: a.shape.radius + 1});
				}
				ctx.fillStyle = "#0000ff";
				Drawer.drawCircle(ctx, a.shape);
			} else {
				ctx.globalAlpha = 1;
				ctx.lineWidth = 1 / state.sx;
				Drawer.drawCurvedPolygone(ctx, a.shape);
			}
		});
		
		ctx.globalAlpha = 0.2;
		ctx.fillStyle = "#ff0000";
		if(selectionHandler.rect.x) {
			ctx.fillRect(
				selectionHandler.rect.x / state.sx, 
				selectionHandler.rect.y / state.sy, 
				selectionHandler.rect.width / state.sx, 
				selectionHandler.rect.height / state.sy
			);
		}
		
		ui.draw(ctx);
		
		window.requestAnimationFrame(draw);
	}
	
	function onRightClick(e) {
		const pos = getCanvasMousePosition(e);
		
		socket.emit('rigthClick', {
			x: pos.x / state.sx,
			y: pos.y / state.sy
		});
		
		e.preventDefault();
	}

	canvas.addEventListener("contextmenu", onRightClick, false);

    window.requestAnimationFrame(draw);
};
