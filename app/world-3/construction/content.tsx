"use client"

import {
    Box,
    Heading,
    Text,
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
import DataRow from '../../../components/base/DataRow';
import ContentTabs from '../../../components/base/ContentTabs';
import { Refinery } from '../../../data/domain/world-3/construction/refinery';
import { Item } from '../../../data/domain/items';
import { commaNotation, lavaLog, nFormatter, range, toTime } from '../../../data/utility';
import { StaticTime, TimeDisplaySize, TimeDown } from '../../../components/base/TimeDisplay';
import { INDEX_DAYS_SINCE_SAMPLE_ARTIFACT, Printer, Sample } from '../../../data/domain/world-3/construction/printer';
import { Player } from '../../../data/domain/player';
import { CircleInformation, Star, StatusWarning } from 'grommet-icons';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import { Deathnote } from '../../../data/domain/world-3/construction/deathnote';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { ClassIndex, Talent } from '../../../data/domain/talents';
import { Shrine } from '../../../data/domain/world-3/construction/shrines';
import { MapInfo } from '../../../data/domain/maps';
import IconImage from '../../../components/base/IconImage';
import { BuildingsDisplay } from '../../../components/world-3/construction/buildings';
import { SaltLickDisplay } from '../../../components/world-3/construction/saltLick';
import { ArtifactStatus } from '../../../data/domain/world-5/sailing/artifacts';
import { AtomColliderDisplay } from '../../../components/world-3/construction/atomCollider';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';
import { useShallow } from 'zustand/react/shallow';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';
import useCurrentTime from '../../../lib/hooks/useCurrentTime';

function RefineryDisplay() {
    const [squirePowha, setSquirePowha] = useState<boolean>(false);
    const currentTime = useCurrentTime();

    const size = useContext(ResponsiveContext);

    const { theData, lastUpdated } = useAppDataStore(
        useShallow((state) => (
            { theData: state.data.getData(), lastUpdated: state.data.getLastUpdated(true) as Date, realLastUpdate: state.lastUpdated }
        )));
    const refineryData = theData.get("refinery") as Refinery;
    const itemData = theData.get("itemsData") as Item[];
    const playerData = theData.get("players") as Player[];

    const squireInfo = useMemo(() => {
        const squires = playerData.filter(player => (player.classId == ClassIndex.Squire || player.classId == ClassIndex.Divine_Knight));
        return squires;
    }, [playerData])

    const saltsUnlocked = useMemo(() => {
        return Object.values(refineryData.salts).some(info => info.unlocked);
    }, [refineryData]);

    const squireTimeSave = useMemo(() => {
        const theSlowRockMethod = () => {
            const toReturn: number[] = [];
            Object.entries(refineryData.salts).forEach(([salt, info], index) => {
                const currentCooldowns: [Player, number][] = [];
                if (squireInfo) {
                    squireInfo.forEach(squire => {
                        currentCooldowns.push([squire, squire.getCurrentCooldown(130)]);
                    });
                }
                let totalWait = 0;
                let refineryCycle = refineryData.cycleInfo["Combustion"];
                if (Math.floor(index / 3) == 1) {
                    refineryCycle = refineryData.cycleInfo["Synthesis"];
                }
                if (Math.floor(index / 3) == 2) {
                    refineryCycle = refineryData.cycleInfo["Polymerization"]
                }
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

    const secondsSinceUpdate = currentTime === undefined
        ? 0
        : (currentTime - (lastUpdated?.getTime() ?? 0)) / 1000;

    return (
        <Box gap="medium">
            <Box direction="row" wrap justify="center">
                {Object.values(refineryData.cycleInfo).map(cycle => (
                    <ShadowBox key={cycle.name} margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <TextAndLabel center textSize="xsmall" labelSize="medium" text="Next cycle in" label={cycle.name} />
                        {saltsUnlocked
                            ? <TimeDown addSeconds={cycle.cycleTime - cycle.timePast} resetToSeconds={cycle.cycleTime} />
                            : <StaticTime fromSeconds={cycle.cycleTime - cycle.timePast} />}
                        <Text margin={{ top: 'small' }} color="accent-3" size="small">May be off by a few seconds.</Text>
                        <Text color="accent-3" size="small">Max cycle: {toTime(cycle.cycleTime)}</Text>
                    </ShadowBox>
                ))}
                {squireInfo.map(squire => {
                    const entry = [...squire.cooldown.entries()].find(([talent]) => talent.skillIndex == 130);
                    if (!entry) return null;
                    const [talent, cooldown] = entry;
                    const realCD = cooldown - squire.afkFor;
                    return (
                        <Box key={squire.playerName} direction="row" gap="xsmall" align="center">
                            <IconImage data={squire.getClassImageData()} scale={0.8} />
                            <Text size="small">{squire.playerName}</Text>
                            <IconImage data={talent.getImageData()} scale={0.8} />
                            {realCD > 0
                                ? <TimeDown size={TimeDisplaySize.XSmall} addSeconds={realCD} resetToSeconds={72000} />
                                : <Text size="small">Skill ready</Text>}
                        </Box>
                    );
                })}
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
            <Text size="small" color="accent-2">
                Rates assume continuous cycles and sufficient fuel. Sustainable rank assumes previous salt production and uses active printer samples.
                Unsampled inputs and stored fuel do not guarantee sustainability.
            </Text>
            <Box gap="small">
                {Object.entries(refineryData.salts).map(([salt, info], index) => {
                    const saltItem = itemData.find(item => item.internalName === salt);
                    if (!saltItem) return null;
                    const cycle = Object.values(refineryData.cycleInfo)[Math.floor(index / 3)];
                    const fuelProjection = info.fuelTimeSeconds;
                    const fuelTime = fuelProjection === null ? null : Math.max(0, fuelProjection - secondsSinceUpdate);
                    const rankTime = Math.max(0, info.getTimeToNextRank(cycle.cycleTime) - secondsSinceUpdate);
                    const fuelShort = info.unlocked && info.storedFuelInsufficient;
                    const details = (
                        <Box gap="xsmall">
                            <Text size="small">Cost per hour / cost to rank up (stored)</Text>
                            <Text size="small">Fuel time assumes continuous consumption and active printing at current rates. It excludes salt production and auto-refining.</Text>
                            {info.fuelInputs.map(fuel => (
                                <Box key={fuel.item} direction="row" gap="xsmall" align="center">
                                    <IconImage data={fuel.imageData} scale={0.8} />
                                    <Text size="small">{fuel.displayName}: {nFormatter(fuel.costPerHour)} / {nFormatter(fuel.costToRankUp)} ({nFormatter(fuel.stored)})</Text>
                                    {!fuel.isSalt && <Text size="small">· Printing {nFormatter(fuel.printedPerHour)}/hr · Net use {nFormatter(fuel.netUsePerHour)}/hr</Text>}
                                </Box>
                            ))}
                        </Box>
                    );
                    return (
                        <DataRow
                            key={salt}
                            opacity={!info.unlocked ? 0.65 : info.active ? 1 : 0.85}
                            columns={size === "small" ? ["minmax(0, 1fr)", "minmax(0, 1fr)"] : ["minmax(0, 22fr)", "minmax(0, 16fr)", "minmax(0, 18fr)", "minmax(0, 24fr)", "minmax(0, 14fr)"]}
                            fields={[
                                { key: "salt", kind: "identity", name: saltItem.displayName, artwork: <IconImage data={saltItem.getImageData()} scale={0.8} /> },
                                { key: "rank", kind: "text", label: "Rank / sustainable", value: `${commaNotation(info.rank)} / ${!info.unlocked ? "Locked" : info.maxSafeRank == null ? "No calculated limit" : commaNotation(info.maxSafeRank)}` },
                                {
                                    key: "rates", kind: "content", label: "Net production", content: <Box direction="row" align="center" gap="xsmall">
                                        <Text size="small">{info.balancePerHour < 0 ? "-" : ""}{nFormatter(Math.abs(info.balancePerHour))}/hr</Text>
                                        <TipDisplay heading="Production per hour" body={<Box gap="xsmall">
                                            <Text size="small">Output: {nFormatter(info.outputPerHour)}/hr</Text>
                                            <Text size="small">Consumption: {nFormatter(info.consumedPerHour)}/hr</Text>
                                            <Text size="small">Net: {info.balancePerHour < 0 ? "-" : ""}{nFormatter(Math.abs(info.balancePerHour))}/hr</Text>
                                        </Box>}><Box tabIndex={0} aria-label="Production details"><CircleInformation size="small" /></Box></TipDisplay>
                                    </Box>
                                },
                                {
                                    key: "power", kind: "content", label: "Power / auto refine", content: <Box gap="xxsmall" style={{ minWidth: 0 }}>
                                        {info.unlocked && <>
                                            <Box direction="row" justify="between" gap="xsmall">
                                                <Text size="xsmall" color="accent-2">Power</Text>
                                                <Text size="xsmall">{commaNotation(info.progress)} / {commaNotation(info.getCap())}</Text>
                                            </Box>
                                            <Box background="grey-1" height="8px" overflow="hidden" role="progressbar"
                                                aria-label={`${saltItem.displayName} power progress`} aria-valuemin={0}
                                                aria-valuemax={info.getCap()} aria-valuenow={Math.min(info.progress, info.getCap())}>
                                                <Box background="brand" height="8px" flex={false} style={{
                                                    width: `${info.getCap() > 0 ? 100 * Math.max(0, Math.min(1, info.progress / info.getCap())) : 0}%`,
                                                }} />
                                            </Box>
                                        </>}
                                        <Box direction="row" justify="between" gap="xsmall" align="center">
                                            <Text size="xsmall" color="accent-2">Est. rank-up</Text>
                                            {!info.unlocked ? <Text size="xsmall">Locked</Text> : !info.active ? <Text size="xsmall">Not active</Text> : info.progress >= info.getCap() ? <Text size="xsmall" color="green-1" weight="bold">Ready</Text> : (squirePowha ? squireTimeSave[index] : rankTime) <= 0
                                                ? <Text size="xsmall">Estimate elapsed</Text>
                                                : <TimeDown size={TimeDisplaySize.XSmall} addSeconds={squirePowha ? squireTimeSave[index] : rankTime} />}
                                        </Box>
                                        {info.unlocked && <Text size="small">Auto-refine: {info.autoRefineEnabled ? "ON" : "OFF"}</Text>}
                                    </Box>
                                },
                                {
                                    key: "fuel", kind: "content", label: "Est. fuel left", content: !info.unlocked ? <Text size="small">Locked</Text> : <Box gap="xsmall">
                                        {fuelShort && <Text size="small" color="accent-1">Stored fuel is not enough to rank up</Text>}
                                        {!info.active ? <Text size="small">—</Text> : fuelTime === null
                                            ? <Text size="small">No estimated depletion</Text> : fuelTime <= 0
                                                ? <Text size="small">Estimate elapsed</Text>
                                                : <TimeDown size={TimeDisplaySize.XSmall} addSeconds={fuelTime} />}
                                    </Box>
                                },
                            ]}
                            details={[
                                {
                                    key: "stored", label: "Stored salt / fuel and costs", content: <Box direction="row" gap="small" align="center">
                                        <Text size="small">{nFormatter(info.storedSaltQuantity)}</Text>
                                        <TipDisplay heading="Fuel and costs" body={details} maxWidth="large"><Box tabIndex={0} aria-label="Fuel and cost details"><CircleInformation size="small" /></Box></TipDisplay>
                                    </Box>
                                },
                            ]}
                        />
                    );
                })}
            </Box>
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
            return optLacc[INDEX_DAYS_SINCE_SAMPLE_ARTIFACT];
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

    const rememberedTalent = playerData?.map(player => player.talents.find(talent => talent.skillIndex == 178)).find(talent => talent !== undefined);

    return (
        <Box gap="medium">
            <Box direction="row" wrap justify="center">
                {masteroInfo && masteroInfo.map((mastero, index) => {
                    const [printerTalent, cooldown] = [...mastero.cooldown.entries()].filter(([talent, _]) => talent.skillIndex == 32)?.pop() as [Talent, number];
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
                {rememberedTalent &&
                    <ShadowBox key={"best_dk"} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                        <Box gap="small">
                            <Box direction="row" gap="small">
                                <ComponentAndLabel
                                    label="King Of The Remembered"
                                    component={
                                        <Box direction="row" gap="small" align="center" margin={{ top: 'medium' }}>
                                            <IconImage data={rememberedTalent.getImageData()} scale={0.6} />
                                            <Text size="small">{nFormatter(printerData.accountTalent178Bonus * lavaLog(printerData.divineKnightOrbKills))}% ({nFormatter(printerData.divineKnightOrbKills)} Kills)</Text>
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
            <Box gap="small">
                {shrineData.map((shrine, index) => {
                    // Get map name while protecting against new maps.
                    let mapName = "Unknown";
                    if (MapInfo.length > shrine.currentMap) {
                        mapName = MapInfo[shrine.currentMap].data.map.name;
                    }

                    return (
                        <DataRow
                            key={index}
                            opacity={shrine.level == 0 ? 0.5 : 1}
                            columns={["minmax(0, 25fr)", "minmax(0, 9fr)", "minmax(0, 26fr)", "minmax(0, 14fr)", "minmax(0, 26fr)"]}
                            fields={[
                                { key: "identity", kind: "identity", name: shrine.name, artwork: <IconImage data={shrine.getImageData()} scale={0.5} /> },
                                { key: "level", kind: "text", label: "Level", value: shrine.level.toString() },
                                { key: "map", kind: "text", label: "Current Map", value: mapName },
                                { key: "hours", kind: "text", label: "Hours", value: `${nFormatter(Math.round(shrine.accumulatedHours))}/${nFormatter(Math.round(shrine.getHourRequirement()))}` },
                                { key: "bonus", kind: "text", label: "Bonus", value: `${shrine.getBonusText(shrine.currentMap)}`, role: "description" },
                            ]}
                        />
                    )
                })
                }
            </Box>
        </Box>
    )

}

function Construction() {
    const hydrated = useHydrated();
    const [activeTab, setActiveTab] = useState<string>("Refinery");

    if (!hydrated) {
        return <>Loading...</>;
    }

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Construction</Heading>
            <Box gap="small">
                <ContentTabs
                    options={[
                        { value: "Refinery", label: "Refinery" },
                        { value: "Salt Lick", label: "Salt Lick" },
                        { value: "3D Printer", label: "3D Printer" },
                        { value: "Death Note", label: "Death Note" },
                        { value: "Shrines", label: "Shrines" },
                        { value: "Buildings", label: "Buildings" },
                        { value: "Atom Collider", label: "Atom Collider" },
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                />
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
