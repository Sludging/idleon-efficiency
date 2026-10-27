"use client";

import { Box, Heading, Select, Text } from "grommet";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import IconImage from "../../../components/base/IconImage";
import { SpeedrunOverview } from "../../../components/account/speedrun/speedrunOverview";
import { SpeedrunPortals } from "../../../components/account/speedrun/speedrunPortals";
import { SpeedrunBosses } from "../../../components/account/speedrun/speedrunBosses";
import { MapInfo } from "../../../data/domain/maps";
import { EnemyInfo } from "../../../data/domain/enemies";
import type { Speedrun } from "../../../data/domain/speedrun";
import useHydrated from "../../../lib/hooks/useHydrated";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

type SpeedrunSection = "portals" | "bosses";

const maps = new Map(MapInfo.map(map => [map.index, map]));
const enemies = new Map(EnemyInfo.map(enemy => [enemy.id, enemy]));

export default function SpeedrunContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [section, setSection] = useState<SpeedrunSection>("portals");
    const [selectedPlayerID, setSelectedPlayerID] = useState<number | undefined>();
    const speedrun = theData.get("speedrun") as Speedrun | undefined;

    if (!hydrated || !speedrun) {
        return <>Loading...</>;
    }

    const runner = speedrun.runners.find(candidate => candidate.playerID === selectedPlayerID) ?? speedrun.runners[0];
    const runnerOptions = speedrun.runners.map(candidate => ({
        value: candidate.playerID,
        label: candidate.playerName,
    }));

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>Speedrun</Heading>
            {runner && (
                <Box direction="row" gap="small" align="center">
                    <IconImage data={runner.classImageData} />
                    {speedrun.runners.length > 1 ? (
                        <Select
                            aria-label="Speedrun character"
                            options={runnerOptions}
                            labelKey="label"
                            valueKey={{ key: "value", reduce: true }}
                            value={runner.playerID}
                            onChange={({ value }) => setSelectedPlayerID(value)}
                        />
                    ) : <Text size="small">{runner.playerName}</Text>}
                </Box>
            )}
            <SpeedrunOverview speedrun={speedrun} runner={runner} />
            {runner ? (
                <Box gap="small">
                    <ContentTabs<SpeedrunSection>
                        options={[
                            { value: "portals", label: "Portals" },
                            { value: "bosses", label: "Bosses" },
                        ]}
                        value={section}
                        onChange={setSection}
                    />
                    {section === "portals" && <SpeedrunPortals runner={runner} maps={maps} enemies={enemies} />}
                    {section === "bosses" && <SpeedrunBosses speedrun={speedrun} runner={runner} />}
                </Box>
            ) : <Text size="small">Unlock Voidwalker to compare Speedrun portals and boss awards.</Text>}
        </Box>
    );
}
