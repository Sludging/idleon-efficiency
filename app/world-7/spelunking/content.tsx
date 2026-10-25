'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { Box, Heading, Text } from 'grommet';
import ContentTabs from '../../../components/base/ContentTabs';
import TipDisplay from '../../../components/base/TipDisplay';
import { useShallow } from 'zustand/react/shallow';
import SpelunkingDisplay, { CollectionStatus } from '../../../components/world-7/spelunking/spelunkingDisplay';
import { SpelunkingCharacters, SpelunkingJournal, SpelunkingSummary } from '../../../components/world-7/spelunking/spelunkingPart2';
import { SpelunkingElixirs, SpelunkingManicModeDetail, SpelunkingPart3Summary, SpelunkingShop } from '../../../components/world-7/spelunking/spelunkingPart3';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import type { Player } from '../../../data/domain/player';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';

type SpelunkingTab = 'Tunnels' | 'Journal & Pages' | 'Shop' | 'Elixirs';
function scrollOwner(element: HTMLElement | null): HTMLElement {
    let owner = element?.parentElement ?? null;
    while (owner) {
        if (/(auto|scroll)/.test(getComputedStyle(owner).overflowY) && owner.scrollHeight > owner.clientHeight) return owner;
        owner = owner.parentElement;
    }
    return document.scrollingElement as HTMLElement;
}

export default function SpelunkingContent() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const spelunking = theData.get('spelunking') as Spelunking;
    const players = theData.get('players') as Player[];
    const [tab, setTab] = useState<SpelunkingTab>('Tunnels');
    const contentRef = useRef<HTMLDivElement>(null);
    const pendingScroll = useRef<{ owner: HTMLElement; top: number } | null>(null);
    const tabScrollPositions = useRef(new Map<SpelunkingTab, { owner: HTMLElement; top: number }>());
    useLayoutEffect(() => {
        if (pendingScroll.current !== null) {
            const { owner, top } = pendingScroll.current;
            pendingScroll.current = null;
            requestAnimationFrame(() => {
                owner.scrollTop = top;
            });
        }
    }, [tab]);

    const [showLocked, setShowLocked] = useState(true);
    const [collectionStatus, setCollectionStatus] = useState<CollectionStatus>('All');

    if (!hydrated) {
        return <>Loading Spelunking data</>;
    }



    return (
        <Box gap="large" data-spelunking-content>
            <Box direction="row" align="center" justify="between">
                <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>Spelunking</Heading>
            </Box>
            <Box ref={contentRef} gap="large" data-spelunking-tab-content>
                <SpelunkingSummary
                    spelunking={spelunking}
                    players={players}
                    manicDetail={<SpelunkingManicModeDetail spelunking={spelunking} />}
                >
                    <SpelunkingPart3Summary spelunking={spelunking} />
                </SpelunkingSummary>
                <SpelunkingCharacters spelunking={spelunking} players={players} />
                <Box gap="medium" data-spelunking-tab-group>
                    <Box align="center" data-spelunking-tab-region>
                        <ContentTabs
                            options={[
                                { value: 'Tunnels', label: 'Tunnels' },
                                { value: 'Journal & Pages', label: 'Journal & Pages' },
                                { value: 'Shop', label: 'Shop' },
                                { value: 'Elixirs', label: 'Elixirs' },
                            ]}
                            value={tab}
                            onChange={nextTab => {
                                const owner = scrollOwner(contentRef.current);
                                const position = { owner, top: owner.scrollTop };
                                tabScrollPositions.current.set(tab, position);
                                pendingScroll.current = tabScrollPositions.current.get(nextTab) ?? position;
                                setTab(nextTab);
                            }}
                        />
                    </Box>
                    <Box data-spelunking-panels>
                        <Box style={{ display: tab === 'Tunnels' ? undefined : 'none' }} data-spelunking-tab-panel="Tunnels">
                            <SpelunkingDisplay
                                spelunking={spelunking}
                                showLocked={showLocked}
                                collectionStatus={collectionStatus}
                                onShowLockedChange={setShowLocked}
                                onCollectionStatusChange={setCollectionStatus}
                            />
                        </Box>
                        <Box style={{ display: tab === 'Journal & Pages' ? undefined : 'none' }} gap="small" data-spelunking-journal data-spelunking-tab-panel="Journal & Pages">
                            <Box align="end">
                                <TipDisplay heading="About soft caps" maxWidth="420px" body={
                                    <Box gap="xsmall" data-spelunking-soft-cap-detail>
                                        <Text color="dark-1" size="small">Majority of lore bonuses have soft caps..</Text>
                                    </Box>
                                }>
                                    <Text size="xsmall" color="accent-2" data-spelunking-soft-cap-trigger style={{ textDecoration: 'underline dotted' }}>About soft caps</Text>
                                </TipDisplay>
                            </Box>
                            <SpelunkingJournal spelunking={spelunking} players={players} />
                        </Box>
                        <Box style={{ display: tab === 'Shop' ? undefined : 'none' }} data-spelunking-tab-panel="Shop">
                            <SpelunkingShop spelunking={spelunking} />
                        </Box>
                        <Box style={{ display: tab === 'Elixirs' ? undefined : 'none' }} data-spelunking-tab-panel="Elixirs">
                            <SpelunkingElixirs spelunking={spelunking} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
