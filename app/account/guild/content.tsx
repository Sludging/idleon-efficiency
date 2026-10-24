"use client"

import { Box, CheckBox, Grid, Heading, Text } from "grommet";
import { useState } from "react";
import IconImage from "../../../components/base/IconImage";
import ShadowBox from "../../../components/base/ShadowBox";
import { Guild as GuildDomain } from "../../../data/domain/guild";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import useHydrated from "../../../lib/hooks/useHydrated";

function GuildDisplay() {
    const hydrated = useHydrated();
    const [showMaxed, setShowMaxed] = useState(true);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const guild = theData.get("guild") as GuildDomain;

    if (!hydrated || !guild) {
        return <Box>Loading...</Box>;
    }


    const guildBonuses = guild.guildBonuses.filter((bonus) => bonus.name !== "Wait A Minute");

    const maxedBonuses = guildBonuses.filter((bonus) => bonus.level >= bonus.maxLevel).length;
    const smallGuildBonusMemberLimit = guild.getSmallGuildBonusMemberLimit();

    return (
        <Box gap="small">
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Guild Bonuses</Heading>
            <Box direction="row" align="center" gap="medium" wrap>
                <Text size="small">Maxed bonuses {maxedBonuses}/{guildBonuses.length}</Text>
                <CheckBox
                    checked={showMaxed}
                    label="Show maxed"
                    onChange={(event) => setShowMaxed(event.target.checked)}
                />
            </Box>
            <Grid columns={{ count: "fit", size: "260px" }} gap="small">
                {guildBonuses
                    .filter((bonus) => showMaxed || bonus.level < bonus.maxLevel)
                    .map((bonus) => {
                        const opacity = bonus.level > 0 ? 1 : 0.5;

                        return (
                            <ShadowBox
                                key={bonus.index}
                                background="dark-1"
                                pad="small"
                                gap="small"
                                style={{ opacity }}
                            >
                                <Box direction="row" align="center" gap="small">
                                    <IconImage data={bonus.getImageData()} scale={0.6} />
                                    <Box gap="xsmall">
                                        <Text size="small" weight="bold">{bonus.name}</Text>
                                        <Text size="xsmall">Lv. {bonus.level}/{bonus.maxLevel}</Text>
                                    </Box>
                                </Box>
                                <Text size="xsmall">
                                    {bonus.bonus
                                        .replace(/[{}]/, bonus.getBonusDisplayValue().toFixed(2))
                                        .replace("]", String(smallGuildBonusMemberLimit))}
                                </Text>
                            </ShadowBox>
                        );
                    })}
            </Grid>
        </Box>
    );
}

export default GuildDisplay;
