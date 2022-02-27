import {
    Box,
    Text,
    Grid
} from 'grommet'

import { Coins } from '../data/utility';

interface CoinProps {
    coinMap: Map<Coins, number>
    maxCoins?: number
    regularRow?: boolean
}

export default function CoinsDisplay(props: CoinProps) {

    const getCoinClass = (coin: Coins) => {
        if (coin.valueOf() > 5) {
            return `icons-2327 icons-Coins${coin.valueOf()}`
        }
        return `icons-2121 icons-Coins${coin.valueOf()}`
    }

    return (
        <Box direction={props.regularRow ? "row" : "row-responsive"}  gap="xsmall">
            {
                Array.from(props.coinMap).map(([coin, value], index) => {
                    if (!props.maxCoins || index < props.maxCoins) {
                        return (
                            <Box key={`coin-${coin.valueOf()}`} direction="row" gap="xsmall">
                                <Box width={{ max: '23px', min: '21px' }} fill>
                                    <Box className={getCoinClass(coin)} />
                                </Box>
                                <Text>{value}</Text>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}