# **Final Implementation Plan: Snapshot-Based Domain Testing**

## **Overview**

This document outlines the approach for domain-focused testing using snapshot-based calculation validation. This approach has been successfully implemented and tested with the Alchemy, Cooking, Atom Collider, and Compass domains.

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

## **Benefits Realized**

### **✅ Advantages Proven**
1. **No Manual Index Hunting**: Scripts automatically find active bubbles/vials/upgrades
2. **Real Baseline**: Uses current calculations as source of truth
3. **Easy Regeneration**: Simple script execution for new saves
4. **Proper Parameter Handling**: Gets parameters from save data automatically
5. **Comprehensive Coverage**: Includes special cases and edge conditions
6. **Maintainable**: Follows existing project script patterns

### **🎯 Regression Protection**
- **tests passing** with real calculation data
- **Any future changes** to domain calculations will be detected
- **Cross-domain dependencies** can be tracked through save data

### **🚀 Scalability**
- **Template-based approach** for new domains
- **Reusable infrastructure** (tsconfig, test helpers)
- **Clear documentation** for team adoption

## **Templates Available**

- **`__tests__/domains/_domain-template.test.ts.template`**: Test structure template
- **`scripts/generate-alchemy-snapshot.ts`**: Script template to customize
- **`scripts/generate-atomcollider-snapshot.ts`**: Atom collider implementation example
- **`scripts/generate-cooking-snapshot.ts`**: Cooking domain implementation example
- **`scripts/generate-compass-snapshot.ts`**: Compass domain implementation example
