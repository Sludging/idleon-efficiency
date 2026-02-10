import { Box, CheckBox, Meter, Text, Stack } from "grommet";
import { useMemo, useState } from "react";
import { Building } from "../../../data/domain/world-3/construction/buildings";
import { Construction } from "../../../data/domain/world-3/construction/construction";
import { Item } from "../../../data/domain/items";
import { Storage } from "../../../data/domain/storage";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { BorderType } from "grommet/utils";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

export function BuildingsDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [onlyCurrentlyBuilding, setOnlyCurrentlyBuilding] = useState(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const itemData = theData.get("itemsData") as Item[];
    const storage = theData.get("storage") as Storage;
    const constructionData = theData.get("construction") as Construction;

    const buildingsToShow = useMemo(() => {
        if (!constructionData) {
            return [];
        }

        let buildingsData = constructionData.buildings;

        if (hideMaxed) {
            buildingsData = buildingsData.filter(building => !building.maxed);
        }

        if (onlyCurrentlyBuilding) {
            buildingsData = buildingsData.filter(building => building.currentlyBuilding);
        }

        return buildingsData;
    }, [constructionData, hideMaxed, onlyCurrentlyBuilding])

    const costCruncher = useMemo(() => {
        return constructionData?.buildings.find(building => building.index == 5) as Building;
    }, [constructionData])

    return (
        <Box gap="medium" pad="large">
            <Box direction="row">
                <TextAndLabel
                    label="Total Levels"
                    text={constructionData.buildings.reduce((sum, building) => sum += building.level, 0).toString()}
                    margin={{ right: 'medium' }}
                />
                <TextAndLabel
                    label="Total Build Rate"
                    text={nFormatter(constructionData.totalBuildSpeed)}
                    margin={{ right: 'medium' }}
                />
                <Box direction="row" gap="small">
                    <CheckBox
                        checked={hideMaxed}
                        label="Hide max level buildings"
                        onChange={(event) => setHideMaxed(event.target.checked)}
                    />
                    <CheckBox
                        checked={onlyCurrentlyBuilding}
                        label="Show only in progress buildings"
                        onChange={(event) => setOnlyCurrentlyBuilding(event.target.checked)}
                    />
                </Box>
            </Box>
            <Box wrap direction="row">
                {buildingsToShow.map((building, index) => {
                    const currentlyBuildingBorderProp: BorderType = building.currentlyBuilding && {size: '2px', style: 'solid', color: 'green'};

                    return (
                        <ShadowBox style={{ opacity: building.level > 0 ? 1 : 0.5 }} key={index} align="start" background="dark-1" pad="medium" justify="between" margin={{ bottom: 'small', right: 'small' }} direction="row" width="large" border={currentlyBuildingBorderProp}>
                            <Box justify="center" margin={{ right: 'medium' }} gap="small">
                                <Text size="xsmall">{building.name}</Text>
                                <Box margin={{ right: 'small' }}>
                                    <IconImage data={building.getImageData()} scale={0.8} />
                                </Box>

                            </Box>
                            <TextAndLabel
                                label="Level"
                                textSize="small"
                                text={`${building.level.toString()}/${building.maxLvl.toString()}`}
                                margin={{ right: 'large' }}
                            />
                            <Box justify="center" margin={{ right: 'medium' }} gap="small">
                                {(!building.maxed && !building.upgradable && !building.nextLevelUnlocked) &&
                                    <ComponentAndLabel
                                        label="Progress"
                                        component={
                                            <Stack>
                                                <Meter
                                                    size="small"
                                                    type="bar"
                                                    background="accent-3"
                                                    color="brand"
                                                    values={[
                                                        {
                                                            value: building.currentXP,
                                                            label: 'current',
                                                            color: 'brand'
                                                        }
                                                    ]}
                                                    max={building.getBuildCost()} />
                                                <Box align="center" pad="xxsmall">
                                                    <Text size="small">{nFormatter(Math.floor(Math.min(building.currentXP, building.getBuildCost())))}/{nFormatter(Math.floor(building.getBuildCost()))} ({building.buildPercentage}%)</Text>
                                                </Box>
                                            </Stack>
                                        }
                                    />}
                                {building.upgradable && <Text color={'green'}>Ready to Upgrade</Text>}
                                {building.nextLevelUnlocked && !building.upgradable && <Text color={'yellow'}>Missing materials</Text>}
                            </Box>
                            {building.level != building.maxLvl &&
                                <Box direction="row">
                                    <ComponentAndLabel
                                        label="Next level costs"
                                        component={
                                            building.getLevelCosts(building.level, costCruncher).map((costData, index) => {
                                                const costItem = itemData?.find((item) => item.internalName == costData.item);
                                                const amountInStorage = storage?.amountInStorage(costData.item) ?? 0;
                                                const textColor = amountInStorage > costData.quantity ? 'green-1' : 'white';
                                                if (costItem) {
                                                    return (
                                                        <Box key={index} direction="row" align="center">
                                                            <Box title={costItem?.displayName}>
                                                                <IconImage data={costItem.getImageData()} />
                                                            </Box>
                                                            <Box direction="row" gap="xsmall" align="center">
                                                                <Text color={textColor} size="xsmall">{nFormatter(costData.quantity)}</Text>
                                                            </Box>
                                                        </Box>
                                                    )
                                                }
                                            })
                                        }
                                        margin={{ right: 'large' }}
                                    />
                                    <ComponentAndLabel
                                        label="Cost to max level"
                                        component={
                                            building.getMaxLevelCosts(costCruncher).map((costData, index) => {
                                                const costItem = itemData?.find((item) => item.internalName == costData.item);
                                                const amountInStorage = storage?.amountInStorage(costData.item) ?? 0;
                                                const textColor = amountInStorage > costData.quantity ? 'green-1' : 'white';
                                                if (costItem) {
                                                    return (
                                                        <Box key={index} direction="row" align="center">
                                                            <Box title={costItem?.displayName}>
                                                                <IconImage data={costItem.getImageData()} />
                                                            </Box>
                                                            <Box direction="row" gap="xsmall" align="center">
                                                                <Text color={textColor} size="xsmall">{nFormatter(costData.quantity)} ({nFormatter(amountInStorage)})</Text>
                                                            </Box>
                                                        </Box>
                                                    )
                                                }
                                            })
                                        }
                                        margin={{ right: 'large' }}
                                    />
                                </Box>
                            }
                        </ShadowBox>
                    )
                })
                }
            </Box>
        </Box>
    )

}