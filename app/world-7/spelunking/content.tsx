'use client';

import { useEffect, useState } from 'react';
import { Box, Heading, Text } from 'grommet';
import ContentTabs from '../../../components/base/ContentTabs';
import TipDisplay from '../../../components/base/TipDisplay';
import { useShallow } from 'zustand/react/shallow';
import SpelunkingDisplay, { CollectionStatus } from '../../../components/world-7/spelunking/spelunkingDisplay';
import { SpelunkingCharacters, SpelunkingJournal, SpelunkingSummary } from '../../../components/world-7/spelunking/spelunkingPart2';
import type { Player } from '../../../data/domain/player';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

type SpelunkingTab = 'Tunnels' | 'Journal & Pages';

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
        <Box gap="small" data-spelunking-content>
            <Box direction="row" align="center" justify="between">
                <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>Spelunking</Heading>
                <TipDisplay heading="About soft caps" maxWidth="420px" body={
                    <Box gap="xsmall" data-spelunking-soft-cap-detail>
                        <Text color="dark-1" size="small">Each new level adds less to these bonuses. Soft caps show their upper limit at your current Sailing artifact strength.</Text>
                        <Text color="dark-1" size="small">Bars show progress from levels, starting at 0%. They do not reach 100%.</Text>
                    </Box>
                }>
                    <Text size="12px" color="accent-2" data-spelunking-soft-cap-trigger style={{ textDecoration: 'underline dotted' }}>About soft caps</Text>
                </TipDisplay>
            </Box>
            {!snapshot ? (
                <Box gap="small">
                    <Text>Spelunking account data is not available.</Text>
                    <Text size="small">Load an account save to view Spelunking data.</Text>
                </Box>
            ) : <Box gap="small">
                <SpelunkingSummary spelunking={snapshot.spelunking} players={snapshot.players} />
                <SpelunkingCharacters spelunking={snapshot.spelunking} players={snapshot.players} />
                <Box data-spelunking-tab-region>
                    <ContentTabs
                        options={[
                            { value: 'Tunnels', label: 'Tunnels' },
                            { value: 'Journal & Pages', label: 'Journal & Pages' },
                        ]}
                        value={tab}
                        onChange={setTab}
                    />
                </Box>
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
            </Box>}
        </Box>
    );
}
