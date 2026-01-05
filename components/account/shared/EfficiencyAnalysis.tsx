import { useState, useMemo } from 'react';
import { Box, Text } from 'grommet';
import { EfficiencyControls, OptimizationType } from './EfficiencyControls';
import { EfficiencyDisplay } from './EfficiencyDisplay';
import { EfficiencyPathInfo } from '../../../lib/efficiencyEngine/efficiencyEngine';
import { ImageData } from '../../../data/domain/imageData';
import ShadowBox from '../../base/ShadowBox';
import { ComponentAndLabel } from '../../base/TextAndLabel';

interface EfficiencyAnalysisProps {
    efficiencyResults: Map<string, EfficiencyPathInfo>;
    optimizationTypes: OptimizationType[];
    getResourceImageData: (resourceType: number) => ImageData;
    canAffordResource: (resourceType: number, cost: number) => boolean;
    valueConfigs: Record<string, {
        valueHeader: string;
        valueColor: string;
        formatValue: (value: number) => string;
        noResultsText: string;
    }>;
    title?: string;
}

export function EfficiencyAnalysis({
    efficiencyResults,
    optimizationTypes,
    getResourceImageData,
    canAffordResource,
    valueConfigs,
    title = "Upgrade Efficiency Analysis"
}: EfficiencyAnalysisProps) {
    const [selectedOptimization, setSelectedOptimization] = useState(optimizationTypes[0].id);
    const [upgradeCount, setUpgradeCount] = useState(50);
    const [consolidateUpgrades, setConsolidateUpgrades] = useState(true);

    const currentEfficiencyData = efficiencyResults.get(selectedOptimization);
    const currentValueConfig = valueConfigs[selectedOptimization];
    const currentOptimization = optimizationTypes.find(opt => opt.id === selectedOptimization);
    
    const sortByResource = useMemo(() => {
        return selectedOptimization === "Unlock Path";
    }, [selectedOptimization]);

    // Early return if no efficiency data
    if (!currentEfficiencyData || !currentValueConfig) {
        return null;
    }

    // Slice the efficiency data based on upgradeCount, 
    // If the optimization type doesn't show the count selector, use the full path upgrades
    const limitedEfficiencyData = {
        ...currentEfficiencyData,
        pathUpgrades: currentOptimization?.showCountSelector ? currentEfficiencyData.pathUpgrades.slice(0, upgradeCount) : currentEfficiencyData.pathUpgrades
    };

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box gap="medium">
                <Box>
                    <Box direction="row" gap="medium" justify="between" align="center">
                        <Text size="medium" weight="bold">{title}</Text>
                        {currentOptimization?.currentValues && (
                            <Box direction="row" gap="medium" align="start">
                                {currentOptimization.currentValues.map((currentValue, index) => (
                                    <ComponentAndLabel
                                        key={index}
                                        label={currentValue.label}
                                        labelSize="small"
                                        component={currentValue.value}
                                    />
                                ))}
                            </Box>
                        )}
                    </Box>
                    
                    <EfficiencyControls
                        optimizationTypes={optimizationTypes}
                        selectedOptimization={selectedOptimization}
                        onOptimizationChange={setSelectedOptimization}
                        showCountSelector={true}
                        showConsolidation={true}
                        upgradeCount={upgradeCount}
                        consolidateUpgrades={consolidateUpgrades}
                        onCountChange={setUpgradeCount}
                        onConsolidationChange={setConsolidateUpgrades}
                    />
                </Box>

                <EfficiencyDisplay
                    efficiencyData={limitedEfficiencyData}
                    getResourceImageData={getResourceImageData}
                    canAffordResource={canAffordResource}
                    valueHeader={currentValueConfig.valueHeader}
                    valueColor={currentValueConfig.valueColor}
                    formatValue={currentValueConfig.formatValue}
                    noResultsText={currentValueConfig.noResultsText}
                    consolidateUpgrades={consolidateUpgrades}
                    sortByResource={sortByResource}
                />
            </Box>
        </ShadowBox>
    );
} 
