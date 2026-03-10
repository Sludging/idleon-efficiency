"use client"

import {
    Box,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    Heading,
    Text,
    Grid,
} from 'grommet'
import { Trap, TrapSet } from '../../../data/domain/world-3/traps';
import ShadowBox from '../../../components/base/ShadowBox';
import { Player } from '../../../data/domain/player';
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { Storage } from '../../../data/domain/storage';
import { initCritterRepo } from '../../../data/domain/data/CritterRepo';
import { Item } from '../../../data/domain/items';
import ResourceCountTile from '../../../components/base/ResourceCountTile';


interface PlayerTrapProps {
    traps: Array<Trap>
    maxTraps: number
}

interface OwnedCrittersProps {
    id: string;
    count: number;
    location: string
}

interface TrapRewardsProps {
    name: string;
    count: number;
}

function TrapRewardsSummary({ entries }: { entries: TrapRewardsProps[] }) {
    if (entries.length === 0) {
        return <Text size="small" color="dark-4">No placed traps</Text>;
    }

    return (
        <Box margin={{ bottom: 'small' }} gap="small">
            <Box direction="row" wrap>
                {
                    entries.map((entry) => (
                        <ResourceCountTile key={entry.name}
                        imageData={{ location: `${entry.name}_x1`, width: 36, height: 36 }}
                        count={entry.count}
                        iconScale={0.75}
                        />
                    ))
                }
            </Box>
        </Box>
    );
}

function OwnedCrittersSummary({ entries }: { entries: OwnedCrittersProps[] }) {
    return (
        <Box margin={{ bottom: 'small' }} gap="small">
            <Box direction="row" wrap>
                {
                    entries.map((entry) => (
                        <ResourceCountTile key={entry.id}
                        imageData={Item.getImageData(entry.id)}
                        count={entry.count}
                        iconScale={0.75}
                        tooltipHeading={entry.location}
                        />
                    ))
                }
            </Box>
        </Box>
    );
}

function PlayerTraps(props: PlayerTrapProps) {
    const formatTime = (input: number) => {
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges: Record<string, number> = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1
        };
        for (const key in ranges) {
            if (ranges[key] < Math.abs(input)) {
                const delta = input / ranges[key];
                return formatter.format(Math.round(delta), key as Intl.RelativeTimeFormatUnit);
            }
        }
    }

    return (
        <Box direction="row" wrap gap="small" justify="start">
            {
                props.traps.map((trap, index) => {
                    if (!trap.placed && index >= props.maxTraps) {
                        return null
                    }
                    return (
                        <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} height={{ min: '82px', max: '82px' }}>
                            {!trap.placed ?
                                <Box border={{ color: 'orange-1' }} align="center" width={{ max: '100px', min: '100px' }} height={{ min: '82px', max: '82px' }} justify='center'>
                                    <Text size="xsmall" color="accent-3">Empty</Text>
                                </Box> :
                                <Box key={`trap_${index}`} style={{ background: trap.isReady() ? 'red' : 'none' }} align="center" fill>
                                    <TipDisplay
                                        body={
                                            <Box>
                                                <Text>Trap Type: {TrapSet[trap.trapType]}</Text>
                                                <Text>Original Duration: {formatTime(trap.trapDuration)?.replace("in ", "") ?? ""}</Text>
                                                <Box direction="row">
                                                    <Text>
                                                        Bonuses: {trap.getBenefits().join(" | ")}    
                                                    </Text>
                                                </Box>
                                                <Text>Critters: {trap.critters}</Text>
                                            </Box>
                                        }
                                        size='medium'
                                        direction={TipDirection.Down}
                                        heading='Trap Info'>
                                        <IconImage data={trap.getCritterImageData()} />
                                    </TipDisplay>
                                    <Text textAlign='center' size="xsmall">{formatTime(trap.trapDuration - trap.timeSincePut)}</Text>
                                </Box>
                            }
                        </Box>
                    )
                })
            }
        </Box>
    )
}

function Traps() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const playerTraps = theData.get("traps") as Trap[][];
    const playerNames = theData.get("playerNames") as string[];
    const playerData = theData.get("players") as Player[];
    const alchemy = theData.get("alchemy");
    const hasAlchemyExtraTrap = (alchemy?.cauldrons?.[1]?.bubbles?.[11]?.level ?? 0) > 0.5;
    const storage = theData.get("storage") as Storage;

    const critters = initCritterRepo();
    const critterCounts = {
        regular: critters.map(c => ({
            id: c.id,
            count: storage?.amountInStorage(c.id) ?? 0,
            location: c.data.location,
        })),
        shiny: critters.map(c => ({
            id: c.data.shiny,
            count: storage?.amountInStorage(c.data.shiny) ?? 0,
            location: c.data.location,
        })),
    };

    const totalRewards = new Map<string, number>();
    playerTraps
        .flat()
        .filter((trap) => trap?.placed)
        .forEach((trap) => {
            const current = totalRewards.get(trap.critterName) ?? 0;
            totalRewards.set(trap.critterName, current + (trap.critters ?? 0));
        });

    const trapRewards = Array.from(totalRewards.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => a.name.localeCompare(b.name));

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Traps</Heading>
            <ShadowBox background="dark-1" pad="large">
                <Text margin={{ bottom: "small" }}>Owned Critters</Text>
                <OwnedCrittersSummary entries={critterCounts.regular} />
                <OwnedCrittersSummary entries={critterCounts.shiny} />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableCell>Player Name</TableCell >
                            <TableCell>Box Set</TableCell >
                            <TableCell>Traps</TableCell >
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            playerTraps.filter(x => playerNames[x[0]?.playerID] != undefined).map((trapsData, index) => {
                                const boxSet = playerData?.find((player) => player.playerID == trapsData[0]?.playerID)?.gear.tools.find((tool) => tool?.type == "Trap Box Set");
                                const skillLevel = playerData?.find((player) => player.playerID == trapsData[0]?.playerID)?.skills.get(SkillsIndex.Trapping)?.level;
                                const maxTraps = Trap.getMaxTraps(boxSet, hasAlchemyExtraTrap);
                                return (
                                    <TableRow key={`traps_${index}`}>
                                        <TableCell>
                                            <Box>
                                                <Text size="small">{playerNames[trapsData[0]?.playerID]}</Text>
                                                <Text title={"Trapping level"} size="small">(Level: {skillLevel})</Text>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {boxSet &&
                                                <Box title={boxSet.displayName}>
                                                    <IconImage data={boxSet.getImageData()} />
                                                </Box>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <PlayerTraps traps={trapsData} maxTraps={maxTraps} />
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Box 
                    border={{ side: 'top', color: 'grey-1', size: '1px' }}
                    margin={{ top: 'small' }}
                    pad={{ top: 'small' }}
                    align="end"
                >
                    <Text margin={{ bottom: "small" }}>Trap Rewards</Text>
                    <TrapRewardsSummary entries={trapRewards} />
                </Box>
            </ShadowBox>
        </Box>
    )
}

export default Traps;