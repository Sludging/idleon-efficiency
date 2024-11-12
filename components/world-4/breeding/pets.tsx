import {
    Box,
    CheckBox,
    Grid,
    ResponsiveContext,
    Select,
    SelectMultiple,
    Text,
} from 'grommet'
import { useState, useContext, useMemo, useEffect } from "react";
import { Breeding as BreedingDomain, Pet } from "../../../data/domain/breeding";
import { EnemyInfo } from "../../../data/domain/enemies";
import { nFormatter, toTime, uniqueFilter, round } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TabButton from "../../base/TabButton";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";
import { CircleInformation } from 'grommet-icons';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import TextAndLabel from '../../base/TextAndLabel';

export const PetsDisplay = () => {
    const [activeTab, setActiveTab] = useState<string>("All");
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEquipped, setStarSignEquipped] = useState(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const breeding = theData.get("breeding") as BreedingDomain;

    const starSignUnlocked = useMemo(() => {
        if (breeding && breeding.starSignInfinity) {
            setStarSignEquipped(true);
            return breeding.starSignUnlocked;
        }

        return false;
    }, [theData, breeding])

    const starSignInfinity = useMemo(() => {
        if (breeding) {
            if (breeding.starSignInfinity) {
                setStarSignEquipped(true);
            }
            return breeding.starSignInfinity;
        }

        return false;
    }, [theData, breeding])

    return (
        <Box margin={{top: "small"}}>
            <Box align="center" direction="row" justify="center" gap="small" margin={{bottom: "small"}}>
                {["All", "Shiny", "Breedability"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            <Box>
            {
                starSignUnlocked && (activeTab == "Shiny" || activeTab == "Breedability") &&
                <Box direction="row" gap="medium" margin={{bottom: "small"}} wrap>
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={starSignEquipped}
                            label="Breedabilli Equipped"
                            onChange={(event) => {
                                setStarSignEquipped(event.target.checked);
                                if(!event.target.checked) {
                                    setSilkrode(false);
                                }
                            }}
                            disabled={starSignInfinity}
                        />
                        <TipDisplay
                            heading="Breedabilli"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>Looks like you unlocked the Breedabilli star sign</Text>
                                    {
                                        starSignInfinity ?
                                        <Text margin={{top:'xsmall'}} size='small'>You always get the star sign bonus thanks to the Infinite Stars Rift bonus</Text>
                                        :
                                        <Text margin={{top:'xsmall'}} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                    }
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                    <Box direction='row' gap='xsmall'>
                        <CheckBox
                            checked={silkRodeChip}
                            label="Silkrode Nanochip Equipped"
                            onChange={(event) => setSilkrode(event.target.checked)}
                            disabled={!starSignEquipped}
                        />
                        <TipDisplay
                            heading="Silkrode Nanochip"
                            size='medium'
                            maxWidth='medium'
                            body={
                                <Box>
                                    <Text size='small'>You can check this checkbox to get accurate values when equipping the Silkrode Nanochip in the Lab (double star sign bonus)</Text>
                                </Box>
                            }
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                </Box>
            }
            </Box>
            {activeTab == "All" && <AllPetDisplay />}
            {activeTab == "Shiny" && <ShinyDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped} />}
            {activeTab == "Breedability" && <BreedabilityDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped} />}
        </Box>
    )
}

function AllPetDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    // Get breeding data, if it's not available yet just show placeholder loading.
    const breeding = theData.get("breeding") as BreedingDomain;

    // Will need to update this once new pets from world 5 are implemented into the game
    const worldsToDisplay: number[] = [0,1,2,3];
    // Get all the pets for each world, and sort them in the unlock order
    const petsOfWorlds: Pet[][] = useMemo(() => (
        worldsToDisplay.map(world => {
            return breeding.basePets.filter(pet => pet.data.world == world).slice().sort((pet1, pet2) => pet1.data.unlockOrder > pet2.data.unlockOrder ? 1 : -1);
        })
    ), [theData, breeding]);

    if (!breeding) {
        return (
            <Box>
                Still loading...
            </Box>
        )
    }

    return (
        petsOfWorlds.map((pets, world) => {
            return (                
                <ShadowBox key={world} style={{ opacity: breeding.speciesUnlocks[world] > 0 ? 1 : 0.5 }} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="left">
                    <Box gap="small" direction="row" pad="xsmall" align='center'>
                        <IconImage data={{ location: `Genetic${world}`, width: 37, height: 37 }}/>
                        <Text size='small'>{nFormatter(breeding.worldGenes[world])}</Text>
                    </Box>
                    <Box gap="small" direction="row" pad="xsmall" wrap>
                        {
                            pets.map((pet, index) => {
                                const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                                const nextLevelcost = pet.getGeneNextLevelCost();
                                return (
                                    <Box key={index} justify='between' direction='row' style={{ opacity: breeding.speciesUnlocks[world] > index ? 1 : 0.5 }} border={{ color: 'grey-1' }} margin={{ bottom: 'small' }} background="accent-4" width={{ max: '75px', min: '75px' }} align="center">
                                        <Box align="center" justify="start">
                                            <TipDisplay
                                                size='medium'
                                                heading={enemy?.details.Name ?? "Unknown"}
                                                body={
                                                    <Box>
                                                        <Text>Gene level : {pet.geneLevel}</Text>
                                                        <Text color={breeding.worldGenes[world] >= nextLevelcost ? 'green-1' : ''}>Next level cost : {nFormatter(nextLevelcost)}</Text>
                                                    </Box>
                                                }
                                                direction={TipDirection.Down}
                                            >
                                                <Box direction="row" pad={{ vertical: 'xsmall' }} align="center" justify="center" gap='xsmall'>
                                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }}/>
                                                </Box>
                                            </TipDisplay>
                                        </Box>
                                        <Box alignSelf='start'>
                                            <TipDisplay
                                                size='medium'
                                                maxWidth='medium'
                                                heading={pet.gene.data.name}
                                                body={pet.gene.data.description}
                                                direction={TipDirection.Down}                                
                                            >
                                                <IconImage data={{ location: `${pet.gene.getImageData().location}`, width: 20, height: 20 }}/>
                                            </TipDisplay>
                                        </Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </ShadowBox>
            )
        })
    )
}

const ShinyDisplay = ({silkRodeChip, starSignEquipped} : {silkRodeChip: boolean, starSignEquipped: boolean}) => {
    const [sort, setSort] = useState<string>('');
    const [filter, setFilter] = useState<string[]>([]);
    const [allFilterOptions, setAllFilterOptions] = useState<string[]>([]);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<string[]>([]);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const size = useContext(ResponsiveContext);

    // Get breeding data, if it's not available yet just show placeholder loading.
    const breeding = theData.get("breeding") as BreedingDomain;

    // our sort options are fixed, so just statically set them.
    const sortOptions = ["Level", "Least Time to Next Level"];

    // Filter options are a bit more complicated to seem to require client side loading, so wrapped in useEffect.
    useEffect(() => {
        // If we are still loading, do nothing.
        if (!breeding) {
            return
        }
        const filterOptions = breeding.shinyBonuses?.map(bonus => {
            return bonus.data.text.replaceAll('{', '');
        }).filter(uniqueFilter);

        // We keep two set of state, all available filter options and currently available ones.
        // The reason for the 2nd one is to allow the search to remove filters based on user typing.
        setAllFilterOptions(filterOptions);
        setCurrentFilterOptions(filterOptions);
    }, [theData, breeding]);

    const petsToShow = useMemo(() => {
        // If we are still loading, do nothing.
        if (!breeding) {
            return [];
        }
        // Start with a base list of all pets
        let pets: Pet[] = breeding.basePets.filter(pet => pet.data.petId != "_");

        // If we have any filters configured, filter them out of the base set
        if (filter.length != 0) {
            pets = pets.filter(pet => filter.includes(pet.shinyBonus.text.replaceAll('{', '')));
        }

        // Now we sort
        return pets?.sort((pet1, pet2) => {
            // Base case scenario they are just by index.
            const indexSort = pet1.index > pet2.index ? 1 : -1;

            // Least time to next level sort function
            function sortByTime(pet1: Pet, pet2: Pet) {
                // If pet is max level, move it to the end
                if (pet1.shinyLevel >= 20) {
                    if (pet2.shinyLevel >= 20) {
                        return indexSort;
                    } else {
                        return 1;
                    }
                }
                // If pet is max level, move it to the end
                if (pet2.shinyLevel >= 20) {
                    return -1;
                }
                // Else sort by time till next level.
                return (pet1.getNextShinyGoal() - pet1.shinyProgress) > (pet2.getNextShinyGoal() - pet2.shinyProgress) ? 1 : -1;
            }

            // Sort by level sort function
            function sortByLevel(pet1: Pet, pet2: Pet) {
                if (pet1.shinyLevel == pet2.shinyLevel) {
                    // If level is equal, sort by time until next level
                    return sortByTime(pet1, pet2);
                } else {
                    // if level isn't equal, just sort by level
                    return pet1.shinyLevel > pet2.shinyLevel ? -1 : 1;
                }
            }

            switch (sort) {
                case "Level":
                    return sortByLevel(pet1, pet2);
                case "Least Time to Next Level":
                    return sortByTime(pet1, pet2);
                default:
                    return indexSort;
            }
        })
    }, [breeding, sort, filter])

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (
        <Box gap="small">
            <Text>Shiny Bonuses</Text>
            <Box direction="row" gap="medium" margin={{bottom: "small"}}>
                <Select size="small"
                    placeholder="Sort by"
                    clear
                    value={sort}
                    options={sortOptions}
                    onChange={({ value: nextValue }) => { setSort(nextValue); }}
                />
                <SelectMultiple
                    size="small"
                    placeholder="Filter by"
                    searchPlaceholder="Search bonuses"
                    value={filter}
                    options={currentFilterOptions}
                    onChange={({ value: nextValue }) => { setFilter(nextValue); }}
                    onSearch={text => {
                        // The line below escapes regular expression special characters:
                        // [ \ ^ $ . | ? * + ( )
                        const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

                        // Create the regular expression with modified value which
                        // handles escaping special characters. Without escaping special
                        // characters, errors will appear in the console
                        const exp = new RegExp(escapedText, 'i');
                        setCurrentFilterOptions(allFilterOptions.filter(o => exp.test(o)));
                    }}
                    onClose={() => setCurrentFilterOptions(allFilterOptions)}
                />
            </Box>
            <TextAndLabel label='Shiny speed multiplier :' text={`${round(breeding.getShinySpeed(starSignEquipped, silkRodeChip))}x`}/>
            <Grid columns={size == "small" ? ["1"] : ["1/3", "1/3", "1/3"]} fill>
                {
                    petsToShow?.filter(pet => pet.data.petId != "_").map((pet, pIndex) => {
                        const petInFenceyard: number = breeding.fenceyardPets.filter(fenceyardPet => fenceyardPet.data.petId == pet.data.petId && fenceyardPet.gene.index == 5).length;
                        const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                        const shinySpeed = breeding.getShinySpeed(starSignEquipped, silkRodeChip);
                        const timeToNextLevel = (pet.getNextShinyGoal() - pet.shinyProgress) * 84600 / shinySpeed;

                        return (
                            petInFenceyard > 0 ?
                                <ShadowBox background="dark-1" border={{ size: '2px', style: 'solid', color: 'green' }} key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.shinyLevel > 0 ? 1 : .5 }}>
                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                    <Grid columns={["45%", "45%", "10%"]} fill align="center">
                                        <Box>
                                            <Text size="16px">Lvl: {pet.shinyLevel}</Text>
                                            <Text size="16px">{timeToNextLevel > 0 ? `Time to next level: ${toTime(timeToNextLevel)}` : `${nFormatter(Math.floor(pet.shinyProgress))}/${nFormatter(pet.getNextShinyGoal())} days`}</Text>
                                        </Box>
                                        <Text size="15px">{pet.getShinyText()}</Text>
                                        <Box align='center'>
                                            <TipDisplay
                                                
                                                size='medium'
                                                maxWidth='medium'
                                                heading={enemy?.data.details.Name ?? "Unknown"}
                                                body={
                                                    <Box>
                                                        <Text size="medium">Currently in fenceyard : {petInFenceyard}</Text>
                                                        <Text size="medium">Total contribution per day : {nFormatter(petInFenceyard * shinySpeed)}</Text>
                                                        <Text size="medium">Requirement : {nFormatter(Math.floor(pet.shinyProgress))}/{nFormatter(pet.getNextShinyGoal())} days</Text>
                                                    </Box>
                                                }
                                                direction={TipDirection.Down} 
                                            >
                                                <CircleInformation size="small" />
                                            </TipDisplay>
                                        </Box>                                        
                                    </Grid>
                                </ShadowBox>
                                :
                                <ShadowBox background="dark-1" key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.shinyLevel > 0 ? 1 : .5 }}>
                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                    <Grid columns={["50%", "50%"]} fill align="center">
                                        <Box>
                                            <Text size="16px">Lvl: {pet.shinyLevel}</Text>
                                            <Text size="16px">{nFormatter(Math.floor(pet.shinyProgress))}/{nFormatter(pet.getNextShinyGoal())} days</Text>
                                        </Box>
                                        <Text size="16px">{pet.getShinyText()}</Text>
                                    </Grid>
                                </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

const BreedabilityDisplay = ({silkRodeChip, starSignEquipped} : {silkRodeChip: boolean, starSignEquipped: boolean}) => {
    const [sort, setSort] = useState<string>('');
    const size = useContext(ResponsiveContext);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    // Get breeding data, if it's not available yet just show placeholder loading.
    const breeding = theData.get("breeding") as BreedingDomain;

    // our sort options are fixed, so just statically set them.
    const sortOptions = ["Level", "Least Time to Next Level"];

    const petsToShow = useMemo(() => {
        // If we are still loading, do nothing.
        if (!breeding) {
            return [];
        }
        // Start with a base list of all pets
        let pets: Pet[] = breeding.basePets.filter(pet => pet.data.petId != "_");

        // Now we sort
        return pets?.sort((pet1, pet2) => {
            // Base case scenario they are just by index.
            const indexSort = pet1.index > pet2.index ? 1 : -1;

            // Least time to next level sort function
            function sortByTime(pet1: Pet, pet2: Pet) {
                // If pet is max level, move it to the end
                if (pet1.breedingLevel >= 10) {
                    if (pet2.breedingLevel >= 10) {
                        return indexSort;
                    } else {
                        return 1;
                    }
                }
                // If pet is max level, move it to the end
                if (pet2.breedingLevel >= 10) {
                    return -1;
                }
                // Else sort by time till next level.
                return (pet1.getNextBreedingGoal() - pet1.breedingProgress) > (pet2.getNextBreedingGoal() - pet2.breedingProgress) ? 1 : -1;
            }

            // Sort by level sort function
            function sortByLevel(pet1: Pet, pet2: Pet) {
                if (pet1.breedingLevel == pet2.breedingLevel) {
                    // If level is equal, sort by time until next level
                    return sortByTime(pet1, pet2);
                } else {
                    // if level isn't equal, just sort by level
                    return pet1.breedingLevel > pet2.breedingLevel ? -1 : 1;
                }
            }

            switch (sort) {
                case "Level":
                    return sortByLevel(pet1, pet2);
                case "Least Time to Next Level":
                    return sortByTime(pet1, pet2);
                default:
                    return indexSort;
            }
        })
    }, [breeding, sort])

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (
        <Box gap="small">
            <Text>Breedability</Text>
            <Box direction="row" gap="medium" margin={{bottom: "small"}}>
                <Select size="small"
                    placeholder="Sort by"
                    clear
                    value={sort}
                    options={sortOptions}
                    onChange={({ value: nextValue }) => { setSort(nextValue); }}
                />
            </Box>
            <TextAndLabel label='Breedability speed multiplier :' text={`${round(breeding.getBreedingSpeed(starSignEquipped, silkRodeChip))}x`}/>
            <Grid columns={size == "small" ? ["1"] : ["1/3", "1/3", "1/3"]} fill>
                {
                    petsToShow?.filter(pet => pet.data.petId != "_").map((pet, pIndex) => {
                        const petInFenceyard: number = breeding.fenceyardPets.filter(fenceyardPet => fenceyardPet.data.petId == pet.data.petId && fenceyardPet.gene.index == 4).length;
                        const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                        const breedingSpeed = breeding.getBreedingSpeed(starSignEquipped, silkRodeChip);
                        const timeToNextLevel = (pet.getNextBreedingGoal() - pet.breedingProgress) * 84600 / breedingSpeed;

                        return (
                            petInFenceyard > 0 ?
                                <ShadowBox background="dark-1" key={pIndex} border={{ size: '2px', style: 'solid', color: 'green' }} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.getBreedabilityBonus() >= 1.01 ? 1 : .5 }}>
                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                    <Grid columns={["45%", "45%", "10%"]} fill align="center">
                                        <Box>
                                            <Text size="16px">Lvl: {pet.breedingLevel}</Text>
                                            <Text size="16px">{timeToNextLevel > 0 ? `Time to next level: ${toTime(timeToNextLevel)}` : `${nFormatter(Math.floor(pet.breedingProgress))}/${nFormatter(pet.getNextBreedingGoal())} days`}</Text>
                                        </Box>
                                        <Text size="16px">{nFormatter(pet.getBreedabilityBonus())}x</Text>
                                        <Box align='center'>
                                            <TipDisplay
                                                size='medium'
                                                maxWidth='medium'
                                                heading={enemy?.data.details.Name ?? "Unknown"}
                                                body={
                                                    <Box>
                                                        <Text size="medium">Currently in fenceyard : {petInFenceyard}</Text>
                                                        <Text size="medium">Total contribution per day : {nFormatter(petInFenceyard * breedingSpeed)}</Text>
                                                        <Text size="medium">Requirement : {nFormatter(Math.floor(pet.breedingProgress))}/{nFormatter(pet.getNextBreedingGoal())} days</Text>
                                                    </Box>
                                                }
                                                direction={TipDirection.Down}
                                            >
                                                <CircleInformation size="small" />
                                            </TipDisplay>
                                        </Box>
                                    </Grid>
                                </ShadowBox>
                                :
                                <ShadowBox background="dark-1" key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.getBreedabilityBonus() >= 1.01 ? 1 : .5 }}>
                                    <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                    <Grid columns={["50%", "50%"]} fill align="center">
                                        <Box>
                                            <Text size="16px">Lvl: {pet.breedingLevel}</Text>
                                            <Text size="16px">{nFormatter(pet.breedingProgress)}/{nFormatter(pet.getNextBreedingGoal())} days</Text>
                                        </Box>
                                        <Text size="16px">{nFormatter(pet.getBreedabilityBonus())}x</Text>
                                    </Grid>
                                </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}