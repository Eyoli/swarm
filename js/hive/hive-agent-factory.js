const TypedAgent = require('../core/agent/typed-agent');
const TimedAgent = require('../core/agent/timed-agent');

const Bee = require('./bee');
const Hive = require('./hive');
const Flower = require('./flower');
const Pheromon = require('./pheromon');

exports.generateBee = (position) => {
	return new TypedAgent(new Bee(position, 2 * Math.PI * Math.random()), "BEE");
};
	
exports.generateHive = (position, beesInside) => {
	return new TypedAgent(new Hive(position, beesInside), "HIVE");
};

exports.generateFlower = (position) => {
	return new TypedAgent(new Flower(position), "FLOWER");
};

exports.generatePheromon = (position, sourceAngle, type) => {
	return new TypedAgent(new TimedAgent(new Pheromon(position, sourceAngle), 200), type);
};
