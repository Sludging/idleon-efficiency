"use client"

import { Box, Heading } from "grommet";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import { JellyCells, JellyObstructions, JellyOverview, JellyUpgrades } from "../../../components/world-7/jelly-operator/jellyOperator";
import { JellyOperator } from "../../../data/domain/world-7/jellyOperator";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";

type Section = 'Cells' | 'Upgrades' | 'Obstructions';

export default function JellyOperatorContent() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [section, setSection] = useState<Section>('Cells');
    const jelly = theData.get("jellyOperator") as JellyOperator | undefined;

    if (!jelly) {
        return <>Loading...</>
    }

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>Jelly Operator</Heading>
            <JellyOverview jelly={jelly} />
            <ContentTabs
                options={(['Cells', 'Upgrades', 'Obstructions'] as const).map(tab => ({ value: tab, label: tab }))}
                value={section}
                onChange={setSection}
            />
            {section === 'Cells' && <JellyCells jelly={jelly} />}
            {section === 'Upgrades' && <JellyUpgrades jelly={jelly} />}
            {section === 'Obstructions' && <JellyObstructions jelly={jelly} />}
        </Box>
    )
}
