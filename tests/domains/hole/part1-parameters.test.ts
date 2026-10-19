import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Compass } from '../../../data/domain/compass';
import type { Grimoire } from '../../../data/domain/grimoire';
import type { Tesseract } from '../../../data/domain/tesseract';
import type { Card } from '../../../data/domain/cards';
import type { UpgradeVault } from '../../../data/domain/upgradeVault';
import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { Farming } from '../../../data/domain/world-6/farming';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Sneaking } from '../../../data/domain/world-6/sneaking';
import type { Tome } from '../../../data/domain/world-4/tome';
import type { EventShop } from '../../../data/domain/eventShop';
import type { Summoning } from '../../../data/domain/world-6/summoning';
import type { Emperor } from '../../../data/domain/world-6/emperor';
import type { SushiStation } from '../../../data/domain/world-7/sushi';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import type { Player } from '../../../data/domain/player';
import type { Companion } from '../../../data/domain/companions';
import { getCompanionActiveBonus } from '../../../data/domain/companions';
import type { Stamp } from '../../../data/domain/world-1/stamps';
import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import { rateForTarget } from './part1-test-helpers';

function pristinePercent(data: Map<string, any>): number {
 const charm = (data.get('sneaking') as Sneaking).pristineCharms.find(charm => charm.data.itemId === 21)!;
 return charm.unlocked ? (charm.getBonus() - 1) * 100 : 0;
}

function statueBonus(data: Map<string, any>): number {
 const player = getTargetPlayer(data.get('players') as Player[]);
 const statues = (data.get('statues') as PlayerStatues[]).find(statues => statues.playerID === player.playerID)!;
 return statues.statues.find(statue => statue.index === 28)!.getBonus(player);
}

