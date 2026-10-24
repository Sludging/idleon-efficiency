import type { Achievement } from "../../achievements";
import type { Player } from "../../player";
import { SkillsIndex } from "../../SkillsIndex";
import type { Guild } from "../../guild";
import type { Stamp } from "../../world-1/stamps";
import { CauldronIndex, type Alchemy } from "../../world-2/alchemy/alchemy";
import type { Arcade } from "../../world-2/arcade";
import type { Votes } from "../../world-2/votes";
import type { Bubba } from "../bubba";
import type { AtomCollider } from "./atomCollider";
import type { ConstructionMastery, Rift } from "../../world-4/rift";
import type { Summoning } from "../../world-6/summoning";
import type { Gaming } from "../../world-5/gaming";
import type { Storage } from "../../storage";
import { lavaLog } from "../../../utility";
import { EquipmentBonus } from "../../equipment-effects";
import type { Deathnote } from "./deathnote";
import type { UpgradeVault } from "../../upgradeVault";
import type { PlayerStatues } from "../../world-1/statues";
import { StarSignMap } from "../../starsigns";
import type { Menagerie } from "../../menagerie";
import type { Construction } from "./construction";


export const getCogPlayerBuildSpeed = (
    targetPlayer: Player,
    contextPlayer: Player,
    data: Map<string, any>,
    summoningWinnerBonus13?: number,
): number => {
    const stamps = data.get("stamps") as Stamp[][];
    const guild = data.get("guild") as Guild;
    const achievements = data.get("achievements") as Achievement[];
    const rift = data.get("rift") as Rift;
    const alchemy = data.get("alchemy") as Alchemy;
    const arcade = data.get("arcade") as Arcade;
    const votes = data.get("votes") as Votes;
    const bubba = data.get("bubba") as Bubba;
    const collider = data.get("collider") as AtomCollider;
    const storage = data.get("storage") as Storage;
    const deathnote = data.get("deathnote") as Deathnote;
    const upgradeVault = data.get("upgradeVault") as UpgradeVault;
    const summoning = data.get("summoning") as Summoning;
    const gaming = data.get("gaming") as Gaming;

    const constructionLevel = targetPlayer.skills.get(SkillsIndex.Construction)?.level ?? 0;
    const constructionBubble = alchemy.getBonusForPlayer(contextPlayer, CauldronIndex.Power, 12);
    const buildProdStamp = stamps.flatMap(tab => tab).find(stamp => stamp.raw_name === "BuildProd")?.getBonus() ?? 0;
    const postOfficeBox = targetPlayer.postOffice.find(box => box.name === "Construction Container");
    const postOfficeBonus = postOfficeBox?.level ?? 0;
    const guildBonus = guild.guildBonuses.find(bonus => bonus.index === 5)?.getBonus() ?? 0;
    const equipmentBonus = contextPlayer.gear.getBonus(EquipmentBonus.BuildSpeed);
    const mastery = rift.bonuses.find(bonus => bonus.name === "Construct Mastery") as ConstructionMastery;
    const masteryBonus = mastery.getBonusByIndex(4);
    const achievementBonus = achievements[153].completed ? 5 : 0;
    const contspdBonus = alchemy.vials.find(vial => vial.name === "Shinyfin Stew")?.getBonus() ?? 0;
    const turtleBonus = alchemy.vials.find(vial => vial.name === "Turtle Tisane")?.getBonus() ?? 0;
    const arcadeBonus = arcade.bonuses.find(bonus => bonus.index === 44)?.getBonus() ?? 0;
    const votingBonus = votes.getCurrentBonus(18);
    const bubbaBonus = bubba.getGlobalBonus(1);
    const vaultUpgrade = upgradeVault.getBonusForId(48);
    const sheepieKills = deathnote.mobKillCount.get("sheep")?.reduce((sum, count) => sum + Math.round(count), 0) ?? 0;
    const vaultBonus = vaultUpgrade * Math.floor(lavaLog(sheepieKills));
    const winnerBonus = summoningWinnerBonus13 ?? summoning.summonBonuses.find(bonus => bonus.index === 13)?.getBonus() ?? 0;
    const paletteBonus = gaming.getPaletteBonus(25);
    const atomBonus = collider.atoms.find(atom => atom.index === 1)?.getBonus() ?? 0;
    const refinerySalt = storage.amountInStorage("Refinery1");
    const redoxTalentBonus = targetPlayer.talents.find(talent => talent.skillIndex === 131)?.getBonus() ?? 0;

    // Button resolves this after account data settles; native PlayerBuildSpd then uses its prepared owned-data branch.
    const baseBuildSpeed = 3 * Math.pow(constructionLevel / 2 + 0.7, 1.6);
    const bubbleMultiplier = 1 + constructionLevel * constructionBubble / 100;
    const additiveMultiplier = 1 + (
        buildProdStamp + 0.25 * postOfficeBonus + (
            guildBonus + (
                equipmentBonus + (
                    achievementBonus + (
                        masteryBonus + (
                            contspdBonus + arcadeBonus + (votingBonus + (vaultBonus + bubbaBonus))
                        )
                    )
                )
            )
        )
    ) / 100;
    const accountMultiplier = (1 + winnerBonus / 100) * (1 + paletteBonus / 100) * (1 + turtleBonus / 100);
    const ownedDataTalentMultiplier = 1 + redoxTalentBonus * (atomBonus + lavaLog(refinerySalt)) / 100;

    return baseBuildSpeed * bubbleMultiplier * additiveMultiplier * accountMultiplier * ownedDataTalentMultiplier;
};

