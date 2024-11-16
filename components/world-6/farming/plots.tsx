import { Box, Grid, ResponsiveContext, Text } from "grommet";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { Crop, Plot, PlotGrowthStage, Farming, CropQuantity } from "../../../data/domain/world-6/farming";
import IconImage from "../../base/IconImage";
import { nFormatter } from "../../../data/utility";
import { useContext, useMemo, useState } from "react";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import ShadowBox from "../../base/ShadowBox";
import { Lock, Star } from 'grommet-icons';
import { TimeDisplaySize, TimeDownWithCallback } from "../../base/TimeDisplay";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

export const PlotsDisplay = ({silkRodeChip, starSignEvoEquipped, starSignOGEquipped} : {silkRodeChip: boolean, starSignEvoEquipped: boolean, starSignOGEquipped: boolean}) => {
    const size = useContext(ResponsiveContext);
    
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const farming = theData.get("farming") as Farming;
    
    if (!farming) {
        return null;
    }

    return (
        <Box width="100%">
            <CropToCollectDisplay cropsToCollect={farming.cropsToCollect} />
            <Text size="xsmall">* There could be a difference of a few seconds between IE and in-game</Text>
            <Grid columns={{ size: 'auto', count: (size == "small" ? 2 : 9) }} gap={"small"} fill>
                {
                    farming.farmPlots.map((plot, index) => {
                        return (
                            <ShadowBox key={index} background="dark-1">
                                <Box align="center">
                                    <PlotDisplay farmingPlot={plot} cropDepot={farming.cropDepot} canOvergrow={farming.canOvergrow} canLevelLandRank={farming.canLevelLandRank} silkRodeChip={silkRodeChip} starSignEvoEquipped={starSignEvoEquipped} starSignOGEquipped={starSignOGEquipped} />
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

const CropToCollectDisplay = ({ cropsToCollect}: { cropsToCollect: CropQuantity[]}) => {
    if (!cropsToCollect || cropsToCollect.length == 0) {
        return null;
    }

    return (
        <Box direction="row" margin={{ bottom: 'small' }}>
            <ShadowBox style={{ opacity: cropsToCollect.length > 0 ? 1 : 0.5 }} background="dark-1" gap="xsmall" pad="small" align="left">
                <Box align="center" direction="row" gap="xsmall">
                    <Text size="medium">Crops to collect</Text>
                </Box>
                <Box gap="xxsmall" direction="row" wrap>
                    {
                        cropsToCollect.map((collect, index) => {
                            return (
                                <Box key={index} border={{ color: 'grey-1' }} margin={{ bottom: 'xxsmall' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center">
                                    <Box direction="row" pad={{ vertical: 'xsmall' }} align="center" gap='xsmall'>
                                        {(collect.minQuantity == collect.maxQuantity ?
                                            <Text size="xsmall">{nFormatter(Math.floor(collect.minQuantity))}</Text>
                                            :
                                            <Text size="xsmall">{nFormatter(Math.floor(collect.minQuantity))}~{nFormatter(Math.floor(collect.maxQuantity))}</Text>
                                        )}
                                        <IconImage data={Crop.getCropIconData(collect.crop.index)} />
                                    </Box>
                                </Box>
                            )
                        })
                    }
                </Box>
            </ShadowBox>
        </Box>
    )
}

const PlotDisplay = ({ farmingPlot, cropDepot, canOvergrow, canLevelLandRank, silkRodeChip, starSignEvoEquipped, starSignOGEquipped }: { farmingPlot: Plot, cropDepot: Crop[], canOvergrow: boolean, canLevelLandRank: boolean, silkRodeChip: boolean, starSignEvoEquipped: boolean, starSignOGEquipped: boolean }) => {
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
    const nextCropChance = plot.getEvolutionChance(starSignEvoEquipped, silkRodeChip) * 100;
    const currentCropIsUndiscovered = (baseCrop.discovered == false);
    const nextCropIsUndiscovered = (nextCrop?.discovered == false);

    const minPossibleCollect = plot.quantityToCollect > 0 ? plot.getMinQuantityToCollect() : 0;
    const maxPossibleCollect = plot.quantityToCollect > 0 ? plot.getMaxQuantityToCollect() : 0;

    const quantityToDisplay: string =   plot.quantityToCollect > 0 ? 
                                            minPossibleCollect == maxPossibleCollect ?
                                                nFormatter(minPossibleCollect)
                                                :
                                            `${nFormatter(minPossibleCollect)} ~ ${nFormatter(maxPossibleCollect)}`
                                        : 
                                            plot.possibleBaseQtyToCollectMin == plot.possibleBaseQtyToCollectMax ?
                                                plot.possibleBaseQtyToCollectMin.toString()
                                            :
                                                `${plot.possibleBaseQtyToCollectMin} ~ ${plot.possibleBaseQtyToCollectMax}`;
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
                            <Box direction="row" gap="xsmall" align="center" justify="start">
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
                            <Text size="small">{quantityToDisplay}</Text>
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
                                () => { setCompletedOGCycles(plot.overgrowthCycleCompletedSinceLastLoggin+1); }
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
                {canLevelLandRank && <ComponentAndLabel
                    label="Land rank :"
                    labelSize="11px"
                    component={
                        <Text size="xsmall">Lv.{plot.landRank} ({nFormatter(plot.landExp)} / {nFormatter(plot.getExpToNextRank())} exp)</Text>
                    }
                />}
            </Box>
        </Box>
    )
}