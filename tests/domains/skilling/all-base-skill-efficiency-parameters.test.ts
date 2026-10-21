import { Player } from '../../../data/domain/player';
import { Breeding } from '../../../data/domain/world-4/breeding';
import { Lab } from '../../../data/domain/world-4/lab';
import { Divinity } from '../../../data/domain/world-5/divinity';
import { getStampBonusForKey, Stamp } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { getTargetPlayer } from '../../utils/target-player';

const targetPlayer = (data: Map<string, any>): Player => getTargetPlayer(data.get('players') as Player[]);

const parameters: ParameterTestSpec[] = [
  {
    description: 'Breeding shiny bonus adds base efficiency to every skill',
    extractionKey: 'breeding_base_efficiency',
    domainExtractor: data => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 22)!.getBonus(),
  },
  {
    description: 'stamps add base efficiency to every skill',
    extractionKey: 'stamps_base_efficiency',
    domainExtractor: data => getStampBonusForKey(data.get('stamps') as Stamp[][], 'BaseAllEff'),
  },
  {
    description: 'Nobisect blessing adds base efficiency for the target character',
    extractionKey: 'nobisect_base_efficiency',
    domainExtractor: data => (data.get('divinity') as Divinity).gods[2].getBlessingBonus(targetPlayer(data)),
  },
  {
    description: 'Myriad Crate adds base efficiency for the target character',
    extractionKey: 'post_office_base_efficiency',
    domainExtractor: data => {
      const box = targetPlayer(data).postOffice.find(box => box.index === 20)!;
      // Reward b is the crate's second bonus, not its skill experience reward.
      return box.bonuses[1].getBonus(box.level, 1);
    },
  },
  {
    description: 'equipped Lab chips add base efficiency for the target character',
    extractionKey: 'chips_base_efficiency',
    domainExtractor: data => targetPlayer(data).getChipBonus('eff'),
  },
  {
    description: 'Supersource adds base efficiency for the target character',
    extractionKey: 'talent_base_efficiency',
    domainExtractor: data => targetPlayer(data).getTalentBonus(636),
  },
  {
    description: 'Emerald Navette adds its prepared Lab base efficiency',
    extractionKey: 'emerald_navette_base_efficiency',
    // MainframeBonus(112) dispatches to jewel 12, not a mainframe node.
    domainExtractor: data => (data.get('lab') as Lab).jewels[12].getBonus(),
  },
];

describe('Skilling all-base skill efficiency direct parameters', () => {
  let gameData: Map<string, any>;

  beforeAll(() => {
    gameData = loadGameDataFromSave('latest');
  });

  parameters.forEach(spec => {
    it(spec.description, () => {
      const actual = spec.domainExtractor(gameData);
      const results = loadExtractionResults('skilling-all-base-skill-efficiency-data.json');
      expect(actual).toMatchLiveGame(getExtractedValue(results, spec.extractionKey), 0);
    });
  });
});
