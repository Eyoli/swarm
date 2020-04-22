import Behavior from '../../core/model/behavior/behavior';

export default class GeneratorBehavior extends Behavior {
	constructor(max) {
		super();
		
		if (this.constructor === GeneratorBehavior) {
			throw new TypeError('Abstract class cannot be instantiated directly');
		}
		
		this.max = max;
		this.generatedAgents = [];
	}
	
	apply(agent, world) {
		this.generatedAgents = this.generatedAgents.filter(a => !a.isDestroyed());
		
		if(this.max) {
			if(this.generatedAgents.length < this.max) {
				var generatedAgent = this.generate(agent, world);
				if(generatedAgent) {
					this.generatedAgents.push(generatedAgent);
				}
			}
		} else {
			this.generate(agent, world);
		}
	}
	
	generate(agent, world) {
		throw new Error('You must implement this function');
	}
}
