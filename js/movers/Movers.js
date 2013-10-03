
Movers = Mover.clone().newSlots({
	protoType: "Movers",
	movers: []
}).setSlots({
	add: function(m)
	{
		this.movers().append(m)
	}
})	

// -----------------------------------------------------

ScaleMover = Mover.clone().newSlots({
	protoType: "ScaleMover",
}).setSlots({
	init: function()
	{
		Mover.init.apply(this)
	},

	prepareToStart: function()
	{
		Mover.prepareToStart.apply(this)
		//this._t = Math.random()*100
	},
		
	prepareToStop: function()
	{
		//this.object().scale = this.originalScale()
	},

	update: function() 
	{	
		//Mover.update.apply(this)
		var v = Math.sin(this.t()/100)
		v = v*this.originalScale()[this.orientation()] + this.originalScale()[this.orientation()]
		this.object().scale[this.orientation()] = v
		//console.log(v)
		this._t ++
	}
})

Movers.add(ScaleMover)

// -----------------------------------------------------


RScaleMover = Mover.clone().newSlots({
	protoType: "RScaleMover",
}).setSlots({
	init: function()
	{
		Mover.init.apply(this)
	},
	
	prepareToStop: function()
	{
		this.object().scale = this.originalScale()
	},

	update: function() 
	{	
		Mover.update.apply(this)
		
		this.object().scale[this.orientation()] = Math.random()
	}
})

Movers.add(RScaleMover)

// -----------------------------------------------------

WhiteJitterColorMover = Mover.clone().newSlots({
	protoType: "WhiteJitterColorMover",
}).setSlots({
	prepareToStop: function()
	{
		//this.revertColor()
		this.setColor(new THREE.Color().setRGB(0, 0, 0))
	},

	update: function() 
	{	
		Mover.update.apply(this)
		var c = Math.random()
		if (Math.random() < .07)
		{
			this.setColor(new THREE.Color().setRGB(2, 2, 2))
		}
		else
		{
			this.setColor(this.originalMaterial().color)
		}
		//this._t ++	
	}
})

Movers.add(WhiteJitterColorMover)


/*
BlueJitterColorMover = Mover.clone().newSlots({
	protoType: "ColorMover",
}).setSlots({
	prepareToStart: function()
	{
		var mat = this.object().material
		if (mat == null) { return }
		this._originalColor = mat.color
	},
	
	prepareToStop: function()
	{
		var mat = this.object().material
		if (mat == null) { return }
		mat.color = this._originalColor
	},
	
	update: function() 
	{	
		Mover.update.apply(this)
		var mat = this.object().material
		if (mat == null) { return }
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(0, 0, c)
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(BlueJitterColorMover)
*/




// ------------------------------------------------------------------

XInterleveMover = Mover.clone().newSlots({
	protoType: "XInterleveMover",
	speed: .001,
}).setSlots({
	init: function()
	{
		this.setSpeed(.001 + .001*Math.random())
	},
	
	prepareToStop: function()
	{
		this.position().y = 0
	},
	
	update: function() 
	{	
		var direction = this.thing().groupX() % 2 == 0 ? 1 : -1
		//console.log("this.thing().groupX() " + this.thing().groupX())
		this.position().y += direction * this.speed()
		if (this.position().y > 1)
		{
			this.position().y = -1
		}
		
		if (this.position().y < -1)
		{
			this.position().y = 1
		}
		this._t ++	
		this.wrapBounds()
	}
})

//Movers.add(XInterleveMover)

XMover = Mover.clone().newSlots({
	protoType: "YInterleveMover",
	speed: .001,
}).setSlots({
	prepareToStop: function()
	{
		this.position().x = 0
	},
	
	update: function() 
	{	
		var direction = this.thing().groupY() % 2 == 0 ? 1 : -1
		this.position().x += direction * this.speed()
		this._t ++	
		this.wrapBounds()
	}
})

//Movers.add(XMover)


RandXMover = Mover.clone().newSlots({
	protoType: "RandXMover",
}).setSlots({
	prepareToStop: function()
	{
		this.position().x = this._originalPosition.x
	},
	
	update: function() 
	{	
		//var direction = this.thing().groupY() % 2 == 0 ? 1 : -1
		this.position().x = (Math.random() - .5)*2
		this._t ++	
		this.wrapBounds()
	}
})

Movers.add(RandXMover)


// ------------------------------------------------------------------

// ------------------------------------------------------------------

RandAlphaMover = Mover.clone().newSlots({
	protoType: "RandAlphaMover",
}).setSlots({
	
	prepareToStop: function()
	{
		var mat = this.object().material
		mat.opacity = this.originalMaterial().opacity
		mat.needsUpdate = true
	},
	
	update: function() 
	{	
		//var direction = this.thing().groupY() % 2 == 0 ? 1 : -1
		var mat = this.object().material
		mat.opacity = Math.random()
		mat.needsUpdate = true
		this._t ++	
	}
})

