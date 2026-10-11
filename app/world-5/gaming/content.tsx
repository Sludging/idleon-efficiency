"use client"

import { Box, Heading } from 'grommet';
import { useEffect, useState } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import { GamingPalette } from '../../../components/world-5/gaming/palette';
import { GamingPlants } from '../../../components/world-5/gaming/plants';
import { GamingSummary } from '../../../components/world-5/gaming/summary';
import { GamingSuperbits } from '../../../components/world-5/gaming/superbits';
import { GamingUpgrades } from '../../../components/world-5/gaming/upgrades';
import { Gaming as GamingDomain } from '../../../data/domain/world-5/gaming';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

type GamingTab = 'Plants' | 'Upgrades' | 'Superbits' | 'Palette';

const gamingTabs = [
    { value: 'Plants', label: 'Plants' },
    { value: 'Upgrades', label: 'Upgrades' },
    { value: 'Superbits', label: 'Superbits' },
    { value: 'Palette', label: 'Palette' },
] as const;

function Gaming() {
    const [gaming, setGaming] = useState<GamingDomain>();
    const [activeTab, setActiveTab] = useState<GamingTab>('Plants');
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setGaming(theData.get('gaming'));
    }, [theData, lastUpdated]);

    if (!gaming) {
        return (
            <Box>
                Gaming data is not available. Load an account to view Gaming.
            </Box>
        );
    }

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Gaming</Heading>
            <Box gap="medium">
                <GamingSummary gaming={gaming} />
                <Box gap="small">
                    <ContentTabs options={gamingTabs} value={activeTab} onChange={setActiveTab} />
                    {activeTab === 'Plants' && <GamingPlants gaming={gaming} />}
                    {activeTab === 'Upgrades' && <GamingUpgrades gaming={gaming} />}
                    {activeTab === 'Superbits' && <GamingSuperbits gaming={gaming} />}
                    {activeTab === 'Palette' && <GamingPalette gaming={gaming} />}
                </Box>
            </Box>
        </Box>
    );
}

export default Gaming;