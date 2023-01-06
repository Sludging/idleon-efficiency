import {
    Box,
    CheckBox,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';

import TabButton from '../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import TipDisplay from '../../components/base/TipDisplay';
import { AppContext } from '../../data/appContext';
import { BoatUpgradeType, IslandStatus, Sailing as SailingDomain } from '../../data/domain/sailing';
import { ArtifactStatus } from '../../data/domain/sailing/artifacts';
import { nFormatter } from '../../data/utility';

function ShipsDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));

        }
    }, [appContext]);

    if (!sailing) {
        return null;
    }

    return (
        <Box gap="medium">
            <Grid columns={{ size: 'small' }}>
                {
                    sailing.boats.map((boat, index) => (
                        <ShadowBox background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                            <Text size="small">Ship {index + 1}</Text>
                            <Box direction="row" gap="small">
                                <TextAndLabel
                                    label="Level"
                                    labelSize='xsmall'
                                    textSize='xsmall'
                                    text={(boat.lootUpgrades + boat.speedUpgrades).toString()}
                                />
                            </Box>
                            <Box gap="small">
                                <ComponentAndLabel
                                    label="Loot Upgrade"
                                    component={
                                        <Box direction="row" gap="xsmall" align="center">
                                            <IconImage data={SailingDomain.getLootImageData(boat.getLootUpgradeType())} />
                                            <Text size="xsmall">{nFormatter(boat.getUpgradeCost(BoatUpgradeType.Loot))}</Text>
                                        </Box>
                                    }
                                />
                                <ComponentAndLabel
                                    label="Speed Upgrade"
                                    component={
                                        <Box direction="row" gap="xsmall" align="center">
                                            <IconImage data={SailingDomain.getLootImageData(boat.getSpeedUpgradeType())} />
                                            <Text size="xsmall">{nFormatter(boat.getUpgradeCost(BoatUpgradeType.Speed))}</Text>
                                        </Box>
                                    }
                                />
                                <TextAndLabel label="Loot Value" text={nFormatter(Math.round(boat.getLootValue()))} />
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
};

function CaptainsDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));

        }
    }, [appContext]);

    if (!sailing) {
        return null;
    }

    return (
        <Box gap="medium">
            <Grid columns={{ size: 'small' }}>
                {
                    sailing.captains.map((captain, index) => (
                        <ShadowBox background="dark-1" key={index} pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
                            <Text size="small">Captain {index + 1}</Text>
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
            </Grid>
        </Box>
    )
};

function ArtifactDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const [hideUnobtained, setHideUnobtained] = useState(false);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));
        }
    }, [appContext]);

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
                                <TextAndLabel
                                    label="ANCIENT BONUS"
                                    labelSize='xsmall'
                                    textSize='12px'
                                    textColor={artifact.status == ArtifactStatus.Ancient ? 'green-1' : 'grey-3'}
                                    text={artifact.data.ancientBonus}
                                />
                            </Box>
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function IslandDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));
        }
    }, [appContext]);

    if (!sailing) {
        return null;
    }

    return (
        <Grid columns={{ size: 'small' }}>
            {
                sailing.islands.map((island, index) => (
                    <ShadowBox style={{ opacity: island.status == IslandStatus.Hidden ? 0.5 : 1 }} background={island.status == IslandStatus.Hidden ? "dark-2" : "dark-1"} margin={{ right: 'small', bottom: 'small' }} key={index} pad="small">
                        <Box margin={{ vertical: 'small' }}>
                            <Text>{island.data.name}</Text>
                            {
                                island.status == IslandStatus.Hidden &&
                                <Text size="12px">{nFormatter(island.discoverProgress)}/{nFormatter(island.data.unlockQty)}</Text>
                            }
                        </Box>
                        <Box direction="row">
                            {
                                island.artifacts.map((artifact, aIndex) => (
                                    <Box key={aIndex} margin={{ right: 'small' }} border={artifact.status == ArtifactStatus.Ancient ? { color: 'green-1', side: 'all' } : undefined} style={{ opacity: artifact.status == ArtifactStatus.Unobtained ? 0.2 : 1 }}>
                                        <TipDisplay
                                            heading={`${artifact.data.name}${artifact.status == ArtifactStatus.Ancient ? " (Ancient)" : ""}`}
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
    const [activeTab, setActiveTab] = useState<string>("Islands");
    const [sailing, setSailing] = useState<SailingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));
        }
    }, [appContext]);

    if (!sailing) {
        return <Box>Loading</Box>
    }
    return (
        <Box>
            <NextSeo title="Sailing" />
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
                />
            </Box>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Loot pile</Text>
                <Box direction="row" wrap>
                    {
                        sailing.loot.filter(lootCount => lootCount > 0).map((lootCount, index) => (
                            <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                    <IconImage data={SailingDomain.getLootImageData(index)} scale={0.8} />
                                    <Text size="12px">{nFormatter(Math.floor(lootCount))}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Islands", "Artifacts", "Captains", "Boats"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Islands" && <IslandDisplay />}
            {activeTab == "Artifacts" && <ArtifactDisplay />}
            {activeTab == "Captains" && <CaptainsDisplay />}
            {activeTab == "Boats" && <ShipsDisplay />}
        </Box>
    )
}

export default Sailing;