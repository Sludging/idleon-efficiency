import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';

import TabButton from '../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import TipDisplay from '../../components/base/TipDisplay';
import { AppContext } from '../../data/appContext';
import { ArtifactStatus, Sailing as SailingDomain } from '../../data/domain/sailing';
import { nFormatter } from '../../data/utility';

function CrewDisplay() {
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
        <Grid columns={{size: 'small'}}>
            {
                sailing.captains.map((captain, index) => (
                    <ShadowBox key={index} pad="medium" margin={{ right: 'small', bottom: 'small' }} gap="xsmall">
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
                        <hr style={{ width: "100%" }} />
                        <Box direction="row" gap="small">
                            {
                                captain.traits.map((trait, tIndex) => (
                                    <TextAndLabel 
                                        textSize='xsmall'
                                        labelSize='xsmall'
                                        label={`Trait ${tIndex + 1}`}
                                        text={`${trait.getBonusText()} (${trait.baseValue})`}
                                        key={tIndex} 
                                    />
                                ))
                            }
                        </Box>
                    </ShadowBox>
                ))
            }
        </Grid>
    )
};

function IslandDisplay() {
    const [sailing, setSailing] = useState<SailingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setSailing(theData.get("sailing"));
        }
    }, [appContext]);

    return (
        <Grid columns={{ size: 'small' }}>
            {
                sailing && sailing.islands.map((island, index) => (
                    <ShadowBox key={index} pad="small">
                        <Box margin={{ vertical: 'small' }}>
                            <Text>{island.data.name}</Text>
                        </Box>
                        <Box direction="row">
                            {
                                island.artifacts.map((artifact, aIndex) => (
                                    <Box key={aIndex} margin={{ right: 'small' }} border={{color: 'green-1', side: artifact.status == ArtifactStatus.Ancient ? 'all' : 'between'}} style={{ opacity: artifact.status == ArtifactStatus.Unobtained ? 0.2 : 1 }}>
                                        <TipDisplay
                                            heading={`${artifact.data.name}${artifact.status == ArtifactStatus.Ancient ? " (Ancient)" : ""}`}
                                            body={<Text>{artifact.data.bonus}</Text>}
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
            <Box direction="row" margin={{ top: 'small' }}>
                <ShadowBox>
                    <TextAndLabel
                        label="Ships"
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
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Islands", "Crew"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Islands" && <IslandDisplay />}
            {activeTab == "Crew" && <CrewDisplay />}
        </Box>
    )
}

export default Sailing;