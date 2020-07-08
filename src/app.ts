import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

import SamplePageManager from './sample-page-manager';
import HiveWorld from './hive-world';
import RPGWorld from "./rpg-world";

const WORLD_WIDTH = 1000;
const WORLD_LENGTH = 1000;

const app = express();
const server = new http.Server(app);

app.use('/static', express.static(__dirname + '/../public'));

app.set('views', __dirname + '/../views');

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
	.withEvent('rigthClick', (event: any) => {
		rpgWorld.handleClientMouseRightClick(event);
	})
	.withEvent('selection', (event: any) => {
		rpgWorld.handleSelection(event);
	})
	.build();

app.get('/', function (req, res) {
	res.render('index.ejs', {list: samplePageManager.list()});
});

