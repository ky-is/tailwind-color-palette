import chroma, { Color } from 'chroma-js'

import { ColorRange, PaletteOptions } from '../types'

export = function (color: string, options: PaletteOptions = {}) {
	if (!color || typeof color !== 'string') {
		throw new Error('Please provide a valid "color" string parameter')
	}
	const colorChroma = chroma(color)
	const { name = 'brand', ui = false, uiMix = 0.2, grayscale = false, grayscaleMix = 0.03, palette = {} } = options

	function mix (baseColor: Color | string, amount: number): string {
		return chroma.mix(baseColor, colorChroma, amount, 'lab').hex()
	}

	function addToPalette (name: string, value: string | ColorRange) {
		if (!palette[name]) {
			palette[name] = value
		}
	}

	function scalePalette (baseColor: Color | string, suffixes: number[], padding: number = 0.1): ColorRange {
		const colorScale = chroma.scale([ 'white', baseColor, 'black' ]).padding(padding).colors(suffixes.length)
		const colorRange: ColorRange = {}
		suffixes.forEach((suffix, index) => colorRange[suffix] = colorScale[index])
		return colorRange
	}

	// Brand color scale
	const colorScale = [ 100, 200, 300, 400, 500, 600, 700, 800, 900 ]
	addToPalette(name, scalePalette(colorChroma, colorScale))

	// UI Colors https://github.com/adevade/color-scheme-generator
	if (ui) {
		addToPalette('cta',     scalePalette(colorChroma.set('hsl.h', '+150'), colorScale))
		addToPalette('info',    scalePalette(mix('#3df', uiMix), colorScale))
		addToPalette('warning', scalePalette(mix('#fd0', uiMix), colorScale))
		addToPalette('success', scalePalette(mix('#3e4', uiMix), colorScale))
		addToPalette('danger',  scalePalette(mix('#f34', uiMix), colorScale))
	}

	// Grayscale
	if (grayscale) {
		addToPalette('white', '#fff')
		addToPalette('black', mix('#000', grayscaleMix))
		addToPalette('transparent', 'transparent')
		addToPalette('gray', {
			100: mix('#fafafa', grayscaleMix),
			200: mix('#f2f2f2', grayscaleMix),
			300: mix('#e8e8e8', grayscaleMix),
			400: mix('#d5d5d5', grayscaleMix),
			500: mix('#aeaeae', grayscaleMix),
			600: mix('#808080', grayscaleMix),
			700: mix('#555555', grayscaleMix),
			800: mix('#373737', grayscaleMix),
			900: mix('#202020', grayscaleMix),
		})
	}

	return palette
}
