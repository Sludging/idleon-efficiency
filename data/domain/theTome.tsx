import { Domain, RawData } from './base/domain';
import { initSlabItemSortRepo } from './data/SlabItemSortRepo';
import { Item } from './items'
import { Lab, SlabSovereigntyBonus } from './lab';
import { Sailing } from './sailing';
import { SlabInfluencedArtifact } from './sailing/artifacts';
import { Sneaking } from './world-6/sneaking';
import { ImageData } from "./imageData";

export class TheTome extends Domain {
    getRawKeys(): RawData[] {
        return [
            {key: "Cards1", perPlayer: false, default: []}
        ]
    }

    // n._customBlock_Summoning = function(d, b, e) :

    // "TomeBonus" == d :
    // return null == m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo ? 0 : 0 == b ? 10 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 100), .7) : 1 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[196] ? 4 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 4E3) / 100), .7) : 0 : 2 == b ? 1 == a.engine.getGameAttribute("OptionsListAccount")[197] ? 2 * Math.pow(Math.floor(Math.max(0, c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) - 8E3) / 100), .7) : 0 : 3 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.W8 : 4 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.A9 : 5 == b ? a.engine.getGameAttribute("DNSM").h.AlchBubbles.h.M9 : 6 == b ? 1 == n._customBlock_Summoning("EventShopOwned", 0, 0) ? 4 * Math.pow(Math.floor(c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[84]) / 1E3), .4) : 0 : 0;

    // "TomeLvReq" == d :
    // return 500 + (50 * b + (10 * Math.max(0, b - 30) + 10 * Math.max(0, b - 50)));

    // "isTomeUnlocked" == d :
    // return c.asNumber(m.__cast(a.engine.getGameAttribute("PixelHelperActor")[4].behaviors.getBehavior("ActorEvents_229"), Xa)._GenInfo[83]) >= n._customBlock_Summoning("TomeLvReq", a.engine.getGameAttribute("CustomLists").h.NinjaInfo[32].indexOf("" + b), 0) ? 1 : 0;

    // "TomePCT" == d :
    // return g = a.engine.getGameAttribute("DNSM"),
    // Object.prototype.hasOwnProperty.call(g.h, "TomeQTY") ? 0 == n._customBlock_Summoning("isTomeUnlocked", b, 0) ? 0 : 0 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? 0 > c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) ? 0 : Math.pow(1.7 * c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) / (c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])), .7) : 1 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? 2.4 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) / (2 * k._customBlock_getLOG(c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) + c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])) : 2 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? Math.min(1, c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) / c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1])) : 3 == c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][2]) ? c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0]) > 5 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) ? 0 : Math.pow(1.2 * (6 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) - c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])) / (7 * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][1]) - c.asNumber(a.engine.getGameAttribute("DNSM").h.TomeQTY[b | 0])), 5) : 0 : 0;

    // "TomePTS" == d :
    // return Math.ceil(n._customBlock_Summoning("TomePCT", b, 0) * c.asNumber(a.engine.getGameAttribute("CustomLists").h.Tome[b | 0][3]));

    init(allItems: Item[], charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        
    }
}