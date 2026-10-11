'use client';

import { Box, Grid, Heading, Text } from 'grommet';
import styled from 'styled-components';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import {
    BogLogImport,
    HighScoreImport,
    type Import,
    KingRatImport,
    KitsuneImport,
    ShellImport,
    type ShopUpgrade,
    ShovelImport,
    SnailImport,
    SprinklerImport,
    SquirrelImport,
} from '../../../data/domain/world-5/gaming/imports';
import { commaNotation, nFormatter } from '../../../data/utility';
import IconImage from '../../base/IconImage';
import ShadowBox from '../../base/ShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../base/TextAndLabel';
import BitsDisplay from '../../bitsDisplay';
import { ResourceDisplay } from '../../account/shared/ResourceDisplay';
import { GamingFertilizer } from './fertilizer';

const probabilityFormat = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 2,
});
const ImportBitsCost = styled(Text)`
    span { color: inherit; }
`;

const multiplierText = (value: number): string => `${nFormatter(value, 'MultiplierInfo')}x`;

function ImportBenefit({ importItem }: { importItem: Import }) {
    if (importItem instanceof SprinklerImport) {
        return <TextAndLabel label="Recharge speed" text={`+${nFormatter(importItem.rechargeBonusPercent)}%`} />;
    }

    if (importItem instanceof ShovelImport) {
        return <TextAndLabel label="Big nugget luck" text={multiplierText(importItem.bigNuggetLuck)} />;
    }

    if (importItem instanceof SquirrelImport) {
        return <TextAndLabel label="Acorns found" text={`+${nFormatter(importItem.acornBonusPercent)}%`} />;
    }

    if (importItem instanceof ShellImport) {
        return <TextAndLabel label="Earned Bits multiplier" text={multiplierText(importItem.earnedBitsMultiplier)} />;
    }

    if (importItem instanceof KitsuneImport) {
        return importItem.active
            ? <TextAndLabel label="Enabled growth speed" text={multiplierText(importItem.growthMultiplier)} />
            : <TextAndLabel label="Kitsune mode" text="Disabled" />;
    }

    if (importItem instanceof BogLogImport) {
        return <TextAndLabel label="Free-game chance" text={probabilityFormat.format(importItem.freeGameProbability)} />;
    }

    if (importItem instanceof HighScoreImport || importItem instanceof SnailImport || importItem instanceof KingRatImport) {
        return <TextAndLabel label="Bits multiplier" text={multiplierText(importItem.bitsMultiplier)} />;
    }

    return <TextAndLabel label="Current bonus" text={importItem.getBonusText()} />;
}

const shopEffectLabels: Record<ShopUpgrade['effect'], string> = {
    'bits-multiplier': 'Bits multiplier',
    growth: 'Growth speed',
    'palette-luck': 'Palette Luck',
    'token-rate': 'King Tokens per hour',
    'crown-chance': 'Crown chance',
};

function ImportShop({ name, upgrades }: { name: string; upgrades: ShopUpgrade[] }) {
    return (
        <details>
            <summary style={{ cursor: 'pointer' }}>{name}</summary>
            <Box gap="small" margin={{ top: 'small' }}>
                {upgrades.map(upgrade => (
                    <Box key={upgrade.index} gap="xsmall" pad={{ top: 'small' }} border={{ side: 'top', color: 'grey-1' }}>
                        <Box direction="row" justify="between" gap="small" align="baseline">
                            <Text size="small" weight="bold">{shopEffectLabels[upgrade.effect]}</Text>
                            <Text size="xsmall" color="accent-2">Level {commaNotation(upgrade.level)}</Text>
                        </Box>
                        <Box direction="row" justify="between" gap="small" align="start">
                            <TextAndLabel
                                label="Current bonus"
                                textSize="small"
                                text={upgrade.effect === 'bits-multiplier' && upgrade.multiplier !== null
                                    ? multiplierText(upgrade.multiplier)
                                    : upgrade.bonusPercent !== null ? `+${nFormatter(upgrade.bonusPercent)}%` : 'No bonus'}
                            />
                            <ComponentAndLabel
                                label="Next level cost"
                                component={Number.isFinite(upgrade.cost)
                                    ? <ResourceDisplay
                                        cost={upgrade.cost}
                                        resourceImageData={upgrade.getCurrencyImageData()}
                                        resourceImageScale={1}
                                        textSize="small"
                                        canAfford={upgrade.affordable}
                                    />
                                    : <Text size="small">Exceeds display range</Text>}
                            />
                        </Box>
                        {!upgrade.unlocked && <Text size="xsmall" color="accent-2">
                            {upgrade.currency === 'acorns' && upgrade.effect === 'palette-luck'
                                ? 'Requires Autumn Squirrel and Squirrel Triad.'
                                : `Requires ${upgrade.currency === 'acorns' ? 'Autumn Squirrel' : 'King Rat of Olde'}.`}
                        </Text>}
                    </Box>
                ))}
            </Box>
        </details>
    );
}

