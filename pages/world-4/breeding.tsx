import {
    Box,
    Grid,
    Heading,
    ResponsiveContext,
    Stack,
    Tab,
    Tabs,
    Text,
    ThemeContext,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import TabButton from '../../components/base/TabButton';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import { StaticTime, TimeDisplaySize, TimeDown } from '../../components/base/TimeDisplay';
import { AppContext } from '../../data/appContext';
import { Breeding as BreedingDomain, Pet, petArenaBonuses, territoryNiceNames, waveReqs } from '../../data/domain/breeding';
import { Cooking } from '../../data/domain/cooking';
import { EnemyInfo } from '../../data/domain/enemies';
import { GemStore } from '../../data/domain/gemPurchases';
import { Player } from '../../data/domain/player';
import { ClassIndex, Talent } from '../../data/domain/talents';
import { TaskBoard } from '../../data/domain/tasks';
import { GroupBy, GroupByFunction, nFormatter } from '../../data/utility';

function PetDisplay() {
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const theData = appContext.data.getData();
    const breeding = theData.get("breeding") as BreedingDomain;

    return (
        <Box>
            <Text>Pets</Text>
            <Box>
                {
                    Array.from(GroupByFunction(breeding.basePets, (pet: Pet) => pet.data.world)).
                        map(([_, worldPets], wIndex) => (
                            <Box key={`world_${wIndex}`}>
                                <Text>World {wIndex + 1}</Text>
                                <Box direction="row" wrap>
                                    {
                                        worldPets.map((pet, pIndex) => {
                                            const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                                            if (!enemy) {
                                                return null;
                                            }
                                            return (
                                                <ShadowBox key={`pet_${pIndex}`} direction="row" gap="small" align="center" margin={{ right: 'small', bottom: 'small' }} background="dark-1">
                                                    {
                                                        <Box>
                                                            <Stack anchor='top-left'>
                                                                <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px' }} />
                                                                <Box title={pet.gene.data.name}>
                                                                    <IconImage data={pet.gene.getImageData()} scale={0.5} />
                                                                </Box>
                                                            </Stack>
                                                            <Text>{pet.getShinyText()}</Text>
                                                            <Text>{pet.shinyLevel}</Text>
                                                        </Box>
                                                    }
                                                </ShadowBox>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>

                        ))
                }
            </Box>
        </Box>
    )
}

function TerritoryDisplay() {
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const theData = appContext.data.getData();
    const breeding = theData.get("breeding") as BreedingDomain;

    return (
        <Box>
            <Text>Territory</Text>
            {
                breeding.territory.filter(territory => territory.index != 14).map((territory, tIndex) => (
                    <ShadowBox background="dark-1" key={tIndex} direction="row" gap="medium" margin={{ bottom: 'medium' }} align="center" pad="small" style={{opacity: territory.unlocked ? 1 : 0.4}}>
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
    const appContext = useContext(AppContext);

    const upgradeCosts = useMemo(() => {
        const cooking = appContext.data.getData().get("cooking") as Cooking;
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
    }, [breeding])

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setBreeding(theData.get("breeding"));
        }
    }, [appContext]);

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
                <ShadowBox key={index} background="dark-1" margin={{ bottom: 'medium' }} align="center" pad="small" style={{opacity: upgrade.level == 0 ? 0.5 : 1}}>
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
    const appContext = useContext(AppContext);

    const beastMasters = useMemo(() => {
        return playerData?.filter(player => (player.classId == ClassIndex.Beast_Master)) ?? [];
    }, [playerData])

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setBreeding(theData.get("breeding"));
            setPlayerData(theData.get("players"));
        }
    }, [appContext]);

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
    const [breeding, setBreeding] = useState<BreedingDomain>();
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setBreeding(theData.get("breeding"));
        }
    }, [appContext]);

    if (!breeding) {
        return (
            <Box>
                Still loading
            </Box>
        )
    }
    return (
        <Box>
            <Text>Shiny Bonuses</Text>
            <Grid columns={size =="small" ? ["1"] : ["1/3", "1/3", "1/3"]} fill>
                {
                    breeding.basePets.filter(pet => pet.data.petId != "_").map((pet, pIndex) => {
                        const enemy = EnemyInfo.find(enemy => enemy.id == pet.data.petId);
                        return (
                            <ShadowBox background="dark-1" key={pIndex} direction="row" gap="medium" margin={{ bottom: 'medium', right: 'small'}} align="center" pad="small" style={{opacity: pet.shinyLevel > 0? 1 : .5}}>
                                <IconImage data={{ location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }} style={{ paddingBottom: '15px'}} />
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
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);
    const theData = appContext.data.getData();
    const breeding = theData.get("breeding") as BreedingDomain;

    const capacity = useMemo(() => {
        const theData = appContext.data.getData();
        const gemStore = theData.get("gems") as GemStore;
        const taskBoard = theData.get("taskboard") as TaskBoard;

        if (gemStore && breeding) {
            const eggCapacityUpgrade = gemStore.purchases.find(purchase => purchase.no == 119)?.pucrhased ?? 0;
            const breedingUpgradeLevel = breeding?.upgrade.find(upgrade => upgrade.data.upgradeName == "Egg Capacity")?.level ?? 0;
            const eggMerit = taskBoard.merits.find(merit => merit.descLine1.includes("egg capacity in the Nest"));
            return 3 + eggCapacityUpgrade + breedingUpgradeLevel + (eggMerit ? eggMerit.level * eggMerit.bonusPerLevel : 0);
        }
        return 0;
    }, [breeding, appContext]);

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
            <NextSeo title="Breeding" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Breeding</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies.</Text>
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
            {/* {activeTab == "Pets" && <PetDisplay />} */}
        </Box>
    )
}

export default Breeding;