import React from 'react';
import { Box, Text, Select, CheckBox } from 'grommet';
import { CircleInformation } from 'grommet-icons';
import TipDisplay, { TipDirection } from '../../base/TipDisplay';

export interface OptimizationType {
    id: string;
    label: string;
    showCountSelector: boolean;
    showConsolidation: boolean;
}

interface EfficiencyControlsProps {
    optimizationTypes: OptimizationType[];
    selectedOptimization: string;
    onOptimizationChange: (type: string) => void;
    showCountSelector?: boolean;
    showConsolidation?: boolean;
    upgradeCount?: number;
    consolidateUpgrades?: boolean;
    onCountChange?: (count: number) => void;
    onConsolidationChange?: (consolidate: boolean) => void;
}

export function EfficiencyControls({
    optimizationTypes,
    selectedOptimization,
    onOptimizationChange,
    showCountSelector = false,
    showConsolidation = false,
    upgradeCount = 50,
    consolidateUpgrades = true,
    onCountChange,
    onConsolidationChange
}: EfficiencyControlsProps) {
    const selectedType = optimizationTypes.find(type => type.id === selectedOptimization);
    const shouldShowCountSelector = showCountSelector && selectedType?.showCountSelector;
    const shouldShowConsolidation = showConsolidation && selectedType?.showConsolidation;

    return (
        <Box direction="row" gap="medium" align="center">
            <Box direction="row" gap="small" align="center">
                <Text size="small">Optimize for:</Text>
                <Select
                    value={selectedOptimization}
                    options={optimizationTypes}
                    labelKey="label"
                    valueKey={{ key: 'id', reduce: true }}
                    onChange={({ value }) => onOptimizationChange(value)}
                />
            </Box>
            
            {shouldShowCountSelector && (
                <Box direction="row" gap="small" align="center">
                    <Text size="small">Show top:</Text>
                    <Select
                        value={upgradeCount}
                        options={[10, 25, 50, 100]}
                        onChange={({ option }) => onCountChange?.(option)}
                    />
                </Box>
            )}
            
            {shouldShowConsolidation && (
                <Box direction="row" gap="xsmall" align="center">
                    <CheckBox
                        checked={consolidateUpgrades}
                        label="Consolidate upgrades"
                        onChange={(event) => onConsolidationChange?.(event.target.checked)}
                    />
                    <TipDisplay
                        heading="Consolidation Mode"
                        body={
                            <Box gap="small">
                                <Text size="small" weight="bold">Consolidated (Checked):</Text>
                                <Text size="small">Groups multiple levels of the same upgrade together, sorted by average efficiency. Better for bulk upgrading and seeing total costs.</Text>
                                <Text size="small" weight="bold">Individual (Unchecked):</Text>
                                <Text size="small">Shows each upgrade level separately in exact efficiency order. Better for precise optimization and upgrading one level at a time.</Text>
                            </Box>
                        }
                        direction={TipDirection.Down}
                    >
                        <CircleInformation size="small" />
                    </TipDisplay>
                </Box>
            )}
        </Box>
    );
} 
