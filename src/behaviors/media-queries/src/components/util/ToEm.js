//@flow
import { stripUnit } from './StripUnit';

/**
 * Converts a unitless, pixel, or rem value to em, for use in breakpoints.
 *
 * @param {number | string} value
 *
 * @return {string}
 */
export const toEm = (value: number | string): string => {
  const regex = /px+$/gs;

  if ((typeof value === 'string' && regex.exec(value) !== null) || isNaN(value) !== true) {
    return `${ stripUnit(value) / 16 }em`
  }

  return `${ stripUnit(value) }em`;
};
