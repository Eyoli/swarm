import express from 'express';
import http from 'http';
import socketIo from 'socket.io';

import HiveWorld from './js/hive-world';

const WORLD_WIDTH = 1000;
const WORLD_LENGTH = 1000;
const UPDATE_INTERVAL = 1000 / 30;

const app = express();
const server = http.Server(app);

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index.ejs');
});

app.get('/hive', function (req, res) {
	res.render('hive.ejs');
});

server.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});

// Chargement de socket.io
var io = socketIo.listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté');
});

// Hive world settings
var hiveWorld = new HiveWorld(WORLD_WIDTH, WORLD_LENGTH);

var ioHive = io.of('/hive');
var clients = 0;

ioHive.on('connect', (socket) => {
	clients++;
	hiveWorld.togglePause(false);
	
	socket.on('disconnect', (reason) => {
		clients--;
		if(clients <= 0) {
			hiveWorld.togglePause(true);
			console.log('Hive in pause mode');
		}
	});
});

setInterval(function () {
	hiveWorld.advance();
	
	ioHive.volatile.emit('update', hiveWorld.getState());
}, UPDATE_INTERVAL);
