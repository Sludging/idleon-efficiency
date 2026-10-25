import { Box } from 'grommet';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import HatRackContent from './content';

export const metadata: Metadata = {
    title: 'Hat Rack',
};

export default function Page() {
    return (
        <Box>
            <Suspense><HatRackContent /></Suspense>
        </Box>
    );
}
