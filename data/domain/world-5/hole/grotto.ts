export interface GrottoInputs {
    lootieBonusPercent: number;
    expieBonusPercent: number;
    opieBonusPercent: number;
}

export class Grotto {
    coloniesDefeated: number = 0;
    mushroomKills: number = 0;
    effects: GrottoInputs = {
        lootieBonusPercent: 0,
        expieBonusPercent: 0,
        opieBonusPercent: 0,
    };

    parse(holeData: number[][]): void {
        this.coloniesDefeated = Number(holeData[11]?.[26] ?? 0);
        // Current-colony progress resets after a Monarch defeat. Lifetime kills use a separate counter.
        this.mushroomKills = Number(holeData[11]?.[27] ?? 0);
        this.effects = {
            lootieBonusPercent: 0,
            expieBonusPercent: 0,
            opieBonusPercent: 0,
        };
    }

    prepare(inputs: GrottoInputs): void {
        this.effects = {
            lootieBonusPercent: inputs.lootieBonusPercent,
            expieBonusPercent: inputs.expieBonusPercent,
            opieBonusPercent: inputs.opieBonusPercent,
        };
    }

    get layer(): number {
        return Math.round(this.coloniesDefeated + 1);
    }

    getMonarchHp(): number {
        return 1e11 * Math.pow(7.5, this.coloniesDefeated);
    }

    getMushroomKillRequirement(): number {
        return 5000 * Math.pow(3.4, this.coloniesDefeated);
    }

    getMushroomKillsRemaining(): number {
        return Math.max(0, this.getMushroomKillRequirement() - this.mushroomKills);
    }
}
