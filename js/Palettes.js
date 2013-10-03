
Palette = Proto.clone().newSlots({
	protoType: "Palette",
	colors: []
}).setSlots({
	background: function()
	{
		return new THREE.Color(this.colors()[0])
	},

	foreground: function()
	{
		return new THREE.Color(this.colors()[1])
	},
	
	highlight: function()
	{
		return new THREE.Color(this.colors()[2])
	},	
})

Palettes = Proto.clone().newSlots({
	protoType: "Palettes",
	palettes: [],
	index: 0
}).setSlots({
	
	addPaletteWithColors: function(c)
	{
		this.addPalette(Palette.clone().setColors(c))
		return this
	},
	
	addPalette: function(p)
	{
		this.palettes().push(p)
		return this
	},
	
	next: function()
	{
		this.setIndex((this.index() + 1) % this.palettes().length)
		return this
	},
	
	current: function()
	{
		return this.palettes()[this.index()]
	}
})

// back, fore, high
//Palettes.addPaletteWithColors(["red", "black", "#ffffff"])
Palettes.addPaletteWithColors(["#0c9ae2", "#010b10", "#f3c932"])
Palettes.addPaletteWithColors(["#000000", "#ef0c59", "#5df856"])
