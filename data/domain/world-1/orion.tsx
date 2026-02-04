export class OrionGlobalBonus {
    constructor(public index: number, public desc: string) {}

    static fromBase() {
        return [
            new OrionGlobalBonus(0, "{/sec"),
            new OrionGlobalBonus(1, "+{% Class XP"),
            new OrionGlobalBonus(2, "+{ Base DMG"),
            new OrionGlobalBonus(3, "+{% Total DMG"),
            new OrionGlobalBonus(4, "+{% Skill XP"),
            new OrionGlobalBonus(5, "+{% Drop Rate"),
            new OrionGlobalBonus(6, "+{ All Stat"),
        ];
    }
}