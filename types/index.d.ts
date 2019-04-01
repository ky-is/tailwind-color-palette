export interface ColorPalette {
	[key: string]: string | ColorRange
}

export interface PaletteOptions {
	name?: string
	ui?: boolean
	uiMix?: number
	grayscale?: boolean
	grayscaleMix?: number
	palette?: ColorPalette
}

export interface ColorRange {
	[key: number]: string
}
