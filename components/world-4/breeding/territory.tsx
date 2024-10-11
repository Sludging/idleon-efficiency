import {
    Box,
    Grid,
    ResponsiveContext,
    Stack,
    Text,
} from 'grommet'
import { useContext } from "react";
import { Breeding as BreedingDomain, territoryNiceNames } from "../../../data/domain/breeding";
import { EnemyInfo } from "../../../data/domain/enemies";
import { nFormatter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
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
        <Box>
            <Text>Territory</Text>
            {
                breeding.territory.filter(territory => territory.index != 14).map((territory, tIndex) => (
                    <ShadowBox background="dark-1" key={tIndex} direction="row" gap="medium" margin={{ bottom: 'medium' }} align="center" pad="small" style={{ opacity: territory.unlocked ? 1 : 0.4 }}>
                        <Grid columns={["20%", "15%", "20%", "20%", "25%"]} fill>
                            <TextAndLabel textSize='small' label="Name" text={territoryNiceNames[territory.index]} />
                            {
                                territory.spiceRewards.length > 0 ? territory.spiceRewards.map((spice, sIndex) => (
                                    <ComponentAndLabel key={sIndex} label="Current Spices" component={
                                        <Box direction="row" gap="small" align="center">
                                            <IconImage data={{ location: spice.type, height: size == "small" ? 20 : 36, width: size == "small" ? 20 : 36 }} />
                                            <Text size={size == "small" ? "small" : undefined}>{nFormatter(spice.count)}</Text>
                                        </Box>
                                    } />
                                )) :
                                    <Box></Box>
                            }
                            <TextAndLabel label="Progress" text={`${nFormatter(territory.currentProgress)}/${nFormatter(territory.getTrekReq())}`} />
                            {territory.trekkingSpeedHr > 0 ?
                                <TextAndLabel label="Foraging Speed" text={`${nFormatter(territory.trekkingSpeedHr)}`} /> :
                                <TextAndLabel textColor='red' label="Combat Power" text={`${nFormatter(territory.trekkingFightPower)}/${nFormatter(territory.data.fightPower)}`} />
                            }
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
                        </Grid>
                    </ShadowBox>
                ))
            }
        </Box>
    )
}