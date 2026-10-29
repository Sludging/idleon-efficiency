"use client"

import {
    Box,
    Grid,
    Stack,
    Text,
    Tip,
    CheckBox,
    Select,
    Heading,
    ResponsiveContext
} from "grommet"
import styled from 'styled-components'

import { Alchemy as AlchemyData, Cauldron, Bubble, CauldronBoostIndex, Vial } from '../../../data/domain/world-2/alchemy/alchemy';
import { Achievement, AchievementConst } from '../../../data/domain/achievements'
import { useEffect, useState, useContext } from 'react';
import { nFormatter, notateNumber, round } from '../../../data/utility'
import ContentTabs from "../../../components/base/ContentTabs";
import { Item } from "../../../data/domain/items";
import TipDisplay, { TipDirection } from "../../../components/base/TipDisplay";
import { Ascending, Grid as GridIcon, List } from "grommet-icons";
import IconImage from "../../../components/base/IconImage";
import { Sigils } from "../../../data/domain/world-2/alchemy/sigils";
import TextAndLabel, { ComponentAndLabel } from "../../../components/base/TextAndLabel";
import { TimeDown } from "../../../components/base/TimeDisplay";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import P2WDisplay from "../../../components/world-2/alchemy/p2w";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import useHydrated from "../../../lib/hooks/useHydrated";
import { useShallow } from "zustand/react/shallow";
import ShadowBox from "../../../components/base/ShadowBox";
import { UpgradeTable } from "../../../components/account/shared/UpgradeTable";
import type { FilterOptions } from "../../../components/account/shared/UpgradeTableFilters";
import { Gaming } from "../../../data/domain/world-5/gaming";
import { Divinity } from "../../../data/domain/world-5/divinity";
import { ImageData } from "../../../data/domain/imageData";

const CapitalizedH3 = styled.h3`
    text-transform: capitalize
`

interface DisplayProps {
    cauldron: Cauldron,
    undevelopedCostsBubbleLevel: number,
    barleyBrewVialLevel: number,
    hasAchievement: boolean,
    discountLevel: number,
    classMultiBonus: boolean
    vialMultiplier: number
    krukTargets: readonly Bubble[]
    particles: number
    krukImage: ImageData
}

