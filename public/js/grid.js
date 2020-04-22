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
		state.grid = data.grid;
    });
    
	function draw(timestamp) {
					        
        ctx.clearRect(0, 0, context.length, context.width);
		
		ctx.font = "20px Georgia";
		ui.layout('props')
			.property("agents").withValue(state.agentsMobileMean.toFixed(0));
		
		if(state.grid) {
			//drawGrid(state.grid.grid, state.grid.dx);
			//drawPath(state.path, nodeSpan);
		}
		
		state.agents.forEach(a => {
			if(a.info.type === 'dupe') {
				ctx.fillStyle = "#0000ff";
				ctx.globalAlpha = 1;
				Drawer.drawCircle(ctx, a.shape);
			} else {
				ctx.globalAlpha = 1;
				ctx.lineWidth = 1 / state.sx;
				Drawer.drawPolygone(ctx, a.shape);
			}
		});
		
		ui.draw(ctx);
		
		window.requestAnimationFrame(draw);
	}
	
	function drawGrid(grid, span) {
		ctx.globalAlpha = 0.2;
		grid.forEach((row, i) => row.forEach((node, j) => drawNode(i, j, node ? "#ff0000" : "#000000", span)));
	}
	
	function drawPath(path, span) {
		path.forEach(node => drawNode(node.nx, node.ny, "#00ff00", span));
	}
	
	function drawNode(i, j, color, span) {
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.arc((span / 2) + i * span, (span / 2) + j * span, span / 2, 0, 2 * Math.PI);
		ctx.fill();
	}
	
	function onClick(e) {
		const target = e.target;
		const canvasPosition = target.getBoundingClientRect();
		const inputX = e.pageX - canvasPosition.left;
		const inputY = e.pageY - canvasPosition.top;
		socket.emit('click', {
			x: inputX / state.sx,
			y: inputY / state.sy
		});
	}
	
	canvas.addEventListener("click", onClick, false);
    
    window.requestAnimationFrame(draw);
};
