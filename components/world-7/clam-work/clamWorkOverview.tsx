'use client';

import { Box, Text } from 'grommet';
import type { ThemeType } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import styled from 'styled-components';
import IconImage from '../../base/IconImage';
import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { Item } from '../../../data/domain/items';
import { notateNumber, commaNotation } from '../../../data/utility';

const SummaryGroups = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    min-width: 0;

    > *:not(:first-child) {
        border-left: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
        padding-left: 16px;
    }

    @media (max-width: 640px) {
        grid-template-columns: minmax(0, 1fr);

        > *:not(:first-child) {
            border-left: 0;
            padding-left: 0;
            border-top: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
            padding-top: 12px;
        }
    }
`;

const MetricGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 24px;
    min-width: 0;

    @media (max-width: 640px) {
        gap: 12px;
    }
`;

const Metric = ({ value, label, size = 'large', color }: { value: string; label: React.ReactNode; size?: 'xxlarge' | 'large'; color?: string }) => (
    <Box style={{ minWidth: 0 }}>
        <Text size={size} weight="normal" color={color} style={{ overflowWrap: 'anywhere' }}>{value}</Text>
        <Text size="xsmall" color="accent-2">{label}</Text>
    </Box>
);


export function ClamWorkOverview({ clamworks }: { clamworks: Clamworks }) {
    const chance = Math.ceil(clamworks.getPromoChance() * 100);
    const cost = clamworks.getPromoTryCost();
    const affordableColor = clamworks.pearlsOwned >= cost ? 'status-ok' : undefined;

    return (
        <SummaryGroups>
            <Box gap="small">
                <Box justify="center" height="32px">
                    <Text size="small">Worker Class</Text>
                </Box>
                <MetricGrid>
                    <Metric value={commaNotation(clamworks.promoLevel)} label="Class" size="xxlarge" />
                    <Metric value={`${chance}%`} label="Promotion chance" />
                    <Metric value={notateNumber(cost)} label={<Box direction="row" align="center" gap="xxsmall"><IconImage data={Item.getImageData("Clam_Pearl")} scale={0.55} /><Text size="xsmall" color="accent-2">Pearl cost</Text></Box>} color={affordableColor} />
                </MetricGrid>
            </Box>
            <Box gap="small">
                <Box justify="center" height="32px">
                    <Text size="small">Pearls</Text>
                </Box>
                <MetricGrid>
                    <Metric value={notateNumber(clamworks.pearlsOwned)} label={<Box direction="row" align="center" gap="xxsmall"><IconImage data={Item.getImageData("Clam_Pearl")} scale={0.55} /><Text size="xsmall" color="accent-2">Owned</Text></Box>} size="xxlarge" />
                </MetricGrid>
            </Box>
        </SummaryGroups>
    );
}
