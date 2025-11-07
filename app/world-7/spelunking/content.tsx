"use client"

import {
    Box,
    Heading,
} from 'grommet'
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function Spelunking() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Coming Soon</Heading>
        </Box>
    )
}

export default Spelunking;
