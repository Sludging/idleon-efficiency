import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { Crop, Farming as FarmingDomain } from '../../data/domain/world-6/farming';
import { useContext, useState } from 'react';
import { AppContext } from '../../data/appContext';
import ShadowBox from '../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../components/base/TextAndLabel';
import IconImage from '../../components/base/IconImage';
import { nFormatter } from '../../data/utility';
import TabButton from '../../components/base/TabButton';
import { MarketUpgradesDisplay } from '../../components/world-6/farming/marketUpgrades';
import { CropScientistDisplay } from '../../components/world-6/farming/cropScientist';
import { CropDepotDisplay } from '../../components/world-6/farming/cropDepot';
import { PlotsDisplay } from '../../components/world-6/farming/plots';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';

function Farming() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();
    const lastUpdated = appContext.data.getLastUpdated(true) as Date;
    const [activeTab, setActiveTab] = useState<string>("Crop Scientist");

    const farming = data.get("farming") as FarmingDomain;

    if (!farming) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <NextSeo title="Farming" />
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Farming</Heading>
                <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
                <Box direction="row" gap="xsmall" wrap>
                    <ShadowBox width={"xsmall"} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="center">
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
                    <ShadowBox width={"xsmall"} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Insta grow left'
                            component={
                                <Box gap="small" direction="row" align="center">
                                    <IconImage data={FarmingDomain.getInstaGrowImageData()} />
                                    <Text size="small">{nFormatter(farming.instaGrowToolLeft)}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                    <ShadowBox width={"auto"} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="center">
                        <ComponentAndLabel
                            label='Inventory'
                            component={
                                <Box gap="xxsmall" direction="row" wrap align="center">
                                    {
                                        farming.cropDepot.filter(crop => crop.quantityOwned > 0).map((crop, index) => (          
                                            <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center">
                                                <TipDisplay
                                                    size='medium'
                                                    heading={farming.getCropName(crop.index)}
                                                    body=''
                                                    direction={TipDirection.Down}
                                                >
                                                    <Box direction="row" pad={{ vertical: 'xsmall' }} align="center" gap='xsmall'>
                                                        <IconImage data={Crop.getCropIconData(crop.index)} />
                                                        <Text size="xsmall">{nFormatter(Math.floor(crop.quantityOwned))}</Text>
                                                    </Box>
                                                </TipDisplay>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            }
                        />
                    </ShadowBox>
                </Box>
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Crop Scientist", "Market Upgrades", "Crop Depot", "Plots"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                <Box align="center" margin={{ top: 'small', bottom: 'small' }}>
                    {activeTab == "Crop Scientist" && <CropScientistDisplay cropScientist={farming.cropScientist} />}
                    {activeTab == "Market Upgrades" && <MarketUpgradesDisplay farming={farming} />}
                    {activeTab == "Crop Depot" && <CropDepotDisplay farming={farming} />}
                    {activeTab == "Plots" && <PlotsDisplay plots={farming.farmPlots} cropDepot={farming.cropDepot} />}
                </Box>
            </Box>
        )
    }
}

export default Farming;