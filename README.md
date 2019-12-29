# tailwind-color-palette

Personalized color palettes for Tailwindcss. Generates the nine `100`–`900` classes for your color, plus optional UI and grayscale colors (based on https://github.com/adevade/color-scheme-generator).

For Tailwind 1.0:
```bash
npm install --save-dev @ky-is/tailwind-color-palette
```

For Tailwind 0.x, see the [0.x branch](https://github.com/ky-is/tailwind-color-palette/tree/tailwind-0.x).

## Configuration

In `tailwind.config.js`:

```js
module.exports = {
  theme: {
    colors: require('@ky-is/tailwind-color-palette')('#e7a', {grayscale: true, ui: true}),
// ...
```

This generates the following colors, tinted by the provided color:
- Brand: `brand-(100–900)`
- Grayscale: `gray-(100–900)`
- UI: `cta-(100–900)`, `info-(100–900)`, `warning-(100–900)`, `success-(100–900)`, `danger-(100–900)`

## Options

The first parameter is the `color` to generate the palette from. The second is an optional object with:

- `name` (string, default: `'brand'`): The class name prefix for this color (e.g. `text-brand-light` for the default).
- `ui` (boolean, default: `false`): Whether to generate UI color classes (`cta`, `info`, `warning`, `success`, `danger`), tinted with `color`.
- `grayscale` (boolean, default: `false`): Whether to generate grayscale color classes, tinted with `color`.
- `colorscale` (Array<string | number>, default: `[100, 200, 300, 400, 500, 600, 700, 800, 900]`): The suffixes for your color names.

### Advanced Options

- `uiMix` (number, default: `0.2`, range: 0–1): The proportion of the `color` parameter to mix into the UI colors.
- `grayscaleMix` (number, default: `0.03`, range: 0–1): The proportion of the `color` parameter to mix into the gray colors.
- `palette` ({[key: string]: string | ColorRange}, default: `{}`): An object of existing color definitions to be appended to.

## Examples

Simple all colors:
```js
const colors = tailwindColorPalette('#FFC0CB', {grayscale: true, ui: true})
```

Primary + secondary:
```js
const primaryColors = tailwindColorPalette('#38C172', {name: 'primary', grayscale: true, ui: true})
const secondaryColors = tailwindColorPalette('#3490DC', {name: 'secondary'})
const colors = Object.assign(secondaryColors, primaryColors)
```

No color mixing:
```js
const colors = tailwindColorPalette('#E3342F', {grayscale: true, grayscaleMix: 0, ui: true, uiMix: 0})
```
