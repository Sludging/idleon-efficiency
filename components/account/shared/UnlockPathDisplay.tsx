import React from 'react';
import { Box, Text } from 'grommet';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import IconImage from '../../base/IconImage';
import { nFormatter } from '../../../data/utility';
import { ImageData } from '../../../data/domain/imageData';
import { UnlockPathInfo } from '../../../data/domain/base/unlockEfficiencyEngine';

interface UnlockPathDisplayProps {
    unlockPathInfo: UnlockPathInfo;
    resourceName: string; // e.g., "Tachyons", "Bones"
    getResourceImageData: (resourceType: number) => ImageData;
    showUnlockPath: boolean;
    title?: string; // e.g., "Cheapest Path to Next Upgrade", "Most Efficient Damage Upgrades"
    targetLabel?: string; // e.g., "Next Unlock", "Target Goal"
}

export function UnlockPathDisplay({ 
    unlockPathInfo, 
    resourceName, 
    getResourceImageData, 
    showUnlockPath,
    title = "Optimal Path to Goal",
    targetLabel = "Next Target"
}: UnlockPathDisplayProps) {
    if (!showUnlockPath || !unlockPathInfo.nextUnlock || unlockPathInfo.levelsNeeded <= 0) {
        return null;
    }

    return (
        <ShadowBox background="dark-2" pad="medium" margin={{ bottom: 'small' }}>
            <Box gap="small">
                <Text size="medium" weight="bold">{title}</Text>

                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel
                        label={targetLabel}
                        component={
                            <Box direction="row" gap="small" align="center">
                                <IconImage data={unlockPathInfo.nextUnlock.getImageData()} scale={0.7} />
                                <Text>{unlockPathInfo.nextUnlock.data.name}</Text>
                            </Box>
                        }
                    />
                    <TextAndLabel
                        label="Levels Needed"
                        text={`${unlockPathInfo.levelsNeeded} more levels to reach ${unlockPathInfo.nextUnlock.data.unlock_req}`}
                    />
                </Box>

                <Box margin={{ top: 'small' }} direction="row" gap="medium" align="center">
                    <Text size="small" weight="bold">Total Cost:</Text>
                    {unlockPathInfo.resourceCosts.map((cost: number, index: number) =>
                        cost > 0 ? (
                            <Box key={index} direction="row" gap="xsmall" align="center">
                                <IconImage data={getResourceImageData(index)} />
                                <Text size="small">{nFormatter(cost)}</Text>
                            </Box>
                        ) : null
                    )}
                </Box>

                <Box margin={{ top: 'small' }}>
                    <Text size="small" weight="bold">Recommended Upgrades:</Text>

                    {unlockPathInfo.pathUpgrades.length > 0 ? (
                        <Box margin={{ top: 'xsmall' }}>
                            {unlockPathInfo.pathUpgrades.map((upgrade, index) => (
                                <Box key={index} direction="row" gap="medium" margin={{ vertical: 'xsmall' }} align="center">
                                    <Box direction="row" gap="small" align="center" basis="40%">
                                        <IconImage data={upgrade.imageData} scale={0.6} />
                                        <Text size="small">{upgrade.upgrade.data.name}</Text>
                                    </Box>
                                    <Text size="small">+{upgrade.levelsGained} levels</Text>
                                    <Box direction="row" gap="xsmall" align="center">
                                        <IconImage data={getResourceImageData(upgrade.resourceType)} />
                                        <Text size="small">{nFormatter(upgrade.resourceCost)}</Text>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ) : (
                        <Text size="small">No upgradeable options available. You may need to unlock more upgrades first.</Text>
                    )}
                </Box>

                <Box margin={{ top: 'small' }} background="dark-3" pad="small" round="small">
                    <Text size="small">
                        <strong>How this works:</strong> This calculator finds the most efficient sequence of upgrades to reach your goal.
                        It simulates adding one level at a time to the upgrade with the best cost-effectiveness, accounting for cost increases with each level.
                    </Text>
                </Box>
            </Box>
        </ShadowBox>
    );
} 
