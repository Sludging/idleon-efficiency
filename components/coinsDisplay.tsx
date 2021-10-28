import {
    Box,
    Text,
    Grid
} from 'grommet'

import { Coins } from '../data/utility';

interface CoinProps {
    coinMap: Map<Coins, number>
}

export default function CoinsDisplay(props: CoinProps) {
    return (
        <Box direction="row" gap="xsmall">
            {
                Array.from(props.coinMap).map(([coin, value]) => {
                    return (
                        <Box direction="row" gap="xsmall">
                            <Box className={`icons-21 icons-Coins${coin.valueOf()}`} />
                            <Text>{value}</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
}