import { useContext } from "react";
import { Box, Grid, Meter, ResponsiveContext, Text } from "grommet";
import type { ThemeType } from "grommet";
import { normalizeColor } from "grommet/utils";
import styled from "styled-components";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import { ImageData } from "../../../data/domain/imageData";
import { JellyOperator } from "../../../data/domain/world-7/jellyOperator";
import { commaNotation, nFormatter } from "../../../data/utility";

const CardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

const CellSummaryStrip = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 24px;
    border-top: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    border-bottom: 1px solid ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
    padding: 12px 0;
`;

const CellSummaryGroup = styled.div`
    display: flex;
    align-items: stretch;
    flex-wrap: wrap;
    gap: 32px;
    min-width: 0;
`;

const CellSummaryMetric = styled.div`
    display: flex;
    min-width: 92px;
    flex-direction: column;
    gap: 4px;
`;

const CellSummaryDivider = styled.div`
    width: 1px;
    background: ${({ theme }: { theme: ThemeType }) => normalizeColor('grey-1', theme)};
`;

function Artwork({ data, size = 44 }: { data: ImageData, size?: number }) {
    const scale = Math.min(size / data.width, size / data.height);
    return <Box width={`${size}px`} height={`${size}px`} align="center" justify="center" flex={false}>
        <IconImage data={data} scale={scale} />
    </Box>;
}

export function JellyCells({ jelly }: { jelly: JellyOperator }) {
    const small = useContext(ResponsiveContext) === 'small';
    const cells = jelly.cells.filter(cell => cell.data.passiveDescription != null);
    const summaryGroups = [
        [
            { label: 'Cells unlocked', value: `${jelly.getUnlockedCellCount()} / ${cells.length}` },
            { label: 'Total cell levels', value: commaNotation(jelly.getTotalCellLevels()) },
            { label: 'Cores placed', value: commaNotation(cells.reduce((total, cell) => total + cell.placedCopies, 0)) },
            { label: 'XP per landed hit', value: nFormatter(jelly.xpPerHit) },
        ],
        [
            { label: 'Tiles unlocked', value: commaNotation(jelly.unlockedTileCount) },
            { label: 'Plots purchased', value: commaNotation(jelly.purchasedPlotCount) },
            { label: 'Plots remaining', value: commaNotation(jelly.plotPurchasesLeft) },
        ],
    ];

    return <Box gap="medium">
        <CellSummaryStrip>
            {summaryGroups.map((group, groupIndex) => <CellSummaryGroup key={groupIndex}>
                {groupIndex > 0 && <CellSummaryDivider aria-hidden="true" />}
                {group.map(metric => <CellSummaryMetric key={metric.label}>
                    <Text size="medium" weight={600}>{metric.value}</Text>
                    <Text size="xsmall" color="accent-2">{metric.label}</Text>
                </CellSummaryMetric>)}
            </CellSummaryGroup>)}
            <CellSummaryGroup>
                <CellSummaryDivider aria-hidden="true" />
                <CellSummaryMetric>
                    <Text size="medium" weight={600}>{jelly.selectedFever?.data.name ?? 'None'}</Text>
                    <Text size="xsmall" color="accent-2">
                        {jelly.selectedFever?.data.description.replace(/^\{/, '') ?? 'No fever selected'}
                    </Text>
                </CellSummaryMetric>
            </CellSummaryGroup>
        </CellSummaryStrip>
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {cells.map(cell => <RoundedShadowBox key={cell.index} background="dark-1" pad="none" gap="none" overflow="hidden" style={cell.unlocked ? undefined : { borderStyle: 'dashed', opacity: 0.6 }}>
                <CardHeader direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                    <Artwork data={cell.getImageData()} size={36} />
                    <Box><Text size="small" weight="bold">{cell.data.name}</Text><Text size="xsmall" color="accent-2">{cell.unlocked ? `LV ${cell.level}` : 'Locked'}</Text></Box>
                </CardHeader>
                <Box pad="medium" gap="small">
                    <Box gap="xsmall">
                        <Box direction="row" justify="between" gap="small" wrap><Text size="xsmall" color="accent-2">XP</Text><Text size="small">{commaNotation(cell.xp)} / {commaNotation(cell.getXPRequired())}</Text></Box>
                        <Meter type="bar" size="full" thickness="xsmall" values={[{ value: Math.min(100, cell.xp / cell.getXPRequired() * 100), color: 'brand' }]} aria-label={`${cell.data.name} XP toward next level`} />
                    </Box>
                    <Box direction="row" justify="between" gap="small">
                        <TextAndLabel label="Placed" labelSize="xsmall" textSize="small" text={String(cell.placedCopies)} />
                        <TextAndLabel label="Size" labelSize="xsmall" textSize="small" text={`${cell.data.tileCount} ${cell.data.tileCount === 1 ? 'tile' : 'tiles'}`} />
                    </Box>
                    <Box background={{ color: 'grey-1', opacity: 0.5 }} pad="small" gap="small" round="small">
                        <TextAndLabel label="Passive effect" labelSize="xsmall" textSize="small" text={cell.data.passiveDescription ?? 'None'} />
                    </Box>
                </Box>
            </RoundedShadowBox>)}
        </Grid>
    </Box>;
}

export function JellyObstructions({ jelly }: { jelly: JellyOperator }) {
    const small = useContext(ResponsiveContext) === 'small';
    const current = jelly.getCurrentObstruction();
    return <Box gap="medium">
        <Grid columns={small ? ['flex'] : ['flex', 'flex', 'flex', 'flex']} gap="medium" align="stretch">
            {jelly.obstructions.map(obstruction => {
                const state = obstruction.completed ? 'completed' : obstruction.index === current?.index ? 'current' : 'upcoming';
                const style = state === 'current'
                    ? { border: '1px solid #e1b454', background: '#29271f' }
                    : undefined;
                return <RoundedShadowBox key={obstruction.index} background="dark-1" pad="none" gap="none" overflow="hidden" style={{ ...style, opacity: state === 'upcoming' ? 0.76 : 1 }}>
                    <CardHeader direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: 'medium', vertical: 'small' }}>
                        <Artwork data={obstruction.getImageData()} size={40} />
                        <Box gap="xsmall">
                            <Text size="small" weight="bold">{obstruction.data.name}</Text>
                            {state !== 'completed' && <Text size="xsmall" color="accent-2">{state === 'current' ? 'Current' : 'Upcoming'}</Text>}
                        </Box>
                    </CardHeader>
                    <Box pad="medium">
                        <Text size="small">{obstruction.getBonusText()}</Text>
                    </Box>
                </RoundedShadowBox>;
            })}
        </Grid>
    </Box>;
}

