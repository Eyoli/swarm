import AgentDecorator from './agent-decorator';

export default class TimedAgent extends AgentDecorator {
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
