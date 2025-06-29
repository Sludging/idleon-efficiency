"use client"

import { Box, CheckBox, Grid, Text, Tip, Select } from "grommet";
import { useMemo, useState } from "react";
import { Grimoire, GrimoireUpgrade } from "../../data/domain/grimoire";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import { CircleInformation } from "grommet-icons";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { ImageData } from "../../data/domain/imageData";
import { UnlockPathDisplay } from "./shared/UnlockPathDisplay";

// Simple bone display without tooltip
function BoneDisplay({ cost, canAfford, boneImageData }: { cost: number, canAfford?: boolean, boneImageData: ImageData }) {
    return (
        <Box direction="row" gap="small" align="center">
            <IconImage data={boneImageData} />
            <TipDisplay
                heading="Exact Bone Count"
                body={
                    <Text size="small">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                }
                direction={TipDirection.Down}
            >
                <Text color={canAfford ? "green-1" : undefined}>
                    {nFormatter(cost)}
                </Text>
            </TipDisplay>
        </Box>
    );
}

function UpgradeCostColumns(props: {
    upgrade: GrimoireUpgrade,
    grimoire: Grimoire
}) {
    const { upgrade, grimoire } = props;
    const isMaxLevel = upgrade.level >= upgrade.data.max_level;
    const isVeryHighMaxLevel = upgrade.data.max_level >= 999999;

    // If the upgrade is maxed, we don't need to show the cost columns
    if (isMaxLevel) {
        return (
            <Box fill justify="center" align="center">
                <Text size="large" color="status-ok">Maxed</Text>
            </Box>
        )
    }

    // Calculate cost for next 10 levels if max level is very high
    const costForNext10Levels = isVeryHighMaxLevel ? upgrade.getCostForNextNLevels([], 10) : 0;

    // Check if player can afford the upgrade
    const canAffordNextLevel = grimoire.canAffordUpgrade(upgrade);
    const canAffordCostToMax = grimoire.canAffordUpgrade(upgrade, isVeryHighMaxLevel ? costForNext10Levels : upgrade.costToMax);

    // Get bone type from the upgrade's x1 property
    const boneType = upgrade.data.x1;

    // Otherwise, we show the cost and cost to max columns
    return (
        <>
            <ComponentAndLabel
                labelSize="xsmall"
                label="Next level cost"
                component={
                    <BoneDisplay
                        cost={upgrade.cost}
                        canAfford={canAffordNextLevel}
                        boneImageData={grimoire.getBoneImageData(boneType)}
                    />
                }
            />
            <ComponentAndLabel
                labelSize="xsmall"
                label={isVeryHighMaxLevel ? "Cost for 10 levels" : "Cost to max"}
                component={
                    <BoneDisplay
                        cost={isVeryHighMaxLevel ? costForNext10Levels : upgrade.costToMax}
                        canAfford={canAffordCostToMax}
                        boneImageData={grimoire.getBoneImageData(boneType)}
                    />
                }
            />
        </>
    )
}

