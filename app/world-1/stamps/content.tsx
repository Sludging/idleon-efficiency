"use client";

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
    CheckBox,
    ThemeContext,
} from "grommet"

import { Stamp } from '../../../data/domain/world-1/stamps';
import { useState, useContext } from 'react';
import { getCoinsArray, nFormatter } from '../../../data/utility'
import CoinsDisplay from "../../../components/coinsDisplay";
import { Item } from "../../../data/domain/items";
import ItemSourcesDisplay from "../../../components/base/ItemSourceDisplay";
import TipDisplay, { TipDirection } from "../../../components/base/TipDisplay";
import IconImage from "../../../components/base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import { AtomCollider } from "../../../data/domain/atomCollider";
import { Storage } from "../../../data/domain/storage";
import { CircleInformation, List, Grid as GridIcon } from "grommet-icons";
import { normalizeColor } from "grommet/utils";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import ShadowBox, { HoverBox } from "../../../components/base/ShadowBox";
import StampsTableView from "../../../components/world-1/stampTableView";
import { Capacity } from "../../../data/domain/capacity";

function CarryCapacitySummary() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData() })
    ));

    const capacity = theData.get("capacity") as Capacity;

    return (
        <ShadowBox background="dark-1" pad="medium" margin={{ bottom: 'medium' }}>
            <Box gap="small">
                <Text size="small" weight="bold">Carry Capacity Leaders</Text>
                <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
                    {Object.entries(capacity.maxCapacityByType).map(([type, info]) => (
                        <Box key={type} direction="row" gap="small" align="center">
                            {
                                info.bag &&
                                <Box title={info.bag?.name == "bCraft" ? "Materials" : info.bag?.name}>
                                    <IconImage data={info.bag?.getImageData()} scale={0.7} key={info.bag?.name} />
                                </Box>
                            }
                            <Text size="xsmall">{info.player?.playerName ?? "N/A"}</Text>
                            <Text size="xsmall">({nFormatter(info.maxCapacity * info.inventorySlots)})</Text>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </ShadowBox>
    );
}

function StampDisplay({ stamp, index, highlight, storageAmount = 0 }: { stamp: Stamp, index: number, highlight: boolean, storageAmount?: number }) {
    const size = useContext(ResponsiveContext)
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const allItems = theData.get("itemsData") as Item[];
    const stampItem = allItems.find(item => item.internalName == stamp.raw_name);
    const theme = useContext(ThemeContext);

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
                                        <TableCell>
                                            <Box direction="row" align="center">
                                                <Text color={stamp.maxCarryAmount > costInfo.costToLevel ? "" : "accent-1"} size={stamp.maxCarryAmount > costInfo.costToLevel ? "small" : ""} >{nFormatter(costInfo.costToLevel)}</Text>
                                                <IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} />
                                            </Box>
                                        </TableCell>
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
                                            <TableCell>{costInfo.costToLevel > 0 && <Box direction="row" align="center"><Text size="small">{nFormatter(costInfo.costToLevel)}{costInfo.currentDiscount ? " *" : ""}</Text><IconImage data={(stamp.materialItem as Item).getImageData()} scale={0.7} /></Box>}</TableCell>
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

    function highlightColor() {
        if (!highlight) {
            return;
        }
        switch (true) {
            case stamp.canUpgradeWithCoins: return normalizeColor("stamp-positive-2", theme);
            case stamp.canUpgradeWithMats: return normalizeColor("stamp-positive-1", theme);
            case stamp.cantCarry: return normalizeColor("stamp-negative-2", theme)
            case stamp.lowOnResources: return normalizeColor("stamp-negative-1", theme)
        }
    }

    return (
        <Box pad="small" border={{ color: 'grey-1' }} key={`stamp_${index}_${stamp.raw_name}`}
            style={{ backgroundColor: highlightColor() }}>
            <TipDisplay
                body={
                    <TipContent stamp={stamp} />
                }
                heading={`${stamp.name} (${stamp.level}/${stamp.maxLevel})`}
                direction={Number(/Stamp[ABC](\d+)/g.exec(stamp.raw_name)?.[1]) > 28 ? TipDirection.Up : TipDirection.Down}
                size="small"
                visibility={stamp.name == "Blank" || stamp.name == "FILLER" ? 'none' : undefined}
            >
                <Box direction="row" align="center" gap="xsmall" style={{
                    opacity: stamp.maxLevel > 0 ? 1 : 0.2,
                }}>
                    <IconImage data={stamp.getImageData()} scale={0.4} />
                    <Text size="small">{stamp.level}</Text>
                </Box>
            </TipDisplay>
        </Box>
    );
}

function StampTab({ tab, index, highlight }: { tab: Stamp[], index: number, highlight: boolean }) {

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const storage = theData.get("storage") as Storage;

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
                                        <StampDisplay stamp={stamp} index={index} highlight={highlight} storageAmount={stamp.materialItem ? storage?.amountInStorage(stamp.materialItem.internalName) : 0} />
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
    const theme = useContext(ThemeContext);
    const [highlight, setHighlight] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const stampData = theData.get("stamps") as Stamp[][];
    const collider = theData.get("collider") as AtomCollider;

    const hydrogen = collider.atoms[0];
    const gildedCount = stampData[0][0].gildedCount
    const totalLevels = stampData.flatMap(tab => tab).reduce((sum, stamp) => sum += stamp.level, 0);

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Stamps</Heading>
            <Box direction="row" margin={{ bottom: 'medium' }} justify="between" fill>
                <Box direction="row" align="center" gap="medium">
                    <Box direction="row" gap="medium">
                        <TextAndLabel label="Total Levels" text={totalLevels.toString()} />
                        {hydrogen && hydrogen.level > 0 && <TextAndLabel label="Atom Discount" text={`${stampData[0][0].atomDiscount}% (+${hydrogen.level * hydrogen.data.bonusPerLv}%/day)`} />}
                        {stampData[0][0].gildedAvailable && <TextAndLabel label="Gilded Stamps" text={`${gildedCount}`} />}
                    </Box>
                    <Box direction="row" gap="medium">
                        <Box direction="row" align="center" gap="xsmall">
                            <CheckBox
                                checked={highlight}
                                label="Highlight Stamps"
                                onChange={(event) => setHighlight(event.target.checked)}
                            />
                            <TipDisplay
                                heading="Highlight Stamps"
                                body={
                                    <Box gap="xsmall">
                                        <Text size="small">Enable this check to highlight stamps based on certain conditions:</Text>
                                        <Text><span style={{ color: normalizeColor("stamp-positive-1", theme) }}>⬤</span> Can be upgraded with materials.</Text>
                                        <Text><span style={{ color: normalizeColor("stamp-positive-2", theme) }}>⬤</span> Can be upgraded with coins.</Text>
                                        <Text><span style={{ color: normalizeColor("stamp-negative-1", theme) }}>⬤</span> Missing materials or money.</Text>
                                        <Text><span style={{ color: normalizeColor("stamp-negative-2", theme) }}>⬤</span> Not enough carry cap.</Text>
                                    </Box>
                                }
                            >
                                <CircleInformation color='accent-3' size="16px" />
                            </TipDisplay>
                        </Box>
                    </Box>
                </Box>
                <Box direction="row" align="center" gap="small">
                    <Text size="small">View:</Text>
                    <Box direction="row" align="center" background="dark-2" round="small" pad="xsmall" gap="xsmall">
                        <Box
                            pad="xsmall"
                            round="xsmall"
                            background={viewMode === 'grid' ? 'brand' : 'transparent'}
                            onClick={() => setViewMode('grid')}
                            style={{ cursor: 'pointer' }}
                        >
                            <GridIcon size="small" />
                        </Box>
                        <Box
                            pad="xsmall"
                            round="xsmall"
                            background={viewMode === 'table' ? 'brand' : 'transparent'}
                            onClick={() => setViewMode('table')}
                            style={{ cursor: 'pointer' }}
                        >
                            <List size="small" />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <CarryCapacitySummary />
            {viewMode === 'grid' ? (
                <ShadowBox flex={false} background="dark-1" pad="small">
                    <Grid columns={{ size: '300px' }} gap="none">
                        {
                            stampData && stampData.map((tab, index) => {
                                return (<StampTab key={`tab_${index}`} tab={tab} index={index} highlight={highlight} />)
                            })
                        }
                    </Grid>
                </ShadowBox>
            ) : (
                <StampsTableView stamps={stampData.flat()} />
            )}
        </Box>
    );
}

export default Stamps;