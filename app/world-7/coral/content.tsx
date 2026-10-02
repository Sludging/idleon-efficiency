"use client"

import { Anchor, Box, Grid, Heading, ResponsiveContext, Text } from 'grommet'
import { useContext } from 'react'
import type { ReactNode } from 'react'
import { useShallow } from 'zustand/react/shallow'
import ShadowBox from '../../../components/base/ShadowBox'
import IconImage from '../../../components/base/IconImage'
import TipDisplay from '../../../components/base/TipDisplay'
import { Item } from '../../../data/domain/items'
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel'
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider'
import { CoralReef } from '../../../data/domain/world-7/coralReef'
import { DancingCoral } from '../../../data/domain/world-7/dancingCoral'
import { Construction } from '../../../data/domain/world-3/construction/construction'
import { notateNumber } from '../../../data/utility'

const formatNumber = (value: number | undefined, notation: 'Whole' | 'Smaller' = 'Smaller') =>
    Number.isFinite(value) ? notateNumber(value as number, notation) : 'Unavailable'


function Metric({ label, value, tooltip }: { label: string, value: string, tooltip?: ReactNode }) {
    return (
        <ShadowBox background="dark-1" pad="small">
            <TextAndLabel label={label} text={value} textSize="small" labelSize="xsmall" tooltip={tooltip} />
        </ShadowBox>
    )
}

function DailyGainBreakdown({ reef }: { reef: CoralReef }) {
    const breakdown = reef.dailyCoralGainBreakdown
    if (!breakdown) return undefined

    return (
        <Box gap="xsmall">
            <Text size="xsmall">Base: {formatNumber(breakdown.base)} Coral per day</Text>
            {breakdown.multipliers.map((bonus, index) => (
                <Text key={`multiplier-${index}`} size="xsmall">{bonus.label}: ×{formatNumber(bonus.factor)}</Text>
            ))}
            {breakdown.additiveBonuses.map((bonus, index) => (
                <Text key={`additive-${index}`} size="xsmall">{bonus.label}: +{formatNumber(bonus.percent)}%</Text>
            ))}
        </Box>
    )
}

