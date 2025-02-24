import {
    Box,
    Text,
    Grid
} from 'grommet'
import { ImageData } from '../data/domain/imageData';

import { Coins, nFormatter } from '../data/utility';
import IconImage from './base/IconImage';

interface CoinProps {
    coinMap: Map<Coins, number>
    maxCoins?: number
    regularRow?: boolean
    coinScale?: number
}

export default function CoinsDisplay(props: CoinProps) {

    const getCoinClass = (coin: Coins): ImageData => {
        return {
            location: `Coins${coin.valueOf()}`,
            height: 21, //coin.valueOf() > 5 ? 23 : 21,
            width: 21, //coin.valueOf() > 5 ? 27 : 21
        }
    }

    // Special handling for the most expensive coin, if quantity is greater than 10000
    if (props.coinMap.has(Coins.Eclipse) && props.coinMap.get(Coins.Eclipse)! > 10000) {
        const coin = Coins.Eclipse;
        const value = props.coinMap.get(coin)!;
        // We return a formatted value of only the most expensive coin.
        return (
            <Box key={`coin-${coin.valueOf()}`} direction="row" gap="xsmall">
                <IconImage data={getCoinClass(coin)} scale={props.coinScale ? props.coinScale : 1} />
                <Text>{nFormatter(value)}</Text>
            </Box>
        )
    }

    return (
        <Box direction={props.regularRow ? "row" : "row-responsive"} gap="small">
            {
                Array.from(props.coinMap).map(([coin, value], index) => {
                    if (!props.maxCoins || index < props.maxCoins) {
                        return (
                            <Box key={`coin-${coin.valueOf()}`} direction="row" gap="xsmall">
                                <IconImage data={getCoinClass(coin)} scale={props.coinScale ? props.coinScale : 1} />
                                <Text>{value}</Text>
                            </Box>
                        )
                    }
                })
            }
        </Box>
    )
}
