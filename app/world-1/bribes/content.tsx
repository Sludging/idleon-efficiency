"use client"

import { Box, CheckBox, Grid, Heading, Text } from "grommet";
import { useEffect, useState } from "react";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import ShadowBox from "../../../components/base/ShadowBox";
import IconImage from "../../../components/base/IconImage";
import CoinsDisplay from "../../../components/coinsDisplay";
import { getCoinsArray } from "../../../data/utility";
import { Bribe, Bribes as BribesDomain, BribeStatus } from "../../../data/domain/world-1/bribes";
import { DataStatus } from "../../../lib/stores/appDataStore";

function Bribes() {
    const [hydrated, setHydrated] = useState(false);
    const [showBought, setShowBought] = useState(true);
    const { theData, dataStatus } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })
    ));
    const bribes = theData.get("bribes") as Bribe[] | undefined;

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !bribes) {
        return <Box><Text>Loading...</Text></Box>;
    }

    const realBribes = bribes.filter((bribe) => bribe.bribeIndex !== 40);
    const boughtCount = realBribes.filter((bribe) => bribe.status === BribeStatus.Purchased).length;
    const visibleBribes = showBought
        ? realBribes
        : realBribes.filter((bribe) => bribe.status !== BribeStatus.Purchased);

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Bribes</Heading>
            <Box gap="small">
                <Box direction="row" align="center" gap="small">
                    <IconImage data={BribesDomain.getImageData()} scale={0.8} />
                    <Text size="small">{boughtCount} / {realBribes.length} bought</Text>
                    <CheckBox
                        checked={showBought}
                        label="Show bought"
                        onChange={(event) => setShowBought(event.target.checked)}
                    />
                </Box>
                <Grid columns={{ size: "260px", count: "fill" }} gap="small">
                    {visibleBribes.map((bribe) => (
                        <ShadowBox
                            key={bribe.bribeIndex}
                            background="dark-1"
                            pad="medium"
                            gap="small"
                            style={{ opacity: bribe.status === BribeStatus.Purchased ? 1 : 0.5 }}
                        >
                            <Text size="small">{bribe.name}</Text>
                            <Text size="xsmall">{bribe.description}</Text>
                            {bribe.status !== BribeStatus.Purchased && (
                                <CoinsDisplay coinMap={getCoinsArray(bribe.cost)} maxCoins={3} />
                            )}
                        </ShadowBox>
                    ))}
                </Grid>
                {visibleBribes.length === 0 && <Text size="small">No unbought bribes.</Text>}
            </Box>
        </Box>
    );
}

export default Bribes;
