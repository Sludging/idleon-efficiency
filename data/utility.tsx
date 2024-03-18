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
    Godshard = 10,
    Sunder = 11,
    Tydal = 12,
    Marbiglass = 13,
    Orberal = 14,
    Eclipse = 15,
}

export const dateToText = (date: Date): string => {
    const resolvedFormat = Intl.DateTimeFormat().resolvedOptions();
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric", month: "numeric", day: "numeric",
        hour: "numeric", minute: "numeric", second: "numeric",
        hour12: resolvedFormat.hour12,
        timeZone: resolvedFormat.timeZone,
    };
    return Intl.DateTimeFormat(resolvedFormat.locale, options).format(date)
} 

const getBitIndex = (num: number) => {
    let modifiedValue = num;
    let bitIndex = 0;
    for (; bitIndex < 4 ; bitIndex++) {
        if (modifiedValue > 1e18) {
            modifiedValue /= 1e18;
        }
    }

    return bitIndex;
}

export const bitsFormatter = (num: number) => {
    let modifiedValue = num;
    let bitIndex = 0;
    for (; bitIndex < 4 ; bitIndex++) {
        if (modifiedValue > 1e18) {
            modifiedValue /= 1e18;
        }
    }
    switch(true) {
        case num < 1e4: return `${Math.floor(modifiedValue)}`;
        case num < 1e5: return `${Math.floor(modifiedValue / 100) / 10}K`;
        case num < 1e6: return `${Math.floor(modifiedValue / 1e3)}K`;
        case num < 1e7: return `${Math.floor(modifiedValue / 1e4) / 100}M`;
        case num < 1e8: return `${Math.floor(modifiedValue / 1e5) / 10}M`;
        case num < 1e9: return `${Math.floor(modifiedValue / 1e6)}M`;
        case num < 1e10: return `${Math.floor(modifiedValue / 1e7) / 100}B`;
        case num < 1e11: return `${Math.floor(modifiedValue / 1e8) / 10}B`;
        case num < 1e12: return `${Math.floor(modifiedValue / 1e9)}B`;
        case num < 1e13: return `${Math.floor(modifiedValue / 1e10) / 100}T`;
        case num < 1e14: return `${Math.floor(modifiedValue / 1e11) / 10}T`;
        case num < 1e15: return `${Math.floor(modifiedValue / 1e12)}T`;
        case num < 1e16: return `${Math.floor(modifiedValue / 1e13) / 100}Q`;
        case num < 1e17: return `${Math.floor(modifiedValue / 1e14) / 10}Q`;
        case num < 1e18: return `${Math.floor(modifiedValue / 1e15)}Q`;
        default: return `${Math.floor((modifiedValue / Math.pow(10, Math.floor(lavaLog(modifiedValue)))) * 100) / 100}e`;
    }
}

