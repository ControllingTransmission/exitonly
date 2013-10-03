
Groups = Proto.clone().newSlots({
	protoType: "Groups",
	groups: [],
}).setSlots({
	
	add: function(g)
	{
		this.groups().push(g)
	}
})

SquaresGroup = Group.clone().newSlots({
	protoType: "SquaresGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("add sq")
	},
	
	addSquares: function()
	{
		var max = this._max
		for (var x = -max; x < max; x ++)
		{
			if (Math.random() < .6)
			{
				var s = Square.clone()
				s._object.scale.x = .1
				s._object.scale.y = 1
				s._object.position.x = .2*x
				s._object.position.y = 1
				s.setGroupX(x).setGroupY(0)
				s.setMover("x", XInterleveMover.clone())
				//s.setMover("r", RandXMover.clone())
				this.addItem(s)
			}
		}
	}
})

Groups.add(SquaresGroup) // for 0 key
Groups.add(SquaresGroup)

// -----------------------------------------------------

ThinSquaresGroup = Group.clone().newSlots({
	protoType: "ThinSquaresGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
	},
	
	addSquares: function()
	{
		var max = 1 //Math.randomInt(1,1)
		for (var x = 0; x < max; x ++)
		{
				var s = Square.clone()
				s._object.scale.x = .005
				s._object.scale.y = 1
				s._object.position.x = Math.random()
				s._object.position.y = 0
				s.setGroupX(x).setGroupY(0)
				s.setMover("r", RandXMover.clone())
				this.addItem(s)
		}
	},
	
})

Groups.add(ThinSquaresGroup)


// -----------------------------------------------------

MegaMiddleGroup = Group.clone().newSlots({
	protoType: "MegaMiddleGroup",
	items: null,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
	},
	
	addSquares: function()
	{
		var s = Square.clone()
		s._object.scale.x = 0
		s._object.scale.y = 1
		s._object.position.z = -1*Math.random()
		s._object.position.x = 0
		s._object.position.y = 0
		s.setGroupX(0).setGroupY(0)
		s.setColor(Palettes.current().foreground2())
		this.addItem(s)
	},
	
	update: function()
	{
		if (this._t > 30)
		{
			this.items()[0].object().position.x += .01
		}
		this.items()[0].object().scale.x += .01
		this._t ++ 
	}
	
})

Groups.add(MegaMiddleGroup)

// -----------------------------------------------------

// -----------------------------------------------------

MegaGroup = Group.clone().newSlots({
	protoType: "MegaGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
	},
	
	addSquares: function()
	{
		var s = Square.clone()
		s._object.scale.x = 1
		s._object.scale.y = 1
		s._object.position.z = -1
		s._object.position.x = 0
		s._object.position.y = 0
		s.setGroupX(0).setGroupY(0)
		s.setColor(Palettes.current().foreground2())
		var m = XMover.clone()
		
		if (Math.random() < .5)
		{
			m.setSpeed(m.speed()*-1)
		}
		s.setMover("_1", m)
		this.addItem(s)
	},
	
})

Groups.add(MegaGroup)


// -----------------------------------------------------

MoveOverGroup = Group.clone().newSlots({
	protoType: "MoveOverGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("both")
	},
	
	addSquares: function()
	{
		var max = 10 //Math.randomInt(1,1)
		
		for (var x = 0; x < max; x ++)
		{
			var s = Square.clone()
			s._object.scale.x = .1*Math.random()
			s._object.position.x = -.51
			s._object.position.z = Math.random()*.1
			s.setGroupX(x).setGroupY(0)
			var m = XMover.clone()
			m.setSpeed(m.speed() + m.speed()*Math.random())
			s.setMover("r", m)
			this.addItem(s)
		}
	},
	
})

Groups.add(MoveOverGroup)

// -----------------------------------------------------

MoveOverLeftGroup = Group.clone().newSlots({
	protoType: "MoveOverGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("both")
	},
	
	addSquares: function()
	{
		var max = Math.randomInt(2,50)
		
		for (var x = 0; x < max; x ++)
		{
			var s = Square.clone()
			s._object.scale.x = .1*Math.random()
			s._object.position.x = .51
			s._object.position.z = Math.random()*.1
			s.setGroupX(x).setGroupY(0)
			//s.setColor(new THREE.Color().setRGB(.1, .1, .1))
			s.setOpacity(.1) //Math.random())
			var m = XMover.clone()
			m.setSpeed(-(m.speed() + m.speed()*Math.random()))
			s.setMover("r", m)
			this.addItem(s)
		}
	},
	
})

Groups.add(MoveOverLeftGroup)


// -----------------------------------------------------

SpreadGroup = Group.clone().newSlots({
	protoType: "SpreadGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("both")
	},
	
	addSquares: function()
	{
		var max = Math.randomInt(2,50)
		
		for (var x = 0; x < max; x ++)
		{
			var s = Square.clone()
			s._object.scale.x = .1*Math.random()
			s._object.position.x = 0
			s._object.position.z = Math.random()*.1
			s.setGroupX(x).setGroupY(0)
			//s.setColor(new THREE.Color().setRGB(.1, .1, .1))
			s.setOpacity(.1) //Math.random())
			var m = XMover.clone()
		
			m.setSpeed(2*m.speed()*(Math.random()-.5))
			s.setMover("r", m)
			this.addItem(s)
		}
	},
	
})

Groups.add(SpreadGroup)

// -----------------------------------------------------

ScatterGroup = Group.clone().newSlots({
	protoType: "ScatterGroup",
	items: null,
	spacing: 500,
	itemXScale: 1,
	itemYScale: 1,
	max: 5,
	orientation: "x"
}).setSlots({
	init: function()
	{
		Group.init.apply(this)
		this.addSquares()
		console.log("both")
	},
	
	addSquares: function()
	{
		var max = Math.randomInt(2,50)
		
		for (var x = 0; x < max; x ++)
		{
			var s = Square.clone()
			var r = Math.random()*.2
			s._object.scale.x = .1*r
			s._object.scale.y = 10
			s._object.position.x = Math.random() - .5
			s._object.position.y = Math.random() - .5
			s._object.position.z = -100
			s.setGroupX(x).setGroupY(0)
		//	s.setColor(Palettes.current().highlight())
			s.setColor(new THREE.Color("#222222"))
			//s.setOpacity(.1)
			//s.setMover("r", HighlightJitterColorMover.clone())
			this.addItem(s)
		}
	},
	
})

Groups.add(ScatterGroup)


