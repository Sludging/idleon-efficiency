import { useContext } from "react";
import { Box, Grid, Heading, Meter, ResponsiveContext, Text } from "grommet";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import { ImageData } from "../../../data/domain/imageData";
import { JellyOperator } from "../../../data/domain/world-7/jellyOperator";
import { commaNotation, nFormatter } from "../../../data/utility";

function Artwork({ data, size = 44 }: { data: ImageData, size?: number }) {
    const scale = Math.min(size / data.width, size / data.height);
    return <Box width={`${size}px`} height={`${size}px`} align="center" justify="center" flex={false}>
        <IconImage data={data} scale={scale} />
    </Box>;
}

export function JellyOverview({ jelly }: { jelly: JellyOperator }) {
    const small = useContext(ResponsiveContext) === 'small';
    const current = jelly.getCurrentObstruction();
    const next = jelly.getNextObstruction();
    const dpsMultiplier = jelly.getDPSBloodcellMultiplier();
    const bloodcellImage = JellyOperator.getBloodcellImageData();

    return <Box gap="medium">
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex']} gap="medium" align="stretch">
            <ShadowBox background="dark-1" pad="medium">
                <ComponentAndLabel label="Bloodcells" labelSize="xsmall" component={<Box>
                    <ResourceDisplay cost={jelly.bloodcells} resourceImageData={bloodcellImage} resourceImageScale={1} textSize="medium" showTooltip />
                </Box>} />
            </ShadowBox>
            <ShadowBox background="dark-1" pad="medium">
                <TextAndLabel label="Attempts remaining" labelSize="xsmall" text={`${jelly.attemptsRemaining} / ${jelly.dailyAllowance}`} textSize="medium" tooltip={<Text size="small">Wins return an attempt. The daily reset tops up to {jelly.dailyAllowance} and preserves surplus attempts.</Text>} />
            </ShadowBox>
            <ShadowBox background="dark-1" pad="medium">
                <TextAndLabel label="Cleared obstructions" labelSize="xsmall" text={`${jelly.getSuccessfulOperations()} / ${jelly.obstructions.length}`} textSize="medium" />
            </ShadowBox>
        </Grid>
        <Grid columns={small ? ['flex'] : ['flex', 'flex']} gap="medium" align="stretch">
            <ShadowBox background="dark-1" pad="medium" gap="small">
                <Heading level="3" size="small" margin="none" style={{ fontWeight: 'normal' }}>Current obstruction</Heading>
                {current ? <>
                    <Box direction="row" gap="small" align="center"><Artwork data={current.getImageData()} size={50} /><Text size="medium">{current.data.name}</Text></Box>
                    <Box direction="row" gap="large">
                        <Box><TextAndLabel label="Target HP" labelSize="xsmall" textSize="small" text={nFormatter(jelly.getCurrentTargetHP())} /></Box>
                        <Box><TextAndLabel label="Time limit" labelSize="xsmall" textSize="small" text={`${jelly.getCurrentTimeLimit()}s`} /></Box>
                    </Box>
                    <TextAndLabel label="Reward on clear" labelSize="xsmall" text={current.getBonusText()} textSize="small" />
                    {next && <Box direction="row" gap="small" align="center" margin={{ top: 'small' }} border={{ side: 'top', color: 'grey-1' }} pad={{ top: 'small' }}>
                        <Artwork data={next.getImageData()} size={32} /><Box><Text size="small">Next: {next.data.name}</Text><Text size="small" color="accent-2">{next.getBonusText()}</Text></Box>
                    </Box>}
                </> : <Text size="small">All obstructions cleared.</Text>}
            </ShadowBox>
            <Box gap="medium" alignSelf="stretch">
                <ShadowBox background="dark-1" pad="medium" flex={small ? false : 'grow'}>
                    <Grid columns={['flex', 'flex']} gap="small" align="center">
                        <Box><TextAndLabel label="Best recorded DPS" labelSize="xsmall" text={nFormatter(jelly.bestDPS)} textSize="medium" /></Box>
                        <Box gap="xxsmall">
                            <TextAndLabel label="Bloodcell gain boost" labelSize="xsmall" text={`${dpsMultiplier.toFixed(2)}x`} textSize="medium" />
                            <Text size="xsmall" color="accent-2">+{((dpsMultiplier - 1) * 100).toFixed(1)}% from DPS Biometrics</Text>
                        </Box>
                    </Grid>
                </ShadowBox>
                <ShadowBox background="dark-1" pad="medium" gap="small" flex={small ? false : 'grow'}>
                    <Text size="small">Daily Transfusion</Text>
                    <Grid columns={['flex', '16px', 'flex', '16px', 'flex']} gap="small" align="center">
                        <Box><TextAndLabel label="Best operation" labelSize="xsmall" textSize="small" text={nFormatter(jelly.bestOperationBloodcells)} /></Box>
                        <Text size="small" color="accent-2">×</Text>
                        <Box><TextAndLabel label="Rate" labelSize="xsmall" textSize="small" text={`${nFormatter(jelly.getDailyTransfusionPercentage())}%`} /></Box>
                        <Text size="small" color="accent-2">=</Text>
                        <ComponentAndLabel label="Daily login income" labelSize="xsmall" component={<Box>
                            <ResourceDisplay cost={jelly.getDailyBloodcells()} resourceImageData={bloodcellImage} resourceImageScale={0.75} textSize="small" showTooltip />
                        </Box>} />
                    </Grid>
                </ShadowBox>
            </Box>
        </Grid>
    </Box>;
}

