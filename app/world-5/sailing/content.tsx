"use client"

import {
    Box,
    CheckBox,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { CircleInformation, FormNext } from 'grommet-icons';
import { useEffect, useMemo, useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox, { ShadowHoverBox } from '../../../components/base/ShadowBox';

import TabButton from '../../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { TimeDisplaySize, TimeDown } from '../../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import { BoatUpgradeType, CaptainTrait, IslandStatus, Sailing as SailingDomain } from '../../../data/domain/sailing';
import { ArtifactStatus } from '../../../data/domain/sailing/artifacts';
import { nFormatter, range } from '../../../data/utility';
import styled from 'styled-components';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

const BlankBox = styled.div`
height: 10px;
width: 10px;
border: 1px solid black;
`

const BlackBox = styled.div`
height: 10px;
width: 10px;
border: 1px solid black;
background-color: black;
`

function ShipsDisplay({silkRodeChip, starSignEquipped} : {silkRodeChip: boolean, starSignEquipped: boolean}) {
    const [sailing, setSailing] = useState<SailingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSailing(theData.get("sailing"));
    }, [theData]);

    if (!sailing) {
        return null;
    }

    return (
        <Box gap="medium">
            <Text size="xsmall">* Ship speed and loot upgrades hit milestones every 7 and 8 levels respectively. Hover over the boats to see progress and total cost to next milestone.</Text>
            <Grid columns={{ size: 'auto', count: 4 }}>
                {
                    sailing.boats.map((boat, index) => (
                        <TipDisplay
                            key={index}
                            direction={TipDirection.Down}
                            heading='Upgrade Milestones'
                            body={
                                <Box>
                                    <Text size="small">Loot ({boat.lootUpgrades}):</Text>
                                    <Box direction="row" gap="1px">
                                        {
                                            range(boat.lootUpgrades - (boat.lootUpgrades % 8), boat.lootUpgrades - (boat.lootUpgrades % 8) + 8).map((upgrade, index) => {
                                                return (
                                                    <Box key={index}>
                                                        {upgrade < boat.lootUpgrades ? <BlackBox /> : <BlankBox />}
                                                    </Box>
                                                )
                                            })
                                        }
                                        <Box direction="row" gap="xsmall" align="center" margin={{ left: 'small' }}>
                                            <IconImage data={SailingDomain.getLootImageData(boat.getLootUpgradeType())} scale={1} />
                                            <Text color={sailing.loot[boat.getLootUpgradeType()] > boat.getUpgradeCostTillLevel(BoatUpgradeType.Loot, boat.lootUpgrades - (boat.lootUpgrades % 8) + 8) ? 'green-1' : 'accent-1'} size="small">{nFormatter(boat.getUpgradeCostTillLevel(BoatUpgradeType.Loot, boat.lootUpgrades - (boat.lootUpgrades % 8) + 8))}</Text>
                                        </Box>
                                    </Box>
                                    <Text size="small">Speed ({boat.speedUpgrades}):</Text>
                                    <Box direction="row" gap="1px">
                                        {
                                            range(boat.speedUpgrades - (boat.speedUpgrades % 7), boat.speedUpgrades - (boat.speedUpgrades % 7) + 7).map((upgrade, index) => {
                                                return (
                                                    <Box key={index}>
                                                        {upgrade < boat.speedUpgrades ? <BlackBox /> : <BlankBox />}
                                                    </Box>
                                                )
                                            })
                                        }
                                        <Box direction="row" gap="xsmall" align="center" margin={{ left: 'small' }}>
                                            <IconImage data={SailingDomain.getLootImageData(boat.getSpeedUpgradeType())} scale={1} />
                                            <Text color={sailing.loot[boat.getSpeedUpgradeType()] > boat.getUpgradeCostTillLevel(BoatUpgradeType.Speed, boat.speedUpgrades - (boat.speedUpgrades % 7) + 7) ? 'green-1' : 'accent-1'} size="small">{nFormatter(boat.getUpgradeCostTillLevel(BoatUpgradeType.Speed, boat.speedUpgrades - (boat.speedUpgrades % 7) + 7))}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            }
                        >
                            <ShadowHoverBox background="dark-1" pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                                <Text size="small">Boat {boat.index + 1} (LV {(boat.lootUpgrades + boat.speedUpgrades).toString()})</Text>
                                <Grid columns={["35%", "15%", "20%", "30%"]} justifyContent="start" align="center">
                                    <Box direction="row" gap="xsmall" align='center'>
                                        <IconImage data={CaptainTrait.getLootImageData()} scale={0.7} />
                                        <Text size="xsmall">{nFormatter(Math.round(boat.getLootValue()))}</Text>
                                    </Box>
                                    <FormNext color="grey-2" size="16px" />
                                    <Text size="xsmall">{nFormatter(Math.round(boat.getLootValue({ lootUpgrades: boat.lootUpgrades + 1 })))}</Text>
                                    <Box direction="row" gap="xsmall" align="center" margin={{ left: 'xsmall' }}>
                                        <IconImage data={SailingDomain.getLootImageData(boat.getLootUpgradeType())} scale={0.8} />
                                        <Text color={sailing.loot[boat.getLootUpgradeType()] > boat.getUpgradeCost(BoatUpgradeType.Loot) ? 'green-1' : 'accent-1'} size="xsmall">{nFormatter(boat.getUpgradeCost(BoatUpgradeType.Loot))}</Text>
                                    </Box>
                                    <Box direction="row" gap="xsmall" align='center'>
                                        <IconImage data={CaptainTrait.getSpeedImageData()} scale={0.7} />
                                        <Text size="xsmall">{nFormatter(Math.round(boat.getSpeedValue({starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip})))}</Text>
                                    </Box>
                                    <FormNext color="grey-2" size="16px" />
                                    <Text size="xsmall">{nFormatter(Math.round(boat.getSpeedValue({starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip, speedUpgrades:(boat.speedUpgrades + 1)})))}</Text>
                                    <Box direction="row" gap="xsmall" align="center" margin={{ left: 'xsmall' }}>
                                        <IconImage data={SailingDomain.getLootImageData(boat.getSpeedUpgradeType())} scale={0.8} />
                                        <Text color={sailing.loot[boat.getSpeedUpgradeType()] > boat.getUpgradeCost(BoatUpgradeType.Speed) ? 'green-1' : 'accent-1'} size="xsmall">{nFormatter(boat.getUpgradeCost(BoatUpgradeType.Speed))}</Text>
                                    </Box>
                                </Grid>
                            </ShadowHoverBox>
                        </TipDisplay>
                    ))
                }
                {
                    sailing.boatsUnlocked < 20 &&
                    <ShadowBox style={{ opacity: 0.8 }} background="dark-2" key="nextCapSlot" pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                        <Text size="small">Boat {sailing.boatsUnlocked + 1}</Text>
                        <ComponentAndLabel
                            label="Unlock Cost"
                            component={
                                <Box direction="row" gap="xsmall" align="center">
                                    <IconImage data={SailingDomain.getLootImageData(0)} scale={0.8} />
                                    <Text color={sailing.loot[0] > sailing.nextCaptainCost() ? 'green-1' : 'accent-1'}>{nFormatter(sailing.nextBoatCost())}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                }
            </Grid>
        </Box>
    )
};

function CaptainsDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSailing(theData.get("sailing"));
    }, [theData]);

    if (!sailing) {
        return null;
    }

    return (
        <Box gap="medium">
            <Grid columns={{ size: 'small' }}>
                {
                    sailing.captains.map((captain, index) => (
                        <ShadowBox background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                            <Text size="small">Captain  {String.fromCharCode(64 + captain.index + 1)}</Text>
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Level"
                                    labelSize='xsmall'
                                    textSize='xsmall'
                                    text={captain.level.toString()}
                                />
                                <TextAndLabel
                                    label="Exp"
                                    labelSize='xsmall'
                                    textSize='xsmall'
                                    text={`${nFormatter(captain.currentXP)}/${nFormatter(captain.getExpForNextLevel())}`}
                                />
                            </Box>
                            <Box pad={{ vertical: 'xsmall' }} gap="xsmall" border={{ side: 'top', color: 'grey-2', size: '1px' }}>
                                {
                                    captain.traits.map((trait, tIndex) => (
                                        <Box direction="row" key={tIndex} gap="xsmall" align="start">
                                            <Box title={trait.bonus.bonus}>
                                                <IconImage data={trait.getImageData()} scale={0.8} />
                                            </Box>
                                            <Text size="xsmall">{trait.getBonusText()}</Text>
                                        </Box>
                                    ))
                                }
                            </Box>
                        </ShadowBox>
                    ))
                }
                {
                    sailing.captainsUnlocked < 20 &&
                    <ShadowBox style={{ opacity: 0.8 }} background="dark-2" key="nextCapSlot" pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                        <Text size="small">Captain {sailing.captainsUnlocked + 1}</Text>
                        <ComponentAndLabel
                            label="Unlock Cost"
                            component={
                                <Box direction="row" gap="xsmall" align="center">
                                    <IconImage data={SailingDomain.getLootImageData(0)} scale={0.8} />
                                    <Text color={sailing.loot[0] > sailing.nextCaptainCost() ? 'green-1' : 'accent-1'}>{nFormatter(sailing.nextCaptainCost())}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                }
            </Grid>
        </Box>
    )
};

function ArtifactDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const [hideUnobtained, setHideUnobtained] = useState(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSailing(theData.get("sailing"));
    }, [theData]);

    const artifactsToShow = useMemo(() => {
        if (!sailing) {
            return [];
        }

        if (hideUnobtained) {
            return sailing.artifacts.filter(artifact => artifact.status != ArtifactStatus.Unobtained);
        }

        return sailing.artifacts;
    }, [sailing, hideUnobtained])

    if (!sailing) {
        return null;
    }

    return (
        <Box>
            <Box margin={{ bottom: 'small' }}>
                <CheckBox
                    checked={hideUnobtained}
                    label="Hide unobtained"
                    onChange={(event) => setHideUnobtained(event.target.checked)}
                />
            </Box>
            <Grid columns={{ size: 'small' }}>
                {
                    artifactsToShow.map((artifact, aIndex) => (
                        <ShadowBox style={{ opacity: artifact.status == ArtifactStatus.Unobtained ? 0.5 : 1 }} background={artifact.status == ArtifactStatus.Unobtained ? "dark-2" : "dark-1"} key={aIndex} pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="medium">
                            <Box direction="row" gap="xsmall" align="center" border={{ color: 'grey-1', side: 'bottom', size: '1px' }} pad={{ bottom: '16px' }}>
                                <IconImage data={artifact.getImageData()} scale={0.9} />
                                <Text>{artifact.data.name}</Text>
                            </Box>
                            {artifact.hasCalculatedBonus() &&
                                <TextAndLabel
                                    label="BONUS"
                                    labelSize='11px'
                                    textSize='small'
                                    text={artifact.getCalculatedBonusText()}
                                />
                            }
                            <Box justify='between' fill>
                                <TextAndLabel
                                    label="BONUS TEXT"
                                    labelSize='11px'
                                    textSize='12px'
                                    text={artifact.getBonusText()}
                                />
                                <Box>
                                    <TextAndLabel
                                        label="ANCIENT BONUS"
                                        labelSize='xsmall'
                                        textSize='12px'
                                        textColor={[ArtifactStatus.Ancient, ArtifactStatus.Eldritch, ArtifactStatus.Sovereign].includes(artifact.status) ? 'green-1' : 'grey-3'}
                                        text={artifact.data.ancientBonus}
                                        margin={{ bottom: 'small' }}
                                    />
                                    <TextAndLabel
                                        label="ELDRITCH BONUS"
                                        labelSize='xsmall'
                                        textSize='12px'
                                        textColor={[ArtifactStatus.Eldritch, ArtifactStatus.Sovereign].includes(artifact.status) ? 'green-1' : 'grey-3'}
                                        text={artifact.data.eldritchBonus!}
                                        margin={{ bottom: 'small' }}
                                    />
                                    <TextAndLabel
                                        label="SOVEREIGN BONUS"
                                        labelSize='xsmall'
                                        textSize='12px'
                                        textColor={[ArtifactStatus.Sovereign].includes(artifact.status) ? 'green-1' : 'grey-3'}
                                        text={artifact.data.sovereignBonus!}
                                    />
                                </Box>
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function OverviewDisplay({silkRodeChip, starSignEquipped} : {silkRodeChip: boolean, starSignEquipped: boolean}) {
    const [sailing, setSailing] = useState<SailingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSailing(theData.get("sailing"));
    }, [theData]);

    if (!sailing) {
        return null;
    }

    return (
        <Box pad="small">
            <Box margin={{ bottom: 'xsmall' }}>
                <Text size="xsmall">* Boat values are shown ignoring captain traits, to allow comparing them without captain influence.</Text>
            </Box>
            {
                sailing.boats.map((boat, index) => (
                    <ShadowBox key={index} background="dark-1" pad="small" margin={{ bottom: 'small' }} wrap>
                        <Grid columns={["5%", "15%", "15%", "30%", "35%"]} align="center" fill>
                            <Box title={boat.assignIsland?.data.name ?? "Dock"} border={{ side: 'right', color: 'grey-3', size: '1px' }} pad={{ horizontal: 'small' }} fill align="center" justify='center'>
                                {boat.assignIsland && <IconImage data={boat.assignIsland?.getImageData()} />}
                            </Box>
                            <Box border={{ side: 'right', color: 'grey-3', size: '1px' }} pad={{ horizontal: 'small' }} fill align="center" justify='center'>
                                <Box direction="row" gap="small" align="center">
                                    <Text size="medium">{boat.index + 1}</Text>
                                    <Box>
                                        <Box direction="row" gap="xsmall" align='center'>
                                            <IconImage data={CaptainTrait.getLootImageData()} scale={0.8} />
                                            <Text size="xsmall">{nFormatter(Math.round(boat.getLootValue({ includeCaptain: false })))}</Text>
                                        </Box>
                                        <Box direction="row" gap="xsmall" align='center'>
                                            <IconImage data={CaptainTrait.getSpeedImageData()} scale={0.8} />
                                            <Text size="xsmall">{nFormatter(Math.round(boat.getSpeedValue({ starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip, includeCaptain: false })))}</Text>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box border={{ side: 'right', color: 'grey-3', size: '1px' }} pad={{ horizontal: 'small' }} fill align="center" justify='center'>
                                {boat.captain &&
                                    <Box direction="row" gap="small" align="center">
                                        <Text size="medium">{String.fromCharCode(64 + boat.captain.index + 1)}</Text>
                                        <Box pad={{ vertical: 'xsmall' }} gap="xsmall">
                                            {
                                                boat.captain.traits.map((trait, tIndex) => (
                                                    <Box direction="row" key={tIndex} gap="xsmall" align="start">
                                                        <Box title={trait.bonus.bonus}>
                                                            <IconImage data={trait.getImageData()} scale={0.8} />
                                                        </Box>
                                                        <Text size="xsmall">{trait.getBonusText(false)}</Text>
                                                    </Box>
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                }
                            </Box>
                            <Box border={{ side: 'right', color: 'grey-3', size: '1px' }} pad={{ horizontal: 'small' }} fill align="center" justify='center'>
                                Some Summary
                            </Box>
                            <Box pad={{ horizontal: 'small', bottom: 'small' }} fill align="start" direction="row" gap="medium">
                                <TextAndLabel
                                    labelSize='xsmall'
                                    right={true}
                                    textSize="small"
                                    label="Ideal dist"
                                    textColor={(boat.assignIsland?.data.distance || 0) > boat.getSpeedValue({starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip}) * (boat.minTravelTime / 60) ? 'accent-1' : ''}
                                    text={nFormatter(boat.getSpeedValue({starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip}) * (boat.minTravelTime / 60))}
                                    tooltip={
                                        <Text>This is how far the ship travels in the Minimum Travel Time, you want to target islands that have less distance than this.</Text>
                                    }
                                />
                                <TextAndLabel
                                    labelSize='xsmall'
                                    right={true}
                                    textSize="small"
                                    label="Island Distance"
                                    text={nFormatter(boat.assignIsland?.data.distance || 0)}
                                />
                                {boat.assignIsland &&
                                    <ComponentAndLabel
                                        labelSize='xsmall'
                                        label="Time till arrival"
                                        component={
                                            <TimeDown size={TimeDisplaySize.XSmall} addSeconds={((boat.assignIsland.data.distance - boat.distanceTravelled) / boat.getSpeedValue({ starSignEquipped:starSignEquipped, silkRodeEquipped:silkRodeChip, islandBound: true })) * 3600} />
                                        }
                                    />
                                }
                            </Box>

                        </Grid>
                    </ShadowBox>
                ))
            }
        </Box>
    )
}

function IslandDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSailing(theData.get("sailing"));
    }, [theData]);

    if (!sailing) {
        return null;
    }

    return (
        <Grid columns={{ size: 'small' }}>
            {
                sailing.islands.map((island, index) => (
                    <ShadowBox style={{ opacity: island.status == IslandStatus.Hidden ? 0.5 : 1 }} background={island.status == IslandStatus.Hidden ? "dark-2" : "dark-1"} margin={{ right: 'small', bottom: 'small' }} key={index} pad="small" justify='between'>
                        <Box margin={{ vertical: 'small' }}>
                            <Box direction="row" gap="xsmall">
                                <IconImage data={island.getImageData()} />
                                <Text>{island.data.name}</Text>
                            </Box>
                            <TextAndLabel margin={{ bottom: 'xsmall' }} labelSize='xsmall' textSize='12px' label="Distance" text={nFormatter(island.data.distance)} />
                            {
                                island.status == IslandStatus.Hidden &&
                                <TextAndLabel labelSize='xsmall' textSize='12px' label="Discover Req" text={`${nFormatter(island.discoverProgress)}/${nFormatter(island.data.unlockQty)}`} />
                            }
                        </Box>
                        <Box direction="row">
                            {
                                island.artifacts.map((artifact, aIndex) => (
                                    <Box key={aIndex} margin={{ right: 'small' }} border={artifact.status == ArtifactStatus.Sovereign ? { color: '#7FFFD4', side: 'all' } : artifact.status == ArtifactStatus.Eldritch ? { color: '#FFFFF0', side: 'all' } : artifact.status == ArtifactStatus.Ancient ? { color: '#FFD700', side: 'all' } : undefined} style={{ opacity: artifact.status == ArtifactStatus.Unobtained ? 0.2 : 1 }}>
                                        <TipDisplay
                                            heading={`${artifact.data.name}${artifact.status == ArtifactStatus.Sovereign ? " (Sovereign)" : artifact.status == ArtifactStatus.Eldritch ? " (Eldritch)" : artifact.status == ArtifactStatus.Ancient ? " (Ancient)" : ""}`}
                                            body={<Text>{artifact.getBonusText()}</Text>}
                                        >
                                            <IconImage data={artifact.getImageData()} />
                                        </TipDisplay>
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>
                ))
            }
        </Grid>
    )
}

function Sailing() {
    const [activeTab, setActiveTab] = useState<string>("Overview");
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEquipped, setStarSignEquipped] = useState(false);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const sailing = theData.get("sailing") as SailingDomain;


    const starSignUnlocked = useMemo(() => {
        if (sailing) {
            if (sailing.starSignInfinity) {
                setStarSignEquipped(true);
            }
            return sailing.starSignUnlocked;
        }

        return false;
    }, [theData, sailing])

    const starSignInfinity = useMemo(() => {
        if (sailing) {
            if (sailing.starSignInfinity) {
                setStarSignEquipped(true);
            }
            return sailing.starSignInfinity;
        }

        return false;
    }, [theData, sailing])

    if (!sailing) {
        return <Box>Loading</Box>
    }
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Sailing</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box direction="row" margin={{ top: 'small', bottom: 'small' }}>
                <ShadowBox>
                    <TextAndLabel
                        label="Boats"
                        text={sailing.boatsUnlocked.toString()}
                        margin={{ right: 'small' }}
                    />
                </ShadowBox>

                <TextAndLabel
                    label="Captains"
                    text={sailing.captainsUnlocked.toString()}
                    margin={{ right: 'small' }}
                />

                <TextAndLabel
                    label="Loot Pile Max"
                    text={sailing.maxChests.toString()}
                    margin={{ right: 'small' }}
                />
                <TextAndLabel
                    label="Minimum Travel Time"
                    text={`${sailing.boats.length > 0 ? Math.round(sailing.boats[0].minTravelTime) : 120} min`}
                />
            </Box>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Loot pile</Text>
                <Box direction="row" wrap>
                    {
                        sailing.loot.map((lootCount, index) => {
                            if (lootCount < 0) return null;

                            return (
                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                    <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                        <IconImage data={SailingDomain.getLootImageData(index)} scale={0.8} />
                                        <Text size="12px">{nFormatter(Math.floor(lootCount))}</Text>
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
            <Box direction='row' gap="medium" wrap>
                {
                    starSignUnlocked &&
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={starSignEquipped}
                            label="C. Shanti Minor Equipped"
                            onChange={(event) => {
                                setStarSignEquipped(event.target.checked);
                                if(!event.target.checked) {
                                    setSilkrode(false);
                                }
                            }}
                            disabled={starSignInfinity}
                        />
                        <TipDisplay
                            heading="C. Shanti Minor"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>Looks like you unlocked the C. Shanti Minor star sign</Text>
                                    {
                                        starSignInfinity ?
                                        <Text margin={{top:'xsmall'}} size='small'>You always get the star sign bonus thanks to the Infinite Stars Rift bonus</Text>
                                        :
                                        <Text margin={{top:'xsmall'}} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                    }
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                }
                {
                    starSignUnlocked &&
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={silkRodeChip}
                            label="Silkrode Nanochip Equipped"
                            onChange={(event) => setSilkrode(event.target.checked)}
                            disabled={!starSignEquipped}
                        />
                        <TipDisplay
                            heading="Silkrode Nanochip"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>You can check this checkbox to get accurate values when equipping the Silkrode Nanochip in the Lab (double star sign bonus)</Text>
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                }
            </Box>
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Overview", "Islands", "Artifacts", "Captains", "Boats"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Overview" && <OverviewDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped}/>}
            {activeTab == "Islands" && <IslandDisplay />}
            {activeTab == "Artifacts" && <ArtifactDisplay />}
            {activeTab == "Captains" && <CaptainsDisplay />}
            {activeTab == "Boats" && <ShipsDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped}/>}
        </Box>
    )
}

export default Sailing;