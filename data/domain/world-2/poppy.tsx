const FisherooBonuses = [
    "{x bluefin fish caught",
    "{x shiny fishing speed and luck",
    "All upgrades are {x cheaper",
    "Other Reset bonuses are {x higher",
    "{x Tartar fish caught"
];

export class PoppyGlobalBonus {
    constructor(public index: number, public desc: string) {}

    static fromBase() {
        return [
            new PoppyGlobalBonus(0, "{/minute"),
            new PoppyGlobalBonus(1, "+{% Fish Efficiency"),
            new PoppyGlobalBonus(2, "+{ Defence"),
            new PoppyGlobalBonus(3, "+{% Fishing XP"),
            new PoppyGlobalBonus(4, "+{% Accuracy"),
            new PoppyGlobalBonus(5, "+{% Total DMG"),
            new PoppyGlobalBonus(6, "+{% AFK Gains"),
            new PoppyGlobalBonus(7, "+{% Cash"),
        ];
    }
}