export function JellyCells({ jelly }: { jelly: JellyOperator }) {
    const small = useContext(ResponsiveContext) === 'small';
    const cells = jelly.cells.filter(cell => cell.data.passiveDescription != null);
    return <Box gap="medium">
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="small" align="start">
            <TextAndLabel label="Unlocked cells" labelSize="xsmall" textSize="small" text={`${jelly.getUnlockedCellCount()} / ${cells.length}`} />
            <TextAndLabel label="Total cell levels" labelSize="xsmall" textSize="small" text={commaNotation(jelly.getTotalCellLevels())} />
            <TextAndLabel label="XP per landed hit" labelSize="xsmall" textSize="small" text={nFormatter(jelly.xpPerHit)} />
            <TextAndLabel label="Selected fever" labelSize="xsmall" textSize="small" text={jelly.selectedFever ? `${jelly.selectedFever.data.name} · ${jelly.selectedFever.data.description}` : 'None'} />
        </Grid>
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="small" align="start">
            <TextAndLabel label="Placed cell cores" labelSize="xsmall" textSize="small" text={commaNotation(cells.reduce((total, cell) => total + cell.placedCopies, 0))} />
            <TextAndLabel label="Unlocked tiles" labelSize="xsmall" textSize="small" text={commaNotation(jelly.unlockedTileCount)} />
            <TextAndLabel label="Purchased plots" labelSize="xsmall" textSize="small" text={commaNotation(jelly.purchasedPlotCount)} />
            <TextAndLabel label="Plot purchases left" labelSize="xsmall" textSize="small" text={commaNotation(jelly.plotPurchasesLeft)} />
        </Grid>
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {cells.map(cell => <ShadowBox key={cell.index} background="dark-1" pad="medium" gap="small" style={{ opacity: cell.unlocked ? 1 : 0.6 }}>
                <Box direction="row" gap="small" align="center">
                    <Artwork data={cell.getImageData()} size={36} />
                    <Box><Text size="small">{cell.data.name}</Text><Text size="small" color="accent-2">{cell.unlocked ? `LV ${cell.level}` : 'Locked'}</Text></Box>
                </Box>
                <Box gap="xsmall">
                    <Box direction="row" justify="between" gap="small" wrap><Text size="xsmall" color="accent-2">XP</Text><Text size="small">{commaNotation(cell.xp)} / {commaNotation(cell.getXPRequired())}</Text></Box>
                    <Meter type="bar" size="full" thickness="xsmall" values={[{ value: Math.min(100, cell.xp / cell.getXPRequired() * 100), color: 'brand' }]} aria-label={`${cell.data.name} XP toward next level`} />
                </Box>
                <Box direction="row" justify="between" gap="small">
                    <Text size="small">{cell.placedCopies} placed</Text>
                    <Text size="small" color="accent-2">{cell.data.tileCount} {cell.data.tileCount === 1 ? 'tile' : 'tiles'}</Text>
                </Box>
                <TextAndLabel label="Passive" labelSize="xsmall" textSize="small" text={cell.data.passiveDescription ?? 'None'} />
            </ShadowBox>)}
        </Grid>
    </Box>;
}

