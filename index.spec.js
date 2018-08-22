const tailwindColorPalette = require('./index.js')

const { describe, expect, it } = global //TODO https://github.com/facebook/jest/issues/4473

describe('parameters', () => {
	it('requires a valid color', () => {
		expect(() => tailwindColorPalette()).toThrow('"color"')
		expect(() => tailwindColorPalette(1)).toThrow('"color"')
		expect(() => tailwindColorPalette('')).toThrow('"color"')
		expect(() => tailwindColorPalette('1')).toThrow('unknown color')
		expect(() => tailwindColorPalette('reed')).toThrow('unknown color')
	})
	it('does not require options', () => {
		expect(() => tailwindColorPalette('#000')).not.toThrow()
	})
})

describe('default', () => {
	it('generates an object of one color scale', () => {
		const colors = tailwindColorPalette('red')
		expect(colors).toHaveProperty('brand-lightest')
		expect(colors).toHaveProperty('brand-darkest')
		expect(colors).not.toHaveProperty('cta')
		expect(colors).not.toHaveProperty('black')
	})
})

describe('options', () => {
	it('name', () => {
		const colors = tailwindColorPalette('red', { name: 'rd' })
		expect(colors).toHaveProperty('rd')
		expect(colors).not.toHaveProperty('brand')
	})
	it('ui', () => {
		const colors = tailwindColorPalette('red', { ui: true })
		expect(colors.info).toEqual('#a0c1cc')
		expect(colors).not.toHaveProperty('black')
	})
	it('uiMix', () => {
		const colors = tailwindColorPalette('red', { ui: true, uiMix: 0.5 })
		expect(colors.info).toEqual('#da9383')
	})
	it('greyscale', () => {
		const colors = tailwindColorPalette('red', { greyscale: true })
		expect(colors.grey).toEqual('#c3c1c0')
		expect(colors).not.toHaveProperty('cta')
	})
	it('greyscaleMix', () => {
		const colors = tailwindColorPalette('red', { greyscale: true, greyscaleMix: 0.5 })
		expect(colors.grey).toEqual('#f08166')
	})
	it('palette', () => {
		const colors = tailwindColorPalette('red', { palette: { custom: '#123' } })
		expect(colors).toHaveProperty('custom')
	})
})
