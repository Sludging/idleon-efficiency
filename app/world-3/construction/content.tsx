"use client"

import {
    Box,
    Heading,
    Text,
    Grid,
    ResponsiveContext,
    CheckBox,
    Meter,
    Table,
    TableHeader,
    TableRow,
    TableCell,
    TableBody
} from 'grommet'
import React, { useEffect, useContext, useState, useMemo } from 'react';

import ShadowBox from '../../../components/base/ShadowBox';
import TabButton from '../../../components/base/TabButton';
import { Refinery } from '../../../data/domain/refinery';
import { Item } from '../../../data/domain/items';
import { Storage } from '../../../data/domain/storage';
import { lavaLog, nFormatter, range, toTime } from '../../../data/utility';
import { StaticTime, TimeDisplaySize, TimeDown } from '../../../components/base/TimeDisplay';
import { Printer, Sample } from '../../../data/domain/printer';
import { Player } from '../../../data/domain/player';
import { CircleInformation, Star, StatusWarning } from 'grommet-icons';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import { Deathnote } from '../../../data/domain/deathnote';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { ClassIndex, Talent } from '../../../data/domain/talents';
import { TaskBoard } from '../../../data/domain/tasks';
import { Shrine } from '../../../data/domain/shrines';
import { MapInfo } from '../../../data/domain/maps';
import IconImage from '../../../components/base/IconImage';
import { BuildingsDisplay } from '../../../components/world-3/construction/buildings';
import { SaltLickDisplay } from '../../../components/world-3/construction/saltLick';
import { ArtifactStatus } from '../../../data/domain/sailing/artifacts';
import { AtomColliderDisplay } from '../../../components/world-3/construction/atomCollider';
import { Sailing } from '../../../data/domain/sailing';
import { useShallow } from 'zustand/react/shallow';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

