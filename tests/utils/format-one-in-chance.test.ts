import { formatOneInChance } from '../../data/utility';

describe('formatOneInChance', () => {
  it('shows no chance for zero probability', () => {
    expect(formatOneInChance(0)).toBe('No chance');
  });

  it('shows one out of one for a guaranteed outcome', () => {
    expect(formatOneInChance(1)).toBe('1 out of 1');
  });

  it('preserves an exact integer denominator', () => {
    expect(formatOneInChance(1 / 30)).toBe('1 out of 30');
  });

  it('rounds floating-point noise near an integer denominator without marking it approximate', () => {
    const probability = 1 / (30 + Number.EPSILON * 30);

    expect(formatOneInChance(probability)).toBe('1 out of 30');
  });

  it('keeps large exact denominators readable with comma grouping', () => {
    expect(formatOneInChance(1 / 1234567)).toBe('1 out of 1,234,567');
  });

  it('marks a noninteger denominator approximate and formats its displayed precision', () => {
    expect(formatOneInChance(0.00135)).toBe('approximately 1 out of 740');
  });
});
