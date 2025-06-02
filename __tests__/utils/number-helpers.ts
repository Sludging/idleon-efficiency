import { nFormatter } from '../../data/utility';

// Consolidated regex pattern for formatted numbers
const FORMATTED_NUMBER_PATTERN = /^([\d.]+)([KMBTQ]+)?$/;

export const isFormattedNumber = (value: any): boolean => {
  if (typeof value !== 'string') return false;
  return FORMATTED_NUMBER_PATTERN.test(value);
};

export const parseGameFormattedNumber = (formattedNumber: string | number): number => {
  // If it's already a number, return it
  if (typeof formattedNumber === 'number') {
    return formattedNumber;
  }

  const multipliers: Record<string, number> = {
    'K': 1e3,
    'M': 1e6, 
    'B': 1e9,
    'T': 1e12,
    'Q': 1e15,
    'QQ': 1e18,
    'QQQ': 1e21
  };
  
  const match = formattedNumber.match(FORMATTED_NUMBER_PATTERN);
  if (!match) {
    return parseFloat(formattedNumber);
  }
  
  const [, number, suffix] = match;
  const multiplier = multipliers[suffix || ''] || 1;
  return parseFloat(number) * multiplier;
};

export const expectFormattedNumbersToMatch = (
  calculated: number,
  expectedFormatted: string,
  tolerance: number = 0.05,
  formatType: string = "Smaller"
) => {
  const calculatedFormatted = nFormatter(calculated, formatType);
  const expectedNumber = parseGameFormattedNumber(expectedFormatted);
  const calculatedNumber = parseGameFormattedNumber(calculatedFormatted);
  
  // Use standard Jest matcher instead of custom one to avoid linter issues
  const difference = Math.abs(calculatedNumber - expectedNumber) / Math.max(Math.abs(expectedNumber), 1);
  const passed = difference <= tolerance;
  
  if (!passed) {
    throw new Error(
      `Formatted number mismatch: expected ${expectedFormatted} (${expectedNumber}), got ${calculatedFormatted} (${calculatedNumber}), difference: ${(difference * 100).toFixed(2)}%`
    );
  }
};

export const expectNumberInRange = (
  value: number,
  min: number,
  max: number,
  description: string = "value"
) => {
  expect(value).toBeGreaterThanOrEqual(min);
  expect(value).toBeLessThanOrEqual(max);
  
  if (value < min || value > max) {
    throw new Error(`${description} ${value} is outside expected range [${min}, ${max}]`);
  }
}; 