"use client";

import { Box, CheckBox, Grid, Text } from "grommet";
import ShadowBox from "../../../components/base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import IconImage from "../../../components/base/IconImage";
import { EventShop } from "../../../data/domain/eventShop";
import { commaNotation } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useHydrated from "../../../lib/hooks/useHydrated";

export default function EventShopContent() {
    const [showBought, setShowBought] = useState(true);
    const hydrated = useHydrated();
    const { eventShop } = useAppDataStore(useShallow((state) => ({
        eventShop: state.data.getData().get("eventShop") as EventShop | undefined,
        lastUpdated: state.lastUpdated,
    })));

    if (!hydrated || !eventShop) {
        return <Box><Text>Waiting for imported account data.</Text></Box>;
    }
    const ownedCount = eventShop.bonuses.filter((bonus) => bonus.owned).length;
    const starImageData = eventShop.getStarsImageData();

    const bonuses = eventShop.bonuses.filter((bonus) => showBought || !bonus.owned);

    return (
        <Box gap="small">
            <Box direction="row" align="start" gap="medium" wrap pad={{ vertical: "small" }}>
                <ComponentAndLabel label="Event stars" component={
                    <Box direction="row" align="center" gap="small">
                        <IconImage data={starImageData} />
                        <Text size="large">{commaNotation(eventShop.starsOwned)}</Text>
                    </Box>
                } />
                <ComponentAndLabel label="Stars for all unowned bonuses" component={
                    <Box direction="row" align="center" gap="small">
                        <IconImage data={starImageData} />
                        <Text size="large">{commaNotation(eventShop.getRemainingStarCost())}</Text>
                    </Box>
                } />
                <TextAndLabel label="Owned bonuses" text={`${ownedCount} / ${eventShop.bonuses.length}`} textSize="large" />
            </Box>
            <Box direction="row" align="center">
                <CheckBox
                    checked={showBought}
                    label="Show bought"
                    onChange={(event) => setShowBought(event.target.checked)}
                />
            </Box>
            <Grid columns={{ count: "fill", size: "260px" }} gap="small">
                {bonuses.map((bonus) => (
                    <ShadowBox
                        key={bonus.index}
                        background="dark-1"
                        pad="small"
                        gap="small"
                        style={{ opacity: bonus.owned ? 1 : 0.5 }}
                    >
                        <Text size="small" weight="bold">{bonus.data.name}</Text>
                        <Text size="xsmall">{bonus.data.desc}</Text>
                        {!bonus.owned && <Box direction="row" align="center" gap="small">
                            <Text size="xsmall">Price:</Text>
                            <IconImage data={starImageData} />
                            <Text size="xsmall">{commaNotation(bonus.data.price)}</Text>
                        </Box>}
                    </ShadowBox>
                ))}
            </Grid>
        </Box>
    );
}
