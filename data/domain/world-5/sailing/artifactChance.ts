import { getCompanionActiveBonus, isCompanionLevelTwo } from "../../companions";
import type { Companion } from "../../companions";
import type { Account } from "../../account";
import type { EventShop } from "../../eventShop";
import type { UpgradeVault } from "../../upgradeVault";
import type { Player } from "../../player";
import type { Bribe } from "../../world-1/bribes";
import type { Arcade } from "../../world-2/arcade";
import type { Alchemy } from "../../world-2/alchemy/alchemy";
import type { KillRoy } from "../../world-2/killroy";
import type { Votes } from "../../world-2/votes";
import type { Breeding } from "../../world-4/breeding";
import type { Lab } from "../../world-4/lab";
import type { Tome } from "../../world-4/tome";
import type { Button } from "../../world-7/button";
import type { Gaming } from "../gaming";
import type { Hole } from "../hole/hole";
import type { Sailing } from "./sailing";
import type { Farming } from "../../world-6/farming";
import type { Sneaking } from "../../world-6/sneaking";
import type { Summoning } from "../../world-6/summoning";
import type { JellyOperator } from "../../world-7/jellyOperator";
import type { ResearchGrid } from "../../world-7/research";
import type { Spelunking } from "../../world-7/spelunking";
import type { SushiStation } from "../../world-7/sushi";
import type { Menagerie } from "../../menagerie";

/** Native Sailing BoatArtiMulti: artifact-find chance for the selected boat and character. */
export const getBoatArtifactFindMultiplier = (
    data: Map<string, any>,
    boatIndex: number,
    player: Player,
): number => {
    const sailing = data.get('sailing') as Sailing;
    const boat = sailing.boats.find(candidate => candidate.index === boatIndex)!;
    const account = data.get('account') as Account;
    const breeding = data.get('breeding') as Breeding;
    const bribes = data.get('bribes') as Bribe[];
    const arcade = data.get('arcade') as Arcade;
    const hole = data.get('hole') as Hole;
    const farming = data.get('farming') as Farming;
    const research = data.get('research') as ResearchGrid;
    const vault = data.get('upgradeVault') as UpgradeVault;
    const companions = data.get('companions') as Companion[];
    const killroy = data.get('killroy') as KillRoy;
    const button = data.get('button') as Button;
    const alchemy = data.get('alchemy') as Alchemy;
    const eventShop = data.get('eventShop') as EventShop;
    const sushi = data.get('sushi') as SushiStation;
    const summoning = data.get('summoning') as Summoning;
    const jellyOperator = data.get('jellyOperator') as JellyOperator;
    const lab = data.get('lab') as Lab;
    const tome = data.get('tome') as Tome;
    const sneaking = data.get('sneaking') as Sneaking;
    const votes = data.get('votes') as Votes;
    const gaming = data.get('gaming') as Gaming;
    const spelunking = data.get('spelunking') as Spelunking;
    const menagerie = data.get('menagerie') as Menagerie;
    // Menagerie moves the raw sticker bonus out of the additive group when unlocked.
    const stickerIsMultiplicative = menagerie.getUnlocks()[22].owned;
    const stickerBonus = farming.getStickerBonus(2);

    let tierSixCaptainCount = 0;
    for (const captain of sailing.captains) {
        if (captain.tier === 6) {
            tierSixCaptainCount++;
        }
    }

    const additiveBonus = sailing.artifacts[3].getBonus()
        + (boat.captain?.traits.find(trait => trait.traitIndex === 3)?.currentBonus ?? 0)
        + (breeding.shinyBonuses.find(bonus => bonus.data.index === 21)?.getBonus() ?? 0)
        + account.getFractalIslandArtifactBonus() * 20
        + (bribes.find(bribe => bribe.bribeIndex === 34)?.getBonus() ?? 0)
        + 25 * Math.min(30, tierSixCaptainCount)
        + (arcade.bonuses.find(bonus => bonus.index === 32)?.getBonus() ?? 0)
        + (arcade.bonuses.find(bonus => bonus.index === 66)?.getBonus() ?? 0)
        + hole.getSchematicBonus(55, 0)
        + (stickerIsMultiplicative ? 0 : stickerBonus)
        + research.getBonusForId(109)
        + vault.getBonusForId(63);

    const artifactFindStarSign = player.starSigns.find(sign => sign.name === 'Artifosho')
        ?.getBonus('Artifact Find Chance') ?? 0;
    const companion154 = getCompanionActiveBonus(companions, 154);
    const companion154LevelTwo = Number(isCompanionLevelTwo(companions, 154));
    const pristineCharm2 = sneaking.pristineCharms.find(charm => charm.data.itemId === 2);

    return Math.max(1,
        (1 + additiveBonus / 100)
        * (1 + artifactFindStarSign / 100)
        * (1 + (stickerIsMultiplicative ? stickerBonus : 0) / 100)
        * sailing.getNightmarinerArtifactFindMultiplier()
        * Math.max(1, Math.min(2, 1 + 2 * companion154) + companion154LevelTwo)
        * Math.max(1, killroy.artifactFindChanceBonus)
        * (1 + button.getBonusForIndex(3) / 100)
        * (1 + research.getBonusForId(106) / 100)
        * (1 + alchemy.getVialBonusForKey('6turtle') / 100)
        * Math.max(1, Math.pow(1.5, Number(eventShop.isBonusOwned(48))))
        * (1 + sushi.getBonusFromIndex(7) / 100)
        * (1 + summoning.getSummoningWinnerBonusFromIndex(3) / 100)
        * (1 + jellyOperator.getObstructionBonus(19) / 100)
        * boat.daveyJonesBonus
        * (1 + lab.bonuses[14].getBonus() / 100)
        * (1 + tome.getEpilogueBonus(3) / 100)
        * (1 + (pristineCharm2?.unlocked ? pristineCharm2.data.x1 : 0) / 100)
        * (1 + votes.getCurrentBonus(20) / 100)
        * (1 + getCompanionActiveBonus(companions, 43))
        * Math.max(1, getCompanionActiveBonus(companions, 56) / 5)
        * (1 + hole.getMonumentBonus('Justice', 2) / 100)
        * (1 + farming.getExoticMarketBonusValue(45) / 100)
        * (1 + gaming.getPaletteBonus(5) / 100)
        * Math.max(1, Math.pow(1.02, spelunking.getTotalDiscoveries()) * Number(gaming.isSuperbitPurchased(26)))
    );
};
