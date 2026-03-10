import { Box, Text } from 'grommet';
import { ImageData } from '../../data/domain/imageData';
import IconImage from './IconImage';
import TipDisplay, { TipDirection } from './TipDisplay';
import { nFormatter } from '../../data/utility';

interface ResourceCountTileProps {
    imageData: ImageData;
    count: number;
    iconScale?: number;
    tooltipHeading?: string;
}

export default function ResourceCountTile({ imageData, count, iconScale, tooltipHeading }: ResourceCountTileProps) {
    const content = (
        <Box direction="row" pad={{ vertical: 'small' }} align="center" gap="xsmall">
            <IconImage data={imageData} scale={iconScale} />
            <Text size="xsmall">{nFormatter(count)}</Text>
        </Box>
    );

    return (
        <Box border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
            {tooltipHeading ? (
                <TipDisplay
                    size="medium"
                    heading={tooltipHeading}
                    direction={TipDirection.Down}
                >
                    {content}
                </TipDisplay>
            ) : (
                content
            )}
        </Box>
    );
}
