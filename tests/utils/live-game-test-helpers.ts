/**
 * Live Game Test Helpers
 * 
 * Utility functions for testing domain calculations against live game data.
 * Adapted from existing test infrastructure but focused on exact comparisons.
 */

export const expectLiveGameMatch = (
  actual: number,
  liveGameValue: number,
  tolerance: number = 0.001, // Much tighter tolerance for live data
  description?: string
) => {
  const difference = Math.abs(actual - liveGameValue) / Math.max(Math.abs(liveGameValue), 1);
  const passed = difference <= tolerance;
  
  if (!passed) {
    const desc = description ? ` for ${description}` : '';
    throw new Error(
      `Live game mismatch${desc}: expected ${liveGameValue}, got ${actual} (${(difference * 100).toFixed(4)}% difference, tolerance: ${tolerance * 100}%)`
    );
  }
};

export const expectExactMatch = (
  actual: number,
  liveGameValue: number,
  description?: string
) => {
  if (actual !== liveGameValue) {
    const desc = description ? ` for ${description}` : '';
    throw new Error(`Exact match failed${desc}: expected ${liveGameValue}, got ${actual}`);
  }
};

export const expectLiveGameNotNull = (
  actual: number | null | undefined,
  description?: string
) => {
  if (actual === null || actual === undefined || isNaN(actual)) {
    const desc = description ? ` for ${description}` : '';
    throw new Error(`Live game calculation result${desc} is null, undefined, or NaN: ${actual}`);
  }
};

export const expectParameterInRange = (
  parameter: number,
  min: number,
  max: number,
  parameterName: string
) => {
  if (parameter < min || parameter > max) {
    throw new Error(`Parameter '${parameterName}' value ${parameter} outside expected range [${min}, ${max}]`);
  }
};

export const expectValidGameData = (
  gameData: Map<string, any>,
  requiredKeys: string[]
) => {
  requiredKeys.forEach(key => {
    if (!gameData.has(key)) {
      throw new Error(`Required game data key '${key}' not found`);
    }
    
    const value = gameData.get(key);
    if (value === null || value === undefined) {
      throw new Error(`Game data key '${key}' has null/undefined value`);
    }
  });
};

export const logParameterComparison = (
  parameterName: string,
  domainValue: number,
  liveValue: number,
  passed: boolean
) => {
  const difference = Math.abs(domainValue - liveValue) / Math.max(Math.abs(liveValue), 1);
  const status = passed ? '✅' : '❌';
  
  console.log(`  ${status} ${parameterName}: domain=${domainValue}, live=${liveValue} (${(difference * 100).toFixed(4)}% diff)`);
};

export const createParameterValidator = (tolerance: number = 0.001) => {
  return (parameterName: string, domainValue: number, liveValue: number) => {
    expectLiveGameMatch(domainValue, liveValue, tolerance, parameterName);
    logParameterComparison(parameterName, domainValue, liveValue, true);
  };
};
