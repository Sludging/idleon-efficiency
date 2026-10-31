'use client';

import { Box, Grid, Text } from 'grommet';
import RoundedShadowBox from '../../../components/base/RoundedShadowBox';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import type { IslandExpeditions } from '../../../data/domain/world-2/islandExpedition';
import { commaNotation, notateNumber } from '../../../data/utility';
import { EffectPreview, GreyCardHeader, IslandCost, IslandResourceAmount, RewardCard } from './presentation';

const shimmerImage = { location: 'ShimmerCurrency', width: 17, height: 16 };

type IslandDetailsProps = { expeditions: IslandExpeditions };

export function CrystalDetails({ expeditions }: IslandDetailsProps) {
    const crystal = expeditions.crystal;

    return <Box gap="medium">
        <Box background="dark-1" pad="medium" gap="small">
            <Box direction="row" align="center" wrap gap="large">
                <TextAndLabel label="Pending days" text={`${commaNotation(crystal.unclaimedDays)} / ${commaNotation(crystal.dayCap)}`} textSize="large" />
                <TextAndLabel label="Mobs waiting" text={commaNotation(crystal.mobsWaiting)} textSize="large" />
            </Box>
            <Text size="small" color="accent-2">Collect before 14 days. Reaching the cap reduces waiting Crystal mobs.</Text>
        </Box>
    </Box>;
}

export function ShimmerDetails({ expeditions }: IslandDetailsProps) {
    const shimmer = expeditions.shimmer;
    const trial = shimmer.currentTrial;
    const digitScore = trial.data.description.includes('number of digits');

    return <Box gap="medium">
        <Box direction="row" align="center" wrap gap="large">
            <ComponentAndLabel label="Shimmer" component={<IslandResourceAmount image={shimmerImage} amount={shimmer.currency} textSize="xxlarge" />} />
            <TextAndLabel label="Best-ever Dummy Target DPS" text={notateNumber(expeditions.dummyTargetBestDPS, 'Smaller')} textSize="large" />
        </Box>
        <RoundedShadowBox pad="none" overflow="hidden" style={{ border: '1px solid #e1b454', background: '#29271f' }}>
            <GreyCardHeader background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                <Text size="small" weight="bold">Current challenge</Text>
            </GreyCardHeader>
            <Box pad="medium" gap="small">
                <Text size="small">{trial.data.description}</Text>
                <Box direction="row" align="center" wrap gap="medium">
                    <TextAndLabel label={digitScore ? 'Target score' : 'Target'} text={commaNotation(trial.data.threshold)} textSize="small" />
                    <TextAndLabel label={digitScore ? 'Weekly best (digits)' : 'Weekly best'} text={commaNotation(shimmer.trialBest)} textSize="small" />
                    <ComponentAndLabel label={shimmer.rewardClaimed ? 'Claimed reward' : 'Reward to claim'}
                        component={<IslandResourceAmount image={shimmerImage} amount={shimmer.trialReward} />} labelSize="small" />
                </Box>
            </Box>
        </RoundedShadowBox>
        <Grid columns={['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {shimmer.bonuses.map(bonus => {
                const [template, name] = bonus.data.description.split(',');
                const current = template.replace('{', notateNumber(bonus.getBonus(), 'Small'));
                const next = template.replace('{', notateNumber(bonus.getBonus(bonus.baseBonus + 1), 'Small'));

                return <RewardCard key={bonus.index} name={name}>
                    <Text size="xsmall" color="accent-2">Level {commaNotation(bonus.baseBonus)}</Text>
                    <EffectPreview current={current} next={next} />
                    <IslandCost image={shimmerImage} amount={bonus.getNextCost()} />
                </RewardCard>;
            })}
        </Grid>
    </Box>;
}

export function FractalDetails({ expeditions }: IslandDetailsProps) {
    const fractal = expeditions.fractal;

    return <Box gap="medium">
        <TextAndLabel label="Nothing AFK hours" text={commaNotation(fractal.afkHours)} textSize="large" />
        <Grid columns={['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {fractal.rewards.map(reward => <RoundedShadowBox key={reward.index} background="dark-1" pad="none" overflow="hidden"
                style={{ opacity: fractal.isBonusUnlocked(reward.index) ? 1 : 0.5, display: 'grid', gridRow: 'span 2', gridTemplateRows: 'subgrid', rowGap: 0 }}>
                <GreyCardHeader background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Text size="small" weight="bold">{commaNotation(reward.data.requiredHours)} Nothing AFK hours</Text>
                </GreyCardHeader>
                <Box pad="medium">
                    <Text size="small">{reward.data.description}</Text>
                </Box>
            </RoundedShadowBox>)}
        </Grid>
    </Box>;
}
