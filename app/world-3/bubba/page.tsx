import { Box } from 'grommet';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ClickerBonusSummary from '../../../components/account/clickers/clickerBonusSummary';

export const metadata: Metadata = {
    title: 'Bubba',
};

export default function Page() {
    return (
        <Box>
            <Suspense><ClickerBonusSummary clicker="bubba" title="Bubba" /></Suspense>
        </Box>
    );
}
