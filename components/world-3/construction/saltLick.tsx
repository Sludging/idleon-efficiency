import { Box, CheckBox, Text } from "grommet";
import { useMemo, useState } from "react";
import { Item } from "../../../data/domain/items";
import { Refinery } from "../../../data/domain/world-3/construction/refinery";
import { SaltLick } from "../../../data/domain/world-3/construction/saltLick";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import DataRow from "../../base/DataRow";
import { Construction } from "../../../data/domain/world-3/construction/construction";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

export function SaltLickDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

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
        <Box gap="small">
            <Box gap="small">
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
                            <DataRow
                                key={index}
                                opacity={saltLickBuildingLevel < bonus.index + 1 ? 0.5 : 1}
                                columns={["minmax(0, 35fr)", "minmax(0, 10fr)", "minmax(0, 20fr)", "minmax(0, 15fr)", "minmax(0, 15fr)"]}
                                fields={[
                                    { key: "bonus", kind: "text", label: "Bonus", value: saltLickData.getBonusText(bonus.index), role: "description" },
                                    { key: "level", kind: "text", label: "Level", value: `${bonus.level} / ${bonus.data.maxLevel}` },
                                    ...(bonus.level < bonus.data.maxLevel ? [
                                        {
                                            key: "next", kind: "content" as const, label: "Next Level costs",
                                            content: (
                                                <Box direction="row" align="center" gap="small">
                                                    <Box title={saltItem.displayName}>
                                                        <IconImage data={saltItem.getImageData()} />
                                                    </Box>
                                                    <Text size="small">{nFormatter(costToNextLevel)}</Text>
                                                </Box>
                                            ),
                                        },
                                        { key: "max", kind: "text" as const, label: "Cost to max", value: nFormatter(costToMax) },
                                        { key: "storage", kind: "text" as const, label: "In Storage", color: costToNextLevel > countInStorage ? 'accent-1' : 'green-1', value: nFormatter(countInStorage) },
                                    ] : [
                                        { key: "maxed", kind: "content" as const, label: null, content: <Text color="green-1" size="small">Maxed!</Text> },
                                    ]),
                                ]}
                            />
                        )
                    }
                }
                )
            }
        </Box>
    )

}