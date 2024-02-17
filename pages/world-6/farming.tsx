import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';

function Farming() {
    return (
        <Box>
            <NextSeo title="Farming" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Farming</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
        </Box>
    )
}

export default Farming;