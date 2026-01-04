import { Box, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import { Beanstalking } from "../../../data/domain/world-6/sneaking";

export const BeanstalkingDisplay = ({ beanstalking }: { beanstalking: Beanstalking }) => {
    if (!beanstalking) {
        return (
            <Text>Loading...</Text>
        )
    }

    if (!beanstalking.unlocked) {
        return (
            <Box margin={{ top: 'large' }}>
                <Text>You first need to unlock Beanstalk in the Emporium</Text>
            </Box>            
        )
    }

    return (
        <Box>
            <Box margin={{ top: 'large', bottom: 'small' }} align="center">
                <ShadowBox background="dark-1" pad="small">
                    <Box gap="small">
                        {
                            beanstalking.bonuses.map((bonus, index) => (
                                <Box style={{ opacity: bonus.level > 0 ? 1 : 0.5 }} direction="row" key={index} align="center" gap="xsmall">
                                    <IconImage data={bonus.item.getImageData()} />
                                    <Text color={bonus.level == 2 ? 'green-1' : ''} size="small">{beanstalking.getBonusText(bonus.type)}</Text>
                                </Box>
                            ))
                        }
                    </Box>
                </ShadowBox>
            </Box>
            <Text size="xsmall">* Those bonuses are displayed without any golden food bonus effect as those can widely change between characters</Text>
        </Box>
    )
}