export const nFormatter = (num: number, type: string = "Smaller") => {
    if (type) {
        switch(type) {
            case "Whole": {
                switch (true) {
                    case num < 1e4: return `${Math.floor(num).toString()}`;
                    case num < 1e6: return `${Math.floor(num / 1e3)}K`
                    case num < 1e7: return `${Math.floor(num / 1e5) / 10}M`
                    case num < 1e9: return `${Math.floor(num / 1e6)}M`
                    case num < 1e10: return `${Math.floor(num / 1e8) / 10}B`
                    case num >= 1e10: return `${Math.floor(num / 1e9)}B`
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
            case "Micro": {
                switch (true) {
                    case num > 10: return `${Math.round(num) / 1}`
                    case num > 0.1: return `${Math.round(10 * num) / 10}`
                    case num > 0.01: return `${Math.round(100 * num) / 100}`
                    default: return `${Math.round(1e3 * num) / 1e3}`
                }
            }
            case "Bits": {
                return bitsFormatter(num);
            }       
        }
    }
    switch (true) {
        case num < 100 && type == "Small" && num < 1: return `${Math.round(100 * num) / 100}`
        case num < 100 && type == "Small" && num >= 1: return `${Math.round(10 * num) / 10}`
        case num < 100 && type == "Smallish" && num < 10: return `${Math.round(10 * num) / 10}`
        case num < 100 && type == "Smallish" && num >= 10: return `${Math.round(num)}`
        case num < 100 && type == "Smaller" && num < 10: return `${Math.round(100 * num) / 100}`
        case num < 100 && type == "Smaller" && num >= 10: return `${Math.round(10 * num) / 10}`
        case num < 1e3: return `${Math.floor(num)}`
        case num < 1e4 && type == "Bigish": return `${Math.floor(num)}`
        case num < 1e4: return `${Math.ceil(num / 10) / 100}K`
        case num < 1e5: return `${Math.ceil(num / 100) / 10}K`
        case num < 1e6: return `${Math.ceil(num / 1e3) / 1}K`
        case num < 1e7: return `${Math.ceil(num / 1e4) / 100}M`
        case num < 1e8: return `${Math.ceil(num / 1e5) / 10}M`
        case num < 1e10: return `${Math.ceil(num / 1e6) / 1}M`
        case num < 1e13: return `${Math.ceil(num / 1e9)}B`
        case num < 1e16: return `${Math.ceil(num / 1e12)}T`
        case num < 1e19: return `${Math.ceil(num / 1e15)}Q`
        case num < 1e22: return `${Math.ceil(num / 1e18)}QQ`
        case num < 1e24: return `${Math.ceil(num / 1e21)}QQQ`
        case num >= 1e24: return `${Math.floor((num / Math.pow(10, Math.floor(lavaLog(num)))) * 100) / 100}E${Math.floor(lavaLog(num))}`
        default: return `${num}`;
    }
}

// Stole this code/concept from the wiki, god bless their soul.
export const getCoinsArray = (coins: number): Map<Coins, number> => {
    // 1. We floor the coins since sometimes it's fractions, and we don't care about that.
    // 2. We convert to BigInt so when we convert to string we have the full number instead of something like '1.2+e22'
    // 3. We convert to string so we can splice it easier, more on why we splice later.
    var n = BigInt(Math.floor(coins)).toString();

    // Init an empty set of coins
    var ret = new Map<Coins, number>();
    // Start from copper
    var i = 1;
    // While we haven't processed the full string and we aren't at the max coin yet
    while (n.length > 0 && i < Coins.Eclipse) {
        // If we have less than 2 digits left, we are done.
        if (n.length < 2) {
            ret.set(i, Number(n)); // Add the single digit
            n = ""; // Empty out the string
            break; // Break the while
        }
        // We have 2 or more, convert the LAST two digits to a number
        const quantity = Number(n.slice(-2));
        // Add that number to the coin array
        ret.set(i, quantity);

        // Modify the string to remove the 2 digits we just procesed.
        n = n.slice(0, -2);
        // Move to the next coin.
        i += 1
    }

    // If string isn't empty, it means we are at max coin (Eclipse for now). Simply add the full string as number to the array.
    if (n.length > 0) {
        ret.set(Coins.Eclipse, Number(n));
    }

    // Can probably move this to the top but basically handling someone with 0 coins.
    if (ret.size == 0) {
        ret.set(1, 0);
    }

    // We want to sort the array by the highest coin first, so we sort and then reverse.
    ret = new Map([...ret].sort((a, b) => a[0] - b[0]).reverse())

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

// This range function is exclusive of the end number (i.e end won't be part of the result)
export function range(start: number, end: number, increment: number = 1) {
    const length = Math.floor((end - start) / increment);
    return Array.from({ length }, (_, i) => start + i * increment);
}

// This range function is inclusive of the end number
export function inclusiveRange(start: number, end: number, increment: number = 1) {
    const length = Math.floor(((end - start) / increment) + 1);
    return Array.from({ length }, (_, i) => start + i * increment);
}

/**
 * Groups all items in an array of objects `T` where the return value of a function is the same
 * @param array Items to group
 * @param func the func to group by
 */
 export function GroupByFunction<T>(array: T[], func: Function) {
	let map = new Map<T, T[]>();
	array.forEach(item => {
		let funcOutcome = func(item);
		if (!map.has(funcOutcome)) {
			map.set(funcOutcome, array.filter(i => func(i) === func(item)));
		}
	});
	return map;
}

export function secondsSinceUpdate(globalTime: number) {
    return (new Date().getTime() - globalTime) / 1000;
}

export function randomFloatBetween(e: number, t: number) {
    return e <= t ? e + Math.random() * (t - e) : t + Math.random() * (e - t)
}

export const letterToNumber = (char: string) => {
    // Lava's unicode map doesn't have tilda (`) so, bit odd but it works.
    return "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(char)
}

export const uniqueFilter = (value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
}

export const getSubDomain = () => {
    const allowedTopDomains = ["idleonefficiency", "localhost:3000"];
    const windowLocation = typeof window !== "undefined" ? window.location.host : ""
    const locationSplit = windowLocation.split('.');

    // If we have a proper domain (i.e. a.b.com), confirm that the TLD is actually 'idleonefficiency' and if it isn't just return as if we don't have a subdomain.
    // This is currently only for when testing with vercel (it ends up being 'vercel.app') to avoid invalid profile issues.
    if (locationSplit.length > 1 && !allowedTopDomains.includes(locationSplit[1])) {
        console.log("Not a valid subdomain", windowLocation, locationSplit);
        return "";
    }
    let urlDomain = windowLocation != "" ? locationSplit[0] : "";

    return urlDomain;
}

// Check if 
export const isSubDomain = () => {
   const urlDomain = getSubDomain();

    return !["localhost:3000", "www", "preview"].includes(urlDomain);
}