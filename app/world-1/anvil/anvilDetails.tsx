"use client"

import { Box, Text } from 'grommet';
import { Anvil, AnvilProduct } from '../../../data/domain/world-1/anvil';
import { commaNotation, notateNumber } from '../../../data/utility';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import { StaticTime } from '../../../components/base/TimeDisplay';

export function AnvilProductProgress({ anvil, product }: { anvil: Anvil; product: AnvilProduct }) {
    const amount = Math.max(0, Math.min(product.futureProduction, anvil.productCapacity));
    const percentage = anvil.productCapacity > 0 ? 100 * amount / anvil.productCapacity : 0;

    return <Box gap="small" width={{ min: '230px' }}>
        <Box gap="xxsmall">
            <TipDisplay heading="Product capacity" body={`${commaNotation(product.futureProduction)} / ${commaNotation(anvil.productCapacity)} items`}>
                <Text size="xsmall">{notateNumber(product.futureProduction)} / {notateNumber(anvil.productCapacity)} items ({percentage.toFixed(1)}%)</Text>
            </TipDisplay>
            <Box background="grey-1" height="8px" overflow="hidden" role="progressbar"
                aria-label={`${product.displayName} capacity`} aria-valuemin={0}
                aria-valuemax={anvil.productCapacity} aria-valuenow={amount}>
                <Box background="brand" height="8px" flex={false} style={{ width: `${percentage}%` }} />
            </Box>
            {product.hammers > 0 && product.futureProduction < anvil.productCapacity &&
                <ComponentAndLabel
                    label="Time till cap"
                    labelSize="xsmall"
                    component={<StaticTime fromSeconds={product.timeTillCap} />}
                />
            }
        </Box>
        <TextAndLabel label="Stored EXP" text={notateNumber(product.currentXP)} textSize="small" labelSize="xsmall" />
    </Box>;
}

