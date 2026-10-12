"use client"

import {
    Box,
    Heading,
} from 'grommet'
import { useState } from 'react';
import { ChargeDisplay } from '../../../components/world-3/worship/charge';
import { PrayerDisplay } from '../../../components/world-3/worship/prayers';
import { TotemDisplay } from '../../../components/world-3/worship/totem';
import ContentTabs from '../../../components/base/ContentTabs';

function Worship() {
    const [activeTab, setActiveTab] = useState<string>("Charge");

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Worship</Heading>
            <Box gap="small">
                <ContentTabs
                    options={[
                        { value: "Charge", label: "Charge" },
                        { value: "Totems", label: "Totems" },
                        { value: "Prayers", label: "Prayers" },
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                />
                {activeTab == "Charge" && <ChargeDisplay />}
                {activeTab == "Totems" && <TotemDisplay />}
                {activeTab == "Prayers" && <PrayerDisplay />}
            </Box>
        </Box>
    )
}

export default Worship;