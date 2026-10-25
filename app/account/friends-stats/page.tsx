import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import FriendsStatsContent from './content';

export const metadata: Metadata = {
    title: 'Friends Stats',
};

export default function Page() {
    return (
        <Box>
            <Suspense><FriendsStatsContent /></Suspense>
        </Box>
    );
}