export function GrimoireDisplay() {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [hideLocked, setHideLocked] = useState(false);
    const [boneTypeFilter, setBoneTypeFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('default');
    const [showUnlockPath, setShowUnlockPath] = useState(false);
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const grimoire = theData.get("grimoire") as Grimoire;

    // Calculate counts for each bone type
    const boneTypeCounts = useMemo(() => {
        if (!grimoire) {
            return { all: 0, femur: 0, ribcage: 0, cranium: 0, bovinae: 0 };
        }

        const counts = {
            all: grimoire.upgrades.length,
            femur: grimoire.upgrades.filter(u => u.data.x1 === 0).length,
            ribcage: grimoire.upgrades.filter(u => u.data.x1 === 1).length,
            cranium: grimoire.upgrades.filter(u => u.data.x1 === 2).length,
            bovinae: grimoire.upgrades.filter(u => u.data.x1 === 3).length
        };

        return counts;
    }, [grimoire]);

    const upgradesToShow = useMemo(() => {
        if (!grimoire) {
            return [];
        }

        let filteredUpgrades = grimoire.upgrades;

        if (hideMaxed) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.level < upgrade.data.max_level
            );
        }

        if (hideLocked) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.unlocked
            );
        }

        if (boneTypeFilter !== 'All') {
            const boneTypeIndex = parseInt(boneTypeFilter);
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.data.x1 === boneTypeIndex
            );
        }

        // Apply sorting
        if (sortBy === 'cheapest') {
            // Sort by cost to next level (cheapest first)
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // First sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }

                // If both are locked, maintain original order
                if (!a.unlocked && !b.unlocked) {
                    return a.id - b.id;
                }

                // Handle maxed upgrades (they have cost 0)
                if (a.level >= a.data.max_level) return 1;
                if (b.level >= b.data.max_level) return -1;

                return a.cost - b.cost;
            });
        } else if (sortBy === 'affordable') {
            // Sort by affordability first, then by cost
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // First sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }

                // If both are locked, maintain original order
                if (!a.unlocked && !b.unlocked) {
                    return a.id - b.id;
                }

                // Handle maxed upgrades (they have cost 0)
                if (a.level >= a.data.max_level) return 1;
                if (b.level >= b.data.max_level) return -1;

                const aAffordable = grimoire.canAffordUpgrade(a) ? 1 : 0;
                const bAffordable = grimoire.canAffordUpgrade(b) ? 1 : 0;

                // First sort by affordability (affordable first)
                if (aAffordable !== bAffordable) {
                    return bAffordable - aAffordable;
                }

                // Then sort by cost (cheapest first)
                return a.cost - b.cost;
            });
        } else {
            // Default order, but with locked upgrades at the bottom
            filteredUpgrades = [...filteredUpgrades].sort((a, b) => {
                // Sort by locked status (unlocked first)
                if (a.unlocked !== b.unlocked) {
                    return a.unlocked ? -1 : 1;
                }

                // Maintain original order within each group
                return a.id - b.id;
            });
        }

        return filteredUpgrades;
    }, [grimoire, hideMaxed, hideLocked, boneTypeFilter, sortBy, lastUpdated]);

    // Calculate stats for summary
    const totalUpgrades = grimoire?.upgrades.length || 0;
    const maxedUpgrades = grimoire?.upgrades.filter(u => u.level >= u.data.max_level).length || 0;
    const unlockedUpgrades = grimoire?.upgrades.filter(u => u.unlocked).length || 0;

    // Create the tooltip label for Total Grimoire Level
    const totalLevelLabel = (
        <Box direction="row" gap="xsmall" align="center">
            <Text size="small" color="accent-2">Total Grimoire Level</Text>
            <TipDisplay
                heading="Total Grimoire Level"
                body={
                    <Text size="small">The sum of all your Grimoire upgrade levels. Higher levels unlock more upgrades.</Text>
                }
                direction={TipDirection.Down}
            >
                <CircleInformation size="small" />
            </TipDisplay>
        </Box>
    );

    // Create the tooltip label for Available Bones
    const availableBonesLabel = (
        <Box direction="row" gap="xsmall" align="center">
            <Text size="small" color="accent-2">Available Bones</Text>
            <TipDisplay
                heading="Bone Currency"
                body={
                    <Box>
                        <Text size="small">Bones are collected while in Wraith Form using the Death Bringer class.</Text>
                        <Text size="small">There are 4 types of bones with increasing rarity:</Text>
                        <Text size="small">• Femur: Basic bone type</Text>
                        <Text size="small">• Ribcage: Used for intermediate upgrades</Text>
                        <Text size="small">• Cranium: Used for advanced upgrades</Text>
                        <Text size="small">• Bovinae: Used for the most powerful upgrades</Text>
                    </Box>
                }
                direction={TipDirection.Down}
            >
                <CircleInformation size="small" />
            </TipDisplay>
        </Box>
    );

    // Bone type options for the filter
    const boneTypeOptions = [
        { label: `All Bones (${boneTypeCounts.all})`, value: 'All' },
        { label: `Femur (${boneTypeCounts.femur})`, value: '0' },
        { label: `Ribcage (${boneTypeCounts.ribcage})`, value: '1' },
        { label: `Cranium (${boneTypeCounts.cranium})`, value: '2' },
        { label: `Bovinae (${boneTypeCounts.bovinae})`, value: '3' }
    ];

    // Custom renderer for bone type options
    const renderBoneOption = (option: any) => {
        if (option.value === 'All') {
            return <Text>{option.label}</Text>;
        }

        const boneType = parseInt(option.value);
        return (
            <Box direction="row" gap="small" align="center">
                <IconImage data={grimoire?.getBoneImageData(boneType)} />
                <Text>{option.label}</Text>
            </Box>
        );
    };

    // Sorting options
    const sortOptions = [
        { label: 'Default Order', value: 'default' },
        { label: 'Cheapest First', value: 'cheapest' },
        { label: 'Affordable First', value: 'affordable' }
    ];

    // Custom renderer for sort options
    const renderSortOption = (option: any) => {
        return (
            <Box direction="row" gap="small" align="center">
                <Text>{option.label}</Text>
            </Box>
        );
    };

    // Use the pre-calculated unlock path info from the domain object
    const unlockPathInfo = grimoire?.unlockPathInfo || {
        nextUnlock: null,
        pathUpgrades: [],
        levelsNeeded: 0,
        totalCost: 0,
        resourceCosts: [0, 0, 0, 0],
        remainingLevels: 0
    };

    return (
        <Box gap="small">
            <ShadowBox background="dark-2" pad="medium" margin={{ bottom: 'medium' }}>
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel
                        label={totalLevelLabel}
                        component={
                            <Box direction="row" gap="small">
                                <Text size="large">{(grimoire?.totalGrimoireLevel || 0).toLocaleString()}</Text>
                            </Box>
                        }
                    />
                    <ComponentAndLabel
                        label="Upgrades"
                        component={
                            <Box direction="row" gap="small">
                                <Text>{unlockedUpgrades} / {totalUpgrades} unlocked</Text>
                                <Text>({maxedUpgrades} maxed)</Text>
                            </Box>
                        }
                    />
                </Box>

                {/* Display current bone counts */}
                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <ComponentAndLabel
                        label={availableBonesLabel}
                        component={
                            <Box direction="row" gap="medium" wrap>
                                <BoneDisplay cost={grimoire?.femurBones || 0} boneImageData={grimoire.getBoneImageData(0)} />
                                <BoneDisplay cost={grimoire?.ribcageBones || 0} boneImageData={grimoire.getBoneImageData(1)} />
                                <BoneDisplay cost={grimoire?.craniumBones || 0} boneImageData={grimoire.getBoneImageData(2)} />
                                <BoneDisplay cost={grimoire?.bovinaeBones || 0} boneImageData={grimoire.getBoneImageData(3)} />
                            </Box>
                        }
                    />
                </Box>

                <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
                    <CheckBox
                        checked={hideMaxed}
                        label="Hide maxed upgrades"
                        onChange={(event) => setHideMaxed(event.target.checked)}
                    />
                    <CheckBox
                        checked={hideLocked}
                        label="Hide locked upgrades"
                        onChange={(event) => setHideLocked(event.target.checked)}
                    />
                    <CheckBox
                        checked={showUnlockPath}
                        label="Show unlock path"
                        onChange={(event) => setShowUnlockPath(event.target.checked)}
                    />
                    <Box direction="row" align="center" gap="small">
                        <Select
                            placeholder="Filter by Bone Type"
                            value={boneTypeFilter}
                            options={boneTypeOptions}
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setBoneTypeFilter(value)}
                        >
                            {renderBoneOption}
                        </Select>
                    </Box>
                    <Box direction="row" align="center" gap="small">
                        <Select
                            placeholder="Sort by"
                            value={sortBy}
                            options={sortOptions}
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setSortBy(value)}
                        >
                            {renderSortOption}
                        </Select>
                        <TipDisplay
                            heading="Sorting Options"
                            body={
                                <Box>
                                    <Text size="small">• Default Order: Original game order</Text>
                                    <Text size="small">• Cheapest First: Sorts by lowest cost to next level</Text>
                                    <Text size="small">• Affordable First: Shows upgrades you can afford first</Text>
                                </Box>
                            }
                            direction={TipDirection.Down}
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                </Box>
                <Box margin={{ top: 'medium' }}>
                    <Text size="small">
                        <strong>Note:</strong> Grimoire upgrades are purchased with bones collected while in Wraith Form using the Death Bringer class.
                    </Text>
                </Box>
            </ShadowBox>

            {/* Display the unlock path if enabled */}
            <UnlockPathDisplay
                unlockPathInfo={unlockPathInfo}
                resourceName="Bones"
                getResourceImageData={(resourceType) => grimoire.getBoneImageData(resourceType)}
                showUnlockPath={showUnlockPath}
                title="Cheapest Path to Next Upgrade"
                targetLabel="Next Unlock"
            />

            {upgradesToShow.length === 0 && (
                <ShadowBox background="dark-1" pad="medium" align="center">
                    <Text>No upgrades to display with current filters</Text>
                </ShadowBox>
            )}

            {upgradesToShow.map((upgrade, index) => {
                const isLocked = !upgrade.unlocked;
                return (
                    <ShadowBox
                        style={{ opacity: isLocked ? 0.6 : 1 }}
                        key={index}
                        background={isLocked ? "dark-3" : "dark-1"}
                        pad="small"
                        direction="row"
                        align="center"
                        justify="between"
                        margin={{ bottom: 'xxsmall' }}
                    >
                        <Grid columns={["25%", "30%", "10%", "15%", "15%"]} gap="small" align="center" fill>
                            <ComponentAndLabel
                                labelSize="xsmall"
                                label="Name"
                                component={
                                    <Box direction="row" gap="small" align="center">
                                        <IconImage data={upgrade.getImageData()} scale={0.7} />
                                        <Text size="xsmall">{upgrade.data.name}</Text>
                                    </Box>
                                }
                            />
                            <TextAndLabel
                                labelSize="xsmall"
                                textSize='xsmall'
                                text={upgrade.getDescription()}
                                label="Bonus"
                            />
                            <TextAndLabel
                                labelSize="xsmall"
                                textSize='small'
                                text={`${upgrade.level} / ${upgrade.data.max_level}`}
                                label="Level"
                            />
                            {upgrade.unlocked && <UpgradeCostColumns upgrade={upgrade} grimoire={grimoire} />}
                            {!upgrade.unlocked && (
                                <Box fill>
                                    <TextAndLabel
                                        labelSize="xsmall"
                                        textSize='xsmall'
                                        text={`Unlock at ${upgrade.data.unlock_req} total level (${upgrade.data.unlock_req - grimoire.totalGrimoireLevel} more)`}
                                        label="Locked"
                                    />
                                </Box>
                            )}
                        </Grid>
                    </ShadowBox>
                )
            })}
        </Box>
    )
} 
