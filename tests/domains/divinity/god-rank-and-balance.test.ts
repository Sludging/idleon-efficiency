import { Divinity } from '../../../data/domain/world-5/divinity';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

describe('Divinity rank and balance', () => {
  let divinity: Divinity;

  beforeAll(() => {
    divinity = loadGameDataFromSave('latest').get('divinity') as Divinity;
  });

  it('matches the current God Rank from the genuine save', () => {
    const savedDivinity = loadTestSave('latest').get('Divinity') as number[];
    expect(divinity.godRank).toMatchLiveGameWithDetails(Math.max(0, Number(savedDivinity[25]) - 10), {
      tolerance: 0,
      context: 'Current Divinity God Rank, excluding the ten unlocked gods',
    });
  });

  it('matches the saved Divinity point balance used by Singularity', () => {
    const savedDivinity = loadTestSave('latest').get('Divinity') as number[];
    expect(divinity.currentDivinity).toMatchLiveGameWithDetails(Number(savedDivinity[24]), {
      tolerance: 0,
      context: 'Saved Divinity points available before Singularity conversion',
    });
  });

});
