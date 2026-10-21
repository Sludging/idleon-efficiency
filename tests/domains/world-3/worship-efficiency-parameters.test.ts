import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import type { Player } from '../../../data/domain/player';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getTargetPlayer } from '../../utils/target-player';

const resultsFile = 'worship-efficiency-parameters-data.json';

describe('Worship efficiency direct parameters', () => {
  let player: Player;
  let stamps: Stamp[][];
  let statueBonus: number;
  let worshipSkillMastery: SkillMastery;
  let postOfficeBonus: number;
  let worshipSignBonus: number;
  let results: ExtractionResults;

  beforeAll(() => {
    const gameData = loadGameDataFromSave('latest');
    player = getTargetPlayer(gameData.get('players') as Player[]);
    stamps = gameData.get('stamps') as Stamp[][];
    const statues = gameData.get('statues') as PlayerStatues[];
    const rift = gameData.get('rift') as Rift;
    worshipSkillMastery = rift.bonuses.find(bonus => bonus.name === 'Skill Mastery') as SkillMastery;
    statueBonus = statues[player.playerID].statues.find(statue => statue.index === 16)!.getBonus(player);
    postOfficeBonus = player.getPostOfficeBonus('18a');
    worshipSignBonus = player.starSigns.reduce((total, sign) => total + sign.getBonus('Worship Efficiency'), 0);
    results = loadExtractionResults(resultsFile);
    validateExtractionHealth(results);
  });

  it('matches character talent 532 used by Worship efficiency', () => {
    expect(player.getTalentBonus(532)).toMatchLiveGame(getExtractedValue(results, 'worship_talent_532'), 0);
  });

  it('matches Worship efficiency stamp bonus', () => {
    expect(getStampBonusForKey(stamps, 'WorshipEff')).toMatchLiveGame(getExtractedValue(results, 'worship_stamp_efficiency'), 0);
  });

  it('matches Twosoul statue bonus for the target character', () => {
    expect(statueBonus).toMatchLiveGame(getExtractedValue(results, 'worship_statue_16'), 0);
  });

  it('matches character talent 445 used by Worship efficiency', () => {
    expect(player.getTalentBonus(445)).toMatchLiveGame(getExtractedValue(results, 'worship_talent_445'), 0);
  });

  it('maps the source Rift multiplier to public Worship Skill Mastery percentage points', () => {
    const sourceMultiplier = getExtractedValue(results, 'worship_rift_skill_bonus_8');
    // Game 1.22 Worship efficiency multiplies this flag by 10; the public mastery API exposes that coefficient.
    // Source: idleon1.22.txt:99350.
    expect(worshipSkillMastery.getSkillBonus(SkillsIndex.Worship, 1))
      .toMatchLiveGame(sourceMultiplier * 10, 0);
  });

  it('matches Crate of the Creator post office bonus', () => {
    expect(postOfficeBonus).toMatchLiveGame(getExtractedValue(results, 'worship_post_office_18a'), 0);
  });

  it('matches character Worship efficiency star sign bonus', () => {
    expect(worshipSignBonus).toMatchLiveGame(getExtractedValue(results, 'worship_star_sign_efficiency'), 0);
  });

  it('matches character talent 476 used by Worship efficiency', () => {
    expect(player.getTalentBonus(476)).toMatchLiveGame(getExtractedValue(results, 'worship_talent_476'), 0);
  });
});
