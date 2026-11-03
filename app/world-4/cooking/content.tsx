"use client"

import {
    Box,
    CheckBox,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import { TimeDown } from '../../../components/base/TimeDisplay';
import TipDisplay, { TipDirection } from '../../../components/base/TipDisplay';
import CoinsDisplay from '../../../components/coinsDisplay';
import { territoryNiceNames } from '../../../data/domain/world-4/breeding';
import { Cooking as CookingDomain, Kitchen, KitchenStatus, UpgradeType } from '../../../data/domain/world-4/cooking';
import { getCoinsArray, nFormatter, notateNumber } from '../../../data/utility';
import ContentTabs from '../../../components/base/ContentTabs';
import CookingRibbonsPanel from './ribbons';
import CookingMasteryPanel, { CookingMasterySummary } from './mastery';
import CookingMeals from './meals';
import type { MealControls } from './meals';
import type { FilterOptions } from '../../../components/account/shared/UpgradeTableFilters';
import { AtomCollider } from '../../../data/domain/world-3/construction/atomCollider';
import { CircleInformation } from 'grommet-icons';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import useHydrated from '../../../lib/hooks/useHydrated';
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
                    <Text size="small">{`${notateNumber(kitchen.getUpdatedMealSpeed(starSignEquipped, silkRodeChip), "Big")}/hr`}</Text>
                    <Text size="small" color="grey-2">Recipe Fire Speed:</Text>
                    <Text size="small">{`${notateNumber(kitchen.fireSpeed, "Big")}/hr`}</Text>
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
                    kitchen.status == KitchenStatus.Meal && kitchen.activeMeal < cooking.meals.length ?
                        <Box direction="row" gap="small" align="end">
                            <Box>
                                <IconImage data={cooking.meals[kitchen.activeMeal].getImageData()} />
                            </Box>
                            <Text size="small">{nFormatter(kitchen.getUpdatedMealSpeed(starSignEquipped, silkRodeChip) / cooking.meals[kitchen.activeMeal].cookReq, "Smaller")} per hour.</Text>
                        </Box>
                        :
                        <Box direction="row" gap="small" align="end">
                            <Text size="small">Unknown Meal</Text>
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

function NoMealLeftBehindSummary({ cooking }: { cooking: CookingDomain }) {
    const daily = cooking.noMealLeftBehind;
    const target = daily.targetMealIndex === null ? undefined : cooking.meals.find(meal => meal.mealIndex === daily.targetMealIndex);
    return (
        <Box flex={false} gap="small" pad={{ left: 'medium' }} border={{ side: 'left', color: 'grey-1' }} style={{ maxWidth: '100%' }}>
            <Box direction="row" gap="small" align="center">
                <IconImage data={daily.getImageData()} scale={0.4} />
                <Text size="small">No Meal Left Behind</Text>
                <TipDisplay heading="Daily meal upgrades" size="small" maxWidth="420px" body={
                    <Box gap="small">
                        <Box gap="xxsmall">
                            <Text size="small">Jade Emporium — No Meal Left Behind: {daily.jadeUpgradeOwned ? '+1 level' : 'Not owned'}</Text>
                            <Text size="small">No Meal Left Behind bundle: {daily.bundleOwned ? '+2 levels' : 'Not owned'}</Text>
                        </Box>
                        <Text size="small">Meals must reach level {daily.minimumMealLevel}. Daily upgrades stop at level {daily.levelLimit}.</Text>
                        <Text size="small">The lowest-level eligible meal receives the daily upgrade. It does not consume meals.</Text>
                    </Box>
                }>
                    <Box tabIndex={0}><CircleInformation size="small" /></Box>
                </TipDisplay>
            </Box>
            {daily.enabled ? <Box direction="row" gap="medium" wrap align="center">
                <Box gap="xxsmall">
                    <Text size="large">{daily.dailyMealCount} meal / day</Text>
                    <Text size="xsmall" color="accent-2">+{daily.dailyLevelGain} {daily.dailyLevelGain === 1 ? 'level' : 'levels'} per meal</Text>
                </Box>
                {target ? <Box direction="row" gap="small" align="center">
                    <IconImage data={target.getImageData()} />
                    <Box gap="xxsmall">
                        <Text size="small">{target.name}: {daily.currentLevel} → {daily.nextLevel}</Text>
                        <Text size="xsmall" color="accent-2">Daily target</Text>
                    </Box>
                </Box> : <Text size="small" color="accent-2">No eligible meal. Meals need level {daily.minimumMealLevel} or higher, below level {daily.levelLimit}.</Text>}
            </Box> : <Text size="small" color="accent-2">Unlock No Meal Left Behind in the Jade Emporium or with its bundle.</Text>}
        </Box>
    );
}

function Cooking() {
    const hydrated = useHydrated();
    const [tab, setTab] = useState<'Meals' | 'Kitchens' | 'Ribbons' | 'Mastery'>('Meals');
    const [mealFilters, setMealFilters] = useState<FilterOptions>({
        hideLocked: false,
        hideMaxed: false,
        searchText: '',
        sortBy: 'default'
    });
    const [mealControls, setMealControls] = useState<MealControls>({ status: 'All', ribbon: 'All', mastery: 'All' });
    const [silkRodeChip, setSilkrode] = useState(false);
    const [starSignEquipped, setStarSignEquipped] = useState(false);

    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const cooking = hydrated ? theData.get("cooking") as CookingDomain : undefined;

    const mealCostAfterFoodLust = cooking?.meals[0].foodLustDiscount ?? 1;

    const starSignUnlocked = cooking?.starSignUnlocked ?? false;

    const starSignInfinity = cooking?.starSignInfinity ?? false;
    const isStarSignActive = starSignInfinity || starSignEquipped;

    if (!hydrated || !cooking) {
        return (
            <Box>
                Loading Cooking…
            </Box>
        )
    }

    const hasColliderBonus = (theData.get("collider") as AtomCollider).atoms[8].level > 0;

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Cooking</Heading>
            <Box direction="row" wrap gap="medium" margin={{ bottom: 'medium' }} align="start">
                <Box gap="small">
                    <Text size="small">Cooking speed</Text>
                    <Box gap="xxsmall">
                        <TipDisplay heading="Cooking speed" size="small" maxWidth="620px" body={
                            <Box gap="xxsmall" style={{ maxHeight: '40vh', overflowY: 'auto', overflowWrap: 'anywhere' }}>
                                {cooking.totalCookingSpeed.sources.map(source => (
                                    <Text size="xsmall" key={source.name}>
                                        {source.name}: {typeof source.value === 'number'
                                            ? source.format === 'None' ? source.value.toString() : notateNumber(source.value, source.format ?? 'Smaller')
                                            : source.value}
                                    </Text>
                                ))}
                            </Box>
                        }>
                            <Text size="xxlarge" tabIndex={0} style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                                {notateNumber(cooking.getTotalCookingSpeed(isStarSignActive, silkRodeChip))}
                            </Text>
                        </TipDisplay>
                        <Text size="xsmall" color="accent-2">Total speed / hour</Text>
                    </Box>
                </Box>
                <Box gap="small" pad={{ left: 'medium' }} border={{ side: 'left', color: 'grey-1' }}>
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={cooking.meals[0].getImageData()} scale={0.75} />
                        <Text size="small">Meals</Text>
                    </Box>
                    <Box direction="row" wrap gap="medium" style={{ alignItems: 'baseline' }}>
                        <Box gap="xxsmall">
                            <Text size="large">{cooking.meals[0].maxLevel}</Text>
                            <Text size="xsmall" color="accent-2">Maximum level</Text>
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="large">{cooking.mealsDiscovered} / {cooking.getMaxMeals()}</Text>
                            <Text size="xsmall" color="accent-2">Meals discovered</Text>
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="large">{cooking.mealsAtDiamond} / {cooking.getMaxMeals()}</Text>
                            <Text size="xsmall" color="accent-2">Level 11+ meals</Text>
                        </Box>
                        {hasColliderBonus && cooking.mealsAtVoid > 0 && <Box gap="xxsmall">
                            <Text size="large">{cooking.mealsAtVoid} / {cooking.getMaxMeals()}</Text>
                            <Text size="xsmall" color="accent-2">Level 30+ meals</Text>
                        </Box>}
                        <Box gap="xxsmall">
                            <Text size="large" color={cooking.foodLustDiscountCapped ? 'accent-1' : undefined}>{nFormatter(mealCostAfterFoodLust * 100)}%</Text>
                            <Text size="xsmall" color="accent-2">Meal costs after Food Lust</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box direction="row" wrap gap="medium" margin={{ bottom: 'medium' }} align="start">
                <CookingMasterySummary mastery={cooking.mastery} />
                <NoMealLeftBehindSummary cooking={cooking} />
            </Box>
            {starSignUnlocked && <Box direction="row" wrap gap="medium" margin={{ bottom: 'medium' }}>
                        <Box direction='row' gap='xsmall'>
                            <CheckBox
                                checked={isStarSignActive}
                                label="Assume Gordonius Major equipped"
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
                                        {
                                            starSignInfinity ?
                                                <Text size='small'>The Rift’s Infinite Stars bonus keeps this star sign active.</Text>
                                                :
                                                <Text size='small'>Apply this star sign to meal and kitchen speed estimates.</Text>
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
                                label="Assume Silkrode Nanochip equipped"
                                onChange={(event) => setSilkrode(event.target.checked)}
                                disabled={!isStarSignActive}
                            />
                            <TipDisplay
                                heading="Silkrode Nanochip"
                                size='medium'
                                maxWidth='medium'
                                body={
                                    <Box>
                                        <Text size='small'>Double the star sign bonus for meal and kitchen speed estimates.</Text>
                                    </Box>
                                }
                            >
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
            </Box>}
            <ContentTabs
                options={(['Meals', 'Kitchens', 'Ribbons', 'Mastery'] as const).map(value => ({ value, label: value }))}
                value={tab}
                onChange={setTab}
            />
            {tab === 'Meals' && <Box margin={{ top: 'medium', bottom: 'medium' }}>
                <CookingMeals
                    cooking={cooking}
                    lastUpdated={lastUpdated}
                    starSign={isStarSignActive}
                    silkrode={silkRodeChip}
                    filters={mealFilters}
                    onFiltersChange={setMealFilters}
                    controls={mealControls}
                    onControlsChange={setMealControls}
                />
            </Box>}
            {tab === 'Kitchens' && <Box gap="medium" margin={{ top: 'medium' }}>
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
                <KitchensDisplay silkRodeChip={silkRodeChip} starSignEquipped={isStarSignActive} />
            </Box>}
            {tab === 'Ribbons' && <CookingRibbonsPanel cooking={cooking} />}
            {tab === 'Mastery' && <CookingMasteryPanel cooking={cooking} />}
        </Box >
    )
}

export default Cooking;
