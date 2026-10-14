import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import type { TaskBoard } from '../../../data/domain/tasks';
import { getCompanionActiveBonus, type Companion } from '../../../data/domain/companions';
import type { Rift, SkillMastery } from '../../../data/domain/world-4/rift';
import type { Player } from '../../../data/domain/player';
import type { BigFish } from '../../../data/domain/world-7/bigFish';
import type { Meritocraty } from '../../../data/domain/world-7/meritocraty';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { SushiStation } from '../../../data/domain/world-7/sushi';
import type { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { Card } from '../../../data/domain/cards';
import type { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { assertPairing, characterIDs, expected } from './part-2-test-helpers';

let data: Map<string, unknown>;
beforeAll(() => {
    assertPairing();
    data = loadGameDataFromSave('latest');
});

// This block uses only existing public APIs. Run it before changing the selected calculation.
describe('existing producers', () => {
    it('matches the Sailing artifact multiplier input for Journal effects', () => {
        expect((data.get('sailing') as Sailing).artifacts[35].getBonus()).toMatchLiveGame(expected('artifact_35'), 0);
    });
    [4, 5, 61].forEach(index => {
        it(`matches raw stamina upgrade ${index} without Trackometer scaling`, () => {
            expect((data.get('spelunking') as Spelunking).getUpgradeBonus(index))
                .toMatchLiveGame(expected(`upgrade_${index}_raw`), 0);
        });
    });
    it('matches the World 7 maximum-stamina merit contribution', () => {
        const merit = (data.get('taskboard') as TaskBoard).merits.find(entry => entry.index === 50)!;
        expect(merit.level).toBe(expected('merit_50_level'));
        expect(merit.getBonus()).toMatchLiveGame(expected('merit_50_stamina_additive'), 0);
    });
    it('matches the active stamina companion bonus', () => {
        expect(getCompanionActiveBonus(data.get('companions') as Companion[], 148))
            .toMatchLiveGame(expected('companion_148'), 0);
    });
    [
        { slot: 3, label: 'mastery_stamina_effect', name: 'maximum stamina' },
        { slot: 4, label: 'mastery_daily_reads_effect', name: 'daily reads' },
        { slot: 5, label: 'mastery_recharge_effect', name: 'hourly recharge' },
    ].forEach(({ slot, label, name }) => {
        it(`matches the complete Spelunking mastery ${name} effect, not the source unlock indicator`, () => {
            const mastery = (data.get('rift') as Rift).bonuses.find(bonus => bonus.name === 'Skill Mastery') as SkillMastery;
            expect(mastery.getSkillBonus(SkillsIndex.Spelunking, slot)).toMatchLiveGame(expected(label), 0);
        });
    });
    characterIDs.forEach(id => {
        it(`matches character ${id}'s own Spelunking Specialty effect`, () => {
            const player = (data.get('players') as Player[]).find(player => player.playerID === id)!;
            expect(player.getTalentBonus(236)).toMatchLiveGame(expected(`talent_236_player_${id}`), 0);
        });
    });
    it('selects the highest Specialty effect from all actual talent owners', () => {
        const players = data.get('players') as Player[];
        expect(Math.max(...players.map(player => player.getTalentBonus(236))))
            .toMatchLiveGame(expected('talent_236_best'), 0);
    });
    it('matches Advice on Being Tired after the Big Fish unlock gate', () => {
        expect((data.get('bigFish') as BigFish).getBonusFromIndex(1)).toMatchLiveGame(expected('big_fish_advice_1'), 0);
    });
    it('matches the late-prepared Meritocracy recharge effect', () => {
        expect((data.get('meritocraty') as Meritocraty).getCurrentBonus(17)).toMatchLiveGame(expected('meritocracy_17'), 0);
    });
    it('matches the Legend recharge effect', () => {
        expect((data.get('legendTalents') as LegendTalents).getBonusFromIndex(30)).toMatchLiveGame(expected('legend_talent_30'), 0);
    });
    it('matches the unlocked Sushi recharge effect', () => {
        expect((data.get('sushi') as SushiStation).getBonusFromIndex(11)).toMatchLiveGame(expected('sushi_11'), 0);
    });
    it('matches the yellow Alchemy recharge bubble effect', () => {
        expect((data.get('alchemy') as Alchemy).getBubbleBonusForKey('Y11')).toMatchLiveGame(expected('bubble_Y11'), 0);
    });
    it('matches the native recharge card level, not its boosted equipment effect', () => {
        const card = (data.get('cards') as Card[]).find(card => card.id === 'w7a10')!;
        expect(card.getLevels()).toMatchLiveGame(expected('native_card_w7a10'), 0);
    });
});

describe('new Royal Outpost and same-domain stamina producers', () => {
    it('matches the selected Royal Outpost recharge multiplier', () => {
        const royal = data.get('royalArmory') as RoyalArmory;
        expect(royal.getSpelunkingRechargeOutpostMultiplier()).toMatchLiveGame(expected('royal_outpost_category_2'), 0);
    });
    [[2, 0], [3, 0], [2, 1], [5, 2]].forEach(([chapterIndex, bonusIndex]) => {
        it(`matches Journal chapter ${chapterIndex} bonus ${bonusIndex} used directly by stamina`, () => {
            const owner = data.get('spelunking') as Spelunking;
            expect(owner.chapters[chapterIndex].bonuses[bonusIndex].getBonus())
                .toMatchLiveGame(expected(`chapter_${chapterIndex}_${bonusIndex}`), 0);
        });
    });
    it('matches the effective Trackometer maximum-stamina contribution separately from the raw shop bonus', () => {
        expect((data.get('spelunking') as Spelunking).getTrackometerStaminaBonus())
            .toMatchLiveGame(expected('upgrade_61_effective'), 0);
    });
    it('matches the shared recharge rate used directly by saved-snapshot refill estimates', () => {
        expect((data.get('spelunking') as Spelunking).hourlyRecharge)
            .toMatchLiveGame(expected('stamina_recharge_hourly'), 0);
    });
    characterIDs.forEach(id => {
        it(`matches character ${id}'s maximum used directly by its refill estimate`, () => {
            expect((data.get('spelunking') as Spelunking).stamina[id].maximum)
                .toMatchLiveGame(expected(`stamina_max_player_${id}`), 0);
        });
    });
});
