import { LibraryArenaMembershipBonusModel } from '../model/libraryArenaMembershipBonusModel';
import { LibraryMetadataModel } from '../model/libraryMetadataModel';
import { LibraryVipTalentModel } from '../model/libraryVipTalentModel';

export class LibraryMetadataBase { constructor(public index: number, public data: LibraryMetadataModel) { } }



export const initLibraryMetadataRepo = () => {
    return [    
        new LibraryMetadataBase(0, <LibraryMetadataModel>{
                "baseMaximumLevel": 125,
                "oxygenAtomIndex": 7,
                "oxygenMaximumIncrease": 10,
                "checkoutAchievementIndex": 145,
                "checkoutAchievementMaximumIncrease": 5,
                "checkoutAchievementChargeRateIncrease": 30,
                "vipMinimumBookLevel": 1,
                "vipCheckoutBookCost": 5,
                "arenaMembershipBonuses": [
                    <LibraryArenaMembershipBonusModel>{"arenaBonusIndex": 1, "membershipIncrease": 25},
                    <LibraryArenaMembershipBonusModel>{"arenaBonusIndex": 10, "membershipIncrease": 60}
                ],
                "vipTalents": [
                    <LibraryVipTalentModel>{"skillIndex": 641, "requiredMembership": 1},
                    <LibraryVipTalentModel>{"skillIndex": 642, "requiredMembership": 10},
                    <LibraryVipTalentModel>{"skillIndex": 643, "requiredMembership": 30},
                    <LibraryVipTalentModel>{"skillIndex": 644, "requiredMembership": 75},
                    <LibraryVipTalentModel>{"skillIndex": 645, "requiredMembership": 125},
                    <LibraryVipTalentModel>{"skillIndex": 646, "requiredMembership": 500},
                    <LibraryVipTalentModel>{"skillIndex": 647, "requiredMembership": 1000}
                ]
            })    
]
}
