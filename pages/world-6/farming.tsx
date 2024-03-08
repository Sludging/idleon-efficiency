import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { Crop, Farming as FarmingDomain, CropScientist } from '../../data/domain/world-6/farming';
import { useContext, useState } from 'react';
import { AppContext } from '../../data/appContext';
import ShadowBox from '../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../components/base/TextAndLabel';
import IconImage from '../../components/base/IconImage';
import { nFormatter } from '../../data/utility';
import TabButton from '../../components/base/TabButton';
import { MarketUpgradesDisplay } from '../../components/world-6/farming/marketUpgrades';
import { CropDepotDisplay } from '../../components/world-6/farming/cropDepot';
import { PlotsDisplay } from '../../components/world-6/farming/plots';

function Farming() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();
    const lastUpdated = appContext.data.getLastUpdated(true) as Date;
    const [activeTab, setActiveTab] = useState<string>("Plots");

    const farming = data.get("farming") as FarmingDomain;

    if (!farming) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <NextSeo title="Farming" />
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Farming</Heading>
                <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
                <Text>Farming Lv: {farming.farmingLevel}</Text>
                <Box direction="row" gap="xsmall" margin={{ bottom: 'small' }}  wrap>
                    <ShadowBox background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Magic Beans'
                            component={
                                <Box>
                                    <Box gap="small" direction="row" align="center">
                                        <IconImage data={Crop.getMagicBeanIconData()}/>
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
                                <Box gap="small" direction="row" margin={{top:"xsmall"}} wrap>
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
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Plots", "Market Upgrades", "Crop Depot"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                <Box align="center" margin={{ top: 'small', bottom: 'small' }}>
                    {activeTab == "Plots" && <PlotsDisplay plots={farming.farmPlots} cropDepot={farming.cropDepot} />}
                    {activeTab == "Market Upgrades" && <MarketUpgradesDisplay farming={farming} />}
                    {activeTab == "Crop Depot" && <CropDepotDisplay farming={farming} />}
                </Box>
            </Box>
        )
    }
}

export default Farming;