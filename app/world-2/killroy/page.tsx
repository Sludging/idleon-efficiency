import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import KillroyContent from './content';

export const metadata: Metadata = {
    title: 'Killroy',
};

export default function Page() {
    return <Box><Suspense><KillroyContent /></Suspense></Box>;
}
