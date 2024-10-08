"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useMemo, useState } from 'react';
import { Sneaking as SneakingDomain } from '../../../data/domain/world-6/sneaking';
import ShadowBox from '../../../components/base/ShadowBox';
import IconImage from '../../../components/base/IconImage';
import { Player } from '../../../data/domain/player';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { nFormatter } from '../../../data/utility';
import { PlayerActivitySection } from '../../../components/world-6/sneaking/playerActivitySection';
import { JadeUpgrades } from '../../../components/world-6/sneaking/jadeUpgrades';
import { SneakingUpgrades } from '../../../components/world-6/sneaking/sneakingUpgrades';
import TabButton from '../../../components/base/TabButton';
import { PristineCharmSection } from '../../../components/world-6/sneaking/pristineCharmsSection';
import { SneakingInventory } from '../../../components/world-6/sneaking/sneakingInventory';
import { BeanstalkingDisplay } from '../../../components/world-6/sneaking/beanstacking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function Sneaking() {
    const [activeTab, setActiveTab] = useState<string>("The Jade Emporium");

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const sneaking = theData.get("sneaking") as SneakingDomain;
    const players = theData.get("players") as Player[];

    const jadeUpgrades = useMemo(() => {
        if (!sneaking) {
            return []
        }

        return sneaking.jadeUpgrades?.slice().sort((upgrade1, upgrade2) => upgrade1.displayOrder > upgrade2.displayOrder ? 1 : -1);
    }, [theData, sneaking])

    if (!sneaking) {
        return <>Loading...</>
    }
    return (
        <Box>
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
                {["The Jade Emporium", "Sneaking Upgrades", "Inventory", "Pristine Charms", (sneaking.beanstalking.unlocked ? "Beanstalk" : "")].filter(tab => tab != "").map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "The Jade Emporium" && <JadeUpgrades currentJade={sneaking.jade} jadeUpgrades={jadeUpgrades} />}
            {activeTab == "Sneaking Upgrades" && <SneakingUpgrades currentJade={sneaking.jade} upgrades={sneaking.sneakingUpgrades} />}
            {activeTab == "Inventory" && <SneakingInventory inventory={sneaking.inventory} />}
            {activeTab == "Pristine Charms" && <PristineCharmSection charms={sneaking.pristineCharms} />}
            {activeTab == "Beanstalk" && <BeanstalkingDisplay beanstalking={sneaking.beanstalking} />}
        </Box>
    )
}

export default Sneaking;