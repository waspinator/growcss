//@flow
const stripUnits = require('strip-units');

const regex = /[^\d.-]+/g;

/**
 * Converts a pixel value to matching rem value. *Any* value passed, regardless of unit, is assumed to be a pixel value.
 * By default, the base pixel value used to calculate the rem value is taken from the `base` variable.
 *
 * @param {number | string} value
 * @param {number}          base
 *
 * @return {string} A number in rems, calculated based on the given value and the base pixel value. rem values are passed through as is.
 */
const toRem = (value: string | number, base: number): string => {
  let rem = '';

  if (typeof value === 'string') {
    const output = value.match(regex);

    if (Array.isArray(output)) {
      if (output.shift() === 'em') {
        rem = stripUnits(value) + 'rem';
      } else if (output.shift() !== 'rem') {
        rem = (stripUnits(value) / base) + 'rem';
      }
    }
  } else {
    rem = (stripUnits(value) / base) + 'rem';
  }

  if (rem === '0rem') {
    rem = '0';
  }

  return rem;
};

/**
 *
 * @param {string | number | Array<string | number>} values
 * @param {number | string}                          base
 *
 * @return {string}
 */
export default (
  values: string | number | Array<string | number>,
  base: number | string = 16
) => {
  let baseRem: number;

  if (typeof base === 'string') {
    // If the base font size is a %, then multiply it by 16px
    // This is because 100% font size = 16px in most all browsers
    if (base.match(regex) === '%') {
      baseRem = ((stripUnits(base) / 100) * 16)
    } else if (base.match(regex) === 'rem') { // Using rem as base allows correct scaling
      baseRem = stripUnits(base) * 16
    } else {
      baseRem = stripUnits(base);
    }
  } else {
    baseRem = stripUnits(base);
  }

  if (typeof values === 'string' || typeof values === 'number') {
    return toRem(values, baseRem);
  }

  const remValues = [];

  values.forEach(function (value) {
    remValues.push(toRem(value, baseRem));
  });

  return remValues.join(' ')
}