import TypedAgent from '../utils/agent/typed-agent';

import Bee from './bee';
import Hive from './hive';
import Flower from './flower';
import Pheromon from './pheromon';

export const generateBee = (world, position) => {
	var bee = new TypedAgent(new Bee(position, 2 * Math.PI * Math.random()), "BEE");
	return world.addAgent(bee);
};
	
export const generateHive = (world, position, beesInside) => {
	var hive = new TypedAgent(new Hive(position, beesInside), "HIVE");
	return world.addAgent(hive);
};

export const generateFlower = (world, position) => {
	return world.addAgent(new TypedAgent(new Flower(position), "FLOWER"));
};

export const generatePheromon = (world, position, sourceAngle, type) => {
	var pheromon = new TypedAgent(new Pheromon(position, sourceAngle), type);
	return world.addAgent(pheromon);
};
