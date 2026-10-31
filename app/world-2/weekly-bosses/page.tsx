import { Box } from 'grommet';
import { Metadata } from 'next';
import { Suspense } from 'react';
import WeeklyBossesContent from './content';

export const metadata: Metadata = {
    title: 'Weekly Bosses',
};

export default function Page() {
    return (
        <Box>
            <Suspense><WeeklyBossesContent /></Suspense>
        </Box>
    );
}
