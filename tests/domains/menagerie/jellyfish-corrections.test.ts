import { initAllItems } from '../../../data/domain/items';
import { Menagerie } from '../../../data/domain/menagerie';

describe('Menagerie Red page-item tracking', () => {
  it('counts positive inputs across all 14 positions and replaces rows on reprocessing', () => {
    const menagerie = new Menagerie().init(initAllItems(), 0);
    const red = menagerie.redJellyfish;
    const savedInputs = Array.from({ length: 14 }, () => 0);
    savedInputs[6] = 2;
    savedInputs[13] = 1;

    red.parse(undefined, savedInputs);
    red.update(true);

    expect(red.trackedPageItemCount).toBe(2);
    expect(red.trackedPageItemSlots).toBe(14);
    expect(red.pageItems).toHaveLength(7);
    expect(red.pageItems[6]).toMatchObject({ index: 6, quantity: 2 });
    expect(red.pageItems[6].item.displayName).toBe("Chapter Seven 'Burning Crusade'");
    expect(red.pageItems[6].item.getImageData().location).toBe('Spelunking6');

    red.parse(undefined, Array.from({ length: 14 }, () => 0));
    red.update(false);

    expect(red.trackedPageItemCount).toBe(0);
    expect(red.pageItems).toHaveLength(7);
    expect(red.pageItems.every(pageItem => pageItem.quantity === 0)).toBe(true);
  });
});

describe('Menagerie Silver currency capacity', () => {
  it('credits at most remaining account currency capacity without changing event probabilities', () => {
    const menagerie = new Menagerie().init(initAllItems(), 0);
    const silver = menagerie.silverJellyfish;
    const savedRow = Array.from({ length: 11 }, () => 0);
    savedRow[10] = 180;
    silver.parse(savedRow);

    silver.update(true, 1_999_999_999);

    expect(silver.obolFragments).toBe(1_999_999_999);
    expect(silver.conversionRate).toBe(1.9);
    expect(silver.conversionEvents).toEqual([{ fragments: 1, probability: 1 }]);
    expect(silver.expectedCreditedFragments).toBe(1);
  });
});
