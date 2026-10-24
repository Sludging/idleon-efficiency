"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useMemo, useState } from 'react';
import { Sneaking as SneakingDomain } from '../../../data/domain/world-6/sneaking';
import IconImage from '../../../components/base/IconImage';
import { Player } from '../../../data/domain/player';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { commaNotation, nFormatter } from '../../../data/utility';
import { PlayerActivitySection } from '../../../components/world-6/sneaking/playerActivitySection';
import { JadeUpgrades } from '../../../components/world-6/sneaking/jadeUpgrades';
import { SneakingUpgrades } from '../../../components/world-6/sneaking/sneakingUpgrades';
import ContentTabs from '../../../components/base/ContentTabs';
import { PristineCharmSection } from '../../../components/world-6/sneaking/pristineCharmsSection';
import { SneakingInventory } from '../../../components/world-6/sneaking/sneakingInventory';
import { BeanstalkingDisplay } from '../../../components/world-6/sneaking/beanstacking';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';
import { MasteryDisplay } from '../../../components/world-6/sneaking/mastery';
import { GemstonesDisplay } from '../../../components/world-6/sneaking/gemstones';

function Sneaking() {
    const hydrated = useHydrated();
    const [activeTab, setActiveTab] = useState<string>("Player Activity");

    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const sneaking = theData.get("sneaking") as SneakingDomain;
    const players = theData.get("players") as Player[];

    const jadeUpgrades = useMemo(() => {
        if (!sneaking) {
            return []
        }

        return sneaking.jadeUpgrades?.slice().sort((upgrade1, upgrade2) => upgrade1.displayOrder > upgrade2.displayOrder ? 1 : -1);
    }, [sneaking, lastUpdated])

    if (!hydrated || !sneaking || !players) {
        return <>Loading...</>
    }
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Sneaking</Heading>
            <Box direction="row" align="center" gap="medium" wrap margin={{ top: 'small', bottom: 'medium' }}>
                <ComponentAndLabel
                    label="Jade"
                    component={
                        <Box gap="xsmall" direction="row" align="center">
                            <IconImage data={SneakingDomain.getJadeImageData()} scale={0.7} />
                            <Text size="large">{nFormatter(sneaking.jade)}</Text>
                        </Box>
                    }
                />
                <Box direction="row" gap="medium" wrap pad={{ left: 'medium' }} border={{ side: 'left', color: 'grey-1' }}>
                    {!sneaking.pristineCharms.every(charm => charm.unlocked) && (
                        <TextAndLabel
                            label="Pristine rolls remaining"
                            text={`${commaNotation(sneaking.dailyCharmRolls.pristineRemaining)} / ${commaNotation(sneaking.dailyCharmRolls.pristineRollLimit)}`}
                            textSize="large"
                            labelSize="xsmall"
                            tooltip={`Only the first ${sneaking.dailyCharmRolls.pristineRollLimit} normal charm drops each day can become Pristine Charms.`}
                        />
                    )}
                    <TextAndLabel
                        label="Symbol rolls remaining"
                        text={sneaking.dailyCharmRolls.symbolsUnlocked
                            ? `${commaNotation(sneaking.dailyCharmRolls.symbolRemaining)} / ${commaNotation(sneaking.dailyCharmRolls.symbolRollLimit)}`
                            : `${commaNotation(sneaking.dailyCharmRolls.symbolRemaining)} / ${commaNotation(sneaking.dailyCharmRolls.symbolRollLimit)} (Locked)`}
                        textSize="large"
                        labelSize="xsmall"
                        tooltip={sneaking.dailyCharmRolls.symbolsUnlocked
                            ? `Only the first ${sneaking.dailyCharmRolls.symbolRollLimit} normal charm drops each day can become Symbols.`
                            : `Unlock Strange Symbols to let normal charm drops become Symbols. Only the first ${sneaking.dailyCharmRolls.symbolRollLimit} normal charm drops each day get this chance.`}
                    />
                    <TextAndLabel
                        label="Omnijade"
                        text={`${commaNotation(sneaking.omnijade.getAvailableCount())} / ${commaNotation(sneaking.omnijade.getOwnedCount())}`}
                        textSize="large"
                        labelSize="xsmall"
                        tooltip={
                            <Box>
                                <Text size="xsmall">Knowledge: {commaNotation(sneaking.omnijade.getSources().knowledge)}</Text>
                                <Text size="xsmall">Pipsqueak: {commaNotation(sneaking.omnijade.getSources().pipsqueak)}</Text>
                            </Box>   
                        }
                    />
                </Box>
            </Box>
            <Box gap="small">
                <ContentTabs
                    options={["Player Activity", "The Jade Emporium", "Sneaking Upgrades", "Inventory", "Pristine Charms", "Mastery", "Gemstones", (sneaking.beanstalking.unlocked ? "Beanstalk" : "")].filter(tab => tab != "").map(tabName => ({ value: tabName, label: tabName }))}
                    value={activeTab}
                    onChange={setActiveTab}
                />
                {activeTab == "Player Activity" && (
                    <PlayerActivitySection
                        sneakingPlayers={sneaking.players}
                        players={players}
                        floors={sneaking.floors}
                        selectedMastery={sneaking.selectedMastery}
                    />
                )}
                {activeTab == "The Jade Emporium" && <JadeUpgrades currentJade={sneaking.jade} jadeUpgrades={jadeUpgrades} />}
                {activeTab == "Sneaking Upgrades" && <SneakingUpgrades currentJade={sneaking.jade} upgrades={sneaking.sneakingUpgrades} omnijade={sneaking.omnijade} />}
                {activeTab == "Inventory" && <SneakingInventory inventory={sneaking.inventory} />}
                {activeTab == "Pristine Charms" && <PristineCharmSection charms={sneaking.pristineCharms} />}
                {activeTab == "Mastery" && <MasteryDisplay rewards={sneaking.masteryRewards} />}
                {activeTab == "Gemstones" && <GemstonesDisplay gemstones={sneaking.gemstones} />}
                {activeTab == "Beanstalk" && <BeanstalkingDisplay beanstalking={sneaking.beanstalking} />}
            </Box>
        </Box>
    )
}

export default Sneaking;
