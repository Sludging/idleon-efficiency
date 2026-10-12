"use client"

import { Box, Heading } from 'grommet';
import { useState } from 'react';
import { SushiStation as SushiStationDomain } from '../../../data/domain/world-7/sushi';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { SushiCollection } from '../../../components/world-7/sushi/sushiCollection';
import { SushiUpgrades } from '../../../components/world-7/sushi/sushiUpgrades';
import { SushiOverview } from '../../../components/world-7/sushi/sushiOverview';
import ContentTabs from '../../../components/base/ContentTabs';

type SushiSection = 'collection' | 'upgrades';

export default function SushiContent() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [section, setSection] = useState<SushiSection>('collection');
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
            <Box gap="small">
                <ContentTabs<SushiSection>
                    options={[
                        { value: 'collection', label: `Collection (${discoveredCount}/${station.sushi.length})` },
                        { value: 'upgrades', label: 'Upgrades' },
                    ]}
                    value={section}
                    onChange={setSection}
                />
                {section === 'collection' && <SushiCollection sushi={station.sushi} />}
                {section === 'upgrades' && <SushiUpgrades upgrades={station.upgrades} bucks={station.bucks} />}
            </Box>
        </Box>
    )
}