function CoralContent() {
    const size = useContext(ResponsiveContext)
    const summaryColumnCount = size === 'small' ? 1 : size === 'medium' ? 2 : 4
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ))
    const reef = theData.get('coralReef') as CoralReef
    const dancingCoral = theData.get('dancingCoral') as DancingCoral
    const construction = theData.get('construction') as Construction

    const reefUpgrades = reef.upgrades.filter(upgrade => !upgrade.data.desc.endsWith('...'))
    const dancingBonuses = dancingCoral.bonuses.filter(bonus => bonus.data.desc !== '+{% who knows')
    const unlockedCount = reefUpgrades.filter(upgrade => upgrade.unlocked).length
    const purchasedCount = dancingBonuses.filter(bonus => bonus.purchased).length

    return (
        <Box width="100%" pad={{ vertical: 'small' }} gap="medium">
            <Box gap="xsmall" margin={{ top: '16px' }}>
                <Heading level="2" size="medium" margin="none" style={{ fontWeight: 'normal' }}>Coral Reef &amp; Dancing Coral</Heading>
                <Text size="small">Track Reef Coral production and shrine bonuses; rows with placeholder or filler catalog descriptions are hidden.</Text>
            </Box>

            <Box as="section" gap="small" aria-labelledby="coral-summary-heading">
                <Heading id="coral-summary-heading" level="2" size="small" margin="none" style={{ fontWeight: 'normal' }}>Your progress</Heading>
                <Grid columns={{ count: summaryColumnCount, size: 'auto' }} gap="small">
                    <ShadowBox background="dark-1" pad="small">
                        <ComponentAndLabel
                            label="Reef Coral held"
                            labelSize="xsmall"
                            component={
                                <Box direction="row" gap="xsmall" align="center">
                                    <IconImage data={CoralReef.getCoralImageData()} scale={0.6} />
                                    <Text size={size === 'small' ? 'xsmall' : 'small'}>{formatNumber(reef.ownedCoral, 'Whole')}</Text>
                                </Box>
                            }
                        />
                    </ShadowBox>
                    <Metric label="Daily Reef Coral" value={`${formatNumber(reef.dailyCoralGains)} / day`} tooltip={reef.dailyCoralGainBreakdown ? <DailyGainBreakdown reef={reef} /> : undefined} />
                    <Metric label="Reef upgrades unlocked" value={`${unlockedCount} / ${reefUpgrades.length}`} />
                    <Metric label="Dancing Coral purchased" value={`${purchasedCount} / ${dancingBonuses.length}`} />
                </Grid>
            </Box>

            <Box as="section" gap="small" aria-labelledby="reef-heading">
                <Box gap="xsmall">
                    <Heading id="reef-heading" level="2" size="small" margin="none" style={{ fontWeight: 'normal' }}>Coral Reef</Heading>
                    <Text size="xsmall">Parsed Reef data does not include unlock requirements.</Text>
                </Box>
                <Box gap="xsmall">
                    {reefUpgrades.map(upgrade => {

                        const maxLevel = upgrade.getMaxLevel()
                        const maxed = upgrade.isMaxed()
                        const nextLevelCost = upgrade.getNextLevelCost()
                        const saved = reef.ownedCoral
                        const affordable = reef.canAffordUpgrade(upgrade.index)
                        const days = reef.getDaysUntilNextLevel(upgrade.index)

                        return (
                            <ShadowBox key={upgrade.index} background="dark-1" direction="row" pad="medium" gap="small" align="center" style={{ opacity: upgrade.unlocked ? 1 : 0.6 }}>
                                <Grid
                                    columns={size === 'small'
                                        ? '100%'
                                        : ['minmax(0, 3fr)', 'minmax(80px, 1fr)', 'minmax(100px, 1.2fr)', 'minmax(0, 2fr)']}
                                    gap="small"
                                    align="center"
                                    fill
                                >
                                    <Box direction="row" gap="small" align="center">
                                        <Box
                                            flex={false}
                                            role="img"
                                            aria-label={`Reef upgrade ${upgrade.level > 0 ? 'owned' : 'not owned'}`}
                                            title={upgrade.level > 0 ? 'Owned' : 'Not owned'}
                                        >
                                            <IconImage data={upgrade.getImageData()} scale={0.5} />
                                        </Box>
                                        <TextAndLabel label="Effect" text={upgrade.getBonusText()} textSize="xsmall" labelSize="xsmall" />
                                    </Box>
                                    <TextAndLabel label="Level" text={`${formatNumber(upgrade.level, 'Whole')}${maxLevel !== undefined ? ` / ${formatNumber(maxLevel, 'Whole')}` : ''}`} textSize="small" labelSize="xsmall" />
                                    <TextAndLabel label="Status" text={!upgrade.unlocked ? 'Locked' : maxed ? 'Maxed' : 'Unlocked'} textSize="small" labelSize="xsmall" />
                                    <Box gap="xxsmall">
                                        {maxed
                                            ? <Text size="xsmall">Maximum level reached; no next-level cost.</Text>
                                            : !upgrade.unlocked
                                                ? <TextAndLabel
                                                    label="First-level cost after unlock"
                                                    text={nextLevelCost === undefined ? 'Unavailable' : `${formatNumber(nextLevelCost, 'Whole')} Coral`}
                                                    textSize="small"
                                                    labelSize="xsmall"
                                                />
                                                : nextLevelCost !== undefined
                                                    ? <>
                                                        <TextAndLabel label="Next level cost" text={`${formatNumber(nextLevelCost, 'Whole')} Coral`} textSize="small" labelSize="xsmall" />
                                                        <TextAndLabel label="Saved toward cost" text={`${formatNumber(saved, 'Whole')} / ${formatNumber(nextLevelCost, 'Whole')} Coral`} textSize="small" labelSize="xsmall" />
                                                        {affordable
                                                            ? <Text size="xsmall">Ready</Text>
                                                            : days !== undefined
                                                                ? <Text size="xsmall">Estimated time: {formatNumber(days, 'Whole')} {days === 1 ? 'day' : 'days'} assuming the daily rate stays constant</Text>
                                                                : <Text size="xsmall">No ETA: daily Coral rate is zero or unavailable.</Text>}
                                                    </>
                                                    : <Text size="xsmall">Next-level cost unavailable.</Text>}
                                    </Box>
                                </Grid>
                            </ShadowBox>
                        )
                    })}
                </Box>
            </Box>

            <Box as="section" gap="small" aria-labelledby="dancing-heading">
                <Box gap="xsmall">
                    <Heading id="dancing-heading" level="2" size="small" margin="none" style={{ fontWeight: 'normal' }}>Dancing Coral</Heading>
                    <Text size="xsmall">Unpurchased rows show their coral cost with its icon.</Text>
                </Box>
                <Box gap="xsmall">
                    {dancingBonuses.map(bonus => {
                        const shrineIndex = 18 + bonus.index
                        const shrine = construction.buildings.find(building => building.index === shrineIndex)

                        return (
                            <ShadowBox key={bonus.index} background="dark-1" direction="row" pad="medium" gap="small" align="center" style={{ opacity: bonus.purchased ? 1 : 0.5 }}>
                                <Grid
                                    columns={size === 'small'
                                        ? '100%'
                                        : ['minmax(0, 2fr)', 'minmax(110px, 1fr)', 'minmax(120px, 1fr)']}
                                    gap="small"
                                    align="center"
                                    fill
                                >
                                    <Box direction="row" gap="small" align="center">
                                        {shrine && (
                                            <Anchor href="/world-3/construction">
                                                <TipDisplay heading={shrine.name} size="small">
                                                    <Box><IconImage data={shrine.getImageData()} scale={0.7} /></Box>
                                                </TipDisplay>
                                            </Anchor>
                                        )}
                                        <TextAndLabel
                                            label="Effect"
                                            text={bonus.getBonusText().replace(/_/g, ' ')}
                                            textSize="xsmall"
                                            labelSize="xsmall"
                                        />
                                    </Box>
                                    <Box direction="row" gap="small" wrap>
                                        <TextAndLabel label="Shrine level" text={`${formatNumber(bonus.shrineLevel)}/${dancingCoral.maxShrineLevel}`} textSize="small" labelSize="xsmall" />
                                        {bonus.purchased && <TextAndLabel label="Current bonus" text={`${formatNumber(bonus.getBonus())}%`} textSize="xsmall" labelSize="xsmall" />}
                                    </Box>
                                    <Box direction="row" gap="xsmall" align="center">
                                        {!bonus.purchased && (
                                            <ComponentAndLabel
                                                label="Purchase cost"
                                                labelSize="xsmall"
                                                component={
                                                    <Box direction="row" gap="xsmall" align="center">
                                                        <TipDisplay heading={bonus.data.name} size="small">
                                                            <Box><IconImage data={Item.getImageData(`Coral${bonus.index}`)} scale={0.7} /></Box>
                                                        </TipDisplay>
                                                        <Text size="small">{formatNumber(bonus.getCost(), 'Whole')}</Text>
                                                    </Box>
                                                }
                                            />
                                        )}
                                    </Box>
                                </Grid>
                            </ShadowBox>
                        )
                    })}
                </Box>
            </Box>
        </Box>
    )
}

export default CoralContent
