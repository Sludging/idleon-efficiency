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

    const getCoinClass = (coin: Coins) => {
        if (coin.valueOf() > 5) {
            return `icons-23 icons-Coins${coin.valueOf()}`
        }
        return `icons-21 icons-Coins${coin.valueOf()}`
    }

    return (
        <Box direction="row" gap="xsmall">
            {
                Array.from(props.coinMap).map(([coin, value]) => {
                    return (
                        <Box key={`coin-${coin.valueOf()}`} direction="row" gap="xsmall">
                            <Box className={getCoinClass(coin)} />
                            <Text>{value}</Text>
                        </Box>
                    )
                })
            }
        </Box>
    )
}