const parameters: { key: string; description: string; extract: (data: Map<string, any>, hole: Hole) => number }[] = [
 { key: 'compass_59', description: 'Compass Villager EXP', extract: (data, hole) => (data.get('compass') as Compass).getUpgradeBonus(59) },
 { key: 'legend_12', description: 'Legend talent Villager EXP', extract: (data, hole) => (data.get('legendTalents') as LegendTalents).getBonusFromIndex(12) },
 { key: 'pristine_21', description: 'Pristine Charm Villager EXP percentage', extract: (data, hole) => pristinePercent(data) },
 { key: 'companion_13', description: 'Active companion input to growth and Opals', extract: (data, hole) => getCompanionActiveBonus(data.get('companions') as Companion[], 13) },
 { key: 'statue_28', description: 'Captured character Villager Statue percentage', extract: (data, hole) => statueBonus(data) },
 { key: 'statue_factor', description: 'Captured character Villager Statue multiplier', extract: (data, hole) => rateForTarget(data).statueFactor! },
 { key: 'jar_4', description: 'Natural Pearl collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(4) },
 { key: 'jar_10', description: 'Shadow Prism collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(10) },
 { key: 'jar_12', description: 'Emerald Ore collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(12) },
 { key: 'jar_16', description: 'Rosemerald collectible bonus to Bolaia Study rate', extract: (data, hole) => hole.jar.getBonus(16) },
 { key: 'jar_22', description: 'Tabula Rasastone collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(22) },
 { key: 'jar_29', description: 'Arcane Prism collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(29) },
 { key: 'jar_35', description: 'Sunroot Splinters collectible bonus to all villager EXP', extract: (data, hole) => hole.jar.getBonus(35) },
 { key: 'event_6', description: 'Event Shop Villager EXP ownership', extract: (data, hole) => Number((data.get('eventShop') as EventShop).isBonusOwned(6)) },
 { key: 'lore_1', description: 'Tome epilogue Villager EXP', extract: (data, hole) => (data.get('tome') as Tome).getEpilogueBonus(1) },
 { key: 'exotic_51', description: 'Exotic Market Villager EXP', extract: (data, hole) => (data.get('farming') as Farming).getExoticMarketBonusValue(51) },
 { key: 'arcade_38', description: 'Arcade Villager EXP', extract: (data, hole) => (data.get('arcade') as Arcade).bonuses[38].getBonus() },
 { key: 'grimoire_11', description: 'Pure Opals Grimoire grant included in total earned Opals', extract: (data, hole) => (data.get('grimoire') as Grimoire).getUpgradeBonus(11) },
 { key: 'grimoire_29', description: 'Villager Extraciricular Grimoire multiplier to all villager EXP', extract: (data, hole) => (data.get('grimoire') as Grimoire).getUpgradeBonus(29) },
 { key: 'arcane_25', description: 'Ethereal Opals Arcane grant included in total earned Opals', extract: (data, hole) => (data.get('tesseract') as Tesseract).getUpgradeBonus(25) },
 { key: 'arcane_32', description: 'Villager Indoctrination Arcane multiplier to all villager EXP', extract: (data, hole) => (data.get('tesseract') as Tesseract).getUpgradeBonus(32) },
 { key: 'schematic_0_25', description: 'Opal Dividends schematic bonus to hourly EXP per invested Opal', extract: (data, hole) => hole.getSchematicBonus(0, 25) },
 { key: 'schematic_48_0', description: 'Gloomie Opie schematic bonus to all villager EXP from Gloomie colonies', extract: (data, hole) => hole.getSchematicBonus(48, 0) },
 { key: 'schematic_85_2', description: 'Peer Reviewed Books schematic bonus to Study rate per Bolaia level', extract: (data, hole) => hole.getSchematicBonus(85, 2) },
 { key: 'schematic_87_3', description: 'Cutting Edge Research schematic bonus to Study rate per Bolaia level', extract: (data, hole) => hole.getSchematicBonus(87, 3) },
 { key: 'schematic_88_5', description: 'Billion Dollar Grant schematic bonus to Study rate per Bolaia level', extract: (data, hole) => hole.getSchematicBonus(88, 5) },
 { key: 'schematic_99_5', description: '2nd Billion Dollar Grant schematic bonus to Study rate per Bolaia level', extract: (data, hole) => hole.getSchematicBonus(99, 5) },
 { key: 'schematic_102_1', description: 'Justin Opal schematic grant included in total earned Opals', extract: (data, hole) => hole.getSchematicBonus(102, 1) },
 { key: 'fountain_0_14', description: 'Cosmological Boost Fountain bonus to Cosmo EXP', extract: (data, hole) => hole.getFountainBonus(0, 14) },
 { key: 'fountain_1_14', description: 'Skim Reading Fountain bonus to Bolaia Study rate', extract: (data, hole) => hole.getFountainBonus(1, 14) },
 { key: 'monument_0_3', description: 'Bravery Villager EXP', extract: (data, hole) => hole.getMonumentBonus('Bravery', 3) },
 { key: 'monument_1_3', description: 'Justice Villager EXP', extract: (data, hole) => hole.getMonumentBonus('Justice', 3) },
 { key: 'monument_2_3', description: 'Wisdom Villager EXP', extract: (data, hole) => hole.getMonumentBonus('Wisdom', 3) },
 { key: 'measurement_0', description: 'Measurement 0 Villager EXP', extract: (data, hole) => hole.measurements[0].getBonus() },
 { key: 'measurement_7', description: 'Measurement 7 Villager EXP', extract: (data, hole) => hole.measurements[7].getBonus() },
 { key: 'majik_0', description: 'Opal Enthusiasm Majik bonus to villager EXP per ten invested Opals', extract: (data, hole) => hole.majiks.VillageUpgrades[0].getBonus() },
 { key: 'majik_1', description: 'Contented Creator Majik bonus to all villager EXP per built schematic', extract: (data, hole) => hole.majiks.VillageUpgrades[1].getBonus() },
 { key: 'majik_2', description: 'Cosmo, Enhance! Majik bonus to all villager EXP', extract: (data, hole) => hole.majiks.VillageUpgrades[2].getBonus() },
 { key: 'majik_4', description: 'Study All Nighter Majik bonus to Bolaia Study rate', extract: (data, hole) => hole.majiks.VillageUpgrades[4].getBonus() },
 { key: 'majik_5', description: 'Equal Spread Majik bonus to all villager EXP per five Opals in the least-invested rescued villager', extract: (data, hole) => hole.majiks.VillageUpgrades[5].getBonus() },
 { key: 'built_schematics', description: 'Built schematic count used by Contented Creator', extract: (data, hole) => hole.schematics.filter(schematic => schematic.unlocked).length },
 { key: 'gloomie_card', description: 'Gloomie card level before growth cap', extract: (data, hole) => (data.get('cards') as Card[]).find(card => card.id === 'caveB')!.getLevels() },
 { key: 'bell_1', description: 'Bell Villager EXP', extract: (data, hole) => hole.bell.bonuses[1].getBonus() },
 { key: 'summoning_21', description: 'Summoning Villager EXP', extract: (data, hole) => (data.get('summoning') as Summoning).getSummoningWinnerBonusFromIndex(21) },
 { key: 'vault_73', description: 'Vault Villager EXP', extract: (data, hole) => (data.get('upgradeVault') as UpgradeVault).getBonusForId(73) },
 { key: 'study_stamp', description: 'Settled Study stamp', extract: (data, hole) => getStampBonusForKey(data.get('stamps') as Stamp[][], 'VillageStudy') },
 { key: 'compass_52', description: 'Compass Opal grant', extract: (data, hole) => (data.get('compass') as Compass).getUpgradeBonus(52) },
 { key: 'emperor_3', description: 'Emperor Opal input before refresh floor', extract: (data, hole) => (data.get('emperor') as Emperor).emperorBonuses[3].getBonus() },
 { key: 'sushi_56', description: 'Settled Sushi Opal grant', extract: (data, hole) => (data.get('sushi') as SushiStation).getBonusFromIndex(56) },
 { key: 'least_investment', description: 'Least rescued-villager investment used by Equal Spread', extract: (data, hole) => hole.allocationEffects.leastUnlockedInvestment! },
 { key: 'caverns_owned', description: 'Released cavern count used by Study access, reset and role branch', extract: (data, hole) => Math.min(hole.studies.length, hole.villagers[0].level) },
 { key: 'study_rate', description: 'Shared Study rate used by target and eligible neighbors', extract: (data, hole) => hole.studyRate! },
 { key: 'study_bonus_0', description: 'The Well Study bonus to bucket fill rate per bar expansion', extract: (data, hole) => hole.getStudyBolaiaBonuses(0) },
 { key: 'study_bonus_1', description: 'Motherlode Study contribution to other skilling cavern resource requirement divisors per destroyed layer', extract: (data, hole) => hole.getStudyBolaiaBonuses(1) },
 { key: 'study_bonus_2', description: 'The Den Study bonus to score per defeated Golden Hound', extract: (data, hole) => hole.getStudyBolaiaBonuses(2) },
 { key: 'study_bonus_3', description: 'Bravery Study minimum damage as a percentage of maximum damage', extract: (data, hole) => hole.getStudyBolaiaBonuses(3) },
 { key: 'study_bonus_4', description: 'The Bell Study extra levels for a random bonus every twentieth ring', extract: (data, hole) => hole.getStudyBolaiaBonuses(4) },
 { key: 'study_bonus_5', description: 'The Harp Study bonus to the exceptional string EXP multiplier', extract: (data, hole) => hole.getStudyBolaiaBonuses(5) },
 { key: 'study_bonus_6', description: 'The Lamp Study additional daily wishes', extract: (data, hole) => hole.getStudyBolaiaBonuses(6) },
 { key: 'study_bonus_7', description: 'The Hive Study contribution to other skilling cavern resource requirement divisors per harvested layer', extract: (data, hole) => hole.getStudyBolaiaBonuses(7) },
 { key: 'study_bonus_8', description: 'Grotto Study bonus to credited Gloomie kills toward challenging the Monarch', extract: (data, hole) => hole.getStudyBolaiaBonuses(8) },
 { key: 'study_bonus_9', description: 'Justice Study bonus to Opal reward chance', extract: (data, hole) => hole.getStudyBolaiaBonuses(9) },
 { key: 'study_bonus_10', description: 'The Jars Study bonus to collectible enchantment chance', extract: (data, hole) => hole.getStudyBolaiaBonuses(10) },
 { key: 'study_bonus_11', description: 'Evertree Study contribution to other skilling cavern resource requirement divisors per whittled trunk', extract: (data, hole) => hole.getStudyBolaiaBonuses(11) },
 { key: 'study_bonus_12', description: 'Wisdom Study additional starting attempts in normal story mode', extract: (data, hole) => hole.getStudyBolaiaBonuses(12) },
 { key: 'study_bonus_13', description: 'Gambit Study percentage bonus to total Gambit points', extract: (data, hole) => hole.getStudyBolaiaBonuses(13) },
 { key: 'study_bonus_14', description: 'Temple Study additional chance to receive double torches on pickup', extract: (data, hole) => hole.getStudyBolaiaBonuses(14) },
 { key: 'study_bonus_15', description: 'Fountain Study bonus to marble production', extract: (data, hole) => hole.getStudyBolaiaBonuses(15) },
 { key: 'study_bonus_16', description: 'Trench Study contribution to other skilling cavern resource requirement divisors per completed depth', extract: (data, hole) => hole.getStudyBolaiaBonuses(16) },
 { key: 'study_bonus_17', description: 'The Cove Study count of daily discounted upgrades', extract: (data, hole) => hole.getStudyBolaiaBonuses(17) },
 { key: 'villager_requirement_0', description: 'Villager 0 next requirement used by claim readiness', extract: (data, hole) => hole.villagers[0].getExpRequirement()! },
 { key: 'villager_requirement_1', description: 'Villager 1 next requirement used by claim readiness', extract: (data, hole) => hole.villagers[1].getExpRequirement()! },
 { key: 'villager_requirement_2', description: 'Villager 2 next requirement used by claim readiness', extract: (data, hole) => hole.villagers[2].getExpRequirement()! },
 { key: 'villager_requirement_3', description: 'Villager 3 next requirement used by claim readiness', extract: (data, hole) => hole.villagers[3].getExpRequirement()! },
 { key: 'villager_requirement_4', description: 'Villager 4 next requirement used by claim readiness', extract: (data, hole) => hole.villagers[4].getExpRequirement()! },
 { key: 'study_requirement_0', description: 'Study 0 next requirement used by claim readiness', extract: (data, hole) => hole.studies[0].getRequirement()! },
 { key: 'study_requirement_1', description: 'Study 1 next requirement used by claim readiness', extract: (data, hole) => hole.studies[1].getRequirement()! },
 { key: 'study_requirement_2', description: 'Study 2 next requirement used by claim readiness', extract: (data, hole) => hole.studies[2].getRequirement()! },
 { key: 'study_requirement_3', description: 'Study 3 next requirement used by claim readiness', extract: (data, hole) => hole.studies[3].getRequirement()! },
 { key: 'study_requirement_4', description: 'Study 4 next requirement used by claim readiness', extract: (data, hole) => hole.studies[4].getRequirement()! },
 { key: 'study_requirement_5', description: 'Study 5 next requirement used by claim readiness', extract: (data, hole) => hole.studies[5].getRequirement()! },
 { key: 'study_requirement_6', description: 'Study 6 next requirement used by claim readiness', extract: (data, hole) => hole.studies[6].getRequirement()! },
 { key: 'study_requirement_7', description: 'Study 7 next requirement used by claim readiness', extract: (data, hole) => hole.studies[7].getRequirement()! },
 { key: 'study_requirement_8', description: 'Study 8 next requirement used by claim readiness', extract: (data, hole) => hole.studies[8].getRequirement()! },
 { key: 'study_requirement_9', description: 'Study 9 next requirement used by claim readiness', extract: (data, hole) => hole.studies[9].getRequirement()! },
 { key: 'study_requirement_10', description: 'Study 10 next requirement used by claim readiness', extract: (data, hole) => hole.studies[10].getRequirement()! },
 { key: 'study_requirement_11', description: 'Study 11 next requirement used by claim readiness', extract: (data, hole) => hole.studies[11].getRequirement()! },
 { key: 'study_requirement_12', description: 'Study 12 next requirement used by claim readiness', extract: (data, hole) => hole.studies[12].getRequirement()! },
 { key: 'study_requirement_13', description: 'Study 13 next requirement used by claim readiness', extract: (data, hole) => hole.studies[13].getRequirement()! },
 { key: 'study_requirement_14', description: 'Study 14 next requirement used by claim readiness', extract: (data, hole) => hole.studies[14].getRequirement()! },
 { key: 'study_requirement_15', description: 'Study 15 next requirement used by claim readiness', extract: (data, hole) => hole.studies[15].getRequirement()! },
 { key: 'study_requirement_16', description: 'Study 16 next requirement used by claim readiness', extract: (data, hole) => hole.studies[16].getRequirement()! },
 { key: 'study_requirement_17', description: 'Study 17 next requirement used by claim readiness', extract: (data, hole) => hole.studies[17].getRequirement()! },
];

describe('Hole part 1 direct calculation parameters', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;

 beforeAll(() => {
  results = loadExtractionResults('hole-part1-parameters-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });


 parameters.forEach(parameter => {
  it(`matches direct ${parameter.description}`, () => {
   const actual = parameter.extract(data, hole);
   expect(actual).not.toBeNull();
   expect(actual).toMatchLiveGame(getExtractedValue(results, parameter.key), 0);
  });
 });



});
