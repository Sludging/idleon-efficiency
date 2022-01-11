import {
    Box,
    Grid,
    Stack,
    Text,
    Heading,
    Tip,
    ResponsiveContext
} from "grommet"

import { Stamp } from '../data/domain/stamps';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { getCoinsArray, lavaFunc, nFormatter, round } from '../data/utility'
import CoinsDisplay from "../components/coinsDisplay";
import { Alchemy, AlchemyConst } from "../data/domain/alchemy";
import { Bribe, BribeConst, BribeStatus } from "../data/domain/bribes";
import styled from 'styled-components'
import { NextSeo } from 'next-seo';

const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
`

function StampDisplay({ stamp, index, blueFlavPercent, hasBribe }: { stamp: Stamp, index: number, blueFlavPercent: number, hasBribe: boolean }) {
    const size = useContext(ResponsiveContext)
    const getCardClass = () => {
        let className = `icons-${stamp.raw_name}_x1`;
        if (stamp.raw_name == "StampA35")
            className = "icons-StampA34_x1"; // StampA35 doesn't have an image for some reason.
        return `icons-3636 ${className}`;
    }

    function TipContent({ stamp, faceLeft }: { stamp: Stamp, faceLeft: boolean }) {
        if (stamp.level == 0) {
            return <></>
        }
        return (
            <Box direction="row" align="center" overflow="hidden">
                {!faceLeft && size != "small" &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="6 2 18 12 6 22"
                            transform="matrix(-1 0 0 1 30 0)"
                        />
                    </svg>
            }
                <Box pad="small" gap="small" background="white">
                    <Text size={size == "small" ? 'small' : ''} weight="bold">{stamp.name} ({stamp.level})</Text>
                    <hr style={{ width: "100%"}} />
                    <Text size="small">Bonus: {stamp.getBonusText()}</Text>
                    {stamp.isMaxLevel() && <Box direction="row" align="center"><Text size="small">Material Cost: {nFormatter(stamp.getMaterialCost(blueFlavPercent))}</Text><Box width={{max: '36px', min: '36px'}} fill><Box className={`icons-7272 icons-${stamp.data.material}`} /></Box></Box>}
                    <Box direction="row" gap="small"><Text size="small">Cost: </Text><CoinsDisplay coinMap={getCoinsArray(stamp.getGoldCost(hasBribe, blueFlavPercent))} /></Box>
                </Box>
                {faceLeft && size != "small" &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="0 2 12 12 0 22"
                        />
                    </svg>
                }
            </Box>
        )
    }

    return (
        <Box pad="small" border={{color: 'grey-1'}} key={`stamp_${index}_${stamp.raw_name}`}>
                <Tip
                    plain
                    content={
                        <TipContent stamp={stamp} faceLeft={stamp.type == "Misc Stamp"} />
                    }
                    dropProps={{ align: size == "small" ? { top: 'bottom' } : stamp.type == "Misc Stamp" ? { right: 'left' } : { left: 'right' } }}
                >
                    {/* Do the opacity thing in styled components? */}
                    <Box direction="row" fill align="center">
                        <Box align="center" width={{max: '50px'}} fill>
                            <Box style={{ opacity: stamp.level > 0 ? 1 : 0.2 }} className={getCardClass()}/>
                        </Box>
                        <Box>
                            <Text size="medium">{stamp.level}</Text>
                        </Box>
                    </Box>
                </Tip>
        </Box>
    )
}

function StampTab({ tab, index, blueFlavPercent, hasBribe }: { tab: Stamp[], index: number, blueFlavPercent: number, hasBribe: boolean }) {
    return (
        <Box pad="medium">
            <h3>{tab[0].type}</h3>
            <Box fill>
                <Grid columns={{ count: 4, size: "auto"}} gap="none">
                    {
                        tab.map((stamp: Stamp) => {
                            if (stamp != undefined) {
                                return (
                                    <StampDisplay key={`tab_${index}_${stamp.raw_name}`} stamp={stamp} index={index} blueFlavPercent={blueFlavPercent} hasBribe={hasBribe} />
                                )
                            }
                        })
                    }
                </Grid>
            </Box>
        </Box>
    )
}

function Stamps() {
    const [stampData, setStampData] = useState<Stamp[][]>();
    const [hasBribe, setHasBribe] = useState<BribeStatus>(BribeStatus.Available);
    const [blueFlavPercent, setBlueFlavPercent] = useState<number>(0);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData.getData().size > 0) {
            const theData = idleonData.getData();
            setStampData(theData.get("stamps"));

            const alchemy = theData.get("alchemy") as Alchemy;
            const blueFlavPower = alchemy?.vials[AlchemyConst.BlueFlav].getBonus() ?? 0;
            setBlueFlavPercent(blueFlavPower / 100); // divide by 100 to get the %.

            const bribes = theData.get("bribes") as Bribe[];
            if (bribes) {
                setHasBribe(bribes[BribeConst.StampBribe].status);
            }
        }
    }, [idleonData, stampData])

    if (stampData && stampData.flatMap(tab => tab).filter(stamp => stamp.level > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }
    return (
        <Box>
            <NextSeo title="Stamps" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Stamps</Heading>
            <ShadowBox flex={false} background="dark-1" pad="small">
                <Grid columns={{ size: '300px'}} gap="medium">
                    {
                        stampData && stampData.map((tab, index) => {
                            return (<StampTab key={`tab_${index}`} tab={tab} index={index} blueFlavPercent={blueFlavPercent} hasBribe={hasBribe == BribeStatus.Purchased} />)
                        })
                    }
                </Grid>
            </ShadowBox>
        </Box>
    )
}

export default Stamps;