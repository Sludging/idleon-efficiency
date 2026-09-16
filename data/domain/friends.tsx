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
};

/** A Friend Bonus stat backed by repository metadata. */
export class FriendBonus {
  accountLevel: number = 0;
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

/**
 * Parses one account assignment in the form
 * "statIndex,accountLevel,friendName". Only the stat index and account level
 * affect the website calculation; the friend name remains display metadata.
 */
const parseAssignment = (record: string): FriendBonusAssignment => {
  const [rawStatIndex, rawAccountLevel] = record.split(",");
  return {
    statIndex: Number(rawStatIndex),
    accountLevel: Number(rawAccountLevel) || 0,
  };
};

export class Friends extends Domain {
  bonuses: FriendBonus[] = [];
  friendBonusSlots: number = 0;

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
    const optionList = data.get("OptLacc") as (number | string)[];
    const rawAssignments = (optionList[FRIEND_BONUS_ASSIGNMENTS_OPTION] as string) || "";
    const assignments = rawAssignments ? rawAssignments.split(";").map(parseAssignment) : [];

    assignments.forEach(assignment => {
      const bonus = friends.bonuses.find(bonus => bonus.index === assignment.statIndex);
      if (bonus) {
        bonus.accountLevel = assignment.accountLevel;
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

  // The current max attainable number of slots is 7 (base 2 + Companion44 one +
  // Companion 30 level 2 three + Event Shop 22 one). 
  friends.friendBonusSlots = Math.round(
    Math.min(
      FRIEND_BONUS_SLOT_LIMIT,
      2 + spearfishBonus + (2 * mrPigBonus + friendlySlotBonus),
    ),
  );

  const friendBonusMultiplier = 1 + (100 * mrPigBonus + 25 * spearfishLevelTwo) / 100;
  friends.bonuses.forEach(bonus => bonus.bonusMultiplier = friendBonusMultiplier);
};
