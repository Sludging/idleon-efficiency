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
    Button,
    ResponsiveContext,
    Select,
    Meter
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
import { Shrine, ShrineConstants } from '../data/domain/shrines';
import { PlayerStatues, StatueConst } from '../data/domain/statues';
import { PostOfficeConst, PostOfficeExtra } from '../data/domain/postoffice'

import { getCoinsArray, lavaFunc, toTime, notUndefined, round, nFormatter } from '../data/utility';
import CoinsDisplay from '../components/coinsDisplay';
import { css } from 'styled-components'
import ShadowBox from '../components/base/ShadowBox';
import TipDisplay, { TipDirection } from '../components/base/TipDisplay';
import { Next } from 'grommet-icons';
import { NextSeo } from 'next-seo';
import { MouseEventHandler } from 'hoist-non-react-statics/node_modules/@types/react';
import { Item, ItemStat } from '../data/domain/items';
import { Storage } from '../data/domain/storage';
import { Prayer } from '../data/domain/prayers';

interface SkillProps {
    skillsMap: Map<SkillsIndex, number>
    skillsRank: Map<SkillsIndex, number>
}

function nth(n: number) { return `${n}${["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th"}` }

function ShowSkills(props: SkillProps) {
    const getSkillClass = (skill: SkillsIndex) => {
        switch (skill) {
            case SkillsIndex.Mining: return `icons-3836 icons-ClassIcons42`;
            case SkillsIndex.Smithing: return `icons-3836 icons-ClassIcons43`;
            case SkillsIndex.Chopping: return `icons-3836 icons-ClassIcons44`;
            case SkillsIndex.Fishing: return `icons-3836 icons-ClassIcons45`;
            case SkillsIndex.Alchemy: return `icons-3836 icons-ClassIcons46`;
            case SkillsIndex.Catching: return `icons-3836 icons-ClassIcons47`;
            case SkillsIndex.Trapping: return `icons-3836 icons-ClassIcons48`;
            case SkillsIndex.Construction: return `icons-3836 icons-ClassIcons49`;
            case SkillsIndex.Worship: return `icons-3836 icons-ClassIcons50`;
            default: return '';
        }
    }

    return (
        <Box pad={{ left: "large", top: "medium" }} gap="medium">
            <Text size='medium'>Skills</Text>
            <Grid
                rows={['1/3', '1/3', '1/3']}
                columns={['1/3', '1/3', '1/3']}
                areas={[
                    ['mining', 'fishing', 'trapping'],
                    ['smithing', 'alchemy', 'construction'],
                    ['chopping', 'catching', 'worship'],
                ]}
                gap={{ row: "xsmall" }}
            >
                {
                    Array.from(props.skillsMap).map(([skillIndex, skillLevel]) => {
                        const skillRank = props.skillsRank.get(skillIndex);
                        return (
                            <Box key={`skill_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} gridArea={`${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} direction="row" gap="medium">
                                <Box fill align="center" width={{ max: '36px' }}>
                                    <Box className={getSkillClass(skillIndex)} />
                                </Box>
                                <Box>
                                    <Text size="medium">{skillLevel}</Text>
                                </Box>
                                <Box>
                                    {skillRank != undefined && <Text>{nth(skillRank + 1)}</Text>}
                                </Box>
                            </Box>)
                    })
                }
            </Grid >
        </Box>
    );
}

function MiscStats({ player, activeBubbles }: { player: Player, activeBubbles: Bubble[] }) {
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext)

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
        if (!player.gear.tools[5]) {
            return 0;
        }
        return player.worship.getMaxCharge(player.gear.tools[5].internalName, maxChargeCardBonus, talentChargeBonus, praydayStamp.getBonus(worshipLevel), gospelLeaderBonus, worshipLevel, popeBonus);
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
        if (!player.gear.tools[5]) {
            return 0;
        }
        return player.worship.getChargeRate(player.gear.tools[5].internalName, worshipLevel, popeBonus, chargeCardBonus, flowinStamp.getBonus(worshipLevel), talentBonus);
    }, [player, activeBubbles, idleonData]);

    const estimatedCharge = useMemo(() => {
        return Math.round(player.worship.getEstimatedCharge(chargeRate, maxCharge, player.afkFor));
    }, [player, maxCharge, chargeRate]);

    const activeShrines = useMemo(() => {
        const theData = idleonData.getData();
        const shrines = theData.get("shrines") as Shrine[];
        return shrines.filter((shrine) => shrine.currentMap == player.currentMapId && shrine.level > 0);
    }, [idleonData, player]);

    const activePrayers = useMemo(() => {
        const theData = idleonData.getData();
        const prayers = theData.get("prayers") as Prayer[];
        if (prayers) {
            return player.activePrayers.map((prayerIndex) => prayers[prayerIndex]);
        }
        return [];
    }, [idleonData, player]);

    return (
        <Box pad="medium">
            <Text size='medium'>Random Stats</Text>
            <Grid columns={size == "small" ? '100%' : ['50%', '50%']} fill>
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
                    <Text size="small">LUK = {player.stats.luck}</Text>
                    <Text size="small">Charge Rate = {Math.round(chargeRate * 24)}% / day</Text>
                    <Text size="small">Current Charge = </Text>
                    <Box direction="row" gap="small">
                        <Stack>
                            <Meter
                                size="small"
                                type="bar"
                                background="accent-3"
                                color="brand"
                                values={[
                                    {
                                        value: estimatedCharge,
                                        label: 'current',
                                        color: 'brand'
                                    }
                                ]}
                                max={maxCharge} />
                            <Box align="center" pad="xxsmall">
                                <Text size="small">{estimatedCharge.toString()} ({(estimatedCharge / maxCharge * 100).toPrecision(3)}%)</Text>
                            </Box>
                        </Stack>
                        <Text>{maxCharge}</Text>
                    </Box>
                    <Box direction="row" gap="small">
                        <Text size="small">Money =</Text>
                        <CoinsDisplay coinMap={playerCoins} />
                    </Box>
                    <Box>
                        <Text>Active Bubbles:</Text>
                        <Box direction="row" gap="medium">
                            {

                                activeBubbles.map((bubble, bubbleIndex) => {
                                    return (
                                        <Box key={bubbleIndex} width={{ max: 'medium' }}>
                                            <TipDisplay
                                                heading={`${bubble.name} (${bubble.level})`}
                                                body={bubble.getBonusText()}
                                                size={size}
                                                direction={TipDirection.Down}
                                                maxWidth="large"
                                            >
                                                <Box width={{ min: '50px', max: '50px' }}>
                                                    <Box className={bubble.class_name} />
                                                </Box>
                                            </TipDisplay>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>
                </Box>
                <Box pad="medium" gap="medium" fill>
                    <Text>Equipped Cards:</Text>
                    <Grid columns={["25%", "25%", "25%", "25%"]} width={{ max: '200px' }} gap={{ row: "small" }}>
                        {
                            player.cardInfo ? player.cardInfo.equippedCards.map((card, index) => {
                                return (
                                    <Box key={index}>
                                        <TipDisplay
                                            heading={`${card.displayName}`}
                                            body={card.getBonusText()}
                                            size={size}
                                            direction={TipDirection.Down}
                                        >
                                            <Stack key={index}>
                                                <Box align="center" fill width={{ min: '28px', max: '28px' }} height={{ min: '36px', max: '36px' }}>
                                                    <Box height={{ min: '36px', max: '36px' }} className={card.getClass()} />
                                                </Box>
                                                <Box align="center" width={{ max: '31px', min: '31px' }} height={{ min: '43px', max: '43px' }}>
                                                    <Box height={{ min: '43px', max: '43px' }} key={`border_${index}`} className={card.getBorderClass()} />
                                                </Box>
                                            </Stack>
                                        </TipDisplay>
                                    </Box>
                                )
                            }) : <Text>No cards equipped</Text>
                        }
                    </Grid>
                    <Text size="small">Card Set = {player.cardInfo?.getCardSetText() ?? ""}</Text>
                    {
                        player.activeBuffs.length > 0 &&
                        <Box gap="small">
                            <Text>Active Buffs:</Text>
                            <Box direction="row">
                                {player.activeBuffs.map((buff, index) =>
                                (
                                    <Box key={index}>
                                        <TipDisplay
                                            heading={`${buff.name} (${buff.level})`}
                                            body={buff.getBonusText()}
                                            size={size}
                                            direction={TipDirection.Down}
                                        >
                                            <Box width={{ min: '50px', max: '50px' }}>
                                                <Box className={buff.getClass()} />
                                            </Box>
                                        </TipDisplay>
                                    </Box>
                                )
                                )}
                            </Box>
                        </Box>
                    }
                    {
                        activeShrines.length > 0 &&
                        <Box gap="small">
                            <Text>Active Shrines:</Text>
                            <Box direction="row" wrap gap="small">
                                {
                                    activeShrines.map((shrine, index) => {
                                        const cardBonus = player.cardInfo?.equippedCards.find(x => x.id == "Z9")?.getBonus() ?? 0;
                                        return (
                                            <Box key={index}>
                                                <TipDisplay
                                                    heading={`${shrine.name} (${shrine.level})`}
                                                    body={shrine.getBonusText(player.currentMapId, cardBonus)}
                                                    size={size}
                                                    direction={TipDirection.Down}
                                                >
                                                    <Box width={{ min: '50px', max: '50px' }}>
                                                        <Box className={shrine.getClass()} />
                                                    </Box>
                                                </TipDisplay>
                                            </Box>
                                        )
                                    })

                                }
                            </Box>
                        </Box>
                    }
                    {
                        activePrayers.length > 0 &&
                        <Box gap="small">
                            <Text>Active Prayers:</Text>
                            <Box direction="row" wrap gap="small">
                                {
                                    activePrayers.map((prayer, index) => {
                                        return (
                                            <Box key={index}>
                                                <TipDisplay
                                                    heading={`${prayer.name} (${prayer.level})`}
                                                    body={
                                                        <Box>
                                                            <Text>Bonus: {prayer.getBonusText()}</Text>
                                                            <Text>Curse: {prayer.getCurseText()}</Text>
                                                        </Box>
                                                    }
                                                    size={size}
                                                    direction={TipDirection.Down}
                                                >
                                                    <Box width={{ min: '50px', max: '50px' }}>
                                                        <Box className={prayer.getClass()} />
                                                    </Box>
                                                </TipDisplay>
                                            </Box>
                                        )
                                    })

                                }
                            </Box>
                        </Box>
                    }
                </Box>
            </Grid>
        </Box>
    )
}

function ItemDisplay({ item, size }: { item: Item | undefined, size?: string }) {
    
    const statsDisplay = (stats: ItemStat[], description: string) => {
        if (description) {
            return <Text>{description}</Text>
        }

        return stats.filter((stat) => stat.shouldDisplay()).map((x,index) => <Text key={index}>{x.getDisplay()}</Text>);
    }


    if (!item) {
        return (<Box height="50px" width="50px"/>)
    }

    return (
        <TipDisplay
            heading={`${item.displayName} (${item.type})`}
            body={<Box>{statsDisplay(item.itemStats, item.description)}<Text size="xsmall">*A work in progress, therefore not always accurate.</Text></Box>}
            size={"large"}
            direction={TipDirection.Down}
            maxWidth="large"
        >
            <Box>
            { item.count > 0 ? 

                <Box direction="row" align="center">
                    <Box width={{ max: size ? size : '50px', min: size ? size : '50px' }} align="center">
                        <Box className={item.getClass()} />
                    </Box>
                    <Box>   
                        <Text>{item.count}</Text>
                    </Box>
                </Box>
            : <Box width={{ max: '50px', min: '50px' }} align="center">
                <Box className={item.getClass()} />
            </Box>
            }
            </Box>
        </TipDisplay>
    )
}


function EquipmentDisplay({ player }: { player: Player }) {
    return (
        <Box pad="medium">
            <Box direction="row" gap="medium" wrap>
                <Box gap="small">
                <Text size='medium'>Equipment</Text>
                <Grid columns={{count: 2, size:"50px"}} key={`player_${player.playerID}_equip`}>
                    {
                        player.gear.equipment.slice(0,8).map((equip, index) => (
                            <Box pad="xsmall" border={{color: 'grey-1' }} key={index}>
                                <ItemDisplay item={equip} />
                            </Box>
                        ))
                    }
                </Grid>
                </Box>
                <Box gap="small">
                <Text size='medium'>Specials</Text>
                <Grid columns={{count: 2, size:"50px"}} key={`player_${player.playerID}_special`}>
                    {
                        player.gear.equipment.slice(8,16).map((equip, index) => (
                            <Box pad="xsmall" border={{color: 'grey-1' }} key={index}>
                                <ItemDisplay item={equip} />
                            </Box>
                        ))
                    }
                </Grid>
                </Box>
                <Box gap="small">
                <Text size='medium'>Tools</Text>
                <Grid columns={{count: 2, size:"50px"}} key={`player_${player.playerID}_tools`}>
                    {
                        player.gear.tools.slice(0,8).map((equip, index) => (
                            <Box pad="xsmall" border={{color: 'grey-1' }} key={index}>
                                <ItemDisplay item={equip} />
                            </Box>
                        ))
                    }
                </Grid>
                </Box>
                <Box gap="small">
                <Text size='medium'>Food</Text>
                <Grid columns={{count: 2, size:"50px"}} key={`player_${player.playerID}_food`}>
                    {
                        player.gear.food.slice(0,8).map((equip, index) => (
                            <Box pad="xsmall" border={{color: 'grey-1' }} key={index}>
                                <ItemDisplay item={equip} />
                            </Box>
                        ))
                    }
                </Grid>
                </Box>
            </Box>
        </Box>
    )
}

function StatuesDisplay({ playerStatues, player }: { playerStatues: PlayerStatues | undefined, player: Player }) {
    return (
        <Box pad="medium" gap="xsmall">
            <Text size='medium'>Statues</Text>
            {
                playerStatues ? playerStatues.statues.map((statue, index) => {
                    return (
                        <Box key={`statue_${index}`} direction="row" gap="medium">
                            <Box width={{ max: '41px', min: '41px' }} height={{ max: '50px', min: '50px' }}>
                                <Box width={{ max: '41px', min: '41px' }} height={{ max: '50px', min: '50px' }} className={statue.getClassName()} title={statue.displayName} />
                            </Box>
                            <Text alignSelf="center">Level: {statue.level}</Text>
                            <Text alignSelf="center">/</Text>
                            <Text alignSelf="center">Bonus: {round(statue.getBonus(player))} {statue.bonus}</Text>
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
        const anvilStatueBonus = playerStatues ? playerStatues.statues[StatueConst.AnvilIndex].getBonus(player) : 0;
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Speed in Town"), 0);
        const talentTownSpeedBonus = player.talents.find(x => x.skillIndex == 269)?.getBonus() ?? 0;

        return (3600 * player.anvil.getSpeed(player.stats.agility, anvilZoomerBonus, postOfficeBonus, hammerHammerBonus, anvilStatueBonus, starSignBonus, talentTownSpeedBonus));
    }, [idleonData, activeBubbles, playerStatues, player])

    const allCapBonus = useMemo(() => {
        const theData = idleonData.getData();
        const guild = theData.get("guild");
        const shrines = theData.get("shrines");

        let guildCarryBonus: number = 0;
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }
        const telekineticStorageBonus = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex)?.getBonus() ?? 0;
        const carryCapShrineBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId);
        return player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus);

    }, [idleonData, player])

    const anvilCapcity = useMemo(() => {
        const theData = idleonData.getData();
        const stampData = theData.get("stamps");
        const gemStore = theData.get("gems") as GemStore;

        const extraBagsTalentBonus = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex)?.getBonus() ?? 0;
        const starSignExtraCap = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Carry Cap"), 0);
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
                <Text size="small">Anvil Speed Guess: {round(anvilSpeed)}</Text>
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
                                <Box width={{ min: '50px', max: '50px' }}>
                                    <Box className={`icons-3636 icons-${anvilItem.internalName}_x1`} />
                                </Box>
                                <Text size="small">Number of Hammers = {anvilItem.hammers}</Text>
                                <Box direction="row" gap="small">
                                    <Stack>
                                        <Meter
                                            size="small"
                                            type="bar"
                                            background="accent-3"
                                            color="brand"
                                            values={[
                                                {
                                                    value: futureProduction,
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={anvilCapcity} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{futureProduction.toString()} ({(percentOfCap)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>Cap: {anvilCapcity}</Text>
                                </Box>
                                <Text size="small">Time till cap = {toTime(timeTillCap)}</Text>
                                <Text size="small">Production Per Hour (per hammer) = {Math.round(anvilSpeed / anvilItem.time)} </Text>
                                <Text size="small">Total Produced of this item = {nFormatter(Math.round(anvilItem.totalProduced), 2)}</Text>
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
        const shrines = theData.get("shrines");

        let guildCarryBonus: number = 0;
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }

        const telekineticStorageBonus = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex)?.getBonus() ?? 0;
        const carryCapShrineBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId);
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

        const extraBagsTalentBonus = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex)?.getBonus() ?? 0;
        const starSignExtraCap = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Carry Cap"), 0);
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
    const size = useContext(ResponsiveContext);
    return (
        <Box pad="medium" gap="medium">
            <Text size='medium'>Talents</Text>
            {
                ClassTalentMap[ClassIndex[player.class.replace(/ /g, "_") as keyof typeof ClassIndex]].concat(["Special Talent 1", "Special Talent 2"]).map((talentPage, _) => {
                    return (
                        <Box key={`player_${player.playerID}_talents_${talentPage}`} align="center" gap="medium">
                            <Text>{talentPage}</Text>
                            <Grid columns={{ count: 'fit', size: size == "small" ? '50%' : "20%" }} fill>
                                {
                                    GetTalentArray(talentPage).map((originalTalent, index) => {
                                        const talent = player.talents.find(x => x.skillIndex == originalTalent.skillIndex);
                                        if (talent) {
                                            return (
                                                <Box key={index}>
                                                    <Tip
                                                        plain
                                                        content={
                                                            <Box pad="small" gap="small" background="white" style={{ display: talent.level > 0 ? 'normal' : 'none' }}>
                                                                <Text size={size == "small" ? 'small' : ''} weight="bold">{talent.name} ({talent.level}/{talent.maxLevel})</Text>
                                                                <hr style={{ width: "100%" }} />
                                                                <Text>{talent.getBonusText()}</Text>
                                                            </Box>
                                                        }
                                                        dropProps={{ align: { top: 'bottom' } }}
                                                    >
                                                        <Box pad="xxsmall" key={`player_${player.playerID}_talents_${index}`} direction="row" gap="xxsmall">
                                                            <Box width="50px" align="center">
                                                                <Box style={{ opacity: talent.level > 0 ? 1 : 0.2 }} className={talent.getClass()} title={talent.name} />
                                                            </Box>
                                                            <Box direction="row" gap="xxsmall">
                                                                <Text>{talent.level} </Text>
                                                                <Text>/</Text>
                                                                <Text>{talent.maxLevel}</Text>
                                                            </Box>
                                                        </Box>
                                                    </Tip>
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

function PostOfficeDisplay({ player, extra }: { player: Player, extra: PostOfficeExtra }) {
    const size = useContext(ResponsiveContext);

    const unSpentPoints = useMemo(() => {
        const totalSpent = player.postOffice.reduce((sum, box) => sum += box.level, 0);
        return extra.misc + extra.streak + extra.complete - totalSpent;
    }, [player, extra]);

    return (
        <Box pad="medium" gap="small" fill>
            <Text size='medium'>Post Office</Text>
            <Text size='small'>Unspent: {unSpentPoints}</Text>
            <Grid columns={{ count: size == "small" ? 2 : 4, size: "auto" }} gap="none">
                {
                    player.postOffice.filter((box) => box.name != "Filler").map((box) => {
                        return (
                            <Box key={`player_${player.playerID}_postoffice_${box.index}`} fill>
                                <Tip
                                    plain
                                    content={
                                        <Box pad="small" gap="small" background="white">
                                            <Text size={size == "small" ? 'small' : ''} weight="bold">{box.name} ({box.level})</Text>
                                            <hr style={{ width: "100%" }} />
                                            {
                                                box.bonuses.map((bonus, bIndex) => {
                                                    return (
                                                        <Box key={`player_${player.playerID}_postoffice_${box.index}_${bIndex}`} direction="row" gap="small">
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
                                    <Box align="center" fill direction="row" gap="small">
                                        <Box width={{ max: '88px' }} fill>
                                            <Box style={{ opacity: box.level > 0 ? 1 : 0.3 }} className={box.getClass()} />
                                        </Box>
                                        <Box background="black">
                                            <Text>{box.level}</Text>
                                        </Box>
                                    </Box>

                                </Tip>
                            </Box>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function InventoryDisplay({ player }: { player: Player }) {
    const [playerInventory, setPlayerInventory] = useState<Item[]>([]);
    const size = useContext(ResponsiveContext);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        const theData = idleonData.getData();
        const storage = theData.get("storage") as Storage;
        setPlayerInventory(storage.playerStorage[player.playerID]);
    }, [idleonData, player])

    const emptySlots = useMemo(() => {
        return playerInventory?.filter((item) => item.internalName == "Blank").length ?? 0;
    }, [playerInventory]);

    const lockedSlots = useMemo(() => {
        return playerInventory?.filter((item) => item.internalName == "LockedInvSpace").length ?? 0;
    }, [playerInventory]);

    const itemsToShow = useMemo(() => {
        return playerInventory?.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank") ?? [];
    }, [playerInventory]);

    return (
        <Box pad="medium" gap="small" fill>
            <Text size='medium'>Inventory</Text>
            <Box direction="row" gap="medium">
                <Text size='small'>Empty Slots: {emptySlots}</Text>
                <Text size='small'>Locked Slots: {lockedSlots}</Text>
            </Box>
            <Box direction="row" wrap>
            {
                itemsToShow.map((item, index) => (
                    <Box key={index} border={{color: 'grey-1' }}  background="accent-4" width={{max: '100px', min: '100px'}} align="center">
                        <ItemDisplay item={item} size="36px" />
                    </Box>
                ))
                }
            </Box>
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
                <Text color='accent-2' size="small" weight={isActive ? 'bold' : 'normal'}>{text}</Text>
                {isActive && <Next size="small" />}
            </Box>
        </Button>
    )
}

function PlayerTab({ player }: PlayerTabProps) {
    const [playerStatues, setPlayerStatues] = useState<PlayerStatues | undefined>(undefined);
    const [index, setIndex] = useState<number>(1);
    const [activeBubbles, setActiveBubbles] = useState<Bubble[]>([]);
    const [poExtra, setPoExtra] = useState<PostOfficeExtra>({
        misc: 0,
        complete: 0,
        streak: 0
    });

    const idleonData = useContext(AppContext);
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            const statues = theData.get("statues");
            if (statues) {
                setPlayerStatues(statues[player.playerID]);
            }
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
            setPoExtra(theData.get("POExtra"));
        }
    }, [idleonData, player]);

    return (
        <ShadowBox flex={false}>
            <Grid rows="1" columns={['25%', '75%']}>
                <Box pad="medium" height="100%" >
                    <SpecialButton isActive={index == 1} clickHandler={() => onActive(1)} text={"Random Stats"} />
                    <SpecialButton isActive={index == 2} clickHandler={() => onActive(2)} text={"Skills"} />
                    <SpecialButton isActive={index == 3} clickHandler={() => onActive(3)} text={"Equipment"} />
                    <SpecialButton isActive={index == 4} clickHandler={() => onActive(4)} text={"Statues"} />
                    <SpecialButton isActive={index == 5} clickHandler={() => onActive(5)} text={"Anvil - WIP"} />
                    <SpecialButton isActive={index == 6} clickHandler={() => onActive(6)} text={"Carry Capacity - WIP"} />
                    <SpecialButton isActive={index == 7} clickHandler={() => onActive(7)} text={"Talents"} />
                    <SpecialButton isActive={index == 8} clickHandler={() => onActive(8)} text={"Post Office"} />
                    <SpecialButton isActive={index == 9} clickHandler={() => onActive(9)} text={"Inventory"} />
                </Box>
                <Box fill background="dark-1">
                    {index == 1 && <MiscStats player={player} activeBubbles={activeBubbles} />}
                    {index == 2 && <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} />}
                    {index == 3 && <EquipmentDisplay player={player} />}
                    {index == 4 && <StatuesDisplay playerStatues={playerStatues} player={player} />}
                    {index == 5 && <AnvilDisplay player={player} activeBubbles={activeBubbles} playerStatues={playerStatues} />}
                    {index == 6 && <CarryCapacityDisplay player={player} />}
                    {index == 7 && <TalentDisplay player={player} />}
                    {index == 8 && <PostOfficeDisplay player={player} extra={poExtra} />}
                    {index == 9 && <InventoryDisplay player={player} />}
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
    const [playerData, setPlayerData] = useState<Player[]>();
    const [index, setIndex] = useState<number>(0);
    const [activePlayer, setActivePlayer] = useState<string>('');
    const size = useContext(ResponsiveContext);
    const idleonData = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setPlayerData(theData.get("players"));
            if (playerData && playerData.length > 0 && activePlayer === '') {
                const firstPlayer = playerData[0];
                setActivePlayer(firstPlayer.playerID.toString() ?? '');
            }
        }
    }, [idleonData, activePlayer, playerData]);
    return (
        <Box>
            <NextSeo title="Players" />
            <ThemeContext.Extend value={customTabs}>
                {size == "small" ?
                    <Box>
                        <Select
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            value={activePlayer}
                            options={playerData?.map((player) => { return { label: player.playerName, value: player.playerID } }) ?? ["Loading Players"]}
                            onChange={({ value: nextValue }) => setActivePlayer(nextValue)}
                        />
                        <Box pad={{ right: 'large', left: 'large' }} width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill>
                            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Players</Heading>
                            <Box pad="small">
                                {
                                    playerData?.filter(player => player.playerID.toString() == activePlayer).map((player, playerIndex) => {
                                        return (
                                            <Box key={player.playerID} pad="small">
                                                <PlayerTab player={player} />
                                            </Box>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    </Box>
                    :
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
                }
            </ThemeContext.Extend>
        </Box>
    )
}

export default Players;