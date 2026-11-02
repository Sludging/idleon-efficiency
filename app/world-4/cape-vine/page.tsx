import { Box } from 'grommet';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import CapeVineContent from './content';

export const metadata: Metadata = {
    title: 'Cape Vine',
};

export default function Page() {
    return (
        <Box>
            <Suspense><CapeVineContent /></Suspense>
        </Box>
    );
}
