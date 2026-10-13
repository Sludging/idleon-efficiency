'use client';

import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import SpelunkingDisplay, { CollectionStatus } from '../../../components/world-7/spelunking/spelunkingDisplay';
import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

export default function SpelunkingContent() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const [spelunking, setSpelunking] = useState<Spelunking>();
    useEffect(() => {
        setSpelunking(theData.get('spelunking') as Spelunking | undefined);
    }, [theData, lastUpdated]);
    const [showLocked, setShowLocked] = useState(true);
    const [collectionStatus, setCollectionStatus] = useState<CollectionStatus>('All');

    if (!spelunking) {
        return <>Loading Spelunking data</>;
    }

    return (
        <SpelunkingDisplay
            spelunking={spelunking}
            showLocked={showLocked}
            collectionStatus={collectionStatus}
            onShowLockedChange={setShowLocked}
            onCollectionStatusChange={setCollectionStatus}
        />
    );
}
