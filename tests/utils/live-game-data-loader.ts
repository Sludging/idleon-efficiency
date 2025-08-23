import fs from 'fs';
import path from 'path';

/**
 * Live Game Data Loader
 * 
 * Loads extraction results from our game debug tool and provides
 * utilities for working with live game data in tests.
 */

export interface ExtractedValue {
  expression: string;
  result: any;
  description: string;
  extractedAt: string;
}

export interface ExtractionResults {
  timestamp: string;
  extractions: Record<string, ExtractedValue>;
  errors: Record<string, any>;
  metadata: {
    serverStatus: any;
  };
}

export const loadExtractionResults = (resultsFileName: string): ExtractionResults => {
  const resultsPath = path.join(__dirname, '..', 'results', resultsFileName);
  
  if (!fs.existsSync(resultsPath)) {
    throw new Error(`Extraction results file not found: ${resultsPath}`);
  }
  
  const extractedData = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  return extractedData as ExtractionResults;
};

export const getExtractedValue = (results: ExtractionResults, label: string): any => {
  const extraction = results.extractions[label];
  
  if (!extraction) {
    throw new Error(`Extraction '${label}' not found in results. Available: ${Object.keys(results.extractions).join(', ')}`);
  }
  
  if (results.errors[label]) {
    throw new Error(`Extraction '${label}' failed: ${results.errors[label].error}`);
  }
  
  return normalizeExtractedValue(extraction.result);
};

export const normalizeExtractedValue = (value: any): number => {
  // Handle our large number format
  if (value && typeof value === 'object' && value.type === 'large_number') {
    return parseFloat(value.value);
  }
  
  // Handle null/undefined
  if (value === null || value === undefined) {
    return 0;
  }
  
  // Handle regular numbers
  if (typeof value === 'number') {
    return value;
  }
  
  // Try to parse as number
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    throw new Error(`Cannot normalize extracted value to number: ${JSON.stringify(value)}`);
  }
  
  return parsed;
};

export const validateExtractionHealth = (results: ExtractionResults): void => {
  const extractionCount = Object.keys(results.extractions).length;
  const errorCount = Object.keys(results.errors).length;
  
  if (extractionCount === 0) {
    throw new Error('No successful extractions found in results');
  }
  
  if (errorCount > 0) {
    const errorLabels = Object.keys(results.errors);
    throw new Error(`${errorCount} extraction(s) failed: ${errorLabels.join(', ')}`);
  }
  
  if (!results.metadata?.serverStatus?.injected) {
    console.warn('⚠️  Game injection was not detected during extraction - results may be incomplete');
  }
};

export const getExtractionSummary = (results: ExtractionResults): string => {
  const extractionCount = Object.keys(results.extractions).length;
  const errorCount = Object.keys(results.errors).length;
  const extractedAt = new Date(results.timestamp).toLocaleString();
  
  return `${extractionCount} extractions, ${errorCount} errors, captured at ${extractedAt}`;
};
