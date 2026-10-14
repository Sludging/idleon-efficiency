import fs from 'fs';
import path from 'path';
import { createHash } from 'crypto';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { Player } from '../../../data/domain/player';
import type { Storage } from '../../../data/domain/storage';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { initSpelunkingChapterRepo } from '../../../data/domain/data/SpelunkingChapterRepo';

export const results = loadExtractionResults('spelunking-part-2-data.json');
export const expected = (label: string): number => getExtractedValue(results, label);
export const savedText = fs.readFileSync(path.join(__dirname, '../../fixtures/saves/latest.json'), 'utf8');
const rawSave = JSON.parse(savedText);
export function saved(key: 'Spelunk'): number[][];
export function saved(key: 'playerNames'): string[];
export function saved(key: string): number[];
export function saved(key: string): number[] | number[][] | string[] {
    return typeof rawSave[key] === 'string' ? JSON.parse(rawSave[key]) : rawSave[key];
}
export const characterIDs = Array.from({ length: saved('playerNames').length }, (_, index) => index);


export function assertPairing(): void {
    validateExtractionHealth(results);
    expect(createHash('sha256').update(savedText).digest('hex'))
        .toBe('42139b34b95e9fcad751187d25a04ae760238e798410a1a397902f826261a6b0');
    expect(createHash('sha256').update(JSON.stringify(rawSave)).digest('hex'))
        .toBe('dcef3f9d237625c64a4f5245ef24c2ff9a762a8ca6dc78617e90e3360b33ffcc');
    const before = results.extractions.pairing_before.result;
    expect(results.extractions.pairing_after.result).toEqual(before);
    expect(before.chapters).toEqual(saved('Spelunk')[8].slice(0, 24));
    expect(before.upgrades).toEqual([4, 5, 61].map(index => saved('Spelunk')[5][index]));
    expect(before.trackometer).toBe(saved('Spelunk')[4][8]);
    expect(before.dailyUsed).toBe(saved('OptLacc')[410]);
    characterIDs.filter(id => id !== 6).forEach(id => expect(before.current[id]).toBe(saved('Spelunk')[3][id]));
    // Runtime amount differs; the website must retain the originating saved amount.
    expect(before.current[6]).toBe(2550);
    expect(saved('Spelunk')[3][6]).toBe(2635);
}

export function assertPopulatedAccount(data: Map<string, unknown>): void {
    const owner = data.get('spelunking') as Spelunking;
    const players = data.get('players') as Player[];
    const storage = data.get('storage') as Storage;
    const generatedChapters = initSpelunkingChapterRepo();
    expect(owner.chapters.map(chapter => chapter.index)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(owner.chapters.map(chapter => chapter.bonuses.length)).toEqual([3, 4, 3, 4, 3, 3]);
    owner.chapters.forEach(chapter => {
        expect(chapter.data).toEqual(generatedChapters.find(entry => entry.index === chapter.index)!.data);
        expect(chapter.pageItem.internalName).toBe(`Spelunking${chapter.index}`);
        expect(chapter.pageItem.description.length).toBeGreaterThan(0);
        expect(chapter.pageItem.sources.sources!.map(source => source.txtName)).toContain(chapter.gatheringSource.details.Name);
        chapter.bonuses.forEach(bonus => {
            expect(bonus.level).toBe(saved('Spelunk')[8][4 * chapter.index + bonus.index]);
            expect(bonus.getBonus()).toMatchLiveGameWithDetails(expected(`chapter_${chapter.index}_${bonus.index}`), {
                tolerance: 0, context: `${chapter.name}: ${bonus.data.bonus} at level ${bonus.level}`,
            });
            const tuple = results.extractions.chapter_metadata.result[chapter.index][bonus.index];
            expect(bonus.data.requiredPages).toBe(Number(tuple[5]));
            expect(bonus.data.func).toBe(tuple[3]);
            expect([bonus.data.x1, bonus.data.x2, bonus.data.x3]).toEqual([Number(tuple[1]), Number(tuple[2]), Number(tuple[4])]);
        });
        const chest = storage.chest.filter(item => item.internalName === chapter.pageItem.internalName);
        expect(chapter.chestPageStacks).toEqual(chest);
        chapter.chestPageStacks.forEach((item, index) => expect(item).toBe(chest[index]));
        expect(chapter.playerPageStacks).toHaveLength(players.length);
        players.forEach(player => {
            const stacks = storage.playerStorage[player.playerID].filter(item => item.internalName === chapter.pageItem.internalName);
            expect(chapter.playerPageStacks[player.playerID]).toEqual(stacks);
            stacks.forEach((item, index) => expect(chapter.playerPageStacks[player.playerID][index]).toBe(item));
        });
    });
    expect(owner.dailyReadLimit).toMatchLiveGameWithDetails(expected('daily_reads_limit'), { tolerance: 0 });
    expect(owner.dailyReadsUsed).toBe(saved('OptLacc')[410]);
    expect(owner.dailyReadsRemaining).toMatchLiveGameWithDetails(expected('daily_reads_remaining'), { tolerance: 0 });
    expect(owner.hourlyRecharge).toMatchLiveGameWithDetails(expected('stamina_recharge_hourly'), { tolerance: 0 });
    expect(owner.trackometerLevel).toBe(saved('Spelunk')[4][8]);
    expect(players.map(player => player.playerID)).toEqual(characterIDs);
    expect(owner.stamina).toHaveLength(players.length);
    players.forEach(player => {
        const id = player.playerID;
        expect(player.playerName).toBe(saved('playerNames')[id]);
        const skill = player.skills.get(SkillsIndex.Spelunking)!;
        expect(skill.level).toBe(saved(`Lv0_${id}`)[19]);
        expect(skill.currentXP).toBe(saved(`Exp0_${id}`)[19]);
        expect(skill.xpReq).toBe(saved(`ExpReq0_${id}`)[19]);
        const stamina = owner.stamina[id];
        expect(stamina.playerID).toBe(id);
        expect(stamina.current).toBe(saved('Spelunk')[3][id]);
        expect(stamina.maximum).toMatchLiveGameWithDetails(expected(`stamina_max_player_${id}`), {
            tolerance: 0, context: `${player.playerName} maximum stamina at skill level ${skill.level}`,
        });
        expect(stamina.getHoursUntilFull(owner.hourlyRecharge)).toMatchLiveGameWithDetails(expected(`refill_hours_player_${id}`), {
            tolerance: 0, context: 'Saved-snapshot estimate; all originating amounts are full or above the cap',
        });
    });
}

export function snapshot(data: Map<string, unknown>): string {
    const owner = data.get('spelunking') as Spelunking;
    return JSON.stringify({
        chapters: owner.chapters.map(chapter => ({ index: chapter.index, page: chapter.pageItem.internalName,
            source: chapter.gatheringSource.id, bonuses: chapter.bonuses.map(bonus => [bonus.level, bonus.getBonus()]),
            chest: chapter.chestPageStacks.map(item => item.count), players: chapter.playerPageStacks.map(stacks => stacks.map(item => item.count)) })),
        reads: [owner.dailyReadLimit, owner.dailyReadsUsed, owner.dailyReadsRemaining], recharge: owner.hourlyRecharge,
        players: (data.get('players') as Player[]).map(player => [player.playerID, player.playerName, player.skills.get(SkillsIndex.Spelunking)]),
        stamina: owner.stamina.map(stamina => [stamina.playerID, stamina.current, stamina.maximum, stamina.getHoursUntilFull(owner.hourlyRecharge)]),
    });
}
