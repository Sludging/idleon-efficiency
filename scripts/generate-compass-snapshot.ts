import { loadTestGameData } from '../__tests__/utils/test-data-loader';
import { Compass, CompassUpgrade, DustType } from '../data/domain/compass';
import * as fs from 'fs';
import * as path from 'path';

// Mock browser APIs for Node.js execution
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null
} as Storage;

global.sessionStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
  length: 0,
  key: () => null
} as Storage;

function generateCompassSnapshot(saveName: string) {
  console.log(`Generating compass snapshot for save: ${saveName}`);

  try {
    const data = loadTestGameData(saveName);
    const compass = data.get('compass') as Compass;

    if (!compass) {
      console.error('Compass domain not found in save data');
      return;
    }

    if (!compass.upgrades || compass.upgrades.length === 0) {
      console.error('No compass upgrades found in save data');
      return;
    }

    const results: any = {
      saveName: saveName,
      generatedAt: new Date().toISOString(),
      compassUpgradeBonuses: [],
      compassUpgradeCosts: [],
      compassUpgradeCostsToUnlock: [],
      dustAmounts: [],
      tempestDamage: 0,
      dustMultiplier: 0,
      compassState: {
        totalCompassLevel: compass.totalCompassLevel,
        totalDustsCollected: compass.totalDustsCollected,
        completedMasteries: compass.completedMasteries,
        medallionCount: compass.medallionsCollected?.length || 0,
        titanCount: compass.titansKilled?.length || 0,
        portalCount: compass.portalsCompleted?.length || 0,
        hasWindWalker: !!compass.bestWindWalker
      }
    };

    console.log(`Found ${compass.upgrades.length} compass upgrades`);

    // Test upgrade bonuses for upgrades with levels > 0 and bonus > 0
    const upgradesWithBonuses = compass.upgrades.filter(upgrade => 
      upgrade.level > 0 && upgrade.bonus > 0
    );
    
    console.log(`Found ${upgradesWithBonuses.length} upgrades with bonuses`);
    
    upgradesWithBonuses.slice(0, 15).forEach(upgrade => {
      results.compassUpgradeBonuses.push({
        id: upgrade.id,
        name: upgrade.data.name,
        level: upgrade.level,
        bonus: upgrade.bonus,
        description: `${upgrade.data.name} (ID ${upgrade.id}) level ${upgrade.level}`
      });
    });

    // Test upgrade costs for affordable upgrades
    const affordableUpgrades = compass.upgrades.filter(upgrade => 
      upgrade.level < upgrade.data.maxLevel && upgrade.cost > 0 &&
      compass.canAffordUpgrade(upgrade) && upgrade.unlocked
    );

    console.log(`Found ${affordableUpgrades.length} affordable upgrades`);

    affordableUpgrades.slice(0, 10).forEach(upgrade => {
      results.compassUpgradeCosts.push({
        id: upgrade.id,
        name: upgrade.data.name,
        level: upgrade.level,
        cost: upgrade.cost,
        dustType: upgrade.data.dustType,
        description: `${upgrade.data.name} (ID ${upgrade.id}) level ${upgrade.level} -> ${upgrade.level + 1}`
      });
    });

    // Test upgrade costs to unlock for NEXT upgrades in each path (verifiable in-game)
    // Find the immediate next upgrade to unlock in each upgrade path
    const pathTypes = ["Elemental", "Fighter", "Survival", "Nomadic", "Abomination"];
    const nextUpgradesToUnlock = [];

    pathTypes.forEach(pathType => {
      const pathMetadata = compass.upgradeMetadata[pathType];
      if (pathMetadata && pathMetadata.pathUpgrades && pathMetadata.pathLevel < pathMetadata.pathUpgrades.length) {
        const nextUpgradeId = pathMetadata.pathUpgrades[pathMetadata.pathLevel];
        const nextUpgrade = compass.upgrades.find(u => u.id === nextUpgradeId);
        
        if (nextUpgrade && !nextUpgrade.unlocked && nextUpgrade.costToUnlock > 0) {
          nextUpgradesToUnlock.push(nextUpgrade);
        }
      }
    });

    console.log(`Found ${nextUpgradesToUnlock.length} next upgrades to unlock (verifiable in-game)`);

    nextUpgradesToUnlock.forEach(upgrade => {
      results.compassUpgradeCostsToUnlock.push({
        id: upgrade.id,
        name: upgrade.data.name,
        costToUnlock: upgrade.costToUnlock,
        dustType: upgrade.data.dustType,
        description: `${upgrade.data.name} (ID ${upgrade.id}) next upgrade to unlock in path`
      });
    });

    // Test dust amounts
    Object.values(DustType).forEach(dustType => {
      if (typeof dustType === 'number') {
        const amount = compass.availableDust[dustType];
        if (amount > 0) {
          results.dustAmounts.push({
            dustType: dustType,
            dustName: DustType[dustType],
            amount: amount,
            description: `${DustType[dustType]} amount`
          });
        }
      }
    });

    console.log(`Found ${results.dustAmounts.length} dust types with amounts`);

    // Test tempest damage calculation
    const tempestDamage = compass.calculateTempestDamage();
    results.tempestDamage = tempestDamage;
    console.log(`Tempest damage: ${tempestDamage}`);

    // Test dust multiplier calculation
    const dustMultiplier = compass.calculateDustMultiplier();
    results.dustMultiplier = dustMultiplier;
    console.log(`Dust multiplier: ${dustMultiplier}`);

    // Ensure output directory exists
    const outputDir = path.join(__dirname, '..', '__tests__', 'fixtures', 'expected-results', 'compass');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write results to file
    const outputPath = path.join(outputDir, `${saveName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

    console.log(`\nSnapshot generated successfully!`);
    console.log(`Output written to: ${outputPath}`);
    console.log(`\nSummary:`);
    console.log(`- ${results.compassUpgradeBonuses.length} upgrade bonuses`);
    console.log(`- ${results.compassUpgradeCosts.length} upgrade costs`);
    console.log(`- ${results.compassUpgradeCostsToUnlock.length} costs to unlock (next in path)`);
    console.log(`- ${results.dustAmounts.length} dust amounts`);
    console.log(`- Tempest damage: ${results.tempestDamage}`);
    console.log(`- Dust multiplier: ${results.dustMultiplier}`);

  } catch (error) {
    console.error('Error generating compass snapshot:', error);
    process.exit(1);
  }
}

// Get save name from command line arguments
const saveName = process.argv[2];
if (!saveName) {
  console.error('Usage: npx ts-node --project ./tsconfig.json ./generate-compass-snapshot.ts <save-name>');
  console.error('Example: npx ts-node --project ./tsconfig.json ./generate-compass-snapshot.ts Sludge');
  process.exit(1);
}

generateCompassSnapshot(saveName); 