Movers.add(RandAlphaMover)

// ------------------------------------------------------------------


FadeOutMover = Mover.clone().newSlots({
	protoType: "FadeOutMover",
}).setSlots({
	
	prepareToStop: function()
	{
		this.revertOpacity()
	},
	
	update: function() 
	{	
		var v = 40/(40+this.t()*this.t())
		this.setOpacity(v)
		if (v < .0001)
		{
			this.thing().group().removeSelf()
		}
		this._t ++	
	}
})

Movers.add(FadeOutMover)

/*

Movers.add(PulseAlphaMover)

JitterMover = Mover.clone().newSlots({
	protoType: "JitterMover",
	amplitude: 3
}).setSlots({
	
	update: function() 
	{	
		if (this._t < 10)
		{
			this.position().x = this.thing().groupPos().x + (Math.random() - .5) * this.amplitude()
			this.position().y = this.thing().groupPos().y + (Math.random() - .5) * this.amplitude()
			this.position().z = this.thing().groupPos().y + (Math.random() - .5) * this.amplitude()
		}
		this._t ++	
	}
})

Movers.add(JitterMover)
*/

// ------------------------------------------------------------------

/*
XRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	update: function(dt) 
	{	
		this.object().rotation.x += dt/this.period()
		this._t ++	
	}
})

Movers.add(XRotateMover)


YRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	update: function(dt) 
	{	
		this.object().rotation.y += dt/this.period()
		this._t ++	
	}
})

Movers.add(YRotateMover)

ZRotateMover = Mover.clone().newSlots({
	protoType: "XRotateMover",
	period: 100
}).setSlots({
	prepareToStop: function()
	{
		var r = this.object().rotation.z
		var d = (360*r/Math.PI*2) % 360
		console.log("d " + d)
		d = Math.ceil(d/45)*45
		console.log("d2 " + d)
		r = d *Math.PI*2/360
		
		this.object().rotation.z = r;
		return this
	},

	update: function(dt) 
	{	
		this.object().rotation.z += .01
		this._t ++	
	}
})

Movers.add(ZRotateMover)

// ------------------------------------------------------------------

WaveMover = Mover.clone().newSlots({
	protoType: "WaveMover",
	amplitude: 200,
	period: 100
}).setSlots({
	update: function() 
	{	
		var x = this.position().x
		var y = this.position().y
		var r = Math.sqrt(x*x + y*y)
		var tt = r + Math.PI*this._t/this._period
		this.position().z = Math.sin(tt) * this._amplitude
		this._t ++	
	}
})

Movers.add(WaveMover)

// ------------------------------------------------------------------

ZoomOutMover = Mover.clone().newSlots({
	protoType: "ZoomOutMover",
	dz: 1
}).setSlots({
	update: function(dt) 
	{	
		this.position().z += this.dz()*10
		this.wrapBounds()
	}
})


Movers.add(ZoomOutMover)
Movers.add(ZoomOutMover.clone().setDz(-1))

// ------------------------------------------------------------------



XScaleMover = Mover.clone().newSlots({
	protoType: "XScaleMover",
	dz: .001
}).setSlots({
	update: function(dt) 
	{	
		this.object().scale.x += this.dz()*10
		
		if (this.object().scale.x > 2 || this.object().scale.x < .01)
		{
			this.setDz(-this.dz())
		}
		this.wrapBounds()
	}
})

Movers.add(XScaleMover)

YScaleMover = Mover.clone().newSlots({
	protoType: "YScaleMover",
	dz: .001
}).setSlots({
	update: function(dt) 
	{	
		this.object().scale.y += this.dz()*10
		
		if (this.object().scale.y > 1.5 || this.object().scale.y < .01)
		{
			this.setDz(-this.dz())
		}
		this.wrapBounds()
	}
})

Movers.add(YScaleMover)


// ------------------------------------------------------------------

	
WhiteJitterColorMover = Mover.clone().newSlots({
	protoType: "WhiteJitterColorMover",
}).setSlots({
	init: function()
	{
		Mover.init.apply(this)
	},
	
	object: function()
	{
		return this._thing._object
	},
	
	update: function() 
	{	
		Mover.update.apply(this)
		var mat = this.object().material
		if (mat == null) { return }
		var c = Math.random()
		mat.color = new THREE.Color().setRGB(c, c, c)
		mat.needsUpdate = true
		//this._t ++	
	}
})

Movers.add(WhiteJitterColorMover)
*/
