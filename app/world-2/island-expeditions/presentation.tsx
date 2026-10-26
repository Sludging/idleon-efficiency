'use client';

import { Box, Text } from 'grommet';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { ResourceDisplay } from '../../../components/account/shared/ResourceDisplay';
import IconImage from '../../../components/base/IconImage';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import type { ImageData } from '../../../data/domain/imageData';
import { Item } from '../../../data/domain/items';

export const GreyCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

const CenteredResourceAmount = styled(Box)`
    > div {
        align-items: center;
    }
`;

export function IslandResourceAmount({ image, amount, textSize = 'small' }: {
    image: ImageData;
    amount: number;
    textSize?: string;
}) {
    return <CenteredResourceAmount data-testid="island-resource-amount">
        <ResourceDisplay cost={amount} resourceImageData={image} textSize={textSize} resourceImageScale={0.8} showTooltip={false} />
    </CenteredResourceAmount>;
}

export function RewardCard({ name, itemId, completed = false, children, testId }: {
    name: string;
    itemId?: string;
    completed?: boolean;
    children: ReactNode;
    testId: string;
}) {
    return <RoundedShadowBox background="dark-1" pad="none" overflow="hidden" data-testid={testId}
        style={{ opacity: completed ? 0.65 : 1, display: 'grid', gridRow: 'span 2', gridTemplateRows: 'subgrid', rowGap: 0 }}>
        <GreyCardHeader direction="row" align="center" gap="small" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
            {itemId && <IconImage data={Item.getImageData(itemId)} scale={0.9} />}
            <Text size="small" weight="bold">{name}</Text>
        </GreyCardHeader>
        <Box pad="medium" gap="small">{children}</Box>
    </RoundedShadowBox>;
}

export function EffectPreview({ current, next }: { current: string; next: string }) {
    return <Box background="dark-3" pad="small" round="xsmall" direction="row" gap="xsmall" align="center" wrap>
        <Text size="small" weight="bold">{current}</Text>
        <Text size="small" color="accent-2">→ {next}</Text>
    </Box>;
}

export function IslandCost({ label = 'Next cost', amount, image }: { label?: string; amount: number; image: ImageData }) {
    return <Box direction="row" gap="small" align="center">
        <Text size="xsmall" color="accent-2">{label}</Text>
        <IslandResourceAmount image={image} amount={amount} />
    </Box>;
}
