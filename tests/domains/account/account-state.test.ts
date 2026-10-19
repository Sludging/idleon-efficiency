import { Account } from '../../../data/domain/account';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

describe('Account saved miniboss and Plunderous progression', () => {
  it('preserves account-owned minibosses and Plunderous kills from the genuine save', () => {
    const account = loadGameDataFromSave('latest').get('account') as Account;
    const options = loadTestSave('latest').get('OptLacc') as number[];

    expect(account.miniBosses.map(boss => boss.bossInternalName)).toEqual(['mini3a', 'mini4a', 'mini5a', 'mini6a']);
    expect(account.miniBosses.map(boss => boss.daysSinceLastKill)).toEqual([
      Number(options[96] ?? 0),
      Number(options[98] ?? 0),
      Number(options[225] ?? 0),
      Number(options[226] ?? 0),
    ]);
    expect(account.plunderousMobKills).toBe(Number(options[139] ?? 0));
  });
});
