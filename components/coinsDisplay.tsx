import {
    Box,
    Text,
    Grid
} from 'grommet'
import { ImageData } from '../data/domain/imageData';

import { Coins } from '../data/utility';
import IconImage from './base/IconImage';

interface CoinProps {
    coinMap: Map<Coins, number>
    maxCoins?: number
    regularRow?: boolean
}

export default function CoinsDisplay(props: CoinProps) {

    const getCoinClass = (coin: Coins): ImageData => {
        return {
            location: `Coins${coin.valueOf()}`,
            height: 21, //coin.valueOf() > 5 ? 23 : 21,
            width: 21, //coin.valueOf() > 5 ? 27 : 21
        }
    }

    return (
        <Box direction={props.regularRow ? "row" : "row-responsive"} gap="xsmall">
            {
                Array.from(props.coinMap).map(([coin, value], index) => {
                    if (!props.maxCoins || index < props.maxCoins) {
                        return (
                            <Box key={`coin-${coin.valueOf()}`} direction="row" gap="xsmall">
                                <IconImage data={getCoinClass(coin)} />
                                <Text>{value}</Text>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}