import {
    Box,
    Grid,
    Stack,
    Text,
    Heading,
    Tip
} from "grommet"

import { Stamp } from '../data/domain/stamps';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { getCoinsArray, lavaFunc, nFormatter } from '../data/utility'
import CoinsDisplay from "./coinsDisplay";
import { Alchemy, AlchemyConst } from "../data/domain/alchemy";
import { Bribe, BribeConst, BribeStatus } from "../data/domain/bribes";

function StampDisplay({ stamp, index, blueFlavPercent, hasBribe }: { stamp: Stamp, index: number, blueFlavPercent: number, hasBribe: boolean }) {
    const getCardClass = () => {
        let className = `icons-${stamp.raw_name}_x1`;
        if (stamp.raw_name == "StampC5")
            className = `icons-${stamp.raw_name}`; // StampC5 isn't properly sized for some reason.
        if (stamp.raw_name == "StampA35")
            className = "icons-StampA34_x1"; // StampA35 doesn't have an image for some reason.
        return `icons ${className}`;
    }

    function TipContent({ stamp, faceLeft }: { stamp: Stamp, faceLeft: boolean }) {
        if (stamp.level == 0) {
            return <></>
        }
        return (
            <Box direction="row" align="center">
                {!faceLeft &&
                    <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                        <polygon
                            fill="white"
                            points="6 2 18 12 6 22"
                            transform="matrix(-1 0 0 1 30 0)"
                        />
                    </svg>
                }
                <Box pad="small" gap="small" background="white">
                    <Text weight="bold">{stamp.name}</Text>
                    <Text>--------------------------</Text>
                    <Text size="small">Bonus: {stamp.getBonusText()}</Text>
                    {!stamp.isMaxLevel() && <Box direction="row" gap="small"><Text size="small">Cost: </Text><CoinsDisplay coinMap={getCoinsArray(stamp.getGoldCost(hasBribe, blueFlavPercent))} /></Box>}
                    {stamp.isMaxLevel() && <Box direction="row" align="center"><Text size="small">Material Cost: {nFormatter(Math.round(stamp.getMaterialCost(blueFlavPercent)), 1)}</Text><Box style={{ width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)" }} className={`icons icons-${stamp.data.material}_x1`} /></Box>}
                </Box>
                {faceLeft &&
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
        <Box key={`stamp_${index}_${stamp.raw_name}`}>
            <Stack anchor="bottom-left" alignSelf="center">
                <Tip
                    plain
                    content={
                        <TipContent stamp={stamp} faceLeft={stamp.type == "Misc Stamp"} />
                    }
                    dropProps={{ align: stamp.type == "Misc Stamp" ? { right: 'left' } : { left: 'right' } }}
                >
                    {/* Do the opacity thing in styled components? */}
                    <Box style={{ opacity: stamp.level > 0 ? 1 : 0.2 }} className={getCardClass()} />
                </Tip>
                <Box pad={{ horizontal: 'large' }}>
                    <Text size="medium">{stamp.level}</Text>
                </Box>
            </Stack>
        </Box>
    )
}

function StampTab({ tab, index, blueFlavPercent, hasBribe }: { tab: Stamp[], index: number, blueFlavPercent: number, hasBribe: boolean }) {
    return (
        <Box>
            <h3>{tab[0].type}</h3>
            <Box background="grey" fill>
                <Grid columns="1/4" gap="none">
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

export default function StampData() {
    const [stampData, setStampData] = useState<Stamp[][]>();
    const [hasBribe, setHasBribe] = useState<BribeStatus>(BribeStatus.Available);
    const [blueFlavPercent, setBlueFlavPercent] = useState<number>(0);
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setStampData(theData.get("stamps"));

            const alchemy = theData.get("alchemy") as Alchemy;
            const blueFlavVial = alchemy.vials[AlchemyConst.BlueFlav];
            const blueFlavPower = lavaFunc(blueFlavVial.func, blueFlavVial.level, blueFlavVial.x1, blueFlavVial.x2);
            setBlueFlavPercent(blueFlavPower / 100); // divide by 100 to get the %.

            const bribes = theData.get("bribes") as Bribe[];
            setHasBribe(bribes[BribeConst.StampBribe].status);
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
        <Grid columns="1/3" gap="medium">
            {
                stampData && stampData.map((tab, index) => {
                    return (<StampTab key={`tab_${index}`} tab={tab} index={index} blueFlavPercent={blueFlavPercent} hasBribe={hasBribe == BribeStatus.Purchased} />)
                })
            }
        </Grid>
    )
}