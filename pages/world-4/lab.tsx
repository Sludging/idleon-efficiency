import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import TabButton from '../../components/base/TabButton';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import { AppContext } from '../../data/appContext';
import { Chip, Lab as LabDomain } from '../../data/domain/lab';
import { Player } from '../../data/domain/player';
import { SkillsIndex } from "../../data/domain/SkillsIndex";
import { CharacterBox } from '../../components/base/CharacterBox';

function CharacterBoxOld({ player, lineWidth, supped = false }: { player: Player, lineWidth: string, supped?: boolean }) {
    const theBox = (
        <Box background="dark-2" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall" direction="row" border={{ size: '1px', color: supped ? 'green-1' : 'grey-1' }}>
            <IconImage data={player.getClassImageData()} scale={0.6} />
            <Box margin={{ right: 'small' }} align="center">
                <Text size="small" truncate={true}>{player.playerName}</Text>
            </Box>
            <Box direction="row">
                <Box pad={{ right: 'small' }} margin={{ right: 'small' }} direction="row" border={{ side: 'right', color: 'grey-1' }} align="center">
                    <Box width={{ max: '15px' }} margin={{ right: 'xsmall' }}>
                        <IconImage data={{ location: 'ClassIcons53', height: 36, width: 38 }} scale={0.4} />
                    </Box>
                    <Text size="small" truncate={true}>{player.skills.get(SkillsIndex.Intellect)?.level}</Text>
                </Box>
                <Box>
                    <Text size="small" truncate={true}>{lineWidth}px</Text>
                </Box>
            </Box>
        </Box>
    )

    if (player.labInfo.chips.filter(slot => slot.chip != undefined).length > 0) {
        return (
            <TipDisplay
                body={
                    <Box gap="small">
                        {
                            player.labInfo.chips.filter(slot => slot.chip != undefined).map((slot, index) => (
                                <Box key={index} direction="row" gap="small">
                                    <IconImage data={(slot.chip as Chip).getImageData()} />
                                    <Text>{slot.chip?.data.description}</Text>
                                </Box>
                            ))
                        }
                    </Box>
                }
                direction={TipDirection.Down}
                heading='Chips'
                size='small'
            >
                {theBox}
            </TipDisplay>
        )
    }

    return theBox;
}

