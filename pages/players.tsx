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

import { Player, SkillData, SkillsIndex } from '../data/domain/player';
import { ClassIndex, ClassTalentMap, GetTalentArray, TalentConst } from '../data/domain/talents';
import { CapacityConst, playerInventoryBagMapping } from '../data/domain/capacity';
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
import { Item, ItemStat, ItemSources, Food, DropSource } from '../data/domain/items';
import { Storage } from '../data/domain/storage';
import { Prayer } from '../data/domain/prayers';
import { TimeDown, TimeUp } from '../components/base/TimeDisplay';
import { Worship } from '../data/domain/worship';
import ObolsInfo from '../components/account/task-board/obolsInfo';
import TextAndLabel, { ComponentAndLabel } from '../components/base/TextAndLabel';
import { Bribe, BribeStatus } from '../data/domain/bribes';
import { Skilling } from '../data/domain/skilling';
import { SaltLick } from '../data/domain/saltLick';
import { Family } from '../data/domain/family';
import { Achievement, AchievementConst } from '../data/domain/achievements';
import { Dungeons, PassiveType } from '../data/domain/dungeons';
import { MapInfo } from '../data/domain/maps';
import { EnemyInfo } from '../data/domain/enemies';
import Stat from '../components/base/Stat';


function ItemSourcesDisplay({ sources, dropInfo }: { sources: ItemSources, dropInfo: DropSource[] }) {

    const possibleSources = useMemo(() => {
        if (!sources) {
            return []
        }

        const fromSources = sources.sources.map(x => x.txtName);
        const fromRecipe = sources.recipeFrom.map(x => x.txtName);
        const fromQuests = sources.questAss.map(x => x.txtName);
        return Array.from(new Set([...fromSources, ...fromRecipe, ...fromQuests]));
    }, [sources]);


    return (
        <Box>
            <Text size="medium">Obtain From:</Text>
            {
                possibleSources.length > 0 ?
                    <Box>

                        {
                            possibleSources.map((source, index) => (
                                <Text size="small" key={index}>{source}</Text>
                            ))
                        }
                    </Box> :
                    <>I don&apos;t know yet</>
            }
        </Box>
    )
}

interface SkillProps {
    skillsMap: Map<SkillsIndex, SkillData>
    skillsRank: Map<SkillsIndex, number>
    player: Player
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
            case SkillsIndex.Cooking: return `icons-3836 icons-ClassIcons51`;
            case SkillsIndex.Breeding: return `icons-3836 icons-ClassIcons52`;
            case SkillsIndex.Intellect: return `icons-3836 icons-ClassIcons53`;

