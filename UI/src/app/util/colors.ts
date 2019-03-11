// taken from https://stackoverflow.com/questions/17525215/calculate-color-values-from-green-to-red
export function percentageToRgb(percentage, hue0, hue1): number[] {
  const hue = (percentage * (hue1 - hue0)) + hue0;
  const saturation = 1; // 100%
  const lightness = 0.5; // 50%

  return hslToRgb(hue, saturation, lightness);
}

/**
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export function hslToRgb(h: number, s: number, l: number): number[] {
  let r, g, b;

  if (s === 0) {
      r = g = b = l; // achromatic
  } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

function hueToRgb(p: number, q: number, t: number): number {
  if (t < 0) { t += 1; }
  if (t > 1) { t -= 1; }
  if (t < 1 / 6) { return p + (q - p) * 6 * t; }
  if (t < 1 / 2) { return q; }
  if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6; }
  return p;
}
