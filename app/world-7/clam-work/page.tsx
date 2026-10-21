import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ClamWorkContent from './content';

export const metadata: Metadata = {
    title: 'Clam Work',
};

export default function Page() {
    return (
        <Box>
            <Suspense><ClamWorkContent /></Suspense>
        </Box>
    );
}
