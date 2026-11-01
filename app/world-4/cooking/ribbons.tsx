import { Box, Grid, Text } from 'grommet';
import type { ReactNode } from 'react';
import IconImage from '../../../components/base/IconImage';
import TipDisplay from '../../../components/base/TipDisplay';
import type {
    Cooking as CookingDomain,
    CookingDailyCountBreakdown,
    CookingDailyRankBreakdown,
} from '../../../data/domain/world-4/cooking';
import { commaNotation, notateNumber } from '../../../data/utility';

const quantitySourceLabels: Record<CookingDailyCountBreakdown['sources'][number]['source'], string> = {
    base: 'Base',
    dailyRoll: 'Daily random roll',
    legendTalent: 'Legend Talents',
    eventShop: 'Event Shop — Ribbon Connoisseur',
    deathBringerBundle: 'Death Bringer bundle',
    boaringBundle: 'Boaring bundle',
    ribbonWinningTalent: 'Death Bringer — Ribbon Winning',
    palette: 'Gaming Palette',
};

const rankSourceLabels: Record<CookingDailyRankBreakdown['sources'][number]['source'], string> = {
    base: 'Base',
    grimoire: 'Ribbon rolls — Grimoire and Death Bringer bundle',
    sushi: 'Sushi — Tobiko Maki',
    anniversaryBundle: 'Anniversary bundle',
    smoky: 'Cooking Mastery — Smoky',
    armoryEventShop: 'Royal Armory and Event Shop — Elegant Ribbons',
    companion: 'Companion',
};

const amount = (value: number) => notateNumber(value, 'Smaller');
const exact = (value: number) => String(value);
const signed = (value: number) => `${value >= 0 ? '+' : ''}${amount(value)}`;

function probabilityLabel(probability: number): string {
    const percent = probability * 100;
    return percent > 0 && percent < 0.01 ? '<0.01%' : `${amount(percent)}%`;
}

function Metric({ label, value, prominent = false, children }: {
    label: string;
    value: string;
    prominent?: boolean;
    children?: ReactNode;
}) {
    return <Box gap="xxsmall">
        {children
            ? <TipDisplay heading={label} size="small" maxWidth="620px" body={
                <Box gap="small" style={{ maxHeight: '40vh', overflowY: 'auto', overflowWrap: 'anywhere' }}>
                    {children}
                </Box>
            }>
                <Text tabIndex={0} size={prominent ? 'xxlarge' : 'large'} weight={400}
                    style={{ textDecoration: 'underline dotted', textUnderlineOffset: '4px', cursor: 'help' }}>
                    {value}
                </Text>
            </TipDisplay>
            : <Text size={prominent ? 'xxlarge' : 'large'} weight={400}>{value}</Text>}
        <Text size="xsmall" color="accent-2">{label}</Text>
    </Box>;
}

function EquippedRank({ cooking, rank, label }: { cooking: CookingDomain; rank: number | null; label: string }) {
    if (rank === null) return <Metric label={label} value="—" />;

    const summary = cooking.ribbons.rankSummaries.find(entry => entry.rank === rank)!;
    return <Box direction="row" align="center" gap="xsmall">
        <IconImage data={cooking.ribbons.getImageData(rank)} scale={0.8} />
        <Box gap="xxsmall">
            <Box direction="row" align="baseline" gap="xsmall">
                <Text size="large" weight={400}>{commaNotation(rank)}</Text>
                <Text size="small">×{amount(summary.multiplier)}</Text>
            </Box>
            <Text size="xsmall" color="accent-2">{label}</Text>
        </Box>
    </Box>;
}

