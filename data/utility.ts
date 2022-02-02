export const round = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export const lavaLog = (num: number) => {
    return Math.log(Math.max(num, 1)) / 2.303;
}

export const lavaFunc = (func: string, level: number, x1: number, x2: number, roundResult: boolean = false) => {
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
    if (roundResult) {
        return round(result);
    }
    return result;
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

export const nFormatter = (num: number, type?: string) => {
    if (type) {
        switch(type) {
            case "Whole": {
                switch (true) {
                    case num < 10000: return `${Math.floor(num).toString()}`;
                    case num < 1000000: return `${Math.floor(num / 1000)}K`
                    case num < 10000000: return `${Math.floor(num / 100000) / 10}M`
                    case num < 1000000000: return `${Math.floor(num / 1000000)}M`
                    case num < 10000000000: return `${Math.floor(num / 100000000) / 10}B`
                    case num >= 10000000000: return `${Math.floor(num / 1000000000)}B`
                    default: return `${num}`;
                }
            }
            case "MultiplierInfo": {
                switch (true) {
                    case 0 == (10 * num) % 10: return `${Math.round(num)}.00#`
                    case 0 == (100 * num) % 10: return `${Math.round(10 * num) / 10}0#`
                    default: return `${Math.round(100 * num) / 100}#`
                }
            }        
        }
    }
    switch (true) {
        case num < 100 && type == "Small" && num < 1: return `${Math.round(100 * num) / 100}`
        case num < 100 && type == "Small" && num >= 1: return `${Math.round(10 * num) / 10}`
        case num < 100 && type == "Smaller" && num < 10: return `${Math.round(100 * num) / 100}`
        case num < 100 && type == "Smaller" && num >= 10: return `${Math.round(10 * num) / 10}`
        case num < 100: return `${Math.floor(num)}`
        case num < 1000: return `${Math.floor(num)}`
        case num < 10000: return `${Math.ceil(num / 10) / 100}K`
        case num < 100000: return `${Math.ceil(num / 100) / 10}K`
        case num < 1000000: return `${Math.ceil(num / 1000) / 1}K`
        case num < 10000000: return `${Math.ceil(num / 10000) / 100}M`
        case num < 100000000: return `${Math.ceil(num / 100000) / 10}M`
        case num < 10000000000: return `${Math.ceil(num / 1000000) / 1}M`
        case num < 10000000000000: return `${Math.ceil(num / 1000000000)}B`
        case num < 10000000000000000: return `${Math.ceil(num / 1000000000000)}T`
        case num < 10000000000000000000: return `${Math.ceil(num / 1000000000000000)}Q`
        case num >= 10000000000000000000: return `${Math.ceil(num / 1000000000000000000)}QQ`
        default: return `${num}`;
    }
}

export const getCoinsArray = (coins: number): Map<Coins, number> => {
    var n = coins;
    var ret = new Map<Coins, number>();
    var i = 18;
    do {
        var expo = Math.pow(10, i);
        if (n > expo) {
            var num = Math.floor(n / expo);
            ret.set(Math.round(i / 2) + 1, num);
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
* Pachinko Shop = PachiShopICON<x>.png / 62x62

*
* Skills:
* Mining = ClassIcons42
* Smithing = ClassIcons43
* Chopping = ClassIcons44
* Fishing = ClassIcons45
* Alchemy = ClassIcons46
* Catching = ClassIcons47
* Trapping = ClassIcons48
* Construction = ClassIcons49
* Worship = ClassIcons50
* Lv0_1

* Exp0_6 = current XP (first index = level, rest = skills)
* Add system for crystl spawn chance per character.
*/

export const formatTime = (input: number) => {
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges: Record<string, number> = {
        years: 3600 * 24 * 365,
        months: 3600 * 24 * 30,
        weeks: 3600 * 24 * 7,
        days: 3600 * 24,
        hours: 3600,
        minutes: 60,
        seconds: 1
    };
    for (let key in ranges) {
        if (ranges[key] < Math.abs(input)) {
            const delta = input / ranges[key];
            return formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
        }
    }
}

export const dateToIntString = (input: Date) => {
    const resolvedFormat = Intl.DateTimeFormat().resolvedOptions();
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: resolvedFormat.hour12,
        timeZone: resolvedFormat.timeZone
    };
    return Intl.DateTimeFormat(resolvedFormat.locale, options).format(input);
}

export const toTime = (fromSeconds: number) => {
    let days = 0;
    let hour = Math.floor(fromSeconds / 3600);
    if (hour > 24) {
        days = Math.floor(hour / 24);
        hour -= days * 24;
    }
    const minutes = Math.floor(fromSeconds % 3600 / 60);
    const seconds = Math.floor(fromSeconds % 3600 % 60);
    return `${days > 0 ? `${days}days` : ''} ${hour}hr ${days == 0 ? `${minutes}min ${seconds}sec` : ""}`;
}

export function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
}

/**
 * Groups all items in an array of objects `T` where the value of property `K` is the same
 * @param array Items to group
 * @param key Key of `T` to group by
 */
 export function GroupBy<T, K extends keyof T>(array: T[], key: K) {
	let map = new Map<T[K], T[]>();
	array.forEach(item => {
		let itemKey = item[key];
		if (!map.has(itemKey)) {
			map.set(itemKey, array.filter(i => i[key] === item[key]));
		}
	});
	return map;
}

export function range(start: number, end: number) {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}