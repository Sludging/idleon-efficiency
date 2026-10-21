'use client';

import { Box, Heading, Text } from 'grommet';
import { useShallow } from 'zustand/react/shallow';
import { ClamWorkOverview } from '../../../components/world-7/clam-work/clamWorkOverview';
import { CompensationRewards } from '../../../components/world-7/clam-work/compensationRewards';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { DataStatus } from '../../../lib/stores/appDataStore';

export default function ClamWorkContent() {
    const { theData, dataStatus } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        dataStatus: state.dataStatus,
        lastUpdated: state.lastUpdated,
    })));
 
    if (![DataStatus.LiveData, DataStatus.StaticData].includes(dataStatus)) {
        return <>Loading...</>;
    }

    const clamworks = theData.get('clamworks') as Clamworks;

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" margin={{ top: 'medium', bottom: 'small' }} style={{ fontWeight: 'normal' }}>
                Clam Work
            </Heading>
            <ClamWorkOverview clamworks={clamworks} />
            <Box gap="small">
                <Text size="small" weight={600}>Compensations</Text>
                <CompensationRewards clamworks={clamworks} />
            </Box>
        </Box>
    );
}