function SnailChances({ snail }: { snail: SnailImport }) {
    const protectionLabel = snail.protectionAction === 'consecrate' ? 'Protection layers' : 'Encouragement';
    const protectionActionLabel = snail.protectionAction === 'consecrate' ? 'Consecrate mail cost' : 'Encourage mail cost';

    return (
        <Box gap="small">
            <Box direction="row" wrap gap="medium">
                <TextAndLabel label="Snail level / current cap" text={`${snail.currentLevel} / ${snail.levelCap}`} textSize="small" />
                <TextAndLabel label="Highest Snail level" text={commaNotation(snail.highestLevel)} textSize="small" />
                <ComponentAndLabel label="Mail" component={<ResourceDisplay cost={snail.mail} resourceImageData={snail.getMailImageData()} resourceImageScale={1} textSize="small" />} />
            </Box>
            <details>
                <summary style={{ cursor: 'pointer' }}>Snail chances</summary>
                <Box gap="small" margin={{ top: 'small' }}>
                    <Box direction="row" wrap gap="medium">
                        <TextAndLabel label="Level-up success" text={probabilityFormat.format(snail.successProbability)} textSize="small" />
                        <TextAndLabel label="Reset chance if level-up fails" text={probabilityFormat.format(snail.resetOnFailureProbability)} textSize="small" />
                        <TextAndLabel label={protectionLabel} text={commaNotation(snail.protectionLayers)} textSize="small" />
                    </Box>
                    <Text size="small">
                        {snail.resetOutcome === 'consume-protection'
                            ? 'A reset consumes one protection layer. The Snail keeps its level.'
                            : `A reset returns the Snail to level ${snail.resetDestinationLevel}.`}
                    </Text>
                    <Box direction="row" wrap gap="medium">
                        <ComponentAndLabel label="Level-up mail cost" component={<ResourceDisplay cost={snail.levelUpMailCost} resourceImageData={snail.getMailImageData()} resourceImageScale={1} textSize="small" canAfford={snail.currentLevel < snail.levelCap && snail.mail >= snail.levelUpMailCost} />} />
                        <ComponentAndLabel label={protectionActionLabel} component={<ResourceDisplay cost={snail.protectionMailCost} resourceImageData={snail.getMailImageData()} resourceImageScale={1} textSize="small" canAfford={snail.mail >= snail.protectionMailCost} />} />
                    </Box>
                    <TextAndLabel label="Double daily mail chance" text={probabilityFormat.format(snail.mailDoubleProbability)} textSize="small" />
                </Box>
            </details>
        </Box>
    );
}

