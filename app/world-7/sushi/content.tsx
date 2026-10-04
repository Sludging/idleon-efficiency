"use client"

import { Box, Heading, Tab, Tabs } from 'grommet';
import { useState } from 'react';
import { SushiStation as SushiStationDomain } from '../../../data/domain/world-7/sushi';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { SushiCollection } from '../../../components/world-7/sushi/sushiCollection';
import { SushiUpgrades } from '../../../components/world-7/sushi/sushiUpgrades';
import { SushiOverview } from '../../../components/world-7/sushi/sushiOverview';

export default function SushiContent() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [activeTab, setActiveTab] = useState(0);
    const station = theData.get("sushi") as SushiStationDomain | undefined;

    if (!station) {
        return <>Loading...</>
    }

    const discoveredCount = station.sushi.filter((sushi) => sushi.unlocked).length;

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Sushi Station</Heading>
            <Box margin={{ bottom: 'medium' }}>
                <SushiOverview station={station} />
            </Box>
            <Tabs activeIndex={activeTab} onActive={setActiveTab}>
                <Tab title={`Collection (${discoveredCount}/${station.sushi.length})`}>
                    <SushiCollection sushi={station.sushi} />
                </Tab>
                <Tab title="Upgrades">
                    <SushiUpgrades upgrades={station.upgrades} bucks={station.bucks} />
                </Tab>
            </Tabs>
        </Box>
    )
}
