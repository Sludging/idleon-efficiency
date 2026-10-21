import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { Menagerie } from '../../../data/domain/menagerie';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const results = loadExtractionResults('clamwork-account-outputs-data.json');
validateExtractionHealth(results);
const accountData = loadGameDataFromSave('latest');
const clamworks = accountData.get('clamworks') as Clamworks;
const menagerie = accountData.get('menagerie') as Menagerie;
const parameters = results.extractions.clamwork_parameters.result;
const scurgeInputs = results.extractions.scurge_bonus_inputs.result;
const scurgePearlInputs = results.extractions.scurge_pearl_bonus_inputs.result;


describe('Clam Work direct parameters', () => {
  it('matches base pearl bonus factors used by the public pearl output', () => {
    expect(clamworks.getClamBonus(0)).toMatchLiveGame(parameters[0], 0);
    expect(clamworks.getClamBonus(7)).toMatchLiveGame(parameters[1], 0);
  });

  it('matches the full Black Pearl value returned by Clam bonus 5', () => {
    const blackPearlValue = results.extractions.account_outputs.result[1];
    expect(clamworks.getClamBonus(5)).toMatchLiveGame(blackPearlValue, 0);
  });

  it('matches Clam bonus used directly by Clam count', () => {
    const clamBonus = results.extractions.clam_count_bonus_parameter.result;
    expect(clamworks.getClamBonus(1)).toMatchLiveGame(clamBonus, 0);
  });

  it('matches all native Scurge bonus inputs used by solo Clam experience', () => {
    expect(clamworks.getScurgeBonus(0, menagerie.scurgeSpentLevels)).toMatchLiveGame(scurgeInputs[0], 0);
    expect(clamworks.getScurgeBonus(4, menagerie.scurgeSpentLevels)).toMatchLiveGame(scurgeInputs[1], 0);
    expect(clamworks.getScurgeBonus(2, menagerie.scurgeSpentLevels)).toMatchLiveGame(scurgeInputs[2], 0);
  });

  it('matches native Scurge bonus inputs used by the first and final pearl multipliers', () => {
    expect(clamworks.getScurgeBonus(1, menagerie.scurgeSpentLevels)).toMatchLiveGame(scurgePearlInputs[0], 0);
    expect(clamworks.getScurgeBonus(8, menagerie.scurgeSpentLevels)).toMatchLiveGame(scurgePearlInputs[1], 0);
  });

});
