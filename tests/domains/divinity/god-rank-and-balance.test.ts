import { Divinity } from '../../../data/domain/world-5/divinity';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';

describe('Divinity rank and balance', () => {
  let divinity: Divinity;

  beforeAll(() => {
    divinity = loadGameDataFromSave('latest').get('divinity') as Divinity;
  });

  it('matches the current God Rank from the genuine save', () => {
    const savedDivinity = loadTestSave('latest').get('Divinity') as number[];
    expect(divinity.godRank).toBe(Math.max(0, Number(savedDivinity[25]) - 10));
  });

  it('matches the saved Divinity point balance used by Singularity', () => {
    const savedDivinity = loadTestSave('latest').get('Divinity') as number[];
    expect(divinity.currentDivinity).toBe(Number(savedDivinity[24]));
  });

});