function QuantityDetails({ cooking }: { cooking: CookingDomain }) {
    const quantity = cooking.ribbons.dailyQuantity;
    const breakdown = quantity.dailyCountBreakdown;

    return <>
        <Grid columns={['minmax(0, 1fr)', 'minmax(0, 1fr)']} gap="medium">
            <Box gap="xsmall">
                <Text size="xsmall" weight="bold">Base sources</Text>
                <Box gap="xxsmall">
                    {breakdown.sources.filter(source => source.group === 'base').map(source => <Text
                        key={source.source} size="xsmall" style={{ opacity: source.active ? 1 : 0.6 }}>
                        {quantitySourceLabels[source.source]}: {signed(source.amount)} / day{!source.active && ' (Inactive)'}
                    </Text>)}
                </Box>
                <Text size="xsmall">Meritocracy: ×{amount(breakdown.meritocracyMultiplier)} to base sources only.</Text>
            </Box>
            <Box gap="xsmall">
                <Text size="xsmall" weight="bold">Additional sources</Text>
                <Box gap="xxsmall">
                    {breakdown.sources.filter(source => source.group === 'additional').map(source => <Text
                        key={source.source} size="xsmall" style={{ opacity: source.active ? 1 : 0.6 }}>
                        {quantitySourceLabels[source.source]}: {signed(source.amount)} / day{!source.active && ' (Inactive)'}
                    </Text>)}
                </Box>
            </Box>
        </Grid>
        {cooking.ribbons.dailyGenerationUnlocked && <Text size="xsmall">
            Average after rounding: {exact(quantity.dailyCount)} ribbons/day.
        </Text>}
    </>;
}

function RankDetails({ cooking }: { cooking: CookingDomain }) {
    const breakdown = cooking.ribbons.dailyRankBreakdown;

    return <>
        <Box gap="xsmall">
            <Text size="xsmall" weight="bold">Average rank additions</Text>
            <Box gap="xxsmall">
                {breakdown.sources.map(source => <Text key={source.source} size="xsmall"
                    style={{ opacity: source.active ? 1 : 0.6 }}>
                    {rankSourceLabels[source.source]}: {signed(source.amount)}{!source.active && ' (Inactive)'}
                </Text>)}
            </Box>
        </Box>
        <Text size="xsmall">Daily rolls above rank 20 become rank 2.</Text>
    </>;
}

