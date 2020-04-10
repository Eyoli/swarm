const AgentDecorator = require('./agent-decorator');

class TimedAgent extends AgentDecorator {
	constructor(agent, expirationTime) {
		super(agent);
		
		this.expirationTime = expirationTime;
		this.time = 0;
	}
	
	act(world) {
		this.agent.act(world);
		
		if(this.time > this.expirationTime) {
			this.agent.destroyed = true;
		}
		
		this.time++;
	}
}

module.exports = TimedAgent;
