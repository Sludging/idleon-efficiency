import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import IconImage from '../../components/base/IconImage';
import ShadowBox from '../../components/base/ShadowBox';
import TextAndLabel from '../../components/base/TextAndLabel';
import { TimeDown } from '../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import CoinsDisplay from '../../components/coinsDisplay';
import { AppContext } from '../../data/appContext';
import { Cooking as CookingDomain, Kitchen, KitchenStatus, UpgradeType } from '../../data/domain/cooking';
import { getCoinsArray, nFormatter, toTime } from '../../data/utility';


function KitchenUpgrade({ title, level, spiceIndex, cost, costColor }: { title: string, level: number, spiceIndex: number, cost: number, costColor: string }) {
    return (
        <Box gap='xsmall'>
            <Box background="#2F3743" pad="xsmall" align="center">
                <Text size="xsmall">{title} {level}</Text>
            </Box>
            <Box direction="row" justify="between">
                <Box width={{ max: '25px' }}>
                    <Box className={`icons-3636 icons-CookingSpice${spiceIndex}`} />
                </Box>
                <Text color={costColor} >{nFormatter(cost, "Big")}</Text>
            </Box>
        </Box>
    )
}

function KitchenDisplay({ kitchen, cooking }: { kitchen: Kitchen, cooking: CookingDomain }) {
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
                    <Text size="small">{`${nFormatter(kitchen.mealSpeed, "Smaller")}/hr`}</Text>
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
                    costColor={kitchen.fireUpgradeCost < cooking.spices[kitchen.getSpiceForUpgrade(UpgradeType.Speed)] ? 'green-1' : 'accent-1'} />
                <KitchenUpgrade title='LUCK' level={kitchen.luckLevels}
                    spiceIndex={kitchen.getSpiceForUpgrade(UpgradeType.Luck)} cost={kitchen.luckUpgradecost}
                    costColor={kitchen.luckUpgradecost < cooking.spices[kitchen.getSpiceForUpgrade(UpgradeType.Speed)] ? 'green-1' : 'accent-1'} />
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
                        <Text size="small">{nFormatter(kitchen.mealSpeed / cooking.meals[kitchen.activeMeal].cookReq, "Smaller")} per hour.</Text>
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

function KitchensDisplay() {
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
                            <KitchenDisplay key={index} kitchen={kitchen} cooking={cooking} />
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function Cooking() {
    const [cooking, setCooking] = useState<CookingDomain>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setCooking(theData.get("cooking"));
        }
    }, [appContext]);

    return (
        <Box>
            <NextSeo title="Cooking" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Cooking</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies.</Text>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Spices</Text>
                <Box direction="row" wrap>
                    {
                        cooking?.spices.filter(spice => spice > -1).map((spice, index) => (
                            <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                    <IconImage data={{
                                        location: `CookingSpice${index}`,
                                        width: 36,
                                        height: 36
                                    }} />
                                    <Text size="small">{nFormatter(spice)}</Text>
                                </Box>
                            </Box>
                        ))
                    }
                </Box>
            </Box>
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Meals</Text>
                <Grid columns="1/3">
                    {
                        cooking?.meals.filter(meal => (meal.level > 0 || meal.optimalSpices.length > 0)).map((meal, index) => (
                            <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} direction="row" pad="small" gap="small" align="center">
                                <Box direction="row" align="center">
                                    <Text size="small">{meal.level}</Text>
                                    <Box margin={{ bottom: 'small' }}>
                                        <IconImage data={meal.getImageData()} />
                                    </Box>
                                </Box>
                                {meal.level > 0 &&
                                    <TipDisplay
                                        heading={meal.name}
                                        body={
                                            <Box>
                                                <Text>Next level bonus: {meal.getBonusText(meal.level + 1)}</Text>
                                                {meal.cookingContribution > 0 &&
                                                    <Box>
                                                        <Text>Cooking speed: {nFormatter(meal.cookingContribution, "Smaller")}</Text>
                                                        { meal.timeToNext > 0 && <Text>Time to next level: {toTime(meal.timeToNext * 3600)}</Text>}
                                                        { meal.timeToDiamond > 0 && <Text>Time to Diamond: {toTime(meal.timeToDiamond * 3600)}</Text>}
                                                    </Box>
                                                }
                                            </Box>
                                        }
                                        direction={TipDirection.Down}
                                        size='small'
                                    >
                                        <Box direction="row" gap="small" justify="between" fill>
                                            <TextAndLabel
                                                label="Bonus"
                                                textSize='small'
                                                text={meal.getBonusText()}
                                            />
                                            <TextAndLabel
                                                label="Next Level"
                                                textSize='small'
                                                textColor={meal.count > meal.getMealLevelCost() ? 'green-1' : 'accent-1'}
                                                text={`${nFormatter(Math.floor(meal.count))}/${nFormatter(Math.ceil(meal.getMealLevelCost()))}`}
                                            />
                                        </Box>
                                    </TipDisplay>
                                }
                                {meal.level == 0 &&
                                    <Box>
                                        <TipDisplay
                                            heading={meal.name}
                                            body={
                                                <Box>
                                                    <Text>Bonus: {meal.getBonusText()}</Text>
                                                    {/* <Text>Time: {meal.discoveryTime}</Text> */}
                                                    <Text>Chance: {nFormatter(meal.discoveryChance * 100, "Smaller")}%</Text>
                                                    <Text>Time: {toTime(meal.discoveryTime)}</Text>
                                                    <Text size="xsmall">* Chance/Time is based on your first kitchen luck stat.</Text>
                                                </Box>
                                            }
                                            direction={TipDirection.Down}
                                            size='small'
                                        >
                                            <Box direction="row">
                                                {
                                                    meal.optimalSpices.map((spice, index) => (
                                                        <IconImage key={index} data={{
                                                            location: `CookingSpice${spice}`,
                                                            width: 36,
                                                            height: 36
                                                        }} />
                                                    ))
                                                }
                                            </Box>
                                        </TipDisplay>
                                    </Box>
                                }
                            </ShadowBox>
                        ))
                    }
                </Grid>
            </Box>
            <KitchensDisplay />
        </Box >
    )
}

export default Cooking;