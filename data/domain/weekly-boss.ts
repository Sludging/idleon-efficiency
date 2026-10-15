export class WeeklyBoss {
    defeatedDifficultiesThisWeek: number = 0;

    parse(optionList: readonly (string | number)[] | undefined): void {
        // Boss Battle Spillover uses the weekly defeated-difficulty high-water snapshot, not the current difficulty.
        this.defeatedDifficultiesThisWeek = Number(optionList?.[189] ?? 0);
    }
}
