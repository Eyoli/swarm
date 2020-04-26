import Interface from '../../core/interface';
import EngineInterface from '../../core/model/engine/engine-interface';

export default class RoundWorldEngine {
	constructor(width, height) {
		Interface.checkImplements(this, EngineInterface);
		
		this.width = width;
		this.height = height;
	}
	
	run(world) {
		world.agents().forEach(agent => {
			var center = agent.getShape().center;
			if(center.x < 0) {
				center.x = this.width;
			} else if(center.x > this.width) {
				center.x = 0;
			} else if(center.y < 0) {
				center.y = this.height;
			} else if(center.y > this.height) {
				center.y = 0;
			}
		});
	}
}