function ImportProgress({ importItem, gaming }: { importItem: Import; gaming: Gaming }) {
    if (importItem instanceof SprinklerImport) {
        return (
            <Box gap="small">
                <TextAndLabel label="Charge-preservation chance" text={probabilityFormat.format(importItem.preservationProbability)} textSize="small" />
                <Text size="xsmall" color="accent-2">Chance to not use up a charge. Sources: Golden Sprinkler and Lemon Yellow.</Text>
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Golden Sprinkler purchases" text={commaNotation(importItem.goldenSprinklerPurchases)} textSize="small" />
                    <TextAndLabel label="Lemon Yellow bonus" text={`+${nFormatter(gaming.getPaletteBonus(16))}%`} textSize="small" />
                </Box>
            </Box>
        );
    }

    if (importItem instanceof ShovelImport) {
        return (
            <Box gap="small">
                <Box direction="row" wrap gap="medium">
                    <TextAndLabel label="Saved digs" text={commaNotation(importItem.digs)} textSize="small" />
                    <TextAndLabel label="Best nugget · Bits multiplier" text={multiplierText(importItem.bestNugget)} textSize="small" />
                </Box>
                <Text size="small" weight="bold">Possible nugget size per dig</Text>
                <Box direction="row" wrap gap="medium">
                    <TextAndLabel label="Minimum possible" text={multiplierText(importItem.nuggetRange.minimum)} textSize="small" />
                    <TextAndLabel label="Maximum possible" text={multiplierText(importItem.nuggetRange.maximum)} textSize="small" />
                </Box>
                <Text size="xsmall" color="accent-2">Current draw range, not a guaranteed improvement. Nugget sizes are not equally likely.</Text>
            </Box>
        );
    }

    if (importItem instanceof SquirrelImport) {
        return (
            <Box gap="small">
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel label="Acorns" component={<ResourceDisplay cost={importItem.acorns} resourceImageData={importItem.getCurrencyImageData()} resourceImageScale={1} textSize="small" />} />
                    <TextAndLabel label="Saved collection yield" text={commaNotation(importItem.acornsReady)} textSize="small" />
                    <TextAndLabel label="One-hour acorn yield" text={nFormatter(importItem.acornsPerHour)} textSize="small" />
                </Box>
                <Text size="xsmall" color="accent-2">One-hour yield is not a constant hourly rate.</Text>
                <ImportShop name="Acorn Shop" upgrades={importItem.shop} />
            </Box>
        );
    }

    if (importItem instanceof ShellImport) {
        return (
            <Box gap="small">
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Shell rank" text={commaNotation(importItem.rank)} textSize="small" />
                    <TextAndLabel label="Completed rank-ups" text={commaNotation(importItem.completedRankUps)} textSize="small" />
                    <TextAndLabel label="Recorded plant evolutions" text={commaNotation(importItem.evolutionProgress)} textSize="small" />
                </Box>
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Evolutions to next rank" text={commaNotation(importItem.remainingEvolutions)} textSize="small" />
                    <TextAndLabel label="Next rank total Bits bonus" text={`+${nFormatter(importItem.nextRankBitsBonusPercent)}%`} textSize="small" />
                    <TextAndLabel label="Import bonus per rank" text={`+${nFormatter(importItem.getBonus())}% Bits`} textSize="small" />
                </Box>
            </Box>
        );
    }

    if (importItem instanceof KitsuneImport) {
        return (
            <Box gap="small">
                {importItem.active && <TextAndLabel label="Enabled Bits reward" text={multiplierText(importItem.rewardMultiplier)} textSize="small" />}
                <TextAndLabel label="Import speed bonus when enabled" text={`+${nFormatter(importItem.getBonus())}%`} textSize="small" />
                <Text size="xsmall" color="accent-2">
                    {importItem.canToggle ? 'The garden is empty. Change Kitsune mode in the game.' : 'Harvest all plants in the game before changing Kitsune mode.'}
                </Text>
            </Box>
        );
    }

    if (importItem instanceof BogLogImport) {
        return (
            <Box gap="small">
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Best Log score" text={`${commaNotation(importItem.highScore)} successful guesses`} textSize="small" />
                    <TextAndLabel label="Saved game state" text={importItem.nextGameSeconds === 0 ? 'Available' : 'Recharging'} textSize="small" />
                    <TextAndLabel label="Log Bits multiplier" text={multiplierText(importItem.bitsMultiplier)} textSize="small" />
                </Box>
                <Box direction="row" gap="medium" wrap>
                    <TextAndLabel label="Log rank" text={commaNotation(importItem.rank)} textSize="small" />
                    <TextAndLabel label="Instant garden progress" text={`${nFormatter(importItem.progressHours)} hours`} textSize="small" />
                    <TextAndLabel label="Death cards at this rank" text={commaNotation(importItem.deathCardCount)} textSize="small" />
                </Box>
            </Box>
        );
    }

    if (importItem instanceof HighScoreImport) {
        return (
            <Box gap="small">
                <TextAndLabel label="Best POiNG score" text={commaNotation(importItem.highScore)} textSize="small" />
                <Text size="xsmall" color="accent-2">{importItem.getBonusText()}</Text>
            </Box>
        );
    }

    if (importItem instanceof SnailImport) {
        return <SnailChances snail={importItem} />;
    }

    if (importItem instanceof KingRatImport) {
        return (
            <Box gap="small">
                <Box direction="row" gap="medium" wrap>
                    <ComponentAndLabel label="Crowns found" component={<Box direction="row" gap="xsmall" align="center"><IconImage data={importItem.getCrownImageData()} /><Text size="small">{importItem.crownCount} / 100</Text></Box>} />
                    <TextAndLabel label="Crowns remaining" text={commaNotation(importItem.remainingCrowns)} textSize="small" />
                    <ComponentAndLabel label="King Tokens" component={<ResourceDisplay cost={importItem.tokens} resourceImageData={importItem.getCurrencyImageData()} resourceImageScale={1} textSize="small" />} />
                    <TextAndLabel label="King Tokens per hour" text={nFormatter(importItem.tokensPerHour)} textSize="small" />
                </Box>
                <ImportShop name="King Token Shop" upgrades={importItem.shop} />
                <details>
                    <summary style={{ cursor: 'pointer' }}>Crown chances by stage</summary>
                    <Box gap="small" margin={{ top: 'small' }}>
                        <Text size="xsmall" color="accent-2">Chance for a Royale crown draw. The draw can select a crown already found.</Text>
                        {importItem.crownChances.map(chance => (
                            <Box key={chance.stage} direction="row" justify="between" gap="small">
                                <Text size="small">Royale stage {chance.stage}</Text>
                                <Text size="small">{probabilityFormat.format(chance.probability)}</Text>
                            </Box>
                        ))}
                    </Box>
                </details>
            </Box>
        );
    }

    return null;
}

