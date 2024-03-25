import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { useEffect, useContext, useState, useMemo } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import ShadowBox from '../../components/base/ShadowBox';
import { Forge as ForgeDomain } from '../../data/domain/forge';
import TextAndLabel, { ComponentAndLabel } from '../../components/base/TextAndLabel';
import CoinsDisplay from '../../components/coinsDisplay';
import { getCoinsArray, nFormatter } from '../../data/utility';
import TabButton from '../../components/base/TabButton';
import { Item } from '../../data/domain/items';
import { TimeDisplaySize, TimeDown } from '../../components/base/TimeDisplay';
import IconImage from '../../components/base/IconImage';

function ForgeItem({ item, title }: { item: Item, title: string }) {
    if (item.displayName == "Blank") {
        return (
            <Box align="center">
                <TextAndLabel
                    label={title}
                    text="Empty" />
            </Box>
        )
    }
    return (
        <Box align="center">
            <Box direction="row" pad={{ vertical: 'small' }} align="center">
                <ComponentAndLabel
                    label={title}
                    component={
                        <Box direction="row" align="center">
                            <IconImage data={item.getImageData()} />
                            <Text size="small">{nFormatter(item.count)}</Text>
                        </Box>
                    }
                />
            </Box>
        </Box>
    )
}

function Forge() {
    const [forge, setForge] = useState<ForgeDomain | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<string>("Slots");
    const appContext = useContext(AppContext);

    const firstSlotToEmpty = useMemo(() => {
        const forgeSpeed = forge?.upgrades[2].getStat() ?? 0;
        return [...(forge?.slots ?? [])].sort((slot1, slot2) => slot1.getTimeTillEmpty(forgeSpeed) < slot2.getTimeTillEmpty(forgeSpeed) ? -1 : 1)[0];
    }, [appContext, forge])

    const totalCost = useMemo(() => {
        return forge?.upgrades.reduce((sum, upgrade) => sum += upgrade.getMaxCost(), 0) ?? 0;
    }, [appContext, forge])

    useEffect(() => {
        if (appContext) {
            const idleonData = appContext.data.getData();
            setForge(idleonData.get("forge"));
        }
    }, [appContext]);

    return (
        <Box>
            <NextSeo title="Forge" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Forge</Heading>
            <Box direction="row">
                {
                    totalCost > 0 &&
                    <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center" width="medium">
                        <ComponentAndLabel
                            label="Cost to max all upgrades"
                            component={<CoinsDisplay coinMap={getCoinsArray(totalCost)} maxCoins={3} />}
                        />
                    </ShadowBox>
                }
                <ShadowBox margin={{ right: 'large', bottom: 'small' }} background="dark-1" gap="xsmall" pad="medium" align="center" width="medium">
                    <ComponentAndLabel
                        label="Need to refill in"
                        component={<TimeDown addSeconds={firstSlotToEmpty?.getTimeTillEmpty(forge?.upgrades[2].getStat() ?? 0) ?? 0} size={TimeDisplaySize.Medium} />}
                    />
                </ShadowBox>
            </Box>
            <Box align="center" direction="row" justify="center" gap="small">
                {["Slots", "Upgrades"].map((tabName, index) => (
                    <TabButton key={index} isActive={activeTab == tabName} text={tabName} clickHandler={() => { setActiveTab(tabName); }} />
                ))
                }
            </Box>
            <Box pad="small">
                {
                    activeTab == "Upgrades" &&
                    <Box wrap direction="row">
                        {
                            forge && forge.upgrades.map((upgrade, index) => (
                                <ShadowBox background="dark-1" pad={{ vertical: 'medium', horizontal: 'large' }} key={index} margin={{ right: 'medium', bottom: 'medium' }} gap="medium" direction="row" fill>
                                    <Grid columns={["10%", "40%", "50%"]} fill gap="small" align="center">
                                        <TextAndLabel
                                            label="Level"
                                            text={`${upgrade.level}/${upgrade.maxLevel}`}
                                        />
                                        <TextAndLabel
                                            label="Bonus"
                                            text={upgrade.getBonusText()}
                                        />

                                        {upgrade.level < upgrade.maxLevel ?
                                            <Box direction="row" gap="medium">
                                                <ComponentAndLabel
                                                    label="Next level cost"
                                                    component={<CoinsDisplay coinMap={getCoinsArray(upgrade.getCost())} maxCoins={3} />}
                                                />
                                                <ComponentAndLabel
                                                    label="Cost to max"
                                                    component={<CoinsDisplay coinMap={getCoinsArray(upgrade.getMaxCost())} maxCoins={3} />}
                                                />
                                            </Box> :
                                            <Box>
                                                MAXED
                                            </Box>
                                        }
                                    </Grid>
                                </ShadowBox>
                            ))
                        }
                    </Box>
                }
                {
                    activeTab == "Slots" &&
                    <Box>
                        {
                            forge && forge.slots.map((slot, index) => {
                                const slotSpeed = slot.getSpeed(forge.upgrades[2].getStat());
                                const oreInterval = slot.getOreInterval();
                                const timeTillEmpty = Math.round(slot.ores.count / slot.getOrePerInterval()) * (oreInterval / (4 * slotSpeed))
                                return (
                                    <ShadowBox background="dark-1" pad={{ vertical: 'medium', horizontal: 'large' }} key={index} margin={{ right: 'medium', bottom: 'medium' }} gap="large" direction="row" fill justify="between" align="center">
                                        <Box style={{ opacity: slot.ores.count > 0 ? 1 : 0.5 }}>
                                            <IconImage data={{location: slot.brimestone ? 'GemP4' : 'ForgeA', height: 36, width: 36}} />
                                        </Box>
                                        <ForgeItem item={slot.ores} title="Ores" />
                                        <ForgeItem item={slot.oils} title="Oils" />
                                        <ForgeItem item={slot.bars} title="Bars" />
                                        <Box gap="xsmall">
                                            <ComponentAndLabel
                                                label="Time Till Empty"
                                                component={<TimeDown addSeconds={timeTillEmpty} size={TimeDisplaySize.Medium} />}
                                            />
                                            <Text size="10px">* Not fully accurate with oils yet.</Text>
                                        </Box>
                                    </ShadowBox>
                                )
                            })
                        }
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default Forge;