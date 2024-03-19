import { Box, CheckBox, Grid, Text } from "grommet";
import React, { useMemo, useState } from "react";
import { Item } from "../../../data/domain/items";
import { Refinery } from "../../../data/domain/refinery";
import { SaltLick } from "../../../data/domain/saltLick";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import { Construction } from "../../../data/domain/construction";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

export function SaltLickDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const theData = useAppDataStore((state) => state.data.getData());

    const saltLickData = theData.get("saltLick") as SaltLick;
    const refineryData = theData.get("refinery") as Refinery;
    const itemData = theData.get("itemsData") as Item[];
    const storage = theData.get("storage") as Storage;
    const construction = theData.get("construction") as Construction;

    const saltLickBuildingLevel = construction.buildings[3].level

    // Probably doesn't need .. useMemo? Need to check with react docs.
    const bonusesToShow = useMemo(() => {
        if (!saltLickData) {
            return [];
        }

        if (hideMaxed) {
            return saltLickData.bonuses.filter(bonus => bonus.level != bonus.data.maxLevel);
        }

        return saltLickData.bonuses;
    }, [saltLickData, hideMaxed])

    return (
        <Box>
            <Box margin={{ bottom: 'small' }} gap="small">
                <CheckBox
                    checked={hideMaxed}
                    label="Hide max level upgrades"
                    onChange={(event) => setHideMaxed(event.target.checked)}
                />
                <Text size="small">* Green text &apos;In Storage&apos; means you can afford the next level.</Text>
            </Box>
            {
                bonusesToShow.map((bonus, index) => {
                    const saltItem = itemData?.find((item) => item.internalName == bonus.data.item);
                    if (saltItem) {
                        let countInStorage = storage?.amountInStorage(saltItem.internalName) ?? 0;
                        // If salt item, check refinery storage as well
                        if (saltItem.internalName.includes("Refinery")) {
                            countInStorage += refineryData?.storage.find(salt => salt.name == saltItem.internalName)?.quantity ?? 0;
                        }
                        const costToMax = saltLickData.getCostToMax(bonus.index);
                        const costToNextLevel = saltLickData.getCost(bonus.index);
                        return (
                            <ShadowBox key={index} background="dark-1" pad="medium" direction="row" align="center" justify="between" margin={{ bottom: 'small' }} style={{opacity: saltLickBuildingLevel < bonus.index + 1 ? 0.5 : 1}}>
                                <Grid columns={["35%", "10%", "20%", "15%", "15%"]} fill gap="small" align="center">
                                    <TextAndLabel textSize='small' text={saltLickData.getBonusText(bonus.index)} label="Bonus" />
                                    <TextAndLabel text={`${bonus.level} / ${bonus.data.maxLevel}`} label="Level" />
                                    {bonus.level < bonus.data.maxLevel ?
                                        <React.Fragment>
                                            <Box direction="row" align="center">
                                                <Box title={saltItem.displayName} margin={{ right: 'small' }}>
                                                    <IconImage data={saltItem.getImageData()} />
                                                </Box>
                                                <TextAndLabel text={nFormatter(costToNextLevel)} label="Next Level costs" />

                                            </Box>
                                            <Box direction="row" align="center">
                                                <TextAndLabel text={nFormatter(costToMax)} label="Cost to max" />
                                            </Box>
                                            <TextAndLabel textColor={costToNextLevel > countInStorage ? 'accent-1' : 'green-1'} text={nFormatter(countInStorage)} label="In Storage" />
                                        </React.Fragment> :
                                        <Box align="center" justify="center"><Text color="green-1" size="large">Maxed!</Text></Box>
                                    }
                                </Grid>
                            </ShadowBox>
                        )
                    }
                }
                )
            }
        </Box>
    )

}