function MainframeDisplay() {
    const [lab, setLab] = useState<LabDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setLab(theData.get("lab"));
        }
    }, [appContext]);

    if (!lab) {
        return <Box>Loading</Box>;
    }

    return (
        <Box>
            <Box pad="small">
                <Text>Players in tubes</Text>
                <Grid columns={{ size: 'auto', count: 8 }} pad={{ top: "small", bottom: "small" }}>
                    {
                        lab?.playersInTubes?.map((player, index) => (
                            <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                <CharacterBox
                                    player={player}
                                    borderColor={player.labInfo.supped ? 'green-1' : 'grey-1'}>
                                    <Box direction="row" margin={{ top: 'xsmall' }} justify="center">
                                        <Box pad={{ right: 'small' }} margin={{ right: 'small' }} direction="row" border={{ side: 'right', color: 'grey-1' }} align="center">
                                            <Box width={{ max: '15px' }} margin={{ right: 'xsmall' }}>
                                                <IconImage data={{ location: 'ClassIcons53', height: 36, width: 38 }} scale={0.4} />
                                            </Box>
                                            <Text size="small" truncate={true}>{player.skills.get(SkillsIndex.Intellect)?.level}</Text>
                                        </Box>
                                        <Box>
                                            <Text size="small" truncate={true}>{player.labInfo.lineWidth.toString()}px</Text>
                                        </Box>
                                    </Box>
                                </CharacterBox>
                            </Box>
                        ))
                    }
                </Grid>
            </Box>
            <Text size="xsmall">* Green border means active, low opacity means not obtained yet.</Text>
            <Box pad="small" gap="small">
                <Text>Bonuses</Text>
                <Box gap="small" direction="row" wrap>
                    {
                        lab && lab.bonuses.sort((bonus1, bonus2) => bonus1.x < bonus2.x ? -1 : 1).map((bonus, index) => {
                            return (
                                <TipDisplay
                                    key={index}
                                    body={bonus.getBonusText()}
                                    direction={TipDirection.Down}
                                    size='small'
                                    maxWidth='large'
                                    heading={bonus.name}
                                >
                                    <ShadowBox background="dark-1" pad="small" key={index} margin={{ right: 'small', bottom: 'small' }} border={bonus.active ? { side: 'all', size: '2px', color: 'green-1' } : undefined}>
                                        <Box title={bonus.name}>
                                            <IconImage data={bonus.getImageData()} />
                                        </Box>
                                    </ShadowBox>
                                </TipDisplay>
                            )
                        })
                    }
                </Box>
            </Box>

            <Box pad="small" gap="small">
                <Text>Jewels</Text>
                <Box gap="small" direction="row" wrap>
                    {
                        lab && lab.jewels.sort((jewel1, jewel2) => jewel1.data.x < jewel2.data.x ? -1 : 1).map((jewel, index) => {
                            return (
                                <Box key={index} margin={{ right: 'small', bottom: 'small' }} >
                                    <TipDisplay
                                        body={jewel.getBonusText()}
                                        direction={TipDirection.Down}
                                        size='small'
                                        maxWidth='large'
                                        heading={jewel.data.name}
                                    >
                                        <ShadowBox background="dark-1" pad="small" border={jewel.active ? { side: 'all', size: '2px', color: 'green-1' } : undefined} >
                                            <Box title={jewel.data.name} style={{ opacity: jewel.available ? 1 : 0.5, filter: jewel.available ? 'grayscale(0)' : 'grayscale(70%)' }}>
                                                <IconImage data={jewel.getImageData()} />
                                            </Box>
                                        </ShadowBox>
                                    </TipDisplay>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

function ChipDisplay() {
    const [lab, setLab] = useState<LabDomain>();
    const [playersData, setPlayersData] = useState<Player[]>([]);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setLab(theData.get("lab"));
            setPlayersData(theData.get("players"));
        }
    }, [appContext]);

    if (!lab) {
        return <Box>Loading</Box>;
    }

    return (
        <Box>
            <Box pad={{ top: "small", bottom: "small" }}>
                <Grid columns={{ size: '120px' }}>
                    {
                        Object.entries(lab.playerChips).map(([playerNumber, chips], index) => {
                            const playerId = parseInt(playerNumber);
                            if (playerId >= playersData.length) {
                                return null;
                            }
                            const player = playersData[playerId];
                            return (
                                <ShadowBox background="dark-1" pad="small" key={index} margin={{ right: 'small', bottom: 'small' }} align="center" gap="small">
                                    <Box direction="row" gap="small" align="center">
                                        <IconImage data={player.getClassImageData()} scale={0.5} />
                                        <Text size="12px" truncate={true}>{player.playerName}</Text>
                                    </Box>
                                    <Box>
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
                                                            </TipDisplay> :
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
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </Box>
            <Box pad={{ top: "small", bottom: "small" }}>
                <Text>Chip Repository</Text>
                <Grid columns={{ size: 'auto', count: 7 }}>
                    {
                        lab.chips.map((chip, index) => (
                            <TipDisplay
                                key={index}
                                heading={chip.data.name}
                                // body={
                                //     <Box gap="small">
                                //         Bonus: {chip.getBonusText()}
                                //         <Text weight='bold'>Cost:</Text>
                                //         {
                                //             chip.data.requirements.map((req, index) => (
                                //                 <Text key={index}>{req.item}: {req.quantity}</Text>
                                //             ))
                                //         }
                                //     </Box>}
                                body={chip.getBonusText()}
                                direction={TipDirection.Up}
                                size='medium'

                            >
                                <Box style={{ opacity: chip.count == -1 ? 0.5 : 1 }} border={{ color: 'grey-1', side: 'all', size: '2px' }} align="center" justify='center' direction="row">
                                    <IconImage data={chip.getImageData()} />
                                    <Text>{chip.count == -1 ? 0 : chip.count}</Text>
                                </Box>
                            </TipDisplay>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

function Lab() {
    const [activeTab, setActiveTab] = useState<string>("Mainframe");

    return (
        <Box>
            <NextSeo title="Lab" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Lab</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies.</Text>
            <Box align="center" direction="row" justify="center" gap="small">
                {["Mainframe", "Console"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Mainframe" && <MainframeDisplay />}
            {activeTab == "Console" && <ChipDisplay />}
        </Box>
    )
}

export default Lab;