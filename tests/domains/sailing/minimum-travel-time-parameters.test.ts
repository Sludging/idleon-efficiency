import { Family } from '../../../data/domain/family';
import type { Player } from '../../../data/domain/player';
import { ClassIndex } from '../../../data/domain/talents';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';

describe('Sailing Domain - Minimum Travel Time - Parameters', () => {
  let gameData: Map<string, any>;
  let sailingResults: ExtractionResults;
  let familyResults: ExtractionResults;
  let legendTalentResults: ExtractionResults;

  beforeAll(() => {
    gameData = loadGameDataFromSave(saveName);
    sailingResults = loadExtractionResults('sailing-speed-data.json');
    familyResults = loadExtractionResults('family-class-bonus-data.json');
    legendTalentResults = loadExtractionResults('legend-talents-data.json');
    validateExtractionHealth(sailingResults);
    validateExtractionHealth(familyResults);
    validateExtractionHealth(legendTalentResults);
  });

  it('matches the captured-recipient Siege Breaker Family bonus', () => {
    const family = gameData.get('family') as Family;
    const player = getTargetPlayer(gameData.get('players') as Player[]);
    const domainValue = family.classBonus.get(ClassIndex.Siege_Breaker)!.getBonus(player);

    expect(domainValue).toMatchLiveGame(getExtractedValue(familyResults, 'family_bonus_44'), 0);
  });

  it('matches breeding shiny bonus 18 used by minimum travel time', () => {
    const sailing = gameData.get('sailing') as Sailing;

    expect(sailing.shinyMinSpeedBonus).toMatchLiveGame(
      getExtractedValue(sailingResults, 'shiny_bonus_18'),
      0,
    );
  });

  it('matches Legend points bonus 11 used by minimum travel time', () => {
    const legendTalents = gameData.get('legendTalents') as LegendTalents;

    expect(legendTalents.getBonusFromIndex(11)).toMatchLiveGame(
      getExtractedValue(legendTalentResults, 'talent_11_bonus'),
      0,
    );
  });
});
