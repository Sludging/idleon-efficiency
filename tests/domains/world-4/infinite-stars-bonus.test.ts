import { InfiniteStarsBonus } from '../../../data/domain/world-4/rift';

describe('Infinite Stars effective bonus', () => {
    it('grants base and shiny counts only while active', () => {
        const bonus = new InfiniteStarsBonus(1, 'Infinite Stars', 11, 'Description');
        bonus.shinyBonus = 3;

        expect(bonus.getBonus()).toBe(0);

        bonus.active = true;
        expect(bonus.getBonus()).toBe(8);

        bonus.shinyBonus = 0;
        expect(bonus.getBonus()).toBe(5);
    });
});
