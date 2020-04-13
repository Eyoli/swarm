import TypedAgent from '../core/agent/typed-agent';
import TimedAgent from '../core/agent/timed-agent';

import Bee from './bee';
import Hive from './hive';
import Flower from './flower';
import Pheromon from './pheromon';

export const generateBee = (position) => {
	return new TypedAgent(new Bee(position, 2 * Math.PI * Math.random()), "BEE");
};
	
export const generateHive = (position, beesInside) => {
	return new TypedAgent(new Hive(position, beesInside), "HIVE");
};

export const generateFlower = (position) => {
	return new TypedAgent(new Flower(position), "FLOWER");
};

export const generatePheromon = (position, sourceAngle, type) => {
	return new TypedAgent(new TimedAgent(new Pheromon(position, sourceAngle), 200), type);
};
