"use client"

import {
    Box,
    Heading,
    Text,
    Grid,
    Stack,
    Meter
} from 'grommet'
import { NextSeo } from 'next-seo';

import ShadowBox from '../../../components/base/ShadowBox';

import { Equinox as EquinoxDomain, isFoodLust } from '../../../data/domain/equinox';

import { TimeDown } from "../../../components/base/TimeDisplay";
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';

function Equinox() {
    const theData = useAppDataStore((state) => state.data.getData());

    const equinox = theData.get("equinox") as EquinoxDomain;

    if (!equinox) {
        return <></>
    }

    return (
        <Box>
            <NextSeo title="Equinox" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Equinox</Heading>
            <Box pad="large" gap="small">
                <Text size="large">Bar</Text>
                <Box direction="row" gap="medium">
                    <ComponentAndLabel
                        label={"Progress"}
                        component={
                            <Box direction="row" gap="small">
                                <Stack>
                                    <Meter
                                        size="small"
                                        type="bar"
                                        background="accent-3"
                                        color="brand"
                                        values={[
                                            {
                                                value: equinox.bar.current,
                                                label: 'current',
                                                color: 'brand'
                                            }
                                        ]}
                                        max={equinox.bar.max} />
                                    <Box align="center" pad="xxsmall">
                                        <Text size="small">{Math.floor(equinox.bar.current).toString()}/{Math.floor(equinox.bar.max).toString()} ({equinox.bar.percentageOfCap}%)</Text>
                                    </Box>
                                </Stack>
                            </Box>
                        }
                    />
                    <TextAndLabel
                        label='Fill Rate'
                        text={`${equinox.bar.rate}/hr`}
                    />
                    <ComponentAndLabel
                        label={"Time till full"}
                        component={
                            <TimeDown addSeconds={equinox.bar.timeToFull} />
                        }
                    />
                </Box>
            </Box>
            <Box pad="large" gap="small">
                {
                    equinox.activeChallenges.length > 0 &&
                    <Box margin={{ bottom: 'medium' }} gap="medium">
                        <Text size="large">Active Challenges</Text>

                        <Box direction="row" wrap>
                            {
                                equinox.activeChallenges.map((challenge, index) => (
                                    <ShadowBox width={"200px"} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium">
                                        <Text size="small">{challenge.data.challenge}</Text>
                                        <Text size="small">{challenge.data.reward}</Text>
                                    </ShadowBox>
                                ))
                            }
                        </Box>
                    </Box>
                }
                <Box>
                    <Text size="large">Upgrades</Text>
                    <Box direction="row" wrap margin={{ top: 'large' }}>
                        <Grid columns={{ size: 'auto', count: 4 }} fill>
                            {
                                equinox.upgrades.map((upgrade, index) => {
                                    let border = undefined;
                                    if (isFoodLust(upgrade) && upgrade.isCapped()) {
                                        border = { color: 'green-1', size: '1px' }
                                    }
                                    return (
                                        <ShadowBox border={border} style={{ opacity: upgrade.unlocked ? 1 : 0.5 }} key={index} background="dark-1" margin={{ right: 'small', bottom: 'small' }} pad="medium" gap="medium">
                                            <Text>{upgrade.data.name} ({upgrade.level}/{upgrade.maxLevel})</Text>
                                            <Text size="xsmall">{upgrade.getDescription()}</Text>
                                            {upgrade.getBonus() != -1 && <Text size="xsmall">{upgrade.getBonusText()}</Text>}
                                        </ShadowBox>
                                    )
                                })

                            }
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Equinox;