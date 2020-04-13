import Interface from '../core/interface';
import BehaviorInterface from '../core/behavior/behavior-interface';

export default class SpawnBehavior {
	constructor(spawnFn, max) {
		Interface.checkImplements(this, BehaviorInterface);
		
		this.max = max;
		this.spawned = [];
		this.spawnFn = spawnFn;
	}
	
	apply(agent, world) {
		this.spawned = this.spawned.filter(a => !a.isDestroyed());
		
		if(this.spawned.length < this.max) {
			var spawnedAgent = this.spawnFn(agent);
			if(world.addAgent(spawnedAgent)) {
				this.spawned.push(spawnedAgent);
			}
		}
	}
}
