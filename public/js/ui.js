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

class SelectionHandler {
	constructor(canvas, callback) {
		this.callback = callback;
		this.rect = {};
		
		canvas.addEventListener("click", this.attachLeftClick(), false);
		canvas.addEventListener("mousedown", this.attachMouseDown(), false);
		canvas.addEventListener("mousemove", this.attachMouseMove(), false);
		canvas.addEventListener("mouseleave", this.attachMouseLeave(), false);
	}
	
	clear() {
		this.rect.x = null;
		this.rect.y = null;
		this.rect.width = null;
		this.rect.height = null;
	}
	
	attachLeftClick() {
		const context = this;
		return e => {
			if(context.rect.x) {
				context.callback(context.rect);
				context.clear();
			} else {
				const pos = getCanvasMousePosition(e);
				context.callback(pos);
			}
		};
	}
	
	attachMouseDown() {
		const context = this;
		return e => {
			if(e.button === 0) {
				const pos = getCanvasMousePosition(e);
				context.rect.x = pos.x;
				context.rect.y = pos.y;
			}
		};
	}
	
	attachMouseMove() {
		const context = this;
		return e => {
			if(context.rect.x) {
				const pos = getCanvasMousePosition(e);
				context.rect.width = pos.x - context.rect.x;
				context.rect.height = pos.y - context.rect.y;
			}
		};
	}
	
	attachMouseLeave() {
		const context = this;
		return e => {
			context.clear();
		}
	}
}