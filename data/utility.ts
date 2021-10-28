const round = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const lavaFunc = (func: string, level: number, x1: number, x2: number) => {
    var result = 0;
    switch (func) {
        case 'add':
            if (x2 != 0) {
                result = (((x1 + x2) / x2 + 0.5 * (level - 1)) / (x1 / x2)) * level * x1;
            } else {
                result = level * x1;
            }
            break;
        case 'decay':
            result = (level * x1) / (level + x2);
            break;
        case 'intervalAdd':
            result = x1 + Math.floor(level / x2);
            break;
        case 'decayMulti':
            result = 1 + (level * x1) / (level + x2);
            break;
        case 'bigBase':
            result = x1 + x2 * level;
            break;
        case 'special1':
            result = 100 - (level * x1) / (level + x2);
            break;
        default:
            result = 0;
    }
    return round(result);
}

export enum Coins {
    Copper = 1,
    Silver = 2,
    Gold = 3,
    Platinum = 4,
    Dementia = 5,
    Void = 6,
    Lustre = 7,
    Starfire = 8,
    Dreadlo = 9,
    Godshard = 10

}

export const getCoinsArray = (coins: number): Map<Coins, number> => {
    var n = coins;
    var ret = new Map<Coins, number>();
    var i = 18;
    do {
        var expo = Math.pow(10, i);
        if (n > expo) {
            var num = Math.floor(n / expo);
            ret.set(Math.round(i / 2), num);
            n = n % expo;
        }
        i -= 2;
    } while (i >= 0);

    return ret;
}

/*
Things to remember:
* Class icons = ClassIcon<x>.png / 38x36
* Coins = Coins<x>.png / 21x21
*/