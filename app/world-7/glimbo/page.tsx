import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import GlimboContent from './content';

export const metadata: Metadata = {
    title: 'Glimbo',
};

export default function Page() {
    return (
        <Box>
            <Suspense><GlimboContent /></Suspense>
        </Box>
    );
}
