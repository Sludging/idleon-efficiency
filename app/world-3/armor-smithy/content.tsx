"use client"

import { Box, CheckBox, Grid, Heading, Text } from 'grommet';
import { useEffect, useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TextAndLabel from '../../../components/base/TextAndLabel';
import { EquipmentSets as EquipmentSetsDomain } from '../../../data/domain/misc/equipmentSets';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { DataStatus } from '../../../lib/stores/appDataStore';
import { useShallow } from 'zustand/react/shallow';

function ArmorSmithy() {
    const [hydrated, setHydrated] = useState(false);
    const [showOwned, setShowOwned] = useState(true);
    const { equipmentSets, dataStatus } = useAppDataStore(useShallow(
        (state) => ({
            equipmentSets: state.data.getData().get("equipmentSets") as EquipmentSetsDomain | undefined,
            lastUpdated: state.lastUpdated,
            dataStatus: state.dataStatus,
        })
    ));

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !equipmentSets) {
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
                    {visibleSets.map(set => (
                        <ShadowBox
                            key={set.data.name}
                            background="dark-1"
                            pad="small"
                            gap="small"
                            style={{ opacity: set.unlocked ? 1 : 0.5 }}
                        >
                            <Box direction="row" align="center" gap="small">
                                <IconImage data={set.getImageData()} scale={0.6} />
                                <Text size="small" weight="bold">
                                    {set.data.name.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, character => character.toUpperCase())}
                                </Text>
                            </Box>
                            <Text size="xsmall" role="description">{set.getDescription()}</Text>
                        </ShadowBox>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default ArmorSmithy;
