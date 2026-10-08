"use client"

import { Box, Heading } from "grommet";
import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import TabButton from "../../../components/base/TabButton";
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
            <Box align="center" direction="row" justify="center" gap="small">
                {(['Cells', 'Upgrades', 'Obstructions'] as const).map(tab => <TabButton key={tab} text={tab} isActive={section === tab} clickHandler={() => setSection(tab)} />)}
            </Box>
            {section === 'Cells' && <JellyCells jelly={jelly} />}
            {section === 'Upgrades' && <JellyUpgrades jelly={jelly} />}
            {section === 'Obstructions' && <JellyObstructions jelly={jelly} />}
        </Box>
    )
}
