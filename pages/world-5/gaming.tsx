import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';


function Gaming() {
    return (
        <Box>
            <NextSeo title="Gaming" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Gaming</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box>
                NOT IMPLEMENTED YET
            </Box>
        </Box>
    )
}

export default Gaming;