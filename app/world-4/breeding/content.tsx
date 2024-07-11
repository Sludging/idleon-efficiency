"use client"

import {
    Box,
    Grid,
    Heading,
    ResponsiveContext,
    Select,
    SelectMultiple,
    Stack,
    Text,
} from 'grommet'
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import TabButton from '../../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { StaticTime, TimeDisplaySize, TimeDown } from '../../../components/base/TimeDisplay';
import { Breeding as BreedingDomain, Pet, petArenaBonuses, territoryNiceNames, waveReqs } from '../../../data/domain/breeding';
import { Cooking } from '../../../data/domain/cooking';
import { EnemyInfo } from '../../../data/domain/enemies';
import { Player } from '../../../data/domain/player';
import { ClassIndex, Talent } from '../../../data/domain/talents';
import { nFormatter, uniqueFilter } from '../../../data/utility';
import { BorderType } from 'grommet/utils';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function TerritoryDisplay() {
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

function PetUpgradeDisplay() {
    const [breeding, setBreeding] = useState<BreedingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const upgradeCosts = useMemo(() => {
        const cooking = theData.get("cooking") as Cooking;
        if (cooking && breeding) {
            return breeding.upgrade.map(upgrade => {
                const meal = upgrade.data.cost != -1 ? cooking.meals[upgrade.data.cost] : undefined
                const mealCost = meal ? upgrade.getCost(1) : -1;
                return [{
                    image: {
                        location: "PetDeadCell",
                        width: 33,
                        height: 33
                    },
                    name: "Pet Dead Cell",
                    cost: upgrade.getCost(0),
                    canAfford: breeding.deadCells >= upgrade.getCost(0)
                },
                {
                    image: meal?.getImageData(),
                    name: meal?.name,
                    cost: mealCost,
                    canAfford: (meal?.count ?? 0) > mealCost
                }
                ]
            });
        }
        return [];
    }, [theData, breeding])

    useEffect(() => {
        setBreeding(theData.get("breeding"));
    }, [theData]);

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    return (<Box>
        <Text>Upgrades</Text>
        {
            breeding.upgrade.filter(upgrade => upgrade.data.upgradeName != "Filler").map((upgrade, index) => (
                <ShadowBox key={index} background="dark-1" margin={{ bottom: 'medium' }} align="center" pad="small" style={{ opacity: upgrade.level == 0 ? 0.5 : 1 }}>
                    <Grid columns={{ size: 'auto', count: 5 }} fill>
                        <IconImage data={upgrade.getImageData()} scale={0.7} />
                        <TextAndLabel textSize='xsmall' label="Name" text={upgrade.data.upgradeName} />
                        <TextAndLabel textSize='xsmall' label="Bonus" text={upgrade.getBonusText()} />
                        <TextAndLabel textSize='xsmall' label="Level" text={`${upgrade.level}/${upgrade.data.maxLevel}`} />
                        <Box direction="row" gap="small">
                            {
                                upgradeCosts[index].map((cost, index) => (
                                    <Box key={`upg_${index}`} align="center" gap="xsmall">
                                        {
                                            cost.image &&
                                            <IconImage data={cost.image} />
                                        }
                                        {
                                            cost.cost > 0 && <Text color={cost.canAfford ? 'green-1' : ''} size="small">{nFormatter(cost.cost)}</Text>
                                        }
                                    </Box>
                                ))
                            }
                        </Box>
                    </Grid>
                </ShadowBox>
            ))
        }
    </Box>)
}

function ArenaBonusDisplay() {
    const [breeding, setBreeding] = useState<BreedingDomain>();
    const [playerData, setPlayerData] = useState<Player[]>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const beastMasters = useMemo(() => {
        return playerData?.filter(player => (player.classId == ClassIndex.Beast_Master)) ?? [];
    }, [playerData])

    useEffect(() => {
        setBreeding(theData.get("breeding"));
        setPlayerData(theData.get("players"));
    }, [theData]);

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }
    return (
        <Box gap="small">
            <Box direction="row" wrap justify="center" margin={{ top: 'small' }}>
                {beastMasters && beastMasters.map((bm, index) => {
                    const [arenaTalent, cooldown] = [...bm.cooldown.entries()].filter(([talent, cooldown]) => talent.skillIndex == 370)?.pop() as [Talent, number];
                    const realCD = cooldown - bm.afkFor;
                    return (
                        <ShadowBox key={index} background="dark-1" pad="medium" align="center" margin={{ right: 'large', bottom: 'small' }}>
                            <Box gap="small">
                                <Box direction="row" gap="small">
                                    <IconImage data={bm.getClassImageData()} />
                                    <Text>{bm.playerName}</Text>
                                </Box>
                                <Box direction="row" gap="small">
                                    <Box style={{ opacity: realCD <= 0 ? 1 : 0.5 }}>
                                        <IconImage data={arenaTalent.getImageData()} scale={0.8} />
                                    </Box>
                                    {realCD > 0 && <TimeDown size={TimeDisplaySize.Small} addSeconds={realCD} resetToSeconds={72000} />}
                                    {realCD <= 0 && <Text>Skill is ready!</Text>}
                                </Box>
                            </Box>
                        </ShadowBox>
                    )
                })
                }
            </Box>
            <TextAndLabel
                label="Max Arena Wave"
                text={breeding.arenaWave.toString() ?? "Unknown"}
            />
            <Grid columns="1/4" fill>
                {
                    petArenaBonuses.map((bonus, index) => (
                        <ShadowBox style={{ opacity: breeding.hasBonus(index) ? 1 : 0.5 }} background="dark-1" pad="small" key={index} margin={{ right: 'small', bottom: 'small' }}>
                            <TextAndLabel
                                center
                                label={`Wave ${waveReqs[index].toString()}`}
                                labelSize='medium'
                                textSize='xsmall'
                                text={bonus.desc}
                            />
                        </ShadowBox>
                    ))
                }
            </Grid>
        </Box>
    )
}

