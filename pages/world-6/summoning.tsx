import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useState } from 'react';
import { AppContext } from '../../data/appContext';
import { SummonEssenceColor, Summoning as SummoningDomain, SummonEssence } from '../../data/domain/world-6/summoning';
import { Player } from '../../data/domain/player';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { nFormatter } from '../../data/utility';
import TabButton from '../../components/base/TabButton';
import { SummoningBonuses } from '../../components/world-6/summoning/summoningBonuses';
import { SummoningUpgrades } from '../../components/world-6/summoning/summoningUpgrades';

function Summoning() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();
    const [activeTab, setActiveTab] = useState<string>("Winner bonuses");

    const summoning = data.get("summoning") as SummoningDomain;

    if (!summoning) {
        return <>Loading...</>
    } else {
        return (
            <Box>
                <NextSeo title="Summoning" />
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Summoning</Heading>
                <Text size="small">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
                <Text>Summoning Lv: {summoning.summoningLevel}</Text>
                <Box justify="start" direction='row' gap="small">
                    {
                        summoning.summonEssences.filter(essence => essence.display == true).map((essence) => (
                            <ShadowBox width={"xsmall"} key={essence.color.toString()} background="dark-1" gap="xsmall" pad="small" align="left">
                                <ComponentAndLabel
                                    label={Object.keys(SummonEssenceColor)[Object.values(SummonEssenceColor).indexOf(essence.color as number as SummonEssenceColor)]}
                                    component={
                                        <Box gap="small" direction="row" align="center">
                                            <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                                            <Text size="small">{nFormatter(essence.quantity)}</Text>
                                        </Box>
                                    }
                                />
                            </ShadowBox>
                        ))
                    }
                </Box>
                <Box align="center" direction="row" justify="center" gap="small">
                    {["Winner bonuses", "Summoning Upgrades"].map((tabName, index) => (
                        <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                    ))
                    }
                </Box>
                {activeTab == "Winner bonuses" && <SummoningBonuses bonuses={summoning.summonBonuses} />}
                {activeTab == "Summoning Upgrades" && <SummoningUpgrades essences={summoning.summonEssences} upgrades={summoning.summonUpgrades} />}
            </Box>
        )
    }
}

export default Summoning;