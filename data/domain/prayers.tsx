export class Prayer {
    level: number = 0;
    totalPrayersOwned: number = 0; // PrayOwned
    constructor(public name: string, public prayerIndex: number, public towerIndex: number, public bonusText: string, public curseText: string, 
        public x1: number, public x2: number, public soul: string, public costMulti: number,
        public towerName: string, public waveReq: number) { }

    getLevelCosts = (): number => {
        if (this.level == 0) {
            return 0;
        }

        if (this.level < 6) {
            return Math.round(this.costMulti * (1 + (4 + (this.prayerIndex / 25)) * this.level));
        }
        let prayerMultiplier = 1.25;
        if (this.prayerIndex == 9) {
            prayerMultiplier = 1.5
        }

        const bonus = this.costMulti * (1 + (4 + (this.prayerIndex / 25)) * this.level) * Math.pow(prayerMultiplier, this.level - 5);
        return Math.round(Math.min(2000000000, bonus));
    }

    getBonus = (): number => {
        return this.x1 + (this.x1 * (this.level - 1)) / 10;
    }

    getCurse = (): number => {
        return this.x2 + (this.x1 * (this.level - 1)) / 10;
    }

    getBonusText = (): string => {
        return this.bonusText.replace("{", this.getBonus().toString());
    }

    getCurseText = (): string => {
        return this.curseText.replace("{", this.getCurse().toString());
    }

    getClass = (): string => {
        return `icons-7878 icons-Prayer${this.prayerIndex}`;
    }
}

const initPrayers = () => {
    return [
        new Prayer("Big Brain Time",0,1,"+{% Class EXP","+{% Max HP for all monsters",30,250,"Soul1",100,"Goblin Gorefest",10),
        new Prayer("Skilled Dimwit",1,1,"+{% Skill Efficiency","-{% Skill EXP Gain",30,30,"Soul1",300,"Goblin Gorefest",25),
        new Prayer("Unending Energy",2,1,"+{% Class and Skill EXP","Max AFK time is now 10 hours. Use with caution",25,10,"Soul1",600,"Goblin Gorefest",51),
        new Prayer("Shiny Snitch",3,1,"Shiny Critters drop in bundles of { instead of 1.","Your Shiny chance is now x{ lower.",20,20,"Soul1",1000,"Goblin Gorefest",81),
        new Prayer("Zerg Rushogen",4,1,"+{% AFK Gain Rate","-{% Carry Capacity",10,10,"Soul1",3000,"Goblin Gorefest",121),
        new Prayer("Tachion of the Titans",5,2,"Giant Monsters can now spawn on Monster Kill","Giant Monsters can now spawn...",10,10,"Soul2",100,"Wakawaka War",11),
        new Prayer("Balance of Precision",6,2,"+{% Total Accuracy","-{% Total Damage",30,20,"Soul2",250,"Wakawaka War",31),
        new Prayer("Midas Minded",7,2,"+{% Drop Rate","+{% Max HP for all monsters",20,250,"Soul2",700,"Wakawaka War",71),
        new Prayer("Jawbreaker",8,2,"+{% time candy chance every day, up to 7 days","-1000% AFK Gain Rate. Also you owe me 25 cents!",50,1000,"Soul2",1500,"Wakawaka War",121),
        new Prayer("The Royal Sampler",9,3,"+{% 3d Printer Sample Size","-{% All Exp Gain. Remove all samples to Unequip.",15,30,"Soul3",100,"Acorn Assault",21),
        new Prayer("Antifun Spirit",10,3,"+{% Minigame Reward Multi","Minigames cost { plays per attempt, or whatever you have.",700,9,"Soul3",600,"Acorn Assault",41),
        new Prayer("Distillarge",11,3,"+{% chance for Giant Mobs to summon 2 Crystal Mobs","Crystal Mobs have +{% chance to rebirth on death.",30,25,"Soul3",2000,"Acorn Assault",71),
        new Prayer("Ruck Sack",12,3,"+{% Carry Capacity","-{% AFK Gain Rate",30,20,"Soul3",4500,"Acorn Assault",131),
        new Prayer("Balance of Pain",13,1,"+{% Total Damage","-{% Total Defence",30,150,"Soul1",100,"Goblin Gorefest",999),
        new Prayer("Balance of Aggression",14,1,"+{% Total Defence","-{% Total Accuracy",30,150,"Soul1",100,"Goblin Gorefest",999),
        new Prayer("Beefy For Real",15,1,"+{% Max HP","-{% Max MP",30,150,"Soul1",100,"Goblin Gorefest",999),
        new Prayer("Casting All Day",16,1,"+{% Max MP","-{% Max HP",30,150,"Soul1",100,"Goblin Gorefest",999),
        new Prayer("Some Prayer Name0",17,1,"+{% EXP from all monsters","None. Even curses need time off every now and then.",30,150,"Soul1",100,"Goblin Gorefest",999),
    ];
}

export default function parsePrayers(rawData: number[]) {
    const prayerData = initPrayers(); // Initialize prayer array with all pre-populated data
    if (rawData) {
        rawData.forEach((prayer, index) => { // for each prayer
            if (index < prayerData.length) { // ignore unknown prayers.
                prayerData[index].level = prayer;
            }
        });
    }
    return prayerData;
}