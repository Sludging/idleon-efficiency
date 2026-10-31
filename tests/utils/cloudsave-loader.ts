/**
 * Cloudsave Loader for Live Game Testing
 * 
 * Adapted from existing test infrastructure to load static save data
 * for setting up domain objects that we'll test against live game data.
 */

import fs from 'fs';
import path from 'path';
import { Cloudsave } from '../../data/domain/cloudsave';
import { initAllItems } from '../../data/domain/items';
import { initAccountDataKeys, updateIdleonData } from '../../data/domain/idleonData';
import { StaticRepositories } from '../../data/domain/repositories';
import { normalizeCompanionStates } from '../../data/domain/companions/companionState';
import { guardAndFreeze } from './readonly-game-data';
const accountDataset = require('../helpers/account-dataset.cjs') as {
  resolveTestSavePath(saveName: string): string;
};

// Each Jest runtime owns its prepared accounts. Grouped suites share this module.
const preparedGameDataBySavePath = new Map<string, Map<string, unknown>>();

// Mock localStorage for Node.js environment
if (typeof global !== 'undefined' && !global.localStorage) {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  global.localStorage = localStorageMock as any;
}

const loadTestSaveFromPath = (savePath: string): Cloudsave => {
  if (!fs.existsSync(savePath)) {
    throw new Error(`Test save file not found: ${savePath}. Place save files in tests/fixtures/saves/`);
  }
  const saveData = JSON.parse(fs.readFileSync(savePath, 'utf8'));
  return Cloudsave.fromJSON(saveData);
};

export const loadTestSave = (saveName: string): Cloudsave =>
  loadTestSaveFromPath(accountDataset.resolveTestSavePath(saveName));

export const loadGameDataFromSave = (saveName: string): Map<string, any> => {
  const savePath = path.resolve(accountDataset.resolveTestSavePath(saveName));
  const cachedGameData = preparedGameDataBySavePath.get(savePath);
  if (cachedGameData) {
    return cachedGameData;
  }

  const cloudSave = loadTestSaveFromPath(savePath);
  
  // Initialize all items data (needed for domain calculations)
  const allItems = initAllItems();
  
  // Initialize account data structure
  const accountData = initAccountDataKeys(allItems, new StaticRepositories());
  
  // Parse player names and other required data
  const charNames = cloudSave.get("playerNames");
  const serverVars = cloudSave.get("servervars");
  const companions = normalizeCompanionStates(cloudSave.get("companions"));

  // Update account data with parsed cloudsave
  const idleonData = updateIdleonData(accountData, cloudSave, charNames, companions, serverVars, true);
  
  const gameData = idleonData.getData();
  validateGameDataStructure(gameData);
  guardAndFreeze(gameData);
  preparedGameDataBySavePath.set(savePath, gameData);
  return gameData;
};

export const validateGameDataStructure = (gameData: Map<string, any>): void => {
  const requiredKeys = ['players', 'achievements', 'cooking'];
  
  requiredKeys.forEach(key => {
    if (!gameData.has(key)) {
      throw new Error(`Game data missing required key: ${key}`);
    }
  });
  
  const cooking = gameData.get('cooking');
  if (cooking && (!cooking.meals || !cooking.kitchens)) {
    throw new Error('Cooking data structure invalid - missing meals or kitchens');
  }
};
