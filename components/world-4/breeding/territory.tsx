import {
    Box,
    ResponsiveContext,
    Stack,
    Text,
} from 'grommet'
import { useContext } from "react";
import { Breeding as BreedingDomain, territoryNiceNames } from "../../../data/domain/world-4/breeding";
import { EnemyInfo } from "../../../data/domain/enemies";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import DataRow from "../../base/DataRow";
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

export const TerritoryDisplay = () => {
    const size = useContext(ResponsiveContext);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const breeding = theData.get("breeding") as BreedingDomain;

    if (!breeding) {
        return <Box>
            Still loading
        </Box>
    }

    return (
        <Box gap="small">
            <Text>Territory</Text>
            {
                breeding.territory.filter(territory => territory.index != 14).map((territory, tIndex) => (
                    <DataRow
                        key={tIndex}
                        columns={['20fr', '15fr', '20fr', '20fr', '25fr']}
                        opacity={territory.unlocked ? 1 : 0.4}
                        fields={[
                            { key: 'identity', kind: 'identity', name: territoryNiceNames[territory.index] },
                            {
                                key: 'spices',
                                kind: 'content',
                                label: territory.spiceRewards.length > 0 ? 'Current Spices' : null,
                                content: (
                                    <Box gap="small">
                                        {
                                            territory.spiceRewards.map((spice, sIndex) => (
                                                <Box key={sIndex} direction="row" gap="small" align="center">
                                                    <IconImage data={{ location: spice.type, height: size == "small" ? 20 : 36, width: size == "small" ? 20 : 36 }} />
                                                    <Text size="small">{nFormatter(spice.count)}</Text>
                                                </Box>
                                            ))
                                        }
                                    </Box>
                                )
                            },
                            {
                                key: 'progress',
                                kind: 'text',
                                label: 'Progress',
                                value: `${nFormatter(territory.currentProgress)}/${nFormatter(territory.getTrekReq())}`
                            },
                            territory.trekkingSpeedHr > 0 ?
                                { key: 'speed', kind: 'text', label: 'Foraging Speed', value: `${nFormatter(territory.trekkingSpeedHr)}` } :
                                { key: 'power', kind: 'text', label: 'Combat Power', value: `${nFormatter(territory.trekkingFightPower)}/${nFormatter(territory.data.fightPower)}`, color: 'red' },
                            {
                                key: 'pets',
                                kind: 'content',
                                label: null,
                                content: (
                                    <Box direction="row" wrap>
                                        {
                                            territory.pets.map((pet, pIndex) => {
                                                const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                                                return (
                                                    <Box key={`pet_${pIndex}`} direction="row" gap="small" align="center">
                                                        {
                                                            enemy ?
                                                                <Stack anchor='bottom'>
                                                                    <IconImage data={pet.getBackgroundImageData()} />
                                                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                                                    <Text size="8px">{nFormatter(pet.power)}</Text>
                                                                </Stack>
                                                                :
                                                                <IconImage data={{ location: "PetBackcard4", width: 67, height: 67 }} />
                                                        }
                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                )
                            }
                        ]}
                    />
                ))
            }
        </Box>
    )
}