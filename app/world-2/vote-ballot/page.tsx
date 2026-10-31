import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import VoteBallotContent from './content';

export const metadata: Metadata = {
    title: 'Vote Ballot',
};

export default function Page() {
    return (
        <Box>
            <Suspense><VoteBallotContent /></Suspense>
        </Box>
    );
}
