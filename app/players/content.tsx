"use client"

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
    ResponsiveContext,
    Meter
} from 'grommet'
import { useState, useContext, useMemo } from 'react';

import { Activity, Player, SkillData } from '../../data/domain/player';
import { getClassExperienceMultiplier } from '../../data/domain/player-experience';
import { getMaximumDamage } from '../../data/domain/player-damage';
import type { GoldenFood } from '../../data/domain/golden-food';
import { SkillsIndex } from "../../data/domain/SkillsIndex";
import { ClassIndex } from '../../data/domain/talents';
import { Capacity, playerInventoryBagMapping } from '../../data/domain/capacity';
import { Alchemy, Bubble } from "../../data/domain/world-2/alchemy/alchemy";
import { Shrine } from '../../data/domain/world-3/construction/shrines';
import { PlayerStatues } from '../../data/domain/world-1/statues';

import { commaNotation, getCoinsArray, nFormatter, notateNumber } from '../../data/utility';
import CoinsDisplay from '../../components/coinsDisplay';
import ShadowBox from '../../components/base/ShadowBox';
import LeftNavButton from '../../components/base/LeftNavButton';
import { customTabsTheme, CustomTabTitle } from '../../components/base/CustomTabs';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import { Alert } from 'grommet-icons';
import { Item, ItemStat, Food, DropSource } from '../../data/domain/items';
import { Storage } from '../../data/domain/storage';
import { Prayer } from '../../data/domain/world-3/prayers';
import { TimeDown, TimeUp } from '../../components/base/TimeDisplay';
import { Worship } from '../../data/domain/world-3/worship';
import ObolsInfo from '../../components/account/task-board/obolsInfo';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { Skilling } from '../../data/domain/skilling';
import { MapInfo } from '../../data/domain/maps';
import { EnemyInfo } from '../../data/domain/enemies';
import Stat from '../../components/base/Stat';
import IconImage from '../../components/base/IconImage';
import { SourcesModel } from '../../data/domain/model/sourcesModel';
import { Chip } from '../../data/domain/world-4/lab';
import { AnvilWrapper } from '../../data/domain/world-1/anvil';
import { Alerts, CardSetAlert } from '../../data/domain/alerts';
import { POExtra } from '../../data/domain/world-2/postoffice';
import TalentDisplay from '../../components/players/TalentDisplay';

import { useShallow } from 'zustand/react/shallow'
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';

