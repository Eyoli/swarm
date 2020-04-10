const express = require('express');
const app = express();
const server = require('http').Server(app);

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render('index.ejs');
});

server.listen(3000, function () {
	console.log('Example app listening on port 3000!')
});

const SpatialSearchCollisionFinder = require('./js/core/collision/spatial-search-collision-finder');
const CircleCollisionResolver = require('./js/core/collision/circle-collision-resolver');
const World = require('./js/core/world');

const CollisionEngine = require('./js/core/engine/collision-engine');
const RoundWorldEngine = require('./js/core/engine/round-world-engine');
const ClearEngine = require('./js/core/engine/clear-engine');

const MobileMeanExtractor = require('./js/core/statistics/mobile-mean-extractor');

const {generateFlower, generateHive} = require('./js/hive/hive-agent-factory');

const WORLD_WIDTH = 1000;
const WORLD_LENGTH = 1000;
const UPDATE_INTERVAL = 1000 / 30;

function mapAgentToClient(agent) {
	return {
		info: agent.interact(),
		physics: agent.getPhysics(),
		shape: agent.getShape()
	};
}

//var collisionEngine = new CollisionEngine(new BasicCollisionFinder());
var collisionEngine = new CollisionEngine(
	new SpatialSearchCollisionFinder(
		new CircleCollisionResolver(), WORLD_WIDTH/ 2, WORLD_LENGTH / 2));

var world = new World(100)
			.withEngine(new ClearEngine())
			.withEngine(new RoundWorldEngine(WORLD_WIDTH, WORLD_LENGTH))
			.withEngine(collisionEngine)
			.withAgent(generateFlower({x: 300, y: 300}))
			.withAgent(generateHive({x: 10, y: 10}, 5));
			
var collisionsMobileMean = new MobileMeanExtractor(collisionEngine, e => e.collisionFinder.getLastComputations(), 20);
var agentsMobileMean = new MobileMeanExtractor(world, w => w.agents.length, 20);

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté');
});

setInterval(function () {
	world.advance();
	
	io.emit('update', {
		agents: world.agents.map(mapAgentToClient),
		collisionsMobileMean: collisionsMobileMean.update(),
		agentsMobileMean: agentsMobileMean.update()
		
	});
}, UPDATE_INTERVAL);
