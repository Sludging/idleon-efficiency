import { Companion, getCompanionActiveBonus, isCompanionLevelTwo } from "./companions";
import { Domain, RawData } from "./base/domain";
import { EventShop } from "./eventShop";
import { FriendBonusBase, initFriendBonusRepo } from "./data/FriendBonusRepo";
import { Item } from "./items";

// The account option containing the ordered Friend Bonus assignments.
const FRIEND_BONUS_ASSIGNMENTS_OPTION = 476;
// The in-game code is future proofed to limit the slots to 20 so we replicate that here for consistency.
const FRIEND_BONUS_SLOT_LIMIT = 20;

type FriendBonusData = FriendBonusBase["data"];

type FriendBonusAssignment = {
  statIndex: number;
  accountLevel: number;
  friendName: string;
};

/** A Friend Bonus stat backed by repository metadata. */
export class FriendBonus {
  accountLevel: number = 0;
  friendName: string = "";
  active: boolean = false;
  bonusMultiplier: number = 1;

  constructor(public index: number, public data: FriendBonusData) { }

  static fromBase(data: FriendBonusBase[]): FriendBonus[] {
    return data.map(bonus => new FriendBonus(bonus.index, bonus.data));
  }

  getBonus(): number {
    if (!this.active) {
      return 0;
    }

    const level = Math.min(30000, Math.max(0, this.accountLevel));
    const levelScale = Math.min(1.5, 0.25 + (level / (level + 12000)) * 1.5);
    return this.data.value * levelScale * this.bonusMultiplier;
  }
}

const parseAssignment = (record: string): FriendBonusAssignment => {
  const [rawStatIndex, rawAccountLevel, friendName = ""] = record.split(",");
  return {
    statIndex: Number(rawStatIndex),
    accountLevel: Number(rawAccountLevel) || 0,
    friendName,
  };
};

export class Friends extends Domain {
  bonuses: FriendBonus[] = [];
  friendBonusSlots: number = 0;
  bonusMultiplier: number = 1;
  friendshipSlotBonus: number = 0;
  slotSources = { base: 2, spearfish: 0, mrPig: 0, friendlySlot: 0, slotOfFriendship: 0 };
  multiplierSources = { base: 1, mrPig: 0, spearfish: 0 };

  getRawKeys(): RawData[] {
    return [
      { key: "OptLacc", perPlayer: false, default: [] },
    ];
  }

  init(_allItems: Item[], _charCount: number) {
    this.bonuses = FriendBonus.fromBase(initFriendBonusRepo());
    return this;
  }

  parse(data: Map<string, unknown>): void {
    const friends = data.get(this.getDataKey()) as Friends;
    friends.friendshipSlotBonus = 0;
    const optionList = data.get("OptLacc") as (number | string)[];
    const rawAssignments = (optionList[FRIEND_BONUS_ASSIGNMENTS_OPTION] as string) || "";
    const assignments = rawAssignments ? rawAssignments.split(";").map(parseAssignment) : [];
    friends.bonuses.forEach(bonus => {
      bonus.friendName = "";
      bonus.accountLevel = 0;
      bonus.active = false;
    });

    assignments.forEach(assignment => {
      const bonus = friends.bonuses.find(bonus => bonus.index === assignment.statIndex);
      if (bonus) {
        bonus.accountLevel = assignment.accountLevel;
        bonus.friendName = assignment.friendName;
        bonus.active = true;
      }
    });
  }

  /** Returns the account-wide Friend Bonus value for a stat index. */
  getFriendBonus(index: number): number {
    return this.bonuses[Math.max(0, index)]?.getBonus() ?? 0;
  }
}

export const updateFriends = (data: Map<string, unknown>) => {
  const friends = data.get("friends") as Friends;
  const companions = data.get("companions") as Companion[];
  const eventShop = data.get("eventShop") as EventShop;

  const spearfishBonus = getCompanionActiveBonus(companions, 44);
  const mrPigBonus = getCompanionActiveBonus(companions, 30);
  const spearfishLevelTwo = isCompanionLevelTwo(companions, 44);
  const friendlySlotBonus = eventShop.isBonusOwned(22) ? 1 : 0;
  friends.friendshipSlotBonus = Number(eventShop.isBonusOwned(67));

  friends.slotSources.spearfish = spearfishBonus;
  friends.slotSources.mrPig = 2 * mrPigBonus;
  friends.slotSources.friendlySlot = friendlySlotBonus;
  friends.slotSources.slotOfFriendship = friends.friendshipSlotBonus;
  friends.multiplierSources.mrPig = 100 * mrPigBonus / 100;
  friends.multiplierSources.spearfish = 25 * spearfishLevelTwo / 100;

  friends.friendBonusSlots = Math.round(
    Math.min(
      FRIEND_BONUS_SLOT_LIMIT,
      friends.slotSources.base + friends.slotSources.spearfish
      + (friends.slotSources.mrPig + friends.slotSources.friendlySlot + friends.slotSources.slotOfFriendship),
    ),
  );

  // Keep the combined percentage calculation to preserve arithmetic order.
  friends.bonusMultiplier = friends.multiplierSources.base + (100 * mrPigBonus + 25 * spearfishLevelTwo) / 100;
  friends.bonuses.forEach(bonus => bonus.bonusMultiplier = friends.bonusMultiplier);
};
