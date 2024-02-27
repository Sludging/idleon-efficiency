import { Box, Grid, Text } from "grommet"
import { PristineCharm } from "../../../data/domain/world-6/sneaking"
import TipDisplay, { TipDirection } from "../../base/TipDisplay"
import IconImage from "../../base/IconImage"

export const PristineCharmSection = ({ charms }: { charms: PristineCharm[] }) => {
    return (
        <Box margin={{ bottom: 'xsmall' }} gap="small">
            <Text size="large">Pristine Charms</Text>
            <Box direction="row" wrap>
                {
                    charms.map((charm, index) => (
                        <Box key={index} style={{ opacity: charm.unlocked == true ? 1 : 0.3 }} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                            <TipDisplay
                                size='medium'
                                heading={charm.data.name}
                                body={charm.getBonusText()}
                                direction={TipDirection.Down}
                            >
                                <Box direction="row" pad={{ vertical: 'small', horizontal: 'xxsmall' }} align="center" gap='small'>
                                    <IconImage data={charm.getImageData()} scale={0.5} />
                                    <Text size="xsmall">{charm.data.name}</Text>
                                </Box>
                            </TipDisplay>
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}