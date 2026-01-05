import { Box, Grid, Stack, Text } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import { SneakingItem, SneakingTrinket, SneakingWeapon } from "../../../data/domain/world-6/sneaking";
import { NinjaItemTypeEnum } from "../../../data/domain/enum/ninjaItemTypeEnum";
import TipDisplay from "../../base/TipDisplay";

export const SneakingInventory = ({ inventory }: { inventory: (SneakingItem | undefined)[] }) => {
    return (
        <Box>
            <Box direction="row" wrap margin={{ top: 'large', bottom: 'large' }}>
                <Grid columns={{ size: 'auto', count: 13 }} gap="medium" pad="xsmall" fill>
                    {
                        inventory
                            .map((item, index) => {
                                if (!item) {
                                    return (
                                        <ShadowBox key={index} style={{ opacity: 0.6 }} justify="center" align="center" background="dark-1" pad="medium" gap="medium">
                                            <Box gap="small">
                                                <Text size="small">Empty</Text>
                                            </Box>
                                        </ShadowBox>
                                    )
                                } else {
                                    let levelDisplay = "";
                                    let level = 0;
                                    if (item.data.itemType == NinjaItemTypeEnum.Trinket) {
                                        level = (item as SneakingTrinket).level;
                                    }
                                    if (item.data.itemType == NinjaItemTypeEnum.Weapon) {
                                        level = (item as SneakingWeapon).level;
                                    }
                                    if (level > 0) {
                                        levelDisplay = `+${level}`;
                                    }

                                    return (
                                        <ShadowBox key={index} background="dark-1" justify="center" align="center" pad="small" gap="medium">
                                            <Box direction="column" gap="small">
                                                <TipDisplay
                                                    heading={`${item.data.name} ${levelDisplay != "" ? `(${levelDisplay})` : ""}`}
                                                    body={
                                                        <Text>{item.getDisplayText()}</Text>
                                                    }
                                                >
                                                    <Stack anchor="top-right">
                                                        <IconImage data={item.getImageData()} />
                                                        <Text alignSelf="start">{levelDisplay}</Text>
                                                    </Stack>
                                                </TipDisplay>                                                
                                            </Box>
                                        </ShadowBox>
                                    )
                                }                                
                            })

                    }
                </Grid>
            </Box>
        </Box>
    )
}
