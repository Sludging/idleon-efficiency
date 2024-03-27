import {
    Box,
    Grid,
    ResponsiveContext,
    Select,
    SelectMultiple,
    Text,
} from 'grommet'
import { BorderType } from "grommet/utils";
import { useState, useContext, useMemo, useEffect } from "react";
import { AppContext } from "../../../data/appContext";
import { Breeding as BreedingDomain, Pet } from "../../../data/domain/breeding";
import { EnemyInfo } from "../../../data/domain/enemies";
import { nFormatter, uniqueFilter } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TabButton from "../../base/TabButton";
import TipDisplay, { TipDirection } from "../../base/TipDisplay";

export const PetsDisplay = () => {
    const [activeTab, setActiveTab] = useState<string>("All");

    return (
        <Box margin={{top: "small"}}>
            <Box align="center" direction="row" justify="center" gap="small" margin={{bottom: "small"}}>
                {["All", "Shiny", "Breedability"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "All" && <PetDisplay />}
            {activeTab == "Shiny" && <ShinyDisplay />}
            {activeTab == "Breedability" && <BreedabilityDisplay />}
        </Box>
    )
}

function PetDisplay() {
    const appContext = useContext(AppContext);

    const breeding = useMemo(() => {
        return appContext.data.getData().get("breeding") as BreedingDomain;
    }, [appContext])

    if (!breeding) {
        return (
            <Box>
                Still loading...
            </Box>
        )
    }

    // Will need to update this once new pets from world 5 are implemented into the game
    const worldsToDisplay = [0,1,2,3];

    return (
        worldsToDisplay.map(world => {
            // Get all the pets for this world, and sort them in the unlock order
            const petsOfWorld = breeding.basePets.filter(pet => pet.data.world == world).slice().sort((pet1, pet2) => pet1.data.unlockOrder > pet2.data.unlockOrder ? 1 : -1);
            return (                
                <ShadowBox key={world} style={{ opacity: breeding.speciesUnlocks[world] > 0 ? 1 : 0.5 }} margin={{ bottom: 'small' }} background="dark-1" gap="xsmall" pad="small" align="left">
                    <Box gap="small" direction="row" pad="xsmall" align='center'>
                        <IconImage data={{ location: `Genetic${world}`, width: 37, height: 37 }}/>
                        <Text size='small'>{nFormatter(breeding.worldGenes[world])}</Text>
                    </Box>
                    <Box gap="small" direction="row" pad="xsmall" wrap>
                        {
                            petsOfWorld.map((pet, index) => {
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

function ShinyDisplay() {
    const [sort, setSort] = useState<string>('');
    const [filter, setFilter] = useState<string[]>([]);
    const [allFilterOptions, setAllFilterOptions] = useState<string[]>([]);
    const [currentFilterOptions, setCurrentFilterOptions] = useState<string[]>([]);
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    // Get breeding data, if it's not available yet just show placeholder loading.
    const breeding = useMemo(() => {
        return appContext.data.getData().get("breeding") as BreedingDomain;
    }, [appContext])

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
    }, [appContext, breeding]);

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
            <Grid columns={size == "small" ? ["1"] : ["1/3", "1/3", "1/3"]} fill>
                {
                    petsToShow?.filter(pet => pet.data.petId != "_").map((pet, pIndex) => {
                        const petInFenceyard: boolean = breeding.fenceyardPets.some(fenceyardPet => fenceyardPet.data.petId == pet.data.petId && fenceyardPet.gene.index == 5);
                        const currentlyLevelingShinyBorderProp: BorderType = petInFenceyard && { size: '2px', style: 'solid', color: 'green' };
                        const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);

                        return (
                            <ShadowBox background="dark-1" border={currentlyLevelingShinyBorderProp} key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.shinyLevel > 0 ? 1 : .5 }}>
                                <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                <Grid columns={["50%", "50%"]} fill align="center">
                                    <Box>
                                        <Text size="16px">Lvl: {pet.shinyLevel}</Text>
                                        <Text size="16px">{Math.floor(pet.shinyProgress)}/{pet.getNextShinyGoal()} days</Text>
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

function BreedabilityDisplay() {
    const [sort, setSort] = useState<string>('');
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    // Get breeding data, if it's not available yet just show placeholder loading.
    const breeding = useMemo(() => {
        return appContext.data.getData().get("breeding") as BreedingDomain;
    }, [appContext])

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
                if (pet1.breedingLevel >= 9) {
                    if (pet2.breedingLevel >= 9) {
                        return indexSort;
                    } else {
                        return 1;
                    }
                }
                // If pet is max level, move it to the end
                if (pet2.breedingLevel >= 9) {
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
            <Grid columns={size == "small" ? ["1"] : ["1/3", "1/3", "1/3"]} fill>
                {
                    petsToShow?.filter(pet => pet.data.petId != "_").map((pet, pIndex) => {
                        const petInFenceyard: boolean = breeding.fenceyardPets.some(fenceyardPet => fenceyardPet.data.petId == pet.data.petId && fenceyardPet.gene.index == 4);
                        const currentlyLevelingBreedingBorderProp: BorderType = petInFenceyard && { size: '2px', style: 'solid', color: 'green' };
                        const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);

                        return (
                            <ShadowBox background="dark-1" border={currentlyLevelingBreedingBorderProp} key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small' }} align="center" pad="small" style={{ opacity: pet.getBreedabilityBonus() >= 1.01 ? 1 : .5 }}>
                                <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                <Grid columns={["50%", "50%"]} fill align="center">
                                    <Box>
                                        <Text size="16px">Lvl: {pet.breedingLevel}</Text>
                                        <Text size="16px">{nFormatter(pet.breedingProgress)}/{nFormatter(pet.getNextBreedingGoal())}</Text>
                                    </Box>
                                    <Text size="16px">x{nFormatter(pet.getBreedabilityBonus())}</Text>
                                </Grid>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}