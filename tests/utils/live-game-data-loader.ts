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

export const normalizeExtractedValue = (value: unknown): number => {
  let numericValue = value;
  if (value && typeof value === 'object' && 'type' in value && value.type === 'large_number') {
    numericValue = 'value' in value ? value.value : undefined;
    if (typeof numericValue !== 'string') {
      throw new Error('Extracted large number must contain numeric text');
    }
  }

  if (typeof numericValue === 'string') {
    const text = numericValue.trim();
    if (!/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(text)) {
      throw new Error('Extracted numeric text is malformed');
    }
    numericValue = Number(text);
  }

  if (typeof numericValue !== 'number' || !Number.isFinite(numericValue)) {
    throw new Error(`Extracted value is not a finite number: ${JSON.stringify(value)}`);
  }

  return numericValue;
};

export const validateExtractionContext = (
  results: ExtractionResults,
  selectedContext: ExtractionContext,
  excludedMapInternalNames: readonly string[]
): void => {
  const captureContext = results.context;
  if (!captureContext) {
    throw new Error('Capture context is missing');
  }
  for (const [name, context] of [['Capture', captureContext], ['Selected save', selectedContext]] as const) {
    if (!context || !Number.isInteger(context.activePlayerIndex) || context.activePlayerIndex < 0 ||
      !Number.isInteger(context.mapId) || context.mapId < 0 ||
      typeof context.mapInternalName !== 'string' || context.mapInternalName.length === 0) {
      throw new Error(`${name} context must identify the active player and map`);
    }

    if (excludedMapInternalNames.includes(context.mapInternalName)) {
      throw new Error(`${name} map ${context.mapId} (${context.mapInternalName}) is excluded from this comparison`);
    }
  }

  if (captureContext.mapId !== selectedContext.mapId ||
    captureContext.mapInternalName !== selectedContext.mapInternalName) {
    throw new Error(`Map mismatch: capture ${captureContext.mapId} (${captureContext.mapInternalName}), selected save ${selectedContext.mapId} (${selectedContext.mapInternalName})`);
  }

  if (captureContext.activePlayerIndex !== selectedContext.activePlayerIndex) {
    throw new Error(`Active player mismatch: capture ${captureContext.activePlayerIndex}, selected save ${selectedContext.activePlayerIndex}`);
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
