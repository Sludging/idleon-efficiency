"use client";

import { Box, CheckBox, Grid, Text } from "grommet";
import ShadowBox from "../../../components/base/ShadowBox";
import { EventShop } from "../../../data/domain/eventShop";
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


    const bonuses = eventShop.bonuses.filter((bonus) => showBought || !bonus.owned);

    return (
        <Box gap="small">
            <Box direction="row" align="center" gap="medium" wrap>
                <Text size="small">Owned bonuses: {ownedCount} / {eventShop.bonuses.length}</Text>
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
                    </ShadowBox>
                ))}
            </Grid>
        </Box>
    );
}
