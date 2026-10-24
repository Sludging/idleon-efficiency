import { useContext } from "react";
import { Box, Grid, ResponsiveContext, Text } from "grommet";
import styled from "styled-components";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import { ImageData } from "../../../data/domain/imageData";
import { JellyOperator } from "../../../data/domain/world-7/jellyOperator";
import { nFormatter } from "../../../data/utility";
import { normalizeColor } from "grommet/utils";

import { CircleInformation } from "grommet-icons";
import TipDisplay from "../../base/TipDisplay";

const MetricValue = styled(Box)`
    height: 40px;
    justify-content: flex-end;
`;

const PrimaryResourceDisplay = styled(Box)`
    & span {
        font-weight: 700;
    }
`;
const SummaryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
    min-width: 0;

    > *:not(:first-child) {
        border-left: 1px solid ${({ theme }) => normalizeColor('grey-1', theme)};
        padding-left: 16px;
    }

    @media (max-width: 540px) {
        grid-template-columns: minmax(0, 1fr);

        > *:not(:first-child) {
            border-left: 0;
            padding-left: 0;
        }
    }
`;
const OverviewGrid = styled(Grid)`
    @media (min-width: 769px) {
        grid-template-rows: auto auto;

        > * {
            display: grid;
            grid-row: span 2;
            grid-template-rows: subgrid;
            gap: 24px;
        }
    }
`;

const BonusGrid = styled(Grid)`
    @media (min-width: 769px) {
        grid-template-rows: auto auto;

        > * {
            display: grid;
            grid-row: span 2;
            grid-template-rows: subgrid;
        }
    }
`;

const BonusPanel = styled(Box)`
    @media (min-width: 769px) {
        display: grid;
        grid-row: span 2;
        grid-template-rows: subgrid;
    }
`;

const BonusDescription = styled(Text)`
    min-width: 0;
`;

const OverviewCard = styled(RoundedShadowBox)`
    display: grid;
    gap: 24px;
    @media (min-width: 769px) {
        grid-row: span 2;
        grid-template-rows: subgrid;
    }
`;

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

    return <Box gap="large">
        <SummaryGrid>
            <Box gap="small">
                <Text size="small" weight={500}>Bloodcells</Text>
                <Box direction="row" gap="medium" wrap>
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <MetricValue>
                            <PrimaryResourceDisplay>
                                <ResourceDisplay cost={jelly.bloodcells} resourceImageData={bloodcellImage} resourceImageScale={1} textSize="xxlarge" showTooltip />
                            </PrimaryResourceDisplay>
                        </MetricValue>
                        <Text size="xsmall" color="accent-2">Balance</Text>
                    </Box>
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <MetricValue>
                            <Text size="medium" color="green-2">{dpsMultiplier.toFixed(2)}x</Text>
                        </MetricValue>
                        <Text size="xsmall" color="accent-2">Gain boost, +{((dpsMultiplier - 1) * 100).toFixed(1)}% from DPS Biometrics</Text>
                    </Box>
                </Box>
            </Box>
            <Box gap="small">
                <Text size="small" weight={500}>Obstructions</Text>
                <Box direction="row" gap="medium">
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <MetricValue>
                            <Text size="small">{jelly.getSuccessfulOperations()} / {jelly.obstructions.length}</Text>
                        </MetricValue>
                        <Text size="xsmall" color="accent-2">Cleared</Text>
                    </Box>
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <MetricValue>
                            <Text size="small">{jelly.attemptsRemaining} / {jelly.dailyAllowance}</Text>
                        </MetricValue>
                        <Box direction="row" gap="xxsmall" align="center">
                            <Text size="xsmall" color="accent-2">Attempts left</Text>
                            <TipDisplay heading="Attempts left" body={<Text size="small">Wins return an attempt. The daily reset tops up to {jelly.dailyAllowance} and preserves surplus attempts.</Text>}>
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box gap="small">
                <Text size="small" weight={500}>Damage</Text>
                <Box gap="xxsmall">
                    <MetricValue>
                        <Text size="xxlarge" weight="bold">{nFormatter(jelly.bestDPS)}</Text>
                    </MetricValue>
                    <Text size="xsmall" color="accent-2">Best recorded DPS</Text>
                </Box>
            </Box>
        </SummaryGrid>

        <OverviewGrid columns={small ? ['flex'] : ['flex', 'flex']} gap="medium" align="stretch">
            <OverviewCard background="dark-1" pad="medium">
                {current ? <>
                    <Box direction={small ? "column" : "row"} justify="between" align={small ? "start" : "center"} gap="medium">
                        <Box direction="row" gap="small" align="center" flex="grow">
                            <Artwork data={current.getImageData()} size={44} />
                            <Box gap="xxsmall">
                                <Text size="xsmall" color="accent-2">Current obstruction</Text>
                                <Text size="medium">{current.data.name}</Text>
                            </Box>
                        </Box>
                        <Box direction="row" gap="medium">
                            <TextAndLabel label="Target HP" labelSize="xsmall" textSize="small" text={nFormatter(jelly.getCurrentTargetHP())} />
                            <TextAndLabel label="Time limit" labelSize="xsmall" textSize="small" text={`${jelly.getCurrentTimeLimit()}s`} />
                        </Box>
                    </Box>
                    <BonusGrid columns={small || !next ? ['flex'] : ['flex', 'flex']} gap="small">
                        <BonusPanel background="grey-1" round="small" pad="small" gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Reward on clear</Text>
                            <BonusDescription size="small">{current.getBonusText()}</BonusDescription>
                        </BonusPanel>
                        {next && <BonusPanel background="grey-1" round="small" pad="small" gap="xxsmall">
                            <Box direction="row" gap="xsmall" align="center">
                                <Artwork data={next.getImageData()} size={28} />
                                <Text size="xsmall" color="accent-2">Up next: {next.data.name}</Text>
                            </Box>
                            <BonusDescription size="small">{next.getBonusText()}</BonusDescription>
                        </BonusPanel>}
                    </BonusGrid>
                </> : <Text size="small">All obstructions cleared.</Text>}
            </OverviewCard>

            <OverviewCard background="dark-1" pad="medium">
                <Box direction="row" gap="small" align="center">
                    <Artwork data={bloodcellImage} size={40} />
                    <Box gap="xxsmall">
                        <Text size="xsmall" color="accent-2">Earned every day you log in</Text>
                        <Text size="medium">Daily Transfusion</Text>
                    </Box>
                </Box>
                <Box background="grey-1" round="small" pad="small">
                    <Grid columns={small ? ['flex'] : ['flex', '16px', 'flex', '16px', 'flex']} gap="small" align="center">
                        <TextAndLabel label="Best operation" labelSize="xsmall" textSize="small" text={nFormatter(jelly.bestOperationBloodcells)} />
                        <Text size="small" color="accent-2">×</Text>
                        <TextAndLabel label="Rate" labelSize="xsmall" textSize="small" text={`${nFormatter(jelly.getDailyTransfusionPercentage())}%`} />
                        <Text size="small" color="accent-2">=</Text>
                        <ComponentAndLabel label="Daily login income" labelSize="xsmall" component={<ResourceDisplay cost={jelly.getDailyBloodcells()} resourceImageData={bloodcellImage} resourceImageScale={0.75} textSize="small" showTooltip />} />
                    </Grid>
                </Box>
            </OverviewCard>
        </OverviewGrid>

    </Box>;
}
