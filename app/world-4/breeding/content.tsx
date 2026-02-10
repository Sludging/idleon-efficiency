"use client"

import {
    Box,
    Heading,
    ResponsiveContext,
    Text
} from 'grommet'
import { useContext, useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import TabButton from '../../../components/base/TabButton';
import { TerritoryDisplay } from '../../../components/world-4/breeding/territory';
import { PetUpgradeDisplay } from '../../../components/world-4/breeding/upgrades';
import { ArenaBonusDisplay } from '../../../components/world-4/breeding/arena';
import { PetsDisplay } from '../../../components/world-4/breeding/pets';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { StaticTime, TimeDown } from '../../../components/base/TimeDisplay';
import { Breeding as BreedingDomain } from '../../../data/domain/world-4/breeding';
import { nFormatter } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function EggDisplay() {
    const size = useContext(ResponsiveContext);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));    
    const breeding = theData.get("breeding") as BreedingDomain;

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    if (breeding.territory.filter(territory => territory.unlocked).length == 0) {
        return null;
    }

    return (
        <Box gap="small">
            <Text size="xsmall">* New eggs will only show up after the cloud save updates.</Text>
            <Box direction="row" gap="medium" wrap>
                <Box direction="row" align="center" wrap>
                    {
                        [...Array(breeding.eggCapacity)].map((_, index) => {
                            if (breeding.eggs.length < index) {
                                return;
                            }
                            return (
                                <Box key={`egg_${index}`} border={{ color: 'grey-1', side: 'all', size: '2px' }} align="center">
                                    {
                                        breeding.eggs[index]?.rarity ?? 0 > 0 ?
                                            <Box key={index}>
                                                <IconImage scale={size == "small" ? 0.5 : 1} data={breeding.eggs[index].getImageData()} />
                                            </Box>
                                            :
                                            <Box height="43px" width="38px" />
                                    }
                                </Box>
                            )
                        })
                    }
                </Box>
                <ComponentAndLabel label="Next Egg In" component={<TimeDown addSeconds={breeding.totalEggTime - breeding.timeTillEgg} />} />
                <ComponentAndLabel label="Time per egg" component={<StaticTime fromSeconds={breeding.totalEggTime} />} />
                {
                    breeding.getStatRange().map((stat, index) => (
                        <TextAndLabel label={index == 0 ? "Min Stat" : "Max Stat"} text={nFormatter(stat)} key={index} />
                    ))
                }

                <ComponentAndLabel label="Dead Cells" component={
                    <Box direction="row" gap="small" align="center">
                        <Text>{nFormatter(breeding.deadCells)}</Text>
                        <IconImage data={{ location: 'PetDeadCell', height: 25, width: 25 }} />
                    </Box>
                } />

            </Box>
        </Box>
    )
}

function Breeding() {
    const [activeTab, setActiveTab] = useState<string>("Territory");
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Breeding</Heading>
            <Box pad="small">
                <EggDisplay />
            </Box>
            <Box align="center" direction="row" justify="center" gap="small">
                {["Territory", "Upgrades", "Arena", "Pets"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Arena" && <ArenaBonusDisplay />}
            {activeTab == "Upgrades" && <PetUpgradeDisplay />}
            {activeTab == "Territory" && <TerritoryDisplay />}
            {activeTab == "Pets" && <PetsDisplay />}
        </Box>
    )
}

export default Breeding;