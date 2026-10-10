"use client"

import {
    Box,
    Heading,
    Text,
} from 'grommet'
import { useEffect, useState } from 'react';
import ShadowBox from '../../../components/base/ShadowBox';
import { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { TimeDown } from '../../../components/base/TimeDisplay';
import { Gaming as GamingDomain } from '../../../data/domain/world-5/gaming';
import { ShovelImport, SprinklerImport } from '../../../data/domain/world-5/gaming/imports';
import { nFormatter } from '../../../data/utility';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';


function Gaming() {
    const [gaming, setGaming] = useState<GamingDomain>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setGaming(theData.get("gaming"));
    }, [theData]);
    const sprinkler = gaming?.getImport(0) as SprinklerImport | undefined;
    const shovel = gaming?.getImport(1) as ShovelImport | undefined;

    if (!gaming) {
        return (
            <Box>
                Still loading or something is wrong.
            </Box>
        )
    }
    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Gaming</Heading>
            <Text size="xsmall">* This is a work in progress, there could some bugs and minor inaccuracies. THE UI ISN&apos;T FINAL!</Text>
            <Box direction="row" margin={{ top: 'small' }}>
                {
                    sprinkler?.purchased &&
                    <ShadowBox width="medium" margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <ComponentAndLabel
                            label="Next Water In"
                            component={
                                <TimeDown addSeconds={sprinkler.nextChargeSeconds} />
                            }
                        />
                        <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                        <Text color="accent-3" size="12px">Current water: {sprinkler.waterCharges}</Text>
                    </ShadowBox>
                }
                {
                    shovel?.purchased &&
                    <ShadowBox width="medium" margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center">
                        <ComponentAndLabel
                            label="Next Dig In"
                            component={
                                <TimeDown addSeconds={shovel.nextDigSeconds} />
                            }
                        />
                        <Text margin={{ top: 'small' }} color="accent-3" size="12px">* Might be off by a few seconds.</Text>
                        <Text color="accent-3" size="12px">Current digs: {shovel.digs}</Text>
                        <Text color="accent-3" size="12px">Nugget range: {nFormatter(shovel.nuggetRange.minimum)}-{nFormatter(shovel.nuggetRange.maximum)}</Text>
                    </ShadowBox>
                }
            </Box>
        </Box>
    )
}

export default Gaming;