            default: return '';
        }
    }

    return (
        <Box pad={{ left: "large", top: "medium" }} gap="medium">
            <Text size='medium'>Skills</Text>
            <Grid
                columns={['33%', '33%', '33%']}
                areas={[
                    ['mining', 'fishing', 'trapping'],
                    ['smithing', 'alchemy', 'construction'],
                    ['chopping', 'catching', 'worship'],
                    ['cooking', 'breeding', 'intellect'],
                ]}
            >
                {
                    Array.from(props.skillsMap).map(([skillIndex, skill]) => {
                        const skillRank = props.skillsRank.get(skillIndex);
                        return (
                            <Box key={`skill_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} gridArea={`${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} direction="row" gap="medium" margin={{ right: 'small', bottom: 'medium' }}>
                                <Box direction="row" align="center" gap="small">
                                    <Box width={{ max: '36px', min: '36px' }}>
                                        <Box className={getSkillClass(skillIndex)} />
                                    </Box>
                                    <Box gap="small">
                                        <Box direction="row" gap="small">
                                            <Text size="small">{skill.level}</Text>
                                            {skillRank != undefined && <Text size="small">(Ranked {nth(skillRank + 1)})</Text>}
                                        </Box>
                                        <Meter
                                            size="small"
                                            thickness='2px'
                                            type="bar"
                                            background="grey-1"
                                            color="brand"
                                            values={[
                                                {
                                                    value: skill.currentXP,
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={skill.xpReq} />
                                        <Box direction="row" justify="between">
                                            <Text size="xsmall">{nFormatter(skill.currentXP)}</Text>
                                            <Text size="xsmall">{nFormatter(skill.xpReq)}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>)
                    })
                }
            </Grid >
            {
                props.player.classId == ClassIndex.Maestro &&
                <Box gap="small">
                    <Text>Current crystal cooldown reductions: (max is {nFormatter(props.player.talents.find(talent => talent.skillIndex == 41)?.getBonus() ?? 0, "Smaller")}%)</Text>
                    <Box direction="row" wrap>
                        {
                            Array.from(props.skillsMap).map(([skillIndex, skill]) => {
                                // Crystal cooldown only affects the first 9 skills
                                let crystalReduction: number | undefined = undefined;
                                if (skillIndex < 10) {
                                    const skillXpReq = Skilling.getXPReq(skillIndex, skill.level);
                                    crystalReduction = (1 - (skill.xpReq / skillXpReq)) * 100;
                                    if (crystalReduction > 0) {
                                        return (
                                            <Box key={`ccd_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} direction="row" gap="medium" margin={{ right: 'small', bottom: 'medium' }}>
                                                <Box direction="row" align="center" gap="small">
                                                    <Box width={{ max: '36px', min: '36px' }}>
                                                        <Box className={getSkillClass(skillIndex)} />
                                                    </Box>
                                                    <Box gap="small">
                                                        <Box direction="row" gap="small">
                                                            <Text size="small">{nFormatter(crystalReduction, "Smaller")}%</Text>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                    }
                                }
                                return null;
                            })
                        }
                    </Box>
                </Box>
            }
        </Box>
    );
}

function MiscStats({ player, activeBubbles }: { player: Player, activeBubbles: Bubble[] }) {
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext)

    const worship = appContext.data.getData().get("worship") as Worship;
    const playerCoins = useMemo(() => getCoinsArray(player.money), [player]);
    const activeShrines = useMemo(() => {
        const theData = appContext.data.getData();
        const shrines = theData.get("shrines") as Shrine[];
        if (shrines) {
            return shrines.filter((shrine) => shrine.isShrineActive(player.currentMapId) && shrine.level > 0);
        }
        return [];
    }, [appContext, player]);

    const activePrayers = useMemo(() => {
        const theData = appContext.data.getData();
        const prayers = theData.get("prayers") as Prayer[];
        if (prayers) {
            return player.activePrayers.map((prayerIndex) => prayers[prayerIndex]);
        }
        return [];
    }, [appContext, player]);

    const playerWorshipInfo = useMemo(() => {
        const chargeRate = worship?.playerData[player.playerID]?.chargeRate ?? 0;
        const maxCharge = worship?.playerData[player.playerID]?.maxCharge ?? 0;
        const estimatedCharge = worship?.playerData[player.playerID]?.estimatedCharge ?? 0;

        return {
            chargeRate: chargeRate,
            maxCharge: maxCharge,
            estimatedCharge: estimatedCharge,
        }
    }, [worship, player])

    const crystalSpawnChance = useMemo(() => {
        const theData = appContext.data.getData();
        const stamps = theData.get("stamps") as Stamp[][];
        const shrines = theData.get("shrines") as Shrine[];

        let crystalSpawnStamp = 0;
        if (stamps) {
            crystalSpawnStamp = stamps[StampTab.Misc][StampConsts.CrystallinIndex].getBonus();
        }

        const shrineCardBonus = player.cardInfo?.equippedCards.find((card) => card.id == "Z9")?.getBonus() ?? 0;
        const shrineBonus = shrines[ShrineConstants.CrystalShrine].getBonus(player.currentMapId, shrineCardBonus);
        const cardBonus = player.cardInfo?.equippedCards.filter((card) => card.effect.includes("Crystal Mob Spawn Chance")).reduce((sum, card) => sum += card.getBonus(), 0) ?? 0;
        const crystalSpawnTalentBonus = player.talents.find(x => x.skillIndex == TalentConst.CrystalSpawnIndex)?.getBonus() ?? 0;
        const crystalForDaysTalentBonus = player.talents.find(x => x.skillIndex == TalentConst.CrystalForDaysIndex)?.getBonus() ?? 0;

        let postOfficeBonus = 0;
        if (player.postOffice) {
            const nonPredatoryBox = player.postOffice[PostOfficeConst.NonPredatoryBoxIndex];
            postOfficeBonus = nonPredatoryBox.level > 0 ? nonPredatoryBox.bonuses[2].getBonus(nonPredatoryBox.level, 2) : 0;
        }

        return 5e-4 *
            (1 + crystalSpawnTalentBonus / 100) *
            (1 + (postOfficeBonus + shrineBonus) / 100) *
            (1 + crystalForDaysTalentBonus / 100) *
            (1 + crystalSpawnStamp / 100) *
            (1 + cardBonus / 100);
    }, [appContext, player])


    const secondsSinceUpdate = useMemo(() => {
        const lastUpdated = appContext.data.getLastUpdated(true) as Date | undefined;
        if (lastUpdated) {
            return (new Date().getTime() - lastUpdated.getTime()) / 1000;
        }
        return 0;
    }, [appContext]);

    return (
        <Box pad="medium">
            <Text size='medium'>Random Stats</Text>
            <Grid columns={size == "small" ? '100%' : ['50%', '50%']} fill>
                <Box pad="medium" gap="small">
                    <Box direction="row" align="center" gap="small">
                        <Box width={{ max: '36px', min: '36px' }} title={player.class}>
                            <Box className={player.getClassClass()} />
                        </Box>
                        <Box gap="small">
                            <Box direction="row" gap="small">
                                <Text size="small">{player.level}</Text>
                            </Box>
                            <Meter
                                size="small"
                                thickness='2px'
                                type="bar"
                                background="grey-1"
                                color="brand"
                                values={[
                                    {
                                        value: player.classExp,
                                        label: 'current',
                                        color: 'brand'
                                    }
                                ]}
                                max={player.classExpReq} />
                            <Box direction="row" justify="between">
                                <Text size="xsmall">{nFormatter(player.classExp, "Whole")}</Text>
                                <Text size="xsmall">{nFormatter(player.classExpReq, "Whole")}</Text>
                            </Box>
                        </Box>
                    </Box>
                    <Text size="small">Current Monster / Map = {player.currentMonster} / {player.currentMap}</Text>
                    {
                        player.killInfo.has(player.currentMapId) &&
                        (MapInfo.find(map => map.id == player.currentMapId)?.portalRequirements ?? []).reduce((sum, req) => sum += req, 0) > 0 &&
                        <Text size="small">
                            Portal Requirement: {nFormatter(player.killInfo.get(player.currentMapId) ?? 0)} / [{MapInfo.find(map => map.id == player.currentMapId)?.portalRequirements.map(req => nFormatter(req))}]
                        </Text>
                    }
                    {
                        player.starSigns.map((sign, index) => {
                            return <Text size="small" key={`sign-${index}`}>Sign {index} = {sign.getText()}</Text>
                        })
                    }
                    <Box direction="row" gap="xsmall">
                        <Text size="small">Away Since =</Text>
                        {player.afkFor < 100 ? "Active" : <TimeUp addSeconds={player.afkFor + secondsSinceUpdate} />}
                    </Box>
                    <Text size="small">STR = {player.stats.strength}</Text>
                    <Text size="small">AGI = {player.stats.agility}</Text>
                    <Text size="small">WIS = {player.stats.wisdom}</Text>
                    <Text size="small">LUK = {player.stats.luck}</Text>
                    <Text size="small">Crystal Spawn Chance = 1 in {Math.floor(1 / crystalSpawnChance)}</Text>
                    <Stat stat={player.doubleClaimChance} />
                    <Stat stat={player.monsterCash} />
                    <Text size="small">Charge Rate = {Math.round(playerWorshipInfo.chargeRate * 24)}% / day</Text>
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
                                        value: playerWorshipInfo.estimatedCharge,
                                        label: 'current',
                                        color: 'brand'
                                    }
                                ]}
                                max={playerWorshipInfo.maxCharge} />
                            <Box align="center" pad="xxsmall">
                                <Text size="small">{playerWorshipInfo.estimatedCharge.toString()} ({(playerWorshipInfo.estimatedCharge / playerWorshipInfo.maxCharge * 100).toPrecision(3)}%)</Text>
                            </Box>
                        </Stack>
                        <Text>{playerWorshipInfo.maxCharge}</Text>
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
                            player.cardInfo ? player.cardInfo.equippedCards.filter(card => card.name != "Empty").map((card, index) => {
                                return (
                                    <Box key={index}>
                                        <Stack key={index}>
                                            <Box align="center" fill width={{ min: '28px', max: '28px' }} height={{ min: '36px', max: '36px' }}>
                                                <Box height={{ min: '36px', max: '36px' }} className={card.getClass()} />
                                            </Box>
                                            <TipDisplay
                                                heading={`${card.displayName}`}
                                                body={card.getBonusText()}
                                                size={size}
                                                direction={TipDirection.Down}
                                            >
                                                <Box align="center" width={{ max: '31px', min: '31px' }} height={{ min: '43px', max: '43px' }}>
                                                    <Box height={{ min: '43px', max: '43px' }} key={`border_${index}`} className={card.getBorderClass()} />
                                                </Box>
                                            </TipDisplay>
                                        </Stack>

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
                            <Box direction="row" wrap>
                                {
                                    activeShrines.map((shrine, index) => {
                                        const cardBonus = player.cardInfo?.equippedCards.find(x => x.id == "Z9")?.getBonus() ?? 0;
                                        return (
                                            <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
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

function ItemDisplay({ item, size, goldFoodMulti }: { item: Item | undefined, size?: string, goldFoodMulti?: number }) {

    const statsDisplay = (stats: ItemStat[], description: string) => {
        if ((item as Food).goldenFood != undefined) {
            return <Text>{(item as Food).getBonusText(item?.count ?? 0, goldFoodMulti)}</Text>
        }
        if (description) {
            return <Text>{description}</Text>
        }

        return stats.filter((stat) => stat.shouldDisplay()).map((x, index) => <Text key={index}>{x.getDisplay()}</Text>);
    }


    if (!item) {
        return (<Box height="50px" width="50px" />)
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
                {item.count > 0 ?

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
    const appContext = useContext(AppContext);
    const theData = appContext.data.getData();
    const family = theData.get("family") as Family;
    const stampData = theData.get("stamps") as Stamp[][];
    const achievementsInfo = theData.get("achievements") as Achievement[];

    const goldFoodStampBonus = stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC7")?.getBonus() ?? 0;
    const goldFoodAchievement = achievementsInfo[AchievementConst.GoldFood].completed;
    const goldFoodMulti = player.getGoldFoodMulti(family.classBonus.get(ClassIndex.Shaman)?.getBonus() ?? 0, goldFoodStampBonus, goldFoodAchievement);


    return (
        <Box pad="medium">
            <Box direction="row" gap="medium" wrap>
                <Box gap="small">
                    <Text size='medium'>Equipment</Text>
                    <Grid columns={{ count: 2, size: "50px" }} key={`player_${player.playerID}_equip`}>
                        {
                            player.gear.equipment.slice(0, 8).map((equip, index) => (
                                <Box pad="xsmall" border={{ color: 'grey-1' }} key={index}>
                                    <ItemDisplay item={equip} />
                                </Box>
                            ))
                        }
                    </Grid>
                </Box>
                <Box gap="small">
                    <Text size='medium'>Specials</Text>
                    <Grid columns={{ count: 2, size: "50px" }} key={`player_${player.playerID}_special`}>
                        {
                            player.gear.equipment.slice(8, 16).map((equip, index) => (
                                <Box pad="xsmall" border={{ color: 'grey-1' }} key={index}>
                                    <ItemDisplay item={equip} />
                                </Box>
                            ))
                        }
                    </Grid>
                </Box>
                <Box gap="small">
                    <Text size='medium'>Tools</Text>
                    <Grid columns={{ count: 2, size: "50px" }} key={`player_${player.playerID}_tools`}>
                        {
                            player.gear.tools.slice(0, 8).map((equip, index) => (
                                <Box pad="xsmall" border={{ color: 'grey-1' }} key={index}>
                                    <ItemDisplay item={equip} />
                                </Box>
                            ))
                        }
                    </Grid>
                </Box>
                <Box gap="small">
                    <Text size='medium'>Food</Text>
                    <Grid columns={{ count: 2, size: "50px" }} key={`player_${player.playerID}_food`}>
                        {
                            player.gear.food.slice(0, 8).map((equip, index) => (
                                <Box pad="xsmall" border={{ color: 'grey-1' }} key={index}>
                                    <ItemDisplay item={equip} goldFoodMulti={goldFoodMulti} />
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
    const appContext = useContext(AppContext);
    const hammerName = "Hammer Hammer";

    const allItems = appContext.data.getData().get("itemsData") as Item[];
    const sharpShells = allItems.find(item => item.displayName == "Shrapshell");

    const anvilCostDiscount = useMemo(() => {
        const theData = appContext.data.getData();
        const alchemy = theData.get("alchemy") as Alchemy;
        const anvilnomicsBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.Anvilnomics];
        const anvilnomicsBonus = lavaFunc(anvilnomicsBubble.func, anvilnomicsBubble.level, anvilnomicsBubble.x1, anvilnomicsBubble.x2);
        if (player.getBaseClass() == ClassIndex.Archer) {
            const greenCauldronBonusBubble = alchemy.cauldrons[CauldronIndex.Quicc].bubbles[AlchemyConst.CauldronBonusBubbleIndex];
            const classBonus = lavaFunc(greenCauldronBonusBubble.func, greenCauldronBonusBubble.level, greenCauldronBonusBubble.x1, greenCauldronBonusBubble.x2);
            return anvilnomicsBonus * classBonus;
        }
        return anvilnomicsBonus;
    }, [appContext, player])

    const anvilSpeed = useMemo(() => {
        // ANVIL SPEED MATH;
        const theData = appContext.data.getData();
        const stampData = theData.get("stamps");
        const anvilZoomerBonus = stampData ? stampData[1][2].getBonus(player.skills.get(SkillsIndex.Smithing)?.level) : 0;
        const blackSmithBox = player.postOffice[PostOfficeConst.BlacksmithBoxIndex];
        const postOfficeBonus = blackSmithBox.level > 0 ? blackSmithBox.bonuses[1].getBonus(blackSmithBox.level, 1) : 0;
        const hammerHammerBonus = activeBubbles ? activeBubbles.find(x => x.name == hammerName)?.getBonus() ?? 0 : 0;
        const anvilStatueBonus = playerStatues ? playerStatues.statues[StatueConst.AnvilIndex].getBonus(player) : 0;
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Speed in Town"), 0);
        const talentTownSpeedBonus = player.talents.find(x => x.skillIndex == 269)?.getBonus() ?? 0;

        return (3600 * player.anvil.getSpeed(player.stats.agility, anvilZoomerBonus, postOfficeBonus, hammerHammerBonus, anvilStatueBonus, starSignBonus, talentTownSpeedBonus));
    }, [appContext, activeBubbles, playerStatues, player])

    const anvilXP = useMemo(() => {
        const theData = appContext.data.getData();
        const shrines = theData.get("shrines") as Shrine[];
        const prayers = theData.get("prayers") as Prayer[];
        const saltLick = theData.get("saltLick") as SaltLick;
        const family = theData.get("family") as Family;
        const stampData = theData.get("stamps") as Stamp[][];
        const achievementsInfo = theData.get("achievements") as Achievement[];
        const dungeonsData = theData.get("dungeons") as Dungeons;

        if (shrines && prayers && saltLick && playerStatues && family && stampData && achievementsInfo) {
            const saltLickBonus = saltLick.getBonus(3);
            const dungeonBonus = (dungeonsData.passives.get(PassiveType.Flurbo) ?? [])[2]?.getBonus() ?? 0; // Lava is looking at the wrong bonus.
            const goldFoodStampBonus = stampData.flatMap(stamp => stamp).find(stamp => stamp.raw_name == "StampC7")?.getBonus() ?? 0;
            const goldFoodAchievement = achievementsInfo[AchievementConst.GoldFood].completed;
            const allSkillXP = Skilling.getAllSkillXP(player, shrines, playerStatues, prayers, saltLickBonus, dungeonBonus, family, goldFoodStampBonus, goldFoodAchievement);
            const xpMulti = player.anvil.getXPMulti(player, allSkillXP);
            return (100 * (player.anvil.getXP(xpMulti) - 1));
        }
        return 0;
    }, [appContext, player, playerStatues])

    const allCapBonus = useMemo(() => {
        const theData = appContext.data.getData();
        const guild = theData.get("guild");
        const shrines = theData.get("shrines");
        const bribes = theData.get("bribes") as Bribe[];

        let guildCarryBonus: number = 0;
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }
        const telekineticStorageBonus = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex)?.getBonus() ?? 0;
        const cardBonus = player.cardInfo?.equippedCards.find(x => x.id == "Z9")?.getBonus() ?? 0;
        const carryCapShrineBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId, cardBonus);
        const bribeCapBonus = bribes.find(bribe => bribe.name == "Bottomless Bags")?.status == BribeStatus.Purchased ? 5 : 0;
        return player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus, bribeCapBonus);

    }, [appContext, player])

    const anvilCapcity = useMemo(() => {
        const theData = appContext.data.getData();
        const stampData = theData.get("stamps") as Stamp[][];
        const gemStore = theData.get("gems") as GemStore;

        const allStamps = stampData.flatMap((tab) => [...tab]);
        const allCapStampBonus = allStamps.find((stamp) => stamp.raw_name == CapacityConst.AllCarryStamp)?.getBonus(player.skills.get(SkillsIndex.Smithing)?.level) ?? 0;
        const gemCapacityBonus = gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0;
        const extraBagsTalentBonus = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex)?.getBonus() ?? 0;
        const starSignExtraCap = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Carry Cap"), 0);

        const capProps = {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.MaterialCapStamp)?.getBonus(player.skills.get(SkillsIndex.Smithing)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        }

        return player.anvil.getCapacity(player.capacity.bags.find(x => x.name == "bCraft")?.getCapacity(capProps) ?? 0);
    }, [appContext, player, allCapBonus])

    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Anvil</Text>
            <Box gap="small" pad="small">
                <Text size="small">Available Points: {player.anvil.availablePoints}</Text>
                <Text size="small">Points from coins: {player.anvil.pointsFromCoins}</Text>
                <ComponentAndLabel
                    label={"Next Point Cost"}
                    component={<CoinsDisplay coinMap={getCoinsArray(player.anvil.getCoinCost(anvilCostDiscount))} />}
                />
                <ComponentAndLabel
                    label={"Total Point Cost"}
                    component={<CoinsDisplay coinMap={getCoinsArray(player.anvil.getTotalCoinCost(anvilCostDiscount))} />}
                />
                <Text size="small">Points from mats: {player.anvil.pointsFromMats}</Text>
                <ComponentAndLabel
                    label={"Total Sharpshells Cost"}
                    component={
                        <Box direction="row" align="center">
                            <Text>{nFormatter(player.anvil.getTotalSharpshells(anvilCostDiscount))}</Text>
                            <Box width={{ max: '25px', min: '25px' }}>
                                <Box className={sharpShells?.getClass()} />
                            </Box>
                        </Box>
                    }
                />
                <TextAndLabel
                    label={"Next Material Point Cost"}
                    text={nFormatter(player.anvil.getMonsterMatCost(anvilCostDiscount))}
                />
                <Box direction="row">
                    <Box margin={{ right: 'small' }} border={{ side: 'right', color: 'grey-1', size: '2px' }}>
                        <TextAndLabel
                            label="XP"
                            text={`${nFormatter(anvilXP, "Big")}% (${player.anvil.xpPoints})`}
                            margin={{ right: 'small' }}
                        />
                    </Box>
                    <Box margin={{ right: 'small' }} border={{ side: 'right', color: 'grey-1', size: '2px' }}>
                        <TextAndLabel
                            label="Speed"
                            text={`${nFormatter(anvilSpeed)} (${player.anvil.speedPoints})`}
                            margin={{ right: 'small' }}
                        />
                    </Box>
                    <TextAndLabel
                        label="Capacity"
                        text={`${anvilCapcity} (${player.anvil.capPoints})`}
                        margin={{ right: 'small' }}
                    />
                </Box>
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
                                <Box direction="row" gap="xsmall">
                                    <Text size="small">Time till cap =</Text>
                                    <TimeDown addSeconds={timeTillCap} />
                                </Box>
                                <Text size="small">Production Per Hour (per hammer) = {Math.round(anvilSpeed / anvilItem.time)} </Text>
                                <Text size="small">Total Produced of this item = {nFormatter(Math.round(anvilItem.totalProduced))}</Text>
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
    const appContext = useContext(AppContext);

    const allCapBonus = useMemo(() => {
        const theData = appContext.data.getData();
        const guild = theData.get("guild");
        const shrines = theData.get("shrines");
        const bribes = theData.get("bribes") as Bribe[];

        let guildCarryBonus: number = 0;
        let zergPrayerBonus: number = 0; // TODO!
        let ruckSackPrayerBonus: number = 0; // TODO!

        if (guild) {
            guildCarryBonus = lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }

        const telekineticStorageBonus = player.talents.find(x => x.skillIndex == CapacityConst.TelekineticStorageSkillIndex)?.getBonus() ?? 0;
        const cardBonus = player.cardInfo?.equippedCards.find(x => x.id == "Z9")?.getBonus() ?? 0;
        const carryCapShrineBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId, cardBonus);
        const bribeCapBonus = bribes.find(bribe => bribe.name == "Bottomless Bags")?.status == BribeStatus.Purchased ? 5 : 0;
        return player.capacity.getAllCapsBonus(guildCarryBonus, telekineticStorageBonus, carryCapShrineBonus, zergPrayerBonus, ruckSackPrayerBonus, bribeCapBonus);

    }, [appContext, player])

    const guildBonus = useMemo(() => {
        const theData = appContext.data.getData();
        const guild = theData.get("guild");

        if (guild) {
            return lavaFunc(guild.guildBonuses[2].func, guild.guildBonuses[2].level, guild.guildBonuses[2].x1, guild.guildBonuses[2].x2);
        }
        return 0;
    }, [appContext])

    const gemCapBought = useMemo(() => {
        const theData = appContext.data.getData();
        const gemStore = theData.get("gems") as GemStore;

        if (gemStore) {
            return gemStore?.purchases.find(x => x.no == 58)?.pucrhased;
        }
        return 0;
    }, [appContext])

    const capBonuses = useMemo(() => {
        const theData = appContext.data.getData();
        const stampData = theData.get("stamps") as Stamp[][];
        const gemStore = theData.get("gems") as GemStore;

        const extraBagsTalentBonus = player.talents.find(x => x.skillIndex == CapacityConst.ExtraBagsSkillIndex)?.getBonus() ?? 0;
        const starSignExtraCap = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Carry Cap"), 0);

        const allStamps = stampData.flatMap((tab) => [...tab]);
        const allCapStampBonus = allStamps.find((stamp) => stamp.raw_name == CapacityConst.AllCarryStamp)?.getBonus() ?? 0;
        const gemCapacityBonus = gemStore?.purchases.find(x => x.no == 58)?.pucrhased ?? 0;
        const toReturn = new Map();
        toReturn.set("Mining", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.MiningCapStamp)?.getBonus(player.skills.get(SkillsIndex.Mining)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Chopping", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.ChoppingCapStamp)?.getBonus(player.skills.get(SkillsIndex.Chopping)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Souls", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Fishing", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.FishCapStamp)?.getBonus(player.skills.get(SkillsIndex.Fishing)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Foods", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("bCraft", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.MaterialCapStamp)?.getBonus(player.skills.get(SkillsIndex.Smithing)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Bugs", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: allStamps.find((stamp) => stamp.raw_name == CapacityConst.BugCapStamp)?.getBonus(player.skills.get(SkillsIndex.Catching)?.level) ?? 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });
        toReturn.set("Critters", {
            allCapBonuses: allCapBonus,
            stampMatCapBonus: 0,
            gemsCapacityBought: gemCapacityBonus,
            stampAllCapBonus: allCapStampBonus,
            extraBagsLevel: extraBagsTalentBonus,
            starSignExtraCap: starSignExtraCap
        });

        return toReturn;
    }, [appContext, player, allCapBonus])

    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Carry Capacity</Text>
            <Box>
                <Text size="small">Guild Bonus: {guildBonus} </Text>
                <Text size="small">Gem Capacity Bought: {gemCapBought}</Text>
            </Box>
            <Grid columns="1/3" gap="small" pad="small">
                {
                    player.capacity.bags.filter((bag) => bag.displayName != undefined).map((bag, index) => (
                        <Box align="center" key={index} gap="small">
                            <Box width={{ max: '50px', min: '50px' }}>
                                <Box className={bag.getClass()} />
                            </Box>
                            <Text size="small">{bag.displayName}: {Intl.NumberFormat().format(bag.getCapacity(capBonuses.get(bag.name)))}</Text>
                        </Box>
                    ))
                }
            </Grid>
        </Box>
    )
}

function TalentDisplay({ player }: { player: Player }) {
    const size = useContext(ResponsiveContext);
    return (
        <Box pad="medium" gap="medium">
            <Text size='medium'>Talents</Text>
            {
                ClassTalentMap[ClassIndex[player.class.replace(/ /g, "_") as keyof typeof ClassIndex]].concat(["Special Talent 1", "Special Talent 2", "Special Talent 3"]).map((talentPage, _) => {
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
    const appContext = useContext(AppContext);
    const allItems = appContext.data.getData().get("itemsData") as Item[];

    useEffect(() => {
        const theData = appContext.data.getData();
        const storage = theData.get("storage") as Storage;
        setPlayerInventory(storage.playerStorage[player.playerID]);
    }, [appContext, player])

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
        <Box pad="medium" gap="medium" fill>
            <Text size='medium'>Inventory</Text>
            <Box direction="row" wrap>
                {
                    itemsToShow.map((item, index) => (
                        <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                            <ItemDisplay item={item} size="36px" />
                        </Box>
                    ))
                }
            </Box>
            <Box>
                <Text size='small'>Empty Slots: {emptySlots}</Text>
                <Text size='small'>Locked Slots: {lockedSlots}</Text>
                <Box direction="row" wrap>
                    {
                        playerInventoryBagMapping.map((playerInvItem, index) => {
                            if (playerInvItem[1] == "0") {
                                return;
                            }

                            const opacity = Object.keys(player.invBagsUsed).find(bagNumber => bagNumber == playerInvItem[0]) ? 1 : 0.2;
                            const bagItem = allItems.find(item => item.internalName == playerInvItem[2]);
                            if (bagItem) {
                                return (
                                    <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                        {opacity == 1 ?
                                            <Box style={{ opacity: opacity }} width={{ max: '36px', min: '36px' }}>
                                                <Box className={bagItem.getClass()} />
                                            </Box>
                                            :
                                            <TipDisplay
                                                heading={`${bagItem.displayName} (${bagItem.type})`}
                                                body={<ItemSourcesDisplay sources={bagItem.sources} dropInfo={bagItem.dropInfo} />}
                                                size={"large"}
                                                direction={TipDirection.Down}
                                                maxWidth="large"
                                            >
                                                <Box style={{ opacity: opacity }} width={{ max: '36px', min: '36px' }}>
                                                    <Box className={bagItem.getClass()} />
                                                </Box>
                                            </TipDisplay>
                                        }
                                    </Box>
                                )
                            }
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

function ZowInfo({ player }: { player: Player }) {
    const ignoreArea = (area: string) => {
        if (area.includes("Colosseum")) {
            return true;
        }
        if (area.includes("Grandfrog's") || area.includes("Igloo")) {
            return true;
        }
        if (["TutorialA", "TutorialB", "TutorialC", "TutorialD", "JungleX", "MininggF", "How Did u get here", "Miningg1", "Miningg2", "Outer World Town", "The Untraveled Octopath",
            "Spike Surprise", "YumYum Grotto", "Salty Shores", "Faraway Piers", "Filler", "Deepwater Docks", "Bandit Bob's Hideout", "Frostbite Towndra",
            "Tunnels Entrance", "Trappers Folley", "Freefall Caverns", "The Ol' Straightaway", "Slip Slidy Ledges", "Echoing Egress",
            "Blunder Hills", "JungleZ", "PlayerSelect", "Efaunt's Tomb", "The Roots", "Mummy Memorial", "Gravel Tomb", "Heaty Hole", "End Of The Road", "Z", "Eycicles's Nest", "The Office"].includes(area)) {
            return true;
        }
        return false;
    }
    const zowCount = Array.from(player.killInfo.entries()).filter(([_, count]) => count > 100000).length;
    const toZow = Array.from(player.killInfo.entries()).map(([mapId, count]) => {
        const mapData = MapInfo.find(map => map.id == mapId);
        if (mapData?.enemy === undefined || count > 100000 || ignoreArea(mapData.area) || mapData.area == "Z") {
            return null;
        }
        return [mapId, count]
    });

    return (
        <Box pad="medium" gap="medium" fill>
            <Text size='medium'>Zow Info</Text>
            <Text>Current zow count: {zowCount}</Text>
            <Heading level="3" margin={{ bottom: '1px', top: '1px' }} >To be zowed:</Heading>
            <Box direction="row" wrap>
                {
                    toZow.map((data, index) => {
                        if (data) {
                            const mapData = MapInfo.find(map => map.id == data[0]);
                            const enemyData = EnemyInfo.find(enemy => enemy.details.internalName == mapData?.enemy);
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center" pad="small">
                                    {enemyData &&
                                        <Box title={mapData?.area} width={{ max: '35px' }}>
                                            <Box className={enemyData.getClass()} />
                                        </Box>
                                    }
                                    <Text>{nFormatter(data[1])}</Text>
                                </Box>
                            )
                        }
                    })
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

    const appContext = useContext(AppContext);
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
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
        if (player.classId != ClassIndex.Barbarian && index == 11) {
            setIndex(1);
        }
    }, [appContext, player]);

    return (
        <ShadowBox flex={false}>
            <Grid rows="1" columns={['25%', '75%']}>
                <Box pad="medium" height="100%" >
                    <SpecialButton isActive={index == 1} clickHandler={() => onActive(1)} text={"Random Stats"} />
                    <SpecialButton isActive={index == 2} clickHandler={() => onActive(2)} text={"Skills"} />
                    <SpecialButton isActive={index == 3} clickHandler={() => onActive(3)} text={"Equipment"} />
                    <SpecialButton isActive={index == 4} clickHandler={() => onActive(4)} text={"Statues"} />
                    <SpecialButton isActive={index == 5} clickHandler={() => onActive(5)} text={"Anvil"} />
                    <SpecialButton isActive={index == 6} clickHandler={() => onActive(6)} text={"Carry Capacity"} />
                    <SpecialButton isActive={index == 7} clickHandler={() => onActive(7)} text={"Talents"} />
                    <SpecialButton isActive={index == 8} clickHandler={() => onActive(8)} text={"Post Office"} />
                    <SpecialButton isActive={index == 9} clickHandler={() => onActive(9)} text={"Inventory"} />
                    <SpecialButton isActive={index == 10} clickHandler={() => onActive(10)} text={"Obols"} />
                    {
                        player.classId == ClassIndex.Barbarian &&
                        <SpecialButton isActive={index == 11} clickHandler={() => onActive(11)} text={"Zow"} />
                    }
                </Box>
                <Box fill background="dark-1">
                    {index == 1 && <MiscStats player={player} activeBubbles={activeBubbles} />}
                    {index == 2 && <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} player={player}  />}
                    {index == 3 && <EquipmentDisplay player={player} />}
                    {index == 4 && <StatuesDisplay playerStatues={playerStatues} player={player} />}
                    {index == 5 && <AnvilDisplay player={player} activeBubbles={activeBubbles} playerStatues={playerStatues} />}
                    {index == 6 && <CarryCapacityDisplay player={player} />}
                    {index == 7 && <TalentDisplay player={player} />}
                    {index == 8 && <PostOfficeDisplay player={player} extra={poExtra} />}
                    {index == 9 && <InventoryDisplay player={player} />}
                    {index == 10 && <ObolsInfo playerIndex={player.playerID} title={"Obols"} level={player.level} />}
                    {index == 11 && <ZowInfo player={player} />}
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
            vertical: 'small',
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
        `,
        }
    }
}

const CustomTabTitle = ({ player, isActive }: { player: Player, isActive: boolean }) => (
    <Box direction="row" align="center" margin={{ vertical: 'xsmall' }}>
        <Box width={{ max: '20px', min: '20px' }} margin={{ right: 'xsmall' }}>
            <Box className={player.getClassClass()} />
        </Box>
        <Text size="xsmall" color={isActive ? 'brand' : 'accent-2'}>
            {player.playerName ? player.playerName : `Character ${player.playerID}`}
        </Text>
    </Box>
);

function Players() {
    const [playerData, setPlayerData] = useState<Player[]>();
    const [index, setIndex] = useState<number>(0);
    const [activePlayer, setActivePlayer] = useState<string>('');
    const size = useContext(ResponsiveContext);
    const appContext = useContext(AppContext);

    const onActive = (nextIndex: number) => setIndex(nextIndex);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setPlayerData(theData.get("players"));
            if (playerData && playerData.length > 0 && activePlayer === '') {
                const firstPlayer = playerData[0];
                setActivePlayer(firstPlayer.playerID.toString() ?? '');
            }
        }
    }, [appContext, activePlayer, playerData]);
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
                    <Tabs activeIndex={index} onActive={onActive} >
                        {
                            playerData?.map((player, playerIndex) => {
                                return (
                                    <Tab key={`player_${player.playerID}`} title={<CustomTabTitle isActive={index == playerIndex} player={player} />}>
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