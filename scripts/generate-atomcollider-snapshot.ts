#!/usr/bin/env ts-node

/**
 * Atom Collider Calculation Snapshot Generator
 * 
 * Generates expected test results by capturing current calculation outputs.
 * Usage: npx ts-node scripts/generate-atomcollider-snapshot.ts [save-name]
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
import { AtomCollider, Atom, HydrogenAtom, CarbonAtom, FluorideAtom, OxygenAtom } from '../data/domain/atomCollider';
import { Alchemy } from '../data/domain/alchemy';
import { Construction } from '../data/domain/construction';
import { Cooking } from '../data/domain/cooking';
import { TaskBoard } from '../data/domain/tasks';

const saveName = process.argv[2] || 'demo-save';

console.log(`📸 Generating atom collider calculation snapshot for: ${saveName}`);
console.log(`This captures CURRENT calculation results as expected test values.`);
console.log(`Verify these match your game, then they become regression baselines.\n`);

try {
  // Load the game data
  const gameData = loadTestGameData(saveName);
  const collider = gameData.get('collider') as AtomCollider;
  const alchemy = gameData.get('alchemy') as Alchemy;
  const construction = gameData.get('construction') as Construction;
  const cooking = gameData.get('cooking') as Cooking;
  const taskboard = gameData.get('taskboard') as TaskBoard;

  if (!collider) {
    console.error('❌ No atom collider data found in save file');
    process.exit(1);
  }

  console.log(`📊 Atom Collider Data Summary:`);
  console.log(`- Total atoms: ${collider.atoms.length}`);
  console.log(`- Particles: ${collider.particles}`);
  
  const activeAtoms = collider.atoms.filter(atom => atom.level > 0);
  console.log(`- Active atoms: ${activeAtoms.length}`);

  // Get cost calculation parameters (same as updateAtomCollider)
  const colliderBuildingLevel = construction?.buildings.find(building => building.name == "Atom Collider")?.level ?? 0;
  const nenoBonus = collider.atoms[9]?.getBonus() ?? 0;
  const bubbleBonusY5 = alchemy?.getBubbleBonusForKey("Y5") ?? 0;
  const meritBonus = (taskboard?.merits.find(merit => merit.descLine1.includes("reduction in Atom Upgrade Costs"))?.level ?? 0) * 7;
  const hydrogenDays = (collider.atoms[0] as HydrogenAtom)?.daysSinceUpgrade ?? 0;
  const carbonWizardTowers = (collider.atoms[5] as CarbonAtom)?.wizardTowersOver50 ?? 0;
  const fluorideVoidMeals = (collider.atoms[8] as FluorideAtom)?.voidMeals ?? 0;

  console.log(`\n🔧 Cost Calculation Parameters:`);
  console.log(`- Collider building level: ${colliderBuildingLevel}`);
  console.log(`- Neno bonus: ${nenoBonus}`);
  console.log(`- Bubble bonus Y5: ${bubbleBonusY5}`);
  console.log(`- Merit bonus: ${meritBonus}`);
  console.log(`- Hydrogen days since upgrade: ${hydrogenDays}`);
  console.log(`- Carbon wizard towers over 50: ${carbonWizardTowers}`);
  console.log(`- Fluoride void meals: ${fluorideVoidMeals}`);

  // === CAPTURE ATOM BONUSES ===
  const atomBonuses: any[] = [];
  const specialAtomBonuses: any[] = [];

  console.log(`\n⚛️  Processing Atom Bonuses:`);
  
  // Process all atoms but focus on active ones for main testing
  const atomsToTest = [
    ...activeAtoms.slice(0, 10), // First 10 active atoms
    ...collider.atoms.filter(atom => atom.level === 0).slice(0, 3) // Few inactive atoms for zero-level testing
  ];

  atomsToTest.forEach((atom) => {
    const bonus = atom.getBonus();
    const bonusText = atom.getBonusText();
    
    console.log(`  [${atom.index}] ${atom.data.name}: Level ${atom.level} = ${bonus}`);
    
    atomBonuses.push({
      description: `${atom.data.name} bonus`,
      index: atom.index,
      level: atom.level,
      bonus: bonus,
      bonusText: bonusText,
      notes: `Level ${atom.level} atom`
    });

    // Capture special atom types separately
    if (atom.constructor.name !== 'Atom') {
      console.log(`    ⭐ Special atom type: ${atom.constructor.name}`);
      
      specialAtomBonuses.push({
        description: `${atom.constructor.name} - ${atom.data.name}`,
        index: atom.index,
        level: atom.level,
        bonus: bonus,
        bonusText: bonusText,
        atomType: atom.constructor.name,
        notes: `Special atom calculation: ${atom.constructor.name}`
      });

      // Add extra properties for special atoms
      if (atom instanceof CarbonAtom) {
        (specialAtomBonuses[specialAtomBonuses.length - 1] as any).extraLevels = atom.getExtraLevels();
      }
    }
  });

  // === CAPTURE ATOM COSTS ===
  const atomCosts: any[] = [];
  const atomUnlockCosts: any[] = [];
  const atomMaxLevelCosts: any[] = [];

  console.log(`\n💰 Processing Atom Costs:`);
  
  // Test costs for active atoms and a few key inactive ones
  const atomsForCostTesting = [
    ...activeAtoms.slice(0, 5), // First 5 active atoms
    ...collider.atoms.filter(atom => atom.level === 0 && atom.index < 10).slice(0, 3) // Few inactive atoms
  ];

  atomsForCostTesting.forEach((atom) => {
    const currentCost = atom.getCost();
    const unlockCost = atom.getCostToUnlock();
    const maxLevelCost = atom.getCostToMaxLevel();
    const maxLevel = atom.getMaxLevel();
    
    console.log(`  [${atom.index}] ${atom.data.name}:`);
    console.log(`    Current upgrade cost: ${currentCost.toLocaleString()}`);
    console.log(`    Unlock cost: ${unlockCost.toLocaleString()}`);
    console.log(`    Cost to max level: ${maxLevelCost.toLocaleString()}`);

    atomCosts.push({
      description: `${atom.data.name} upgrade cost`,
      index: atom.index,
      level: atom.level,
      cost: currentCost,
      notes: `Level ${atom.level} to ${atom.level + 1}`
    });

    atomUnlockCosts.push({
      description: `${atom.data.name} unlock cost`,
      index: atom.index,
      unlockCost: unlockCost,
      notes: `Cost to unlock from level 0`
    });

    // Only capture max level cost for atoms that aren't already maxed
    if (atom.level < maxLevel) {
      atomMaxLevelCosts.push({
        description: `${atom.data.name} cost to max level`,
        index: atom.index,
        currentLevel: atom.level,
        maxLevel: maxLevel,
        costToMaxLevel: maxLevelCost,
        notes: `Cost from level ${atom.level} to max level ${maxLevel}`
      });
    }
  });

  // === CAPTURE ATOM MAX LEVELS ===
  const atomMaxLevels: any[] = [];
  
  console.log(`\n📊 Processing Atom Max Levels:`);
  collider.atoms.slice(0, 10).forEach((atom) => {
    const maxLevel = atom.getMaxLevel();
    console.log(`  [${atom.index}] ${atom.data.name}: Max level ${maxLevel}`);
    
    atomMaxLevels.push({
      description: `${atom.data.name} max level`,
      index: atom.index,
      maxLevel: maxLevel,
      notes: `Base 20 + gaming boost ${atom.gamingMaxLevelBoost}`
    });
  });

  // === CAPTURE PARTICLE COUNT ===
  console.log(`\n🔋 Particles: ${collider.particles}`);

  // === GENERATE SNAPSHOT DATA ===
  const snapshotData = {
    "_metadata": {
      "saveName": saveName,
      "domain": "atomCollider",
      "capturedAt": new Date().toISOString().split('T')[0],
      "notes": "Auto-generated calculation snapshot - verify values match the game!",
      "snapshotParameters": {
        "colliderBuildingLevel": colliderBuildingLevel,
        "nenoBonus": nenoBonus,
        "bubbleBonusY5": bubbleBonusY5,
        "meritBonus": meritBonus,
        "particles": collider.particles,
        "hydrogenDaysSinceUpgrade": hydrogenDays,
        "carbonWizardTowersOver50": carbonWizardTowers,
        "fluorideVoidMeals": fluorideVoidMeals
      }
    },
    "atomBonuses": atomBonuses,
    "specialAtomBonuses": specialAtomBonuses,
    "atomCosts": atomCosts,
    "atomUnlockCosts": atomUnlockCosts,
    "atomMaxLevelCosts": atomMaxLevelCosts,
    "atomMaxLevels": atomMaxLevels,
    "particles": collider.particles
  };

  // === SAVE SNAPSHOT FILE ===
  const outputPath = path.join(__dirname, '..', '__tests__', 'fixtures', 'expected-results', 'atomcollider', `${saveName}.json`);
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(snapshotData, null, 2));

  console.log(`\n✅ Calculation snapshot saved to: ${outputPath}`);
  console.log(`\n📋 Snapshot Summary:`);
  console.log(`- Atom bonuses: ${atomBonuses.length}`);
  console.log(`- Special atom bonuses: ${specialAtomBonuses.length}`);
  console.log(`- Atom costs: ${atomCosts.length}`);
  console.log(`- Atom unlock costs: ${atomUnlockCosts.length}`);
  console.log(`- Atom max level costs: ${atomMaxLevelCosts.length}`);
  console.log(`- Atom max levels: ${atomMaxLevels.length}`);

  console.log(`\n🎯 Next Steps:`);
  console.log(`1. Verify these calculation results match what you see in the game`);
  console.log(`2. If any values are wrong, manually edit: ${outputPath}`);
  console.log(`3. Run tests: yarn test __tests__/domains/atomcollider-calculations.test.ts`);
  console.log(`4. Once tests pass, this becomes your regression baseline!`);

  if (activeAtoms.length === 0) {
    console.log(`\n⚠️  Note: No active atoms found. This might mean:`);
    console.log(`   - No atoms have been upgraded in this save`);
    console.log(`   - Tests will only cover zero-level calculations`);
    console.log(`   - Consider using a save with some atom upgrades`);
  }

} catch (error: any) {
  console.error(`❌ Error generating snapshot:`, error.message);
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error(`\n💡 Hint: Make sure dependencies are installed:`);
    console.error(`   yarn install`);
  }
  process.exit(1);
} 