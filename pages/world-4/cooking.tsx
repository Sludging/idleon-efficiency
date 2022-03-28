import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { NextSeo } from 'next-seo';
import { useContext, useEffect, useMemo, useState } from 'react';
import ShadowBox from '../../components/base/ShadowBox';
import TextAndLabel from '../../components/base/TextAndLabel';
import { TimeDown } from '../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../components/base/TipDisplay';
import CoinsDisplay from '../../components/coinsDisplay';
import { AppContext } from '../../data/appContext';
import { Cooking as CookingDomain, Kitchen, KitchenStatus, UpgradeType } from '../../data/domain/cooking';
import { getCoinsArray, nFormatter } from '../../data/utility';


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
                    <Text size="small">{`${nFormatter(kitchen.mealSpeed, "Big")}/hr`}</Text>
                    <Text size="small" color="grey-2">Recipe Fire Speed:</Text>
                    <Text size="small">{`${nFormatter(kitchen.fireSpeed, "Big")}/hr`}</Text>
                    <Text size="small" color="grey-2">New Recipe Luck:</Text>
                    <Text size="small">{`${kitchen.recipeLuck.toPrecision(2)}x`}</Text>
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
                    <Box width={{ max: '41px', min: '41px' }}>
                        <Box className={cooking.meals[kitchen.activeMeal].getClass()} />
                    </Box>
                    <Text size="small">{nFormatter(kitchen.mealSpeed / cooking.meals[kitchen.activeMeal].cookReq)} per hour.</Text>
                </Box>
            }
            {
                kitchen.status == KitchenStatus.Recipe &&
                <Box gap="medium">
                    <Box gap="small" align="center" direction="row">
                        {
                            kitchen.activeRecipe.map((spice, index) => (
                                <Box key={`spice_${index}`} width={{ max: '25px', min: '25px' }}>
                                    <Box className={`icons-3636 icons-CookingSpice${spice}`} />
                                </Box>
                            ))
                        }
                        {
                            possibleMeals.map((meal, index) => (
                                <Box title={cooking.meals[meal].name} style={{ opacity: cooking.meals[meal]?.level > 0 ? 1 : 0.5 }} key={`meal_${index}`} width={{ max: '41px', min: '41px' }}>
                                    <Box className={cooking.meals[meal]?.getClass()} />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box justify="between" gap="small" direction="row">
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
            <Box margin={{ bottom: 'medium' }} gap="small">
                <Text>Spices</Text>
                <Box direction="row" wrap>
                    {
                        cooking?.spices.filter(spice => spice > 0).map((spice, index) => (
                            <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                    <Box width={{ max: '36px', min: '36px' }}>
                                        <Box className={`icons-3636 icons-CookingSpice${index}`} />
                                    </Box>
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
                        cooking?.meals.filter(meal => meal.bonusKey != "non" && (meal.level > 0 || meal.optimalSpices.length > 0)).map((meal, index) => (
                            <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} direction="row" pad="small" gap="small" align="center">
                                <Box width={{ max: '41px', min: '41px' }}>
                                    <Box className={meal.getClass()} />
                                </Box>
                                {meal.level > 0 &&
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
                                            text={`${Math.floor(meal.count)}/${Math.ceil(meal.getMealLevelCost()).toString()}`}
                                        />
                                    </Box>
                                }
                                {meal.level == 0 &&
                                    <Box>
                                        <TipDisplay
                                            heading={meal.name}
                                            body={
                                                <Box>
                                                    <Text>Bonus: {meal.getBonusText()}</Text>
                                                    {/* <Text>Time: {meal.discoveryTime}</Text> */}
                                                    <Text>Chance: {meal.discoveryChance * 100}%</Text>
                                                </Box>
                                            }
                                            direction={TipDirection.Down}
                                            size='small'
                                        >
                                            <Box direction="row">
                                                {
                                                    meal.optimalSpices.map((spice, index) => (
                                                        <Box key={index} width={{ max: '36px', min: '36px' }}>
                                                            <Box className={`icons-3636 icons-CookingSpice${spice}`} />
                                                        </Box>
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