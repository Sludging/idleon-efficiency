/**
 * Parameter Test Configuration
 *
 * Table-driven test configuration for validating individual parameters
 * used in domain calculations against live game data.
 */

export interface ParameterTestSpec {
  /** Human-readable description */
  description: string;
  /** Key to extract from live game results */
  extractionKey: string;
  /** How to extract this value from domain objects */
  domainExtractor: (gameData: Map<string, any>) => any;
}
