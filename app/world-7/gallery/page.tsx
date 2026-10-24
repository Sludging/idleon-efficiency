import { Box } from 'grommet';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import GalleryContent from './content';

export const metadata: Metadata = {
    title: 'Gallery',
};

export default function Page() {
    return (
        <Box>
            <Suspense><GalleryContent /></Suspense>
        </Box>
    );
}
