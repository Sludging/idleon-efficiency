import {
    Box,
    Text,
    Tabs,
    Tab,
    Grid,
    Stack,
    Tip,
    Heading,
    ThemeContext,
    Button
} from 'grommet'
import { useState, useEffect, useContext, useMemo } from 'react';
import { AppContext } from '../data/appContext'
import { GemStore } from '../data/domain/gemPurchases';
import { Guild } from '../data/domain/guild';

import { Player, SkillsIndex } from '../data/domain/player';
import { ClassIndex, ClassTalentMap, GetTalentArray, TalentConst } from '../data/domain/talents';
import { CapacityConst } from '../data/domain/capacity';
import { Alchemy, AlchemyConst, CauldronIndex, Bubble } from "../data/domain/alchemy";
import { Stamp, StampTab, StampConsts } from '../data/domain/stamps';
import { PlayerStatues, StatueConst } from '../data/domain/statues';
import { PostOfficeConst } from '../data/domain/postoffice'

import { getCoinsArray, lavaFunc, toTime, notUndefined } from '../data/utility';
import CoinsDisplay from '../components/coinsDisplay';
import { css } from 'styled-components'
import ShadowBox from '../components/base/ShadowBox';
import { Next } from 'grommet-icons';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';

interface SkillProps {
    skillsMap: Map<SkillsIndex, number>
    skillsRank: Map<SkillsIndex, number>
}

function nth(n: number) { return `${n}${["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"}` }

