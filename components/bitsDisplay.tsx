'use client'

import { Box, Text, TextProps } from 'grommet';
import { ImageData } from '../data/domain/imageData';
import { CoinStrings, notateNumber } from '../data/utility';
import IconImage from './base/IconImage';

interface BitsDisplayProps {
    value: number | string;
    scale?: number;
    textSize?: TextProps['size'];
    textColor?: TextProps['color'];
}

const bitsTierImages: Readonly<Record<string, ImageData>> = {
    [CoinStrings[5]]: { location: 'GamingBitsWhite', height: 24, width: 26 },
    [CoinStrings[6]]: { location: 'GamingBitsGreen', height: 24, width: 26 },
    [CoinStrings[7]]: { location: 'GamingBitsRed', height: 24, width: 26 },
    [CoinStrings[8]]: { location: 'GamingBitsPurple', height: 24, width: 26 },
    [CoinStrings[9]]: { location: 'GamingBitsBlue', height: 24, width: 26 },
    [CoinStrings[10]]: { location: 'GamingBitsGold', height: 24, width: 26 },
};

export default function BitsDisplay({ value, scale = 1, textSize = 'small', textColor }: BitsDisplayProps) {
    if (value === '') {
        return null;
    }

    const formattedValue = typeof value === 'number' ? notateNumber(value, 'Bits') : value;
    const suffix = formattedValue.slice(-1);
    const imageData = bitsTierImages[suffix];

    return (
        <Box direction="row" align="center" gap="xsmall" flex={false} style={{ whiteSpace: 'nowrap' }}>
            <IconImage data={imageData} scale={scale} />
            <Text size={textSize} color={textColor}>{formattedValue.slice(0, -1)}</Text>
        </Box>
    );
}
