import fs from 'fs';

const accountDataset = require('../helpers/account-dataset.cjs') as {
  resolveExtractionResultsPath(filename: string): string;
};
/**
 * Live Game Data Loader
 * 
 * Loads extraction results from our game debug tool and provides
 * utilities for working with live game data in tests.
 */

export interface ExtractedValue {
  expression: string;
  result: any;
}

export interface ExtractionContext {
  activePlayerIndex: number;
  mapId: number;
  mapInternalName: string;
}

export interface ExtractionResults {
  extractions: Record<string, ExtractedValue>;
  errors: Record<string, { expression: string; error: string }>;
  context?: ExtractionContext;
}

export const loadExtractionResults = (resultsFileName: string): ExtractionResults => {
  const resultsPath = accountDataset.resolveExtractionResultsPath(resultsFileName);
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

export const validateTownExtractionContext = (
  results: ExtractionResults,
  selectedContext: ExtractionContext
): void => {
  const captureContext = results.context;
  if (!captureContext) {
    throw new Error('Extraction context is missing. Capture new results while the active player is in Town.');
  }

  if (!captureContext.mapInternalName.includes('Town')) {
    throw new Error('Extraction was not captured in Town. Move the active player to Town and capture new results.');
  }

  if (!selectedContext.mapInternalName.includes('Town')) {
    throw new Error('The selected save is not in Town. Save with the active player in Town before comparing results.');
  }

  if (captureContext.mapId !== selectedContext.mapId) {
    throw new Error(`Town map mismatch: capture mapId ${captureContext.mapId}, selected save mapId ${selectedContext.mapId}. Capture results in the selected save's Town.`);
  }

  if (captureContext.activePlayerIndex !== selectedContext.activePlayerIndex) {
    throw new Error(`Active player mismatch: capture activePlayerIndex ${captureContext.activePlayerIndex}, selected save activePlayerIndex ${selectedContext.activePlayerIndex}. Capture results with the selected save's active player.`);
  }
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
};

export const getExtractionSummary = (results: ExtractionResults): string => {
  const extractionCount = Object.keys(results.extractions).length;
  const errorCount = Object.keys(results.errors).length;
  
  return `${extractionCount} extractions, ${errorCount} errors`;
};
