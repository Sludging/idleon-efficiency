# **Final Implementation Plan: Snapshot-Based Domain Testing**

## **Overview**

This document outlines the **final** approach for domain-focused testing using snapshot-based calculation validation. This approach has been successfully implemented and tested with the Alchemy, Cooking, Atom Collider, and Compass domains.

## **Core Principles**

1. **Snapshot Testing**: Capture current calculation results as "expected" baselines
2. **Script-Generated Data**: Use TypeScript scripts to automatically extract calculation results  
3. **Developer Verification**: Developer verifies snapshots match in-game values
4. **Regression Detection**: Future calculation changes get caught automatically
5. **Domain-Specific**: Each domain tested independently with its key calculation methods

## **Final Architecture**

### **✅ Successfully Implemented Components**

#### **1. Scripts Infrastructure**
- **`scripts/tsconfig.json`**: Separate TypeScript configuration for scripts
- **`scripts/generate-[domain]-snapshot.ts`**: Domain-specific snapshot generators
- **Standalone execution**: Scripts run independently via `npx ts-node`

#### **2. Test Structure**
- **`__tests__/domains/[domain]-calculations.test.ts`**: Snapshot-based calculation tests
- **`__tests__/fixtures/expected-results/[domain]/[save-name].json`**: Generated expected results
- **`__tests__/utils/calculation-helpers.ts`**: Precise calculation comparison functions

#### **3. Domain Coverage**
- **Basic Infrastructure**: ✅ **Fully implemented** (2/2 tests passing)
  - Test data loading infrastructure
  - Save file handling (missing files, valid saves)
  - Domain structure validation
- **Alchemy Domain**: ✅ **Fully implemented** (8/8 tests passing)
  - Bubble bonuses (regular + special types)
  - Material & atom costs  
  - Vial bonuses
  - Aggregate calculations
- **Cooking Domain**: ✅ **Fully implemented** (10/10 tests passing)
  - Meal bonuses and costs
  - Kitchen upgrade calculations
  - Meal milestone progression
  - Comprehensive coverage with warnings for potential domain bugs
- **Atom Collider Domain**: ✅ **Fully implemented** (11/11 tests passing)
  - Atom bonuses (regular + special types)
  - Atom costs (upgrade, unlock, max level)
  - Special atom mechanics (HydrogenAtom, CarbonAtom, FluorideAtom)
  - Particle count validation
- **Compass Domain**: ✅ **Fully implemented** (11/11 tests passing)
  - Compass upgrade bonuses and costs (regular, to-max, to-unlock)
  - Dust amounts validation
  - Tempest damage calculation
  - Dust multiplier calculation
  - Efficiency calculations (damage and dust multipliers)
  - Compass state validation (levels, collections, Wind Walker)

**Total Test Coverage**: ✅ **42/42 tests passing** across 5 test suites

## **Proven Workflow**

### **For Existing Domains (with save data)**

1. **Create Snapshot Script**:
   ```bash
   # Copy and customize the alchemy script template
   cp scripts/generate-alchemy-snapshot.ts scripts/generate-player-snapshot.ts
   # Update domain imports and calculation logic
   ```

2. **Generate Expected Results**:
   ```bash
   cd scripts
   npx ts-node --project ./tsconfig.json ./generate-player-snapshot.ts your-save-name
   ```

3. **Verify & Test**:
   ```bash
   # Check generated values match the game
   # Run tests to ensure they pass
   yarn test __tests__/domains/player-calculations.test.ts
   ```

### **For New Domains (test-driven development)**

1. **Start with Structure Tests**: Basic data loading and method existence
2. **Add Known Calculations**: Tests with manually determined expected values  
3. **Build Implementation**: Develop domain code to pass the tests
4. **Generate Snapshots**: Once working, use scripts for regression baselines

## **Technical Implementation Details**

### **Script Configuration**