export function JellyUpgrades({ jelly }: { jelly: JellyOperator }) {
    const small = useContext(ResponsiveContext) === 'small';
    return <Box gap="medium">
        <Box gap="small">
            {[...jelly.upgrades].sort((a, b) => a.data.displayIndex - b.data.displayIndex).map(upgrade => {
                const flavor = upgrade.data.maxLevel === 0;
                const unlimited = upgrade.data.maxLevel > 998;
                const maxed = !flavor && upgrade.isMaxed();
                const locked = !upgrade.isAvailable();
                return <ShadowBox key={upgrade.index} background="dark-1" pad="medium" style={{ opacity: locked || flavor ? 0.6 : 1 }}>
                    <Grid columns={small ? ['flex'] : ['minmax(0, 1.3fr)', 'minmax(0, 2.4fr)', 'minmax(0, 0.6fr)', 'minmax(0, 1fr)']} gap="small" align="start" fill style={{ overflowWrap: 'anywhere' }}>
                        <Box direction="row" gap="small" align="start" style={{ minWidth: 0 }}>
                            <Artwork data={upgrade.getImageData()} size={44} />
                            <TextAndLabel label="Name" labelSize="xsmall" textSize="small" text={upgrade.data.name} />
                        </Box>
                        <ComponentAndLabel label="Description" labelSize="xsmall" component={
                            <Text size="xsmall" style={{ whiteSpace: 'pre-line' }}>{upgrade.getDescription()}</Text>
                        } />
                        <Box><TextAndLabel label="Level" labelSize="xsmall" text={flavor ? '—' : unlimited ? String(upgrade.level) : `${upgrade.level} / ${upgrade.data.maxLevel}`} textSize="small" /></Box>
                        <ComponentAndLabel label={upgrade.level === 0 ? 'Unlock cost' : 'Next level cost'} labelSize="xsmall" component={
                            maxed || flavor ? <Text size="small">{maxed ? 'Maxed' : 'Not purchasable'}</Text> :
                                <Box><ResourceDisplay cost={upgrade.getUpgradeCost()} resourceImageData={JellyOperator.getBloodcellImageData()} resourceImageScale={0.75} textSize="small" canAfford={!locked && jelly.canAffordUpgrade(upgrade.index)} showTooltip /></Box>
                        } />
                    </Grid>
                </ShadowBox>;
            })}
        </Box>
    </Box>;
}

export function JellyObstructions({ jelly }: { jelly: JellyOperator }) {
    const current = jelly.getCurrentObstruction();
    return <Box gap="medium">
        <Grid columns={['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {jelly.obstructions.map(obstruction => {
                const state = obstruction.completed ? 'completed' : obstruction.index === current?.index ? 'current' : 'upcoming';
                return <ShadowBox key={obstruction.index} background="dark-1" pad="medium" style={{ opacity: state === 'upcoming' ? 0.6 : 1 }}>
                    <Box direction="row" gap="small" align="start">
                        <Artwork data={obstruction.getImageData()} size={40} />
                        <Box gap="xsmall">
                            <Text size="small">{obstruction.data.name}</Text>
                            <Text size="xsmall" color={state === 'current' ? 'brand' : 'accent-2'}>{state === 'completed' ? 'Earned' : state === 'current' ? 'Current' : 'Upcoming'}</Text>
                            <Text size="small">{obstruction.getBonusText()}</Text>
                        </Box>
                    </Box>
                </ShadowBox>;
            })}
        </Grid>
    </Box>;
}
