import type { Grimoire } from '../../../data/domain/grimoire';
import type { Orion } from '../../../data/domain/world-1/orion';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
describe('Summoning class EXP parameters', () => {
  let summoning: Summoning;
  let upgradeVault: UpgradeVault;
  let grimoire: Grimoire;
  let orion: Orion;
  let votes: Votes;
  let results: ExtractionResults;

  beforeAll(() => {
    results = loadExtractionResults('player-experience-summoning-parameters-data.json');
    validateExtractionHealth(results);
    const gameData = loadGameDataFromSave('latest');
    summoning = gameData.get('summoning') as Summoning;
    upgradeVault = gameData.get('upgradeVault') as UpgradeVault;
    grimoire = gameData.get('grimoire') as Grimoire;
    orion = gameData.get('orion') as Orion;
    votes = gameData.get('votes') as Votes;
  });

  it.each([12, 3, 35])('matches Vault upgrade %i bonus used by class EXP', (index) => {
    expect(upgradeVault.getBonusForId(index)).toMatchLiveGame(
      getExtractedValue(results, `vault_upgrade_${index}_bonus`),
      0,
    );
  });

  it('matches Grimoire upgrade 24 bonus used by class EXP', () => {
    expect(grimoire.getUpgradeBonus(24)).toMatchLiveGame(getExtractedValue(results, 'grimoire_upgrade_24_bonus'), 0);
  });

  it('matches Owl bonus 0 used by class EXP', () => {
    expect(orion.getGlobalBonus(0)).toMatchLiveGame(getExtractedValue(results, 'owl_bonus_0'), 0);
  });

  it('matches Voting bonus 15 used by class EXP', () => {
    expect(votes.getCurrentBonus(15)).toMatchLiveGame(getExtractedValue(results, 'voting_bonus_15'), 0);
  });

  it('matches Summoning winner bonus 23 used by class EXP', () => {
    expect(summoning.getSummoningWinnerBonusFromIndex(23)).toMatchLiveGame(
      getExtractedValue(results, 'win_bonus_23'),
      0,
    );
  });
});
