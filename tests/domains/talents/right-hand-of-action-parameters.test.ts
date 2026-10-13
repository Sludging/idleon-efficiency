import { Player } from '../../../data/domain/player';
import { RightHandOfActionTalent } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';

// The paired save has one eligible source: SludgeMan, player 6.
const sourcePlayerIndex = 6;

describe('Talents Right Hand of Action direct parameters', () => {
  let players: Player[];

  beforeAll(() => {
    players = loadGameDataFromSave('latest').get('players') as Player[];
  });

  it('uses the source allocated-point curve for ordinary skill efficiency', () => {
    const talent = players[sourcePlayerIndex].getTalent(43) as RightHandOfActionTalent;
    // Right Hand uses allocated points, not the later boosted talent level.
    const actual = talent.getActionBonus();
    const results = loadExtractionResults('talents-right-hand-of-action-data.json');

    expect(actual).toMatchLiveGame(getExtractedValue(results, 'source_action_bonus'), 0);
  });

  it('uses the account Enhancement Eclipse bonus to unlock the source enhancement', () => {
    const actual = Math.max(...players.map(player => player.getTalentBonus(49)));
    const results = loadExtractionResults('talents-right-hand-of-action-data.json');

    expect(actual).toMatchLiveGame(getExtractedValue(results, 'enhancement_eclipse_bonus'), 0);
  });
});
