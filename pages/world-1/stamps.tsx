import {
    Box,
    Grid,
    Text,
    Heading,
    ResponsiveContext
} from "grommet"

import { Stamp } from '../../data/domain/stamps';
import { useEffect, useState, useContext, useMemo } from 'react';
import { AppContext } from '../../data/appContext';
import { getCoinsArray, nFormatter } from '../../data/utility'
import CoinsDisplay from "../../components/coinsDisplay";
import styled from 'styled-components'
import { NextSeo } from 'next-seo';
import { Item } from "../../data/domain/items";
import ItemSourcesDisplay from "../../components/base/ItemSourceDisplay";
import TipDisplay, { TipDirection } from "../../components/base/TipDisplay";
import IconImage from "../../components/base/IconImage";
import TextAndLabel from "../../components/base/TextAndLabel";
import { AtomCollider } from "../../data/domain/atomCollider";

const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
`

function StampDisplay({ stamp, index }: { stamp: Stamp, index: number }) {
    const size = useContext(ResponsiveContext)
    const appContext = useContext(AppContext);
    const theData = appContext.data.getData();
    const allItems = theData.get("itemsData") as Item[];
    const stampItem = allItems.find(item => item.internalName == stamp.raw_name);

    function TipContent({ stamp, faceLeft }: { stamp: Stamp, faceLeft: boolean }) {
        if (stamp.level == 0) {
            if (stampItem && stampItem.sources.sources && stampItem.sources.sources.length > 0) {
                return <Box>
                    <Text size="small">Bonus: {stamp.getBonusText()}</Text>
                    <ItemSourcesDisplay sources={stampItem.sources} />
                </Box>
            }
            else {
                return <Box>Unobtainable</Box>
            }
        }
        return (
            <Box gap="small">
                <Text size="small">Bonus: {stamp.getBonusText()}</Text>
                {stamp.isMaxLevel() && <Box direction="row" align="center"><Text size="small">Material Cost: {nFormatter(stamp.getMaterialCost())}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} /></Box>}
                <Box direction="row" gap="small"><Text size="small">Cost: </Text><CoinsDisplay coinMap={getCoinsArray(stamp.getGoldCost())} maxCoins={3} /></Box>
                <Box direction="row" gap="small"><Text size="small">Cost to next tier: </Text><CoinsDisplay coinMap={getCoinsArray(stamp.getGoldCostToMax())} maxCoins={3} /></Box>
            </Box>
        )
    }

    return (
        <Box pad="small" border={{ color: 'grey-1' }} key={`stamp_${index}_${stamp.raw_name}`}>
            <TipDisplay
                body={
                    <TipContent stamp={stamp} faceLeft={stamp.type == "Misc Stamp"} />
                }
                heading={`${stamp.name} (${stamp.level}/${stamp.maxLevel})`}
                direction={size == "small" ? TipDirection.Down : stamp.type == "Misc Stamp" ? TipDirection.Left : TipDirection.Right}
                size="medium"
                visibility={stamp.name == "Blank" || stamp.name == "FILLER" ? 'none' : undefined}
            >
                <Box direction="row" align="center" gap="xsmall" style={{ opacity: stamp.level > 0 ? 1 : 0.2 }}>
                    <IconImage data={stamp.getImageData()} scale={0.4} />
                    <Text size="small">{stamp.level}</Text>
                </Box>
            </TipDisplay>
        </Box>
    )
}

function StampTab({ tab, index }: { tab: Stamp[], index: number }) {
    const tabLevel = tab.reduce((sum, stamp) => sum += stamp.level, 0);
    return (
        <Box pad="small">
            <Box margin={{ bottom: 'small' }}>
                <Text size="small">{tab[0].type.replace("Stamp", "")} ({tabLevel}) </Text>
            </Box>
            <Box fill>
                <Grid columns={{ count: 4, size: "auto" }} gap="none">
                    {
                        tab.filter(stamp => stamp.name != "FILLER").map((stamp: Stamp) => {
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

function Stamps() {
    const [stampData, setStampData] = useState<Stamp[][]>();
    const appContext = useContext(AppContext);

    const hasHydrogen = useMemo(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            const collider = theData.get("collider") as AtomCollider;
            return collider.atoms[0].level > 0;
        }
        return false;
    }, [appContext])

    useEffect(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            setStampData(theData.get("stamps"));
        }
    }, [appContext, stampData])

    const totalLevels = useMemo(() => {
        return stampData?.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.level, 0) ?? 0;
    }, [stampData])

    if (stampData && stampData.flatMap(tab => tab).filter(stamp => stamp.level > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

    if (!stampData) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Loading or something is wrong!</Heading>
            </Box>
        )
    }

    return (
        <Box>
            <NextSeo title="Stamps" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Stamps</Heading>
            <Box direction="row" gap="medium">
                <TextAndLabel label="Total Levels" text={totalLevels?.toString()} margin={{ bottom: 'small' }} />
                {hasHydrogen && <TextAndLabel label="Atom Discount" text={`${stampData[0][0].atomDiscount}%`} margin={{ bottom: 'small' }} />}
            </Box>
            <ShadowBox flex={false} background="dark-1" pad="small">
                <Grid columns={{ size: '300px' }} gap="none">
                    {
                        stampData && stampData.map((tab, index) => {
                            return (<StampTab key={`tab_${index}`} tab={tab} index={index} />)
                        })
                    }
                </Grid>
            </ShadowBox>
        </Box >
    )
}

export default Stamps;