import { initSummonEssenceRepo } from '../../../data/domain/data/SummonEssenceRepo';
import { Player } from '../../../data/domain/player';
import { SummonEssenceColor, Summoning } from '../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type EssenceGeneration = {
  colour: number;
  generationPerHour: number;
};

const essenceCases = initSummonEssenceRepo().map(({ data }) => ({
  ...data,
  name: SummonEssenceColor[data.colour],
}));

describe('Summoning Essence generation per hour', () => {
  let summoning: Summoning;
  let rates: Map<number, number>;
  let bestDoublerTalent: number;

  beforeAll(() => {
    const extractionResults = loadExtractionResults('summoning-essence-generation-data.json');
    validateExtractionHealth(extractionResults);
    const extractedRates = extractionResults.extractions.essence_generation.result as EssenceGeneration[];
    if (!Array.isArray(extractedRates)) throw new Error('Summoning Essence generation extraction is not a catalog array');

    expect(extractedRates.map(({ colour }) => colour)).toEqual(essenceCases.map(({ colour }) => colour));
    rates = new Map(extractedRates.map(({ colour, generationPerHour }) => {
      if (generationPerHour === null || generationPerHour === undefined) {
        throw new Error(`Summoning Essence ${colour} has no native hourly generation rate`);
      }
      const rate = normalizeExtractedValue(generationPerHour);
      if (!Number.isFinite(rate)) throw new Error(`Summoning Essence ${colour} has no finite native hourly generation rate`);
      return [colour, rate];
    }));
    const gameData = loadGameDataFromSave('latest');
    summoning = gameData.get('summoning') as Summoning;
    const players = gameData.get('players') as Player[];
    bestDoublerTalent = Math.max(...players.map(player => player.getTalentBonus(597)));
  });

  // Check every resource color through its public result, including any genuine locked-color zero rate.
  it.each(essenceCases)('matches $name Essence generation per hour', ({ colour, name, knowledgeUpgradeId, victoryUpgradeId, unlockUpgradeId }) => {
    const essence = summoning.summonEssences.find(candidate => candidate.color === colour);
    if (!essence) throw new Error(`Summoning ${name} Essence result not found`);

    expect(essence.generationPerHour).toMatchLiveGameWithDetails(rates.get(colour)!, {
      tolerance: 0,
      context: `Summoning ${name} Essence generation per hour`,
      debugInfo: {
        colour,
        unlocked: essence.unlocked,
        summoningLevel: summoning.summoningLevel,
        bestDoublerTalent,
        victories: essence.victories,
        stoneBossVictories: essence.stoneBossVictories,
        knowledgeUpgradeId,
        victoryUpgradeId,
        unlockUpgradeId,
      },
    });
  });
});
