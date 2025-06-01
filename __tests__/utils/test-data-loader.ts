import fs from 'fs';
import path from 'path';
import { Cloudsave } from '../../data/domain/cloudsave';
import { initAllItems } from '../../data/domain/items';
import { initAccountDataKeys, updateIdleonData } from '../../data/domain/idleonData';

export const loadTestSave = (saveName: string): Cloudsave => {
  const savePath = path.join(__dirname, '..', 'fixtures', 'saves', `${saveName}.json`);
  
  if (!fs.existsSync(savePath)) {
    throw new Error(`Test save file not found: ${savePath}`);
  }
  
  const saveData = JSON.parse(fs.readFileSync(savePath, 'utf8'));
  return Cloudsave.fromJSON(saveData);
};

export const loadTestGameData = (saveName: string): Map<string, any> => {
  const cloudSave = loadTestSave(saveName);
  
  // Initialize all items data
  const allItems = initAllItems();
  
  // Initialize account data structure
  const accountData = initAccountDataKeys(allItems);
  
  // Parse fake player names for testing
  const charNames = cloudSave.fakePlayerNames();
  
  // Mock companions and server vars for testing
  const companions: number[] = [];
  const serverVars: Record<string, any> = {};
  
  // Update account data with parsed cloudsave
  const idleonData = updateIdleonData(accountData, cloudSave, charNames, companions, serverVars, true);
  
  return idleonData.getData();
};

export const saveTestResults = (saveName: string, results: any): void => {
  const resultPath = path.join(__dirname, '..', 'fixtures', 'expected-results', `${saveName}.json`);
  fs.writeFileSync(resultPath, JSON.stringify(results, null, 2));
};

export const loadExpectedResults = (saveName: string): any => {
  const resultPath = path.join(__dirname, '..', 'fixtures', 'expected-results', `${saveName}.json`);
  
  if (!fs.existsSync(resultPath)) {
    throw new Error(`Expected results file not found: ${resultPath}`);
  }
  
  return JSON.parse(fs.readFileSync(resultPath, 'utf8'));
}; 