**`scripts/tsconfig.json`** enables TypeScript scripts with project imports:
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2020",
    "esModuleInterop": true,
    "strict": false,
    "skipLibCheck": true
  },
  "include": [
    "./**/*.ts",
    "../__tests__/**/*.ts", 
    "../data/**/*.tsx",
    "../data/**/*.ts"
  ]
}
```

### **Browser API Mocking**

Scripts mock browser APIs for Node.js execution:
```typescript
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null
} as Storage;
```

### **Calculation Testing Utilities**

**Precise comparison** with configurable tolerance:
```typescript
export const expectCalculationToMatch = (
  actual: number,
  expected: number,
  tolerance: number = 0.05,
  description?: string
) => {
  const difference = Math.abs(actual - expected) / Math.max(Math.abs(expected), 1);
  if (difference > tolerance) {
    throw new Error(`Calculation mismatch: expected ${expected}, got ${actual}`);
  }
};
```

### **Test Structure Pattern**

**Explicit failure** when expected data is missing:
```typescript
it('calculates bubble bonuses correctly', () => {
  if (!expectedResults.bubbleBonuses || expectedResults.bubbleBonuses.length === 0) {
    throw new Error('No valid bubble bonus test data found - run snapshot script to generate data');
  }
  
  expectedResults.bubbleBonuses.forEach((expected: any) => {
    const actualBonus = bubble.getBonus();
    expectCalculationToMatch(actualBonus, expected.bonus, 0.05, expected.description);
  });
});
```

## **Alchemy Domain: Complete Implementation**

### **Generated Test Data Coverage**
- **12 bubble bonuses** (3 per cauldron)
- **15 special bubbles** (ImpactedBySlabBubble, DailyDripBubble, etc.)
- **4 material costs** with proper UI parameters
- **4 atom costs** for expensive upgrades
- **3 vial bonuses** from active vials
- **11 aggregate bubble bonuses** by key
- **1 aggregate vial bonus** by key

### **Key Implementation Insights**

1. **Parameter Sources**: Cost calculations use parameters from save data, not manual config
   ```typescript
   const undevelopedCostsBubbleLevel = alchemy.getUndevelopedCostsBubbleLevel();
   const barleyBrewVialLevel = alchemy.getBarleyBrewVialLevel();
   const hasAlchemyAchievement = achievements[AchievementConst.SmartBoiIndex]?.completed;
   ```

2. **Special Bubble Discovery**: Search all bubbles for special types (DailyDripBubble, etc.)
   ```typescript
   cauldron.bubbles.forEach((bubble) => {
     if (bubble.constructor.name !== 'Bubble' && bubble.level > 0) {
       // Capture special bubble bonus
     }
   });
   ```

3. **Comprehensive Aggregate Testing**: Test key bonus aggregations
   ```typescript
   const testKeys = ['MinEff', 'TotalSTR', 'TotalAGI', 'DropRate', 'CritChance'];
   testKeys.forEach(key => {
     const bonus = alchemy.getBubbleBonusForKey(key);
     if (bonus > 0) aggregateBonuses.push({ key, bonus });
   });
   ```

## **Atom Collider Domain: Complete Implementation**

### **Generated Test Data Coverage**
- **11 atom bonuses** (active atoms + zero-level testing)
- **4 special atom bonuses** (HydrogenAtom, CarbonAtom, OxygenAtom, FluorideAtom)
- **5 atom upgrade costs** with proper cost calculation parameters
- **5 atom unlock costs** for cost-to-unlock validation
- **1 atom max level cost** for non-maxed atoms
- **10 atom max levels** for max level validation
- **1 particle count** for exact particle validation

### **Key Implementation Insights**

1. **Cost Parameter Sources**: Cost calculations use parameters from multiple domains
   ```typescript
   const colliderBuildingLevel = construction.buildings.find(building => building.name == "Atom Collider")?.level ?? 0;
   const nenoBonus = collider.atoms[9].getBonus();
   const bubbleBonusY5 = alchemy.getBubbleBonusForKey("Y5");
   const meritBonus = (taskboard.merits.find(merit => merit.descLine1.includes("reduction in Atom Upgrade Costs"))?.level ?? 0) * 7;
   ```

2. **Special Atom Discovery**: Automatically detect special atom types and their unique properties
   ```typescript
   if (atom.constructor.name !== 'Atom') {
     // Capture special atom calculations
     if (atom instanceof CarbonAtom) {
       extraLevels = atom.getExtraLevels();
     }
   }
   ```

3. **Cross-Domain Dependencies**: Special atoms depend on other domain data
   ```typescript
   (collider.atoms[0] as HydrogenAtom).daysSinceUpgrade = optLacc[134];
   (collider.atoms[5] as CarbonAtom).wizardTowersOver50 = construction.buildings.slice(9, 18).reduce(...);
   (collider.atoms[8] as FluorideAtom).voidMeals = cooking.meals.reduce(...);
   ```

## **Compass Domain: Complete Implementation**

### **Generated Test Data Coverage**
- **15 compass upgrade bonuses** for upgrades with levels > 0
- **10 compass upgrade costs** for affordable upgrades
- **8 compass upgrade costs to max** for upgrades with reasonable max costs
- **5 compass upgrade costs to unlock** for locked upgrades
- **4 dust amounts** (Stardust, Moondust, Solardust, Cooldust)
- **1 tempest damage calculation** (complex multi-step calculation)
- **1 dust multiplier calculation** (multi-bonus aggregation)
- **5 damage efficiency upgrades** from efficiency calculator
- **5 dust efficiency upgrades** from efficiency calculator
- **7 compass state validations** (levels, collections, Wind Walker status)

### **Key Implementation Insights**

1. **Complex Damage Calculation**: Tempest damage involves multiple multiplier layers
   ```typescript
   // Step-by-step calculation matching game source code
   let damage = 5 + flatDamageBonus;
   damage *= Math.pow(1.05, equipmentBonus);
   damage *= etcBonusMultiplier;
   damage *= coolddustMultiplier;
   damage *= masteryMultiplier;
   damage *= medallionMultiplier;
   damage *= (1 + percentageBonuses / 100);
   ```

2. **Cross-Domain Dependencies**: Compass calculations depend on multiple other domains
   ```typescript
   // Wind Walker player equipment bonuses
   const windWalker = players.find(player => player.classId === 29);
   // Pristine charm bonuses from sneaking domain
   const pristineBonus19 = sneaking.pristineCharms.find(charm => charm.index === 19)?.getBonus();
   // Arcade bonuses from arcade domain
   const arcadeBonus47 = arcade.bonuses[47]?.getBonus();
   ```

3. **Efficiency System Testing**: Advanced efficiency calculation system
   ```typescript
   const calculators = [
     new DamageEfficiencyCalculator(),
     new DustEfficiencyCalculator()
   ];
   calculators.forEach(calculator => {
     const results = engine.calculateEfficiency(compass, calculator);
     compass.efficiencyResults.set(calculator.name, results);
   });
   ```

## **Benefits Realized**

### **✅ Advantages Proven**
1. **No Manual Index Hunting**: Scripts automatically find active bubbles/vials/upgrades
2. **Real Baseline**: Uses current calculations as source of truth
3. **Easy Regeneration**: Simple script execution for new saves
4. **Proper Parameter Handling**: Gets parameters from save data automatically
5. **Comprehensive Coverage**: Includes special cases and edge conditions
6. **Maintainable**: Follows existing project script patterns

### **🎯 Regression Protection**
- **42/42 tests passing** with real calculation data
- **Any future changes** to domain calculations will be detected
- **Cross-domain dependencies** can be tracked through save data

### **🚀 Scalability**
- **Template-based approach** for new domains
- **Reusable infrastructure** (tsconfig, test helpers)
- **Clear documentation** for team adoption

## **Next Steps**

1. **Extend to Other Domains**: Use proven pattern for Player, Construction, etc.
2. **Team Adoption**: Update development workflow to include testing
3. **Continuous Integration**: Ensure tests run on code changes
4. **Documentation Updates**: Keep implementation guide current

## **Templates Available**

- **`__tests__/domains/_domain-template.test.ts.template`**: Test structure template
- **`scripts/generate-alchemy-snapshot.ts`**: Script template to customize
- **`scripts/generate-atomcollider-snapshot.ts`**: Atom collider implementation example
- **`scripts/generate-cooking-snapshot.ts`**: Cooking domain implementation example
- **`scripts/generate-compass-snapshot.ts`**: Compass domain implementation example
- **Domain-specific calculation patterns**: Established across multiple domain implementations

## **Conclusion**

The snapshot-based testing approach has proven successful with:
- **Complete basic infrastructure coverage** (2/2 tests passing)
- **Complete alchemy domain coverage** (8/8 tests passing)
- **Complete cooking domain coverage** (10/10 tests passing)
- **Complete atom collider domain coverage** (11/11 tests passing)
- **Complete compass domain coverage** (11/11 tests passing)
- **Total: 42/42 tests passing** - 100% test suite success rate
- **Zero manual configuration effort** 
- **Real regression protection capability**
- **Extensible pattern** for other domains

This approach should be used for all future domain testing implementations. 