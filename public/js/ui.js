"use strict";

class GameUI {
	constructor() {
		this.layouts = {};
	}
	
	layout(name) {
		if(!this.layouts[name]) {
			this.layouts[name] = new UIVerticalLayout(this);
		}
		
		return this.layouts[name];
	}
	
	draw(ctx) {
		for(name in this.layouts) {
			this.layouts[name].draw(ctx);
		}
	}
}

class UIVerticalLayout {
	constructor(ui) {
		this.properties = {};
		this.ui = ui;
		this.x = 0;
		this.y = 0;
	}
	
	at(x) {
		this.x = x;
		return this;
	}
	
	property(name) {
		if(!this.properties[name]) {
			this.properties[name] = new UIProperty(this);
		}
		
		return this.properties[name];
	}
	
	up() {
		return this.ui;
	}
	
	preDraw(fn) {
		this.preDrawFn = fn;
		return this;
	}
	
	draw(ctx) {
		if(this.preDrawFn) {
			this.preDrawFn(ctx);
		}
		for(name in this.properties) {
			this.properties[name].draw(ctx);
		}
	}
}

class UIProperty {
	constructor(layout) {
		this.layout = layout;
		this.x = 0;
		this.y = 0;
	}
	
	withLabel(label) {
		this.label = label;
		return this;
	}
	
	withValue(value) {
		this.value = value;
		return this;
	}
	
	at(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	
	up() {
		return this.layout;
	}
	
	draw(ctx) {
		ctx.fillText(
			this.label + ' : ' + this.value, 
			this.layout.x + this.x, 
			this.layout.y + this.y);
	}
}