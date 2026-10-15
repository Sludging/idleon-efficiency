import type { Card } from '../../../data/domain/cards';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Permanent Shrine calculated owner inputs', () => {
  let data: Map<string, unknown>;
  let replay: { artifact0: number; boss3BLevel: number };
  beforeAll(() => {
    const results = loadExtractionResults('shrine-map-independent-bonus-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.map_independent_shrine.result;
    data = loadGameDataFromSave('latest');
  });
  it('matches the calculated Moai Head result that enables global Shrine activation', () => {
    expect((data.get('sailing') as Sailing).artifacts[0].getBonus()).toMatchLiveGame(replay.artifact0, 0);
  });
  it('matches native Chaotic Chizoar card level before its five-point Shrine scaling', () => {
    const cards = data.get('cards') as Card[];
    expect(cards.find(card => card.id === 'Boss3B')!.getLevels()).toMatchLiveGame(replay.boss3BLevel, 0);
  });
});
