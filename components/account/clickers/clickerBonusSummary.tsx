'use client';

import { Box, Grid, Heading, Text } from 'grommet';
import { useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import ShadowBox from '../../base/ShadowBox';
import IconImage from '../../base/IconImage';
import { ImageData } from '../../../data/domain/imageData';
import { commaNotation, notateNumber } from '../../../data/utility';
import { Orion } from '../../../data/domain/world-1/orion';
import { Poppy } from '../../../data/domain/world-2/poppy';
import { Bubba } from '../../../data/domain/world-3/bubba';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { DataStatus } from '../../../lib/stores/appDataStore';

type ClickerKind = 'owl' | 'kangaroo' | 'bubba';

type ClickerBonusRow = {
    index: number;
    effect: string;
    value: number;
    image: ImageData;
};

function formatBonusValue(value: number, clicker: ClickerKind): string {
    if (clicker === 'owl') {
        return `${value}`;
    }

    if (clicker === 'kangaroo') {
        if (value <= 100) {
            return `${Math.round(value * 10) / 10}`;
        }

        if (value > 1e21) {
            return `${commaNotation(value / 1e18)}QQ`;
        }

        if (value > 1e15) {
            return `${commaNotation(value / 1e12)}T`;
        }

        if (value > 1e9) {
            return `${commaNotation(value / 1e6)}M`;
        }
    }

    return commaNotation(value);
}

function getBonusRows(theData: Map<string, any>, clicker: ClickerKind): ClickerBonusRow[] | undefined {
    if (clicker === 'owl') {
        const orion = theData.get('orion') as Orion | undefined;
        return orion?.bonuses.map(bonus => {
            const value = orion.getGlobalBonus(bonus.index);
            return {
                index: bonus.index,
                effect: bonus.desc.replace('{', formatBonusValue(value, clicker)),
                value,
                image: bonus.getImageData(),
            };
        });
    }

    if (clicker === 'kangaroo') {
        const poppy = theData.get('poppy') as Poppy | undefined;
        return poppy?.bonuses.map(bonus => {
            const value = poppy.getGlobalBonus(bonus.index);
            return {
                index: bonus.index,
                effect: bonus.desc.replace('{', formatBonusValue(value, clicker)),
                value,
                image: bonus.getImageData(),
            };
        });
    }

    const bubba = theData.get('bubba') as Bubba | undefined;
    return bubba?.bonuses.map(bonus => {
        const value = bubba.getGlobalBonus(bonus.index);
        return {
            index: bonus.index,
            effect: bonus.desc.replace('{', commaNotation(value)),
            value,
            image: bonus.getImageData(),
        };
    });
}

type ClickerNextBonusUpgrade = {
    bonusIndex: number;
    cost: number;
    resourceBalance: number;
    canAfford: boolean;
    currency: string;
    currencyImage: ImageData;
};

function getNextBonusUpgrade(theData: Map<string, any>, clicker: ClickerKind): ClickerNextBonusUpgrade | undefined {
    if (clicker === 'owl') {
        const orion = theData.get('orion') as Orion | undefined;
        const upgrade = orion?.getNextGlobalBonusUpgrade();
        return upgrade && orion && {
            ...upgrade,
            currency: 'Feathers',
            currencyImage: orion.getCurrencyImageData(),
        };
    }

    if (clicker === 'kangaroo') {
        const poppy = theData.get('poppy') as Poppy | undefined;
        const upgrade = poppy?.getNextGlobalBonusUpgrade();
        return upgrade && poppy && {
            ...upgrade,
            currency: 'Fish',
            currencyImage: poppy.getCurrencyImageData(),
        };
    }

    const bubba = theData.get('bubba') as Bubba | undefined;
    const upgrade = bubba?.getNextGlobalBonusUpgrade();
    return upgrade && bubba && {
        ...upgrade,
        currency: 'Meat slices',
        currencyImage: bubba.getCurrencyImageData(),
    };
}


export default function ClickerBonusSummary({ clicker, title }: { clicker: ClickerKind; title: string }) {
    const [hydrated, setHydrated] = useState(false);
    const { theData, dataStatus, lastUpdated } = useAppDataStore(useShallow(state => ({
        dataStatus: state.dataStatus,
        lastUpdated: state.lastUpdated,
        theData: state.data.getData(),
    })));

    useEffect(() => {
        setHydrated(true);
    }, []);

    const bonuses = useMemo(() => getBonusRows(theData, clicker), [theData, clicker, lastUpdated]);
    const nextUpgrade = useMemo(() => getNextBonusUpgrade(theData, clicker), [theData, clicker, lastUpdated]);
    const nextBonus = bonuses?.find(bonus => bonus.index === nextUpgrade?.bonusIndex);

    if (!hydrated || (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !bonuses || !nextUpgrade || !nextBonus) {
        return <Box><Text>Loading...</Text></Box>;
    }

    const activeCount = bonuses.filter(bonus => bonus.value > 0).length;
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>{title}</Heading>
            <Box gap="small">
                <Box direction="row" align="baseline" justify="between" gap="small">
                    <Heading level="3" size="small" style={{ fontWeight: 'normal' }}>Permanent Bonuses</Heading>
                    <Text size="xsmall">{activeCount} / {bonuses.length} active</Text>
                </Box>
                <Grid columns={{ size: '210px', count: 'fill' }} gap="small">
                    <ShadowBox background="dark-1" pad="small" gap="xxsmall">
                        <Text size="xsmall">Current {nextUpgrade.currency}</Text>
                        <Box direction="row" align="center" gap="xsmall">
                            <IconImage data={nextUpgrade.currencyImage} scale={1 / 3} />
                            <Text size="small">{notateNumber(nextUpgrade.resourceBalance, 'Small')}</Text>
                        </Box>
                    </ShadowBox>
                    <ShadowBox background="dark-1" pad="small" gap="xxsmall">
                        <Text size="xsmall">Next upgrade</Text>
                        <Box direction="row" align="center" gap="xsmall">
                            <IconImage data={nextUpgrade.currencyImage} scale={1 / 3} />
                            <Text size="small" color={nextUpgrade.canAfford ? 'green-2' : 'status-critical'}>
                                {notateNumber(nextUpgrade.cost, 'Small')} {nextUpgrade.currency}
                            </Text>
                        </Box>
                    </ShadowBox>
                    <ShadowBox background="dark-1" pad="small" gap="xxsmall">
                        <Text size="xsmall">Next bonus</Text>
                        <Box direction="row" align="center" gap="xsmall">
                            <IconImage data={nextBonus.image} />
                        </Box>
                    </ShadowBox>
                </Grid>
                <Grid columns={{ size: '260px', count: 'fill' }} gap="small">
                    {bonuses.map(bonus => (
                        <ShadowBox
                            key={bonus.index}
                            background="dark-1"
                            pad="small"
                            gap="xsmall"
                            style={{ opacity: bonus.value > 0 ? 1 : 0.5 }}
                        >
                            <Box direction="row" align="center" gap="small">
                                <IconImage data={bonus.image} />
                                <Text size="small">{bonus.effect}</Text>
                            </Box>
                        </ShadowBox>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

