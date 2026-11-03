import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { Cloudsave, safeJsonParse } from '../../../data/domain/cloudsave';
import { initJellyObstructionRepo } from '../../../data/domain/data/JellyObstructionRepo';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';

describe('Alchemy account progression status', () => {
  let alchemy: Alchemy;
  let save: Cloudsave;
  let accountOptions: number[];
  let playerP2WLevels: number[];

  beforeAll(() => {
    alchemy = loadGameDataFromSave(saveName).get('alchemy') as Alchemy;
    save = loadTestSave(saveName);
    accountOptions = safeJsonParse<number[]>(save, 'OptLacc', []);
    playerP2WLevels = safeJsonParse<number[][]>(save, 'CauldronP2W', [])[3];
  });

  const savedResults = [
    {
      description: 'retains the Prisma Fragment balance in fragments',
      field: 'Alchemy.prismaFragments',
      source: 'OptLacc[383]',
      actual: () => alchemy.prismaFragments,
      expected: () => Number(accountOptions[383]),
    },
    {
      description: 'retains the Sigil Syrup balance in syrup units',
      field: 'Alchemy.sigilSyrup',
      source: 'OptLacc[409]',
      actual: () => alchemy.sigilSyrup,
      expected: () => Number(accountOptions[409]),
    },
    {
      description: 'retains the account-wide player Alchemy Speed upgrade level',
      field: 'P2W.playerSpeedLevel',
      source: 'CauldronP2W[3][0]',
      actual: () => alchemy.p2w.playerSpeedLevel,
      expected: () => Number(playerP2WLevels[0]),
    },
    {
      description: 'retains the account-wide player Extra EXP upgrade level',
      field: 'P2W.playerExpLevel',
      source: 'CauldronP2W[3][1]',
      actual: () => alchemy.p2w.playerExpLevel,
      expected: () => Number(playerP2WLevels[1]),
    },
  ];

  it.each(savedResults)('$description', ({ field, source, actual, expected }) => {
    const domainValue = actual();
    expect(domainValue).toMatchLiveGameWithDetails(expected(), {
      tolerance: 0,
      context: `${field} from retained ${saveName} save ${source}`,
    });
  });

  describe('native account multipliers', () => {
    const nativeResults = [
      {
        description: 'prepares the account-wide Prisma bonus multiplier as a dimensionless factor',
        field: 'Alchemy.prismaticMultiplier',
        source: 'ArcaneType("PrismaBonusMult", 0, 0)',
        label: 'alchemy_prismatic_bonus',
        actual: () => alchemy.prismaticMultiplier,
      },
      {
        description: 'prepares the overall vial bonus multiplier as a dimensionless factor',
        field: 'Alchemy.vialBonusMultiplier',
        source: 'CauldronStats("VialBonus", 4, 0, 0) / ArbitraryCode5Inputs(native vial curve, saved vial level)',
        label: 'alchemy_vial_bonus_multiplier',
        actual: () => alchemy.vialBonusMultiplier,
      },
    ];

    it.each(nativeResults)('$description', ({ field, source, label, actual }) => {
      const domainValue = actual();
      const results = loadExtractionResults('alchemy-progression-status-data.json');
      validateExtractionHealth(results);

      expect(domainValue).toMatchLiveGameWithDetails(getExtractedValue(results, label), {
        tolerance: 0,
        context: `${field} from native ${source}`,
      });
    });
  });

  describe('Prisma strength sources', () => {
    const sourceSpecs: {
      name: string;
      field: keyof Alchemy['prismaticMultiplierSources'];
      label: string;
      scale: number;
    }[] = [
      { name: 'Tesseract', field: 'tesseractPercent', label: 'arcane_upgrade_45_bonus', scale: 1 },
      { name: 'Arcade', field: 'arcadePercent', label: 'arcade_bonus_54', scale: 1 },
      { name: 'Sushi', field: 'sushiPercent', label: 'sushi_rog_bonus_qty_23', scale: 1 },
      { name: 'Jelly Operator', field: 'jellyOperatorPercent', label: 'jelly_rog_bonus_qty_36', scale: 1 },
      { name: 'World 6 trophy', field: 'world6TrophyPercent', label: 'world_6_trophy_bonus', scale: 1 },
      { name: 'Gaming palette', field: 'palettePercent', label: 'palette_bonus_28', scale: 1 },
      // Native Prisma strength adds 0.2 percentage points per purple sigil and 50 per companion bonus unit.
      { name: 'purple sigils', field: 'purpleSigilsPercent', label: 'total_purple_sigils', scale: 0.2 },
      { name: 'Exotic Market', field: 'exoticMarketPercent', label: 'exotic_market_bonus_48', scale: 1 },
      { name: 'Legend talent', field: 'legendTalentPercent', label: 'legend_talent_36_bonus', scale: 1 },
      { name: 'companion', field: 'companionPercent', label: 'companion_88_bonus', scale: 50 },
    ];

    it.each(sourceSpecs)('prepares the $name contribution in percentage points', ({ field, label, scale }) => {
      const results = loadExtractionResults('alchemy-prismatic-multiplier-data.json');
      validateExtractionHealth(results);
      const expected = getExtractedValue(results, label) * scale;

      expect(alchemy.prismaticMultiplierSources[field]).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Alchemy.prismaticMultiplierSources.${field} from native ${label}`,
      });
    });
  });

  describe('vial strength sources', () => {
    it('prepares the Lab multiplier as a dimensionless factor', () => {
      const results = loadExtractionResults('alchemy-vial-sources-data.json');
      validateExtractionHealth(results);

      expect(alchemy.vialMultiplierSources.labFactor).toMatchLiveGameWithDetails(
        getExtractedValue(results, 'vial_lab_factor'),
        { tolerance: 0, context: 'Vial strength from the native MainframeBonus(10) branch' },
      );
    });

    it('prepares the active Vial Mastery contribution from saved maxed vials', () => {
      const rift = safeJsonParse<number[]>(save, 'Rift', []);
      const cauldronInfo = safeJsonParse<Record<string, number | string>[]>(save, 'CauldronInfo', []);
      const maxedVials = Object.entries(cauldronInfo[4])
        .filter(([key, level]) => key !== 'length' && Number(level) === 13).length;
      // Native VialBonus enables mastery after Rift 34 and adds two percentage points per maxed vial.
      const expected = rift[0] > 34 ? 2 * maxedVials : 0;

      expect(alchemy.vialMultiplierSources.vialMasteryPercent).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: 'Vial Mastery percentage points from retained Rift progress and vial levels',
      });
    });

    it('prepares the Upgrade Vault contribution in percentage points', () => {
      const results = loadExtractionResults('upgrade-vault-bonus-data.json');
      validateExtractionHealth(results);

      expect(alchemy.vialMultiplierSources.vaultPercent).toMatchLiveGameWithDetails(
        getExtractedValue(results, 'vault_bonus_42'),
        { tolerance: 0, context: 'Vial strength from native Upgrade Vault bonus 42' },
      );
    });

    it('prepares the separate Meritocracy multiplier contribution in percent', () => {
      const results = loadExtractionResults('vote-ballot-data.json');
      validateExtractionHealth(results);
      const meritocracyBonuses = results.extractions.meritocracy_earned.result as number[];

      expect(alchemy.vialMultiplierSources.meritocracyPercent).toMatchLiveGameWithDetails(
        meritocracyBonuses[20],
        { tolerance: 0, context: 'Vial strength from native Meritocracy bonus 20' },
      );
    });
  });

  describe('source reward previews', () => {
    it('separates the obtainable Jelly Operator Prisma reward from its earned contribution', () => {
      const results = loadExtractionResults('alchemy-prismatic-multiplier-data.json');
      validateExtractionHealth(results);
      const nativeBonus = getExtractedValue(results, 'jelly_rog_bonus_qty_36');
      const intrinsicBonus = initJellyObstructionRepo().find(entry => entry.index === 36)!.data.bonusValue;
      const research = safeJsonParse<number[][]>(save, 'Research', []);
      const reward = alchemy.prismaticMultiplierSourceRewards.jellyOperatorPercent;

      expect(reward.potentialValue).toMatchLiveGameWithDetails(intrinsicBonus, {
        tolerance: 0,
        context: 'Jelly Operator Prisma reward from generated obstruction 36 intrinsic bonus',
      });
      expect(reward.active).toBe(Number(research[7][9]) > 36);
      expect(reward.basis).toBe('value');
      expect(alchemy.prismaticMultiplierSources.jellyOperatorPercent).toMatchLiveGameWithDetails(nativeBonus, {
        tolerance: 0,
        context: 'Earned Jelly Operator Prisma contribution from native jelly_rog_bonus_qty_36',
      });
    });

    it('applies only the earned Meritocracy vial contribution', () => {
      const results = loadExtractionResults('vote-ballot-data.json');
      validateExtractionHealth(results);
      const nativeEarned = results.extractions.meritocracy_earned.result as number[];
      expect(alchemy.vialMultiplierSources.meritocracyPercent).toMatchLiveGameWithDetails(nativeEarned[20], {
        tolerance: 0,
        context: 'Earned Meritocracy vial contribution from native meritocracy_earned bonus 20',
      });
    });

    it('applies the earned companion Prisma contribution only while active', () => {
      const results = loadExtractionResults('alchemy-prismatic-multiplier-data.json');
      validateExtractionHealth(results);
      const nativeBonus = getExtractedValue(results, 'companion_88_bonus');
      const reward = alchemy.prismaticMultiplierSourceRewards.companionPercent;

      expect(reward.active).toBe(nativeBonus > 0);
      expect(reward.basis).toBe('whenUnlocked');
      expect(alchemy.prismaticMultiplierSources.companionPercent).toMatchLiveGameWithDetails(nativeBonus * 50, {
        tolerance: 0,
        context: 'Earned companion Prisma contribution from native companion_88_bonus scaled by 50',
      });
    });

    it('keeps the Lab preview out of actual vial strength until its earned factor applies', () => {
      const results = loadExtractionResults('alchemy-vial-sources-data.json');
      validateExtractionHealth(results);
      const progressionResults = loadExtractionResults('alchemy-progression-status-data.json');
      validateExtractionHealth(progressionResults);
      const nativeFactor = getExtractedValue(results, 'vial_lab_factor');
      const reward = alchemy.vialMultiplierSourceRewards.labFactor;

      expect(reward.potentialValue).toMatchLiveGameWithDetails(2, {
        tolerance: 0,
        context: 'Lab vial reward from the native fixed MainframeBonus(10) factor branch',
      });
      expect(reward.active).toBe(nativeFactor === 2);
      expect(reward.basis).toBe('whenUnlocked');
      expect(alchemy.vialMultiplierSources.labFactor).toMatchLiveGameWithDetails(nativeFactor, {
        tolerance: 0,
        context: 'Earned Lab vial factor from native vial_lab_factor',
      });
      expect(alchemy.vialBonusMultiplier).toMatchLiveGameWithDetails(
        getExtractedValue(progressionResults, 'alchemy_vial_bonus_multiplier'),
        { tolerance: 0, context: 'Aggregate vial strength includes the native earned Lab factor only once' },
      );
    });
  });
});
