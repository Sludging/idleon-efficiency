import { Card } from '../../../data/domain/cards';
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from '../../../data/domain/companions';
import { EquipmentBonus } from '../../../data/domain/equipment-effects';
import type { GoldenFood } from '../../../data/domain/golden-food';
import type { Player } from '../../../data/domain/player';
import type { Account } from '../../../data/domain/account';
import { Talent } from '../../../data/domain/talents';
import { ClassIndex } from '../../../data/domain/talents';
import type { Family } from '../../../data/domain/family';
import type { Guild } from '../../../data/domain/guild';
import type { Grimoire } from '../../../data/domain/grimoire';
import type { Friends } from '../../../data/domain/friends';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { Orion } from '../../../data/domain/world-1/orion';
import { getStampBonusForKey, type Stamp } from '../../../data/domain/world-1/stamps';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Sigils } from '../../../data/domain/world-2/alchemy/sigils';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Votes } from '../../../data/domain/world-2/votes';
import type { Shrine } from '../../../data/domain/world-3/construction/shrines';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { CropScientistBonusText, type Farming } from '../../../data/domain/world-6/farming';
import type { Emperor } from '../../../data/domain/world-6/emperor';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { SushiStation } from '../../../data/domain/world-7/sushi';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { Minehead } from '../../../data/domain/world-7/minehead';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
// Each row checks an immediate calculated owner, not the final composition or raw save plumbing.
describe('Persistent drop-rate immediate owner results', () => {
  let data: Map<string, unknown>;
  let player: Player;
  let terms: Record<string, number>;
  const owner = <T,>(key: string): T => data.get(key) as T;
  beforeAll(() => {
    const results = loadExtractionResults('player-drop-rate-data.json');
    validateExtractionHealth(results);
    terms = results.extractions.drop_rate.result.terms;
    data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
  });
  const cards = (): Card[] => [...new Set([...player.cardInfo!.equippedCards, ...player.cardInfo!.cards.filter(card => card.passive)])];
  const office = (key: string): number => player.postOffice.reduce((total, box) => total + box.bonuses.reduce(
    (subtotal, bonus, index) => subtotal + (bonus.data.bonusKey === key ? bonus.getBonus(box.level, index) : 0), 0), 0);
  const parameters: { key: string; name: string; getValue: () => number; getExpected?: () => number }[] = [
    { key: "luck", name: "calculated Luck before its drop-rate transform", getValue: () => player.stats.luck },
    { key: "goldFood", name: "complete GoldenFood drop-rate percentage", getValue: () => owner<GoldenFood>('goldenFood').getDropRatePercent(player) },
    { key: "owl4", name: "Orion account drop rate", getValue: () => owner<Orion>('orion').getGlobalBonus(4) },
    { key: "landRank9", name: "recipient Land Rank drop rate", getValue: () => owner<Farming>('farming').landrankDatabase.getUpgradeBonusForPlayer(9, player) },
    { key: "vote27", name: "current ballot drop rate", getValue: () => owner<Votes>('votes').getCurrentBonus(27) },
    { key: "hole46", name: "earned bucket schematic contribution", getValue: () => owner<Hole>('hole').schematics.find(schematic => schematic.index === 46)!.getBonus() },
    { key: "hole82", name: "Tune of Artifaction schematic mode20 contribution", getValue: () => owner<Hole>('hole').schematics.find(schematic => schematic.index === 82)!.getBonus(20) },
    { key: "measurement15", name: "Golem-kill measurement drop rate", getValue: () => owner<Hole>('hole').measurements.find(measurement => measurement.index === 15)!.getBonus() },
    { key: "monument6", name: "Wisdom monument player drop rate", getValue: () => owner<Hole>('hole').monuments.monuments.Wisdom.bonuses.find(bonus => bonus.index === 6)!.getBonus() },
    { key: "crop7", name: "unlocked Crop Scientist drop rate", getValue: () => owner<Farming>('farming').cropScientist.getBonus(CropScientistBonusText.DropRate) },
    { key: "exotic59", name: "Pommelion Seed exotic drop rate", getValue: () => owner<Farming>('farming').getExoticMarketBonusValue(59) },
    { key: "grimoire44", name: "Grimoire upgrade drop rate", getValue: () => owner<Grimoire>('grimoire').getUpgradeBonus(44) },
    { key: "vault18", name: "Vault upgrade drop rate", getValue: () => owner<UpgradeVault>('upgradeVault').getBonusForId(18) },
    { key: "emperor11", name: "Emperor drop rate", getValue: () => owner<Emperor>('emperor').getEffectiveBonus(11) },
    { key: "efaunt", name: "active Efaunt set raw drop rate", getValue: () => owner<EquipmentSets>('equipmentSets').getSetBonus('EFAUNT_SET', true) },
    { key: "friend3", name: "active Friend drop rate", getValue: () => owner<Friends>('friends').getFriendBonus(3) },
    { key: "legend1", name: "Legend talent drop rate", getValue: () => owner<LegendTalents>('legendTalents').getBonusFromIndex(1) },
    { key: "spelunk50", name: "Spelunking shop drop rate", getValue: () => owner<Spelunking>('spelunking').getUpgradeBonus(50) },
    { key: "royalGrades", name: "Royal Armory total resource grade", getValue: () => owner<RoyalArmory>('royalArmory').totalResourceGrade },
    { key: "boxDrop", name: "Post Office drop rate", getValue: () => office('DropRate') },
    { key: "bubbleDrop", name: "recipient Alchemy drop-rate bubble", getValue: () => owner<Alchemy>('alchemy').getBubbleBonusForKey('DropRate', player) },
    { key: "signDrop", name: "saved Drop Rate and Drop Rarity star signs", getValue: () => player.starSigns.reduce((total, sign) => total + sign.getBonus('Drop Rate') + sign.getBonus('Drop Rarity'), 0) },
    { key: "guild10", name: "Guild drop rate", getValue: () => owner<Guild>('guild').guildBonuses[10].getBonus() },
    { key: "shrine4", name: "permanently enabled Clover Shrine", getValue: () => owner<Shrine[]>('shrines')[4].getMapIndependentBonus() },
    { key: "sigil11", name: "prepared drop-rate Sigil", getValue: () => owner<Sigils>('sigils').sigils[11].getBonus() },
    { key: "shinyDrop", name: "Shiny pet drop rate", getValue: () => owner<Breeding>('breeding').shinyBonuses.find(bonus => bonus.data.index === 0)?.getBonus() ?? 0 },
    { key: "arcade27", name: "Arcade drop rate", getValue: () => owner<Arcade>('arcade').bonuses[27].getBonus() },
    { key: "stampDrop", name: "drop-rate stamps", getValue: () => getStampBonusForKey(owner<Stamp[]>('stamps'), 'DropRate') },
    { key: "win9", name: "Summoning victory drop rate", getValue: () => owner<Summoning>('summoning').getSummoningWinnerBonusFromIndex(9) },
    { key: "grid173", name: "Research additive drop rate", getValue: () => owner<ResearchGrid>('research').getBonusForId(173, 0) },
    { key: "chipDrop", name: "prepared drop-rate chips", getValue: () => player.getChipBonus('dr') },
    { key: "royalStatue1", name: "Royal statue drop rate", getValue: () => owner<RoyalArmory>('royalArmory').statues.find(statue => statue.index === 1)!.getBonus() },
    { key: "family32", name: "recipient Royal Guardian Family bonus", getValue: () => owner<Family>('family').getClassBonus(ClassIndex.Royal_Guardian)!.getBonus(player) },
    { key: "sushi48", name: "Sushi drop rate", getValue: () => owner<SushiStation>('sushi').getBonusFromIndex(48) },
    { key: "jelly14", name: "earned Jelly obstruction drop rate", getValue: () => owner<JellyOperator>('jellyOperator').getObstructionBonus(14) },
    { key: "pristine3", name: "complete unlocked pristine drop-rate multiplier", getValue: () => {
      const charm = owner<Sneaking>('sneaking').pristineCharms.find(charm => charm.data.itemId === 3)!;
      return charm.unlocked ? charm.getBonus() : 1;
    }, getExpected: () => 1 + terms.pristine3 / 100 },
    { key: "vialDrop", name: "Alchemy multiplicative drop-rate vial", getValue: () => owner<Alchemy>('alchemy').getVialBonusForKey('7drMulto') },
    { key: "bronzehead", name: "earned Bronzehead reward in percentage points", getValue: () => owner<Minehead>('minehead').getBonusFromIndex(0) },
    { key: "mineheadTrade", name: "complete Minehead trade multiplier", getValue: () => owner<Minehead>('minehead').getTradeDropRateMultiplier() },
    { key: "cardMini5", name: "mini5a card level", getValue: () => player.cardInfo!.cards.find(card => card.id === 'mini5a')!.getLevels() },
    { key: "cardCaveC", name: "caveC card level", getValue: () => player.cardInfo!.cards.find(card => card.id === 'caveC')!.getLevels() },
    { key: "cardCaveD", name: "caveD card level", getValue: () => player.cardInfo!.cards.find(card => card.id === 'caveD')!.getLevels() },
    { key: "cardAnniversary", name: "anni4Event1 card level", getValue: () => player.cardInfo!.cards.find(card => card.id === 'anni4Event1')!.getLevels() },
    { key: "cardLuckEvent", name: "luckEvent1 card level", getValue: () => player.cardInfo!.cards.find(card => card.id === 'luckEvent1')!.getLevels() },
    { key: "card10", name: "prepared card drop-rate effect10", getValue: () => Card.GetTotalBonusForId(cards(), 10) },
    { key: "card101", name: "prepared card drop-rate effect101", getValue: () => Card.GetTotalBonusForId(cards(), 101) },
    { key: "set5", name: "saved drop-rate card set5", getValue: () => player.cardInfo!.getBonusForId(5) },
    { key: "set6", name: "saved drop-rate card set6", getValue: () => player.cardInfo!.getBonusForId(6) },
    { key: "talent239", name: "recipient drop-rate talent239", getValue: () => player.getTalentBonusAtInputs(239, player.finalTalentInputs) },
    { key: "talent279", name: "recipient drop-rate talent279", getValue: () => player.getTalentBonusAtInputs(279, player.finalTalentInputs) },
    { key: "talent24", name: "recipient drop-rate talent24", getValue: () => player.getTalentBonusAtInputs(24, player.finalTalentInputs) },
    { key: "talent655", name: "recipient drop-rate talent655", getValue: () => player.getTalentBonusAtInputs(655, player.finalTalentInputs) },
    { key: "companion22", name: "active companion22 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 22) },
    { key: "companion158", name: "active companion158 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 158) },
    { key: "companion111", name: "active companion111 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 111) },
    { key: "companion132", name: "active companion132 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 132) },
    { key: "companion3", name: "active companion3 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 3) },
    { key: "companion50", name: "active companion50 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 50) },
    { key: "companion168", name: "active companion168 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 168) },
    { key: "companion26", name: "active companion26 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 26) },
    { key: "companion160", name: "active companion160 drop-rate contribution", getValue: () => getCompanionActiveBonus(owner<Companion[]>('companions'), 160) },
    { key: "companion132Level2", name: "owned level-two companion132 flag", getValue: () => isCompanionLevelTwo(owner<Companion[]>('companions'), 132) },
    { key: "equipment2", name: "distinct equipment DropRate", getValue: () => player.gear.getBonus(EquipmentBonus.DropRate) },
    { key: "equipment102", name: "distinct equipment DropChance", getValue: () => player.gear.getBonus(EquipmentBonus.DropChance) },
    { key: "equipment99", name: "distinct equipment BonusDropRate", getValue: () => player.gear.getBonus(EquipmentBonus.BonusDropRate) },
    { key: "equipment91", name: "distinct equipment DropRateMulti", getValue: () => player.gear.getBonus(EquipmentBonus.DropRateMulti) },
    { key: "tome2", name: "recipient Tome drop-rate effect2", getValue: () => owner<Tome>('tome').getTomeBonus(2, player) },
    { key: "tome7", name: "recipient Tome drop-rate effect7", getValue: () => owner<Tome>('tome').getTomeBonus(7, player) },
    { key: 'workbench', name: 'complete Archlord Of The Pirates multiplier', getValue: () => Talent.getArchlordOfThePiratesMultiplier(
      owner<Player[]>('players'), player.finalTalentInputs, owner<Account>('account').plunderousMobKills,
    ) },
  ];
  parameters.forEach(({ key, name, getValue, getExpected }) => {
    it(`matches ${name}`, () => expect(getValue()).toMatchLiveGame(getExpected ? getExpected() : terms[key], 0));
  });
});
