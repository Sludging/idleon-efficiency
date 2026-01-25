import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Sailing } from '../../../data/domain/sailing';
import { Divinity } from '../../../data/domain/divinity';
import { Card } from '../../../data/domain/cards';
import { Alchemy } from '../../../data/domain/alchemy';
import { Votes } from '../../../data/domain/world-2/votes';
import { Stamp } from '../../../data/domain/world-1/stamps';
import { PlayerStatues } from '../../../data/domain/statues';
import { Cooking } from '../../../data/domain/cooking';
import { Rift, SkillMastery } from '../../../data/domain/rift';
import { Worship, TotalizerBonus } from '../../../data/domain/worship';
import { StarSigns } from '../../../data/domain/starsigns';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { SlabInfluencedArtifact } from '../../../data/domain/sailing/artifacts';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'sailing-speed-data.json';

const sailingSpeedParameterSpecs: Record<string, ParameterTestSpec> = {
  divinity_minor_bonus_6: {
    description: 'Divinity minor bonus for Purrmep (god 6)',
    extractionKey: 'divinity_minor_bonus_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      const purrmepPlayer = divinity.gods[6].linkedPlayers.at(0);
      return purrmepPlayer ? divinity.gods[6].getMinorLinkBonus(purrmepPlayer) : 0;
    }
  },
  card_w5c1_bonus: {
    description: 'Card w5c1 bonus',
    extractionKey: 'card_w5c1_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      return cards.find(card => card.id === "w5c1")?.getBonus() ?? 0;
    }
  },
  card_boss5a_bonus: {
    description: 'Card Boss5A bonus',
    extractionKey: 'card_boss5a_bonus',
    domainExtractor: (gameData) => {
      const cards = gameData.get("cards") as Card[];
      return cards.find(card => card.id === "Boss5A")?.getBonus() ?? 0;
    }
  },
  alchemy_bubble_y1: {
    description: 'Alchemy bubble Y1 (yellow bubble 1)',
    extractionKey: 'alchemy_bubble_y1',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getBubbleBonusForKey("Y1");
    }
  },
  davey_jones_bonus: {
    description: 'Davey Jones bonus',
    extractionKey: 'davey_jones_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return sailing.boats[0]?.daveyJonesBonus ?? 1;
    }
  },
  divinity_blessing_4: {
    description: 'Divinity blessing bonus for god 4',
    extractionKey: 'divinity_blessing_4',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[4].getBlessingBonus();
    }
  },
  divinity_blessing_6: {
    description: 'Divinity blessing bonus for god 6 (Purrmep)',
    extractionKey: 'divinity_blessing_6',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[6].getBlessingBonus();
    }
  },
  voting_bonus_24: {
    description: 'Voting bonus 24',
    extractionKey: 'voting_bonus_24',
    domainExtractor: (gameData) => {
      const votes = gameData.get("votes") as Votes;
      return votes.getCurrentBonus(24);
    }
  },
  divinity_blessing_9: {
    description: 'Divinity blessing bonus for god 9',
    extractionKey: 'divinity_blessing_9',
    domainExtractor: (gameData) => {
      const divinity = gameData.get("divinity") as Divinity;
      return divinity.gods[9].getBlessingBonus();
    }
  },
  artifact_10_bonus: {
    description: 'Sailing artifact 10 bonus',
    extractionKey: 'artifact_10_bonus',
    domainExtractor: (gameData) => {
      const sailing = gameData.get("sailing") as Sailing;
      return (sailing.artifacts[10] as SlabInfluencedArtifact).getBonus();
    }
  },
  stamp_sailspd_bonus: {
    description: 'Stamp bonus for SailSpd',
    extractionKey: 'stamp_sailspd_bonus',
    domainExtractor: (gameData) => {
      const stamps = gameData.get("stamps") as Stamp[][];
      return stamps.flatMap(tab => tab).reduce((sum, stamp) => 
        sum += stamp.data.effect == "SailSpd" ? stamp.getBonus() : 0, 0);
    }
  },
  statue_24_bonus: {
    description: 'Statue 24 bonus',
    extractionKey: 'statue_24_bonus',
    domainExtractor: (gameData) => {
      const statues = gameData.get("statues") as PlayerStatues[];
      return statues[0].statues[24].getBonus();
    }
  },
  meal_bonus_sailing: {
    description: 'Meal bonus for Sailing',
    extractionKey: 'meal_bonus_sailing',
    domainExtractor: (gameData) => {
      const cooking = gameData.get("cooking") as Cooking;
      return cooking.getMealBonusForKey("Sailing");
    }
  },
  alchemy_vial_sailspd: {
    description: 'Alchemy vial SailSpd bonus',
    extractionKey: 'alchemy_vial_sailspd',
    domainExtractor: (gameData) => {
      const alchemy = gameData.get("alchemy") as Alchemy;
      return alchemy.getVialBonusForKey("SailSpd");
    }
  },
  rift_skill_bonus_sailing: {
    description: 'Rift skill mastery bonus for sailing (skill index 12)',
    extractionKey: 'rift_skill_bonus_sailing',
    domainExtractor: (gameData) => {
      const rift = gameData.get("rift") as Rift;
      const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;
      return skillMastery.getSkillBonus(SkillsIndex.Sailing, 1);
    }
  },
  worship_msa_bonus_2: {
    description: 'Worship MSA bonus 2 (boat speed)',
    extractionKey: 'worship_msa_bonus_2',
    domainExtractor: (gameData) => {
      const worship = gameData.get("worship") as Worship;
      return worship.totalizer.getBonus(TotalizerBonus.BoatSpeed);
    }
  },
  starsign_63_bonus: {
    description: 'Star sign 63 (C. Shanti Minor) bonus',
    extractionKey: 'starsign_63_bonus',
    domainExtractor: (gameData) => {
      const starSigns = gameData.get("starsigns") as StarSigns;
      return starSigns.unlockedStarSigns.find(sign => sign.name == "C. Shanti Minor")?.getBonus("Sailing SPD") ?? 0;
    }
  }
};

describe('Sailing Domain - Speed - Parameters', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
  });

  Object.entries(sailingSpeedParameterSpecs).forEach(([_, spec]) => {
    it(`validates ${spec.description}`, () => {
      const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
      const domainValue = spec.domainExtractor(gameData);
      expect(domainValue).toMatchLiveGame(liveValue, 0);
    });
  });
});
