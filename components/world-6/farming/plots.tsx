import { Box, Grid, ResponsiveContext, Stack, Text } from "grommet";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { Crop, Plot, PlotGrowthStage } from "../../../data/domain/world-6/farming";
import IconImage from "../../base/IconImage";
import { nFormatter, toTime } from "../../../data/utility";
import { useContext } from "react";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import ShadowBox from "../../base/ShadowBox";

export const PlotsDisplay = ({ plots, cropDepot }: { plots: Plot[], cropDepot: Crop[] }) => {
    const size = useContext(ResponsiveContext);

    return (
        <Box width="100%">
            <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 9) }} gap={"small"} fill>
                {
                    plots.map((plot, index) => {
                        return (
                            <ShadowBox background="dark-1">
                                <Box key={index} align="center">
                                    <PlotDisplay key={index} plot={plot} cropDepot={cropDepot} />
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

const PlotDisplay = ({ plot, cropDepot }: { plot: Plot, cropDepot: Crop[] }) => {
    const growthStage: PlotGrowthStage = plot.getGrowthStage();

    const baseCrop = cropDepot.find(crop => crop.index == plot.cropIndex);

    if (!baseCrop || growthStage == PlotGrowthStage.Empty) {
        return (
            <Box width="100%" align="center" fill>
                <IconImage data={Plot.getPlotGrowStageImageData(PlotGrowthStage.Empty, -1)} />
            </Box>
        )
    }

    // To get it to %
    const nextCropChance = baseCrop.nextCropChance * 100;

    const quantityToDisplay: string = plot.quantityToCollect > 0 ? nFormatter(plot.getQuantityToCollect()) : `${plot.getQuantityToCollect(plot.possibleQtyToCollectMin)} ~ ${plot.getQuantityToCollect(plot.possibleQtyToCollectMax)}`;
    // If quantityToCollect is set then it means growth is done from server side, so no more changes possible for crop
    // If locked, can't evolve
    // if nextCropChance == 0 then mean it's last crop for his seed type, so can't evolve
    const canEvolve: boolean = (nextCropChance > 0) && plot.quantityToCollect == 0 && plot.locked == false;
    const forcedToEvolve: boolean = canEvolve && (nextCropChance >= 100);

    return (
        <Box fill>
            <Box pad="xsmall" gap="xsmall">
                <ComponentAndLabel
                    label="Crop"                        
                    component={
                        !canEvolve ?
                            <Box direction="row" gap="xsmall" align="center" justify="start">
                                <Text size="small">{quantityToDisplay}</Text>
                                <IconImage data={Crop.getCropIconData(plot.cropIndex)} />
                                {plot.locked && <Text size="xxsmall">(Locked)</Text>}
                            </Box>
                            :
                            <Box direction="row" gap="xsmall" justify="start" align="center">
                                <Text size="small">{plot.possibleQtyToCollectMin} ~ {plot.possibleQtyToCollectMax}</Text>
                                <Box>
                                    {!forcedToEvolve && < Box direction="row" gap="xxsmall">
                                        <IconImage data={Crop.getCropIconData(plot.cropIndex)} />
                                        <Text size="small">{nFormatter(100 - Math.min(100, nextCropChance))}%</Text>
                                    </Box>}
                                    <Box direction="row" gap="xxsmall">
                                        <IconImage data={Crop.getCropIconData(plot.cropIndex+1)} />
                                        <Text size="small">{nFormatter(Math.min(100, nextCropChance))}%</Text>
                                    </Box>
                                </Box>
                            </Box>
                    }
                />   
                {!plot.readyToCollect && 
                    <ComponentAndLabel
                    label="Fully grown in :"
                    component={
                        <Text size="small">{toTime((plot.seed.getFullCycleGrowthTime() - plot.growthTime) / plot.growthRate)}</Text>
                    }
                />}
                {plot.readyToCollect && <ComponentAndLabel
                    label="OG level :"
                    component={
                        <Text size="small">{plot.OGlevel} (x{plot.getOGmultiplyer()})</Text>
                    }
                />}
                {plot.readyToCollect && <ComponentAndLabel
                    label="Next OG cycle end in :"
                    component={
                        <Text size="small">{toTime((plot.seed.getFullCycleGrowthTime() - plot.overgrowthTime) / plot.growthRate)}</Text>
                    }
                />}
                {plot.readyToCollect && <ComponentAndLabel
                    label="Next OG chance :"
                    component={
                        <Text size="small">{nFormatter(Math.min(100, plot.nextOGChance * 100))}%</Text>
                    }
                />}
            </Box>
        </Box>
    )
}