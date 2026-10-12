import type { Arcade } from '../../../data/domain/world-2/arcade';
import type { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  type ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'jelly-operator-presentation-data.json';

// Direct whole calculations used by DailyTries, CurrencyMulti, EXPMulti,
// BloodcellDaily, and SlotPurchasesLeft. Internal producer dependencies remain
// the responsibility of those producers' own parameter tests.
describe('Jelly Operator overview direct calculated parameters', () => {
  let jellyOperator: JellyOperator;
  let research: ResearchGrid;
  let arcade: Arcade;
  let collider: AtomCollider;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    jellyOperator = gameData.get('jellyOperator') as JellyOperator;
    research = gameData.get('research') as ResearchGrid;
    arcade = gameData.get('arcade') as Arcade;
    collider = gameData.get('collider') as AtomCollider;
  });

  it('matches the Research square level used for daily attempt allowance', () => {
    expect(research.getBonusForId(186, 1)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_research_daily_allowance'),
      0,
    );
  });

  it('matches the Research percentage used for Bloodcells per damage', () => {
    expect(research.getBonusForId(187, 0)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_research_bloodcell_bonus'),
      0,
    );
  });

  it('matches the whole Arcade percentage used for Bloodcells per damage', () => {
    expect(arcade.bonuses.find(bonus => bonus.index === 72)!.getBonus()).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_arcade_bloodcell_bonus'),
      0,
    );
  });

  it('matches the whole atom percentage used for Bloodcells per damage', () => {
    expect(collider.atoms.find(atom => atom.index === 15)!.getBonus()).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_atom_bloodcell_bonus'),
      0,
    );
  });

  it('matches the bundle ownership coefficient used for Bloodcell gain and plot capacity', () => {
    expect(Number(jellyOperator.jellyBundleOwned)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_bundle_owned'),
      0,
    );
  });

  it('matches the selected and unlocked Sepsis Bloodcell percentage', () => {
    expect(jellyOperator.getFeverBonus(2)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_fever_bloodcell_bonus'),
      0,
    );
  });

  it('matches the selected and unlocked Nausea XP percentage', () => {
    expect(jellyOperator.getFeverBonus(3)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_fever_xp_bonus'),
      0,
    );
  });

  it.each([
    { index: 24, name: 'Apol Bloodcell percentage', extractionKey: 'jelly_obstruction_bloodcell_bonus' },
    { index: 44, name: 'Loveloon plot capacity', extractionKey: 'jelly_obstruction_plot_bonus' },
  ])('matches the earned obstruction parameter for $name', ({ index, extractionKey }) => {
    expect(jellyOperator.obstructions.find(obstruction => obstruction.index === index)!.getBonus()).toMatchLiveGame(
      getExtractedValue(extractionResults, extractionKey),
      0,
    );
  });

  it('matches the DPS-derived multiplier used for Bloodcells per damage', () => {
    expect(jellyOperator.getDPSBloodcellMultiplier()).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_dps_bloodcell_multiplier'),
      0,
    );
  });

  it('matches combined cell levels multiplied by the Cell Dialysis quantity', () => {
    expect(jellyOperator.getTotalCellLevels()).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_total_cell_levels'),
      0,
    );
  });

  it.each([
    { index: 8, name: 'Another Unlock plot capacity' },
    { index: 9, name: 'Slot Unlocking plot capacity' },
    { index: 10, name: 'Cell Biology XP percentage and XP-award gate' },
    { index: 11, name: 'Cell Evolution multiplicative XP percentage' },
    { index: 23, name: 'Bloodcell Coagulation additive Bloodcell percentage' },
    { index: 24, name: 'Bloodletting I additive Bloodcell percentage' },
    { index: 25, name: 'Bloodletting II additive Bloodcell percentage' },
    { index: 26, name: 'Blood Tribunal I multiplicative Bloodcell percentage' },
    { index: 0, name: 'Amoeba cultivation for the cell unlock count' },
    { index: 1, name: 'Plasmid cultivation for the cell unlock count' },
    { index: 2, name: 'Ribosome cultivation for the cell unlock count' },
    { index: 3, name: 'Organelle cultivation for the cell unlock count' },
    { index: 4, name: 'Immunoid cultivation for the cell unlock count' },
    { index: 5, name: 'Virus cultivation for the cell unlock count' },
    { index: 6, name: 'Mitochondria cultivation for the cell unlock count' },
    { index: 7, name: 'Gigacyst cultivation for the cell unlock count' },
    { index: 27, name: 'Blood Tribunal II multiplicative Bloodcell percentage' },
    { index: 30, name: 'Cell Adaptation I additive XP percentage' },
    { index: 31, name: 'Cell Adaptation II additive XP percentage' },
    { index: 33, name: 'Cell Dialysis percentage per combined cell level' },
    { index: 38, name: 'Daily Transfusion percentage of the best operation' },
  ])('matches the saved upgrade quantity for $name', ({ index }) => {
    expect(jellyOperator.upgrades.find(upgrade => upgrade.index === index)!.getQuantity()).toMatchLiveGame(
      getExtractedValue(extractionResults, `jelly_upgrade_quantity_${index}`),
      0,
    );
  });
});
