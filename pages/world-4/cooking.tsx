import {
    Box,
    CheckBox,
    Grid,
    Heading,
    ResponsiveContext,
    Select,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import { TimeDown } from '../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import CoinsDisplay from '../../components/coinsDisplay';
import { AppContext } from '../../data/appContext';
import { territoryNiceNames } from '../../data/domain/breeding';
import { Cooking as CookingDomain, Kitchen, KitchenStatus, Meal, UpgradeType } from '../../data/domain/cooking';
import { getCoinsArray, nFormatter, toTime } from '../../data/utility';
import TextAndLabel from '../../components/base/TextAndLabel';
import { AtomCollider } from '../../data/domain/atomCollider';
import { Ascending, CircleInformation } from 'grommet-icons';


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

function KitchenDisplay({ kitchen, cooking, silkRodeChip }: { kitchen: Kitchen, cooking: CookingDomain, silkRodeChip: boolean }) {
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
                    <Text size="small">{`${nFormatter(silkRodeChip ? kitchen.mealSpeedWithSilkrode : kitchen.mealSpeed, "Smaller")}/hr`}</Text>
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
                        <Text size="small">{nFormatter((silkRodeChip ? kitchen.mealSpeedWithSilkrode : kitchen.mealSpeed) / cooking.meals[kitchen.activeMeal].cookReq, "Smaller")} per hour.</Text>
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

function KitchensDisplay({silkRodeChip} : {silkRodeChip: boolean}) {
    const [cooking, setCooking] = useState<CookingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setCooking(theData.get("cooking"));
        }
    }, [appContext]);

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
                            <KitchenDisplay key={index} kitchen={kitchen} silkRodeChip={silkRodeChip} cooking={cooking} />
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
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);

    const theData = appContext.data.getData();
    const cooking = theData.get("cooking") as CookingDomain;

    const hasColliderBonus = useMemo(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            const collider = theData.get("collider") as AtomCollider;
            return collider.atoms[8].level > 0;
        }

        return false;
    }, [appContext]);

    // equinox discount
    const mealCostAfterFoodLust = useMemo(() => {
        if (cooking) {
            return cooking.meals[0].foodLustDiscount;
        }

        return 1;
    }, [cooking])

    // meal max level
    const mealMaxlevel = useMemo(() => {
        if (cooking) {
            return cooking.meals[0].maxLevel;
        }

        return 1;
    }, [cooking])

    const canUseSilkrode = useMemo(() => {
        if (cooking) {
            return cooking.canBeBoostedBySilkrode;
        }

        return false;
    }, [cooking])

    const mealsToShow = useMemo(() => {
        return cooking.meals.filter(meal => meal.timeOptimalSpices.length > 0)
            .sort((meal1, meal2) => {
                const indexSort = meal1.mealIndex > meal2.mealIndex ? 1 : -1;

                //undiscovered meals get pushed to bottom
                if (meal1.level == 0) return meal2.level == 0 ? indexSort : 1

                function moveMaxedToEnd(meal1: Meal, meal2: Meal) {
                    if (meal1.level == meal1.maxLevel) {
                        return -1;
                    }
                    if (meal2.level == meal2.maxLevel) {
                        return -1;
                    }
                    return meal1.timeToNext > meal2.timeToNext ? 1 : -1;
                }

                function sortByTimeAndIndex(timeA: number, timeB: number) {
                    //negative times get switched to index sorting
                    if (timeA > 0 && timeB > 0) return timeA > timeB ? 1 : indexSort //neither reached
                    else if (timeA < 0 && timeB < 0) return indexSort //both reached
                    else return timeA > timeB ? -1 : 1 //one reached, one not
                }
                switch (sort) {
                    case "Level":
                        return meal1.level > meal2.level ? -1 : 1;
                    case "Least Time to Cook Next":
                        return moveMaxedToEnd(meal1, meal2);
                    case "Least Time to Diamond":
                        return sortByTimeAndIndex(meal1.timeToDiamond, meal2.timeToDiamond);
                    case "Least Time to Purple":
                        return sortByTimeAndIndex(meal1.timeToPurple, meal2.timeToPurple);
                    case "Least Time to Void":
                        return sortByTimeAndIndex(meal1.timeToVoid, meal2.timeToVoid);
                    case "Least Time to 30":
                        return sortByTimeAndIndex(meal1.timeToThirty, meal2.timeToThirty);
                    case "Least Time to Max":
                        return sortByTimeAndIndex(meal1.timeToMax, meal2.timeToMax);
                    default:
                        return indexSort;
                }
            })
    }, [appContext, cooking, sort])

    function getMealExtraText(meal: Meal) {
        if (meal.level == 0) return "" //undiscovered meals
        switch (sort) {
            case "Level": return ""; //level already shown
            case "Least Time to Cook Next": return meal.level < meal.maxLevel ? toTime((silkRodeChip ? meal.timeToNextWithSilkrode : meal.timeToNext) * 3600) : "Already max level!";
            case "Least Time to Diamond": return meal.timeToDiamond > 0 ? toTime((silkRodeChip ? meal.timeToDiamondWithSilkrode : meal.timeToDiamond) * 3600) : "Already Diamond!";
            case "Least Time to Purple": return meal.timeToPurple > 0 ? toTime((silkRodeChip ? meal.timeToPurpleWithSilkrode : meal.timeToPurple) * 3600) : "Already Purple!";
            case "Least Time to Void": return meal.timeToVoid > 0 ? toTime((silkRodeChip ? meal.timeToVoidWithSilkrode : meal.timeToVoid) * 3600) : "Already Void!";
            case "Least Time to 30": return meal.timeToThirty > 0 ? toTime((silkRodeChip ? meal.timeToThirtyWithSilkrode : meal.timeToThirty) * 3600) : "Already 30!";
            case "Least Time to Max": return meal.timeToMax > 0 ? toTime((silkRodeChip ? meal.timeToMaxWithSilkrode : meal.timeToMax) * 3600) : `Already max level!`;
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
            <NextSeo title="Cooking" />
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
                <TextAndLabel label="Total Cooking Speed" text={nFormatter(cooking ? (silkRodeChip ? cooking.totalCookingSpeedWithSilkrode : cooking.totalCookingSpeed) : 0)} margin={{ right: 'medium' }} />
                {cooking.mealsDiscovered < cooking.getMaxMeals() && <TextAndLabel label="Meals Discovered" text={`${cooking.mealsDiscovered}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                {cooking.mealsAtDiamond > 0 && cooking.mealsAtDiamond < cooking.getMaxMeals() && <TextAndLabel label="Lv 11+ Meals" text={`${cooking.mealsAtDiamond}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                {hasColliderBonus && cooking.mealsAtVoid > 0 && <TextAndLabel label="Lv 30+ Meals" text={`${cooking.mealsAtVoid}/${cooking.getMaxMeals()}`} margin={{ right: 'medium' }} />}
                <TextAndLabel textColor={cooking.foodLustDiscountCapped ? 'accent-1' : undefined} label="Meal Costs after Food Lust" text={`${nFormatter(mealCostAfterFoodLust * 100)}%`} margin={{ right: 'medium' }} />
            </Box>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Meals</Text>
                <Box direction="row" gap="medium">
                    <Select size="small"
                        placeholder="Sort by"
                        clear
                        value={sort}
                        options={["Level", "Least Time to Cook Next", "Least Time to Diamond", "Least Time to Purple", "Least Time to Void", "Least Time to 30", "Least Time to Max"]}
                        onChange={({ value: nextValue }) => { setSort(nextValue); }}
                    />
                    {
                        canUseSilkrode &&
                        <Box direction='row' gap='small'>
                            <CheckBox
                                checked={silkRodeChip}
                                label="Silkrode Nanochip Equipped"
                                onChange={(event) => setSilkrode(event.target.checked)}
                            />
                            <TipDisplay
                                heading="Silkrode Nanochip"
                                size='medium'
                                body={
                                    <Box>
                                        <Text size='small'>Looks like you unlocked the Gordonius Major star sign</Text>
                                        <Text margin={{top:'xsmall'}} size='small'>For consistency's sake and to avoid character based calculations on a global </Text>
                                        <Text size='small'>page, this star sign is considered equipped at all time</Text>
                                        <Text margin={{top:'xsmall'}} size='small'>You can check this checkbox to get accurate values when equipping the </Text>
                                        <Text size='small'>Silkrode Nanochip in the Lab (double star sign bonus)</Text>
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
                        mealsToShow?.map((meal, index) => (
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
                                                            {meal.cookingContribution > 0 && <Text>Cooking speed: {nFormatter(silkRodeChip ? meal.cookingContributionWithSilkrode : meal.cookingContribution, "Smaller")}</Text>}
                                                            {meal.timeToNext > 0 && <Text>Time to next level: {toTime(silkRodeChip ? meal.timeToNextWithSilkrode : meal.timeToNext * 3600)}</Text>}
                                                            {meal.ladlesToLevel > 0 && <Text size="small">{silkRodeChip ? meal.ladlesToLevelWithSilkrode : meal.ladlesToLevel} Ladles to next level ({silkRodeChip ? meal.zerkerLadlesToLevelWithSilkrode : meal.zerkerLadlesToLevel} if using {cooking?.bestBerserker?.playerName ?? "zerker"})</Text>}
                                                            {meal.timeToDiamond > 0 && <Text>Time to Diamond: {toTime(silkRodeChip ? meal.timeToDiamondWithSilkrode : meal.timeToDiamond * 3600)}</Text>}
                                                            {meal.timeToDiamond <= 0 && meal.timeToPurple > 0 && <Text>Time to Purple: {toTime(silkRodeChip ? meal.timeToPurpleWithSilkrode : meal.timeToPurple * 3600)}</Text>}
                                                            {meal.timeToPurple <= 0 && meal.timeToVoid > 0 && <Text>Time to Void: {toTime(silkRodeChip ? meal.timeToVoidWithSilkrode : meal.timeToVoid * 3600)}</Text>}
                                                            {meal.timeToVoid <= 0 && meal.timeToThirty > 0 && <Text>Time to 30: {toTime(silkRodeChip ? meal.timeToThirtyWithSilkrode : meal.timeToThirty * 3600)}</Text>}
                                                            {meal.timeToThirty <= 0 && meal.timeToMax > 0 && <Text>Time to Max: {toTime(silkRodeChip ? meal.timeToMaxWithSilkrode : meal.timeToMax * 3600)}</Text>}
                                                            {meal.ladlesToNextMilestone > 0 && <Text size="small">{silkRodeChip ? meal.ladlesToNextMilestoneWithSilkrode : meal.ladlesToNextMilestone} Ladles to next milestone ({silkRodeChip ? meal.zerkerLadlesToNextMilestoneWithSilkrode : meal.zerkerLadlesToNextMilestone} if using {cooking?.bestBerserker?.playerName ?? "zerker"})</Text>}
                                                        </Box>
                                                        <Text size="xsmall">* {meal.cookingContribution > 0 ? "The time is calculated based on your current cooking speed for this meal." : "The time is calculated assuming all kitchens are cooking the same meal."}</Text>
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
                                                                            <IconImage key={index} data={{
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
                                            <Box direction="row" align="center"  justify="between">
                                                <Box direction="row" width="100%" justify="between" pad={!meal.noMealLeftBehindAffected ? { top: 'small' } : undefined}>
                                                    <Text style={{opacity: meal.level == 0 ? 0.3 : 1}} margin={{ right: 'small' }} size="xsmall">{meal.getBonusText()}</Text>
                                                    {meal.level > 0 ?
                                                        <Text color={meal.level == meal.maxLevel ? '' : meal.count > meal.getMealLevelCost() ? 'green-1' : 'accent-1'} margin={{ right: 'small' }} size="xsmall">{`${nFormatter(Math.floor(meal.count))}/${nFormatter(Math.ceil(meal.getMealLevelCost()))}`}</Text>
                                                        :
                                                        <Box direction="row" gap="xsmall">
                                                            {
                                                                meal.timeOptimalSpices.map((spice, index) => (
                                                                    <IconImage key={index} data={{
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
                        ))
                    }
                </Grid>
            </Box>
            <KitchensDisplay silkRodeChip={silkRodeChip} />
        </Box >
    )
}

export default Cooking;