import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import ShadowBox from '../../components/base/ShadowBox';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import { AppContext } from '../../data/appContext';
import { Lab as LabDomain } from '../../data/domain/lab';
import { Player, SkillsIndex } from '../../data/domain/player';

function CharacterBox({ player, lineWidth, supped = false }: { player: Player, lineWidth: string, supped?: boolean }) {
    const theBox = (
        <Box background="dark-2" align="center" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} gap="xsmall" direction="row" border={{ size: '1px', color: supped ? 'green-1' : 'grey-1' }}>
            <Box width={{ min: "20px", max: '20px' }}>
                <Box className={`icons-3836 icons-ClassIcons${player.classId.valueOf()}`} />
            </Box>
            <Box margin={{ right: 'small' }} align="center">
                <Text size="small" truncate={true}>{player.playerName}</Text>
            </Box>
            <Box direction="row">
                <Box pad={{ right: 'small' }} margin={{ right: 'small' }} direction="row" border={{ side: 'right', color: 'grey-1' }} align="center">
                    <Box width={{ max: '15px' }} margin={{ right: 'xsmall' }}>
                        <Box className='icons-3836 icons-ClassIcons53' />
                    </Box>
                    <Text size="small" truncate={true}>{player.skills.get(SkillsIndex.Intellect)?.level}</Text>
                </Box>
                <Box>
                    <Text size="small" truncate={true}>{lineWidth}px</Text>
                </Box>
            </Box>
        </Box>
    )

    if (player.labInfo.chips.length > 0) {
        return (
            <TipDisplay
                body={
                    <Box gap="small">
                        {
                            player.labInfo.chips.map((chip, index) => (
                                <Box key={index} direction="row" gap="small">
                                    <Box width={{max: '42px'}}>
                                        <Box className={chip.getClass()} />
                                    </Box>
                                    <Text>{chip.data.description}</Text>
                                </Box>
                            ))
                        }
                    </Box>
                }
                direction={TipDirection.Down}
                heading='Chips'
                size='small'
                >
                { theBox}
            </TipDisplay>
        )
    }

    return theBox;
}

function Lab() {
    const [lab, setLab] = useState<LabDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setLab(theData.get("lab"));
        }
    }, [appContext]);

    return (
        <Box>
            <NextSeo title="Lab" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Lab</Heading>
            <Box pad="small">
                <Text>Players in tubes</Text>
                <Box pad={{ top: "small", bottom: "small" }} fill direction="row" wrap>
                    {
                        lab?.playersInTubes?.map((player, index) => (
                            <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                <CharacterBox player={player} lineWidth={player.labInfo.lineWidth.toString()} supped={player.labInfo.supped} />
                            </Box>
                        ))
                    }
                </Box>
            </Box>
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
                                    <ShadowBox background="dark-1" pad="small" key={index} margin={{ right: 'small', bottom: 'small' }}>
                                        <Box width={{ max: '64px' }} title={bonus.name} style={{ opacity: bonus.active ? 1 : 0.5 }}>
                                            <Box className={bonus.getClass()} />
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
                        lab && lab.jewels.sort((jewel1, jewel2) => jewel1.data.x < jewel2.data.y ? -1 : 1).map((jewel, index) => {
                            return (
                                <TipDisplay
                                    key={index}
                                    body={jewel.getBonusText()}
                                    direction={TipDirection.Down}
                                    size='small'
                                    maxWidth='large'
                                    heading={jewel.data.name}
                                >
                                    <ShadowBox background="dark-1" pad="small" margin={{ right: 'small', bottom: 'small' }} border={jewel.available ? { side: 'all', size: '2px', color: 'green-1' } : undefined} >
                                        <Box width={{ max: '64px' }} title={jewel.data.name} style={{ opacity: jewel.active ? 1 : 0.5 }}>
                                            <Box className={jewel.getClass()} />
                                        </Box>
                                    </ShadowBox>
                                </TipDisplay>
                            )
                        })
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Lab;