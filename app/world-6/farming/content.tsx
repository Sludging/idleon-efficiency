"use client"

import {
    Box,
    CheckBox,
    Heading,
    Text,
} from 'grommet'
import { Crop, Farming as FarmingDomain, CropScientist } from '../../../data/domain/world-6/farming';
import { useState } from 'react';
import ShadowBox from '../../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import IconImage from '../../../components/base/IconImage';
import { nFormatter } from '../../../data/utility';
import ContentTabs from '../../../components/base/ContentTabs';
import { MarketUpgradesDisplay } from '../../../components/world-6/farming/marketUpgrades';
import { CropDepotDisplay } from '../../../components/world-6/farming/cropDepot';
import { PlotsDisplay } from '../../../components/world-6/farming/plots';
import TipDisplay from '../../../components/base/TipDisplay';
import { CircleInformation } from 'grommet-icons';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { LandRankDisplay } from '../../../components/world-6/farming/landRank';
import { ExoticMarketDisplay } from '../../../components/world-6/farming/exoticMarket';
import { StickersDisplay } from '../../../components/world-6/farming/stickers';
import useHydrated from '../../../lib/hooks/useHydrated';

function Farming() {
    const hydrated = useHydrated();
    const [activeTab, setActiveTab] = useState<string>("Plots");
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEvoEquipped, setStarSignEvoEquipped] = useState(false);
    const [starSignOGEquipped, setStarSignOGEquipped] = useState(false);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const farming = theData.get("farming") as FarmingDomain;

    const starSignOGUnlocked = farming?.starSignOGUnlocked ?? false;
    const starSignOGInfinity = farming?.starSignOGInfinity ?? false;
    const starSignEvoUnlocked = farming?.starSignEvoUnlocked ?? false;
    const starSignEvoInfinity = farming?.starSignEvoInfinity ?? false;

    const isStarSignOGActive = starSignOGInfinity || starSignOGEquipped;
    const isStarSignEvoActive = starSignEvoInfinity || starSignEvoEquipped;

    if (!hydrated || !farming) {
        return <>Loading...</>
    } else {
        const tabsToShow = ["Plots", "Market Upgrades", "Crop Depot"];
        if (farming.canLevelLandRank) {
            tabsToShow.push("Land Rank");
        }
        tabsToShow.push("Exotic Market", "Stickers");

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
                            checked={isStarSignEvoActive}
                            label="Cropiovo Minor Equipped"
                            onChange={(event) => {
                                setStarSignEvoEquipped(event.target.checked);
                                if(!event.target.checked && !isStarSignOGActive) {
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
                            checked={isStarSignOGActive}
                            label="O.G. Signalais Equipped"
                            onChange={(event) => {
                                setStarSignOGEquipped(event.target.checked);
                                if(!event.target.checked && !isStarSignEvoActive) {
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
                            disabled={!isStarSignEvoActive && !isStarSignOGActive}
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
                <ContentTabs
                    options={tabsToShow.map(tabName => ({ value: tabName, label: tabName }))}
                    value={activeTab}
                    onChange={setActiveTab}
                />
                <Box align="center" margin={{ top: 'small', bottom: 'small' }}>
                    {activeTab == "Plots" && <PlotsDisplay silkRodeChip={silkRodeChip} starSignEvoEquipped={isStarSignEvoActive} starSignOGEquipped={isStarSignOGActive} />}
                    {activeTab == "Market Upgrades" && <MarketUpgradesDisplay/>}
                    {activeTab == "Crop Depot" && <CropDepotDisplay/>}
                    {activeTab == "Land Rank" && <LandRankDisplay/>}
                    {activeTab == "Exotic Market" && <ExoticMarketDisplay farming={farming} />}
                    {activeTab == "Stickers" && <StickersDisplay farming={farming} />}
                </Box>
            </Box>
        )
    }
}

export default Farming;
