import { Box, Grid, ResponsiveContext, Stack, Text } from "grommet";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { Crop, Plot, PlotGrowthStage, Farming } from "../../../data/domain/world-6/farming";
import IconImage from "../../base/IconImage";
import { nFormatter, toTime } from "../../../data/utility";
import { useContext, useEffect, useMemo, useState } from "react";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import ShadowBox from "../../base/ShadowBox";
import { Lock, Star } from 'grommet-icons';
import { StaticTime, TimeDisplaySize, TimeDown, TimeDownWithCallback } from "../../base/TimeDisplay";
import { AppContext } from "../../../data/appContext";

export const PlotsDisplay = ({silkRodeChip, starSignEvoEquipped, starSignOGEquipped} : {silkRodeChip: boolean, starSignEvoEquipped: boolean, starSignOGEquipped: boolean}) => {
    const [farming, setFarming] = useState<Farming>();
    const size = useContext(ResponsiveContext);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setFarming(theData.get("farming"));
        }
    }, [appContext]);
    
    if (!farming) {
        return null;
    }

    return (
        <Box width="100%">
            <Text size="xsmall">* There could be a difference of a few seconds between IE and in-game</Text>
            <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 9) }} gap={"small"} fill>
                {
                    farming.farmPlots.map((plot, index) => {
                        return (
                            <ShadowBox key={index} background="dark-1">
                                <Box align="center">
                                    <PlotDisplay farmingPlot={plot} cropDepot={farming.cropDepot} canOvergrow={farming.canOvergrow} silkRodeChip={silkRodeChip} starSignEvoEquipped={starSignEvoEquipped} starSignOGEquipped={starSignOGEquipped} />
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

const PlotDisplay = ({ farmingPlot, cropDepot, canOvergrow, silkRodeChip, starSignEvoEquipped, starSignOGEquipped }: { farmingPlot: Plot, cropDepot: Crop[], canOvergrow: boolean, silkRodeChip: boolean, starSignEvoEquipped: boolean, starSignOGEquipped: boolean }) => {
    const [readyToCollect, setReadyToCollect] = useState<boolean>(farmingPlot.readyToCollect);
    const [plotCanOvergrow, setCanOvergrow] = useState<boolean>(readyToCollect && canOvergrow);
    const [completedOGcycles, setCompletedOGCycles] = useState<number>(farmingPlot.overgrowthCycleCompletedSinceLastLoggin);

    const plot = useMemo(() => {
        setReadyToCollect(farmingPlot.readyToCollect);
        setCanOvergrow(readyToCollect && canOvergrow);
        setCompletedOGCycles(farmingPlot.overgrowthCycleCompletedSinceLastLoggin);

        return farmingPlot;
    }, [canOvergrow, farmingPlot, readyToCollect])

    const growthStage: PlotGrowthStage = plot.getGrowthStage();
    const baseCrop = cropDepot.find(crop => crop.index == plot.cropIndex);
    // Second test is used to avoid getting a crop if current crop is last crop for its seed
    const nextCrop = cropDepot.find(crop => crop.index == plot.cropIndex+1 && crop.seed.index == (plot.seed?.index ?? -1));

    if (!baseCrop || growthStage == PlotGrowthStage.Empty) {
        return (
            <Box width="100%" align="center" fill>
                <IconImage data={Plot.getPlotGrowStageImageData(PlotGrowthStage.Empty, -1)} />
            </Box>
        )
    }

    // Actualize growth based on time that passed since the parsing of data to avoid a big time gap in case user take a long time to open the farming page and there's no cloud save event
    plot.updatePlotGrowthSinceLastRefresh();

    // To get it to %
    const nextCropChance = baseCrop.getEvolutionChance(starSignEvoEquipped, silkRodeChip) * 100;
    const currentCropIsUndiscovered = (baseCrop.discovered == false ?? false);
    const nextCropIsUndiscovered = (nextCrop?.discovered == false ?? false);

    const quantityToDisplay: string = plot.quantityToCollect > 0 ? nFormatter(plot.getQuantityToCollect()) : `${plot.getQuantityToCollect(plot.possibleQtyToCollectMin)} ~ ${plot.getQuantityToCollect(plot.possibleQtyToCollectMax)}`;
    // If quantityToCollect is set then it means growth is done from server side, so no more changes possible for crop
    // If locked, can't evolve
    // if nextCropChance == 0 then mean it's last crop for his seed type, so can't evolve
    const canEvolve: boolean = (nextCropChance > 0) && plot.quantityToCollect == 0 && plot.locked == false;
    const forcedToEvolve: boolean = canEvolve && (nextCropChance >= 100);

    return (
        <Box fill>
            <Box pad="small" gap="medium">
                <Box justify="around">
                {
                    !canEvolve ?
                        <Box direction="row" align="center" justify="between">
                            <Box direction="row"  gap="xsmall" align="center" justify="start">
                                <Text size="small">{quantityToDisplay}</Text>
                                <IconImage data={Crop.getCropIconData(plot.cropIndex)} />
                                {currentCropIsUndiscovered &&
                                    <TipDisplay
                                        size='small'
                                        heading="New crop"
                                        body=''
                                        direction={TipDirection.Down}
                                    >
                                        <Star color='grey-2' size='11px' />
                                    </TipDisplay>
                                }
                            </Box>
                            {plot.locked && 
                                <TipDisplay
                                    size='small'
                                    heading="Plot is locked (can't evolve)"
                                    body=''
                                    direction={TipDirection.Down}                                
                                >
                                    <Lock color='grey-2' size='16px'/>
                                </TipDisplay>
                            }
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
                                    {nextCropIsUndiscovered && 
                                        <TipDisplay
                                            size='small'
                                            heading="New crop"
                                            body=''
                                            direction={TipDirection.Down}                                
                                        >
                                            <Star color='grey-2' size='11px'/>
                                        </TipDisplay>
                                    }
                                </Box>
                            </Box>
                        </Box>
                }
                </Box>
                {!readyToCollect && plot.seed && 
                    <ComponentAndLabel
                    label="Fully grown in :"
                    labelSize="11px"
                    component={
                        <TimeDownWithCallback 
                            addSeconds={(plot.seed.getFullCycleGrowthTime() - plot.growthTime) / plot.growthRate} 
                            size={TimeDisplaySize.XSmall}
                            callBack={
                                () => {
                                    setReadyToCollect(true);
                                    setCanOvergrow(readyToCollect && canOvergrow);
                                }
                            }
                        />
                    }
                />}
                {plotCanOvergrow && <ComponentAndLabel
                    label="OG level :"
                    labelSize="11px"
                    component={
                        <Box gap="xsmall">
                            <Text size="xsmall">{plot.OGlevel} (x{plot.getOGmultiplyer()})</Text>
                            {completedOGcycles > 0 && <Text size="xsmall">{completedOGcycles} OG cycles since last loggin</Text>}
                        </Box>
                    }
                />}
                {plotCanOvergrow && plot.seed && <ComponentAndLabel
                    label="Next OG cycle end in :"
                    labelSize="11px"
                    component={
                        <TimeDownWithCallback 
                            addSeconds={(plot.seed.getFullCycleGrowthTime() - plot.overgrowthTime) / plot.growthRate} 
                            resetToSeconds={plot.seed.getFullCycleGrowthTime() / plot.growthRate} 
                            size={TimeDisplaySize.XSmall}
                            callBack={
                                () => { setCompletedOGCycles(plot.overgrowthCycleCompletedSinceLastLoggin++); }
                            }
                        />
                    }
                />}
                {plotCanOvergrow && <ComponentAndLabel
                    label="Next OG chance :"
                    labelSize="11px"
                    component={
                        <Text size="xsmall">{nFormatter(Math.min(100, plot.getPlotNextOGChance(starSignOGEquipped, silkRodeChip) * 100))}%</Text>
                    }
                />}
            </Box>
        </Box>
    )
}