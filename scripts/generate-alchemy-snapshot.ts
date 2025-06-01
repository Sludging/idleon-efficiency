#!/usr/bin/env ts-node

/**
 * Alchemy Calculation Snapshot Generator
 * 
 * Generates expected test results by capturing current calculation outputs.
 * Usage: npx ts-node scripts/generate-alchemy-snapshot.ts [save-name]
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
import { Alchemy } from '../data/domain/alchemy';
import { Achievement, AchievementConst } from '../data/domain/achievements';
import { AtomCollider } from '../data/domain/atomCollider';

const saveName = process.argv[2] || 'demo-save';

console.log(`📸 Generating alchemy calculation snapshot for: ${saveName}`);
console.log(`This captures CURRENT calculation results as expected test values.`);
console.log(`Verify these match your game, then they become regression baselines.\n`);

try {
  // Load the game data
  const gameData = loadTestGameData(saveName);
  const alchemy = gameData.get('alchemy') as Alchemy;
  const achievements = gameData.get('achievements') as Achievement[];
  const collider = gameData.get('collider') as AtomCollider;

  if (!alchemy) {
    console.error('❌ No alchemy data found in save file');
    process.exit(1);
  }

  console.log(`📊 Alchemy Data Summary:`);
  console.log(`- Cauldrons: ${alchemy.cauldrons.length}`);
  console.log(`- Total bubbles: ${alchemy.cauldrons.reduce((sum, c) => sum + c.bubbles.length, 0)}`);
  console.log(`- Vials: ${alchemy.vials.length}`);

  // Get calculation parameters (same as UI)
  const undevelopedCostsBubbleLevel = alchemy.getUndevelopedCostsBubbleLevel();
  const barleyBrewVialLevel = alchemy.getBarleyBrewVialLevel();
  const vialMultiplier = alchemy.vials[0]?.bonusMulitplier ?? 1;
  const hasAlchemyAchievement = achievements[AchievementConst.SmartBoiIndex]?.completed ?? false;
  const particles = collider?.particles ?? 0;

  console.log(`\n🔧 Cost Calculation Parameters:`);
  console.log(`- Undeveloped costs bubble level: ${undevelopedCostsBubbleLevel}`);
  console.log(`- Barley brew vial level: ${barleyBrewVialLevel}`);
  console.log(`- Vial multiplier: ${vialMultiplier}`);
  console.log(`- Has alchemy achievement: ${hasAlchemyAchievement}`);
  console.log(`- Particles: ${particles}`);

  // === CAPTURE BUBBLE BONUSES ===
  const bubbleBonuses: any[] = [];
  const specialBubbles: any[] = [];
  
  console.log(`\n🔍 Searching for special bubble types (DailyDripBubble, DiamonChefBubble, etc.)...`);
  
  alchemy.cauldrons.forEach((cauldron, cauldronIndex) => {
    console.log(`\n🔮 Processing Cauldron ${cauldronIndex} (${cauldron.name}):`);
    
    // Get first 3 active bubbles from each cauldron for regular testing
    const activeBubbles = cauldron.bubbles.filter(b => b.level > 0).slice(0, 3);
    
    console.log(`  Found ${activeBubbles.length} active bubbles (testing first 3):`);
    activeBubbles.forEach((bubble) => {
      const bonus = bubble.getBonus();
      console.log(`  [${bubble.bubbleIndex}] ${bubble.name}: Level ${bubble.level} = ${bonus}`);
      
      bubbleBonuses.push({
        description: `${cauldron.name} - ${bubble.name}`,
        cauldron: cauldronIndex,
        index: bubble.bubbleIndex,
        bonus: bonus,
        notes: `Level ${bubble.level}`
      });
    });

    // Search through ALL bubbles for special bubble types (regardless of level)
    const totalBubbles = cauldron.bubbles.length;
    const specialBubblesInCauldron = cauldron.bubbles.filter(b => b.constructor.name !== 'Bubble' && b.level > 0);
    
    if (specialBubblesInCauldron.length > 0) {
      console.log(`  🎯 Found ${specialBubblesInCauldron.length} special bubbles in this cauldron:`);
      specialBubblesInCauldron.forEach((bubble) => {
        const bonus = bubble.getBonus();
        console.log(`    ⭐ ${bubble.constructor.name} - ${bubble.name} (Level ${bubble.level}) = ${bonus}`);
        
        // Check if we already captured this as a regular bubble
        const alreadyCaptured = bubbleBonuses.some(b => 
          b.cauldron === cauldronIndex && b.index === bubble.bubbleIndex
        );
        
        specialBubbles.push({
          description: `${bubble.constructor.name} - ${bubble.name}`,
          cauldron: cauldronIndex,
          index: bubble.bubbleIndex,
          bonus: bonus,
          notes: `Type: ${bubble.constructor.name}, Level ${bubble.level}${alreadyCaptured ? ' (also in regular bubbles)' : ''}`
        });
      });
    } else {
      console.log(`  ℹ️  No special bubbles found in this cauldron (searched ${totalBubbles} bubbles)`);
    }
  });

  // === CAPTURE MATERIAL & ATOM COSTS ===
  const materialCosts: any[] = [];
  const atomCosts: any[] = [];

  alchemy.cauldrons.forEach((cauldron, cauldronIndex) => {
    // Get first active bubble from each cauldron for cost testing
    const activeBubble = cauldron.bubbles.find(b => b.level > 0);
    if (activeBubble) {
      const materialCostMap = activeBubble.getMaterialCost(
        0, // cauldronCostLevel
        undevelopedCostsBubbleLevel,
        barleyBrewVialLevel,
        0, // bargainBubbleLevel
        0, // classMultiBubbleLevel
        0, // discountLevel
        hasAlchemyAchievement,
        0, // newMultiBubbleLevel
        vialMultiplier
      );

      const totalMaterialCost = Array.from(materialCostMap.values()).reduce((sum, cost) => sum + cost, 0);
      
      console.log(`    Material cost: ${totalMaterialCost.toLocaleString()}`);
      
      materialCosts.push({
        description: `${cauldron.name} - ${activeBubble.name} upgrade cost`,
        cauldron: cauldronIndex,
        index: activeBubble.bubbleIndex,
        totalCost: totalMaterialCost,
        notes: `Level ${activeBubble.level} to ${activeBubble.level + 1}`
      });

      // Atom costs for expensive bubbles
      if (totalMaterialCost > 1e8) {
        const atomCost = activeBubble.getAtomCost(totalMaterialCost);
        console.log(`    Atom cost: ${atomCost.toLocaleString()}`);
        
        atomCosts.push({
          description: `${cauldron.name} - ${activeBubble.name} atom cost`,
          cauldron: cauldronIndex,
          index: activeBubble.bubbleIndex,
          materialCost: totalMaterialCost,
          atomCost: atomCost,
          notes: `Atom cost for ${totalMaterialCost.toLocaleString()} material cost`
        });
      }
    }
  });

  // === CAPTURE VIAL BONUSES ===
  const vialBonuses: any[] = [];
  const activeVials = alchemy.vials.filter(v => v.level > 0).slice(0, 3);
  
  console.log(`\n🧪 Processing Active Vials:`);
  activeVials.forEach((vial) => {
    const bonus = vial.getBonus();
    console.log(`  [${vial.vialIndex}] ${vial.name}: Level ${vial.level} = ${bonus}`);
    
    vialBonuses.push({
      description: `${vial.name} vial`,
      index: vial.vialIndex,
      bonus: bonus,
      notes: `Level ${vial.level}`
    });
  });

  // === CAPTURE AGGREGATE BONUSES ===
  const testKeys = [
    'MinEff', 'TotalSTR', 'TotalAGI', 'TotalWIS', 'TotalLUK',
    'DropRate', 'CritChance', 'critDMG', 'DefPct', 'AccPct', 'BrewSpd'
  ];

  const aggregateBubbleBonuses: any[] = [];
  const aggregateVialBonuses: any[] = [];

  console.log(`\n🔗 Processing Aggregate Bonuses:`);
  console.log(`Bubble bonuses:`);
  testKeys.forEach(key => {
    const bubbleBonus = alchemy.getBubbleBonusForKey(key);
    if (bubbleBonus > 0) {
      console.log(`  ${key}: ${bubbleBonus}`);
      aggregateBubbleBonuses.push({
        key,
        bonus: bubbleBonus,
        notes: `Total ${key} bonus from all bubbles`
      });
    }
  });

  console.log(`Vial bonuses:`);
  testKeys.forEach(key => {
    const vialBonus = alchemy.getVialBonusForKey(key);
    if (vialBonus > 0) {
      console.log(`  ${key}: ${vialBonus}`);
      aggregateVialBonuses.push({
        key,
        bonus: vialBonus,
        notes: `Total ${key} bonus from all vials`
      });
    }
  });

  // === GENERATE SNAPSHOT DATA ===
  const snapshotData = {
    "_metadata": {
      "saveName": saveName,
      "domain": "alchemy",
      "capturedAt": new Date().toISOString().split('T')[0],
      "notes": "Auto-generated calculation snapshot - verify values match the game!",
      "snapshotParameters": {
        "undevelopedCostsBubbleLevel": undevelopedCostsBubbleLevel,
        "barleyBrewVialLevel": barleyBrewVialLevel,
        "vialMultiplier": vialMultiplier,
        "hasAlchemyAchievement": hasAlchemyAchievement,
        "particles": particles
      }
    },
    "bubbleBonuses": bubbleBonuses,
    "specialBubbles": specialBubbles,
    "materialCosts": materialCosts,
    "atomCosts": atomCosts,
    "vialBonuses": vialBonuses,
    "aggregateVialBonuses": aggregateVialBonuses,
    "aggregateBubbleBonuses": aggregateBubbleBonuses
  };

  // === SAVE SNAPSHOT FILE ===
  const outputPath = path.join(__dirname, '..', '__tests__', 'fixtures', 'expected-results', 'alchemy', `${saveName}.json`);
  
  // Ensure directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(snapshotData, null, 2));

  console.log(`\n✅ Calculation snapshot saved to: ${outputPath}`);
  console.log(`\n📋 Snapshot Summary:`);
  console.log(`- Bubble bonuses: ${bubbleBonuses.length}`);
  console.log(`- Special bubbles: ${specialBubbles.length}`);
  console.log(`- Material costs: ${materialCosts.length}`);
  console.log(`- Atom costs: ${atomCosts.length}`);
  console.log(`- Vial bonuses: ${vialBonuses.length}`);
  console.log(`- Aggregate bubble bonuses: ${aggregateBubbleBonuses.length}`);
  console.log(`- Aggregate vial bonuses: ${aggregateVialBonuses.length}`);

  console.log(`\n🎯 Next Steps:`);
  console.log(`1. Verify these calculation results match what you see in the game`);
  console.log(`2. If any values are wrong, manually edit: ${outputPath}`);
  console.log(`3. Run tests: yarn test __tests__/domains/alchemy-calculations.test.ts`);
  console.log(`4. Once tests pass, this becomes your regression baseline!`);

  if (aggregateBubbleBonuses.length === 0 && aggregateVialBonuses.length === 0) {
    console.log(`\n⚠️  Note: No aggregate bonuses found. This might mean:`);
    console.log(`   - No bonuses are active for the tested keys`);
    console.log(`   - Different bonus keys are used in your save`);
    console.log(`   - Tests will fail until aggregate data is added`);
  }

} catch (error: any) {
  console.error(`❌ Error generating snapshot:`, error.message);
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error(`\n💡 Hint: Make sure dependencies are installed:`);
    console.error(`   yarn install`);
  }
  process.exit(1);
} 