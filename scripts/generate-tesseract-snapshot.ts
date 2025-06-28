#!/usr/bin/env ts-node

/**
 * Tesseract Calculation Snapshot Generator
 * 
 * Generates expected test results by capturing current tesseract calculation outputs.
 * Usage: npx ts-node --project scripts/tsconfig.json scripts/generate-tesseract-snapshot.ts [save-name]
 * 
 * This creates a snapshot of current calculations that can be verified
 * against the game and used as regression test baselines.
 */

// Mock browser APIs for Node.js environment
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null
} as Storage;

global.sessionStorage = global.localStorage;

// Mock window object if needed
if (typeof window === 'undefined') {
  (global as any).window = {};
}

import * as fs from 'fs';
import * as path from 'path';
import { loadTestGameData } from '../__tests__/utils/test-data-loader';
import { Tesseract } from '../data/domain/tesseract';

const saveName = process.argv[2] || 'demo-save';

console.log(`📸 Generating tesseract calculation snapshot for: ${saveName}`);
console.log(`This captures CURRENT calculation results as expected test values.`);
console.log(`Review the generated values against the actual game before committing.\n`);

async function main() {
  console.log('⏳ Loading game data...');
  const gameData = loadTestGameData(saveName);
  
  if (!gameData) {
    console.error(`❌ Failed to load save data`);
    process.exit(1);
  }

  console.log('📊 Extracting tesseract data...');
  const tesseract = gameData.get('tesseract') as Tesseract;
  
  if (!tesseract) {
    console.error('❌ No tesseract data found in game data');
    process.exit(1);
  }

  // === UPGRADE BONUSES ===
  console.log('🔢 Capturing upgrade bonuses...');
  const upgradeBonuses = tesseract.upgrades.map(upgrade => ({
    id: upgrade.id,
    name: upgrade.data.name,
    level: upgrade.level,
    unlocked: upgrade.unlocked,
    bonus: upgrade.bonus,
    description: upgrade.getDescription()
  }));

  // === UPGRADE COSTS ===
  console.log('💰 Capturing upgrade costs...');
  const upgradeCosts = tesseract.upgrades
    .filter(upgrade => upgrade.level < upgrade.data.max_level)
    .map(upgrade => ({
      id: upgrade.id,
      name: upgrade.data.name,
      level: upgrade.level,
      nextLevelCost: upgrade.cost,
      costToMax: upgrade.costToMax
    }));

  // === UPGRADE LEVEL CALCULATIONS ===
  console.log('📈 Capturing level-based calculations...');
  const upgradeLevelCosts = tesseract.upgrades
    .filter(upgrade => upgrade.level < Math.min(upgrade.data.max_level, upgrade.level + 10))
    .map(upgrade => {
      const costs = [];
      for (let i = 1; i <= Math.min(10, upgrade.data.max_level - upgrade.level); i++) {
        costs.push({
          levels: i,
          cost: upgrade.getCostForNextNLevels(tesseract.upgrades, i)
        });
      }
      return {
        id: upgrade.id,
        name: upgrade.data.name,
        currentLevel: upgrade.level,
        levelCosts: costs
      };
    });

  // === TACHYON COUNTS ===
  console.log('🌌 Capturing tachyon resources...');
  const tachyonCounts = [
    { type: 'Purple', count: tesseract.purpleTachyons },
    { type: 'Brown', count: tesseract.brownTachyons },
    { type: 'Green', count: tesseract.greenTachyons },
    { type: 'Red', count: tesseract.redTachyons },
    { type: 'Silver', count: tesseract.silverTachyons },
    { type: 'Gold', count: tesseract.goldTachyons }
  ];

  // === UNLOCK PATH INFO ===
  console.log('🛤️ Capturing unlock path calculations...');
  const unlockPathInfo = {
    hasNextUnlock: !!tesseract.unlockPathInfo.nextUnlock,
    nextUnlockName: tesseract.unlockPathInfo.nextUnlock?.data.name || null,
    levelsNeeded: tesseract.unlockPathInfo.levelsNeeded,
    totalCost: tesseract.unlockPathInfo.totalCost,
    pathUpgrades: tesseract.unlockPathInfo.pathUpgrades.map(upgrade => ({
      id: upgrade.id,
      name: upgrade.name,
      levels: upgrade.levels,
      cost: upgrade.cost,
      tachyonType: upgrade.tachyonType
    })),
    tachyonCosts: tesseract.unlockPathInfo.tachyonTypes,
    remainingLevels: tesseract.unlockPathInfo.remainingLevels
  };

  // === COMPILE RESULTS ===
  const results = {
    metadata: {
      saveName: saveName,
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
      domain: "tesseract"
    },
    summary: {
      upgradesCount: tesseract.upgrades.length,
      activeUpgradesCount: tesseract.upgrades.filter(u => u.level > 0).length,
      unlockedUpgradesCount: tesseract.upgrades.filter(u => u.unlocked).length,
      maxedUpgradesCount: tesseract.upgrades.filter(u => u.level >= u.data.max_level).length,
      totalTesseractLevel: tesseract.totalTesseractLevel
    },
    upgradeBonuses: upgradeBonuses,
    upgradeCosts: upgradeCosts,
    upgradeLevelCosts: upgradeLevelCosts,
    tachyonCounts: tachyonCounts,
    unlockPathInfo: unlockPathInfo
  };

  // === SAVE RESULTS ===
  const outputDir = path.join(__dirname, '..', '__tests__', 'fixtures', 'expected-results', 'tesseract');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `${saveName}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log(`\n✅ Snapshot generated successfully!`);
  console.log(`📁 Output: ${outputFile}`);
  console.log(`\n📊 Summary:`);
  console.log(`- Upgrade bonuses: ${upgradeBonuses.length}`);
  console.log(`- Upgrade costs: ${upgradeCosts.length}`);
  console.log(`- Upgrade level costs: ${upgradeLevelCosts.length}`);
  console.log(`- Tachyon types: ${tachyonCounts.length}`);
  console.log(`- Total tesseract level: ${tesseract.totalTesseractLevel}`);

  // === WARNINGS FOR MISSING DATA ===
  const warnings: string[] = [];
  
  if (upgradeCosts.length === 0) {
    warnings.push('⚠️  No upgrade costs captured - all upgrades may be at max level');
  }
  
  if (tesseract.totalTesseractLevel === 0) {
    warnings.push('⚠️  Total tesseract level is 0 - save may not have tesseract data');
  }

  if (tachyonCounts.every(t => t.count === 0)) {
    warnings.push('⚠️  All tachyon counts are 0 - may need to verify OptLacc indices');
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings:`);
    warnings.forEach(warning => console.log(warning));
  }

  console.log(`\n📋 Next steps:`);
  console.log(`1. Review the generated values against the actual game`);
  console.log(`2. If values look correct, commit this snapshot as the expected baseline`);
  console.log(`3. Create tesseract domain tests using this snapshot data`);
  console.log(`4. Run: yarn test __tests__/domains/tesseract-calculations.test.ts`);
  
  console.log(`\n🎯 Important: Verify these calculations match the game before using as test baselines!`);
}

main().catch(error => {
  console.error('❌ Script failed:', error);
  process.exit(1);
}); 
