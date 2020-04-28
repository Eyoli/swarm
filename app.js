import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

import HiveWorld from './js/hive-world';
import RPGWorld from './js/rpg-world';
import SamplePageManager from './js/sample-page-manager';

const WORLD_WIDTH = 1000;
const WORLD_LENGTH = 1000;

const app = express();
const server = http.Server(app);

app.use('/static', express.static(__dirname + '/public'));

server.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});

// Chargement de socket.io
const io = socketIo.listen(server);

const samplePageManager = new SamplePageManager(app, io);

// Hive world settings
const hiveWorld = new HiveWorld(WORLD_WIDTH, WORLD_LENGTH);
samplePageManager
	.addSample('hive', 'hive.ejs', hiveWorld)
	.build();

// RPG world settings
const rpgWorld = new RPGWorld(100, 100);
samplePageManager
	.addSample('grid', 'grid.ejs', rpgWorld)
	.withEvent('rigthClick', event => {
		rpgWorld.handleClientMouseRightClick(event);
	})
	.withEvent('selection', event => {
		rpgWorld.handleSelection(event);
	})
	.build();

app.get('/', function (req, res) {
	res.render('index.ejs', {list: samplePageManager.list()});
});

