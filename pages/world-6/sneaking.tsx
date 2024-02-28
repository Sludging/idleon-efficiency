import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useMemo, useState } from 'react';
import { AppContext } from '../../data/appContext';
import { Sneaking as SneakingDomain } from '../../data/domain/world-6/sneaking';
import ShadowBox from '../../components/base/ShadowBox';
import IconImage from '../../components/base/IconImage';
import { Player } from '../../data/domain/player';
import { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { nFormatter } from '../../data/utility';
import { PlayerActivitySection } from '../../components/world-6/sneaking/playerActivitySection';
import { JadeUpgrades } from '../../components/world-6/sneaking/jadeUpgrades';
import { SneakingUpgrades } from '../../components/world-6/sneaking/sneakingUpgrades';
import TabButton from '../../components/base/TabButton';
import { PristineCharmSection } from '../../components/world-6/sneaking/pristineCharmsSection';


function Sneaking() {
    const appContext = useContext(AppContext);
    const data = appContext.data.getData();
    const [activeTab, setActiveTab] = useState<string>("Jade Upgrades");

    const sneaking = data.get("sneaking") as SneakingDomain;
    const players = data.get("players") as Player[];

    const jadeUpgrades = useMemo(() => {
        if (!sneaking) {
            return []
        }

        return sneaking.jadeUpgrades.toSorted((upgrade1, upgrade2) => upgrade1.displayOrder > upgrade2.displayOrder ? 1 : -1);
    }, [appContext, sneaking])

    if (!sneaking) {
        return <>Loading...</>
    }
    return (
        <Box>
            <NextSeo title="Sneaking" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Sneaking</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box>
                <ShadowBox width={"xsmall"} margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="center">
                    <ComponentAndLabel
                        label='Jade'
                        component={
                            <Box gap="small" direction="row" align="center">
                                <IconImage data={SneakingDomain.getJadeImageData()} scale={0.7} />
                                <Text size="small">{nFormatter(sneaking.jade)}</Text>
                            </Box>
                        }
                    />
                </ShadowBox>
            </Box>
            <Box margin={{ bottom: 'medium' }}>
                <PlayerActivitySection sneakingPlayers={sneaking.players} players={players} />
            </Box>
            <Box align="center" direction="row" justify="center" gap="small">
                {["Jade Upgrades", "Sneaking Upgrades", "Pristine Charms"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Jade Upgrades" && <JadeUpgrades currentJade={sneaking.jade} jadeUpgrades={jadeUpgrades} />}
            {activeTab == "Sneaking Upgrades" && <SneakingUpgrades currentJade={sneaking.jade} upgrades={sneaking.sneakingUpgrades} />}
            {activeTab == "Pristine Charms" && <PristineCharmSection charms={sneaking.pristineCharms} />}
        </Box>
    )
}

export default Sneaking;