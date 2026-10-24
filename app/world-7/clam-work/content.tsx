'use client';

import { Box, Heading, Text } from 'grommet';
import { useShallow } from 'zustand/react/shallow';
import { ClamWorkOverview } from '../../../components/world-7/clam-work/clamWorkOverview';
import { CompensationRewards } from '../../../components/world-7/clam-work/compensationRewards';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

export default function ClamWorkContent() {

    const { theData } = useAppDataStore(useShallow(state => ({
        theData: state.data.getData(),
        lastUpdated: state.lastUpdated,
    })));
    const clamworks = theData.get('clamworks') as Clamworks | undefined;

    if (!clamworks) {
        return <>Loading...</>;
    }
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
