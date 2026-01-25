/**
 * Parameter Test Configuration
 * 
 * Table-driven test configuration for validating individual parameters
 * used in domain calculations against live game data.
 */

import { ExtractionResults, getExtractedValue } from "./live-game-data-loader";

export interface ParameterTestSpec {
  /** Unique identifier for the parameter */
  id: string;
  /** Human-readable description */
  description: string;
  /** Key to extract from live game results */
  extractionKey: string;
  /** How to extract this value from domain objects */
  domainExtractor: (gameData: Map<string, any>) => any;
}

export interface ParameterTestResult {
  parameterId: string;
  passed: boolean;
  liveValue: any;
  domainValue: any;
  error?: string;
  notes?: string;
}

export const validateParameter = (
  spec: ParameterTestSpec,
  liveValue: any,
  domainValue: any,
  tolerance: number,
): ParameterTestResult => {
  const result: ParameterTestResult = {
    parameterId: spec.id,
    passed: false,
    liveValue,
    domainValue
  };
    // Value equality check
    expect(domainValue).toMatchLiveGame(liveValue, tolerance)

    result.passed = true;
    result.notes = `✅ ${spec.description}: ${liveValue}`;
    return result;
};

export const runParameterValidationSuite = (
  specs: Record<string, ParameterTestSpec>,
  extractionResults: ExtractionResults,
  gameData: Map<string, any>,
  tolerance: number = 0
): ParameterTestResult[] => {
  const results: ParameterTestResult[] = [];

  for (const [key, spec] of Object.entries(specs)) {
    try {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      
      const result = validateParameter(spec, liveValue, domainValue, tolerance);
      // Use the key from specs as parameterId for lookup
      result.parameterId = key;
      results.push(result);
      
    } catch (error) {
      results.push({
        parameterId: key, // Use key instead of spec.id
        passed: false,
        liveValue: 'extraction_failed',
        domainValue: 'extraction_failed',
        error: `${error instanceof Error ? error.message : String(error)}`
      });
    }
  }

  return results;
};
