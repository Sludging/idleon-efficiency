import { LibraryArenaMembershipBonusModel } from './libraryArenaMembershipBonusModel';
import { LibraryVipTalentModel } from './libraryVipTalentModel';

export interface LibraryMetadataModel {
    baseMaximumLevel: number,
    oxygenAtomIndex: number,
    oxygenMaximumIncrease: number,
    checkoutAchievementIndex: number,
    checkoutAchievementMaximumIncrease: number,
    checkoutAchievementChargeRateIncrease: number,
    vipMinimumBookLevel: number,
    vipCheckoutBookCost: number,
    arenaMembershipBonuses: LibraryArenaMembershipBonusModel[],
    vipTalents: LibraryVipTalentModel[]
}
