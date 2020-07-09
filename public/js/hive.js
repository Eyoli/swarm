window.onload = function() {
	//Create a Pixi Application
	let app = new PIXI.Application({width: 800, height: 800});
	app.renderer.backgroundColor = 0x061639;

	//Add the canvas that Pixi automatically created for you to the HTML document
	document.body.appendChild(app.view);

	var ctx = app.view.getContext("2d");
    var lastTimestamp = 0;
    var interval = 100;
	var start = true;
	
	var context = {
		length: 800,
		width: 800
	};
	
	var collisionsMobileMean = 0, agentsMobileMean = 0;
	
	let agents = [];
	const views = {};
	
	var socket = io.connect('http://localhost:3000/hive');
	
	let ui = new GameUI();
	ui.layout('props').at(context.length - 200)
		.preDraw(ctx => {
			ctx.fillStyle = "#000000";
		})
		.property('collisions').at(0, 30).withLabel('Collision tests').up()
		.property('agents').at(0, 60).withLabel('Agents');
	
	socket.on('update', function(data) {
		collisionsMobileMean = data.collisionsMobileMean;
		agentsMobileMean = data.agentsMobileMean;
			
		agents = data.agents;
		agents.forEach((agent, i) => {
			const pos = correctPosition(agent.shape.center, context.length * 1.0 / data.length, context.width * 1.0 / data.width);
			
			if(!views[agent.id]) {
				let graphics;
				
				switch(agent.info.type) {
					case "HIVE":
						graphics = createCircle(0x0000ff, pos.x, pos.y, agent.shape.radius);
						break;
					case "FLOWER":
						graphics = createCircle(0xff0000, pos.x, pos.y, agent.shape.radius);
						break;
					case "TOWARD_HIVE":
					case "TOWARD_FLOWER":
						graphics = createCircle(0x000000, pos.x, pos.y, agent.shape.radius);
						break;
					case "BEE":
						graphics = createCircle(0xff0000, pos.x, pos.y, agent.shape.radius);
						break;
					default:
						break;
				}
				
				app.stage.addChild(graphics);
				views[agent.id] = graphics;
			}
			
			if(views[agent.id]) {
				views[agent.id].x = pos.x;
				views[agent.id].y = pos.y;
			}
		});
    })
	
	function correctPosition(position, lengthCorrection, widthCorrection) {
		return {
			x: position.x * lengthCorrection,
			y: position.y * widthCorrection
		};
	}
	
	function createCircle(color, x, y, radius) {
		const graphics = new PIXI.Graphics();
		graphics.beginFill(color);
		graphics.arc(x, y, radius, 0, 2 * Math.PI);
		return graphics;
	}
    
    //window.requestAnimationFrame(draw);
};
