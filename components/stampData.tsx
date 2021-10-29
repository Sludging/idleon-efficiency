import {
    Box,
    Grid,
    Heading,
    Stack,
    Text,
    Tip
} from "grommet"

import { Stamp } from '../data/domain/stamps';
import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { lavaFunc, getCoinsArray, nFormatter } from '../data/utility'
import CoinsDisplay from "./coinsDisplay";
import { stampsMap } from "../data/maps";

function StampDisplay({ stamp, index }: { stamp: Stamp, index: number }) {
    const getCardClass = () => {
        let className = `icons-${stamp.raw_name}_x1`;
        if (stamp.raw_name == "StampC5")
            className = `icons-${stamp.raw_name}`; // StampC5 isn't properly sized for some reason.
        if (stamp.raw_name == "StampA35")
            className = "icons-StampA34_x1"; // StampA35 doesn't have an image for some reason.
        return `icons ${className}`;
    }

    function TipContent({ stamp }: { stamp: Stamp }) {
        const goldCost = stamp.data.startingCost * Math.pow(stamp.data.cCostExp - (stamp.level / (stamp.level + 5 * stamp.data.upgradeInterval)) * 0.25, stamp.level * (10 / stamp.data.upgradeInterval));
        const materialCost = stamp.data.startV * Math.pow(stamp.data.mCostExp, Math.pow(Math.round(stamp.level / stamp.data.upgradeInterval) - 1, 0.8));
        const bonus = lavaFunc(stamp.data.function, stamp.level, stamp.data.x1, stamp.data.x2).toString() + stamp.bonus;
        const mainText = stamp.name == "FILLER" ? "Nothing to see here! Filler content." : bonus;
        const coinMap = getCoinsArray(goldCost);

        if (stamp.level == 0) {
            return <></>
        }
        return (
            <Box direction="row" align="center">
                <svg viewBox="0 0 22 22" version="1.1" width="22px" height="22px">
                    <polygon
                        fill="white"
                        points="6 2 18 12 6 22"
                        transform="matrix(-1 0 0 1 30 0)"
                    />
                </svg>
                <Box pad="small" gap="small" background="white">
                    <Text weight="bold">{stamp.name}</Text>
                    <Text>--------------------------</Text>
                    <Text weight="bold">Boost: {mainText}</Text>
                    {stamp.level < stamp.maxLevel && <Text weight="bold">Cost: <CoinsDisplay coinMap={coinMap} /></Text>}
                    {stamp.level == stamp.maxLevel && <Box direction="row" align="center"><Text weight="bold">Material Cost: {nFormatter(Math.round(materialCost), 1)}</Text><Box style={{ width: "36px", height: "36px", backgroundPosition: "0 calc(var(--row) * -36px)" }} className={`icons icons-${stamp.data.material}_x1`} /></Box>}
                </Box>
            </Box>
        )
    }

    return (
        <Box key={`stamp_${index}_${stamp.raw_name}`} background="grey">
            <Stack anchor="bottom-left" alignSelf="center">
                <Tip
                    plain
                    content={
                        <TipContent stamp={stamp} />
                    }
                    dropProps={{ align: { left: 'right' } }}
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

function StampTab({ tab, index }: { tab: Stamp[], index: number }) {
    return (
        <Box>
            <h3>Tab #{index}</h3>
            <Box background="grey">
                <Grid columns="1/4" gap="none" >
                    {
                        tab.map((stamp: Stamp) => {
                            if (stamp != undefined) {
                                return (
                                    <StampDisplay key={`tab_${index}_${stamp.raw_name}`} stamp={stamp} index={index} />
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
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setStampData(theData.get("stamps"));
        }
    }, [idleonData])
    return (
        <Grid columns="1/3" gap="medium">
            {
                stampData && stampData.map((tab, index) => {
                    return (<StampTab key={`tab_${index}`} tab={tab} index={index} />)
                })
            }
        </Grid>
    )
}