function RefineryDisplay() {
    const [squirePowha, setSquirePowha] = useState<boolean>(false);

    const size = useContext(ResponsiveContext);

    const { theData, lastUpdated } = useAppDataStore(
        useShallow((state) => (
            { theData: state.data.getData(), lastUpdated: state.data.getLastUpdated(true) as Date, realLastUpdate: state.lastUpdated }
        )));
    const refineryData = theData.get("refinery") as Refinery;
    const itemData = theData.get("itemsData") as Item[];
    const storage = theData.get("storage") as Storage;
    const playerData = theData.get("players") as Player[];
    const taskboardData = theData.get("taskboard") as TaskBoard;
    const printer = theData.get("printer") as Printer;

    const squireInfo = useMemo(() => {
        const squires = playerData.filter(player => (player.classId == ClassIndex.Squire || player.classId == ClassIndex.Divine_Knight));
        return squires;
    }, [playerData])

    const saltsUnlocked = useMemo(() => {
        return Object.entries(refineryData.salts).some(([_, info]) => info.rank > 0);
    }, [refineryData]);

    const squireTimeSave = useMemo(() => {
        const theSlowRockMethod = () => {
            const toReturn: number[] = [];
            Object.entries(refineryData.salts).forEach(([salt, info], index) => {
                const currentCooldowns: [Player, number][] = [];
                squireInfo && squireInfo.forEach(squire => {
                    currentCooldowns.push([squire, squire.getCurrentCooldown(130)]);
                });
                let totalWait = 0;
                const refineryCycle = Math.floor(index / 3) == 0 ? refineryData.cycleInfo["Combustion"] : refineryData.cycleInfo["Synthesis"];
                let timeToNextRank = info.getTimeToNextRank(refineryCycle.cycleTime);
                while (timeToNextRank > 0) {
                    const nextCDTime = Math.min(...currentCooldowns.map(cooldowns => cooldowns[1]));
                    if (timeToNextRank > nextCDTime) {
                        totalWait += nextCDTime;
                        timeToNextRank -= nextCDTime;
                        currentCooldowns.forEach(([squire, _], squireIndex, originalArray) => {
                            originalArray[squireIndex][1] -= nextCDTime; // adjust the actual array data
                            if (originalArray[squireIndex][1] == 0) {
                                const manaBox = squire.postOffice.find(box => box.name == "Magician Starterpack");
                                const cdReduction = manaBox?.bonuses[2].getBonus(manaBox.level, 2) ?? 0;
                                originalArray[squireIndex][1] = Math.floor((1 - cdReduction / 100) * 72000);
                                const timePerSquireSkilluse = (squire.talents.find(talent => talent.skillIndex == 130)?.getBonus(false, false, true) ?? 0) * refineryCycle.cycleTime
                                timeToNextRank -= timePerSquireSkilluse;
                                if (timeToNextRank < 0) {
                                    timeToNextRank = 0;
                                }
                            }
                        })
                    }
                    else {
                        totalWait += timeToNextRank
                        timeToNextRank = 0;
                    }
                }
                toReturn.push(totalWait);
            })
            return toReturn;
        }
        if (squirePowha) {
            return theSlowRockMethod();
        }


        return [];

    }, [squireInfo, refineryData, squirePowha])

    const saltMeritLevel = useMemo(() => {
        const saltMerit = taskboardData?.merits.find(merit => merit.descLine1 == "Refinery Salt Costs don't scale beyond");
        return (saltMerit?.level ?? 0) + 1;

    }, [taskboardData]);

    return (
        <Box gap="medium">
            <Box direction="row" wrap justify="center">
                {
                    Object.entries(refineryData.cycleInfo).map(([_, cycleInfo], index) => {
                        return (
                            <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" key={index} gap="xsmall" pad="medium" align="center">
                                <TextAndLabel center textSize='xsmall' labelSize='medium' text='Next cycle in' label={cycleInfo.name} />
                                <Box>
                                    {saltsUnlocked ?
                                        <TimeDown addSeconds={cycleInfo.cycleTime - cycleInfo.timePast} resetToSeconds={cycleInfo.cycleTime} /> :
                                        <StaticTime fromSeconds={cycleInfo.cycleTime - cycleInfo.timePast} />
                                    }
                                </Box>
                                <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                                <Text color="accent-3" size="12px">Max cycle is: {toTime(cycleInfo.cycleTime)}</Text>
                            </ShadowBox>
                        )
                    })
                }
                {squireInfo && squireInfo.map((squire, index) => {
                    const [refineryTalent, cooldown] = [...squire.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 130)?.pop() as [Talent, number];
                    const realCD = cooldown - squire.afkFor;
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={squire.getClassImageData()} scale={0.8} />
                                    <Text>{squire.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Box style={{ opacity: realCD <= 0 ? 1 : 0.5 }}>
                                        <IconImage data={refineryTalent.getImageData()} scale={0.8} />
                                    </Box>
                                    {realCD > 0 && <TimeDown size={TimeDisplaySize.Small} addSeconds={realCD} resetToSeconds={72000} />}
                                    {realCD <= 0 && <Text>Skill is ready!</Text>}
                                </Box>
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
            <CheckBox
                checked={squirePowha}
                label={<Box direction="row" align="center">
                    <Text margin={{ right: 'xsmall' }} size="small">Squire Power</Text>
                    <TipDisplay
                        body={<Box gap="xsmall">
                            <Text>This will make the following assumptions and calculate their impact on the time to rank-up:</Text>
                            <Text>* Assume perfect use of squire skill on CD.</Text>
                            <Text>* This is assuming the highest possible level for the squire skill based on your max talent level.</Text>
                        </Box>}
                        size="small"
                        heading='Squire Power!'
                        maxWidth='medium'
                        direction={TipDirection.Down}
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>}
                onChange={(event) => setSquirePowha(event.target.checked)}
            />
            <Text>This is WIP - fuel times don&apos;t account for printer or auto refine salt generation.</Text>
            {
                Object.entries(refineryData.salts).map(([salt, info], index) => {
                    const saltItem = itemData.find((item) => item.internalName == salt);
                    const costItems = info.baseCost.map((cost) => cost.item);
                    const storageItems = itemData.filter((item) => costItems.includes(item.internalName)) ?? [];
                    storageItems.forEach((storageItem) => {
                        const inSaltStorage = refineryData.storage.find((saltStorageItem) => saltStorageItem.name == storageItem.internalName);
                        const inChestStorage = storage?.chest.find((item) => item.internalName == storageItem.internalName)
                        storageItem.count = (inSaltStorage?.quantity ?? 0) + (inChestStorage?.count ?? 0);
                    });
                    const refineryCycle = Math.floor(index / 3) == 0 ? refineryData.cycleInfo["Combustion"] : refineryData.cycleInfo["Synthesis"];
                    const secondsSinceUpdate = (new Date().getTime() - (lastUpdated?.getTime() ?? 0)) / 1000;
                    const fuelTime = Math.max(0, info.getFuelTime(storageItems, [], index <= saltMeritLevel) * refineryCycle.cycleTime - secondsSinceUpdate);
                    const timeToNextRank = info.getTimeToNextRank(refineryCycle.cycleTime) - secondsSinceUpdate;

                    if (saltItem) {
                        return (
                            <ShadowBox key={index} background="dark-1" style={{ opacity: info.rank == 0 ? 0.5 : 1 }}>
                                <Grid columns={size == "small" ? ["50%", "50%"] : ["15%", "20%", "25%", "20%", "20%"]}>
                                    <Box direction="row" gap="medium" align="center" background="dark-2" pad="medium" justify="center" fill>
                                        <Box align="center">
                                            <Box title={saltItem.displayName}>
                                                <IconImage data={saltItem.getImageData()} scale={2} />
                                            </Box>
                                            <Box align="center">
                                                <Text size="large">{info.rank}</Text>
                                                <Text color="accent-2" size="small">Rank</Text>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box pad="medium" align="center">
                                        <Box pad={{ vertical: "medium" }} gap="small" border={{ color: 'grey-1', side: 'right', size: '3px' }} fill>
                                            {
                                                timeToNextRank > 0 ?
                                                    <Box>
                                                        <Text color="accent-2" size="small">Rank up in</Text>
                                                        <Box>
                                                            {fuelTime >= 0 && (info.active ?
                                                                <TimeDown size={size == "medium" ? TimeDisplaySize.Medium : TimeDisplaySize.Large} addSeconds={squirePowha ? squireTimeSave[index] : timeToNextRank} />
                                                                : <StaticTime size={size == "medium" ? TimeDisplaySize.Medium : TimeDisplaySize.Large} fromSeconds={squirePowha ? squireTimeSave[index] : timeToNextRank} color='accent-1' />
                                                            )}
                                                            {!info.active && <Box margin={{ top: 'medium' }}><Text color="accent-1" size="medium">Not active</Text></Box>}
                                                        </Box>
                                                    </Box>
                                                    :
                                                    <Box >
                                                        <Text size="xlarge">Rank up ready</Text>
                                                    </Box>
                                            }
                                        </Box>
                                    </Box>
                                    <Box pad="medium">
                                        <Box gap="small" border={{ color: 'grey-1', side: 'right', size: '3px' }} fill>
                                            <Box>
                                                <Text color="accent-2" size="small">Power</Text>
                                                <Text size="medium">{info.progress} / {info.getCap()}</Text>
                                            </Box>
                                            <Box>
                                                <Text color="accent-2" size="small">Auto Refine at</Text>
                                                <Text size="medium">{info.autoRefine}%</Text>
                                            </Box>
                                            <Box>
                                                <Text color="accent-2" size="small">Fuel</Text>
                                                {fuelTime > 0 && (info.active ?
                                                    <TimeDown color={fuelTime > timeToNextRank ? 'green-1' : 'accent-1'} addSeconds={fuelTime} />
                                                    : <StaticTime color={fuelTime > timeToNextRank ? 'green-1' : 'accent-1'} fromSeconds={fuelTime} />
                                                )}
                                                {fuelTime <= 0 && <Text color="accent-1" size="small">Empty</Text>}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box pad="medium">
                                        <Box wrap align="start" gap="small" border={{ color: 'grey-1', side: 'right', size: '3px' }} fill>
                                            <Text size="small">Cost per hour</Text>
                                            <Box gap="xsmall">
                                                {
                                                    info.baseCost && info.baseCost.map((costData, costIndex) => {
                                                        const costItem = itemData.find((item) => item.internalName == costData.item);
                                                        const itemCost = costData.quantity * info.getCostMulti(costData.item.includes("Refinery"), index <= saltMeritLevel);
                                                        const cyclesPerHour = Math.ceil(3600 / refineryCycle.cycleTime);
                                                        const isSalt = costItem?.internalName.includes("Refinery");
                                                        const currentPrinting = printer?.GetTotalActive(costData.item) ?? 0;
                                                        if (costItem != undefined) {
                                                            return (
                                                                <Box key={costIndex} direction="row" align="center">
                                                                    <Box title={costItem.displayName}>
                                                                        <IconImage data={costItem.getImageData()} scale={0.8} />
                                                                    </Box>
                                                                    {
                                                                        isSalt ?
                                                                            <Box direction="row" gap="xsmall" align="center">
                                                                                <Text size="small">{nFormatter(itemCost * cyclesPerHour, "Smaller")}</Text>
                                                                            </Box>
                                                                            :
                                                                            <TipDisplay
                                                                                heading='Printing'
                                                                                body={`Currently printing ${nFormatter(currentPrinting, "Smaller")}`}
                                                                                direction={TipDirection.Left}
                                                                                size="Small"
                                                                            >
                                                                                <Box direction="row" gap="xsmall" align="center">
                                                                                    <Text color={currentPrinting > itemCost * cyclesPerHour ? 'green-1' : 'red'} size="small">{nFormatter(itemCost * cyclesPerHour, "Smaller")}</Text>
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
                                    <Box pad="medium">
                                        <Box wrap align="start" gap="small">
                                            <Text size="small">Cost to rank up</Text>
                                            <Box gap="xsmall">
                                                {
                                                    info.baseCost && info.baseCost.map((costData, costIndex) => {
                                                        const costItem = itemData?.find((item) => item.internalName == costData.item);
                                                        const itemCost = costData.quantity * info.getCostMulti(costData.item.includes("Refinery"), index <= saltMeritLevel);
                                                        const storageQuantity = storageItems.find(x => x.internalName == costData.item)?.count ?? 0;
                                                        const resourceCostToMax = info.getCyclesTillNextRank() * itemCost;
                                                        if (costItem != undefined) {
                                                            return (
                                                                <Box key={costIndex} direction="row" align="center">
                                                                    <Box title={costItem.displayName}>
                                                                        <IconImage data={costItem.getImageData()} scale={0.8} />
                                                                    </Box>
                                                                    <Box direction="row" gap="xsmall" align="center">
                                                                        <Text color={storageQuantity < resourceCostToMax ? 'accent-1' : ''} size="small">{nFormatter(resourceCostToMax)}</Text>
                                                                        <Text size="small">({nFormatter(storageQuantity)})</Text>
                                                                    </Box>
                                                                </Box>
                                                            )
                                                        }
                                                    })
                                                }
                                            </Box>
                                        </Box>
                                    </Box>
                                </Grid>
                            </ShadowBox>
                        )
                    }
                }
                )
            }
        </Box>
    )
}

function SampleBox({ sample, itemData, printing = false, slotUnlocked = false }: { sample: Sample, itemData: Item[] | undefined, printing: boolean, slotUnlocked?: boolean }) {
    if (sample.item == "Blank") {
        return (
            <Box border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} height={{ min: '82px', max: '82px' }} direction="row" align="center" justify="center">
                <Box align="center" width={{ max: '100px', min: '100px' }} height={{ min: '82px', max: '82px' }} justify='center'>
                    <Text size="xsmall" color="accent-3">{slotUnlocked ? "Empty" : "Locked"}</Text>
                </Box>
            </Box>
        )
    }

    const sampleItem = itemData?.find((item) => item.internalName == sample.item);
    return (
        <Box border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} height={{ min: '82px', max: '82px' }} direction="row" align="center" justify="center">
            <Box pad={{ vertical: 'small' }} align="center">
                <IconImage data={(sampleItem as Item).getImageData()} scale={0.8} />
                {printing && <Text color={sample.inLab == true ? 'blue-3' : ''} size="small">{sample.harriep && <Star size="small" color="gold-1" />} {nFormatter(sample.getSampleQuantity(false))}</Text>}
                {!printing && <Text color={sample.printing > 0 ? 'green-1' : ''} size="small">{nFormatter(sample.getSampleQuantity(true))}</Text>}
            </Box>
            {/* Show warning on the sample if it's printing and outdated. */}
            {sample.printing > 0 && !printing && sample.isOutdatedPrint() &&
                <TipDisplay
                    heading='Active lower than sample'
                    body={<Box><Text>You have a sample of {nFormatter(sample.quantity)} but only printing {nFormatter(sample.printingQuantity)}.</Text><Text>Go update your printing!</Text></Box>}
                    size='large'
                    direction={TipDirection.Down}
                >
                    <StatusWarning size="medium" color="accent-1" />
                </TipDisplay>
            }
        </Box>
    )

}

function PrinterDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const itemData = theData.get("itemsData") as Item[];
    const printerData = theData.get("printer") as Printer;
    const playerData = theData.get("players") as Player[];

    const printerArtifact = useMemo(() => {
        const sailing = theData.get("sailing") as Sailing;
        return sailing.artifacts[4];
    }, [theData])

    const daysSinceLastSample = useMemo(() => {
        if (printerArtifact) {
            const optLacc = theData.get("OptLacc");
            if (!optLacc) {
                return 0;
            }
            return optLacc[125];
        }
        return 0;
    }, [theData, printerArtifact]);

    const artifactBoost = useMemo(() => {
        if (printerArtifact) {
            return daysSinceLastSample * printerArtifact.getBonus();
        }
    }, [printerArtifact, daysSinceLastSample])

    const masteroInfo = useMemo(() => {
        const masteroes = playerData?.filter(player => [ClassIndex.Maestro, ClassIndex.Voidwalker].includes(player.classId));
        return masteroes;
    }, [playerData])

    return (
        <Box gap="medium">
            <Box direction="row" wrap justify="center">
                {masteroInfo && masteroInfo.map((mastero, index) => {
                    const [printerTalent, cooldown] = [...mastero.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 32)?.pop() as [Talent, number];
                    const realCD = cooldown - mastero.afkFor;
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={mastero.getClassImageData()} scale={0.8} />
                                    <Text>{mastero.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Box style={{ opacity: realCD <= 0 ? 1 : 0.5 }}>
                                        <IconImage data={printerTalent.getImageData()} scale={0.8} />
                                    </Box>
                                    {realCD > 0 && <TimeDown size={TimeDisplaySize.Small} addSeconds={realCD} resetToSeconds={82000} />}
                                    {realCD <= 0 && <Text>Skill is ready!</Text>}
                                </Box>
                            </Box>
                        </ShadowBox>
                    )
                })
                }
                {playerData && printerData.bestDivineKnightPlayerId != -1 &&
                    <ShadowBox key={"best_dk"} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                        <Box gap="small">
                            <Box direction="row" gap="small">
                                <IconImage data={playerData[printerData.bestDivineKnightPlayerId].getClassImageData()} scale={0.8} />
                                <Text>{playerData[printerData.bestDivineKnightPlayerId].playerName}</Text>
                            </Box>
                            <Box direction="row" gap="small">
                                <ComponentAndLabel
                                    label="King Of The Remembered"
                                    component={
                                        <Box direction="row" gap="small" align="center" margin={{ top: 'medium' }}>
                                            <IconImage data={playerData[printerData.bestDivineKnightPlayerId]!.talents.find(talent => talent.skillIndex == 178)!.getImageData()} scale={0.6} />
                                            <Text size="small">{nFormatter(playerData[printerData.bestDivineKnightPlayerId].getTalentBonus(178) * lavaLog(printerData.divineKnightOrbKills))}% ({nFormatter(printerData.divineKnightOrbKills)} Kills)</Text>
                                        </Box>
                                    }
                                />
                            </Box>
                        </Box>
                    </ShadowBox>
                }
                {
                    printerArtifact && printerArtifact.status != ArtifactStatus.Unobtained &&
                    <ShadowBox key={"artifact_bonus"} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                        <Box gap="small">
                            <ComponentAndLabel
                                label="Gold Relic sample boost"
                                component={
                                    <Box direction="row" gap="small" align="center" margin={{ top: 'medium' }}>
                                        <IconImage data={printerArtifact.getImageData()} scale={0.8} />
                                        <Text>{artifactBoost}% ({daysSinceLastSample} Day)</Text>
                                    </Box>
                                }
                            />
                        </Box>
                    </ShadowBox>
                }
            </Box>
            <ShadowBox background="dark-1" pad="large" width={{ min: "780px" }}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Player Name</TableCell >
                            <TableCell>Samples</TableCell >
                            <TableCell>Printing</TableCell >
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            Object.entries(printerData.samples).map(([playerIndex, samples]) => {
                                const indexAsNumber = Number.parseInt(playerIndex);
                                return (
                                    <TableRow key={`player_${indexAsNumber}`}>
                                        <TableCell>{playerData && playerData[indexAsNumber] && playerData[indexAsNumber].playerName}</TableCell>
                                        <TableCell>
                                            <Box direction="row" wrap>
                                                {
                                                    // We might have samples that are only in the printing slot but already deleted, so only filter for blank and sample quantity bigger then 0)
                                                    samples.filter(sample => sample.quantity > 0 || sample.item == "Blank").map((sample, sampleIndex) => {
                                                        return (
                                                            <SampleBox key={`sample_${sampleIndex}`} sample={sample} itemData={itemData} printing={false} slotUnlocked={sampleIndex < printerData.slotsUnlocked} />
                                                        )
                                                    })
                                                }
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box direction="row">
                                                {
                                                    samples.filter(sample => sample.printing > 0).map((sample, sampleIndex) => (
                                                        range(0, sample.printing).map((_, printIndex) => (
                                                            <SampleBox key={`active_${sampleIndex + printIndex}`} sample={sample} itemData={itemData} printing={true} />
                                                        ))
                                                    ))
                                                }
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </ShadowBox>
        </Box>
    )

}

function DeathnoteDisplay() {
    const [deathnoteData, setDeathnoteData] = useState<Deathnote>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const size = useContext(ResponsiveContext);

    const deathNoteByWorld = useMemo(() => {
        const toReturn = new Map<string, Map<string, number>>();
        if (!deathnoteData) {
            return toReturn;
        }

        return deathnoteData.getKillsMap();
    }, [theData, deathnoteData])

    const worldTierInfo = useMemo(() => {
        const toReturn: number[] = [];
        if (deathNoteByWorld.size == 0) {
            return toReturn;
        }

        [...deathNoteByWorld.entries()].forEach(([worldName, deathnoteMobs]) => {
            const worldRankSum = [...deathnoteMobs.values()].reduce((sum, killCount) => sum += (worldName == "Minibosses" ? deathnoteData?.getDeathnoteMinibossRank(killCount) : deathnoteData?.getDeathnoteRank(killCount)) ?? 0, 0);
            toReturn.push(worldRankSum);
        })
        return toReturn;
    }, [theData, deathNoteByWorld, deathnoteData])

    useEffect(() => {
        setDeathnoteData(theData.get("deathnote"));
    }, [theData]);

    if (!deathnoteData) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    return (
        <Box wrap direction="row" justify="center">
            {
                deathNoteByWorld && [...deathNoteByWorld.entries()].map(([worldName, deathnoteMobs], index) => {
                    return (
                        <ShadowBox width={{ max: deathnoteData.hasMinibosses ? '180px' : '200px' }} background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'medium' }}>
                            <Box>
                                <Text size="small">{worldName}</Text>
                                <Text size="small">({worldTierInfo[index]}%)</Text>
                            </Box>
                            {
                                [...deathnoteMobs.entries()].map(([mobName, killCount], mobIndex) => {
                                    const deathnoteRank = ("Minibosses" == worldName ? deathnoteData.getDeathnoteMinibossRank(killCount) : deathnoteData.getDeathnoteRank(killCount));
                                    const nextRank = ("Minibosses" == worldName ? deathnoteData.getNextMinibossRankReq(deathnoteRank) : deathnoteData.getNextRankReq(deathnoteRank));
                                    const hasNextRank = (nextRank > 0);
                                    return (
                                        <Box key={mobIndex} pad={{ vertical: 'small' }} margin={{ bottom: 'xsmall' }}>
                                            <Box direction="row" align="center" gap="small">
                                                <Box gap="xsmall">
                                                    <Box direction="row" gap="xsmall" align="center" margin={{ bottom: '8px' }}>
                                                        <IconImage data={deathnoteData.getRankImageData(deathnoteRank)} />
                                                        <Box margin={{ top: '8px' }}>
                                                            <Text size="small">{mobName}</Text>
                                                        </Box>
                                                    </Box>
                                                    <Meter
                                                        size="small"
                                                        thickness='8px'
                                                        type="bar"
                                                        round={true}
                                                        background="grey-1"
                                                        color="brand"
                                                        values={[
                                                            {
                                                                value: killCount,
                                                                label: 'current',
                                                                color: 'brand'
                                                            }
                                                        ]}
                                                        max={hasNextRank ? nextRank : killCount} />
                                                    <Box direction="row" justify={hasNextRank ? "between" : "center"} align={hasNextRank ? "" : "center"}>
                                                        <Text color='grey-2' size="xsmall">{nFormatter(killCount)}</Text>
                                                        {hasNextRank && <Text color='grey-2' size="xsmall">{nFormatter(nextRank)}</Text>}
                                                    </Box>
                                                </Box>

                                            </Box>
                                        </Box>
                                    )
                                })
                            }
                        </ShadowBox>
                    )
                })
            }
        </Box>
    )

}

function ShrinesDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const shrineData = theData.get("shrines") as Shrine[];

    return (
        <Box gap="medium" pad="large">
            <TextAndLabel
                label="Total Levels"
                text={shrineData.reduce((sum, shrine) => sum += shrine.level, 0).toString()}
            />
            <Box>
                {shrineData.map((shrine, index) => {
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" margin={{ bottom: 'small' }} style={{ opacity: shrine.level == 0 ? 0.5 : 1 }}>
                            <Box gap="small">
                                <Box direction="row" align="center">
                                    <Box margin={{ right: 'small' }}>
                                        <IconImage data={shrine.getImageData()} scale={0.5} />
                                    </Box>
                                    <Text size="small">{shrine.name}</Text>
                                </Box>
                                <Grid columns={{ count: 4, size: 'auto' }}>
                                    <TextAndLabel
                                        textSize='small'
                                        label="Level"
                                        text={shrine.level.toString()}
                                        margin={{ right: 'medium', bottom: 'small' }}
                                    />
                                    <TextAndLabel
                                        label="Current Map"
                                        textSize='small'
                                        text={MapInfo[shrine.currentMap].data.map.name}
                                        margin={{ right: 'medium', bottom: 'small' }}
                                    />
                                    <TextAndLabel
                                        label="Hours"
                                        textSize='small'
                                        text={`${nFormatter(Math.round(shrine.accumulatedHours))}/${nFormatter(Math.round(shrine.getHourRequirement()))}`}
                                        margin={{ right: 'medium', bottom: 'small' }}
                                    />
                                    <TextAndLabel
                                        label="Bonus"
                                        textSize='xsmall'
                                        text={`${shrine.getBonusText(shrine.currentMap)}`}
                                        margin={{ right: 'medium', bottom: 'small' }}
                                    />
                                </Grid>
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
        </Box>
    )

}

function Construction() {
    const [activeTab, setActiveTab] = useState<string>("Refinery");

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Construction</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Refinery", "Salt Lick", "3D Printer", "Death Note", "Shrines", "Buildings", "Atom Collider"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Refinery" && <RefineryDisplay />}
                {activeTab == "Salt Lick" && <SaltLickDisplay />}
                {activeTab == "3D Printer" && <PrinterDisplay />}
                {activeTab == "Death Note" && <DeathnoteDisplay />}
                {activeTab == "Shrines" && <ShrinesDisplay />}
                {activeTab == "Buildings" && <BuildingsDisplay />}
                {activeTab == "Atom Collider" && <AtomColliderDisplay />}
            </Box>
        </Box>
    )
}

export default Construction;