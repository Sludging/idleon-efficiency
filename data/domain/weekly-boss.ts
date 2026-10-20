export class WeeklyBoss {
    defeatedDifficultiesThisWeek: number = 0;
    private classExperienceBonusPoints: number | undefined;
    private damageBonusPoints: number | undefined;
    private completedDreamChallengeIndexes = new Set<number>();

    parse(
        optionList: readonly (string | number)[] | undefined,
        weeklyBossMap: Record<string, unknown>,
    ): void {
        // Boss Battle Spillover uses the weekly defeated-difficulty high-water snapshot, not the current difficulty.
        this.defeatedDifficultiesThisWeek = Number(optionList?.[189] ?? 0);
        this.classExperienceBonusPoints = Object.prototype.hasOwnProperty.call(weeklyBossMap, "c")
            ? Number(weeklyBossMap.c)
            : undefined;
        this.damageBonusPoints = Object.prototype.hasOwnProperty.call(weeklyBossMap, "g")
            ? Number(weeklyBossMap.g)
            : undefined;
        this.completedDreamChallengeIndexes = new Set();
        for (const [key, value] of Object.entries(weeklyBossMap)) {
            const challengeIndex = /^d_(\d+)$/.exec(key);
            if (challengeIndex && Number(value) === -1) {
                this.completedDreamChallengeIndexes.add(Number(challengeIndex[1]));
            }
        }
    }

    getClassExperienceBonusPoints(): number | undefined {
        return this.classExperienceBonusPoints;
    }

    getDamageBonusPoints(): number | undefined {
        return this.damageBonusPoints;
    }

    isDreamChallengeCompleted(index: number): boolean {
        return this.completedDreamChallengeIndexes.has(index);
    }

}
