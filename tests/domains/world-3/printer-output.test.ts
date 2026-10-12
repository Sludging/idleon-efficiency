import { Printer, updatePrinter } from '../../../data/domain/world-3/construction/printer';
import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'printer-output-data.json';
const printerOutputPlayerSlots = Array.from({ length: 10 }, (_, playerIndex) => playerIndex);


describe('Printer output', () => {
  let extractionResults: ExtractionResults;
  let companions: Companion[];
  let printer: Printer;


  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);


    const gameData = loadGameDataFromSave(saveName);

    updatePrinter(gameData);
    companions = gameData.get('companions') as Companion[];
    printer = gameData.get('printer') as Printer;
  });

  printerOutputPlayerSlots.forEach(playerIndex => {
    it(`matches active per-slot output for character ${playerIndex}`, () => {
      const activeSamples = printer.samples[playerIndex]?.filter(sample => sample.printing > 0) ?? [];
      expect(activeSamples.length).toBeGreaterThan(0);

      const gameOutputMultiplier = getExtractedValue(extractionResults, `printer_extra_printing_player_${playerIndex}`);
      const gameCompanion17Effect = getExtractedValue(extractionResults, 'printer_companion_17_effect');
      const websiteCompanion17Effect = getCompanionActiveBonus(companions, 17);

      activeSamples.forEach(sample => {
        const expectedOutput = gameOutputMultiplier * sample.printingQuantity;
        expect(sample.getSampleQuantity(false)).toMatchLiveGameWithDetails(expectedOutput, {
          tolerance: 0,
          context: `Printer output / character ${playerIndex} / ${sample.item} / Lab ${sample.inLab} / Harriep ${sample.harriep}`,
          debugInfo: {
            gameExtraPrinting: `Game ExtraPrinting(${playerIndex}) = ${gameOutputMultiplier}`,
            possibleCauses: [
              `Companion 17 active-level effect: website=${websiteCompanion17Effect}; game Companions(17)=${gameCompanion17Effect}`,
            ],
          },
        });
      });
    });
  });
});

