import { Box, CheckBox, Grid, Heading, Text } from "grommet";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../../data/appContext";
import { Item } from "../../../data/domain/items";
import { Refinery } from "../../../data/domain/refinery";
import { SaltLick } from "../../../data/domain/saltLick";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel from "../../base/TextAndLabel";

export function SaltLickDisplay() {
    const [saltLickData, setSaltLickData] = useState<SaltLick>();
    const [refineryData, setRefineryData] = useState<Refinery>();
    const [itemData, setItemData] = useState<Item[]>();
    const [storage, setStorage] = useState<Storage>();
    const [hideMaxed, setHideMaxed] = useState(true);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setItemData(theData.get("itemsData"));
            setStorage(theData.get("storage"));
            setRefineryData(theData.get("refinery"));
            setSaltLickData(theData.get("saltLick"));
        }
    }, [appContext]);

    const bonusesToShow = useMemo(() => {
        if (!saltLickData) {
            return [];
        }

        if (hideMaxed) {
            return saltLickData.bonuses.filter(bonus => bonus.level != bonus.data.maxLevel);
        }

        return saltLickData.bonuses;
    }, [saltLickData, hideMaxed])

    if (!saltLickData || saltLickData.bonuses.filter(bonus => bonus.level ?? 0 > 0).length == 0) {
        return (
            <Box align="center" pad="medium">
                <Heading level='3'>Come back when you unlocked this!</Heading>
            </Box>
        )
    }

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
                        const costToMax = saltLickData.getCostToMax(index);
                        const costToNextLevel = saltLickData.getCost(index);
                        return (
                            <ShadowBox key={index} background="dark-1" pad="medium" direction="row" align="center" justify="between" margin={{ bottom: 'small' }}>
                                <Grid columns={["35%", "10%", "20%", "15%", "15%"]} fill gap="small" align="center">
                                    <TextAndLabel textSize='small' text={saltLickData.getBonusText(index)} label="Bonus" />
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