/**
 * Helper functions for testing domain calculations against expected results
 */

import { parseGameFormattedNumber, isFormattedNumber } from './number-helpers';

export const expectCalculationToMatch = (
  actual: number,
  expected: number | string,
  tolerance: number = 0.05,
  description?: string
) => {
  const expectedNumber = parseGameFormattedNumber(expected);
  const difference = Math.abs(actual - expectedNumber) / Math.max(Math.abs(expectedNumber), 1);
  const passed = difference <= tolerance;
  
  if (!passed) {
    const desc = description ? ` for ${description}` : '';
    const formattedType = isFormattedNumber(expected) ? ' (formatted)' : '';
    throw new Error(
      `Calculation mismatch${desc}: expected ${expected}${formattedType} (${expectedNumber}), got ${actual} (${(difference * 100).toFixed(2)}% difference, tolerance: ${tolerance * 100}%)`
    );
  }
};

export const expectCalculationInRange = (
  actual: number,
  min: number,
  max: number,
  description?: string
) => {
  if (actual < min || actual > max) {
    const desc = description ? ` for ${description}` : '';
    throw new Error(`Value${desc} ${actual} outside expected range [${min}, ${max}]`);
  }
};

export const expectArrayCalculationsToMatch = (
  actualArray: number[],
  expectedArray: number[],
  tolerance: number = 0.05,
  description?: string
) => {
  expect(actualArray.length).toBe(expectedArray.length);
  
  actualArray.forEach((actual, index) => {
    expectCalculationToMatch(
      actual,
      expectedArray[index],
      tolerance,
      `${description} [${index}]`
    );
  });
};

export const expectCalculationNotNull = (
  actual: number | null | undefined,
  description?: string
) => {
  if (actual === null || actual === undefined || isNaN(actual)) {
    const desc = description ? ` for ${description}` : '';
    throw new Error(`Calculation result${desc} is null, undefined, or NaN: ${actual}`);
  }
};

export const expectCalculationExists = (
  calculationMethod: Function,
  description?: string
) => {
  if (typeof calculationMethod !== 'function') {
    const desc = description ? ` ${description}` : '';
    throw new Error(`Calculation method${desc} does not exist or is not a function`);
  }
}; 