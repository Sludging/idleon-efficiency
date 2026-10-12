"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';

import ShadowBox from '../../../components/base/ShadowBox';
import { Forge as ForgeDomain } from '../../../data/domain/world-1/forge';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import DataRow from '../../../components/base/DataRow';
import CoinsDisplay from '../../../components/coinsDisplay';
import { getCoinsArray, nFormatter } from '../../../data/utility';
import ContentTabs from '../../../components/base/ContentTabs';
import { Item } from '../../../data/domain/items';
import { TimeDisplaySize, TimeDown } from '../../../components/base/TimeDisplay';
import IconImage from '../../../components/base/IconImage';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

const CompactCoins = styled(Box)`
    span {
        font-size: 14px;
        line-height: 20px;
    }
    > div, > div > div {
        align-items: center;
        justify-content: center;
    }
`;

function ForgeItem({ item }: { item: Item }) {
    if (item.displayName == "Blank") {
        return <Text size="small">Empty</Text>;
    }
    return (
        <Box direction="row" gap="xsmall" align="center" justify="center">
            <IconImage data={item.getImageData()} />
            <Text size="small">{nFormatter(item.count)}</Text>
        </Box>
    )
}

function Forge() {
    const [forge, setForge] = useState<ForgeDomain | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<string>("Slots");
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const firstSlotToEmpty = useMemo(() => {
        const forgeSpeed = forge?.upgrades[2].getStat() ?? 0;
        return [...(forge?.slots ?? [])].sort((slot1, slot2) => slot1.getTimeTillEmpty(forgeSpeed) < slot2.getTimeTillEmpty(forgeSpeed) ? -1 : 1)[0];
    }, [theData, forge])

    const totalCost = useMemo(() => {
        return forge?.upgrades.reduce((sum, upgrade) => sum += upgrade.getMaxCost(), 0) ?? 0;
    }, [theData, forge])

    useEffect(() => {
        setForge(theData.get("forge"));
    }, [theData]);

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Forge</Heading>
            <Box direction="row">
                {
                    totalCost > 0 &&
                    <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center" width="medium">
                        <ComponentAndLabel
                            label="Cost to max all upgrades"
                            component={<CoinsDisplay coinMap={getCoinsArray(totalCost)} maxCoins={3} />}
                        />
                    </ShadowBox>
                }
                <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center" width="medium">
                    <ComponentAndLabel
                        label="Need to refill in"
                        component={<TimeDown addSeconds={firstSlotToEmpty?.getTimeTillEmpty(forge?.upgrades[2].getStat() ?? 0) ?? 0} size={TimeDisplaySize.Medium} />}
                    />
                </ShadowBox>
            </Box>
            <ContentTabs
                options={[
                    { value: "Slots", label: "Slots" },
                    { value: "Upgrades", label: "Upgrades" },
                ]}
                value={activeTab}
                onChange={setActiveTab}
            />
            <Box pad="small">
                {
                    activeTab == "Upgrades" &&
                    <Box gap="small">
                        {
                            forge && forge.upgrades.map((upgrade, index) => (
                                <DataRow
                                    key={index}
                                    columns={["minmax(0, 1fr)", "minmax(0, 4fr)", "minmax(0, 5fr)"]}
                                    fields={[
                                        { key: 'level', kind: 'text', label: 'Level', value: `${upgrade.level}/${upgrade.maxLevel}` },
                                        { key: 'bonus', kind: 'text', label: 'Bonus', value: upgrade.getBonusText(), role: 'description' },
                                        {
                                            key: 'cost', kind: 'content', label: null,
                                            content: upgrade.level < upgrade.maxLevel
                                                ? <Box direction="row" gap="small" align="center" justify="center">
                                                    <ComponentAndLabel
                                                        label="Next level cost"
                                                        labelSize="xsmall"
                                                        component={<CompactCoins align="center"><CoinsDisplay coinMap={getCoinsArray(upgrade.getCost())} maxCoins={3} regularRow /></CompactCoins>}
                                                    />
                                                    <ComponentAndLabel
                                                        label="Cost to max"
                                                        labelSize="xsmall"
                                                        component={<CompactCoins align="center"><CoinsDisplay coinMap={getCoinsArray(upgrade.getMaxCost())} maxCoins={3} regularRow /></CompactCoins>}
                                                    />
                                                </Box>
                                                : <Text size="small">MAXED</Text>,
                                        },
                                    ]}
                                />
                            ))
                        }
                    </Box>
                }
                {
                    activeTab == "Slots" &&
                    <Box gap="small">
                        {
                            forge && forge.slots.map((slot, index) => {
                                const slotSpeed = slot.getSpeed(forge.upgrades[2].getStat());
                                const oreInterval = slot.getOreInterval();
                                const timeTillEmpty = Math.round(slot.ores.count / slot.getOrePerInterval()) * (oreInterval / (4 * slotSpeed))
                                const slotBought = index < forge.upgrades[0].getStat();
                                if (slotBought) {
                                    return (
                                        <DataRow
                                            key={index}
                                            columns={['36px', 'minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 1fr)', 'minmax(0, 2fr)']}
                                            opacity={slot.ores.count > 0 ? 1 : 0.8}
                                            fields={[
                                                { key: 'artwork', kind: 'artwork', artwork: <IconImage data={{ location: slot.brimestone ? 'GemP4' : 'ForgeA', height: 36, width: 36 }} /> },
                                                { key: 'ores', kind: 'content', label: 'Ores', content: <ForgeItem item={slot.ores} /> },
                                                { key: 'oils', kind: 'content', label: 'Oils', content: <ForgeItem item={slot.oils} /> },
                                                { key: 'bars', kind: 'content', label: 'Bars', content: <ForgeItem item={slot.bars} /> },
                                                {
                                                    key: 'timer', kind: 'content', label: 'Time Till Empty',
                                                    content: <Box gap="xsmall" align="center">
                                                        <TimeDown addSeconds={timeTillEmpty} size={TimeDisplaySize.Medium} />
                                                        <Text size="10px">* Not fully accurate with oils yet.</Text>
                                                    </Box>,
                                                },
                                            ]}
                                        />
                                    )
                                } else {
                                    return (
                                        <DataRow
                                            key={index}
                                            columns={['36px', 'flex']}
                                            opacity={0.3}
                                            fields={[
                                                { key: 'artwork', kind: 'artwork', artwork: <IconImage data={{ location: slot.brimestone ? 'GemP4' : 'ForgeA', height: 36, width: 36 }} /> },
                                                { key: 'locked', kind: 'content', label: null, content: <Text size="small">You need to buy this slot in upgrades</Text> },
                                            ]}
                                        />
                                    )
                                }
                            })
                        }
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Forge;