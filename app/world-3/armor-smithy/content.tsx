"use client"

import { Box, CheckBox, Grid, Heading, Text } from 'grommet';
import { useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import TipDisplay from '../../../components/base/TipDisplay';
import { commaNotation } from '../../../data/utility';
import type { EquipmentSetItemLocation } from '../../../data/domain/misc/equipmentSets';
import { EquipmentSets as EquipmentSetsDomain } from '../../../data/domain/misc/equipmentSets';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';

function formatLocation(location: EquipmentSetItemLocation): string {
    if (location.kind === 'storage') {
        return `Storage (${commaNotation(location.count)})`;
    }
    const label = location.kind === 'bag' ? 'bag' : location.kind === 'tool' ? 'tools' : 'equipped';
    return `${location.playerName}: ${label} (${commaNotation(location.count)})`;
}

function ArmorSmithy() {
    const hydrated = useHydrated();
    const [showOwned, setShowOwned] = useState(true);
    const { equipmentSets } = useAppDataStore(useShallow(
        (state) => ({
            equipmentSets: state.data.getData().get("equipmentSets") as EquipmentSetsDomain | undefined,
            lastUpdated: state.lastUpdated,
        })
    ));

    if (!hydrated || !equipmentSets) {
        return <Box>Loading</Box>;
    }

    const permanentlyUnlockedCount = equipmentSets.equipmentSets.filter(set => set.unlocked).length;
    const visibleSets = equipmentSets.equipmentSets.filter(set => showOwned || !set.unlocked);

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Armor Smithy</Heading>
            <Box gap="small">
                <Box direction="row" align="center" gap="medium" wrap>
                    <TextAndLabel
                        label="Permanently unlocked sets"
                        text={`${permanentlyUnlockedCount} / ${equipmentSets.equipmentSets.length}`}
                        textSize="small"
                        labelSize="xsmall"
                    />
                    <CheckBox
                        checked={showOwned}
                        label="Show owned"
                        onChange={(event) => setShowOwned(event.target.checked)}
                    />
                </Box>
                <Grid columns={{ count: "fit", size: "260px" }} gap="small">
                    {visibleSets.map(set => {
                        const imageData = set.getImageData();
                        return (
                            <ShadowBox
                                key={set.data.name}
                                background="dark-1"
                                pad="small"
                                gap="small"
                            >
                                <Box direction="row" align="center" gap="small">
                                    {imageData && <IconImage data={imageData} scale={0.6} />}
                                    <Text size="small" weight="bold">
                                        {set.data.name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, character => character.toUpperCase())}
                                    </Text>
                                </Box>
                                <Text size="xsmall" role="description">{set.getDescription()}</Text>
                                {!set.unlocked && (
                                    <Box gap="small">
                                        <Text size="xsmall" color="accent-2">{set.getRequiredParts()} pieces required</Text>
                                        {set.requirements.map(requirement => (
                                            <Box key={requirement.kind} gap="xsmall">
                                                <Text size="xsmall" weight="bold">
                                                    {requirement.kind === 'armor'
                                                        ? `Armor: all ${requirement.requiredCount}`
                                                        : requirement.kind === 'tool'
                                                            ? `Tools: any ${requirement.requiredCount}`
                                                            : `Weapons: any ${requirement.requiredCount}`}
                                                </Text>
                                                <Box direction="row" wrap>
                                                    {requirement.items.map(member => (
                                                        <Box key={member.item.internalName} margin={{ right: 'small', bottom: 'small' }}>
                                                            <TipDisplay
                                                                heading={member.item.displayName}
                                                                body={member.available ? member.locations.map(formatLocation).join('; ') : undefined}
                                                                maxWidth="medium"
                                                            >
                                                                <Box style={{ opacity: member.available ? 1 : 0.5 }}>
                                                                    <IconImage data={member.item.getImageData()} scale={0.6} />
                                                                </Box>
                                                            </TipDisplay>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </ShadowBox>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}

export default ArmorSmithy;
