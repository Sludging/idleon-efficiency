import { Player } from '../../../data/domain/player';
import { Gallery } from '../../../data/domain/world-7/gallery';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Gallery Domain - Saved State and Character Bonuses', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;
  let gallery: Gallery;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults('gallery-summary-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
    gallery = gameData.get('gallery') as Gallery;
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });
  it('exposes current and next source contributions with podium units', () => {
    expect(gallery.podiumCapacityCap).toBe(19);
    expect(gallery.podiumCapacity).toBe(
      Math.min(gallery.podiumCapacityCap, gallery.capacitySources.reduce((total, source) => total + source.amount, 0)),
    );
    expect(gallery.podiumCapacity).toBe(getExtractedValue(extractionResults, 'podium_capacity'));
    for (const tier of [2, 3, 4] as const) {
      const breakdown = gallery.podiumTierSources[tier];
      expect(breakdown.unit).toBe('podiums');
      expect(breakdown.threshold).toBe(
        getExtractedValue(extractionResults, `podiums_tier_${tier}`),
      );
      expect(breakdown.threshold).toBe(
        Math.round(breakdown.sources.reduce((total, source) => total + source.amount, 0)),
      );
      const exactGradeSources = gallery.podiumGradeSources[tier];
      expect(exactGradeSources.some(source => /^grade\dThreshold$/.test(source.source))).toBe(false);
      expect(exactGradeSources.every(source => breakdown.sources.includes(source))).toBe(true);
    }
    expect(gallery.shelfMultiplier).toBe(0.3);
    const sourceRows = [
      ...gallery.capacitySources,
      ...([2, 3, 4] as const).flatMap(tier => gallery.podiumTierSources[tier].sources),
    ];
    expect(sourceRows.every(source => source.active === (source.amount > 0))).toBe(true);
    expect(sourceRows.every(source => source.unit === 'podiums')).toBe(true);
    expect(sourceRows.every(source =>
      (source.potentialAmount === undefined || Number.isFinite(source.potentialAmount))
      && (source.cap === undefined || Number.isFinite(source.cap)),
    )).toBe(true);
    expect(sourceRows.every(source =>
      (source.potentialAmount === undefined || source.potentialAmount >= source.amount)
      && (source.cap === undefined || source.cap >= source.amount),
    )).toBe(true);
    expect(gallery.capacitySources.find(source => source.source === 'base')).toMatchObject({
      amount: 1,
      active: true,
      cap: 1,
      unit: 'podiums',
    });
  });

  it('marks bag trophies and nametags that can still be deposited account-wide', () => {
    const storage = gameData.get('storage');
    const bagCounts = new Map<string, number>();
    for (const bag of storage.playerStorage) {
      for (const item of bag) {
        if (item.count > 0) bagCounts.set(item.internalName, (bagCounts.get(item.internalName) ?? 0) + item.count);
      }
    }

    for (const trophy of gallery.trophies) {
      expect(trophy.hasPendingDeposit).toBe(
        (bagCounts.get(trophy.internalName) ?? 0) > 0 && trophy.count === 0,
      );
    }
    for (const nametag of gallery.nametags) {
      expect(nametag.hasPendingDeposit).toBe(
        (bagCounts.get(nametag.internalName) ?? 0) > 0 && nametag.count < 5,
      );
    }
  });


  it('matches available podium tier counts against native cumulative grades', () => {
    const capacity = getExtractedValue(extractionResults, 'podium_capacity');
    const tier2OrHigher = Math.min(getExtractedValue(extractionResults, 'podiums_tier_2'), capacity);
    const tier3OrHigher = Math.min(getExtractedValue(extractionResults, 'podiums_tier_3'), capacity);
    const tier4 = Math.min(getExtractedValue(extractionResults, 'podiums_tier_4'), capacity);

    expect(gallery.podiums.filter(podium => podium.available)).toHaveLength(capacity);
    expect(gallery.getPodiumCount(1)).toBe(capacity - tier2OrHigher);
    expect(gallery.getPodiumCount(2)).toBe(tier2OrHigher - tier3OrHigher);
    expect(gallery.getPodiumCount(3)).toBe(tier3OrHigher - tier4);
    expect(gallery.getPodiumCount(4)).toBe(tier4);
  });

  it('matches deposited trophy placement and collection state', () => {
    const placements = extractionResults.extractions.gallery_placements.result as number[];
    const counts = new Map<number, number>();
    placements.forEach(index => {
      if (index >= 1) counts.set(Math.round(index), (counts.get(Math.round(index)) ?? 0) + 1);
    });

    const domainPlacement = (value: number | undefined): number =>
      value !== undefined && value >= 1 ? Math.round(value) : 0;
    expect(gallery.shelves.map(trophy => trophy?.index ?? 0)).toEqual(
      Array.from({ length: 48 }, (_, index) => domainPlacement(placements[index])),
    );
    expect(gallery.podiums.slice(0, Math.max(0, placements.length - 48)).map(podium => podium.trophy?.index ?? 0)).toEqual(
      placements.slice(48).map(domainPlacement),
    );
    for (const trophy of gallery.trophies) {
      const depositedCount = counts.get(trophy.index) ?? 0;
      expect(trophy.count).toBe(depositedCount);
      expect(trophy.obtained).toBe(depositedCount > 0);
    }
  });

  it('matches deposited nametag counts and stack multipliers', () => {
    const counts = extractionResults.extractions.nametag_counts.result as number[];
    const stackFactors = [1, 1.6, 2, 2.3, 2.5];
    for (const nametag of gallery.nametags) {
      const count = counts[nametag.index] ?? 0;
      const factor = count > 0 ? stackFactors[Math.min(4, Math.round(count - 1))] : 0;
      expect(nametag.count).toBe(count);
      expect(nametag.stackMultiplier).toBe(factor);
    }
  });

  it('matches the native multiplier and exposes matching chip variants for this character', () => {
    expect(gallery.getBonusMultiplier(player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'bonus_multiplier'),
      { tolerance: 0, context: 'Target character Gallery bonus multiplier' },
    );
    const silkrodeMotherboardEquipped = player.getChipBonus('troph') > 0;
    expect(gallery.getBonusMultiplierForChip(silkrodeMotherboardEquipped)).toBe(gallery.getBonusMultiplier(player));
    expect(gallery.getBonusMultiplierForChip(true) - gallery.getBonusMultiplierForChip(false)).toBeCloseTo(0.1, 12);
  });


  it('matches this character Gallery unlock state', () => {
    expect(gallery.isUnlocked(player)).toBe(Boolean(getExtractedValue(extractionResults, 'gallery_unlocked')));
  });
  it('combines deposited trophy and nametag effects for this character', () => {
    expect(gallery.getCombinedBonus('% DROP RATE', player)).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'combined_drop_rate'),
      { tolerance: 0, context: 'Target character combined Gallery Drop Rate' },
    );
  });

});