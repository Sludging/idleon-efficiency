"use client";

import { Box, CheckBox, Grid, Heading, Text } from "grommet";
import { useEffect, useState } from "react";
import IconImage from "../../../components/base/IconImage";
import ShadowBox from "../../../components/base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import CoinsDisplay from "../../../components/coinsDisplay";
import { BigFish as BigFishDomain } from "../../../data/domain/world-7/bigFish";
import { commaNotation, getCoinsArray } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";
import { useShallow } from "zustand/react/shallow";

export default function AdviceFishContent() {
    const [hydrated, setHydrated] = useState(false);
    const [showLocked, setShowLocked] = useState(true);
    const { theData, dataStatus } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })
    ));
    const bigFish = theData.get("bigFish") as BigFishDomain | undefined;

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !bigFish) {
        return <>Loading...</>;
    }

    return (
        <Box gap="small">
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Advice Fish</Heading>
            <Box direction="row" align="center" gap="small" wrap>
                <Text size="small">
                    Family level: <strong>{commaNotation(bigFish.familyLevel)}</strong>
                </Text>
                <CheckBox
                    checked={showLocked}
                    label="Show locked"
                    onChange={(event) => setShowLocked(event.target.checked)}
                />
            </Box>
            <Grid columns={{ size: "260px", count: "fill" }} gap="small">
                {bigFish.bonuses.filter((bonus) => showLocked || bonus.unlocked).map((bonus) => {
                    const imageCrop = bonus.getImageCrop();
                    const effect = bonus.unlocked
                        ? bonus.getBonusText().split("@").at(-1)?.trim() ?? ""
                        : bonus.data.desc.split("@").at(-1)?.trim().replace(/^(?:\+\{%|\}x)\s*/, "") ?? "";

                    return (
                        <ShadowBox
                            key={bonus.index}
                            background="dark-1"
                            pad="small"
                            gap="small"
                            style={{ opacity: bonus.unlocked ? 1 : 0.5 }}
                        >
                            <Box direction="row" align="center" justify="between" gap="small">
                                <Box direction="row" align="center" gap="small">
                                    <Box
                                        width={`${imageCrop.width}px`}
                                        height={`${imageCrop.height}px`}
                                        flex={false}
                                        style={{ overflow: "hidden", position: "relative" }}
                                        role="img"
                                        aria-label={bonus.data.name}
                                    >
                                        <IconImage
                                            data={bonus.getImageData()}
                                            style={{
                                                position: "absolute",
                                                left: `${-imageCrop.x}px`,
                                                top: `${-imageCrop.y}px`
                                            }}
                                        />
                                    </Box>
                                    <Text size="small">{bonus.data.name}</Text>
                                </Box>
                                <Text size="xsmall">Lv. {commaNotation(bonus.level)}</Text>
                            </Box>
                            <Text size="xsmall">{effect}</Text>
                            {!bonus.unlocked && (
                                <TextAndLabel
                                    textSize="xsmall"
                                    text={commaNotation(bonus.getUnlockLevelRequired())}
                                    label="Family level required"
                                />
                            )}
                            {bonus.unlocked && (
                                <ComponentAndLabel
                                    label="Next level cost"
                                    component={
                                        <CoinsDisplay coinMap={getCoinsArray(bonus.getUpgradeCost())} maxCoins={3} regularRow />
                                    }
                                />
                            )}
                        </ShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
}
