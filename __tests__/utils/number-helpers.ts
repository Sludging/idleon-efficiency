import { nFormatter } from '../../data/utility';

export const parseGameFormattedNumber = (formattedNumber: string): number => {
  const multipliers: Record<string, number> = {
    'K': 1e3,
    'M': 1e6, 
    'B': 1e9,
    'T': 1e12,
    'Q': 1e15,
    'QQ': 1e18,
    'QQQ': 1e21
  };
  
  const match = formattedNumber.match(/^([\d.]+)([KMBTQ]+)?$/);
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
  
  expect(calculatedNumber).toBeCloseToWithTolerance(expectedNumber, tolerance);
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