export default function CookingRibbonsPanel({ cooking }: { cooking: CookingDomain }) {
    const ribbons = cooking.ribbons;
    const quantity = ribbons.dailyQuantity;
    const probabilities = ribbons.dailyRankProbabilities.filter(entry => entry.probability > 0)
        .sort((left, right) => left.rank - right.rank);
    const occupiedSlots = ribbons.shelf.filter(slot => slot.rank !== null).length;
    const mealsWithoutRibbons = ribbons.mealCount - ribbons.ribbonedMealCount;

    return <Box gap="medium" margin={{ top: 'medium' }}>
        <Box direction="row" wrap gap="medium">
            <Box gap="small">
                <Box direction="row" align="center" gap="xsmall" height="32px">
                    <IconImage data={ribbons.getImageData(ribbons.highestRank ?? 1)} scale={0.65} />
                    <Text size="small">Equipped ribbons</Text>
                </Box>
                <Box direction="row" align="center" wrap gap="medium">
                    <Metric label="Total equipped ranks" value={commaNotation(ribbons.totalRanks)} prominent />
                    <Metric label="Meals with ribbons" value={`${commaNotation(ribbons.ribbonedMealCount)} / ${commaNotation(ribbons.mealCount)}`} />
                    <EquippedRank cooking={cooking} rank={ribbons.lowestRank} label="Lowest equipped rank" />
                    <EquippedRank cooking={cooking} rank={ribbons.highestRank} label="Highest equipped rank" />
                </Box>
            </Box>
            <Box gap="small" border={{ side: 'left', color: 'grey-1' }} pad={{ left: 'medium' }}>
                <Box direction="row" align="center" gap="xsmall" height="32px">
                    <IconImage data={ribbons.getImageData(1)} scale={0.65} />
                    <Text size="small">Daily ribbons</Text>
                </Box>
                <Box direction="row" align="baseline" wrap gap="medium">
                    <Metric label="Average ribbons / day" value={amount(quantity.dailyCount)} prominent>
                        <QuantityDetails cooking={cooking} />
                    </Metric>
                    <Metric label="Daily range"
                        value={`${commaNotation(quantity.minimumDailyCount)}–${commaNotation(quantity.maximumDailyCount)}`} />
                    {ribbons.dailyGenerationUnlocked && <Metric label="Average rank" value={amount(ribbons.averageDailyRank)}>
                        <RankDetails cooking={cooking} />
                    </Metric>}
                </Box>
                {!ribbons.dailyGenerationUnlocked && <Text size="xsmall" color="accent-2">
                    Unlock with Grimoire — Ribbon Winning, Event Shop — Ribbon Connoisseur, Death Bringer bundle, or Boaring bundle.
                </Text>}
            </Box>
        </Box>
        <Box gap="small" border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'medium' }}>
            <Text size="small">Meals by ribbon rank</Text>
            <Grid columns={{ count: 'fit', size: '150px' }} gap="small">
                {mealsWithoutRibbons > 0 && <Box justify="center" gap="xxsmall" pad="xsmall">
                    <Text size="small">No ribbon</Text>
                    <Text size="xsmall">{commaNotation(mealsWithoutRibbons)} meals</Text>
                </Box>}
                {ribbons.rankSummaries.map(summary => <Box key={summary.rank}
                    direction="row" align="center" gap="xsmall" pad="xsmall" style={{ opacity: summary.mealCount === 0 ? 0.5 : 1 }}>
                    <IconImage data={ribbons.getImageData(summary.rank)} scale={0.8} />
                    <Box gap="xxsmall">
                        <Text size="small">Rank {commaNotation(summary.rank)}</Text>
                        <Text size="xsmall" color={summary.mealCount > 0 ? undefined : 'accent-2'}>
                            {commaNotation(summary.mealCount)} {summary.mealCount === 1 ? 'meal' : 'meals'} · ×{amount(summary.multiplier)}
                        </Text>
                    </Box>
                </Box>)}
            </Grid>
        </Box>
        <Box gap="small" border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'medium' }}>
            <Box direction="row" align="baseline" wrap gap="small">
                <Text size="small">Ribbon shelf</Text>
                <Text size="small">{commaNotation(occupiedSlots)} / {commaNotation(ribbons.shelf.length)} occupied</Text>
                {occupiedSlots === ribbons.shelf.length && <Text size="xsmall" color="accent-2">Full</Text>}
                {!ribbons.unlocked && <Text size="xsmall" color="accent-2">Locked</Text>}
            </Box>
            <Grid columns={{ count: 'fit', size: '76px' }} gap="small">
                {ribbons.shelf.map(slot => <Box key={slot.index} background="dark-1"
                    pad="xsmall" align="center" justify="center" gap="xxsmall"
                    aria-label={`Slot ${slot.index + 1}: ${slot.rank === null ? 'Empty' : `Rank ${slot.rank}`}`}>
                    {slot.rank === null
                        ? <Box height="41px" justify="center"><Text size="xsmall" color="accent-2">Empty</Text></Box>
                        : <>
                            <IconImage data={ribbons.getImageData(slot.rank)} />
                            <Text size="xsmall">Rank {commaNotation(slot.rank)}</Text>
                        </>}
                </Box>)}
            </Grid>
        </Box>
        {ribbons.dailyGenerationUnlocked && <Box gap="small"
            border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'medium' }}>
            <Box direction="row" align="baseline" wrap gap="small">
                <Text size="small">Daily ribbon ranks</Text>
                <Text size="xsmall" color="accent-2">Chance per ribbon</Text>
            </Box>
            <Grid columns={{ count: 'fit', size: '120px' }} gap="small">
                {probabilities.map(entry => <Box key={entry.rank} direction="row" align="center" gap="xsmall" pad="xsmall">
                    <IconImage data={ribbons.getImageData(entry.rank)} scale={0.8} />
                    <Box gap="xxsmall">
                        <Text size="xsmall" color="accent-2">Rank {commaNotation(entry.rank)}</Text>
                        <Text size="small">{probabilityLabel(entry.probability)}</Text>
                    </Box>
                </Box>)}
            </Grid>
        </Box>}
    </Box>;
}
