import tailwindColorPalette from '../dist'

describe('parameters', () => {
	it('requires a valid color', () => {
		// @ts-ignore
		expect(() => tailwindColorPalette()).toThrow('"color"')
		// @ts-ignore
		expect(() => tailwindColorPalette(1)).toThrow('"color"')
		expect(() => tailwindColorPalette('')).toThrow('"color"')
		expect(() => tailwindColorPalette('1')).toThrow('unknown format:')
		expect(() => tailwindColorPalette('reed')).toThrow('unknown hex')
	})
	it('does not require options', () => {
		expect(() => tailwindColorPalette('#000')).not.toThrow()
	})
})

describe('default', () => {
	it('generates an object of one color scale', () => {
		const colors = tailwindColorPalette('red')
		expect(colors).toHaveProperty('brand')
		expect(colors.brand).toHaveProperty('900')
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
		expect(colors['info']['500']).toEqual('#a0c1cc')
		expect(colors).not.toHaveProperty('black')
	})
	it('uiMix', () => {
		const colors = tailwindColorPalette('red', { ui: true, uiMix: 0.5 })
		expect(colors['info']['500']).toEqual('#da9383')
	})
	it('grayscale', () => {
		const colors = tailwindColorPalette('red', { grayscale: true })
		expect(colors['gray']['500']).toEqual('#b2aaa8')
		expect(colors).not.toHaveProperty('cta')
	})
	it('grayscaleMix', () => {
		const colors = tailwindColorPalette('red', { grayscale: true, grayscaleMix: 0.5 })
		expect(colors['gray']['500']).toEqual('#e4775c')
	})
	it('palette', () => {
		const colors = tailwindColorPalette('red', { palette: { custom: '#123' } })
		expect(colors).toHaveProperty('custom')
	})
	it('colorScale', () => {
		const colors = tailwindColorPalette('red', { colorscale: ["lighter", "light", "medium", "dark", "darker"] })
		expect(colors['brand']['lighter']).toEqual('#ffcccc')
		expect(colors['brand']['light']).toEqual('#ff6666')
	})
	it('colorScaleNumeric', () => {
		const colors = tailwindColorPalette('red', { colorscale: [1,2,3,4,5] })
		expect(colors['brand']['1']).toEqual('#ffcccc')
		expect(colors['brand']['2']).toEqual('#ff6666')
	})
	it('colorScaleUiGray', () => {
		const colors = tailwindColorPalette('blue', { colorscale: ["light", "medium", "dark"], grayscale: true, ui: true })
		expect(colors['brand']['light']).toEqual('#ccccff')
		expect(colors['gray']['medium']).toEqual('#aca9b0')
		expect(colors['danger']['dark']).toEqual('#2f0615')
	})
})
