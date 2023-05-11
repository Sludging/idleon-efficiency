import {
    Box,
    Grid,
    Text,
    Heading,
    ResponsiveContext,
    TableHeader,
    TableCell,
    Table,
    TableBody,
    TableRow,
    TableFooter
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
import TextAndLabel, { ComponentAndLabel } from "../../components/base/TextAndLabel";
import { AtomCollider } from "../../data/domain/atomCollider";
import { Storage } from "../../data/domain/storage";

const ShadowBox = styled(Box)`
    box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17)
`

function StampDisplay({ stamp, index, storageAmount = 0 }: { stamp: Stamp, index: number, storageAmount?: number }) {
    const size = useContext(ResponsiveContext)
    const appContext = useContext(AppContext);
    const theData = appContext.data.getData();
    const allItems = theData.get("itemsData") as Item[];
    const stampItem = allItems.find(item => item.internalName == stamp.raw_name);

    function TipContent({ stamp }: { stamp: Stamp }) {
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
            <Box gap="small" width={{ min: '500px' }}>
                <Box direction="row" gap="large">
                    <TextAndLabel labelColor="dark-1" textSize="small" label="Bonus" text={stamp.getBonusText()} />
                    <ComponentAndLabel labelColor="dark-1" label="Next level cost" component={<CoinsDisplay coinScale={0.8} coinMap={getCoinsArray(stamp.getGoldCost())} maxCoins={3} />} />
                </Box>
                {
                    Object.entries(stamp.maxCarryInfo).length == 1 &&
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Level</TableCell>
                                <TableCell>Total Cost</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Discount</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                Object.entries(stamp.maxCarryInfo).map(([maxLevel, costInfo], index) => (
                                    <TableRow key={`${stamp.name}_${maxLevel}`}>
                                        <TableCell>{maxLevel}</TableCell>
                                        <TableCell><Box direction="row" align="center"><Text>{nFormatter(costInfo.costToLevel)}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} /></Box></TableCell>
                                        <TableCell><CoinsDisplay coinScale={0.8} coinMap={getCoinsArray(costInfo.goldCostToLevel)} maxCoins={3} /></TableCell>
                                        <TableCell>{`${costInfo.colliderDiscount}%`}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                }
                {
                    Object.entries(stamp.maxCarryInfo).length > 1 &&
                    <Box>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Total Cost</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Discount Req.</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    Object.entries(stamp.maxCarryInfo).slice(0, -1).map(([maxLevel, costInfo], index) => (
                                        <TableRow key={`${stamp.name}_${maxLevel}`}>
                                            <TableCell>{maxLevel}</TableCell>
                                            <TableCell>{ costInfo.costToLevel > 0 && <Box direction="row" align="center"><Text size="small">{nFormatter(costInfo.costToLevel)}{costInfo.currentDiscount ? " *" : ""}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} /></Box>}</TableCell>
                                            <TableCell><CoinsDisplay coinScale={0.8} coinMap={getCoinsArray(costInfo.goldCostToLevel)} maxCoins={3} /></TableCell>
                                            <TableCell>{`${costInfo.colliderDiscount}%`}</TableCell>
                                        </TableRow>
                                    ))
                                }
                                {stamp.shouldShowMaxCap() && <TableRow><TableCell>---</TableCell></TableRow>}
                                {stamp.shouldShowMaxCap() &&
                                    Object.entries(stamp.maxCarryInfo).slice(-1).map(([maxLevel, costInfo]) => (
                                        <TableRow key={`${stamp.name}_${maxLevel}`}>
                                            <TableCell>{maxLevel}**</TableCell>
                                            <TableCell direction="row" align="center"><Text size="xsmall">{nFormatter(costInfo.costToLevel)}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} /></TableCell>
                                            <TableCell><CoinsDisplay coinScale={0.8} coinMap={getCoinsArray(costInfo.goldCostToLevel)} maxCoins={3} /></TableCell>
                                            <TableCell>{costInfo.colliderDiscount}%</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <Text size="xsmall">* Including current collider discount.</Text>
                        <Text size="xsmall">** Maximum possible level based on current carry capacity.</Text>
                    </Box>
                }
                {!["Equipment", "Misc"].includes((stamp.materialItem as Item).getArchType()) &&
                    <Box>
                        <hr style={{ width: "100%" }} />
                        <Box direction="row" gap="large">
                            {storageAmount > 0 && <ComponentAndLabel labelColor="dark-1" label="Storage amount"
                                component={
                                    <Box direction="row" align="center"><Text size="small">{nFormatter(storageAmount)}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} /></Box>
                                }
                            />
                            }
                            {stamp.maxCarryPlayer && <TextAndLabel labelColor="dark-1" label="Max Cap" textSize="small" text={`${stamp.maxCarryPlayer.playerName} (${nFormatter(stamp.maxCarryAmount)})`} />}
                        </Box>
                    </Box>
                }
            </Box>
        )
    }
    return (
        <Box pad="small" border={{ color: 'grey-1' }} key={`stamp_${index}_${stamp.raw_name}`}>
            <TipDisplay
                body={
                    <TipContent stamp={stamp} />
                }
                heading={`${stamp.name} (${stamp.level}/${stamp.maxLevel})`}
                direction={ Number(/Stamp[ABC](\d+)/g.exec(stamp.raw_name)?.[1]) > 28 ? TipDirection.Up : TipDirection.Down}
                size="small"
                visibility={stamp.name == "Blank" || stamp.name == "FILLER" ? 'none' : undefined}
            >
                <Box direction="row" align="center" gap="xsmall" style={{ 
                        opacity: stamp.level > 0 ? 1 : 0.2, 
                        backgroundColor: stamp.canUpgradeWithCoins ? "green" : (stamp.canUpgradeWithMats ? "green" : "")}}>
                    <IconImage data={stamp.getImageData()} scale={0.4} />
                    <Text size="small">{stamp.level}</Text>
                </Box>
            </TipDisplay>
        </Box>
    )
}

const HoverBox = styled(Box)`
    &:hover {
        background: #4C4F54;
    }
`

function StampTab({ tab, index }: { tab: Stamp[], index: number }) {
    const [storage, setStorage] = useState<Storage>();
    const appContext = useContext(AppContext);
    const theData = appContext.data.getData();

    useEffect(() => {
        setStorage(theData.get("storage"));
    }, [appContext, theData])

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
                                    <HoverBox key={`tab_${index}_${stamp.raw_name}`}>
                                        <StampDisplay  stamp={stamp} index={index} storageAmount={stamp.materialItem ? storage?.amountInStorage(stamp.materialItem.internalName) : 0} />
                                    </HoverBox>
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

    const hydrogen = useMemo(() => {
        if (appContext.data.getData().size > 0) {
            const theData = appContext.data.getData();
            const collider = theData.get("collider") as AtomCollider;
            return collider.atoms[0];
        }
        return undefined;
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
                {hydrogen && hydrogen.level > 0 && <TextAndLabel label="Atom Discount" text={`${stampData[0][0].atomDiscount}% (+${hydrogen.level * hydrogen.data.bonusPerLv}%/day)`} margin={{ bottom: 'small' }} />}
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