function CauldronDisplay({ cauldron, undevelopedCostsBubbleLevel, barleyBrewVialLevel, hasAchievement, discountLevel, classMultiBonus, vialMultiplier = 1, particles, krukTargets, krukImage }: DisplayProps) {
    const size = useContext(ResponsiveContext)

    const bargainBubbleLevel = cauldron.bubbles[14].level;
    const cauldronCostLevel = cauldron.boostLevels[CauldronBoostIndex.Cost];
    const newMultiBubbleLevel = cauldron.short_name != "Y" ? cauldron.bubbles[16].level : 0;
    const classMultiBubbleLevel = (classMultiBonus && cauldron.short_name != "Y") ? cauldron.bubbles[1].level : 0;

    function TipContent({ bubble, faceLeft }: { bubble: Bubble, faceLeft: boolean }) {
        const materialCosts: Map<Item, number> = bubble.getMaterialCost(cauldronCostLevel, undevelopedCostsBubbleLevel, barleyBrewVialLevel, bargainBubbleLevel, classMultiBubbleLevel, discountLevel, hasAchievement, newMultiBubbleLevel, vialMultiplier);
        return (
            <Box direction="row" align="center" width={{ max: 'medium' }}>
                <Box pad="small" gap="small" background="white">
                    <Text size={size == "small" ? 'small' : ''} weight="bold">{bubble.name} ({bubble.level})</Text>
                    <hr style={{ width: "100%" }} />
                    {bubble.labUpgrade && <Text size="small">Estimated daily target. Lithium and Kattlekruk upgrades can change the targets.</Text>}
                    {krukTargets.includes(bubble) && <Text size="small">Eligible for Kattlekruk daily upgrades.</Text>}
                    <Text size="small">Bonus: {bubble.getBonusText()}</Text>
                    <Box gap="small">
                        <ComponentAndLabel
                            label="Material cost"
                            labelColor="grey-3"
                            component={
                                <Box direction="row" align="center" gap="small">
                                    {
                                        Array.from(materialCosts).map(([item, cost]) => {
                                            return (
                                                <Box key={`${bubble.name}_${item.internalName}`} direction="row" align="center">
                                                    <Box direction="row" gap="xsmall" align="center">
                                                        <IconImage data={item.getImageData()} />
                                                        <Text size="small">{notateNumber(round(cost))}</Text>
                                                    </Box>

                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            } />
                        {
                            Array.from(materialCosts.values())[0] > 1e8 && Array.from(materialCosts.keys())[0].internalName != "Bits" &&
                            <ComponentAndLabel
                                label="Atom cost"
                                labelColor="grey-3"
                                component={
                                    <Box direction="row" align="center">
                                        {
                                            Array.from(materialCosts).map(([item, cost]) => {
                                                const isLiquid = item.internalName.includes("Liquid");
                                                if (isLiquid) {
                                                    return null;
                                                }
                                                const atomCost = bubble.getAtomCost(cost);
                                                return (
                                                    <Box key={`${bubble.name}_atomcost`} direction="row" align="center">
                                                        <Box direction="row" gap="xsmall" align="center">
                                                            <IconImage data={AtomCollider.getParticleImageData()} scale={0.7} />
                                                            <Text color={particles > atomCost ? 'green-1' : ""} size="small">{notateNumber(particles)}/{notateNumber(atomCost)}</Text>
                                                        </Box>

                                                    </Box>
                                                )
                                            })
                                        }
                                    </Box>
                                } />
                        }
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Box align="center">
            <Box align="center">
                <CapitalizedH3>{cauldron.name}</CapitalizedH3>
            </Box>
            <Box>
            {
                    cauldron.bubbles.map((bubble, index) => {
                        return (
                            <Box key={`cauldron_${index}_${bubble.name}`}>
                                <Tip
                                    plain
                                    content={
                                        <TipContent bubble={bubble} faceLeft={cauldron.short_name == "Y"} />
                                    }
                                    dropProps={{ align: size == "small" ? { top: 'bottom' } : cauldron.short_name == "Y" ? { right: 'left' } : { left: 'right' } }}
                                >
                                    <Box direction="row" fill align="center">
                                        <Box style={{ opacity: bubble.level > 0 ? 1 : 0.2 }}>
                                            <IconImage data={bubble.getImageData()} scale={0.8} />
                                        </Box>
                                        <Box direction="row" gap="xsmall" align="center">
                                            <Text size="small">{bubble.level}</Text>
                                        </Box>
                                        {
                                            bubble.labUpgrade && <Ascending color="Legendary" size="large" />
                                        }
                                        {krukTargets.includes(bubble) && <Box margin={{ left: "xsmall" }} aria-label="Kattlekruk eligible"><IconImage data={krukImage} scale={0.22} /></Box>}
                                    </Box>
                                </Tip>
                            </Box>
                        )
                    })
                }
            </Box>
        </Box>
    )
}

function VialTipInfo({ vial }: { vial: Vial }) {
    if (vial.level == 0) {
        return (
            <Box>
                <Text size="small">Bonus: {vial.getBonusText()}</Text>
                <Text size="small">You need to roll at least a {vial.getNumberToRoll()} to unlock this vial</Text>

            </Box>
        )
    }

    return (
        <Box>
            <Text size="small">Bonus: {vial.getBonusText()}</Text>
            {
                Array.from(vial.getMaterialCost()).map(([item, cost], index) => {
                    return (
                        <Box key={index} direction="row" align="center" ><Text size="small">Material Cost: {nFormatter(round(cost))}</Text><IconImage data={item.getImageData()} /></Box>
                    )
                })
            }
        </Box>
    )
}

function VialsDisplay() {
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const alchemyData = theData.get("alchemy") as AlchemyData;

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box direction="row" wrap>
                {
                    alchemyData.vials.map((vial, index) => (
                        <Box key={index} width={{ max: '104px', min: '104px' }} height={{ max: '120px', min: '120px' }}>
                            <TipDisplay
                                body={<VialTipInfo vial={vial} />}
                                heading={`${vial.name} (${vial.level})`}
                                direction={TipDirection.Down}
                                size="medium"
                            >
                                <Stack anchor='center' margin={{ right: 'small' }}>
                                    <Box style={{ opacity: vial.level == 0 ? 0.3 : 1 }}>
                                        <IconImage data={vial.getBackgroundImageData()} />
                                    </Box>
                                    <Box style={{ opacity: vial.level == 0 ? 0.6 : 1 }}>
                                        <IconImage data={vial.getImageData()} scale={1.3} />
                                    </Box>
                                </Stack>
                            </TipDisplay>
                        </Box>
                    ))
                }
            </Box>
        </ShadowBox>
    )
}

function SigilsDisplay() {
    const [sigilData, setSigilData] = useState<Sigils>();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setSigilData(theData.get("sigils"));
    }, [theData]);

    return (
        <Box pad="medium" gap="small">
            <Box>
                <TextAndLabel
                    label="Charge speed per player"
                    text={nFormatter(sigilData?.chargeSpeed ?? 0)}
                />
            </Box>
            <Grid columns="1/3">
                {
                    sigilData?.sigils.map((sigil, index) => {
                        const reqLimit = (sigil.boostLevel == 1 && sigil.canBeIonized) ? (sigil.data.x1 ?? 0) : sigil.boostLevel == 0 ? sigil.data.boostCost : sigil.boostLevel == -1 ? sigil.data.unlockCost : 0;
                        const chargeSpeed = sigil.activePlayers * sigilData.chargeSpeed;
                        const timeToNext = ((reqLimit - sigil.progress) / chargeSpeed) * 3600;
                        let filter = undefined;
                        switch (sigil.boostLevel) {
                            case 1:
                                filter = "hue-rotate(202deg)"
                                break;
                            case 2:
                                filter = "hue-rotate(150deg)"
                                break;
                            case 3:
                                filter = "hue-rotate(80deg)"
                                break;
                            case 4:
                                filter = "hue-rotate(260deg)"
                                break;
                        }

                        return (
                            <ShadowBox background="dark-1" key={index} margin={{ right: 'small', bottom: 'small' }} gap="medium" align="start" pad="small" border={sigil.activePlayers > 0 ? { color: 'green-1', size: '1px' } : undefined}>
                                <IconImage style={{ filter: filter, opacity: sigil.boostLevel > 0 ? 1 : 0.2 }} data={sigil.getImageData()} />
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Name" text={sigil.data.name} />
                                    <TextAndLabel textSize="xsmall" label="Description" text={sigil.getBonusText()} />
                                </Box>
                                <Box direction="row" gap="medium">
                                    <TextAndLabel textSize="xsmall" label="Progress" text={timeToNext > 0 ? `${nFormatter(sigil.progress, "Smaller")}/${nFormatter(reqLimit, "Smaller")}` : "Maxed"} />
                                    {sigil.activePlayers > 0 &&
                                        <ComponentAndLabel
                                            label="Time To max"
                                            component={
                                                <TimeDown addSeconds={timeToNext} />
                                            }
                                        />
                                    }
                                </Box>
                            </ShadowBox>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}

function BubblesDisplay() {
    const [discountLevel, setDiscountLevel] = useState<string>('0');
    const [classMulti, setClassMulti] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
    const [filters, setFilters] = useState<FilterOptions>({ hideLocked: false, hideMaxed: false, searchText: "", sortBy: "default" });
    const [cauldronFilter, setCauldronFilter] = useState("All");
    const [ownershipFilter, setOwnershipFilter] = useState("All");
    const [dailyFilter, setDailyFilter] = useState("All");

    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    
    const alchemyData = theData.get("alchemy") as AlchemyData;
    const daily = alchemyData.dailyBubbleProgression;
    const gaming = theData.get("gaming") as Gaming;
    const krukImage = (theData.get("divinity") as Divinity).gods[8].getImageData();
    const achievementsInfo = theData.get("achievements") as Achievement[];
    // get undeveloped costs bubble level
    const undevelopedCostsBubbleLevel = alchemyData.getUndevelopedCostsBubbleLevel();
    const barleyBrewVialLevel = alchemyData.getBarleyBrewVialLevel();
    const vialMultiplier = alchemyData.vials[0].bonusMulitplier
    const hasAlchemyAchievement = achievementsInfo[AchievementConst.SmartBoiIndex].completed;


    const collider = theData.get("collider") as AtomCollider;
    const particles = collider.particles

    const bargainOptions = [
        {
            label: 'No discount',
            value: '0',
        },
        {
            label: '25%',
            value: '1',
        },
        {
            label: '43.75%',
            value: '2',
        },
        {
            label: '57.81%',
            value: '3',
        },
        {
            label: '68.36%',
            value: '4',
        },
        {
            label: '76.27%',
            value: '5',
        },
        {
            label: '82.20%',
            value: '6',
        },
        {
            label: '86.65%',
            value: '7',
        },
        {
            label: '90%',
            value: '8',
        },
    ];

    const sortOptions = [
        { label: "In-game order", value: "default" },
        { label: "Level: high to low", value: "level" },
    ];
    const rows = alchemyData.cauldrons.flatMap(cauldron => cauldron.bubbles.map(bubble => ({
        id: `${bubble.cauldronIndex}-${bubble.bubbleIndex}`, cauldron, bubble,
    }))).filter(({ cauldron, bubble }) => {
        const search = filters.searchText.trim().toLowerCase();
        return (cauldronFilter === "All" || cauldron.name === cauldronFilter)
            && (ownershipFilter === "All" || (ownershipFilter === "Owned" ? bubble.level > 0 : bubble.level === 0))
            && (dailyFilter === "All" || (dailyFilter === "Estimated daily target" ? bubble.labUpgrade : daily?.krukTargets.includes(bubble)))
            && (!search || `${bubble.name} ${bubble.getBonusText()} ${cauldron.name}`.toLowerCase().includes(search));
    }).sort((a, b) => {
        if (filters.sortBy === "level") return b.bubble.level - a.bubble.level || a.bubble.cauldronIndex - b.bubble.cauldronIndex || a.bubble.bubbleIndex - b.bubble.bubbleIndex;
        return a.bubble.cauldronIndex - b.bubble.cauldronIndex || a.bubble.bubbleIndex - b.bubble.bubbleIndex;
    });
    const featureFilters = <Box direction="row" gap="small" wrap align="center" style={{ rowGap: '12px' }}>
        <Box direction="row" align="center" gap="xsmall"><Text size="small">Cauldron:</Text><Select aria-label="Cauldron" value={cauldronFilter} options={["All", ...alchemyData.cauldrons.map(c => c.name)]} onChange={({ option }) => setCauldronFilter(option)} /></Box>
        <Box direction="row" align="center" gap="xsmall"><Text size="small">Ownership:</Text><Select aria-label="Ownership" value={ownershipFilter} options={["All", "Owned", "Locked"]} onChange={({ option }) => setOwnershipFilter(option)} /></Box>
        <Box direction="row" align="center" gap="xsmall"><Text size="small">Daily:</Text><Select aria-label="Daily eligibility" value={dailyFilter} options={["All", "Estimated daily target", "Kattlekruk"]} onChange={({ option }) => setDailyFilter(option)} /></Box>
    </Box>;
    const columns = [
        { property: "bubble", header: "Bubble", render: ({ bubble }: typeof rows[number]) => <Box direction="row" align="center" gap="small" style={{ opacity: bubble.level > 0 ? 1 : 0.5 }}><IconImage data={bubble.getImageData()} scale={0.6} /><Text size="small">{bubble.name}</Text></Box> },
        { property: "cauldron", header: "Cauldron", render: ({ cauldron }: typeof rows[number]) => <Text size="small">{cauldron.name}</Text> },
        { property: "level", header: "Level", render: ({ bubble }: typeof rows[number]) => <Text size="small">{bubble.level}</Text> },
        { property: "effect", header: "Effect", size: "30%", render: ({ bubble }: typeof rows[number]) => <Text size="small">{bubble.getBonusText()}</Text> },
        { property: "cost", header: "Material cost", size: "220px", render: ({ bubble, cauldron }: typeof rows[number]) => {
            const costs = bubble.getMaterialCost(cauldron.boostLevels[CauldronBoostIndex.Cost], undevelopedCostsBubbleLevel, barleyBrewVialLevel, cauldron.bubbles[14].level, classMulti && cauldron.short_name !== "Y" ? cauldron.bubbles[1].level : 0, Number(discountLevel), hasAlchemyAchievement, cauldron.short_name !== "Y" ? cauldron.bubbles[16].level : 0, vialMultiplier);
            const firstCost = Array.from(costs.values())[0];
            const firstItem = Array.from(costs.keys())[0];
            return <Box gap="xsmall"><Box direction="row" gap="small" wrap>{Array.from(costs).map(([item, cost]) => <Box key={item.internalName} direction="row" align="center"><IconImage data={item.getImageData()} scale={0.6} /><Text size="xsmall">{notateNumber(round(cost))}</Text></Box>)}</Box>
                {firstCost > 1e8 && firstItem.internalName !== "Bits" && Array.from(costs).filter(([item]) => !item.internalName.includes("Liquid")).map(([item, cost]) => <Box key={`${item.internalName}-atom`} direction="row" align="center"><IconImage data={AtomCollider.getParticleImageData()} scale={0.6} /><Text size="xsmall" color={particles > bubble.getAtomCost(cost) ? "green-1" : undefined}>{notateNumber(particles)}/{notateNumber(bubble.getAtomCost(cost))}</Text></Box>)}
            </Box>;
        } },
        { property: "daily", header: "Daily", render: ({ bubble }: typeof rows[number]) => <Box direction="row" gap="xsmall" align="center">{bubble.labUpgrade && <TipDisplay heading="Estimated daily target" body="Lithium and Kattlekruk upgrades can change the targets." size="small"><Ascending color="Legendary" size="large" aria-label="Estimated daily target" /></TipDisplay>}{daily?.krukTargets.includes(bubble) && <TipDisplay heading="Kattlekruk eligible" body="Eligible for Kattlekruk daily upgrades." size="small"><Box aria-label="Kattlekruk eligible"><IconImage data={krukImage} scale={0.22} /></Box></TipDisplay>}</Box> },
    ];

    return (
        <Box gap="medium">
            {daily && <ShadowBox background="dark-1" pad="medium" gap="small">
                <Text weight="bold">No Bubble Left Behind</Text>
                <Box direction="row" wrap gap="medium" align="baseline">
                    <TextAndLabel label="Status" text={daily.enabled ? "Active" : "Inactive"} textSize="small" tooltip={<Box gap="xxsmall">
                        <Text size="xsmall">Any one of these sources enables daily upgrades:</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.mainframe > 0.5 ? 1 : 0.6 }}>No Bubble Left Behind active in the Lab{daily.sources.mainframe > 0.5 ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.bundle ? 1 : 0.6 }}>No Meal Left Behind bundle{daily.sources.bundle ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.event ? 1 : 0.6 }}>Event shop bonus{daily.sources.event ? "" : " (potential)"}</Text>
                    </Box>} />
                    <ComponentAndLabel label="Daily bubbles" component={<TipDisplay heading="Daily bubbles" size="small" body={<Box gap="xxsmall">
                        <Text size="xsmall">Base: 2</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.mainframeActive ? 1 : 0.6 }}>Lab mainframe: +{daily.sources.mainframeActive ? daily.sources.mainframeCount : daily.sources.potentialMainframeCount}{daily.sources.mainframeActive ? "" : " (potential)"}</Text>
                        {daily.sources.pyriteActive && daily.sources.mainframeActive
                            ? <Text size="xsmall">Pyrite Rhinestone: +{daily.sources.pyriteCount}</Text>
                            : <Box style={{ opacity: 0.6 }}>
                                <Text size="xsmall">Pyrite Rhinestone: +{daily.sources.potentialPyrite} No Bubble Left Behind Lab bonus (potential, with Lab active)</Text>
                                <Text size="xsmall">{daily.sources.potentialPyriteCount > 0 ? `Projected daily bubble bonus: +${daily.sources.potentialPyriteCount}` : "The Lab daily bubble bonus is already at its limit."}</Text>
                            </Box>}
                        <Text size="xsmall" style={{ opacity: daily.sources.amberiteOwned ? 1 : 0.6 }}>Amberite: +{daily.sources.amberiteOwned ? daily.sources.amberiteBase : daily.sources.potentialAmberiteBase}{daily.sources.amberiteOwned ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.amberiteTierOwned ? 1 : 0.6 }}>Amberite tier: +{daily.sources.amberiteTierOwned ? daily.sources.amberiteTier : daily.sources.potentialAmberiteTier}{daily.sources.amberiteTierOwned ? "" : " (Ancient potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.merit ? 1 : 0.6 }}>World 4 merit: +{daily.sources.merit || daily.sources.potentialMerit}{daily.sources.merit ? "" : " (first level)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.superbit4 ? 1 : 0.6 }}>{gaming.superbits.find(bit => bit.superbitId === 4)!.name}: +{daily.sources.superbit4 ? daily.sources.superbit4Chance : daily.sources.potentialSuperbit4Chance} toward a bubble{daily.sources.superbit4 ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.superbit22 ? 1 : 0.6 }}>{gaming.superbits.find(bit => bit.superbitId === 22)!.name}: +{daily.sources.superbit22 ? daily.sources.superbit22Chance : daily.sources.potentialSuperbit22Chance} toward a bubble{daily.sources.superbit22 ? "" : " (potential)"}</Text>
                        <Text size="xsmall">Superbits combined: +{daily.sources.superbitCount} daily bubbles</Text>
                        <Text size="xsmall">Daily upgrades range from 3 to 10. Bonuses can occasionally upgrade an additional bubble, up to 10.</Text>
                    </Box>}><Text size="small" tabIndex={0} style={{ textDecoration: "underline dotted", cursor: "help" }}>{daily.enabled ? daily.upgradeCount : "—"}</Text></TipDisplay>} />
                    <ComponentAndLabel label="Estimated level gain" component={<TipDisplay heading="Estimated level gain" size="small" body={<Box gap="xxsmall">
                        <Text size="xsmall">Base range when enabled: 1–2 levels per bubble</Text>
                        {(daily.sources.mainframeActive ? daily.sources.mainframeLevelGain : daily.sources.potentialMainframeLevelGain) > 0 && <Text size="xsmall" style={{ opacity: daily.sources.mainframeActive ? 1 : 0.6 }}>Lab mainframe: +{daily.sources.mainframeActive ? daily.sources.mainframeLevelGain : daily.sources.potentialMainframeLevelGain} levels to each end of the base range{daily.sources.mainframeActive ? "" : " (potential)"}</Text>}
                        <Text size="xsmall" style={{ opacity: daily.sources.pyriteActive && daily.sources.mainframeActive ? 1 : 0.6 }}>Pyrite Rhinestone: +{daily.sources.pyriteActive && daily.sources.mainframeActive ? daily.sources.pyriteLevelGain : daily.sources.potentialPyriteLevelGain} levels to each end of the range{daily.sources.pyriteActive && daily.sources.mainframeActive ? "" : " (potential, with Lab active)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.bundle ? 1 : 0.6 }}>No Meal Left Behind bundle: +3 maximum{daily.sources.bundle ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.bundle && daily.sources.mainframeActive ? 1 : 0.6 }}>Bundle with active Lab: +1 maximum{daily.sources.bundle && daily.sources.mainframeActive ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.event ? 1 : 0.6 }}>Event shop: +2 maximum{daily.sources.event ? "" : " (potential)"}</Text>
                        <Text size="xsmall" style={{ opacity: daily.sources.tachyon ? 1 : 0.6 }}>Tachyon Truth: +3 maximum{daily.sources.tachyon ? "" : " (potential)"}</Text>
                        <Text size="xsmall">This is a preview. Actual daily gains can differ.</Text>
                    </Box>}><Text size="small" tabIndex={0} style={{ textDecoration: "underline dotted", cursor: "help" }}>{daily.enabled ? `${daily.minLevelGain}–${daily.maxLevelGain}` : "—"}</Text></TipDisplay>} />
                    <TextAndLabel label="Kattlekruk" text={daily.krukActiveVaries ? "Active for some" : daily.krukActive ? "Active" : "Inactive"} textSize="small" />
                </Box>
                {daily.maxLevelGainVaries && <Text size="xsmall" color="accent-2">Tachyon Truth can change the maximum level gain.</Text>}
                {daily.krukActiveVaries && <Text size="xsmall" color="accent-2">Kattlekruk eligibility varies by character.</Text>}
            </ShadowBox>}
            <Box direction="row" gap="medium" wrap align="center">
                <CheckBox checked={classMulti} label="Class multiplier bonus?" onChange={event => setClassMulti(event.target.checked)} />
                <Select aria-label="Discount" labelKey="label" valueKey={{ key: 'value', reduce: true }} value={discountLevel} options={bargainOptions} onChange={({ value }) => setDiscountLevel(value)} />
                <Box direction="row" align="center" gap="xsmall"><TipDisplay heading="Estimated daily target" body="Lithium and Kattlekruk upgrades can change the targets." size="small"><Ascending color="Legendary" size="large" /></TipDisplay><Text size="xsmall">Estimated daily target</Text></Box>
                <Box direction="row" align="center" gap="xsmall"><TipDisplay heading="Kattlekruk eligible" body="Eligible for Kattlekruk daily upgrades." size="small"><Box aria-label="Kattlekruk eligible"><IconImage data={krukImage} scale={0.22} /></Box></TipDisplay><Text size="xsmall">Kattlekruk eligible</Text></Box>
                <Box direction="row" align="center" gap="small" margin={{ left: "auto" }}>
                    <Text size="small">View:</Text>
                    <Box direction="row" background="dark-2" round="small" pad="xsmall" gap="xsmall">
                        <Box aria-label="Grid view" pad="xsmall" round="xsmall" background={viewMode === "grid" ? "brand" : "transparent"} onClick={() => setViewMode("grid")}><GridIcon size="small" /></Box>
                        <Box aria-label="Table view" pad="xsmall" round="xsmall" background={viewMode === "table" ? "brand" : "transparent"} onClick={() => setViewMode("table")}><List size="small" /></Box>
                    </Box>
                </Box>
            </Box>
            {viewMode === "grid" ? <Box gap="small">
                <ShadowBox background="dark-1" pad="small">
                    <Grid columns="1/4">
                        {alchemyData.cauldrons.map(cauldron => <CauldronDisplay key={cauldron.name} cauldron={cauldron} undevelopedCostsBubbleLevel={undevelopedCostsBubbleLevel} barleyBrewVialLevel={barleyBrewVialLevel} hasAchievement={hasAlchemyAchievement} discountLevel={Number(discountLevel)} classMultiBonus={classMulti} vialMultiplier={vialMultiplier} particles={particles} krukTargets={daily?.krukTargets ?? []} krukImage={krukImage} />)}
                    </Grid>
                </ShadowBox>
            </Box> : <UpgradeTable tableName="Bubbles" columns={columns} data={rows} primaryKey="id" filters={filters} onFiltersChange={setFilters} sortOptions={sortOptions} additionalFilters={featureFilters} showLockedAndMaxedFilters={false} variant="panel" />}
        </Box>)
}

function Alchemy() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [activeTab, setActiveTab] = useState<string>("Bubbles");

    if (!hydrated || !theData.get("alchemy") || !theData.get("achievements") || !theData.get("collider")) {
        return <>Loading Alchemy data</>;
    }

    return (
        <Box>
            <Box>
                <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Alchemy</Heading>
                <Box margin={{ bottom: 'small' }}>
                    <ContentTabs
                        options={[
                            { value: "Bubbles", label: "Bubbles" },
                            { value: "Vials", label: "Vials" },
                            { value: "Sigils", label: "Sigils" },
                            { value: "P2W", label: "P2W" },
                        ]}
                        value={activeTab}
                        onChange={setActiveTab}
                    />
                </Box>
                {activeTab == "Bubbles" && <BubblesDisplay />}
                {activeTab == "Vials" && <VialsDisplay />}
                {activeTab == "Sigils" && <SigilsDisplay />}
                {activeTab == "P2W" && <P2WDisplay />}
            </Box>
        </Box>
    )
}

export default Alchemy;
