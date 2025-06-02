#!/usr/bin/env ts-node

/**
 * Cooking Calculation Snapshot Generator
 * 
 * Generates expected test results by capturing current cooking calculation outputs.
 * Usage: npx ts-node scripts/generate-cooking-snapshot.ts [save-name]
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
import { Cooking } from '../data/domain/cooking';
import { Player } from '../data/domain/player';
import { Achievement } from '../data/domain/achievements';

const saveName = process.argv[2] || 'demo-save';

console.log(`📸 Generating cooking calculation snapshot for: ${saveName}`);
console.log(`This captures CURRENT calculation results as expected test values.`);
console.log(`Verify these match your game, then they become regression baselines.\n`);

try {
  // Load the game data
  const gameData = loadTestGameData(saveName);
  const cooking = gameData.get('cooking') as Cooking;
  const players = gameData.get('players') as Player[];
  const achievements = gameData.get('achievements') as Achievement[];

  if (!cooking) {
    console.error('❌ No cooking data found in save file');
    process.exit(1);
  }

  console.log(`📊 Cooking Data Summary:`);
  console.log(`- Meals: ${cooking.meals.length}`);
  console.log(`- Kitchens: ${cooking.kitchens.length}`);
  console.log(`- Spices: [${cooking.spices.slice(0, 5).join(', ')}...]`);
  console.log(`- Meals discovered: ${cooking.mealsDiscovered}`);
  console.log(`- Total cooking speed: ${cooking.totalCookingSpeed}`);

  // === CAPTURE MEAL BONUSES ===
  const mealBonuses: any[] = [];
  const mealLevelCosts: any[] = [];
  
  console.log(`\n🍽️ Processing Active Meals:`);
  
  // Get active meals (with levels > 0) for testing
  const activeMeals = cooking.meals.filter(m => m.level > 0).slice(0, 8);
  
  if (activeMeals.length === 0) {
    console.log(`⚠️  No active meals found. Testing first few available meals...`);
    // If no active meals, test first few available meals
    const testMeals = cooking.meals.slice(0, 5);
    testMeals.forEach((meal) => {
      console.log(`  [${meal.mealIndex}] ${meal.name}: Level ${meal.level} (testing at level 1)`);
      
      const bonusAtLevel1 = meal.getBonus(false, meal.mainframeBonus, 1);
      
      mealBonuses.push({
        description: `${meal.name} bonus`,
        index: meal.mealIndex,
        bonus: bonusAtLevel1,
        level: 1,
        notes: `Testing at level 1, bonus key: ${meal.bonusKey}`
      });
    });
  } else {
    activeMeals.forEach((meal) => {
      const bonus = meal.getBonus();
      console.log(`  [${meal.mealIndex}] ${meal.name}: Level ${meal.level} = ${bonus} (key: ${meal.bonusKey})`);
      
      mealBonuses.push({
        description: `${meal.name} bonus`,
        index: meal.mealIndex,
        bonus: bonus,
        level: meal.level,
        notes: `Current level, bonus key: ${meal.bonusKey}`
      });

      // Capture level costs for meals below max level
      if (meal.level < meal.maxLevel) {
        const levelCost = meal.getMealLevelCost();
        console.log(`    Level ${meal.level} → ${meal.level + 1} cost: ${levelCost.toLocaleString()}`);
        
        mealLevelCosts.push({
          description: `${meal.name} level ${meal.level + 1} cost`,
          index: meal.mealIndex,
          fromLevel: meal.level,
          toLevel: meal.level + 1,
          cost: levelCost,
          notes: `Cost to upgrade from level ${meal.level} to ${meal.level + 1}`
        });
      }
    });
  }

  if (mealLevelCosts.length === 0) {
    console.log(`  ℹ️  All tested meals are at max level - no level cost data to capture`);
  }

  // === CAPTURE KITCHEN DATA ===
  const kitchenUpgradeCosts: any[] = [];
  const kitchenSpeeds: any[] = [];
  
  console.log(`\n🔥 Processing Active Kitchens:`);
  
  const activeKitchens = cooking.kitchens.filter(k => k.status > 0).slice(0, 5);
  if (activeKitchens.length === 0) {
    console.log(`⚠️  No active kitchens found.`);
  } else {
    activeKitchens.forEach((kitchen, idx) => {
      console.log(`  Kitchen ${kitchen.index}:`);
      console.log(`    Status: ${kitchen.status}, Meal: ${kitchen.activeMeal}`);
      console.log(`    Speed levels: ${kitchen.mealLevels}, Fire levels: ${kitchen.recipeLevels}, Luck levels: ${kitchen.luckLevels}`);
      
      // Capture upgrade costs if available
      if (kitchen.speedUpgradeCost > 0) {
        kitchenUpgradeCosts.push({
          description: `Kitchen ${kitchen.index} speed upgrade`,
          kitchenIndex: kitchen.index,
          upgradeType: 'speed',
          cost: kitchen.speedUpgradeCost,
          currentLevel: kitchen.mealLevels,
          notes: `Speed upgrade from level ${kitchen.mealLevels}`
        });
      }
      
      if (kitchen.fireUpgradeCost > 0) {
        kitchenUpgradeCosts.push({
          description: `Kitchen ${kitchen.index} fire upgrade`,
          kitchenIndex: kitchen.index,
          upgradeType: 'fire',
          cost: kitchen.fireUpgradeCost,
          currentLevel: kitchen.recipeLevels,
          notes: `Fire upgrade from level ${kitchen.recipeLevels}`
        });
      }

      if (kitchen.luckUpgradecost > 0) {
        kitchenUpgradeCosts.push({
          description: `Kitchen ${kitchen.index} luck upgrade`,
          kitchenIndex: kitchen.index,
          upgradeType: 'luck',
          cost: kitchen.luckUpgradecost,
          currentLevel: kitchen.luckLevels,
          notes: `Luck upgrade from level ${kitchen.luckLevels}`
        });
      }

      // Capture cooking speeds
      const mealSpeed = kitchen.getUpdatedMealSpeed(true, false); // with star sign, without silkrode
      const mealSpeedWithSilkrode = kitchen.getUpdatedMealSpeed(true, true); // with both
      const mealSpeedWithoutStarSign = kitchen.getUpdatedMealSpeed(false, false); // without star sign

      kitchenSpeeds.push({
        description: `Kitchen ${kitchen.index} meal speeds`,
        kitchenIndex: kitchen.index,
        mealSpeed: mealSpeed,
        mealSpeedWithSilkrode: mealSpeedWithSilkrode,
        mealSpeedWithoutStarSign: mealSpeedWithoutStarSign,
        notes: `Speed calculations with different bonuses`
      });
    });
  }

  // === CAPTURE AGGREGATE MEAL BONUSES ===
  const testKeys = [
    'CritChance', 'CritDamage', 'DropRate', 'TotalDamage', 'BaseAcc', 'BaseDef',
    'TotalSTR', 'TotalAGI', 'TotalWIS', 'TotalLUK', 'MinEff', 'ExpPct',
    // Additional cooking-specific keys
    'TotDmg', 'Mcook', 'Cash', 'Rcook', 'Npet', 'BrExp', 'Seff', 'VIP'
  ];

  const aggregateMealBonuses: any[] = [];
  
  console.log(`\n🎯 Testing Aggregate Meal Bonuses:`);
  testKeys.forEach(key => {
    const bonus = cooking.getMealBonusForKey(key);
    if (bonus > 0) {
      console.log(`  ${key}: ${bonus}`);
      aggregateMealBonuses.push({
        key: key,
        bonus: bonus,
        notes: `Aggregate meal bonus for ${key}`
      });
    }
  });

  // If no aggregate bonuses found, try to find any keys that return bonuses
  if (aggregateMealBonuses.length === 0) {
    console.log(`\n🔍 No aggregate bonuses found with common keys. Trying to find active meal bonus keys...`);
    
    // Get unique bonus keys from active meals
    const activeMealKeys = [...new Set(activeMeals.map(m => m.bonusKey))];
    console.log(`  Active meal bonus keys: ${activeMealKeys.join(', ')}`);
    
    activeMealKeys.forEach(key => {
      const bonus = cooking.getMealBonusForKey(key);
      if (bonus > 0) {
        console.log(`  ${key}: ${bonus}`);
        aggregateMealBonuses.push({
          key: key,
          bonus: bonus,
          notes: `Aggregate meal bonus for ${key} (from active meals)`
        });
      }
    });
  }

  // === CAPTURE COOKING SPEEDS ===
  const cookingSpeeds = {
    total: cooking.getTotalCookingSpeed(true, false),
    totalWithSilkrode: cooking.getTotalCookingSpeed(true, true),
    totalWithoutStarSign: cooking.getTotalCookingSpeed(false, false),
    notes: "Total cooking speeds with different bonus combinations"
  };

  console.log(`\n⚡ Total Cooking Speeds:`);
  console.log(`  With star sign: ${cookingSpeeds.total}`);
  console.log(`  With star sign + silkrode: ${cookingSpeeds.totalWithSilkrode}`);
  console.log(`  Without star sign: ${cookingSpeeds.totalWithoutStarSign}`);

  // === CAPTURE MILESTONE COSTS ===
  const milestoneCosts: any[] = [];
  
  console.log(`\n🎯 Processing Milestone Costs:`);
  
  // Find meals below max level for milestone testing
  const milestoneCandidates = activeMeals.filter(m => m.level < m.maxLevel).slice(0, 3);
  
  if (milestoneCandidates.length === 0) {
    console.log(`  ℹ️  All tested meals are at max level - no milestone cost data to capture`);
  } else {
    milestoneCandidates.forEach((meal) => {
      const diamondCost = meal.getCostsTillDiamond();
      const purpleCost = meal.getCostsTillPurple();
      const voidCost = meal.getCostsTillVoid();
      const thirtyCost = meal.getCostsTillThirty();
      
      if (diamondCost > 0 || purpleCost > 0 || voidCost > 0 || thirtyCost > 0) {
        console.log(`  ${meal.name} milestones:`);
        if (diamondCost > 0) console.log(`    To Diamond (L11): ${diamondCost.toLocaleString()}`);
        if (purpleCost > 0) console.log(`    To Purple (L16): ${purpleCost.toLocaleString()}`);
        if (voidCost > 0) console.log(`    To Void (L22): ${voidCost.toLocaleString()}`);
        if (thirtyCost > 0) console.log(`    To L30: ${thirtyCost.toLocaleString()}`);

        milestoneCosts.push({
          description: `${meal.name} milestone costs`,
          index: meal.mealIndex,
          currentLevel: meal.level,
          diamondCost: diamondCost,
          purpleCost: purpleCost,
          voidCost: voidCost,
          thirtyCost: thirtyCost,
          notes: `Costs to reach meal milestones from level ${meal.level}`
        });
      }
    });
  }

  // === COMPILE RESULTS ===
  const results = {
    metadata: {
      saveName: saveName,
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
      domain: "cooking"
    },
    summary: {
      mealsCount: cooking.meals.length,
      activeMealsCount: cooking.meals.filter(m => m.level > 0).length,
      kitchensCount: cooking.kitchens.length,
      activeKitchensCount: cooking.kitchens.filter(k => k.status > 0).length,
      mealsDiscovered: cooking.mealsDiscovered,
      totalCookingSpeed: cooking.totalCookingSpeed
    },
    mealBonuses: mealBonuses,
    mealLevelCosts: mealLevelCosts,
    kitchenUpgradeCosts: kitchenUpgradeCosts,
    kitchenSpeeds: kitchenSpeeds,
    milestoneCosts: milestoneCosts,
    aggregateMealBonuses: aggregateMealBonuses,
    cookingSpeeds: cookingSpeeds
  };

  // === SAVE RESULTS ===
  const outputDir = path.join(__dirname, '..', '__tests__', 'fixtures', 'expected-results', 'cooking');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputFile = path.join(outputDir, `${saveName}.json`);
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log(`\n✅ Snapshot generated successfully!`);
  console.log(`📁 Output: ${outputFile}`);
  console.log(`\n📊 Summary:`);
  console.log(`- Meal bonuses: ${mealBonuses.length}`);
  console.log(`- Meal level costs: ${mealLevelCosts.length}`);
  console.log(`- Kitchen upgrade costs: ${kitchenUpgradeCosts.length}`);
  console.log(`- Kitchen speeds: ${kitchenSpeeds.length}`);
  console.log(`- Milestone costs: ${milestoneCosts.length}`);
  console.log(`- Aggregate meal bonuses: ${aggregateMealBonuses.length}`);

  // === WARNINGS FOR MISSING DATA ===
  const warnings: string[] = [];
  
  if (mealLevelCosts.length === 0) {
    warnings.push('⚠️  No meal level costs captured - all meals may be at max level (potential domain bug?)');
  }
  
  if (milestoneCosts.length === 0) {
    warnings.push('⚠️  No milestone costs captured - all meals may be at max level (potential domain bug?)');
  }
  
  if (aggregateMealBonuses.length === 0) {
    warnings.push('⚠️  No aggregate meal bonuses found - potential implementation issue');
  }
  
  if (kitchenUpgradeCosts.length === 0) {
    warnings.push('⚠️  No kitchen upgrade costs found - kitchens may be maxed or not active');
  }
  
  if (warnings.length > 0) {
    console.log(`\n🚨 Data Coverage Warnings:`);
    warnings.forEach(warning => console.log(`   ${warning}`));
    console.log(`   These warnings may indicate domain bugs or missing test coverage.`);
  }

  console.log(`\n🔍 Next Steps:`);
  console.log(`1. Verify the generated values match your game`);
  console.log(`2. Run: yarn test __tests__/domains/cooking-calculations.test.ts`);
  console.log(`3. All tests should pass if calculations are correct`);
  if (warnings.length > 0) {
    console.log(`4. Consider investigating the warnings above for potential domain bugs`);
  }

} catch (error) {
  console.error('❌ Error generating snapshot:', error);
  process.exit(1);
} 