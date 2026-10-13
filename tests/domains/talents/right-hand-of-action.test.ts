import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { Player } from '../../../data/domain/player';
import { getRightHandOfActionBonus, RightHandOfActionTalent, updateRightHandOfActionBonuses } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const scenarios = [
  { description: 'grants Mining efficiency when the recipient has a lower skill level than the source', skill: SkillsIndex.Mining, key: 'recipient_mining_action_bonus' },
  { description: 'grants no Worship efficiency when the recipient has a higher skill level than the source', skill: SkillsIndex.Worship, key: 'recipient_worship_action_bonus' },
];

describe('Talents Right Hand of Action', () => {
  let players: Player[];

  beforeAll(() => {
    const accountData = loadGameDataFromSave('latest');
    updateRightHandOfActionBonuses(accountData);
    players = accountData.get('players') as Player[];
  });

  scenarios.forEach(scenario => {
    it(scenario.description, () => {
      const recipient = getTargetPlayer(players);
      const actual = getRightHandOfActionBonus(players, recipient, scenario.skill);
      const results = loadExtractionResults('talents-right-hand-of-action-data.json');
      validateExtractionHealth(results);

      expect(actual).toMatchLiveGameWithDetails(getExtractedValue(results, scenario.key), {
        tolerance: 0,
        context: `Player ${recipient.playerID} ${SkillsIndex[scenario.skill]} Right Hand of Action efficiency`,
      });
    });
  });

  it('prepares the source enhancement that allows doubled self efficiency', () => {
    // The paired save has one eligible source: SludgeMan, player 6.
    const talent = players[6].getTalent(43) as RightHandOfActionTalent;
    const results = loadExtractionResults('talents-right-hand-of-action-data.json');
    validateExtractionHealth(results);

    expect(Number(talent.isEnhanced)).toMatchLiveGameWithDetails(getExtractedValue(results, 'right_hand_enhancement'), {
      tolerance: 0,
      context: 'Right Hand of Action source enhancement after the account pipeline',
    });
  });
});
