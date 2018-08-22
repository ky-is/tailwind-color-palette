const chroma = require('chroma-js')

module.exports = (color, options = {}) => {
	if (!color || typeof color !== 'string') {
		throw new Error('Please provide a valid "color" string parameter')
	}
	const colorChroma = chroma(color)
	const { name = 'brand', ui = false, uiMix = 0.2, greyscale = false, greyscaleMix = 0.01, palette = {} } = options

	function mix (baseColor, amount) {
		return chroma.mix(baseColor, colorChroma, amount, 'lab').hex()
	}

	function addToPalette (name, value) {
		if (!palette[name]) {
			palette[name] = value
		}
	}

	function addScaleToPalette (name, baseColor, suffixes, padding) {
		const colorScale = chroma.scale([ 'black', baseColor, 'white' ]).padding(padding).colors(suffixes.length)
		suffixes.forEach((suffix, index) => addToPalette(`${name}${suffix}`, colorScale[index]))
	}

	// Primary color scale
	const colorScale = [ '-darkest', '-darker', '-dark', '', '-light', '-lighter', '-lightest' ]
	const colorInset = 0.125
	addScaleToPalette(name, colorChroma, colorScale, colorInset)

	// UI Colors https://github.com/adevade/color-scheme-generator
	if (ui) {
		const uiScale = [ '-dark', '', '-light' ]
		const uiLightDarkInset = 0.25
		addScaleToPalette('cta',     colorChroma.set('hsl.h', '+150'), uiScale, uiLightDarkInset)
		addScaleToPalette('info',    mix('#3df', uiMix),               uiScale, uiLightDarkInset)
		addScaleToPalette('warning', mix('#fd0', uiMix),               uiScale, uiLightDarkInset)
		addScaleToPalette('success', mix('#3e4', uiMix),               uiScale, uiLightDarkInset)
		addScaleToPalette('danger',  mix('#f34', uiMix),               uiScale, uiLightDarkInset)
	}

	// Greyscale
	if (greyscale) {
		addToPalette('black',         mix('#292929', greyscaleMix))
		addToPalette('grey-darkest',  mix('#484848', greyscaleMix))
		addToPalette('grey-darker',   mix('#6f6f6f', greyscaleMix))
		addToPalette('grey-dark',     mix('#959595', greyscaleMix))
		addToPalette('grey',          mix('#c2c2c2', greyscaleMix))
		addToPalette('grey-light',    mix('#e1e1e1', greyscaleMix))
		addToPalette('grey-lighter',  mix('#f5f5f5', greyscaleMix))
		addToPalette('grey-lightest', mix('#fafafa', greyscaleMix))
		addToPalette('white',         '#ffffff')
		addToPalette('transparent',   'transparent')
	}

	return palette
}
