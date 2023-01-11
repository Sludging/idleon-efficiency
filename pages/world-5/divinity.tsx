import {
    Box,
    Grid,
    Heading,
    ResponsiveContext,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import TabButton from '../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { AppContext } from '../../data/appContext';
import { Divinity as DivinityDomain, PlayerDivinityInfo } from '../../data/domain/divinity';
import { Activity, Player } from '../../data/domain/player';
import { Skilling } from '../../data/domain/skilling';
import { SkillsIndex } from '../../data/domain/SkillsIndex';

function AlignmentDisplay() {
    const [divinity, setDivinity] = useState<DivinityDomain>();
    const [playerData, setPlayers] = useState<Player[]>([]);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setDivinity(theData.get("divinity"));
            setPlayers(theData.get("players"));
        }
    }, [appContext]);

    if (!divinity) {
        return (
            <Box>Still loading or error occured.</Box>
        )
    }

    return (
        <Grid columns={{ size: 'small' }}>
            {playerData && playerData.map((player, index) => {
                if (player.getActivityType() != Activity.Divinity) {
                    return null;
                }
                return (
                    <ShadowBox key={index} background="dark-1" pad="medium" align="start" margin={{ right: 'medium', bottom: 'small' }}>
                        <Box gap="small">
                            <Box direction="row" gap="xsmall" align="center">
                                <IconImage data={player.getClassImageData()} scale={0.8} />
                                <Text size="small">{player.playerName}</Text>
                            </Box>
                            <Box justify="between" wrap>
                                <ComponentAndLabel
                                    label="Level"
                                    component={
                                        <Box direction="row" gap="xsmall" align="center">
                                            <IconImage data={Skilling.getSkillImageData(SkillsIndex.Divinity)} scale={0.5} />
                                            <Text>{player.skills.get(SkillsIndex.Divinity)?.level.toString() ?? "0"}</Text>
                                        </Box>
                                    }
                                    margin={{ bottom: 'small', right: 'small' }}
                                />
                                <TextAndLabel
                                    label="Style"
                                    text={divinity.playerInfo[player.playerID]?.style.name ?? "Not Linked"}
                                    margin={{ bottom: 'small', right: 'small' }}
                                />
                                <ComponentAndLabel
                                    label="God"
                                    component={
                                        <Box direction="row" gap="xsmall" align="center">
                                            <IconImage data={divinity.playerInfo[player.playerID].god.getImageData()} scale={0.3} />
                                            <Text>{divinity.playerInfo[player.playerID]?.god?.data.name ?? "Not Linked"}</Text>
                                        </Box>
                                    }
                                    margin={{ bottom: 'small', right: 'small' }}
                                />
                            </Box>
                        </Box>
                    </ShadowBox>
                )
            })
            }
        </Grid>
    )
};

function GodDisplay() {
    const [divinity, setDivinity] = useState<DivinityDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setDivinity(theData.get("divinity"));
        }
    }, [appContext]);

    return (
        <Box margin={{ top: 'small' }}>
            {
                divinity && divinity.gods.map((god, index) => {
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" direction="row" wrap margin={{ bottom: 'small', right: 'small' }} justify="between">
                            <Grid columns={{ count: 5, size: 'auto' }}>
                                <Box margin={{ bottom: 'small', right: 'small' }} direction="row" gap="xsmall" align="center">
                                    <IconImage data={god.getImageData()} scale={0.5} />
                                    <TextAndLabel textSize='small' text={god.data.name} label="Name" />
                                </Box>
                                <Box margin={{ bottom: 'small', right: 'small' }}>
                                    <TextAndLabel textSize='small' text={god.data.majorBonus} label="Link Bonus" />
                                </Box>
                                <Box margin={{ bottom: 'small', right: 'small' }}>
                                    <TextAndLabel textSize='small' text={god.data.passiveBonus} label="Passive Bonus" />
                                </Box>
                                <Box margin={{ bottom: 'small', right: 'small' }}>
                                    <TextAndLabel textSize='small' text={`${god.blessLevel}/100`} label="Blessing Level" />
                                </Box>
                                <Box margin={{ bottom: 'small', right: 'small' }}>
                                    <TextAndLabel textSize='small' text={god.getBlessingBonusText()} label="Blessing Bonus" />
                                </Box>
                            </Grid>
                        </ShadowBox>
                    )
                })
            }
        </Box>
    )
}

function Divinity() {
    const [activeTab, setActiveTab] = useState<string>("Gods");

    return (
        <Box>
            <NextSeo title="Divinity" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Divinity</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies.</Text>
            <Box align="center" direction="row" justify="center" gap="small" margin={{ bottom: 'small' }}>
                {["Gods", "Alignment"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Gods" && <GodDisplay />}
            {activeTab == "Alignment" && <AlignmentDisplay />}
        </Box>
    )
}

export default Divinity;