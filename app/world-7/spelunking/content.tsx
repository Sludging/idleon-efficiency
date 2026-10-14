'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text } from 'grommet';
import ContentTabs from '../../../components/base/ContentTabs';
import { useShallow } from 'zustand/react/shallow';
import SpelunkingDisplay, { CollectionStatus } from '../../../components/world-7/spelunking/spelunkingDisplay';
import { SpelunkingCharacters, SpelunkingJournal } from '../../../components/world-7/spelunking/spelunkingPart2';
import type { Player } from '../../../data/domain/player';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

type SpelunkingTab = 'Tunnels' | 'Journal & Pages' | 'Characters';

export default function SpelunkingContent() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const [snapshot, setSnapshot] = useState<{ spelunking: Spelunking; players: Player[] }>();
    const [hydrated, setHydrated] = useState(false);
    const [tab, setTab] = useState<SpelunkingTab>('Tunnels');

    useEffect(() => {
        const spelunking = theData.get('spelunking') as Spelunking;
        const players = theData.get('players') as Player[];
        setSnapshot(players.length > 0 ? { spelunking, players } : undefined);
        setHydrated(true);
    }, [theData, lastUpdated]);
    const [showLocked, setShowLocked] = useState(true);
    const [collectionStatus, setCollectionStatus] = useState<CollectionStatus>('All');

    if (!hydrated) {
        return <>Loading Spelunking data</>;
    }

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'none' }} style={{ fontWeight: 'normal' }}>Spelunking</Heading>
            <ContentTabs
                options={[
                    { value: 'Tunnels', label: 'Tunnels' },
                    { value: 'Journal & Pages', label: 'Journal & Pages' },
                    { value: 'Characters', label: 'Characters' },
                ]}
                value={tab}
                onChange={setTab}
            />
            {!snapshot ? (
                <Box gap="small">
                    <Text>Spelunking account data is not available.</Text>
                    <Text size="small">Load an account save to view Spelunking data.</Text>
                </Box>
            ) : <>
                {tab === 'Tunnels' && (
                    <SpelunkingDisplay
                        spelunking={snapshot.spelunking}
                        showLocked={showLocked}
                        collectionStatus={collectionStatus}
                        onShowLockedChange={setShowLocked}
                        onCollectionStatusChange={setCollectionStatus}
                    />
                )}
                {tab === 'Journal & Pages' && <SpelunkingJournal spelunking={snapshot.spelunking} players={snapshot.players} />}
                {tab === 'Characters' && <SpelunkingCharacters spelunking={snapshot.spelunking} players={snapshot.players} />}
            </>}
        </Box>
    );
}
