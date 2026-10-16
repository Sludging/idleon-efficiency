import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ClickerBonusSummary from '../../../components/account/clickers/clickerBonusSummary';

export const metadata: Metadata = {
    title: 'Kangaroo',
};

export default function Page() {
    return (
        <Box>
            <Suspense><ClickerBonusSummary clicker="kangaroo" title="Kangaroo" /></Suspense>
        </Box>
    );
}
