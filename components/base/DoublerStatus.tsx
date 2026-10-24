'use client';

import { Box, Text } from 'grommet';
import type { ReactNode } from 'react';
import type { ImageData } from '../../data/domain/imageData';
import { commaNotation } from '../../data/utility';
import IconImage from './IconImage';
import { ComponentAndLabel } from './TextAndLabel';
import TipDisplay from './TipDisplay';

export function DoublerSummary({ label, owned, available, image, description }: {
    label: string;
    owned: number;
    available: number;
    image: ImageData;
    description: ReactNode;
}) {
    return <Box direction="row" gap="small" align="center" aria-label={`${label} status`}>
        <ComponentAndLabel
            label={label}
            component={
                <TipDisplay
                    heading={label}
                    body={description}
                    maxWidth="350px"
                >
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={image} scale={0.75} />
                        <Text size="small">{commaNotation(available)}/{commaNotation(owned)}</Text>
                    </Box>
                </TipDisplay>
            }
        />
    </Box>;
}

export function DoublerBadge({ image, label, scale = 0.7 }: { image: ImageData; label: string; scale?: number }) {
    return <Box role="img" aria-label={label} flex={false}>
        <IconImage data={image} scale={scale} />
    </Box>;
}
