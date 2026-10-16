import { Account } from '../account';
import { Card } from '../cards';
import { Companion, getCompanionActiveBonus } from '../companions';
import { GemStore } from '../gemPurchases';
import { TaskBoard } from '../tasks';
import { Button } from './button';
import { DancingCoral } from './dancingCoral';
import { Cooking } from '../world-4/cooking';
import { Lab } from '../world-4/lab';
import { Gaming } from '../world-5/gaming';
import { Slab } from '../world-5/slab';
import { Farming, CropScientistBonusText } from '../world-6/farming';
import { Summoning } from '../world-6/summoning';
import { TotalizerBonus, Worship } from '../world-3/worship';
import { JellyOperator } from './jellyOperator';
import { Spelunking } from './spelunking';
import { SushiStation } from './sushi';

/**
 * Calculates persistent normal-world Spelunking power for Button task 50.
 * Active elixir effects are run-local: the game sets them during an elixir-use
 * event in a delve, not from the saved equipped slots, so they are neutral here.
 */
export const getPersistentSpelunkingPower = (data: Map<string, any>): number => {
    const spelunking = data.get('spelunking') as Spelunking;
    const upgrades = spelunking.upgrades;
    const upgrade0 = upgrades[0].sourceBonus;
    const upgrade1 = upgrades[1].sourceBonus;
    const upgrade2 = upgrades[2].sourceBonus;
    const upgrade3 = upgrades[3].sourceBonus;
    const upgrade14 = upgrades[14].sourceBonus;
    const upgrade15 = upgrades[15].sourceBonus;
    const upgrade16 = upgrades[16].sourceBonus;
    const upgrade17 = upgrades[17].sourceBonus;
    const upgrade46 = upgrades[46].sourceBonus;
    const upgrade54 = upgrades[54].sourceBonus;
    const summoning = data.get('summoning') as Summoning;
    const sushi = data.get('sushi') as SushiStation;
    const jellyOperator = data.get('jellyOperator') as JellyOperator;
    const button = data.get('button') as Button;
    const taskBoard = data.get('taskboard') as TaskBoard;
    const gems = data.get('gems') as GemStore;
    const farming = data.get('farming') as Farming;
    const slab = data.get('slab') as Slab;
    const lab = data.get('lab') as Lab;
    const gaming = data.get('gaming') as Gaming;
    const worship = data.get('worship') as Worship;
    const cooking = data.get('cooking') as Cooking;
    const account = data.get('account') as Account;
    const companions = data.get('companions') as Companion[];
    const cards = data.get('cards') as Card[];
    const gemPurchase43 = gems.purchases.find(purchase => purchase.no === 43)?.pucrhased ?? 0;
    const taskMeritLevel = taskBoard.merits.find(merit => merit.index === 48)!.level;
    const chapter1Bonus2 = spelunking.chapters.find(chapter => chapter.index === 1)!.bonuses[2].getBonus();
    const chapter5Bonus0 = spelunking.chapters.find(chapter => chapter.index === 5)!.bonuses[0].getBonus();
    const chapter4Bonus2 = spelunking.chapters.find(chapter => chapter.index === 4)!.bonuses[2].getBonus();
    const companion143 = getCompanionActiveBonus(companions, 143);
    const dancingCoral1 = (data.get('dancingCoral') as DancingCoral).getBonusFromIndex(1);
    const cropScientist8 = farming.cropScientist.getBonus(CropScientistBonusText.Spelunky);
    const slabBonus6 = slab.getSpelunkingPowerBonus(
        lab.bonuses[15].getBonus(),
        gaming.isSuperbitPurchased(25)
    );
    const msaBonus9 = worship.totalizer.getBonus(TotalizerBonus.SpelunkingPow);
    const mealBonus = cooking.getMealBonusForKey('SplkPOW');
    const sticker6 = farming.getStickerBonus(6);
    const palette13 = gaming.getPaletteBonus(13);
    const exotic42 = farming.getExoticMarketBonusValue(42);
    const cardW7a5Level = cards.find(card => card.id === 'w7a5')!.getLevels();
    const activeElixir9 = 0;
    const activeElixir10Count = 0;

    const multiplier = (1 + summoning.getSummoningWinnerBonusFromIndex(27) / 100)
        * (1 + sushi.getBonusFromIndex(20) / 100)
        * (1 + jellyOperator.getObstructionBonus(38) / 100)
        * (1 + jellyOperator.getObstructionBonus(21) / 100)
        * (1 + button.getBonusForIndex(6) / 100)
        * (1 + (15 * taskMeritLevel) / 100)
        * Math.max(1, Math.pow(2, gemPurchase43))
        * (
            (
                Math.max(1, chapter1Bonus2)
                * Math.max(1, chapter5Bonus0)
                * Math.max(1, chapter4Bonus2)
                * Math.max(1, companion143)
                * Math.max(1, 100 * activeElixir10Count)
            )
            / (1 + Math.min(99, 99 * activeElixir9))
        )
        * (1 + upgrade1 / 100)
        * (1 + dancingCoral1 / 100)
        * (1 + (cropScientist8 + (slabBonus6 + (msaBonus9 + mealBonus))) / 100)
        * (1 + upgrade2 / 100)
        * (1 + account.spelunkingPowerBonus / 100)
        * (1 + upgrade3 / 100)
        * (1 + sticker6 / 100)
        * (1 + palette13 / 100)
        * (1 + upgrade46 / 100)
        * (1 + upgrade54 / 100)
        * (1 + (exotic42 + Math.min(4 * cardW7a5Level, 30)) / 100)
        * (1 + (upgrade14 + (upgrade15 + (upgrade16 + upgrade17))) / 100);

    return (1 + upgrade0) * multiplier;
};
