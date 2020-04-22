const UPDATE_INTERVAL = 1000 / 30;

export default class SamplePageManager {
	constructor(app, io) {
		this.app = app;
		this.io = io;
		this.params = [];
	}
	
	addSample(name, template, worldManager) {
		console.log('Add new sample at /' + name);
		
		this.app.get('/' + name, function (req, res) {
			res.render(template);
		});
		
		const params = {
			io: this.io.of('/' + name),
			clients: 0,
			worldManager: worldManager,
			name: name
		};
		this.params.push(params);

		params.io.on('connect', (socket) => {
			params.clients++;
			params.worldManager.togglePause(false);
			
			socket.emit('init', params.worldManager.getInfo());
			
			socket.on('click', event => {
				params.worldManager.handleClientMouseClick(event);
			});
			
			socket.on('disconnect', (reason) => {
				params.clients--;
				if(params.clients <= 0) {
					params.worldManager.togglePause(true);
					console.log(name + ' in pause mode');
				}
			});
		});
		
		setInterval(function () {
			params.worldManager.advance();
			params.io.volatile.emit('update', params.worldManager.getState());
		}, UPDATE_INTERVAL);
		
		return params;
	}
	
	list() {
		return this.params;
	}
}