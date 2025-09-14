"use client"

import {
    Box,
    CheckBox,
    Grid,
    Heading,
    ResponsiveContext,
    Select,
    Text,
} from 'grommet'
import { useContext, useMemo, useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import { TimeDown } from '../../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import CoinsDisplay from '../../../components/coinsDisplay';
import { territoryNiceNames } from '../../../data/domain/breeding';
import { Cooking as CookingDomain, Kitchen, KitchenStatus, Meal, UpgradeType } from '../../../data/domain/cooking';
import { getCoinsArray, nFormatter, notateNumber, toTime } from '../../../data/utility';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { AtomCollider } from '../../../data/domain/atomCollider';
import { Ascending, CircleInformation } from 'grommet-icons';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function KitchenUpgrade({ title, level, spiceIndex, cost, costColor }: { title: string, level: number, spiceIndex: number, cost: number, costColor: string }) {
    return (
        <Box gap='xsmall'>
            <Box background="#2F3743" pad="xsmall" align="center">
                <Text size="xsmall">{title} {level}</Text>
            </Box>
            <Box direction="row" justify="between">
                <IconImage data={{
                    location: `CookingSpice${spiceIndex}`,
                    width: 36,
                    height: 36
                }} scale={0.6} />
                <Text color={costColor} >{nFormatter(cost, "Big")}</Text>
            </Box>
        </Box>
    )
}

function KitchenDisplay({ kitchen, cooking, silkRodeChip, starSignEquipped }: { kitchen: Kitchen, cooking: CookingDomain, silkRodeChip: boolean, starSignEquipped: boolean }) {
    const spiceValues = cooking.spicesToValues(kitchen.activeRecipe);
    const possibleMeals = cooking.getMealsFromSpiceValues(spiceValues);
    const timeToFinish = ((cooking.getRecipeTime(possibleMeals) - kitchen.progress) / kitchen.fireSpeed) * 3600;

    return (
        <ShadowBox background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="small" gap="small" fill>
            <Box align="center">
                <Text>Kitchen stats</Text>
            </Box>
            <Box>
                <Grid columns={["60%", "40%"]} gap="small">
                    <Text size="small" color="grey-2">Cooking Speed:</Text>
                    <Text size="small">{`${nFormatter(kitchen.getUpdatedMealSpeed(starSignEquipped, silkRodeChip), "Smaller")}/hr`}</Text>
                    <Text size="small" color="grey-2">Recipe Fire Speed:</Text>
                    <Text size="small">{`${nFormatter(kitchen.fireSpeed, "Smaller")}/hr`}</Text>
                    <Text size="small" color="grey-2">New Recipe Luck:</Text>
                    <Text size="small">{`${kitchen.recipeLuck.toPrecision(3)}x`}</Text>
                </Grid>
            </Box>
            <Grid columns="1/3" gap="small">
                <KitchenUpgrade title='SPEED' level={kitchen.mealLevels}
                    spiceIndex={kitchen.getSpiceForUpgrade(UpgradeType.Speed)} cost={kitchen.speedUpgradeCost}
                    costColor={kitchen.speedUpgradeCost < cooking.spices[kitchen.getSpiceForUpgrade(UpgradeType.Speed)] ? 'green-1' : 'accent-1'} />
                <KitchenUpgrade title='FIRE' level={kitchen.recipeLevels}
                    spiceIndex={kitchen.getSpiceForUpgrade(UpgradeType.Fire)} cost={kitchen.fireUpgradeCost}
                    costColor={kitchen.fireUpgradeCost < cooking.spices[kitchen.getSpiceForUpgrade(UpgradeType.Fire)] ? 'green-1' : 'accent-1'} />
                <KitchenUpgrade title='LUCK' level={kitchen.luckLevels}
                    spiceIndex={kitchen.getSpiceForUpgrade(UpgradeType.Luck)} cost={kitchen.luckUpgradecost}
                    costColor={kitchen.luckUpgradecost < cooking.spices[kitchen.getSpiceForUpgrade(UpgradeType.Luck)] ? 'green-1' : 'accent-1'} />
            </Grid>
            <Box background="#2F3743" pad="xsmall" align="center">
                <Text size="xsmall">Current Action</Text>
            </Box>
            <Box align='center'>
                {
                    kitchen.status == KitchenStatus.Meal &&
                    <Box direction="row" gap="small" align="end">
                        <Box>
                            <IconImage data={cooking.meals[kitchen.activeMeal].getImageData()} />
                        </Box>
                        <Text size="small">{nFormatter(kitchen.getUpdatedMealSpeed(starSignEquipped, silkRodeChip) / cooking.meals[kitchen.activeMeal].cookReq, "Smaller")} per hour.</Text>
                    </Box>
                }
                {
                    kitchen.status == KitchenStatus.Recipe &&
                    <Box gap="medium">
                        <Box gap="small" align="center">
                            {
                                <Box direction="row">
                                    {
                                        kitchen.activeRecipe.map((spice, index) => (
                                            <Box key={`spice_${index}`}>
                                                <IconImage data={{
                                                    location: `CookingSpice${spice}`,
                                                    width: 36,
                                                    height: 36
                                                }} />
                                            </Box>
                                        ))
                                    }
                                </Box>
                            }
                            {
                                <Box direction="row">
                                    {
                                        possibleMeals.map((meal, index) => (
                                            <Box title={cooking.meals[meal].name} style={{ opacity: cooking.meals[meal]?.level > 0 ? 1 : 0.5 }} key={`meal_${index}`}>
                                                <IconImage data={cooking.meals[meal]?.getImageData()} />
                                            </Box>
                                        ))
                                    }
                                </Box>
                            }
                        </Box>
                        <Box justify="between" gap="small" direction="row" align="center">
                            <Text size="small">Progress: {nFormatter(kitchen.progress)} / {nFormatter(cooking.getRecipeTime(possibleMeals))}</Text>
                            <TimeDown addSeconds={timeToFinish} />
                        </Box>
                    </Box>
                }
            </Box>

        </ShadowBox>
    )
}

function KitchensDisplay({ silkRodeChip, starSignEquipped }: { silkRodeChip: boolean, starSignEquipped: boolean }) {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));    
    const cooking = theData.get("cooking") as CookingDomain;

    return (
        <Box margin={{ bottom: 'medium' }} gap="small">
            <Text>Kitchens</Text>
            {cooking &&
                <Box direction="row" gap="small">
                    <Text>Next Kitchen:</Text>
                    <CoinsDisplay coinMap={getCoinsArray(cooking?.getNextKitchenCost() ?? 0)} maxCoins={3} />
                </Box>
            }
            <Grid columns="1/3" gap="small">
                {
                    cooking?.kitchens.filter(kitchen => kitchen.status != KitchenStatus.Locked).map((kitchen, index) => {
                        return (
                            <KitchenDisplay key={index} kitchen={kitchen} silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped} cooking={cooking} />
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function Cooking() {
    const [sort, setSort] = useState<string>('');
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEquipped, setStarSignEquipped] = useState(false);
    const size = useContext(ResponsiveContext);

    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const cooking = theData.get("cooking") as CookingDomain;

    const hasColliderBonus = useMemo(() => {
        const collider = theData.get("collider") as AtomCollider;
        return collider.atoms[8].level > 0;
    }, [lastUpdated]);

    // equinox discount
    const mealCostAfterFoodLust = useMemo(() => {
        if (cooking) {
            return cooking.meals[0].foodLustDiscount;
        }

        return 1;
    }, [lastUpdated])

    // meal max level
    const mealMaxlevel = useMemo(() => {
        if (cooking) {
            return cooking.meals[0].maxLevel;
        }

        return 1;
    }, [lastUpdated])

    const starSignUnlocked = useMemo(() => {
        if (cooking) {
            if (cooking.starSignInfinity) {
                setStarSignEquipped(true);
            }
            return cooking.starSignUnlocked;
        }

        return false;
    }, [lastUpdated, cooking])

    const starSignInfinity = useMemo(() => {
        if (cooking) {
            if (cooking.starSignInfinity) {
                setStarSignEquipped(true);
            }
            return cooking.starSignInfinity;
        }

        return false;
    }, [lastUpdated, cooking])

    const sortByIndex = (meal1: Meal, meal2: Meal) => {
        if (meal1.level == 0 && meal2.level > 0) {
            return -1
        }
        if (meal2.level == 0 && meal1.level > 0) {
            return 1
        }

        return meal1.mealIndex - meal2.mealIndex
    }

    const mealsToShow = useMemo(() => {
        return cooking.meals.filter(meal => meal.timeOptimalSpices.length > 0)
            .sort((meal1, meal2) => {
                const indexSort = sortByIndex(meal1, meal2);

                //undiscovered meals get pushed to bottom
                if (meal1.level == 0) return meal2.level == 0 ? indexSort : 1;

                function sortByTimeAndIndex(timeA: number, timeB: number) {
                    //negative times get switched to index sorting
                    if (timeA > 0 && timeB > 0) return timeA > timeB ? 1 : indexSort //neither reached
                    else if (timeA < 0 && timeB < 0) return indexSort //both reached
                    else return timeA > timeB ? -1 : 1 //one reached, one not
                }

                function moveMaxedToEnd(meal1: Meal, meal2: Meal) {
                    if (meal1.level == meal1.maxLevel) {
                        if (meal2.level == meal2.maxLevel) {
                            return indexSort;
                        } else {
                            return 1;
                        }
                    }
                    if (meal2.level == meal2.maxLevel) {
                        return -1;
                    }
                    return meal1.getTimeTill(meal1.getMealLevelCost(), starSignEquipped, silkRodeChip, false) > meal2.getTimeTill(meal2.getMealLevelCost(), starSignEquipped, silkRodeChip, false) ? 1 : -1;
                }

                switch (sort) {
                    case "Level":
                        return meal1.level > meal2.level ? -1 : 1;
                    case "Least Time to Cook Next":
                        return moveMaxedToEnd(meal1, meal2);
                    case "Least Time to Diamond":
                        return sortByTimeAndIndex(meal1.getTimeTill(meal1.getCostsTillDiamond(), starSignEquipped, silkRodeChip, false), meal2.getTimeTill(meal2.getCostsTillDiamond(), starSignEquipped, silkRodeChip, false));
                    case "Least Time to Purple":
                        return sortByTimeAndIndex(meal1.getTimeTill(meal1.getCostsTillPurple(), starSignEquipped, silkRodeChip, false), meal2.getTimeTill(meal2.getCostsTillPurple(), starSignEquipped, silkRodeChip, false));
                    case "Least Time to Void":
                        return sortByTimeAndIndex(meal1.getTimeTill(meal1.getCostsTillVoid(), starSignEquipped, silkRodeChip, false), meal2.getTimeTill(meal2.getCostsTillVoid(), starSignEquipped, silkRodeChip, false));
                    case "Least Time to 30":
                        return sortByTimeAndIndex(meal1.getTimeTill(meal1.getCostsTillThirty(), starSignEquipped, silkRodeChip, false), meal2.getTimeTill(meal2.getCostsTillThirty(), starSignEquipped, silkRodeChip, false));
                    case "Least Time to Max":
                        return sortByTimeAndIndex(meal1.getTimeTill(meal1.getCostsTillMaxLevel(), starSignEquipped, silkRodeChip, false), meal2.getTimeTill(meal2.getCostsTillMaxLevel(), starSignEquipped, silkRodeChip, false));
                    default:
                        return indexSort;
                }
            })
    }, [lastUpdated, cooking, sort])

    function getMealExtraText(meal: Meal) {
        if (meal.level == 0) return "" //undiscovered meals
        const useContribution = meal.getContributionSpeed(starSignEquipped, silkRodeChip) > 0;
        switch (sort) {
            case "Level": return ""; //level already shown
            case "Least Time to Cook Next": return meal.level < meal.maxLevel ? toTime(meal.getTimeTill(meal.getMealLevelCost(), starSignEquipped, silkRodeChip, useContribution) * 3600) : "Already max level!";
            case "Least Time to Diamond": return meal.getCostsTillDiamond() > 0 ? toTime(meal.getTimeTill(meal.getCostsTillDiamond(), starSignEquipped, silkRodeChip, useContribution) * 3600) : "Already Diamond!";
            case "Least Time to Purple": return meal.getCostsTillPurple() > 0 ? toTime(meal.getTimeTill(meal.getCostsTillPurple(), starSignEquipped, silkRodeChip, useContribution) * 3600) : "Already Purple!";
            case "Least Time to Void": return meal.getCostsTillVoid() > 0 ? toTime(meal.getTimeTill(meal.getCostsTillVoid(), starSignEquipped, silkRodeChip, useContribution) * 3600) : "Already Void!";
            case "Least Time to 30": return meal.getCostsTillThirty() > 0 ? toTime(meal.getTimeTill(meal.getCostsTillThirty(), starSignEquipped, silkRodeChip, useContribution) * 3600) : "Already 30!";
            case "Least Time to Max": return meal.getCostsTillMaxLevel() > 0 ? toTime(meal.getTimeTill(meal.getCostsTillMaxLevel(), starSignEquipped, silkRodeChip, useContribution) * 3600) : `Already max level!`;
        }
    }

    if (!cooking) {
        return (
            <Box>
                Still loading or something is wrong.
            </Box>
        )
    }

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Cooking</Heading>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Spices</Text>
                <Box direction="row" wrap>
                    {
                        cooking.spices.filter(spice => spice != -1).map((spice, index) => (
                            <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                <TipDisplay
                                    size='medium'
                                    heading={territoryNiceNames[index < 14 ? index : index + 1]}
                                    body=''
                                    direction={TipDirection.Down}
                                >
                                    <Box direction="row" pad={{ vertical: 'small' }} align="center" gap='xsmall'>
                                        <IconImage data={{
                                            location: `CookingSpice${index}`,
                                            width: 36,
                                            height: 36
                                        }} scale={0.5} />
                                        <Text size="xsmall">{nFormatter(Math.floor(spice))}</Text>
                                    </Box>
                                </TipDisplay>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box direction="row" margin={{ top: 'small', bottom: 'small' }}>
                <ComponentAndLabel
                    label="Total Cooking Speed"
                    component={
                        <Box direction="row" gap="xsmall" align="center">
                            <Text>{notateNumber(cooking ? cooking.getTotalCookingSpeed(starSignEquipped, silkRodeChip) : 0)}</Text>
                            <TipDisplay
                                heading="Speed sources"
                                size='medium'
                                body={
                                    <Box>
                                        {cooking.totalCookingSpeed.sources.map(source => {
                                            if (typeof source.value === 'number') {
                                                // This is ugly, fix this later.
                                                let formattedValue = "";
                                                if (source.format && source.format == "None") {
                                                    formattedValue = source.value.toString();
                                                } else {
                                                    formattedValue = source.format ? notateNumber(source.value as number, source.format) : notateNumber(source.value as number, "Smaller");
                                                }
                                                return (
                                                    <Text size="small" key={source.name}>{source.name}: {formattedValue}</Text>
                                                )
                                            }
                                            return (
                                                <Text size="small" key={source.name}>{source.name}: {source.value}</Text>
                                            )
                                        })}
                                    </Box>
                                }
                            >
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    }
                    margin={{ right: 'medium' }}
                />
                {cooking.mealsDiscovered < cooking.getMaxMeals() && <TextAndLabel label="Meals Discovered" text={`${cooking.mealsDiscovered}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                {cooking.mealsAtDiamond > 0 && cooking.mealsAtDiamond < cooking.getMaxMeals() && <TextAndLabel label="Lv 11+ Meals" text={`${cooking.mealsAtDiamond}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                {hasColliderBonus && cooking.mealsAtVoid > 0 && <TextAndLabel label="Lv 30+ Meals" text={`${cooking.mealsAtVoid}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                <TextAndLabel textColor={cooking.foodLustDiscountCapped ? 'accent-1' : undefined} label="Meal Costs after Food Lust" text={`${nFormatter(mealCostAfterFoodLust * 100)}%`} margin={{ right: 'medium' }} />
            </Box>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Meals</Text>
                <Box direction="row" gap="medium" wrap>
                    <Select size="small"
                        placeholder="Sort by"
                        clear
                        value={sort}
                        options={["Level", "Least Time to Cook Next", "Least Time to Diamond", "Least Time to Purple", "Least Time to Void", "Least Time to 30", "Least Time to Max"]}
                        onChange={({ value: nextValue }) => { setSort(nextValue); }}
                    />
                    {
                        starSignUnlocked &&
                        <Box direction='row' gap='xsmall'>
                            <CheckBox
                                checked={starSignEquipped}
                                label="Gordonius Major Equipped"
                                onChange={(event) => {
                                    setStarSignEquipped(event.target.checked);
                                    if (!event.target.checked) {
                                        setSilkrode(false);
                                    }
                                }}
                                disabled={starSignInfinity}
                            />
                            <TipDisplay
                                heading="Gordonius Major"
                                size='medium'
                                maxWidth='medium'
                                body={
                                    <Box>
                                        <Text size='small'>Looks like you unlocked the Gordonius Major star sign</Text>
                                        {
                                            starSignInfinity ?
                                                <Text margin={{ top: 'xsmall' }} size='small'>You always get the star sign bonus thanks to the Infinite Stars Rift bonus</Text>
                                                :
                                                <Text margin={{ top: 'xsmall' }} size='small'>To avoid character checking for a global page, use this checkbox to consider it equipped or not</Text>
                                        }
                                    </Box>
                                }
                            >
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    }
                    {
                        starSignUnlocked &&
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
                    }
                    {
                        cooking.meals.filter(meal => meal.noMealLeftBehindAffected == true).length > 0 &&
                        <Box direction="row" align="center">
                            <Ascending color="Legendary" size="large" />
                            <Text size="xsmall">Indicates meals that will level from &quot;No Meal Left Behind&quot; Jade Emporium bonus</Text>
                        </Box>
                    }
                </Box>
                <Grid columns={size == "small" ? "1/2" : "1/3"}>
                    <Box direction="row" pad={{ left: '70px', right: '25px' }} justify="between" align="center" margin={{ right: 'small', bottom: 'small' }}>
                        <Text color="accent-2" size="xsmall">Bonus</Text>
                        <Text color="accent-2" size="xsmall">Next Level</Text>
                    </Box>
                    <Box direction="row" pad={{ left: '70px', right: '25px' }} justify="between" align="center" margin={{ right: 'small', bottom: 'small' }}>
                        <Text color="accent-2" size="xsmall">Bonus</Text>
                        <Text color="accent-2" size="xsmall">Next Level</Text>
                    </Box>
                    {size != "small" &&
                        <Box direction="row" pad={{ left: '70px', right: '25px' }} justify="between" align="center" margin={{ right: 'small', bottom: 'small' }}>
                            <Text color="accent-2" size="xsmall">Bonus</Text>
                            <Text color="accent-2" size="xsmall">Next Level</Text>
                        </Box>
                    }
                    {
                        mealsToShow?.map((meal, index) => {
                            const useContribution = meal.getContributionSpeed(starSignEquipped, silkRodeChip) > 0;
                            const nextLevelCost = meal.getMealLevelCost();
                            const diamondLevelCost = meal.getCostsTillDiamond();
                            const purpleLevelCost = meal.getCostsTillPurple();
                            const voidLevelCost = meal.getCostsTillVoid();
                            const thirtyLevelCost = meal.getCostsTillThirty();
                            const maxLevelCost = meal.getCostsTillMaxLevel();
                            const nextMilestoneCost = meal.getNextMilestoneCost();
                            return (
                                <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} direction="row" pad="small" gap="small" align="center" border={meal.cookingContribution > 0 ? { color: 'green-1', size: '1px' } : undefined}>
                                    <Box direction="row" align='center' fill>
                                        <Box direction="row" align="center" margin={{ right: 'small' }}>
                                            <Text size="small">{meal.level}</Text>
                                            <Box margin={{ bottom: 'small' }}>
                                                <IconImage data={meal.getImageData()} />
                                            </Box>
                                        </Box>
                                        <Box fill>
                                            <TipDisplay
                                                heading={meal.name}
                                                body={
                                                    meal.level > 0 ?
                                                        <Box>
                                                            <Text>Next level bonus: {meal.getBonusText(meal.level + 1)}</Text>
                                                            <Box>
                                                                {useContribution && <Text>Cooking speed: {nFormatter(meal.getContributionSpeed(starSignEquipped, silkRodeChip), "Smaller")}</Text>}
                                                                {nextLevelCost > 0 && <Text>Time to next level: {toTime(meal.getTimeTill(nextLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {nextLevelCost > 0 && <Text size="small">{meal.getLadlesTo(nextLevelCost, starSignEquipped, silkRodeChip, useContribution)} Ladles to next level ({meal.getLadlesTo(nextLevelCost, starSignEquipped, silkRodeChip, useContribution, cooking.getZerkerBonus())} if using {cooking?.bestBerserker?.playerName ?? "zerker"})</Text>}
                                                                {diamondLevelCost > 0 && <Text>Time to Diamond: {toTime(meal.getTimeTill(diamondLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {diamondLevelCost <= 0 && purpleLevelCost > 0 && <Text>Time to Purple: {toTime(meal.getTimeTill(purpleLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {purpleLevelCost <= 0 && voidLevelCost > 0 && <Text>Time to Void: {toTime(meal.getTimeTill(voidLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {voidLevelCost <= 0 && thirtyLevelCost > 0 && <Text>Time to 30: {toTime(meal.getTimeTill(thirtyLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {thirtyLevelCost <= 0 && maxLevelCost > 0 && <Text>Time to Max: {toTime(meal.getTimeTill(maxLevelCost, starSignEquipped, silkRodeChip, useContribution) * 3600)}</Text>}
                                                                {nextMilestoneCost > 0 && <Text size="small">{meal.getLadlesTo(nextMilestoneCost, starSignEquipped, silkRodeChip, useContribution)} Ladles to next milestone ({meal.getLadlesTo(nextMilestoneCost, starSignEquipped, silkRodeChip, useContribution, cooking.getZerkerBonus())} if using {cooking?.bestBerserker?.playerName ?? "zerker"})</Text>}
                                                            </Box>
                                                            <Text size="xsmall">* {useContribution ? "The time is calculated based on your current cooking speed for this meal." : "The time is calculated assuming all kitchens are cooking the same meal."}</Text>
                                                        </Box> :
                                                        <Box>
                                                            <Text>Bonus: {meal.getBonusText()}</Text>
                                                            <Text>Chance: {nFormatter(meal.timeDiscoveryChance * 100, "Smaller")}%</Text>
                                                            <Text>Time: {toTime(meal.timeDiscoveryTime)}</Text>
                                                            {
                                                                meal.chanceDiscoveryChance > meal.timeDiscoveryChance &&
                                                                <Box>
                                                                    <hr style={{ width: "100%" }} />
                                                                    <Text>Can achieve higher chance with longer time using:</Text>
                                                                    <Box direction="row">
                                                                        {
                                                                            meal.chanceOptimalSpices.map((spice, index) => (
                                                                                <IconImage style={{ opacity: cooking.spices[spice] > 0 ? 1 : 0.4 }} key={index} data={{
                                                                                    location: `CookingSpice${spice}`,
                                                                                    width: 36,
                                                                                    height: 36
                                                                                }} />
                                                                            ))
                                                                        }
                                                                    </Box>
                                                                    <Text>Chance: {nFormatter(meal.chanceDiscoveryChance * 100, "Smaller")}%</Text>
                                                                    <Text>Time: {toTime(meal.chanceDiscoveryTime)}</Text>
                                                                </Box>
                                                            }
                                                            <Text size="xsmall">* Chance/Time is based on your first kitchen luck stat.</Text>
                                                        </Box>
                                                }
                                                direction={TipDirection.Down}
                                                size='small'
                                            >
                                                <Box direction="row" align="center" justify="between">
                                                    <Box direction="row" width="100%" justify="between" pad={!meal.noMealLeftBehindAffected ? { top: 'small' } : undefined}>
                                                        <Text style={{ opacity: meal.level == 0 ? 0.3 : 1 }} margin={{ right: 'small' }} size="xsmall">{meal.getBonusText()}</Text>
                                                        {meal.level > 0 ?
                                                            <Text color={meal.level == meal.maxLevel ? '' : meal.count > meal.getMealLevelCost() ? 'green-1' : 'accent-1'} margin={{ right: 'small' }} size="xsmall">{`${nFormatter(Math.floor(meal.count))}/${nFormatter(Math.ceil(meal.getMealLevelCost()))}`}</Text>
                                                            :
                                                            <Box direction="row" gap="xsmall">
                                                                {
                                                                    meal.timeOptimalSpices.map((spice, index) => (
                                                                        <IconImage key={index} style={{ opacity: cooking.spices[spice] > 0 ? 1 : 0.4 }} data={{
                                                                            location: `CookingSpice${spice}`,
                                                                            width: 36,
                                                                            height: 36
                                                                        }} />
                                                                    ))
                                                                }
                                                            </Box>
                                                        }
                                                    </Box>
                                                    {
                                                        meal.noMealLeftBehindAffected && <Ascending color="Legendary" size="40px" />
                                                    }
                                                </Box>
                                            </TipDisplay>
                                            <Text size="xsmall" color="grey-2">{getMealExtraText(meal)}</Text>
                                        </Box>
                                    </Box>
                                </ShadowBox>
                            )
                        })
                    }
                </Grid>
            </Box>
            <KitchensDisplay silkRodeChip={silkRodeChip} starSignEquipped={starSignEquipped} />
        </Box >
    )
}

export default Cooking;