function ShinyDisplay() {
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
                if (pet1.calculateShinyLevel() >= 20) {
                    return -1;
                }
                // If pet is max level, move it to the end
                if (pet2.calculateShinyLevel() >= 20) {
                    return -1;
                }
                // Else sort by time till next level.
                return (pet1.getNextShinyGoal() - pet1.shinyProgress) > (pet2.getNextShinyGoal() - pet2.shinyProgress) ? 1 : -1;
            }

            // Sort by level sort function
            function sortByLevel(pet1: Pet, pet2: Pet) {
                if (pet1.calculateShinyLevel() == pet2.calculateShinyLevel()) {
                    // If level is equal, sort by time until next level
                    return sortByTime(pet1, pet2);
                } else {
                    // if level isn't equal, just sort by level
                    return pet1.calculateShinyLevel() > pet2.calculateShinyLevel() ? -1 : 1;
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
            <Box direction="row" gap="medium">
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


function EggDisplay() {
    const size = useContext(ResponsiveContext);

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));    
    const breeding = theData.get("breeding") as BreedingDomain;

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }

    if (breeding.territory.filter(territory => territory.unlocked).length == 0) {
        return null;
    }

    return (
        <Box gap="small">
            <Text size="xsmall">* New eggs will only show up after the cloud save updates.</Text>
            <Box direction="row" gap="medium" wrap>
                <Box direction="row" align="center" wrap>
                    {
                        [...Array(breeding.eggCapacity)].map((_, index) => {
                            if (breeding.eggs.length < index) {
                                return;
                            }
                            return (
                                <Box key={`egg_${index}`} border={{ color: 'grey-1', side: 'all', size: '2px' }} align="center">
                                    {
                                        breeding.eggs[index]?.rarity ?? 0 > 0 ?
                                            <Box key={index}>
                                                <IconImage scale={size == "small" ? 0.5 : 1} data={breeding.eggs[index].getImageData()} />
                                            </Box>
                                            :
                                            <Box height="43px" width="38px" />
                                    }
                                </Box>
                            )
                        })
                    }
                </Box>
                <ComponentAndLabel label="Next Egg In" component={<TimeDown addSeconds={breeding.totalEggTime - breeding.timeTillEgg} />} />
                <ComponentAndLabel label="Time per egg" component={<StaticTime fromSeconds={breeding.totalEggTime} />} />
                {
                    breeding.getStatRange().map((stat, index) => (
                        <TextAndLabel label={index == 0 ? "Min Stat" : "Max Stat"} text={nFormatter(stat)} key={index} />
                    ))
                }

                <ComponentAndLabel label="Dead Cells" component={
                    <Box direction="row" gap="small" align="center">
                        <Text>{nFormatter(breeding.deadCells)}</Text>
                        <IconImage data={{ location: 'PetDeadCell', height: 25, width: 25 }} />
                    </Box>
                } />

            </Box>
        </Box>
    )
}

function Breeding() {
    const [activeTab, setActiveTab] = useState<string>("Territory");
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Breeding</Heading>
            <Box pad="small">
                <EggDisplay />
            </Box>
            <Box align="center" direction="row" justify="center" gap="small">
                {["Territory", "Upgrades", "Arena", "Shiny"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            {activeTab == "Arena" && <ArenaBonusDisplay />}
            {activeTab == "Upgrades" && <PetUpgradeDisplay />}
            {activeTab == "Territory" && <TerritoryDisplay />}
            {activeTab == "Shiny" && <ShinyDisplay />}
        </Box>
    )
}

export default Breeding;