export const getCogPlayerBaseExpRate = (
    targetPlayer: Player,
    contextPlayer: Player,
    data: Map<string, any>,
): number => {
    const alchemy = data.get("alchemy") as Alchemy;
    const stamps = data.get("stamps") as Stamp[][];
    const statues = data.get("statues") as PlayerStatues[];
    const votes = data.get("votes") as Votes;
    const construction = data.get("construction") as Construction;
    const menagerie = data.get("menagerie") as Menagerie;

    const constructionLevel = targetPlayer.skills.get(SkillsIndex.Construction)?.level ?? 0;
    const buildSpeed = getCogPlayerBuildSpeed(targetPlayer, contextPlayer, data);
    const baseExpRate = Math.pow(buildSpeed, 0.7) / 2 + (2 + 6 * constructionLevel);
    const constructionExpStamp = stamps.flatMap(tab => tab).find(stamp => stamp.data.effect === "ConstructionExp")?.getBonus() ?? 0;
    const votingBonus = votes.getCurrentBonus(18);
    const postOfficeBonus = targetPlayer.getPostOfficeBonus("17c");
    const constructionExpVial = alchemy.getVialBonusForKey("ConsExp");
    const constructionStatue = statues[targetPlayer.playerID].statues[18];
    const constructionExpBubble = alchemy.cauldrons[CauldronIndex.Power].bubbles[11];
    const hasConstructionExpBubble = targetPlayer.activeBubbles.some(bubble =>
        bubble.cauldronIndex === CauldronIndex.Power && bubble.bubbleIndex === 11);
    // These settled account bonuses apply before any board EXP modifiers.
    const extraExpMultiplier = (1 + construction.cogBoard.getSmallCogExpBonus() / 100)
        * (1 + menagerie.yellowJellyfish.upgrades[1].effect / 100);

    if (targetPlayer.playerID === contextPlayer.playerID) {
        const bubbleBonus = hasConstructionExpBubble && constructionExpBubble.level > 0
            ? alchemy.getBonusForPlayer(contextPlayer, CauldronIndex.Power, 11)
            : 0;
        const sharperSawsBonus = targetPlayer.getTalentBonus(132);
        const tempestuousEmotionsBonus = targetPlayer.getTalentBonus(104);
        const statueBonus = constructionStatue.getBonus(targetPlayer);
        const starSignBonus = targetPlayer.starSigns.reduce((sum, sign) => sum + sign.getBonus("Construct Exp"), 0);
        const expMultiplier = 1 + (
            bubbleBonus + (
                sharperSawsBonus + tempestuousEmotionsBonus + (
                    constructionExpVial + (
                        statueBonus + (
                            constructionExpStamp + votingBonus + (starSignBonus + postOfficeBonus)
                        )
                    )
                )
            )
        ) / 100;

        return baseExpRate * expMultiplier * extraExpMultiplier;
    }

    // Inactive characters use allocated talent points and the statue's base bonus.
    // Their vial bonus requires Call Me Bob, and Warriors Rule uses the context character's value.
    let bubbleAndTalentBonus = 0;
    if (hasConstructionExpBubble) {
        const bubbleBonus = alchemy.getBonusForBubble(CauldronIndex.Power, 11);
        const warriorsRuleMultiplier = targetPlayer.classId < 18
            ? Math.max(1, alchemy.getBubbleBonusForKey("Opassz", contextPlayer))
            : 1;
        bubbleAndTalentBonus = bubbleBonus * warriorsRuleMultiplier + constructionExpVial;
    }
    const sharperSaws = targetPlayer.getTalent(132);
    bubbleAndTalentBonus += sharperSaws?.getBonusAtLevel(sharperSaws.pointsSpent) ?? 0;
    const statueBonus = constructionStatue.level * constructionStatue.statueData.bonus;
    let expMultiplier = (1 + (
        bubbleAndTalentBonus + (statueBonus + (constructionExpStamp + votingBonus + postOfficeBonus))
    ) / 100) * extraExpMultiplier;

    // An inactive character's equipped sign adds its unscaled bonus after the multipliers.
    const constructionStarSign = StarSignMap[45];
    if (targetPlayer.starSigns.some(sign => sign.aligned && sign.name === constructionStarSign.name)) {
        expMultiplier += constructionStarSign.getBonus("Construct Exp");
    }

    return baseExpRate * expMultiplier;
};

