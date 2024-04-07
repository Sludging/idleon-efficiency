import {
    Box,
    Grid,
    Text,
} from 'grommet'
import { useState, useContext, useMemo, useEffect } from "react";
import { AppContext } from "../../../data/appContext";
import { Breeding as BreedingDomain, petArenaBonuses, waveReqs } from "../../../data/domain/breeding";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { Player } from '../../../data/domain/player';
import { ClassIndex, Talent } from '../../../data/domain/talents';
import TextAndLabel from '../../base/TextAndLabel';
import { TimeDisplaySize, TimeDown } from '../../base/TimeDisplay';

export const ArenaBonusDisplay = () => {
    const [breeding, setBreeding] = useState<BreedingDomain>();
    const [playerData, setPlayerData] = useState<Player[]>();
    const appContext = useContext(AppContext);

    const beastMasters = useMemo(() => {
        return playerData?.filter(player => (player.classId == ClassIndex.Beast_Master)) ?? [];
    }, [playerData])

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setBreeding(theData.get("breeding"));
            setPlayerData(theData.get("players"));
        }
    }, [appContext]);

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }
    return (
        <Box gap="small">
            <Box direction="row" wrap justify="center" margin={{ top: 'small' }}>
                {beastMasters && beastMasters.map((bm, index) => {
                    const [arenaTalent, cooldown] = [...bm.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 370)?.pop() as [Talent, number];
                    const realCD = cooldown - bm.afkFor;
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={bm.getClassImageData()} />
                                    <Text>{bm.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Box style={{ opacity: realCD <= 0 ? 1 : 0.5 }}>
                                        <IconImage data={arenaTalent.getImageData()} scale={0.8} />
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
            <TextAndLabel
                label="Max Arena Wave"
                text={breeding.arenaWave.toString() ?? "Unknown"}
            />
            <Grid columns="1/4" fill>
                {
                    petArenaBonuses.map((bonus, index) => (
                        <ShadowBox style={{ opacity: breeding.hasBonus(index) ? 1 : 0.5 }} background="dark-1" pad="small" key={index} margin={{ right: 'small', bottom: 'small' }}>
                            <TextAndLabel
                                center
                                label={`Wave ${waveReqs[index].toString()}`}
                                labelSize='medium'
                                textSize='xsmall'
                                text={bonus.desc}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}