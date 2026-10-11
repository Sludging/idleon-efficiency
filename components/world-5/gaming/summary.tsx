import { Box, Text } from 'grommet';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { KingRatImport, ShovelImport, SnailImport, SprinklerImport, SquirrelImport } from '../../../data/domain/world-5/gaming/imports';
import { commaNotation, notateNumber } from '../../../data/utility';
import { ResourceDisplay } from '../../account/shared/ResourceDisplay';
import IconImage from '../../base/IconImage';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import BitsDisplay from '../../bitsDisplay';

export function GamingSummary({ gaming }: { gaming: Gaming }) {
    const sprinkler = gaming.getImport(0) as SprinklerImport;
    const shovel = gaming.getImport(1) as ShovelImport;
    const squirrel = gaming.getImport(2) as SquirrelImport;
    const snail = gaming.getImport(7) as SnailImport;
    const kingRat = gaming.getImport(8) as KingRatImport;

    return (
        <Box gap="small" background="dark-1" pad="medium">
            <Box direction="row" wrap gap="medium" align="start">
                <Box direction="row" wrap gap="medium" align="start" flex={false}>
                    <TextAndLabel label="Gaming level" text={String(gaming.level)} textSize="small" />
                    <ComponentAndLabel
                        label="Bits"
                        component={<BitsDisplay value={gaming.bits} />}
                    />
                    <TextAndLabel
                        label="Plant capacity"
                        text={`${gaming.garden.capacity} / ${gaming.garden.maximumCapacity} plants`}
                        textSize="small"
                        tooltip={`Sprout Capacity and Lava Sprouts increase capacity, up to ${gaming.garden.maximumCapacity} plants.`}
                    />
                </Box>
                {(sprinkler.purchased || shovel.purchased || snail.purchased) && (
                    <Box direction="row" wrap gap="medium" align="start" flex={false} border={{ side: 'left', color: 'grey-1' }} pad={{ left: 'medium' }}>
                        {sprinkler.purchased && (
                            <TextAndLabel label="Water" text={commaNotation(sprinkler.waterCharges)} textSize="small" />
                        )}
                        {shovel.purchased && (
                            <TextAndLabel label="Digs" text={commaNotation(shovel.digs)} textSize="small" />
                        )}
                        {snail.purchased && (
                            <ComponentAndLabel
                                label="Mail"
                                component={<ResourceDisplay cost={snail.mail} resourceImageData={snail.getMailImageData()} resourceImageScale={1} textSize="small" />}
                            />
                        )}
                    </Box>
                )}
            </Box>
            {(squirrel.purchased || kingRat.purchased) && (
                <Box direction="row" wrap gap="medium" align="start" border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }}>
                    {squirrel.purchased && (
                        <Box direction="row" wrap gap="medium" align="start" flex={false}>
                            <ComponentAndLabel
                                label="Acorns"
                                component={<ResourceDisplay cost={squirrel.acorns} resourceImageData={squirrel.getCurrencyImageData()} resourceImageScale={1} textSize="small" />}
                            />
                            <TextAndLabel
                                label="One-hour acorn yield"
                                text={notateNumber(squirrel.acornsPerHour, 'Smaller')}
                                textSize="small"
                                tooltip="Yield for one hour after collection. Acorns do not accumulate at a constant hourly rate."
                            />
                        </Box>
                    )}
                    {kingRat.purchased && (
                        <Box
                            direction="row"
                            wrap
                            gap="medium"
                            align="start"
                            flex={false}
                            border={squirrel.purchased ? { side: 'left', color: 'grey-1' } : undefined}
                            pad={squirrel.purchased ? { left: 'medium' } : undefined}
                        >
                            <ComponentAndLabel
                                label="King Tokens"
                                component={<ResourceDisplay cost={kingRat.tokens} resourceImageData={kingRat.getCurrencyImageData()} resourceImageScale={1} textSize="small" />}
                            />
                            <TextAndLabel
                                label="King Tokens / hour"
                                text={notateNumber(kingRat.tokensPerHour, 'Smaller')}
                                textSize="small"
                            />
                            <ComponentAndLabel
                                label="Total crowns"
                                component={
                                    <Box direction="row" align="center" gap="small">
                                        <IconImage data={kingRat.getCrownImageData()} scale={0.7} />
                                        <Text size="small">{kingRat.crownCount}</Text>
                                    </Box>
                                }
                            />
                            <TextAndLabel
                                label="King Rat Bits multiplier"
                                text={`${notateNumber(kingRat.bitsMultiplier, 'MultiplierInfo').replace('#', '')}x`}
                                textSize="small"
                            />
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}
