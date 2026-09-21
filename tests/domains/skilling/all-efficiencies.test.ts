import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { Skilling } from '../../../data/domain/skilling';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'skill-stats-all-efficiencies-data.json';

describe('SkillStats Domain - AllEfficiencies', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;
  let player: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    player = getTargetPlayer(gameData.get('players') as Player[]);
  });

  it('matches the source-grouped six-factor result for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'skill_all_efficiencies');
    const skilling = gameData.get('skilling') as Skilling;
    const domainValue = skilling.getAllEfficiencies(player);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player ${player.playerID} SkillStats("AllEfficiencies") multiplier',
    });
  });

  it('keeps calculated results separated by character-sensitive player inputs', () => {
    const [player0Value, player1Value] = calculateFocusedAllEfficiencies([
      { playerID: 0, totalQuests: 50, talent617: 2 },
      { playerID: 1, totalQuests: 50, talent617: 5 },
    ]);

    expect(player0Value).toBe(1.02);
    expect(player1Value).toBe(1.05);
  });
});

type FocusedInputs = {
  playerID?: number;
  totalQuests?: number;
  talent617?: number;
  talent646?: number;
  equipment?: number;
  tome?: number;
  chip?: number;
  cardSet?: number;
  prayerBonus?: number;
  buffPenalty?: number;
  prayerCurse?: number;
};

type SharedFocusedInputs = {
  family?: number;
  vial?: number;
  artifact?: number;
  meal?: number;
  palette?: number;
  crystalLevel?: number;
  friend?: number;
  rift?: number;
  hole?: number;
  hoops?: number;
  shimmer?: number;
  summoning?: number;
  guild?: number;
};

const calculateFocusedAllEfficiencies = (
  playerInputs: FocusedInputs[],
  shared: SharedFocusedInputs = {},
): number[] => {
  const players = playerInputs.map((input, index) => ({
    playerID: input.playerID ?? index,
    activePrayers: [
      ...(input.prayerBonus === undefined ? [] : [1]),
      ...(input.prayerCurse === undefined ? [] : [17]),
    ],
    activeBuffs: input.buffPenalty === undefined
      ? []
      : [{ skillIndex: 40, getBonus: () => input.buffPenalty }],
    cardInfo: {
      equippedCards: [],
      getBonusForId: (id: number) => id === 2 ? input.cardSet ?? 0 : 0,
    },
    getTalentBonus: (talent: number) => talent === 617
      ? input.talent617 ?? 0
      : talent === 646 ? input.talent646 ?? 0 : 0,
    getEquipmentBonus: () => input.equipment ?? 0,
    getChipBonus: () => input.chip ?? 0,
  })) as unknown as Player[];
  const zeroBonus = { getBonus: () => 0 };
  const data = new Map<string, any>([
    ['players', players],
    ['family', { getClassBonus: () => ({ getBonus: () => shared.family ?? 0 }) }],
    ['alchemy', { getVialBonusForKey: () => shared.vial ?? 0 }],
    ['sailing', {
      artifacts: Array.from(
        { length: 16 },
        (_, index) => index === 15 ? { getBonus: () => shared.artifact ?? 0 } : zeroBonus,
      ),
    }],
    ['quests', { getTotalQuestsComplete: () => playerInputs[0]?.totalQuests ?? 0 }],
    ['cooking', { getMealBonusForKey: () => shared.meal ?? 0 }],
    ['tome', {
      getTomeBonus: (_index: number, player: Player) =>
        playerInputs[player.playerID]?.tome ?? 0,
    }],
    ['gaming', { getPaletteBonus: () => shared.palette ?? 0 }],
    ['cards', [{ id: 'Crystal4', getLevels: () => shared.crystalLevel ?? 0 }]],
    ['friends', { getFriendBonus: () => shared.friend ?? 0 }],
    ['rift', {
      bonuses: [{
        name: 'Skill Mastery',
        getTotalBonusByIndex: () => shared.rift ?? 0,
      }],
    }],
    ['hole', { getSchematicBonus: () => shared.hole ?? 0 }],
    ['hoops', { getBonus: () => shared.hoops ?? 0 }],
    ['islandExpeditions', { getShimmerBonus: () => shared.shimmer ?? 0 }],
    ['companions', []],
    ['summoning', { getSummoningWinnerBonusFromIndex: () => shared.summoning ?? 0 }],
    ['guild', {
      guildBonuses: [{ index: 6, getBonus: () => shared.guild ?? 0 }],
    }],
    ['prayers', [
      { index: 1, getBonus: () => playerInputs[0]?.prayerBonus ?? 0 },
      { index: 17, getCurse: () => playerInputs[0]?.prayerCurse ?? 0 },
    ]],
  ]);
  const skilling = new Skilling('skilling');
  data.set('skilling', skilling);

  skilling.updateAllEfficiencies(data);
  return players.map(player => skilling.getAllEfficiencies(player));
};

describe('SkillStats Domain - AllEfficiencies focused branches', () => {
  it('uses quest completion until Talent 617 caps its contribution', () => {
    expect(calculateFocusedAllEfficiencies([
      { totalQuests: 20, talent617: 3 },
    ])[0]).toBe(1.02);
    expect(calculateFocusedAllEfficiencies([
      { totalQuests: 50, talent617: 3 },
    ])[0]).toBe(1.03);
  });

  it('combines efficiency penalties and floors their factor at one percent', () => {
    expect(calculateFocusedAllEfficiencies([
      { buffPenalty: 25, prayerCurse: 10 },
    ])[0]).toBe(0.65);
    expect(calculateFocusedAllEfficiencies([
      { buffPenalty: 110 },
    ])[0]).toBe(0.01);
  });

  it('preserves the source addition trees for factors A, B, and E', () => {
    const player = {
      equipment: 10,
      talent617: 3,
      totalQuests: 30,
      talent646: 1,
      tome: -1,
      chip: 100000000,
      cardSet: -0.1,
      prayerBonus: -0.1,
    };
    const shared = {
      family: -10000000000000000,
      vial: -3,
      artifact: 100000000,
      meal: 1,
      palette: 1000000000000000,
      crystalLevel: -100,
      friend: -10000000000000000,
      rift: -1000000000000000,
      hole: -10,
      hoops: 0.1,
      shimmer: Number.EPSILON,
      guild: -100,
    };
    const factorA = 1 + (shared.family
      + (player.equipment + shared.vial + (shared.artifact + player.talent617))) / 100;
    const factorB = 1 + (shared.meal + player.talent646
      + (player.tome + shared.palette)
      + (player.chip + (3 * shared.crystalLevel + shared.friend))
      + (shared.rift + (shared.hole + shared.hoops) + shared.shimmer)) / 100;
    const factorE = 1 + (shared.guild + (player.cardSet + player.prayerBonus)) / 100;

    expect(calculateFocusedAllEfficiencies([player], shared)[0]).toBe(
      factorA * factorB * factorE,
    );
  });

  it('multiplies all six factors in source order without regrouping', () => {
    const tinyBonus = -99.99999999999999;
    const [result] = calculateFocusedAllEfficiencies([
      { buffPenalty: 50 },
    ], {
      family: 1e202,
      meal: tinyBonus,
      summoning: 1e122,
      guild: tinyBonus,
    });
    const factorA = 1 + 1e202 / 100;
    const factorB = 1 + tinyBonus / 100;
    const factorC = 1;
    const factorD = 1 + 1e122 / 100;
    const factorE = 1 + tinyBonus / 100;
    const penaltyFactor = 0.5;

    expect(result).toBe(
      factorA * factorB * factorC * factorD * factorE * penaltyFactor,
    );
  });
});
