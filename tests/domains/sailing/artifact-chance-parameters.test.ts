import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { Breeding } from '../../../data/domain/world-4/breeding';
import { Bribe } from '../../../data/domain/world-1/bribes';
import { Arcade } from '../../../data/domain/world-2/arcade';
import { Hole } from '../../../data/domain/world-5/hole/hole';
import { Farming } from '../../../data/domain/world-6/farming';
import { ResearchGrid } from '../../../data/domain/world-7/research';
import { UpgradeVault } from '../../../data/domain/upgradeVault';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { KillRoy } from '../../../data/domain/world-2/killroy';
import { Button } from '../../../data/domain/world-7/button';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { Summoning } from '../../../data/domain/world-6/summoning';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { Lab } from '../../../data/domain/world-4/lab';
import { Tome } from '../../../data/domain/world-4/tome';
import { Votes } from '../../../data/domain/world-2/votes';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Player } from '../../../data/domain/player';
import type { Account } from '../../../data/domain/account';

const saveName = 'latest';
const extractionResultsName = 'sailing-artifact-chance-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
  fractal_island_bonus_3: {
    description: 'Fractal Island artifact-find bonus index 3',
    extractionKey: 'fractal_island_bonus_3',
    domainExtractor: (data) => (data.get('account') as Account).getFractalIslandArtifactBonus(),
  },
  sailing_artifact_bonus_3: {
    description: 'Sailing ArtifactBonus index 3 used in the additive artifact-find bonus',
    extractionKey: 'sailing_artifact_bonus_3',
    domainExtractor: (data) => (data.get('sailing') as Sailing).artifacts[3].getBonus(),
  },
  boat_0_captain_artifact_bonus: {
    description: 'Artifact-find captain trait assigned to boat 0',
    extractionKey: 'boat_0_captain_artifact_bonus',
    domainExtractor: (data) => (data.get('sailing') as Sailing).boats.find(boat => boat.index === 0)?.captain?.traits
      .filter(trait => trait.traitIndex === 3).reduce((sum, trait) => sum + trait.currentBonus, 0) ?? 0,
  },
  boat_1_captain_artifact_bonus: {
    description: 'Artifact-find captain trait assigned to boat 1',
    extractionKey: 'boat_1_captain_artifact_bonus',
    domainExtractor: (data) => (data.get('sailing') as Sailing).boats.find(boat => boat.index === 1)?.captain?.traits
      .filter(trait => trait.traitIndex === 3).reduce((sum, trait) => sum + trait.currentBonus, 0) ?? 0,
  },
  breeding_shiny_bonus_21: {
    description: 'Breeding shiny bonus index 21 used additively',
    extractionKey: 'breeding_shiny_bonus_21',
    domainExtractor: (data) => (data.get('breeding') as Breeding).shinyBonuses.find(bonus => bonus.data.index === 21)?.getBonus() ?? 0,
  },
  bribe_bonus_34: {
    description: 'Purchased Bribe 34 contribution to artifact-find bonus',
    extractionKey: 'bribe_bonus_34',
    domainExtractor: (data) => (data.get('bribes') as Bribe[]).find(bribe => bribe.bribeIndex === 34)?.getBonus() ?? 0,
  },
  arcade_bonus_32: {
    description: 'Arcade bonus index 32 used additively',
    extractionKey: 'arcade_bonus_32',
    domainExtractor: (data) => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 32)?.getBonus() ?? 0,
  },
  arcade_bonus_66: {
    description: 'Arcade bonus index 66 used additively',
    extractionKey: 'arcade_bonus_66',
    domainExtractor: (data) => (data.get('arcade') as Arcade).bonuses.find(bonus => bonus.index === 66)?.getBonus() ?? 0,
  },
  hole_b_upg_55: {
    description: 'Hole B_UPG index 55 used additively',
    extractionKey: 'hole_b_upg_55',
    domainExtractor: (data) => (data.get('hole') as Hole).getSchematicBonus(55, 0),
  },
  farming_sticker_bonus_2: {
    description: 'Farming sticker bonus index 2 used additively',
    extractionKey: 'farming_sticker_bonus_2',
    domainExtractor: (data) => (data.get('farming') as Farming).getStickerBonus(2),
  },
  research_grid_bonus_109: {
    description: 'Research Grid bonus index 109 used additively',
    extractionKey: 'research_grid_bonus_109',
    domainExtractor: (data) => (data.get('research') as ResearchGrid).getBonusForId(109),
  },
  upgrade_vault_bonus_63: {
    description: 'Upgrade Vault bonus index 63 used as an additive artifact-find bonus',
    extractionKey: 'upgrade_vault_bonus_63',
    domainExtractor: (data) => (data.get('upgradeVault') as UpgradeVault).getBonusForId(63),
  },
  companion_bonus_154: {
    description: 'Active Companion 154 bonus used in its dedicated multiplier',
    extractionKey: 'companion_bonus_154',
    domainExtractor: (data) => getCompanionActiveBonus(data.get('companions') as Companion[], 154),
  },
  killroy_bonus_0: {
    description: 'Killroy artifact-find multiplier input',
    extractionKey: 'killroy_bonus_0',
    domainExtractor: (data) => (data.get('killroy') as KillRoy).artifactFindChanceBonus,
  },
  button_bonus_3: {
    description: 'Button bonus index 3 used as a multiplier',
    extractionKey: 'button_bonus_3',
    domainExtractor: (data) => (data.get('button') as Button).getBonusForIndex(3),
  },
  research_grid_bonus_106: {
    description: 'Research Grid bonus index 106 used as a multiplier',
    extractionKey: 'research_grid_bonus_106',
    domainExtractor: (data) => (data.get('research') as ResearchGrid).getBonusForId(106),
  },
  alchemy_vial_6turtle: {
    description: 'Alchemy 6turtle vial output used as a multiplier',
    extractionKey: 'alchemy_vial_6turtle',
    domainExtractor: (data) => (data.get('alchemy') as Alchemy).getVialBonusForKey('6turtle'),
  },
  sushi_bonus_7: {
    description: 'Sushi bonus index 7 used as a multiplier',
    extractionKey: 'sushi_bonus_7',
    domainExtractor: (data) => (data.get('sushi') as SushiStation).getBonusFromIndex(7),
  },
  summoning_winner_bonus_3: {
    description: 'Summoning winner bonus index 3 used as a multiplier',
    extractionKey: 'summoning_winner_bonus_3',
    domainExtractor: (data) => (data.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(3),
  },
  jelly_bonus_19: {
    description: 'Jelly obstruction quantity bonus index 19 used as a multiplier',
    extractionKey: 'jelly_bonus_19',
    domainExtractor: (data) => (data.get('jellyOperator') as JellyOperator).getObstructionBonus(19),
  },
  boat_0_davey_jones_bonus: {
    description: 'Davey Jones multiplier for boat 0',
    extractionKey: 'boat_0_davey_jones_bonus',
    domainExtractor: (data) => (data.get('sailing') as Sailing).boats.find(boat => boat.index === 0)?.daveyJonesBonus ?? 1,
  },
  boat_1_davey_jones_bonus: {
    description: 'Davey Jones multiplier for boat 1',
    extractionKey: 'boat_1_davey_jones_bonus',
    domainExtractor: (data) => (data.get('sailing') as Sailing).boats.find(boat => boat.index === 1)?.daveyJonesBonus ?? 1,
  },
  mainframe_bonus_14: {
    description: 'Mainframe bonus index 14 used as a multiplier',
    extractionKey: 'mainframe_bonus_14',
    domainExtractor: (data) => (data.get('lab') as Lab).bonuses[14].getBonus(),
  },
  tome_epilogue_bonus_3: {
    description: 'Tome epilogue bonus index 3 used as a multiplier',
    extractionKey: 'tome_epilogue_bonus_3',
    domainExtractor: (data) => (data.get('tome') as Tome).getEpilogueBonus(3),
  },
  voting_bonus_20: {
    description: 'Current vote bonus index 20 used as a multiplier',
    extractionKey: 'voting_bonus_20',
    domainExtractor: (data) => (data.get('votes') as Votes).getCurrentBonus(20),
  },
  starsign_bonus_61: {
    description: 'Character Artifosho bonus used as a multiplier',
    extractionKey: 'starsign_bonus_61',
    domainExtractor: (data) => (data.get('players') as Player[])
      .find(player => player.playerID === 3)?.starSigns.find(sign => sign.name === 'Artifosho')
      ?.getBonus('Artifact Find Chance') ?? 0,
  },
  companion_bonus_43: {
    description: 'Active Companion 43 multiplier input',
    extractionKey: 'companion_bonus_43',
    domainExtractor: (data) => getCompanionActiveBonus(data.get('companions') as Companion[], 43),
  },
  hole_monument_1_2: {
    description: 'Justice monument bonus index 2 used as a multiplier',
    extractionKey: 'hole_monument_1_2',
    domainExtractor: (data) => (data.get('hole') as Hole).getMonumentBonus('Justice', 2),
  },
  farming_exotic_bonus_45: {
    description: 'Farming Exotic Market bonus index 45 used as a multiplier',
    extractionKey: 'farming_exotic_bonus_45',
    domainExtractor: (data) => (data.get('farming') as Farming).getExoticMarketBonusValue(45),
  },
  gaming_palette_bonus_5: {
    description: 'Gaming Palette bonus index 5 used as a multiplier',
    extractionKey: 'gaming_palette_bonus_5',
    domainExtractor: (data) => (data.get('gaming') as Gaming).getPaletteBonus(5),
  },
};

describe('Sailing boat artifact chance - parameters', () => {
  let gameData: Map<string, any>;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.values(parameterSpecs).forEach(spec => {
    it(`matches ${spec.description}`, () => {
      expect(spec.domainExtractor(gameData)).toMatchLiveGame(getExtractedValue(extractionResults, spec.extractionKey), 0);
    });
  });
});
