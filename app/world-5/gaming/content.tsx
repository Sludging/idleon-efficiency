"use client"

import { Box, Heading } from 'grommet';
import { useState } from 'react';
import ContentTabs from '../../../components/base/ContentTabs';
import { GamingPalette } from '../../../components/world-5/gaming/palette';
import { GamingPlants } from '../../../components/world-5/gaming/plants';
import { GamingSummary } from '../../../components/world-5/gaming/summary';
import { GamingSuperbits } from '../../../components/world-5/gaming/superbits';
import { GamingUpgrades } from '../../../components/world-5/gaming/upgrades';
import { Gaming as GamingDomain } from '../../../data/domain/world-5/gaming';
import { Menagerie } from '../../../data/domain/menagerie';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';

type GamingTab = 'Plants' | 'Upgrades' | 'Superbits' | 'Palette';

const gamingTabs = [
    { value: 'Plants', label: 'Plants' },
    { value: 'Upgrades', label: 'Upgrades' },
    { value: 'Superbits', label: 'Superbits' },
    { value: 'Palette', label: 'Palette' },
] as const;

function Gaming() {
    const hydrated = useHydrated();
    const [activeTab, setActiveTab] = useState<GamingTab>('Plants');
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const gaming = theData.get('gaming') as GamingDomain | undefined;
    const menagerie = theData.get('menagerie') as Menagerie;

    if (!hydrated || !gaming) {
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
                    {activeTab === 'Palette' && <GamingPalette gaming={gaming} menagerie={menagerie} />}
                </Box>
            </Box>
        </Box>
    );
}

export default Gaming;