"use client"

import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { useState } from 'react';
import TabButton from '../../../components/base/TabButton';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { Hole as HoleDomain } from '../../../data/domain/world-5/hole/hole';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { nFormatter } from '../../../data/utility';

function OverviewDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return <Box>Overview</Box>
}

function StudiesDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box>
            <Box>
                <Text>Studies</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.studies.map((study, index) => (
                        <ShadowBox style={{ margin: 'small', opacity: study.unlocked ? 1 : 0.5 }} key={index} gap="small">
                            <TextAndLabel
                                label="Name"
                                textSize='xsmall'
                                text={study.data.name}
                            />
                            <TextAndLabel
                                label="Description"
                                textSize='xsmall'
                                text={study.getDescription()}
                            />
                            <TextAndLabel
                                label="Bonus"
                                text={study.getBonus().toString()}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function SchematicsDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box>
            <Box>
                <Text>Schematics</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.schematics.map((schematic, index) => (
                        <ShadowBox style={{ margin: 'small', opacity: schematic.unlocked ? 1 : 0.5 }} key={index} gap="small">
                            <TextAndLabel
                                label="Name"
                                textSize='xsmall'
                                text={schematic.data.name}
                            />
                            <TextAndLabel
                                label="Description"
                                textSize='xsmall'
                                text={schematic.getDescription()}
                            />
                            <TextAndLabel
                                label="Bonus"
                                text={schematic.getBonus().toString()}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function MeasurementsDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box>
            <Box>
                <Text>Measurements</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.measurements.map((measurement, index) => (
                        <ShadowBox style={{ margin: 'small', opacity: measurement.unlocked ? 1 : 0.5 }} key={index} gap="small">
                            <TextAndLabel
                                label="Boosted By"
                                textSize='xsmall'
                                text={measurement.data.measurementType.name}
                            />
                            <TextAndLabel
                                label="Item"
                                textSize='xsmall'
                                text={measurement.data.itemRequirement.name}
                            />
                            <TextAndLabel
                                label="Description"
                                textSize='xsmall'
                                text={measurement.getDescription()}
                            />
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Base"
                                    textSize='xsmall'
                                    text={measurement.getMeasurementBaseBonus().toFixed(2)}
                                />
                                <TextAndLabel
                                    label="Multi"
                                    textSize='xsmall'
                                    text={`${measurement.getMeasurementMulti().toFixed(2)}x`}
                                />
                                <TextAndLabel
                                    label="Bonus"
                                    textSize='xsmall'
                                    text={nFormatter(measurement.getBonus())}
                                />
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function MonumentsDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box>
            <Box>
                <Text>Monuments</Text>
            </Box>
            <Box gap="medium">
                {
                    Object.values(hole.monuments.monuments).map((monument, index) => (
                        <ShadowBox background="dark-2" key={index} pad="small">
                            <Text>{monument.name}</Text>
                            <Grid columns={{ size: 'auto', count: 4 }} gap="small" style={{ marginBottom: 'medium' }}>
                                {
                                    monument.bonuses.map((bonus, index) => (
                                        <ShadowBox background="dark-1" key={index} gap="small" style={{ margin: 'small', opacity: bonus.level > 0 ? 1 : 0.5 }}>
                                            <TextAndLabel
                                                label="Level"
                                                textSize='xsmall'
                                                text={bonus.level.toString()}
                                            />
                                            <TextAndLabel
                                                label="Description"
                                                textSize='xsmall'
                                                text={bonus.getDescription()}
                                            />
                                            <TextAndLabel
                                                label="Bonus"
                                                textSize='xsmall'
                                                text={nFormatter(bonus.getBonus())}
                                            />

                                        </ShadowBox>
                                    ))
                                }
                            </Grid>
                            <Box>{monument.hours} Hours</Box>
                            <Grid columns={{ size: 'auto', count: 4 }} gap="small" style={{ marginTop: 'medium' }}>
                                {
                                    monument.unlocks.map((unlock, index) => (
                                        <ShadowBox background="dark-1" key={index} gap="small" style={{ margin: 'small', opacity: unlock.unlocked ? 1 : 0.5 }}>
                                            <TextAndLabel
                                                label="Description"
                                                textSize='xsmall'
                                                text={unlock.data.description}
                                            />
                                            {
                                                !unlock.unlocked && <TextAndLabel
                                                    label="Additional Hours"
                                                    textSize='xsmall'
                                                    text={`${unlock.data.hours_required - monument.hours} Hours to Unlock`}
                                                />
                                            }
                                        </ShadowBox>
                                    ))
                                }
                            </Grid>
                        </ShadowBox>
                    ))
                }
            </Box>
        </Box>
    )
}

function BellDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box>
            <Box>
                <Text>Bell</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.bell.bonuses.map((bonus, index) => (
                        <ShadowBox style={{ margin: 'small', opacity: bonus.level > 0 ? 1 : 0.5 }} key={index} gap="small">
                            <TextAndLabel
                                label="Name"
                                textSize='xsmall'
                                text={bonus.getDescription()}
                            />
                            <TextAndLabel
                                label="Bonus"
                                text={nFormatter(bonus.getBonus())}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function WellDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box gap="medium">
            <Box>
                <Text>Well</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.well.sediments.map((sediment, index) => (
                        <ShadowBox background="dark-1" style={{ margin: 'small', opacity: sediment.current > 0 ? 1 : 0.5 }} key={index} gap="small">
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Name"
                                    textSize='xsmall'
                                    text={sediment.data.name}
                                />
                                <TextAndLabel
                                    label="Completed"
                                    textSize='xsmall'
                                    text={sediment.expansions.toString()}
                                />
                            </Box>
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Progress"
                                    textSize='xsmall'
                                    text={`${nFormatter(sediment.current)} / ${nFormatter(sediment.currentMax)} (${(sediment.current / sediment.currentMax * 100).toFixed(2)}%)`}
                                />
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.well.buckets.map((bucket, index) => (
                        <ShadowBox background="dark-1" style={{ margin: 'small', opacity: bucket.unlocked ? 1 : 0.5 }} key={index} gap="small">
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Index"
                                    textSize='xsmall'
                                    text={(index + 1).toString()}
                                />
                                {bucket.unlocked && <TextAndLabel
                                    label="Name"
                                    textSize='xsmall'
                                    text={hole.well.sediments[bucket.sedimentIndex].data.name}
                                />}
                                {!bucket.unlocked && <TextAndLabel
                                    label="Unlocked By"
                                    textSize='xsmall'
                                    text={bucket.unlockMethod}
                                />}
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function MajiksDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    const majiks = hole.majiks;

    return (
        <Box gap="medium">
            <Text>Majiks</Text>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    majiks.HoleUpgrades.map((upgrade, index) => (
                        <ShadowBox background="dark-1" key={index} gap="small">
                            <Text size="xsmall">{upgrade.data.name} ({upgrade.level - 1}/{upgrade.data.maxEnhance})</Text>
                            <Text size="xsmall">{upgrade.getDescription()}</Text>
                        </ShadowBox>
                    ))
                }
            </Grid>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    majiks.VillageUpgrades.map((upgrade, index) => (
                        <ShadowBox background="dark-1" key={index} gap="small">
                            <Text size="xsmall">{upgrade.data.name} ({upgrade.level - 1}/{upgrade.data.maxEnhance})</Text>
                            <Text size="xsmall">{upgrade.getDescription()}</Text>
                        </ShadowBox>
                    ))
                }
            </Grid>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    majiks.IdleonUpgrades.map((upgrade, index) => (
                        <ShadowBox background="dark-1" key={index} gap="small">
                            <Text size="xsmall">{upgrade.data.name} ({upgrade.level - 1}/{upgrade.data.maxEnhance})</Text>
                            <Text size="xsmall">{upgrade.getDescription()}</Text>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function HarpDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const hole = theData.get("hole") as HoleDomain;

    return (
        <Box gap="medium">
            <Box>
                <Text>Harp</Text>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.harp.strings.map((string, index) => (
                        <ShadowBox background="dark-1" key={index} gap="small">
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Name"
                                    textSize='xsmall'
                                    text={string.data.stringLetter}
                                />
                                <TextAndLabel
                                    label="Level"
                                    textSize='xsmall'
                                    text={string.level.toString()}
                                />
                            </Box>

                            <TextAndLabel
                                label="Description"
                                textSize='xsmall'
                                text={string.getDescription()}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
            <Grid columns={{ size: 'auto', count: 4 }} gap="small">
                {
                    hole.harp.notes.map((note, index) => (
                        <ShadowBox background="dark-1" key={index} gap="small">
                            <TextAndLabel
                                label="Name"
                                textSize='xsmall'
                                text={note.name}
                            />
                            <TextAndLabel
                                label="Current"
                                textSize='xsmall'
                                text={nFormatter(note.current)}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box >
    )
}

function Hole() {
    const [activeTab, setActiveTab] = useState<string>("Overview");

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>The Hole</Heading>
            <Text size="xsmall">* This UI is purely for value testing purposes. THE UI ISN&apos;T FINAL!</Text>
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Overview", "Studies", "Schematics", "Measurements", "Monuments", "Bell", "Well", "Majiks", "Harp"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Overview" && <OverviewDisplay />}
            {activeTab == "Studies" && <StudiesDisplay />}
            {activeTab == "Schematics" && <SchematicsDisplay />}
            {activeTab == "Measurements" && <MeasurementsDisplay />}
            {activeTab == "Monuments" && <MonumentsDisplay />}
            {activeTab == "Bell" && <BellDisplay />}
            {activeTab == "Well" && <WellDisplay />}
            {activeTab == "Majiks" && <MajiksDisplay />}
            {activeTab == "Harp" && <HarpDisplay />}
        </Box>
    )
}

export default Hole;
