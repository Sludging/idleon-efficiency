import { Box, CheckBox, Grid, Heading, ResponsiveContext, Text } from "grommet";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { Building } from "../../../data/domain/buildings";
import { Construction } from "../../../data/domain/construction";
import { Item } from "../../../data/domain/items";
import { Storage } from "../../../data/domain/storage";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";

export function BuildingsDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const appContext = useContext(AppContext);

    const theData = appContext.data.getData();
    const itemData = theData.get("itemsData") as Item[];
    const storage = theData.get("storage") as Storage;
    const constructionData = theData.get("construction") as Construction;

    const buildingsToShow = useMemo(() => {
        if (!constructionData) {
            return [];
        }

        if (hideMaxed) {
            return constructionData.buildings.filter(building => building.level != building.maxLvl);
        }

        return constructionData.buildings;
    }, [constructionData, hideMaxed])

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
                <CheckBox
                    checked={hideMaxed}
                    label="Hide max level buildings"
                    onChange={(event) => setHideMaxed(event.target.checked)}
                />
            </Box>
            <Box wrap direction="row">
                {buildingsToShow.map((building, index) => {
                    return (
                        <ShadowBox style={{ opacity: building.level > 0 ? 1 : 0.5 }} key={index} align="start" background="dark-1" pad="medium" justify="between" margin={{ bottom: 'small', right: 'small' }} direction="row" width="large">
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
                            {building.nextLevelUnlocked || building.level == building.maxLvl || building.currentXP > building.getBuildCost() ?
                                <TextAndLabel
                                    label="Build Req"
                                    textSize="small"
                                    text={"Maxed"}
                                    margin={{ right: 'large' }}
                                /> :
                                <TextAndLabel
                                    label="Build Req"
                                    textSize="small"
                                    text={`${nFormatter(building.currentXP)}/${nFormatter(building.getBuildCost())}`}
                                    margin={{ right: 'large' }}
                                />}
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