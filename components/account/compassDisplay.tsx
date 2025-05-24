"use client"

import { Box, CheckBox, Grid, Text, Select, Tabs, Tab } from "grommet";
import { useMemo, useState } from "react";
import { nFormatter } from "../../data/utility";
import ShadowBox from "../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../base/TextAndLabel";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";
import IconImage from "../base/IconImage";
import TipDisplay, { TipDirection } from "../base/TipDisplay";
import { ImageData } from "../../data/domain/imageData";
import { Compass, CompassUpgrade, DustType } from "../../data/domain/compass";
import { ThemeContext } from "grommet";
import { customTabsTheme, CustomTabTitle } from "../base/CustomTabs";

// Simple dust display without tooltip
function DustDisplay({ cost, canAfford, dustImageData, textSize = "xsmall" }: { cost: number, canAfford?: boolean, dustImageData: ImageData, textSize?: string }) {
    return (
        <Box direction="row" gap="small" align="end">
            <IconImage data={dustImageData} scale={0.7} />
            <TipDisplay
                heading="Exact Dust Count"
                body={
                    <Text size="small">{cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</Text>
                }
                direction={TipDirection.Down}
            >
                <Text size={textSize} color={canAfford ? "green-1" : undefined}>
                    {nFormatter(cost)}
                </Text>
            </TipDisplay>
        </Box>
    );
}

// Custom hook for managing compass filters
function useCompassFilters(compass: Compass, lastUpdated: Date) {
    const [hideMaxed, setHideMaxed] = useState(true);
    const [hideLocked, setHideLocked] = useState(false);
    const [dustTypeFilter, setDustTypeFilter] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('default');
    const [groupBy, setGroupBy] = useState<string>('path');
    const [activeTabIndex, setActiveTabIndex] = useState<number>(0);

    // Calculate counts for each dust type
    const dustTypeCounts = useMemo(() => {
        if (!compass) {
            return { all: 0, stardust: 0, moondust: 0, solardust: 0, cooldust: 0, novadust: 0 };
        }

        const counts = {
            all: compass.upgrades.length,
            stardust: compass.upgrades.filter(u => u.data.dustType === DustType.Stardust).length,
            moondust: compass.upgrades.filter(u => u.data.dustType === DustType.Moondust).length,
            solardust: compass.upgrades.filter(u => u.data.dustType === DustType.Solardust).length,
            cooldust: compass.upgrades.filter(u => u.data.dustType === DustType.Cooldust).length,
            novadust: compass.upgrades.filter(u => u.data.dustType === DustType.Novadust).length,
        };

        return counts;
    }, [compass]);

    const upgradesToShow = useMemo(() => {
        if (!compass) {
            return {};
        }

        let filteredUpgrades = compass.upgrades;

        if (hideMaxed) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.level < upgrade.data.maxLevel
            );
        }

        if (hideLocked) {
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.unlocked
            );
        }

        if (dustTypeFilter !== 'All') {
            const dustTypeIndex = parseInt(dustTypeFilter);
            filteredUpgrades = filteredUpgrades.filter(upgrade =>
                upgrade.data.dustType === dustTypeIndex
            );
        }

        // Group the upgrades first
        let groupedUpgrades: Record<string, CompassUpgrade[]>;
        if (groupBy === 'dust') {
            groupedUpgrades = filteredUpgrades.reduce((acc, upgrade) => {
                const dustType = DustType[upgrade.data.dustType];
                if (!acc[dustType]) {
                    acc[dustType] = [];
                }
                acc[dustType].push(upgrade);
                return acc;
            }, {} as Record<string, CompassUpgrade[]>);
        } else {
            // Default to path grouping
            groupedUpgrades = filteredUpgrades.reduce((acc, upgrade) => {
                const path = upgrade.data.upgradeType;
                if (!acc[path]) {
                    acc[path] = [];
                }
                acc[path].push(upgrade);
                return acc;
            }, {} as Record<string, CompassUpgrade[]>);
        }

        // Apply sorting within each group
        Object.keys(groupedUpgrades).forEach(group => {
            if (sortBy === 'cheapest') {
                groupedUpgrades[group] = [...groupedUpgrades[group]].sort((a, b) => {
                    // First sort by locked status (unlocked first)
                    if (a.unlocked !== b.unlocked) {
                        return a.unlocked ? -1 : 1;
                    }

                    // If both are locked, maintain original order
                    if (!a.unlocked && !b.unlocked) {
                        return a.indexInPath - b.indexInPath;
                    }

                    // Handle maxed upgrades (they have cost 0)
                    if (a.level >= a.data.maxLevel) return 1;
                    if (b.level >= b.data.maxLevel) return -1;

                    return a.cost - b.cost;
                });
            } else if (sortBy === 'affordable') {
                groupedUpgrades[group] = [...groupedUpgrades[group]].sort((a, b) => {
                    // First sort by locked status (unlocked first)
                    if (a.unlocked !== b.unlocked) {
                        return a.unlocked ? -1 : 1;
                    }

                    // If both are locked, maintain original order
                    if (!a.unlocked && !b.unlocked) {
                        return a.indexInPath - b.indexInPath;
                    }

                    // Handle maxed upgrades (they have cost 0)
                    if (a.level >= a.data.maxLevel) return 1;
                    if (b.level >= b.data.maxLevel) return -1;

                    const aAffordable = compass.canAffordUpgrade(a) ? 1 : 0;
                    const bAffordable = compass.canAffordUpgrade(b) ? 1 : 0;

                    // First sort by affordability (affordable first)
                    if (aAffordable !== bAffordable) {
                        return bAffordable - aAffordable;
                    }

                    // Then sort by cost (cheapest first)
                    return a.cost - b.cost;
                });
            } else {
                // Default order, but with locked upgrades at the bottom
                groupedUpgrades[group] = [...groupedUpgrades[group]].sort((a, b) => {
                    return a.indexInPath - b.indexInPath;
                });
            }
        });

        return groupedUpgrades;
    }, [compass, hideMaxed, hideLocked, dustTypeFilter, sortBy, groupBy, lastUpdated]);

    // Filter out path upgrades from regular grouping and remove empty groups
    const filteredUpgradesToShow = useMemo(() => {
        const pathUpgradeIds = [1, 13, 27, 40];
        const filtered: Record<string, CompassUpgrade[]> = {};

        Object.entries(upgradesToShow).forEach(([group, upgrades]) => {
            const nonPathUpgrades = upgrades.filter(upgrade => !pathUpgradeIds.includes(upgrade.id));
            if (nonPathUpgrades.length > 0) {
                filtered[group] = nonPathUpgrades;
            }
        });

        return filtered;
    }, [upgradesToShow]);

    // Filters component with internal state
    const FiltersComponent = () => {
        // Custom renderer for dust type options
        const renderDustTypeOption = (option: any) => {
            if (option.value === 'All') {
                return <Text>{option.label}</Text>;
            }

            const dustType = parseInt(option.value);
            return (
                <Box direction="row" gap="small" align="center">
                    <IconImage data={compass?.getDustImageData(dustType)} />
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

        return (
            <Box direction="row" gap="medium" margin={{ top: 'medium' }} wrap>
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
                </Box>
                <Box direction="row" align="center" gap="small">
                    <Select
                        placeholder="Group by"
                        value={groupBy}
                        options={[
                            { label: 'Dust Type', value: 'dust' },
                            { label: 'Upgrade Path', value: 'path' }
                        ]}
                        labelKey="label"
                        valueKey={{ key: 'value', reduce: true }}
                        onChange={({ value }) => setGroupBy(value)}
                    />
                </Box>
                <CheckBox
                    checked={hideMaxed}
                    label="Hide maxed"
                    onChange={(event) => setHideMaxed(event.target.checked)}
                />
                <CheckBox
                    checked={hideLocked}
                    label="Hide locked"
                    onChange={(event) => setHideLocked(event.target.checked)}
                />
            </Box>
        );
    };

    return {
        filteredUpgradesToShow,
        activeTabIndex,
        setActiveTabIndex,
        FiltersComponent
    };
}

// Compass Summary Section
function CompassSummary({ compass }: { compass: Compass }) {
    return (
        <ShadowBox background="dark-2" pad="medium">
            <Box direction="row" gap="medium" wrap justify="between">
                {/* Display current dust counts */}
                <ComponentAndLabel
                    label={"Available Dust"}
                    component={
                        <Box direction="row" gap="medium" wrap>
                            <DustDisplay cost={compass.availableDust[DustType.Stardust] || 0} dustImageData={compass.getDustImageData(DustType.Stardust)} textSize="small" />
                            <DustDisplay cost={compass.availableDust[DustType.Moondust] || 0} dustImageData={compass.getDustImageData(DustType.Moondust)} textSize="small" />
                            <DustDisplay cost={compass.availableDust[DustType.Solardust] || 0} dustImageData={compass.getDustImageData(DustType.Solardust)} textSize="small" />
                            <DustDisplay cost={compass.availableDust[DustType.Cooldust] || 0} dustImageData={compass.getDustImageData(DustType.Cooldust)} textSize="small" />
                            <DustDisplay cost={compass.availableDust[DustType.Novadust] || 0} dustImageData={compass.getDustImageData(DustType.Novadust)} textSize="small" />
                        </Box>
                    }
                />
            </Box>
        </ShadowBox>
    );
}

// Path Upgrades Section
function PathUpgradesSection({ pathUpgrades, compass }: { pathUpgrades: any[], compass: Compass }) {
    if (pathUpgrades.length === 0) return null;

    return (
        <Box>
            <Text size="medium" weight="bold" margin={{ bottom: 'xsmall' }}>Path Upgrades</Text>
            <Grid
                columns={['repeat(auto-fill, minmax(300px, 1fr))']}
                gap="small"
            >
                {pathUpgrades.map((pathData, index) => {
                    if (!pathData) return null;
                    const { upgrade, pathName, nextLockedUpgrade, pathLevel } = pathData;
                    return (
                        <ShadowBox
                            key={index}
                            background="dark-1"
                            pad="medium"
                            height="100%"
                        >
                            <Box gap="small" fill justify="between">
                                <Box gap="small">
                                    <Box direction="row" justify="between" align="center">
                                        <Box direction="row" gap="small" align="center">
                                            <IconImage data={upgrade.getImageData()} scale={0.5} />
                                            <Text size="small" weight="bold">{upgrade.data.name}</Text>
                                        </Box>
                                        <Box direction="row" gap="small">
                                            <Text size="xsmall">{upgrade.level} / {upgrade.data.maxLevel}</Text>
                                        </Box>
                                    </Box>
                                    {nextLockedUpgrade && (
                                        <Box>
                                            <TextAndLabel
                                                label="Next Unlock"
                                                text={`${nextLockedUpgrade.data.name} (${nextLockedUpgrade.data.description}`}
                                                labelSize="xsmall"
                                                textSize="xsmall"
                                                textColor="grey-2"
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <Box gap="small">
                                    <Box>
                                        <ComponentAndLabel
                                            labelSize="xsmall"
                                            label="Next level:"
                                            component={
                                                <DustDisplay
                                                    cost={upgrade.cost}
                                                    canAfford={compass.canAffordUpgrade(upgrade)}
                                                    dustImageData={compass.getDustImageData(upgrade.data.dustType)}
                                                />
                                            }
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </ShadowBox>
                    );
                })}
            </Grid>
        </Box>
    );
}

// Main Tabs Section
function CompassTabs({ filteredUpgradesToShow, activeTabIndex, setActiveTabIndex, compass }: {
    filteredUpgradesToShow: Record<string, CompassUpgrade[]>;
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
    compass: Compass;
}) {
    if (Object.keys(filteredUpgradesToShow).length === 0) {
        return (
            <ShadowBox background="dark-1" pad="medium" align="center">
                <Text>No upgrades to display with current filters</Text>
            </ShadowBox>
        );
    }

    return (
        <ThemeContext.Extend value={customTabsTheme}>
            <Tabs activeIndex={activeTabIndex} onActive={setActiveTabIndex}>
                {Object.entries(filteredUpgradesToShow).filter(([group, _]) => group !== "Unknown").map(([group, upgrades], index) => (
                    <Tab key={index} title={<CustomTabTitle isActive={activeTabIndex === index} label={group} />}>
                        <Box pad="small">
                            <Grid
                                columns={['repeat(auto-fill, minmax(300px, 1fr))']}
                                gap="small"
                            >
                                {upgrades.map((upgrade, upgradeIndex) => (
                                    <UpgradeCard key={upgradeIndex} upgrade={upgrade} compass={compass} />
                                ))}
                            </Grid>
                        </Box>
                    </Tab>
                ))}
            </Tabs>
        </ThemeContext.Extend>
    );
}

// Upgrade Card Component
function UpgradeCard({ upgrade, compass }: { upgrade: CompassUpgrade, compass: Compass }) {
    const isLocked = !upgrade.unlocked;
    return (
        <ShadowBox
            style={{ opacity: isLocked ? 0.6 : 1 }}
            background={isLocked ? "dark-3" : "dark-1"}
            pad="small"
            height="100%"
        >
            <Box gap="small" fill justify="between">
                <Box direction="row" justify="between" align="center">
                    <Box direction="row" gap="small" align="center">
                        <IconImage data={upgrade.getImageData()} scale={0.5} />
                        <Text size="xsmall" weight="bold">{upgrade.data.name}</Text>
                    </Box>
                    <Box direction="row" gap="small">
                        <Text size="xsmall">{upgrade.level} / {upgrade.data.maxLevel}</Text>
                    </Box>
                </Box>
                <Box>
                    <TextAndLabel
                        label="Bonus"
                        text={upgrade.getDescription()}
                        labelSize="small"
                        textSize="xsmall"
                    />
                </Box>
                {upgrade.unlocked && (
                    <Box direction="row" gap="small" justify="between">
                        <ComponentAndLabel
                            label="Next level:"
                            component={
                                <DustDisplay
                                    cost={upgrade.cost}
                                    canAfford={compass.canAffordUpgrade(upgrade)}
                                    dustImageData={compass.getDustImageData(upgrade.data.dustType)}
                                />
                            }
                        />
                        <ComponentAndLabel
                            label={upgrade.data.maxLevel >= 999999 ? "10 levels:" : "To max:"}
                            component={
                                <DustDisplay
                                    cost={upgrade.data.maxLevel >= 999999
                                        ? upgrade.getCostForNextNLevels(compass.upgrades, 10, compass.upgradeMetadata)
                                        : upgrade.costToMax}
                                    canAfford={compass.canAffordUpgrade(upgrade,
                                        upgrade.data.maxLevel >= 999999
                                            ? upgrade.getCostForNextNLevels(compass.upgrades, 10, compass.upgradeMetadata)
                                            : upgrade.costToMax)}
                                    dustImageData={compass.getDustImageData(upgrade.data.dustType)}
                                />
                            }
                        />
                    </Box>
                )}
            </Box>
        </ShadowBox>
    );
}

// Main CompassDisplay Component
function CompassDisplay() {
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const compass = theData.get("compass") as Compass;

    // Use the custom hook for filters
    const { filteredUpgradesToShow, activeTabIndex, setActiveTabIndex, FiltersComponent } = useCompassFilters(compass, lastUpdated);

    // Extract path-unlocking upgrades (special treatment)
    const pathUpgrades = useMemo(() => {
        if (!compass) return [];

        // Path-unlocking upgrade IDs: Elemental(1), Fighter(13), Survival(27), Nomadic(40)
        const pathUpgradeIds = [1, 13, 27, 40];
        const pathNames = ['Elemental', 'Fighter', 'Survival', 'Nomadic'];

        return pathUpgradeIds.map((id, index) => {
            const upgrade = compass.upgrades.find(u => u.id === id);
            if (!upgrade) return null;

            const pathName = pathNames[index];
            const pathMetadata = compass.upgradeMetadata[pathName];

            // Find the next locked upgrade in this path
            let nextLockedUpgrade = null;
            if (pathMetadata && pathMetadata.pathUpgrades) {
                const nextLockedId = pathMetadata.pathUpgrades.find(upgradeId => {
                    const pathUpgrade = compass.upgrades.find(u => u.id === upgradeId);
                    return pathUpgrade && !pathUpgrade.unlocked;
                });
                if (nextLockedId !== undefined) {
                    nextLockedUpgrade = compass.upgrades.find(u => u.id === nextLockedId);
                }
            }

            return {
                upgrade,
                pathName,
                nextLockedUpgrade,
                pathLevel: pathMetadata?.pathLevel || 0
            };
        }).filter(Boolean);
    }, [compass, lastUpdated]);

    return (
        <Box gap="medium">
            <CompassSummary compass={compass} />

            <PathUpgradesSection pathUpgrades={pathUpgrades} compass={compass} />

            <FiltersComponent />

            <CompassTabs
                filteredUpgradesToShow={filteredUpgradesToShow}
                activeTabIndex={activeTabIndex}
                setActiveTabIndex={setActiveTabIndex}
                compass={compass}
            />
        </Box>
    );
}

export default CompassDisplay;