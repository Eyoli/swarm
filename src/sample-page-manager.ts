import socketIo from 'socket.io';
import express from 'express';

import {WorldManager} from './world-manager';

const UPDATE_INTERVAL = 1000 / 30;

class PageParameters {
	io: socketIo.Namespace;
    clients: number;
    worldManager: WorldManager;
    name: string;
	template: string;

	constructor(io: socketIo.Namespace, clients: number, worldManager: WorldManager, name: string,
		template: string) {
		this.io = io;
		this.clients = clients;
		this.worldManager = worldManager;
		this.name = name;
		this.template = template;
	}
}

class SamplePageBuilder {
	app: express.Express;
	params: PageParameters
	events: Map<string, any>

	constructor(app: express.Express, params: PageParameters) {
		this.app = app;
		this.params = params;
		this.events = new Map<string, any>();
	}
	
	withEvent(eventName: string, fn: Function) {
		this.events.set(eventName, fn);
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
				socket.on(eventName, this.events.get(eventName));
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
			params.io.emit('update', params.worldManager.getState());
		}, UPDATE_INTERVAL);
		
		console.log('Add new sample at /' + params.name);
	}
}

export default class SamplePageManager {
	app: express.Express
	io: socketIo.Server
	params: Array<PageParameters>

	constructor(app: express.Express, io: socketIo.Server) {
		this.app = app;
		this.io = io;
		this.params = [];
	}
	
	addSample(name: string, template: string, worldManager: WorldManager) {
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