function ImportCard({ importItem, gaming }: { importItem: Import; gaming: Gaming }) {
    const nextCost = importItem.purchased ? importItem.getUpgradeCost() : importItem.purchaseCostBits;
    const canAfford = importItem.accessible && nextCost !== null && gaming.bits >= nextCost;

    return (
        <ShadowBox forwardedAs="article" aria-label={importItem.name} background="dark-1" pad="medium" gap="small">
            <Box direction="row" gap="small" align="center" style={{ opacity: importItem.purchased ? 1 : 0.6 }}>
                <IconImage data={importItem.getImageData()} scale={0.65} />
                <Box gap="xxsmall">
                    <Text weight="bold">{importItem.name}</Text>
                    <Text size="xsmall" color="accent-2">
                        {importItem.purchased ? `Import level ${commaNotation(importItem.level)}` : importItem.accessible ? 'Not purchased' : 'Locked'}
                    </Text>
                </Box>
            </Box>
            {importItem.purchased && <ImportBenefit importItem={importItem} />}
            {!importItem.purchased && <Text size="small">{importItem.getDescription().replaceAll('|', ' ').replaceAll('₣', 'Bits')}</Text>}
            {nextCost !== null && <ComponentAndLabel
                label={importItem.purchased ? 'Next import level cost' : 'Purchase cost'}
                component={Number.isFinite(nextCost)
                    ? <ImportBitsCost forwardedAs="div" color={canAfford ? 'green-1' : undefined}>
                        <BitsDisplay value={nextCost} scale={0.7} textSize="small" />
                    </ImportBitsCost>
                    : <Text size="small">Exceeds display range</Text>}
            />}
            {!importItem.accessible && <Text size="xsmall" color="accent-2">Requires Gaming level 20.</Text>}
            {importItem.purchased
                ? <ImportProgress importItem={importItem} gaming={gaming} />
                : importItem instanceof SquirrelImport
                    ? <ImportShop name="Acorn Shop" upgrades={importItem.shop} />
                    : importItem instanceof KingRatImport
                        ? <ImportShop name="King Token Shop" upgrades={importItem.shop} />
                        : null}
            <details>
                <summary style={{ cursor: 'pointer' }}>Import details</summary>
                <Box gap="small" margin={{ top: 'small' }}>
                    <Text size="small">{importItem.getDescription().replaceAll('|', ' ').replaceAll('₣', 'Bits')}</Text>
                </Box>
            </details>
        </ShadowBox>
    );
}

export function GamingUpgrades({ gaming }: { gaming: Gaming }) {
    return (
        <Box gap="medium">
            <GamingFertilizer gaming={gaming} />
            <Heading level="3" size="small" margin="none">Imports</Heading>
            <Grid columns={{ size: 'medium', count: 'fill' }} gap="medium" align="start">
                {gaming.imports.map(importItem => <ImportCard key={importItem.importId} importItem={importItem} gaming={gaming} />)}
            </Grid>
        </Box>
    );
}
