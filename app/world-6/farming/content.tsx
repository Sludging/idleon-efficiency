"use client"

import {
    Box,
    CheckBox,
    Heading,
    Text,
} from 'grommet'
import { Crop, Farming as FarmingDomain, CropScientist } from '../../../data/domain/world-6/farming';
import { useMemo, useState } from 'react';
import ShadowBox from '../../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import IconImage from '../../../components/base/IconImage';
import { nFormatter } from '../../../data/utility';
import TabButton from '../../../components/base/TabButton';
import { MarketUpgradesDisplay } from '../../../components/world-6/farming/marketUpgrades';
import { CropDepotDisplay } from '../../../components/world-6/farming/cropDepot';
import { PlotsDisplay } from '../../../components/world-6/farming/plots';
import TipDisplay from '../../../components/base/TipDisplay';
import { CircleInformation } from 'grommet-icons';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function Farming() {
    const [activeTab, setActiveTab] = useState<string>("Plots");
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEvoEquipped, setStarSignEvoEquipped] = useState(false);
    const [starSignOGEquipped, setStarSignOGEquipped] = useState(false);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const farming = theData.get("farming") as FarmingDomain;

    const starSignOGUnlocked = useMemo(() => {
        if (farming) {
            if (farming.starSignOGInfinity) {
                setStarSignOGEquipped(true);
            }
            return farming.starSignOGUnlocked;
        }

        return false;
    }, [theData, farming])

    const starSignOGInfinity = useMemo(() => {
        if (farming) {
            if (farming.starSignOGInfinity) {
                setStarSignOGEquipped(true);
            }
            return farming.starSignOGInfinity;
        }

        return false;
    }, [theData, farming])

    const starSignEvoUnlocked = useMemo(() => {
        if (farming) {
            if (farming.starSignEvoInfinity) {
                setStarSignEvoEquipped(true);
            }
            return farming.starSignEvoUnlocked;
        }

        return false;
    }, [theData, farming])

    const starSignEvoInfinity = useMemo(() => {
        if (farming) {
            if (farming.starSignEvoInfinity) {
                setStarSignEvoEquipped(true);
            }
            return farming.starSignEvoInfinity;
        }

        return false;
    }, [theData, farming])

    if (!farming) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Farming</Heading>
                <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
                <Text>Farming Lv: {farming.farmingLevel}</Text>
                <Box direction="row" gap="xsmall" margin={{ bottom: 'small' }} wrap>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Magic Beans'
                            component={
                                <Box>
                                    <Box gap="small" direction="row" align="center">
                                        <IconImage data={Crop.getMagicBeanIconData()} />
                                        <Text size="small">{nFormatter(farming.magicBeansOwned)}</Text>
                                    </Box>
                                    <Box gap="small" direction="row" align="center">
                                        <IconImage data={Crop.getCropTransferTicketIconData()} />
                                        <Text size="small">+{nFormatter(farming.magicBeansFromDepot)}</Text>
                                    </Box>
                                </Box>
                            }
                        />
                    </ShadowBox>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Insta grow'
                            component={
                                <Box gap="small" direction="row" align="center" margin={{ top: 'xsmall' }}>
                                    <IconImage data={FarmingDomain.getInstaGrowImageData()} />
                                    <Text size="small">{nFormatter(farming.instaGrowToolLeft)}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label={`Crop scientist (crop types found : ${farming.cropScientist.discoveredCrops})`}
                            component={
                                <Box gap="small" direction="row" margin={{ top: "xsmall" }} wrap>
                                    {
                                        farming.cropScientist.bonuses.map((bonus, index) => {
                                            return (
                                                <Box key={index} border={{ color: 'grey-1' }} background="accent-4">
                                                    <ShadowBox style={{ opacity: bonus.unlocked ? 1 : 0.5 }} key={index} background="dark-1" pad={"xsmall"}>
                                                        <ComponentAndLabel
                                                            label={CropScientist.getBonusTitle(bonus.bonusText)}
                                                            component={
                                                                <Box gap="small" direction="row" align="center">
                                                                    <Text size="small">{farming.cropScientist.getShortBonusText(bonus.bonusText)}</Text>
                                                                </Box>
                                                            }
                                                        />
                                                    </ShadowBox>
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            }
                        />
                    </ShadowBox>
                </Box>
                <Box direction='row' gap="medium" wrap>
                {
                    starSignEvoUnlocked &&
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={starSignEvoEquipped}
                            label="Cropiovo Minor Equipped"
                            onChange={(event) => {
                                setStarSignEvoEquipped(event.target.checked);
                                if(!event.target.checked && !starSignOGEquipped) {
                                    setSilkrode(false);
                                }
                            }}
                            disabled={starSignEvoInfinity}
                        />
                        <TipDisplay
                            heading="Cropiovo Minor"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>Looks like you unlocked the Cropiovo Minor star sign (Crop Evo Chance)</Text>
                                    {
                                        starSignEvoInfinity ?
                                        <Text margin={{top:'xsmall'}} size='small'>You always get the star sign bonus thanks to the Infinite Stars Rift bonus</Text>
                                        :
                                        <Text margin={{top:'xsmall'}} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                    }
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                }
                {
                    starSignOGUnlocked &&
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={starSignOGEquipped}
                            label="O.G. Signalais Equipped"
                            onChange={(event) => {
                                setStarSignOGEquipped(event.target.checked);
                                if(!event.target.checked && !starSignEvoEquipped) {
                                    setSilkrode(false);
                                }
                            }}
                            disabled={starSignOGInfinity}
                        />
                        <TipDisplay
                            heading="O.G. Signalais"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>Looks like you unlocked the O.G. Signalais star sign (plot OG chance)</Text>
                                    {
                                        starSignOGInfinity ?
                                        <Text margin={{top:'xsmall'}} size='small'>You always get the star sign bonus thanks to the Infinite Stars Rift bonus</Text>
                                        :
                                        <Text margin={{top:'xsmall'}} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                    }
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                }
                {
                    (starSignEvoUnlocked || starSignOGUnlocked) &&
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={silkRodeChip}
                            label="Silkrode Nanochip Equipped"
                            onChange={(event) => setSilkrode(event.target.checked)}
                            disabled={!starSignEvoEquipped && !starSignOGEquipped}
                        />
                        <TipDisplay
                            heading="Silkrode Nanochip"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>You can check this checkbox to get accurate values when equipping the Silkrode Nanochip in the Lab (double star sign bonus)</Text>
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                }
                </Box>
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Plots", "Market Upgrades", "Crop Depot"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                <Box align="center" margin={{ top: 'small', bottom: 'small' }}>
                    {activeTab == "Plots" && <PlotsDisplay silkRodeChip={silkRodeChip} starSignEvoEquipped={starSignEvoEquipped} starSignOGEquipped={starSignOGEquipped} />}
                    {activeTab == "Market Upgrades" && <MarketUpgradesDisplay/>}
                    {activeTab == "Crop Depot" && <CropDepotDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEvoEquipped} />}
                </Box>
            </Box>
        )
    }
}

export default Farming;