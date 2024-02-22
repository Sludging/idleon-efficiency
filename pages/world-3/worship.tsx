import {
    Box,
    Heading,
} from 'grommet'
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import { ChargeDisplay } from '../../components/world-3/worship/charge';
import { PrayerDisplay } from '../../components/world-3/worship/prayers';
import { TotemDisplay } from '../../components/world-3/worship/totem';
import TabButton from '../../components/base/TabButton';

function Worship() {
    const [activeTab, setActiveTab] = useState<string>("Charge");

    return (
        <Box>
            <NextSeo title="Worship" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Worship</Heading>
            <Box gap="small">
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Charge", "Totems", "Prayers"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Charge" && <ChargeDisplay />}
                {activeTab == "Totems" && <TotemDisplay />}
                {activeTab == "Prayers" && <PrayerDisplay />}
            </Box>
        </Box>
    )
}

export default Worship;