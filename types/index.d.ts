export interface ColorPalette {
	[key: string]: string
}

export interface PaletteOptions {
	name?: string
	ui?: boolean
	uiMix?: number
	greyscale?: boolean
	greyscaleMix?: number
	palette?: ColorPalette
}
