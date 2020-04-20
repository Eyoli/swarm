import Interface from '../../core/interface';
import EngineInterface from '../../core/engine/engine-interface';

export default class RoundWorldEngine {
	constructor(width, height) {
		Interface.checkImplements(this, EngineInterface);
		
		this.width = width;
		this.height = height;
	}
	
	run(world) {
		for(var i = 0; i < world.agents.length; i++) {
			var center = world.agents[i].getShape().center;
			if(center.x < 0) {
				center.x = this.width;
			} else if(center.x > this.width) {
				center.x = 0;
			} else if(center.y < 0) {
				center.y = this.height;
			} else if(center.y > this.height) {
				center.y = 0;
			}
		}
	}
}