function ShowSkills(props: SkillProps) {
    const getSkillClass = (skill: SkillsIndex) => {
        switch (skill) {
            case SkillsIndex.Mining: return `icons-38 icons-ClassIcons42`;
            case SkillsIndex.Smithing: return `icons-38 icons-ClassIcons43`;
            case SkillsIndex.Chopping: return `icons-38 icons-ClassIcons44`;
            case SkillsIndex.Fishing: return `icons-38 icons-ClassIcons45`;
            case SkillsIndex.Alchemy: return `icons-38 icons-ClassIcons46`;
            case SkillsIndex.Catching: return `icons-38 icons-ClassIcons47`;
            case SkillsIndex.Trapping: return `icons-38 icons-ClassIcons48`;
            case SkillsIndex.Construction: return `icons-38 icons-ClassIcons49`;
            case SkillsIndex.Worship: return `icons-38 icons-ClassIcons50`;
            default: return '';
        }
    }

    return (
        <Box pad="medium">
            <Text size='medium'>Skills</Text>
            <Grid
                rows={['1/3', '1/3', '1/3']}
                columns={['1/3', '1/3', '1/3']}
                areas={[
                    ['mining', 'fishing', 'trapping'],
                    ['smithing', 'alchemy', 'construction'],
                    ['chopping', 'catching', 'worship'],
                ]}
            >
                {
                    Array.from(props.skillsMap).map(([skillIndex, skillLevel]) => {
                        const skillRank = props.skillsRank.get(skillIndex);
                        return (
                            <Box key={`skill_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} gridArea={`${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`}>
                                <Stack anchor="bottom-left" alignSelf="center" >
                                    <Box className={getSkillClass(skillIndex)} />
                                    <Box pad={{ horizontal: 'large' }}>
                                        <Text size="medium">{skillLevel}</Text>
                                    </Box>
                                    <Box pad={{ horizontal: 'xlarge' }}>
                                        {skillRank != undefined && <Text>{nth(skillRank + 1)}</Text>}
                                    </Box>
                                </Stack>

                            </Box>)
                    })
                }
            </Grid >
        </Box>
    );
}

function MiscStats({ player, activeBubbles }: { player: Player, activeBubbles: Bubble[] }) {
    const idleonData = useContext(AppContext);

    const playerCoins = useMemo(() => getCoinsArray(player.money), [player]);
    const maxCharge = useMemo(() => {
        const theData = idleonData.getData();
        const alchemy = theData.get("alchemy") as Alchemy;
        const stamps = theData.get("stamps") as Stamp[][];

        const worshipLevel = player.skills.get(SkillsIndex.Worship);
        const praydayStamp = stamps[StampTab.Skill][StampConsts.PraydayIndex];
        let gospelLeaderBonus = alchemy.cauldrons[CauldronIndex.HighIQ].bubbles[AlchemyConst.GospelLeader].getBonus();
        let popeBonus = activeBubbles.find(x => x.name == "Call Me Pope")?.getBonus() ?? 0;

        if (player.getBaseClass() == ClassIndex.Mage) {
            const classMultiBonus = alchemy.cauldrons[CauldronIndex.HighIQ].bubbles[1].getBonus();
            gospelLeaderBonus *= classMultiBonus;
        }
        const maxChargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "F10")?.getBonus() ?? 0;
        const talentChargeBonus = player.activeBuffs.find(x => x.skillIndex == TalentConst.ChargeSiphonIndex)?.getBonus(false, true) ?? 0;

        return player.worship.getMaxCharge(player.gear.tools[5].raw_name, maxChargeCardBonus, talentChargeBonus, praydayStamp.getBonus(worshipLevel), gospelLeaderBonus, worshipLevel, popeBonus);
    }, [player, activeBubbles, idleonData]);

    const chargeRate = useMemo(() => {
        const theData = idleonData.getData();
        const stamps = theData.get("stamps") as Stamp[][];

        let popeBonus = activeBubbles.find(x => x.name == "Call Me Pope")?.getBonus() ?? 0;
        const flowinStamp = stamps[StampTab.Skill][StampConsts.FlowinIndex];
        const worshipLevel = player.skills.get(SkillsIndex.Worship);
        const chargeSpeedTalent = player.talents.find(x => x.skillIndex == TalentConst.NearbyOutletIndex);
        const talentBonus = chargeSpeedTalent?.getBonus() ?? 0;
        const chargeCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "F11")?.getBonus() ?? 0;
        return player.worship.getChargeRate(player.gear.tools[5].raw_name, worshipLevel, popeBonus, chargeCardBonus, flowinStamp.getBonus(worshipLevel), talentBonus);
    }, [player, activeBubbles, idleonData]);

    return (
        <Box pad="medium">
            <Text size='medium'>Random Stats</Text>
            <Grid columns="1/2" fill>
                <Box pad="medium" gap="small">
                    <Text size="small">Class / Level = {player.class} / {player.level}</Text>
                    <Text size="small">Current Monster / Map = {player.currentMonster} / {player.currentMap}</Text>
                    {
                        player.starSigns.map((sign, index) => {
                            return <Text size="small" key={`sign-${index}`}>Sign {index} = {sign.getText()}</Text>
                        })
                    }
                    <Text size="small">Away Since = {toTime(player.afkFor)}</Text>
                    <Text size="small">STR = {player.stats.strength}</Text>
                    <Text size="small">AGI = {player.stats.agility}</Text>
                    <Text size="small">WIS = {player.stats.wisdom}</Text>
                    <Text size="small">Charge Rate = {Math.round(chargeRate * 24)}% / day</Text>
                    <Text size="small">Estimated Charge = {Math.round(player.worship.getEstimatedCharge(chargeRate, maxCharge, player.afkFor))}/{maxCharge}%</Text>
                    <Box direction="row" gap="small">
                        <Text size="small">Money =</Text>
                        <CoinsDisplay coinMap={playerCoins} />
                    </Box>
                    <Box>
                        <Text>Active Bubbles:</Text>
                        {
                            activeBubbles.map((bubble, bubbleIndex) => {
                                return (
                                    <Box direction="row" align="center" key={bubbleIndex} fill gap="medium">
                                        <Stack anchor="bottom-right" alignSelf="center">
                                            <Box className={bubble.class_name} />
                                            <Box >
                                                <Text size="medium">{bubble.level}</Text>
                                            </Box>
                                        </Stack>
                                        <Text size="medium">{bubble.name}</Text>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box pad="medium" gap="medium" fill>
                    <Text>Equipped Cards:</Text>
                    <Grid columns="1/4" gap="small" width={"200px"}>
                        {
                            player.cardInfo ? player.cardInfo.equippedCards.map((card, index) => {
                                return (
                                    <Stack key={index}>
                                        <Box className={card.getClass()} />
                                        <Box title={card.getBonusText()} key={`border_${index}`} className={card.getBorderClass()} />
                                    </Stack>
                                )
                            }) : <Text>No cards equipped</Text>
                        }
                    </Grid>
                    <Text size="small">Card Set = {player.cardInfo?.getCardSetText() ?? ""}</Text>
                    <Text>Active Buffs:</Text>
                    <Box direction="row">
                        {player.activeBuffs.map((buff, index) =>
                        (
                            <Box key={index} title={buff.getBonusText()} className={buff.getClass()} />
                        )
                        )}
                    </Box>
                </Box>
            </Grid>
        </Box>
    )
}


function EquipmentDisplay({ player }: { player: Player }) {
    return (
        <Box pad="medium">
            <Text size='medium'>Equipment</Text>
            <Box direction="row-responsive">
                <Box direction="column" key={`player_${player.playerID}_equip`}>
                    {
                        [...Array(8)].map((_, equipIndex) => {
                            if (player.gear.equipment[equipIndex].display_name == "Blank") {
                                return (<Box key={`blank_${equipIndex}`} width="50px" height="50px" />);
                            }
                            return (<Box key={`player_${player.playerID}_equip_${equipIndex}`} title={player.gear.equipment[equipIndex].display_name || ""} className={`icons icons-${player.gear.equipment[equipIndex].raw_name}_x1`} />)
                        })
                    }
                </Box>
                <Box direction="column" key={`player_${player.playerID}_tools`}>
                    {
                        [...Array(8)].map((_, toolsIndex) => {
                            if (player.gear.tools[toolsIndex].display_name == "Blank") {
                                return (<Box key={`player_${player.playerID}_equip_${toolsIndex}`} width="50px" height="50px" />);
                            }
                            return (<Box key={`player_${player.playerID}_equip_${toolsIndex}`} title={player.gear.tools[toolsIndex].display_name || ""} className={`icons icons-${player.gear.tools[toolsIndex].raw_name}_x1`} />)
                        })
                    }
                </Box>
                <Box direction="column" key={`player_${player.playerID}_food`}>
                    {
                        [...Array(8)].map((_, foodIndex) => {
                            if (player.gear.food[foodIndex].display_name == "Blank") {
                                return (<Box key={`player_${player.playerID}_equip_${foodIndex}`} width="50px" height="50px" />);
                            }
                            return (<Box key={`player_${player.playerID}_equip_${foodIndex}`} title={player.gear.food[foodIndex].display_name || ""} className={`icons icons-${player.gear.food[foodIndex].raw_name}_x1`} />)
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

function StatuesDisplay({ playerStatues }: { playerStatues: PlayerStatues | undefined }) {
    return (
        <Box pad="medium" gap="xsmall">
            <Text size='medium'>Statues</Text>
            {
                playerStatues ? playerStatues.statues.map((statue, index) => {
                    return (
                        <Box key={`statue_${index}`} direction="row" gap="medium">
                            <Box className={statue.getClassName()} title={statue.displayName} />
                            <Text alignSelf="center">Level: {statue.level}</Text>
                            <Text alignSelf="center">/</Text>
                            <Text alignSelf="center">Bonus: {statue.getBonus()} {statue.bonus}</Text>
                        </Box>
                    )
                }) : <></>
            }
        </Box>
    )
}

function AnvilDisplay({ player, activeBubbles, playerStatues }: { player: Player, activeBubbles: Bubble[], playerStatues: PlayerStatues | undefined }) {
    const idleonData = useContext(AppContext);
    const hammerName = "Hammer Hammer";

    const anvilCostDiscount = useMemo(() => {
        const theData = idleonData.getData();
        const alchemy = theData.get("alchemy") as Alchemy;
        const anvilnomicsBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.Anvilnomics];
        const anvilnomicsBonus = lavaFunc(anvilnomicsBubble.func, anvilnomicsBubble.level, anvilnomicsBubble.x1, anvilnomicsBubble.x2);
        if (player.getBaseClass() == ClassIndex.Archer) {
            const greenCauldronBonusBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.CauldronBonusBubbleIndex];
            const classBonus = lavaFunc(greenCauldronBonusBubble.func, greenCauldronBonusBubble.level, greenCauldronBonusBubble.x1, greenCauldronBonusBubble.x2);
            return anvilnomicsBonus * classBonus;
        }
        return anvilnomicsBonus;
    }, [idleonData, player])

    const anvilSpeed = useMemo(() => {
        // ANVIL SPEED MATH;
        const theData = idleonData.getData();
        const stampData = theData.get("stamps");
        const anvilZoomerBonus = stampData ? stampData[1][2].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0;
        const blackSmithBox = player.postOffice[PostOfficeConst.BlacksmithBoxIndex];
        const postOfficeBonus = blackSmithBox.level > 0 ? blackSmithBox.bonuses[1].getBonus(blackSmithBox.level, 1) : 0;
        const hammerHammerBonus = activeBubbles ? activeBubbles.find(x => x.name == hammerName)?.getBonus() ?? 0 : 0;
        const anvilStatueBonus = playerStatues ? playerStatues.statues[StatueConst.AnvilIndex].getBonus() : 0;
        const starSignBonus = player.starSigns.find(x => x.name == "Bob_Build_Guy")?.getBonus("Speed in Town") ?? 0;
        let talentTownSpeedBonus: number = 0;
        if (player.getBaseClass() == ClassIndex.Archer) {
            const townSkillSpeedTalent = player.talents.find(x => x.skillIndex == 269);
            if (townSkillSpeedTalent) {
                talentTownSpeedBonus = lavaFunc(townSkillSpeedTalent.funcX, townSkillSpeedTalent.level, townSkillSpeedTalent.x1, townSkillSpeedTalent.x2)
            }
        }
        return (3600 * player.anvil.getSpeed(player.stats.agility, anvilZoomerBonus, postOfficeBonus, hammerHammerBonus, anvilStatueBonus, starSignBonus, talentTownSpeedBonus));
    }, [idleonData, activeBubbles, playerStatues, player])

    const allCapBonus = useMemo(() => {
        const theData = idleonData.getData();
        const guild = theData.get("guild");

        let guildCarryBonus: number = 0;
        let telekineticStorageBonus: number = 0;
        let carryCapShrineBonus: number = 0; // TODO!
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }

        if (player.talents) {
            const telekineticStorageTalent = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex);
            if (telekineticStorageTalent) {
                telekineticStorageBonus = lavaFunc(telekineticStorageTalent.funcX, telekineticStorageTalent.level, telekineticStorageTalent.x1, telekineticStorageTalent.x2);
            }
        }

        return player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus);

    }, [idleonData, player])

    const anvilCapcity = useMemo(() => {
        const theData = idleonData.getData();
        const stampData = theData.get("stamps");
        const gemStore = theData.get("gems") as GemStore;

        let extraBagsTalentBonus: number = 0;
        let starSignExtraCap: number = 0; // TODO!

        if (player.talents) {
            const extraBagsTalent = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex);
            if (extraBagsTalent) {
                extraBagsTalentBonus = lavaFunc(extraBagsTalent.funcX, extraBagsTalent.level, extraBagsTalent.x1, extraBagsTalent.x2);
            }
        }
        return player.anvil.getCapacity(player.capacity.getMaterialCapacity(allCapBonus, stampData ? stampData[1][7].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0, gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0, stampData ? stampData[2][1].getBonus() : 0, extraBagsTalentBonus, starSignExtraCap));
    }, [idleonData, player, allCapBonus])

    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Anvil</Text>
            <Box direction="column">
                <Text size="small">Available Points: {player.anvil.availablePoints}</Text>
                <Text size="small">Points from coins: {player.anvil.pointsFromCoins}</Text>
                <Box direction="row">
                    <Text size="small">Next Point Cost: </Text>
                    <CoinsDisplay coinMap={getCoinsArray(player.anvil.getCoinCost(anvilCostDiscount))} />
                </Box>
                <Box direction="row">
                    <Text size="small">Total Point Cost: </Text>
                    <CoinsDisplay coinMap={getCoinsArray(player.anvil.getTotalCoinCost(anvilCostDiscount))} />
                </Box>
                <Text size="small">Points from mats: {player.anvil.pointsFromMats}</Text>
                <Text size="small">Points spend into XP: {player.anvil.xpPoints}</Text>
                <Text size="small">Points spend into Speed: {player.anvil.speedPoints}</Text>
                <Text size="small">Anvil Speed Guess: {Math.round(anvilSpeed)}</Text>
                <Text size="small">Capacity: {anvilCapcity} ({player.anvil.capPoints})</Text>
                {player.anvil.currentlySelect.indexOf(-1) > -1 && <Text>UNUSED PRODUCTION</Text>}
            </Box>
            <Box gap="small">
                {
                    player.anvil.production.filter((x) => x.displayName != "Filler" && (x?.hammers ?? 0) > 0).map((anvilItem, index) => {
                        const futureProduction = Math.min(Math.round(anvilItem.currentAmount + ((anvilItem.currentProgress + (player.afkFor * anvilSpeed / 3600)) / anvilItem.time) * (anvilItem.hammers ?? 0)), anvilCapcity);
                        const percentOfCap = Math.round(futureProduction / anvilCapcity * 100);
                        const timeTillCap = ((anvilCapcity - futureProduction) / (anvilSpeed / 3600 / anvilItem.time * (anvilItem.hammers ?? 0)));
                        return (
                            <Box key={`player_${player.playerID}_anvil_${index}`} direction="column" align="center">
                                <Box className={`icons icons-${anvilItem.internalName}_x1`} />
                                <Text size="small">Number of Hammers = {anvilItem.hammers}</Text>
                                <Text size="small">Current amount = {anvilItem.currentAmount}</Text>
                                <Text size="small">Future Amount Guess = {futureProduction} / {anvilCapcity} ( {percentOfCap}% of cap) {percentOfCap > 80 ? "| GO CLAIM!" : ""}</Text>
                                <Text size="small">Time till cap = {toTime(timeTillCap)}</Text>
                                <Text size="small">Production Per Hour (per hammer) = {Math.round(anvilSpeed / anvilItem.time)} </Text>
                                {/* <Text>{anvilItem.displayName} - {anvilItem.currentAmount} - {anvilItem.currentXP} - {anvilItem.currentProgress} - {anvilItem.totalProduced}</Text> */}
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

function CarryCapacityDisplay({ player }: { player: Player }) {
    const idleonData = useContext(AppContext);

    const allCapBonus = useMemo(() => {
        const theData = idleonData.getData();
        const guild = theData.get("guild");

        let guildCarryBonus: number = 0;
        let telekineticStorageBonus: number = 0;
        let extraBagsTalentBonus: number = 0;
        let carryCapShrineBonus: number = 0; // TODO!
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }

        if (player.talents) {
            const telekineticStorageTalent = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex);
            if (telekineticStorageTalent) {
                telekineticStorageBonus = lavaFunc(telekineticStorageTalent.funcX, telekineticStorageTalent.level, telekineticStorageTalent.x1, telekineticStorageTalent.x2);
            }
            const extraBagsTalent = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex);
            if (extraBagsTalent) {
                extraBagsTalentBonus = lavaFunc(extraBagsTalent.funcX, extraBagsTalent.level, extraBagsTalent.x1, extraBagsTalent.x2);
            }
        }

        return player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus);

    }, [idleonData, player])

    const guildBonus = useMemo(() => {
        const theData = idleonData.getData();
        const guild = theData.get("guild");

        if (guild) {
            return lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }
        return 0;
    }, [idleonData])

    const gemCapBought = useMemo(() => {
        const theData = idleonData.getData();
        const gemStore = theData.get("gems") as GemStore;

        if (gemStore) {
            return gemStore?.purchases.find(x => x.no == 58)?.pucrhased;
        }
        return 0;
    }, [idleonData])

    const monsterCarryCap = useMemo(() => {
        const theData = idleonData.getData();
        const stampData = theData.get("stamps");
        const gemStore = theData.get("gems") as GemStore;

        let extraBagsTalentBonus: number = 0;
        let starSignExtraCap: number = 0; // TODO!

        if (player.talents) {
            const extraBagsTalent = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex);
            if (extraBagsTalent) {
                extraBagsTalentBonus = lavaFunc(extraBagsTalent.funcX, extraBagsTalent.level, extraBagsTalent.x1, extraBagsTalent.x2);
            }
        }

        return player.capacity.getMaterialCapacity(allCapBonus, stampData ? stampData[1][7].getBonus(player.skills.get(SkillsIndex.Smithing)) : 0, gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0, stampData ? stampData[2][1].getBonus() : 0, extraBagsTalentBonus, starSignExtraCap)
    }, [idleonData, player, allCapBonus])
    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Carry Capacity</Text>
            <Box>
                <Text>Guild Bonus: {guildBonus} </Text>
                <Text>Gem Capacity Bought: {gemCapBought}</Text>
            </Box>
            <Box gap="small">
                <Text>Ore: {player.capacity.mining}</Text>
                <Text>Fish: {player.capacity.fishing}</Text>
                <Text>Materials: {monsterCarryCap}</Text>
                <Text>Bugs: {player.capacity.bugs}</Text>
                <Text>Logs: {player.capacity.chopping}</Text>
                <Text>Souls: {player.capacity.souls}</Text>
                <Text>Critters: {player.capacity.critters}</Text>
                <Text>Food: {player.capacity.food}</Text>
            </Box>
        </Box>
    )
}

function TalentDisplay({ player }: { player: Player }) {
    return (
        <Box pad="medium" gap="medium">
            <Text size='medium'>Talents</Text>
            {
                ClassTalentMap[ClassIndex[player.class.replace(/ /g, "_") as keyof typeof ClassIndex]].concat(["Special Talent 1", "Special Talent 2"]).map((talentPage, _) => {
                    return (
                        <Box key={`player_${player.playerID}_talents_${talentPage}`} align="center" gap="medium">
                            <Text>{talentPage}</Text>
                            <Grid columns={{
                                count: 5,
                                size: 'auto',
                            }} fill>
                                {
                                    GetTalentArray(talentPage).map((originalTalent, index) => {
                                        const talent = player.talents.find(x => x.skillIndex == originalTalent.skillIndex);
                                        if (talent) {
                                            return (
                                                <Box pad="xxsmall" key={`player_${player.playerID}_talents_${index}`} direction="row">
                                                    <Tip
                                                        plain
                                                        content={
                                                            <Box pad="small" gap="small" background="white" style={{ display: talent.level > 0 ? 'normal' : 'none' }}>
                                                                <Text weight="bold">{talent.name}</Text>
                                                                <Text>--------------------------</Text>
                                                                <Text>{talent.getBonusText()}</Text>
                                                            </Box>
                                                        }
                                                        dropProps={{ align: { top: 'bottom' } }}
                                                    >
                                                        <Box style={{ opacity: talent.maxLevel > 0 ? 1 : 0.2 }} className={talent.getClass()} title={talent.name} />
                                                    </Tip>
                                                    <Text>{talent.level} / {talent.maxLevel}</Text>
                                                </Box>
                                            )
                                        }
                                        return <></>
                                    })
                                }
                            </Grid>
                        </Box>
                    )
                })
            }
        </Box>
    )
}

function PostOfficeDisplay({ player }: { player: Player }) {
    return (
        <Box pad="small" gap="small">
            <Text size='medium'>Post Office</Text>
            <Grid columns="1/4">
                {
                    player.postOffice.map((box, index) => {
                        return (
                            <Box key={`player_${player.playerID}_postoffice_${index}`} fill>
                                <Stack anchor="bottom-right" alignSelf="center" key={`player_${player.playerID}_postoffice_${index}`}>
                                    <Tip
                                        plain
                                        content={
                                            <Box pad="small" gap="small" background="white" style={{ display: box.level > 0 ? 'normal' : 'none' }}>
                                                <Text weight="bold">{box.name}</Text>
                                                <Text>--------------------------</Text>
                                                {
                                                    box.bonuses.map((bonus, bIndex) => {
                                                        return (
                                                            <Box key={`player_${player.playerID}_postoffice_${index}_${bIndex}`} direction="row" gap="small">
                                                                <Text>{bonus.getBonusText(box.level, bIndex)}</Text>
                                                                <Text>{box.level < 400 && `(Max value is ${bonus.getBonus(PostOfficeConst.MaxBoxLevel, bIndex, true)} at 400 boxes)`}</Text>
                                                            </Box>
                                                        )
                                                    })
                                                }
                                            </Box>
                                        }
                                        dropProps={{ align: { top: 'bottom' } }}
                                    >
                                        {/* Do the opacity thing in styled components? */}
                                        <Box>
                                            <Box style={{ opacity: box.level > 0 ? 1 : 0.3 }} className={`icons-88 icons-UIboxUpg${index}`} />
                                        </Box>
                                    </Tip>
                                    <Box background="black">
                                        <Text>{box.level}</Text>
                                    </Box>
                                </Stack>
                            </Box>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

interface PlayerTabProps {
    player: Player
}

function SpecialButton({ isActive, text, clickHandler }: { isActive: boolean, text: string, clickHandler: MouseEventHandler }) {

    return (
        <Button fill="horizontal" plain active={isActive} onClick={clickHandler} gap="medium">
            <Box background={isActive ? 'accent-4' : 'dark-2'} pad={{ left: 'medium', right: 'small', top: 'xsmall', bottom: 'xsmall' }} direction="row" justify="between" align="center" gap="small" height="40px">
                <Text color='accent-2' size="14px" weight={isActive ? 'bold' : 'normal'}>{text}</Text>
                {isActive && <Next size="small" />}
            </Box>
        </Button>
    )
}

function PlayerTab({ player }: PlayerTabProps) {
    const [playerStatues, setPlayerStatues] = useState<PlayerStatues | undefined>(undefined);
    const [index, setIndex] = useState<number>(1);
    const [activeBubbles, setActiveBubbles] = useState<Bubble[]>([]);

    const idleonData = useContext(AppContext);
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerStatues(theData.get("statues")[player.playerID]);
            const alchemy = theData.get("alchemy") as Alchemy;
            if (player.activeBubblesString.length > 0) {
                const bubbleArray: Bubble[] = player.activeBubblesString.map((bubbleString, _) => {
                    const activeBubble = alchemy.getActiveBubble(bubbleString);
                    if (activeBubble) {
                        return activeBubble;
                    }
                }).filter(notUndefined);
                setActiveBubbles(bubbleArray);
            }
        }
    }, [idleonData, player]);

    return (
        <ShadowBox flex={false}>
            <Grid rows="1" columns={['1/4', '3/4']}>
                <Box pad="medium" height="100%" >
                    <SpecialButton isActive={index == 1} clickHandler={() => onActive(1)} text={"Random Stats"} />
                    <SpecialButton isActive={index == 2} clickHandler={() => onActive(2)} text={"Skills"} />
                    <SpecialButton isActive={index == 3} clickHandler={() => onActive(3)} text={"Equipment"} />
                    <SpecialButton isActive={index == 4} clickHandler={() => onActive(4)} text={"Statues"} />
                    <SpecialButton isActive={index == 5} clickHandler={() => onActive(5)} text={"Anvil - WIP"} />
                    <SpecialButton isActive={index == 6} clickHandler={() => onActive(6)} text={"Carry Capacity - WIP"} />
                    <SpecialButton isActive={index == 7} clickHandler={() => onActive(7)} text={"Talents"} />
                    <SpecialButton isActive={index == 8} clickHandler={() => onActive(8)} text={"Post Office"} />
                </Box>
                <Box fill background="dark-1">
                    {index == 1 && <MiscStats player={player} activeBubbles={activeBubbles} />}
                    {index == 2 && <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} />}
                    {index == 3 && <EquipmentDisplay player={player} />}
                    {index == 4 && <StatuesDisplay playerStatues={playerStatues} />}
                    {index == 5 && <AnvilDisplay player={player} activeBubbles={activeBubbles} playerStatues={playerStatues} />}
                    {index == 6 && <CarryCapacityDisplay player={player} />}
                    {index == 7 && <TalentDisplay player={player} />}
                    {index == 8 && <PostOfficeDisplay player={player} />}
                </Box>
            </Grid>
        </ShadowBox>
    )
}

const customTabs = {
    tab: {
        active: {
            color: 'brand',
            background: 'none',
            border: undefined,
        },
        border: undefined,
        pad: {
            top: 'small',
            bottom: undefined,
            horizontal: 'small',
        },
        extend: ({ theme }: { theme: any }) => css`
            height: 56px;
            weight: 'none';
        `
    },
    tabs: {
        gap: {
            horizontal: 'none'
        },
        extend: ({ theme }: { theme: any }) => css`
            max-width: 100%;
            min-width: 100%;
            margin-left: auto;
            margin-right: auto;
        `,
        header: {
            background: 'dark-2',
            extend: ({ theme }: { theme: any }) => css`
                alignItems: "center";
                box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17);
                height: 56px;
        `,
        }
    }
}

const CustomTabTitle = ({ label, isActive }: { label: string, isActive: boolean }) => (
    <Box direction="row" align="center" margin={{ top: "xsmall", bottom: "xsmall" }}>
        <Text size="small" color={isActive ? 'brand' : 'accent-2'}>
            {label}
        </Text>
    </Box>
);

function Players() {
    const [playerData, setPlayerData] = useState<Array<Player>>();
    const [index, setIndex] = useState<number>(0);

    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
        }
    }, [idleonData]);
    return (
        <Box>
            <ThemeContext.Extend value={customTabs}>
                <Tabs activeIndex={index} onActive={onActive}>
                    {
                        playerData?.map((player, playerIndex) => {
                            return (
                                <Tab key={`player_${player.playerID}`} title={<CustomTabTitle isActive={index == playerIndex} label={`${player.playerName ? player.playerName : `Character ${player.playerID}`}`} />}>
                                    <Box pad={{ right: 'large', left: 'large' }} width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill>
                                        <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Players</Heading>
                                        <Box pad="small">
                                            <PlayerTab player={player} />
                                        </Box>
                                    </Box>
                                </Tab>
                            )
                        }) ?? <></>
                    }
                </Tabs>
            </ThemeContext.Extend>
        </Box>
    )
}

export default Players;