"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useState } from 'react';
import { SummonEssence, Summoning as SummoningDomain } from '../../../data/domain/world-6/summoning';
import IconImage from '../../../components/base/IconImage';
import { nFormatter } from '../../../data/utility';
import ContentTabs from '../../../components/base/ContentTabs';
import { SummoningBonuses } from '../../../components/world-6/summoning/summoningBonuses';
import { SummoningUpgrades } from '../../../components/world-6/summoning/summoningUpgrades';
import { SummoningBattles } from '../../../components/world-6/summoning/summoningBattles';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';
import { useShallow } from 'zustand/react/shallow';
import TipDisplay from '../../../components/base/TipDisplay';
import { CircleInformation } from 'grommet-icons';
import { UpgradeTable } from '../../../components/account/shared/UpgradeTable';
import type { FilterOptions } from '../../../components/account/shared/UpgradeTableFilters';

function Summoning() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const [activeTab, setActiveTab] = useState<string>("Winner bonuses");
    const [filters, setFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: "",
        sortBy: "default"
    });

    const summoning = theData.get("summoning") as SummoningDomain;

    if (!hydrated) {
        return <>Loading...</>;
    }

    const columns = [
        {
            property: "color",
            header: "Essence",
            render: (essence: SummonEssence) => (
                <Box direction="row" gap="small" align="center">
                    <IconImage data={SummoningDomain.getEssenceIcon(essence.color)} />
                    <Text size="small">{SummoningDomain.getEssenceColorName(essence.color)}</Text>
                </Box>
            )
        },
        {
            property: "quantity",
            header: "Owned",
            render: (essence: SummonEssence) => <Text size="small">{nFormatter(essence.quantity)}</Text>
        },
        {
            property: "generationPerHour",
            header: "Per hour",
            render: (essence: SummonEssence) => <Text size="small">{nFormatter(essence.generationPerHour)}</Text>
        },
        {
            property: "stoneBossVictories",
            header: "Stone wins",
            render: (essence: SummonEssence) => {
                if (essence.nextStoneBossHp === undefined) {
                    return <Text size="small">—</Text>;
                }

                return (
                    <Box direction="row" gap="small" align="center">
                        <TipDisplay
                            heading={summoning.getEssenceSummoningStoneBossName(essence.color)}
                            size="small"
                            maxWidth="medium"
                            body={
                                <Box>
                                    <Text size="small">{summoning.getEssenceSummoningStoneBossmap(essence.color)}</Text>
                                </Box>
                            }
                        >
                            <IconImage data={SummoningDomain.getSummoningStoneIcon(essence.color)} />
                        </TipDisplay>
                        <Text size="small">{essence.stoneBossVictories}</Text>
                    </Box>
                );
            }
        },
        {
            property: "nextStoneBossHp",
            header: (
                <Box direction="row" gap="xsmall" align="center">
                    <Text size="small">Next boss HP</Text>
                    <TipDisplay
                        heading="Next boss HP"
                        size="small"
                        maxWidth="medium"
                        body={<Text size="small">Starting health for your next fight at this stone. Each win makes the next boss stronger.</Text>}
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>
            ),
            render: (essence: SummonEssence) => {
                const nextStoneBossHp = essence.nextStoneBossHp;
                return (
                    <Text size="small">
                        {nextStoneBossHp === undefined ? '—' : nextStoneBossHp === Number.POSITIVE_INFINITY ? '∞' : nFormatter(nextStoneBossHp)}
                    </Text>
                );
            }
        },
        {
            property: "stoneBonusMultiplier",
            header: (
                <Box direction="row" gap="xsmall" align="center">
                    <Text size="small">Upgrade bonus</Text>
                    <TipDisplay
                        heading="Upgrade bonus"
                        size="small"
                        maxWidth="medium"
                        body={<Text size="small">Each stone boss win makes some Summoning upgrades of this colour stronger. Their displayed bonuses already include this boost.</Text>}
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>
            ),
            render: (essence: SummonEssence) => (
                <Text size="small">
                    {essence.nextStoneBossHp === undefined ? '—' : `${nFormatter(essence.stoneBonusMultiplier)}x`}
                </Text>
            )
        }
    ];

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Summoning</Heading>
            <Text>Summoning Lv: {summoning.summoningLevel}</Text>
            <Box gap="small">
                <ContentTabs
                    options={["Winner bonuses", "Essences & Stones", "Summoning Upgrades", "Battles"].map(tabName => ({ value: tabName, label: tabName }))}
                    value={activeTab}
                    onChange={setActiveTab}
                />
                {activeTab == "Winner bonuses" && <SummoningBonuses bonuses={summoning.summonBonuses} />}
                {activeTab == "Summoning Upgrades" && (
                    <SummoningUpgrades
                        essences={summoning.summonEssences}
                        upgrades={summoning.summonUpgrades}
                        doublersOwned={summoning.summoningDoublersOwned}
                        doublersAvailable={summoning.summoningDoublersAvailable}
                        doublerImage={SummoningDomain.getDoublerImageData()}
                        doublerMultiplier={summoning.summoningDoublerMultiplier}
                    />
                )}
                {activeTab == "Battles" && <SummoningBattles battlesInfos={summoning.summonBattles} essences={summoning.summonEssences} />}
                {activeTab == "Essences & Stones" && (
                    <UpgradeTable
                        tableName="Summoning essences and stones"
                        columns={columns}
                        data={summoning.summonEssences.filter(essence => essence.displayEssence)}
                        primaryKey="color"
                        filters={filters}
                        onFiltersChange={setFilters}
                        sortOptions={[]}
                        showSearch={false}
                        showLockedAndMaxedFilters={false}
                        minWidth="900px"
                        variant="panel"
                    />
                )}
            </Box>
        </Box>
    )
}

export default Summoning;