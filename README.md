# tailwind-color-palette

Personalized color palettes for Tailwindcss. Generates the 6 standard light/dark classes for your color, plus optional UI and greyscale colors (based on https://github.com/adevade/color-scheme-generator).

## Install

```bash
npm install --save-dev @ky-is/tailwind-color-palette
```

In your tailwind js configuration file:

```js
const tailwindColorPalette = require('@ky-is/tailwind-color-palette')

const colors = tailwindColorPalette('#e7a', {greyscale: true})

module.exports = {
  colors: colors,
// ...
```

## Options

The first parameter is the `color` to generate the palette from. The second is an optional object with the following options, none of which are required.

- `name` (String, default: 'brand'): The class name prefix for this color (e.g. `text-brand-light` for the default).
- `ui` (Boolean, default: false): Whether to generate UI color classes (`cta`, `info`, `warning`, `success`, `danger`), tinted with `color`.
- `greyscale` (Boolean, default: false): Whether to generate greyscale color classes, tinted with `color`.

### Advanced Options

- `uiMix` (Number, default: 0.2, range: 0-1): The ratio of the `color` parameter to mix into the UI colors.
- `greyscaleMix` (Number, default: 0.01, range: 0-1): The ratio of the `color` parameter to mix into the grey colors.
- `palette` (Object, default: {}): An object of existing color definitions to be added to.

## Examples

Simple all colors:
```js
const colors = tailwindColorPalette('#FFC0CB', {greyscale: true, ui: true})
```

Primary + secondary:
```js
const primaryColors = tailwindColorPalette('#38C172', {name: 'primary', greyscale: true, ui: true})
const secondaryColors = tailwindColorPalette('#3490DC', {name: 'secondary'})
const colors = Object.assign(secondaryColors, primaryColors)
```

No color mixing:
```js
const colors = tailwindColorPalette('#E3342F', {greyscale: true, greyscaleMix: 0, ui: true, uiMix: 0})
```
