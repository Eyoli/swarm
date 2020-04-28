const UPDATE_INTERVAL = 1000 / 30;

class SamplePageBuilder {
	constructor(app, params) {
		this.app = app;
		this.params = params;
		this.events = {};
	}
	
	withEvent(eventName, fn) {
		this.events[eventName] = fn;
		return this;
	}
	
	build() {
		const params = this.params;
		
		this.app.get('/' + params.name, function (req, res) {
			res.render(params.template);
		});

		params.io.on('connect', (socket) => {
			params.clients++;
			params.worldManager.togglePause(false);
			
			socket.emit('init', params.worldManager.getInfo());
			
			for(let eventName in this.events) {
				socket.on(eventName, this.events[eventName]);
			}
			
			socket.on('disconnect', reason => {
				params.clients--;
				if(params.clients <= 0) {
					params.worldManager.togglePause(true);
					console.log(params.name + ' in pause mode');
				}
			});
		});
		
		setInterval(function () {
			params.worldManager.advance();
			params.io.volatile.emit('update', params.worldManager.getState());
		}, UPDATE_INTERVAL);
		
		console.log('Add new sample at /' + params.name);
	}
}

export default class SamplePageManager {
	constructor(app, io) {
		this.app = app;
		this.io = io;
		this.params = [];
	}
	
	addSample(name, template, worldManager) {
		const params = {
			io: this.io.of('/' + name),
			clients: 0,
			worldManager: worldManager,
			name: name,
			template: template
		};
		this.params.push(params);
		
		return new SamplePageBuilder(this.app, params);
	}
	
	list() {
		return this.params;
	}
}