function ItemSourcesDisplay({ sources, dropInfo }: { sources: SourcesModel, dropInfo: DropSource[] }) {

    const possibleSources = useMemo(() => {
        if (!sources) {
            return []
        }


        const fromSources = sources.sources ? sources.sources.map(x => x.txtName) : [];
        const fromRecipe = sources.recipeFrom ? sources.recipeFrom.map(x => x.txtName) : [];
        const fromQuests = sources.questAss ? sources.questAss.map(x => x.txtName) : [];
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
    const size = useContext(ResponsiveContext)
    const ccdMax = useMemo(() => {
        return props.player.talents.find(talent => talent.skillIndex == 41)?.getBonus() ?? 0
    }, [props])

    return (
        <Box pad={{ left: "large", top: "medium" }} gap="medium">
            <Text size='medium'>Skills</Text>
            <Grid
                columns={['minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)']}
                gap={{ column: 'small', row: 'medium' }}
                areas={[
                    ['mining', 'fishing', 'trapping', 'cooking'],
                    ['smithing', 'alchemy', 'construction', 'breeding'],
                    ['chopping', 'catching', 'worship', 'intellect'],
                    ['sailing', 'farming', 'spelunking', '.'],
                    ['divinity', 'sneaking', 'research', '.'],
                    ['gaming', 'summoning', '.', '.'],
                ]}
            >
                {
                    Array.from(props.skillsMap).map(([skillIndex, skill]) => {
                        const skillRank = props.skillsRank.get(skillIndex);
                        return (
                            <Box key={`skill_${skillIndex}`} gridArea={SkillsIndex[skillIndex].toLowerCase()} style={{ minWidth: 0 }}>
                                <Box direction="row" align="center" gap="small" border={{ color: 'grey-1' }} pad="small" fill="horizontal" style={{ minWidth: 0 }}>
                                    <IconImage data={Skilling.getSkillImageData(skillIndex)} scale={size == "small" ? 0.5 : 0.75} style={{ flexShrink: 0 }} />
                                    <Box gap="small" style={{ flex: '1 1 0', minWidth: 0 }}>
                                        <Text size="small">{SkillsIndex[skillIndex]}</Text>
                                        <Box direction="row" gap="small" wrap>
                                            <Text size="small">{skill.level}</Text>
                                            {skillRank != undefined && size != "small" && <Text size="xsmall">(Ranked {nth(skillRank + 1)})</Text>}
                                        </Box>
                                        <Meter
                                            size="full"
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
                                        <Box direction="row" justify="between" gap="small" wrap>
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
                [ClassIndex.Maestro, ClassIndex.Voidwalker].includes(props.player.classId) &&
                <Box gap="small">
                    <Text>Current crystal countdown reductions: (max is {nFormatter(ccdMax, "Smaller")}%)</Text>
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
                                            <Box key={`ccd_${SkillsIndex[skillIndex].toLowerCase() ?? 'Unknown'}`} direction="row" gap="medium" margin={{ right: 'small', bottom: 'small' }}>
                                                <Box direction="row" align="center" gap="small">
                                                    <IconImage data={Skilling.getSkillImageData(skillIndex)} scale={0.75} />
                                                    <Box gap="small">
                                                        <Box direction="row" gap="small">
                                                            <Text color={ccdMax == crystalReduction ? 'green' : ''} size="small">{nFormatter(crystalReduction, "Smaller")}%</Text>
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
                    <Text size="xsmall">* Green color means the reduction is maxed.</Text>
                </Box>
            }
        </Box>
    );
}

function MiscStats({ player, activeBubbles }: { player: Player, activeBubbles: Bubble[] }) {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.data.getLastUpdated(true) as Date | undefined, realLastUpdated: state.lastUpdated })
    ));
    const size = useContext(ResponsiveContext)

    const alerts = theData.get("alerts") as Alerts;
    const worship = theData.get("worship") as Worship;
    const playerCoins = useMemo(() => getCoinsArray(player.money), [player]);
    const activeShrines = useMemo(() => {
        const shrines = theData.get("shrines") as Shrine[];
        if (shrines) {
            return shrines.filter((shrine) => shrine.isShrineActive(player.currentMapId) && shrine.level > 0);
        }
        return [];
    }, [theData, player]);

    const cardSetAlert = useMemo(() => {
        return alerts.getPlayerAlertsOfType(player.playerID, "CardSet").pop() as CardSetAlert;
    }, [alerts, player]);

    const activePrayers = useMemo(() => {
        const prayers = theData.get("prayers") as Prayer[];
        if (prayers) {
            return player.activePrayers.map((prayerIndex) => prayers[prayerIndex]);
        }
        return [];
    }, [theData, player]);

    const passivePrayers = player.activePrayers.length === 0
        ? (theData.get("prayers") as Prayer[])
            .map(prayer => ({ prayer, bonus: prayer.getBonusForPlayer(player) }))
            // Vacuous Tissue only affects Dungeons, which are outside this summary.
            .filter(({ prayer, bonus }) => bonus !== 0 && prayer.index !== 14)
        : [];

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


    const secondsSinceUpdate = useMemo(() => {
        if (lastUpdated) {
            return (new Date().getTime() - lastUpdated.getTime()) / 1000;
        }
        return 0;
    }, [theData, lastUpdated]);

    return (
        <Box pad="medium">
            <Text size='medium'>Random Stats</Text>
            <Grid columns={size == "small" ? '100%' : ['50%', '50%']} fill>
                <Box pad="medium" gap="small">
                    <Box direction="row" align="center" gap="small">
                        <Box title={player.class}>
                            <IconImage data={player.getClassImageData()} />
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
                    <ComponentAndLabel
                        label="Activity"
                        component={
                            <Box direction="row" gap="xsmall" align="center">
                                <IconImage data={Player.getActivityIcon(player.currentMonster?.details?.AFKtype)} scale={0.6} />
                                <Text size="small">{Activity[player.getActivityType()]}</Text>
                                <Text>|</Text>
                                <Text size="small">{player.currentMonster?.details?.Name ?? "Unknown"}</Text>
                            </Box>
                        }
                    />
                    {
                        player.killInfo.has(player.currentMapId) && player.currentMapId < MapInfo.length &&
                        (MapInfo[player.currentMapId].data.portalRequirements ?? []).reduce((sum, req) => sum += req, 0) > 0 &&
                        <Text size="small">
                            Portal Requirement: {nFormatter(player.killInfo.get(player.currentMapId) ?? 0)} / [{MapInfo[player.currentMapId].data.portalRequirements.map(req => nFormatter(req)).join(' | ')}]
                        </Text>
                    }
                    {
                        player.starSigns.filter(sign => sign.aligned == true).map((sign, index) => (
                            <Text key={`sign_${index}`} size="small">Sign {index + 1}: {sign.getText()}</Text>
                        ))
                    }

                    <Box direction="row" gap="xsmall">
                        <Text size="small">Away Since =</Text>
                        {player.afkFor < 100 ? "Active" : <TimeUp addSeconds={player.afkFor + secondsSinceUpdate} />}
                    </Box>
                    <Box role="region" aria-label="Persistent stats" gap="small" margin={{ top: "small" }}>
                        <Text>Persistent stats</Text>
                        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
                            <TextAndLabel label="STR" text={commaNotation(player.stats.strength)} textSize="small" />
                            <TextAndLabel label="AGI" text={commaNotation(player.stats.agility)} textSize="small" />
                            <TextAndLabel label="WIS" text={commaNotation(player.stats.wisdom)} textSize="small" />
                            <TextAndLabel label="LUK" text={commaNotation(player.stats.luck)} textSize="small" />
                            <TextAndLabel label="Defence" text={notateNumber(player.stats.defence)} textSize="small" />
                            <TextAndLabel label="Accuracy" text={notateNumber(player.stats.accuracy)} textSize="small" />
                            <TextAndLabel
                                label="Movement speed"
                                text={`${commaNotation(player.stats.movementSpeed * 100)}%`}
                                textSize="small"
                            />
                            <TextAndLabel label="Weapon power" text={notateNumber(player.stats.weaponPower)} textSize="small" />
                            <TextAndLabel
                                label="Drop rate"
                                text={`${notateNumber(player.stats.dropRateMultiplier, "MultiplierInfo").replace("#", "")}x`}
                                textSize="small"
                            />
                            <TextAndLabel
                                label="Class EXP"
                                text={`${notateNumber(getClassExperienceMultiplier(theData, player), "MultiplierInfo").replace("#", "")}x`}
                                textSize="small"
                            />
                            <TextAndLabel label="Maximum damage" text={notateNumber(getMaximumDamage(theData, player))} textSize="small" />
                        </Grid>
                    </Box>
                    <Stat stat={player.crystalChance} />
                    <Stat stat={player.doubleClaimChance} />
                    <Stat stat={player.monsterCash} />
                    <Stat stat={player.buildSpeed} />
                    {playerWorshipInfo.maxCharge > 0 &&
                        <Box>
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
                        </Box>
                    }
                    <Box direction="row" gap="small">
                        <Text size="small">Money =</Text>
                        <CoinsDisplay coinMap={playerCoins} maxCoins={3} />
                    </Box>
                    <Box>
                        <Text>Active Bubbles:</Text>
                        <Box direction="row" gap="small">
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
                                                <IconImage data={bubble.getImageData()} scale={0.7} />
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
                            player.cardInfo ? player.cardInfo.equippedCards.filter(card => card.id != "Empty").map((card, index) => {
                                return (
                                    <Box key={index}>
                                        <Stack key={index}>
                                            <Box>
                                                <IconImage data={card.getImageData()} />
                                            </Box>
                                            <TipDisplay
                                                heading={`${card.displayName}`}
                                                body={card.getBonusText()}
                                                size={size}
                                                direction={TipDirection.Down}
                                            >
                                                <Box>
                                                    <IconImage data={card.getBorderImageData()} />
                                                </Box>
                                            </TipDisplay>
                                        </Stack>

                                    </Box>
                                )
                            }) : <Text>No cards equipped</Text>
                        }
                    </Grid>
                    <Box direction="row" gap="small" align="center">
                        {
                            cardSetAlert &&
                            <TipDisplay
                                heading={cardSetAlert.title}
                                body={<Text>{cardSetAlert.text}</Text>}
                            >
                                <Alert size="medium" color='accent-1' />
                            </TipDisplay>
                        }
                        <TextAndLabel
                            label="Card set"
                            text={player.cardInfo?.getCardSetText() ?? ""}
                        />
                    </Box>
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
                                            <IconImage data={buff.getImageData()} scale={0.8} />
                                        </TipDisplay>
                                    </Box>
                                )
                                )}
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
                                                    heading={`${prayer.data.name} (${prayer.level})`}
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
                                                        <IconImage data={prayer.getImageData()} />
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
                        passivePrayers.length > 0 &&
                        <Box role="region" aria-label="Passive Prayers" gap="small">
                            <Text>Passive Prayers</Text>
                            <Text size="xsmall" color="accent-2">
                                Unlocked Prayer bonuses apply without curses when no Prayers are equipped. Dungeon bonuses are excluded.
                            </Text>
                            {passivePrayers.map(({ prayer, bonus }) => (
                                <Box key={prayer.index} direction="row" gap="small" align="center">
                                    <IconImage data={prayer.getImageData()} scale={0.6} />
                                    <Box gap="xxsmall">
                                        <Text size="xsmall" color="accent-2">{prayer.data.name} (Lv. {prayer.level})</Text>
                                        <Text size="small">{prayer.data.bonus.replace("{", bonus.toString())}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    }
                    {
                        player.labInfo.chips.length > 0 &&
                        <Box gap="small">
                            <Text>Chips:</Text>
                            <Box direction="row" wrap>
                                {
                                    player.labInfo.chips.map((slot, index) => (
                                        <Box key={index} direction="row" gap="small" border={{ color: 'grey-1', side: 'all', size: '2px' }}>
                                            {
                                                slot.chip ?
                                                    <TipDisplay
                                                        heading={slot.chip.data.name}
                                                        body={slot.chip.getBonusText()}
                                                        direction={TipDirection.Down}
                                                        size='small'>
                                                        <IconImage data={(slot.chip as Chip).getImageData()} />
                                                    </TipDisplay>
                                                    :
                                                    <Box width={{ max: '42px', min: '42px' }} height={{ max: '42px', min: '42px' }} align="center">
                                                        {
                                                            (player.skills.get(SkillsIndex.Intellect)?.level ?? 0) < slot.lvlReq && <Text size="xsmall">Lv {slot.lvlReq}</Text>
                                                        }

                                                    </Box>
                                            }
                                        </Box>
                                    ))
                                }
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
                                        return (
                                            <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                                <TipDisplay
                                                    heading={`${shrine.name} (${shrine.level})`}
                                                    body={shrine.getBonusText(player.currentMapId)}
                                                    size={size}
                                                    direction={TipDirection.Down}
                                                >
                                                    <IconImage data={shrine.getImageData()} scale={0.7} />
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

function ItemDisplay({ item, size = "50px", goldFoodMulti }: { item: Item | undefined, size?: string, goldFoodMulti?: number }) {

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
                        <Box width={{ max: size, min: size }} align="center">
                            <IconImage data={item.getImageData()} scale={parseInt(size.replace('px', '')) / 36} />
                        </Box>
                        <Box>
                            <Text>{item.count}</Text>
                        </Box>
                    </Box>
                    : <Box width={{ max: size, min: size }} align="center">
                        <IconImage data={item.getImageData()} scale={parseInt(size.replace('px', '')) / 36} />
                    </Box>
                }
            </Box>
        </TipDisplay>
    )
}


function EquipmentDisplay({ player }: { player: Player }) {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const goldenFood = theData.get("goldenFood") as GoldenFood;
    const goldFoodMulti = goldenFood.getEffectivity(player);


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
        <Box pad="medium" gap="medium">
            <Text size='medium'>Statues</Text>
            <TextAndLabel
                label="Total levels"
                text={(playerStatues ? playerStatues.statues.reduce((sum, statue) => sum += statue.level, 0) : 0).toString()}
            />
            <Box>
                {
                    playerStatues ? playerStatues.statues.map((statue, index) => {
                        return (
                            <Box key={`statue_${index}`} direction="row" gap="medium">
                                <Box title={statue.displayName}>
                                    <IconImage data={statue.getImageData()} scale={0.8} />
                                </Box>
                                <Text alignSelf="center">Level: {statue.level}</Text>
                                <Text alignSelf="center">/</Text>
                                <Text alignSelf="center">{statue.getBonusText(player)}</Text>
                            </Box>
                        )
                    }) : <></>
                }
            </Box>
        </Box>

    )
}

function AnvilDisplay({ player }: { player: Player }) {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const anvils = theData.get("anvil") as AnvilWrapper;
    const storage = theData.get("storage") as Storage;
    const playerAnvil = anvils.playerAnvils[player.playerID];


    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Anvil</Text>
            <Box gap="small" pad="small">
                <Text size="small">Available Points: {playerAnvil.availablePoints}</Text>
                <Text size="small">Points from coins: {playerAnvil.pointsFromCoins}/600</Text>
                {playerAnvil.pointsFromCoins < 600 &&
                    <Box>
                        <ComponentAndLabel
                            label={"Next Point Cost"}
                            component={<CoinsDisplay coinMap={getCoinsArray(playerAnvil.getCoinCost())} />}
                        />
                        <ComponentAndLabel
                            label={"Cost to max"}
                            component={<CoinsDisplay coinMap={getCoinsArray(playerAnvil.getCoinCostToMax())} />}
                        />
                    </Box>
                }
                <Text size="small">Points from mats: {playerAnvil.pointsFromMats}/700</Text>
                {playerAnvil.pointsFromMats < 700 &&
                    <ComponentAndLabel
                        label="Next Material Point Cost"
                        component={
                            <Box direction="row" align="center">
                                <IconImage data={{
                                    location: playerAnvil.getMonsterMat(),
                                    height: 36,
                                    width: 36
                                }} scale={0.8} />
                                <Text color={storage.amountInStorage(playerAnvil.getMonsterMat()) > playerAnvil.getMonsterMatCost() ? 'green-1' : 'white'}>{`${nFormatter(storage.amountInStorage(playerAnvil.getMonsterMat()))}/${nFormatter(playerAnvil.getMonsterMatCost())}`}</Text>
                            </Box>
                        }
                    />
                }
                <Box direction="row">
                    <Box margin={{ right: 'small' }} border={{ side: 'right', color: 'grey-1', size: '2px' }}>
                        <TextAndLabel
                            label="XP"
                            text={`${nFormatter(playerAnvil.anvilXP, "Big")}% (${playerAnvil.xpPoints})`}
                            margin={{ right: 'small' }}
                        />
                    </Box>
                    <Box margin={{ right: 'small' }} border={{ side: 'right', color: 'grey-1', size: '2px' }}>
                        <TextAndLabel
                            label="Speed"
                            text={`${nFormatter(playerAnvil.anvilSpeed)} (${playerAnvil.speedPoints})`}
                            margin={{ right: 'small' }}
                        />
                    </Box>
                    <TextAndLabel
                        label="Capacity"
                        text={`${playerAnvil.productCapacity} (${playerAnvil.capPoints})`}
                        margin={{ right: 'small' }}
                    />
                </Box>
                {playerAnvil.currentlySelect.indexOf(-1) > -1 && <Text>UNUSED PRODUCTION</Text>}
            </Box>
            <Box gap="small">
                {
                    playerAnvil.production.filter((x) => x.displayName != "Filler" && (x?.hammers ?? 0) > 0).map((anvilItem, index) => {
                        return (
                            <Box key={`player_${player.playerID}_anvil_${index}`} direction="column" align="center">
                                <IconImage data={{ height: 36, location: `${anvilItem.data.item}`, width: 36 }} scale={1.2} />
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
                                                    value: anvilItem.futureProduction,
                                                    label: 'current',
                                                    color: 'brand'
                                                }
                                            ]}
                                            max={playerAnvil.productCapacity} />
                                        <Box align="center" pad="xxsmall">
                                            <Text size="small">{anvilItem.futureProduction.toString()} ({(anvilItem.percentOfCap)}%)</Text>
                                        </Box>
                                    </Stack>
                                    <Text>Cap: {playerAnvil.productCapacity}</Text>
                                </Box>
                                <Box direction="row" gap="xsmall">
                                    <Text size="small">Time till cap =</Text>
                                    <TimeDown addSeconds={anvilItem.timeTillCap} />
                                </Box>
                                <Text size="small">Production Per Hour (per hammer) = {Math.round(playerAnvil.anvilSpeed / anvilItem.data.time)} </Text>
                                <Text size="small">Total Produced of this item = {nFormatter(Math.round(anvilItem.totalProduced))}</Text>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

function CarryCapacityDisplay({ player }: { player: Player }) {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const size = useContext(ResponsiveContext);

    const playerCapacity = useMemo(() => {
        const capacity = theData.get("capacity") as Capacity;
        return capacity.players[player.playerID];
    }, [theData, player])

    return (
        <Box pad="medium" gap="small">
            <Text size='medium'>Carry Capacity</Text>
            <Grid columns={size == "small" ? "1" : "1/2"}>
                {
                    playerCapacity.bags.map((bag, index) => (
                        <Box direction="row" key={index} gap="medium" pad="small" align="center" justify="between" width={{ max: '300px' }}>
                            <IconImage data={bag.getImageData()} scale={1.3} />
                            <TextAndLabel label="Per Slot" text={Intl.NumberFormat().format(bag.maxCarry)} />
                            <TextAndLabel label="Full Inventory" text={nFormatter(bag.maxCarry * playerCapacity.totalInventorySlots)} />
                        </Box>
                    ))
                }
            </Grid>
        </Box >
    )
}


function PostOfficeDisplay({ player, extra }: { player: Player, extra: POExtra }) {
    const size = useContext(ResponsiveContext);

    const unSpentPoints = useMemo(() => {
        const totalSpent = player.postOffice.reduce((sum, box) => sum += box.level, 0);
        return extra.misc + extra.streak + extra.complete - totalSpent;
    }, [player, extra]);

    const costToMax = useMemo(() => {
        return player.postOffice.filter(box => box.name != "Myriad Crate").reduce((sum, box) => sum += Math.round(box.maxLevel) - box.level, 0);
    }, [player, extra]);

    return (
        <Box pad="medium" gap="small" fill>
            <Text size='medium'>Post Office</Text>
            <Box direction="row" gap="medium">
                <TextAndLabel
                    label="Unspent"
                    text={unSpentPoints.toString()}
                />
                <TextAndLabel
                    label="Cost to max all"
                    tooltip={
                        <Text>This is ignoring the Myriad Crate, so to max all add another 100,000.</Text>
                    }
                    text={costToMax.toString()}
                />
            </Box>
            <Grid columns={{ count: size == "small" ? 2 : 4, size: "auto" }} gap="xsmall">
                {
                    player.postOffice.map((box) => {
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
                                                            <Text>{box.level < Math.round(box.maxLevel) && `(Max value is ${bonus.getBonus(Math.round(box.maxLevel), bIndex, true)} at ${Math.round(box.maxLevel)} boxes)`}</Text>
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
                                        <IconImage data={box.getImageData()} scale={0.7} />
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
    const size = useContext(ResponsiveContext);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const allItems = theData.get("itemsData") as Item[];

    const storage = theData.get("storage") as Storage;
    const playerInventory = storage?.playerStorage[player.playerID] ?? [];

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
                                            <Box style={{ opacity: opacity }}>
                                                <IconImage data={bagItem.getImageData()} />
                                            </Box>
                                            :
                                            <TipDisplay
                                                heading={`${bagItem.displayName} (${bagItem.type})`}
                                                body={<ItemSourcesDisplay sources={bagItem.sources} dropInfo={bagItem.dropInfo} />}
                                                size={"large"}
                                                direction={TipDirection.Down}
                                                maxWidth="large"
                                            >
                                                <Box style={{ opacity: opacity }}>
                                                    <IconImage data={bagItem.getImageData()} />
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
        if (["TutorialA", "TutorialB", "TutorialC", "TutorialD", "JungleX", "MininggF", "How Did u get here", "Miningg1", "Miningg2", "Outer World Town",
            "Spike Surprise", "YumYum Grotto", "Salty Shores", "Faraway Piers", "Filler", "Deepwater Docks", "Bandit Bob's Hideout", "Frostbite Towndra",
            "Tunnels Entrance", "Trappers Folley", "Freefall Caverns", "The Ol' Straightaway", "Slip Slidy Ledges", "Echoing Egress",
            "Blunder Hills", "JungleZ", "PlayerSelect", "Efaunt's Tomb", "Gravel Tomb", "Heaty Hole", "End Of The Road", "Z", "Eycicles's Nest", "Enclave a la Troll",
            "Magma Rivertown", "YumYum Islands", "Chizoar's Cavern", "Tunnel Closed", "KattleKruk's Volcano",
            // world 6
            "Motherlode Pit", "Pet Park", "Spirit Village", "Emperor's Castle",
            // minigame Howl and Poppy
            "Grand Owl Perch", "The Oasis"
        ].includes(area)) {
            return true;
        }
        return false;
    }

    const zowCount = Array.from(player.killInfo.entries()).filter(([_, count]) => count >= 100000).length;
    const toZow = Array.from(player.killInfo.entries()).map(([mapId, count]) => {
        const mapData = MapInfo[mapId];
        if (mapData && (mapData.data.enemy === undefined || count >= 100000 || ignoreArea(mapData.data.map.name) || mapData.data.enemy == "Nothing" || mapData.data.map.name == "Z")) {
            return null;
        }
        return [mapId, count]
    });

    const chowCount = Array.from(player.killInfo.entries()).filter(([_, count]) => count >= 1000000).length;
    const toChow = Array.from(player.killInfo.entries()).map(([mapId, count]) => {
        const mapData = MapInfo[mapId];
        if (mapData.data.enemy === undefined || count >= 1000000 || ignoreArea(mapData.data.map.name) || mapData.data.map.name == "Z") {
            return null;
        }
        return [mapId, count]
    });

    const superchowCount = Array.from(player.killInfo.entries()).filter(([_, count]) => count >= 100000000).length;
    const toSuperChow = Array.from(player.killInfo.entries()).map(([mapId, count]) => {
        const mapData = MapInfo[mapId];
        if (mapData.data.enemy === undefined || count >= 100000000 || ignoreArea(mapData.data.map.name) || mapData.data.map.name == "Z") {
            return null;
        }
        return [mapId, count]
    });

    const wowCount = Array.from(player.killInfo.entries()).filter(([_, count]) => count >= 1000000000).length;
    const toWow = Array.from(player.killInfo.entries()).map(([mapId, count]) => {
        const mapData = MapInfo[mapId];
        if (mapData.data.enemy === undefined || count >= 1000000000 || ignoreArea(mapData.data.map.name) || mapData.data.enemy == "Nothing" || mapData.data.map.name == "Z") {
            return null;
        }
        return [mapId, count]
    });

    return (
        <Box pad="medium" fill>
            <Heading level="4">Kills Summary</Heading>
            <Box>
                <Text size='small'>Current zow count: {zowCount}</Text>
                <Text size='small'>Current chow count: {chowCount}</Text>
                <Text size='small'>Current superchow count: {superchowCount}</Text>
                <Text size='small'>Current wow count: {wowCount}</Text>
            </Box>

            <Heading level="4">Zows Remaining (Needs 100k)</Heading>
            <Box direction="row" wrap>
                {
                    toZow.map((data, index) => {
                        if (data) {
                            const mapData = MapInfo[data[0]];
                            const enemyData = EnemyInfo.find(enemy => enemy.id == mapData.data.enemy);
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center" pad="small">
                                    {enemyData &&
                                        <Box title={mapData.data.map.name}>
                                            <IconImage data={enemyData.getImageData()} />
                                        </Box>
                                    }
                                    <Text>{nFormatter(data[1])}</Text>
                                </Box>
                            )
                        }
                    })
                }
            </Box>

            <Heading level="4">Chows Remaining (Needs 1m)</Heading>
            <Box direction="row" wrap>
                {
                    toChow.map((data, index) => {
                        if (data) {
                            const mapData = MapInfo[data[0]];
                            const enemyData = EnemyInfo.find(enemy => enemy.id == mapData.data.enemy);
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center" pad="small">
                                    {enemyData &&
                                        <Box title={mapData.data.map.name}>
                                            <IconImage data={enemyData.getImageData()} />
                                        </Box>
                                    }
                                    <Text>{nFormatter(data[1])}</Text>
                                </Box>
                            )
                        }
                    })
                }
            </Box>

            <Heading level="4">Super Chows Remaining (Needs 100m)</Heading>
            <Box direction="row" wrap>
                {
                    toSuperChow.map((data, index) => {
                        if (data) {
                            const mapData = MapInfo[data[0]];
                            const enemyData = EnemyInfo.find(enemy => enemy.id == mapData.data.enemy);
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center" pad="small">
                                    {enemyData &&
                                        <Box title={mapData.data.map.name}>
                                            <IconImage data={enemyData.getImageData()} />
                                        </Box>
                                    }
                                    <Text>{nFormatter(data[1])}</Text>
                                </Box>
                            )
                        }
                    })
                }
            </Box>

            <Heading level="4">Wows Remaining (Needs 1b)</Heading>
            <Box direction="row" wrap>
                {
                    toWow.map((data, index) => {
                        if (data) {
                            const mapData = MapInfo[data[0]];
                            const enemyData = EnemyInfo.find(enemy => enemy.id == mapData.data.enemy);
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center" pad="small">
                                    {enemyData &&
                                        <Box title={mapData.data.map.name}>
                                            <IconImage data={enemyData.getImageData()} />
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

function PlayerTab({ player }: PlayerTabProps) {
    const [index, setIndex] = useState<number>(1);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const poExtra = theData.get("POExtra");
    const onActive = (nextIndex: number) => setIndex(nextIndex);

    const statues = theData.get("statues");
    const playerStatues = statues ? statues[player.playerID] : undefined;
    const activeBubbles = player.activeBubbles;

    // Reset tab index if switching to a non-barbarian player while on the zow tab.
    if (player.getSubClass() != ClassIndex.Barbarian && index == 11) {
        setIndex(1);
    }

    return (
        <ShadowBox flex={false}>
            <Grid rows="1" columns={['25%', '75%']}>
                <Box pad="medium" height="100%" >
                    <LeftNavButton isActive={index == 1} clickHandler={() => onActive(1)} text={"Random Stats"} />
                    <LeftNavButton isActive={index == 2} clickHandler={() => onActive(2)} text={"Skills"} />
                    <LeftNavButton isActive={index == 3} clickHandler={() => onActive(3)} text={"Equipment"} />
                    <LeftNavButton isActive={index == 4} clickHandler={() => onActive(4)} text={"Statues"} />
                    <LeftNavButton isActive={index == 5} clickHandler={() => onActive(5)} text={"Anvil"} />
                    <LeftNavButton isActive={index == 6} clickHandler={() => onActive(6)} text={"Carry Capacity"} />
                    <LeftNavButton isActive={index == 7} clickHandler={() => onActive(7)} text={"Talents"} />
                    <LeftNavButton isActive={index == 8} clickHandler={() => onActive(8)} text={"Post Office"} />
                    <LeftNavButton isActive={index == 9} clickHandler={() => onActive(9)} text={"Inventory"} />
                    <LeftNavButton isActive={index == 10} clickHandler={() => onActive(10)} text={"Obols"} />
                    {
                        (player.getSubClass() == ClassIndex.Barbarian) &&
                        <LeftNavButton isActive={index == 11} clickHandler={() => onActive(11)} text={"Zow/Chow/Wow"} />
                    }
                </Box>
                <Box fill background="dark-1">
                    {index == 1 && <MiscStats player={player} activeBubbles={activeBubbles} />}
                    {index == 2 && <ShowSkills skillsMap={player.skills} skillsRank={player.skillsRank} player={player} />}
                    {index == 3 && <EquipmentDisplay player={player} />}
                    {index == 4 && <StatuesDisplay playerStatues={playerStatues} player={player} />}
                    {index == 5 && <AnvilDisplay player={player} />}
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

function Players() {
    const [index, setIndex] = useState<number>(0);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const playerData = theData.get("players") as Player[];

    const onActive = (nextIndex: number) => setIndex(nextIndex);


    if (!playerData || playerData.length == 0) {
        return <Box>Nothing to see here.</Box>
    }
    return (
        <Box>
            <ThemeContext.Extend value={customTabsTheme}>
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
            </ThemeContext.Extend>
        </Box>
    )
}

export default Players;
