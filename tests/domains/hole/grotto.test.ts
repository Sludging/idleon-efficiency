import { Hole } from '../../../data/domain/world-5/hole/hole';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { coreNumber } from './part1-test-helpers';

describe('Gloomie Mushroom Grotto', () => {
 let hole: Hole;
 let results: ExtractionResults;

 beforeAll(() => {
  results = loadExtractionResults('hole-grotto-data.json');
  validateExtractionHealth(results);
  hole = loadGameDataFromSave('latest').get('hole') as Hole;
 });

 it('exposes defeated colonies and the current Monarch layer', () => {
  coreNumber(hole.grotto.coloniesDefeated, results, 'colonies_defeated', 'Defeated Gloomie colonies');
  coreNumber(hole.grotto.layer, results, 'layer', 'Current Grotto layer');
 });

 it('calculates the current Monarch HP', () => {
  coreNumber(hole.grotto.getMonarchHp(), results, 'monarch_hp', 'Gloomie Monarch HP');
 });

 it('exposes mushroom kills toward the current Monarch challenge', () => {
  coreNumber(hole.grotto.mushroomKills, results, 'mushroom_kills', 'Credited Gloomie mushroom kills');
  coreNumber(hole.grotto.getMushroomKillRequirement(), results, 'mushroom_kill_requirement', 'Mushroom kills needed for the current Monarch');
  coreNumber(hole.grotto.getMushroomKillsRemaining(), results, 'mushroom_kills_remaining', 'Mushroom kills remaining for the current Monarch');
 });

 it('exposes each built Gloomie schematic effect', () => {
  coreNumber(hole.grotto.effects.lootieBonusPercent, results, 'lootie_bonus_percent', 'Gloomie Lootie Drop Rate bonus');
  coreNumber(hole.grotto.effects.expieBonusPercent, results, 'expie_bonus_percent', 'Gloomie Expie Class EXP bonus');
  coreNumber(hole.grotto.effects.opieBonusPercent, results, 'opie_bonus_percent', 'Gloomie Opie Villager EXP bonus');
 });

 it('uses the existing cavern ledger for found Opals', () => {
  const sources = hole.opalLedger.sources.filter(source => source.id === 'cavern:8');
  expect(sources).toHaveLength(1);
  coreNumber(sources[0].opals, results, 'opals_found', 'Opals found in the Grotto');
 });
});
