"use client";

import { useState, type ReactNode } from "react";
import { Box, CheckBox, Grid, Heading, Text, TextInput } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import IconImage from "../../../components/base/IconImage";
import LeftNavButton from "../../../components/base/LeftNavButton";
import ShadowBox from "../../../components/base/ShadowBox";
import SmallButton from "../../../components/base/SmallButton";
import TextAndLabel from "../../../components/base/TextAndLabel";
import TipDisplay from "../../../components/base/TipDisplay";
import Majik from "../../../components/world-5/hole/majik";
import ResourceCharactersTooltip from "../../../components/world-5/hole/ResourceCharactersTooltip";
import Schematics from "../../../components/world-5/hole/schematics";
import Measurements from "../../../components/world-5/hole/measurements";
import { usePreservedScroll } from "../../../components/world-5/hole/upgradeInspection";
import type { Companion } from "../../../data/domain/companions";
import { Item } from "../../../data/domain/items";
import type { Player } from "../../../data/domain/player";
import type { Divinity } from "../../../data/domain/world-5/divinity";
import { Hole, type Study, type StudyEffect } from "../../../data/domain/world-5/hole/hole";
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import type { Skilling, SkillingSkill } from "../../../data/domain/skilling";
import type { Villager, VillagerCharacterRate } from "../../../data/domain/world-5/hole/villager";
import { commaNotation, nFormatter, notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";

// Dimensions come from the inspected HolePOI art map. Jars uses neutral art, not the saved aesthetic.
const cavernArt = [
    { name: "Well", location: "HolePOI0", width: 287, height: 61 },
    { name: "Motherlode", location: "HolePOI1", width: 125, height: 104 },
    { name: "Dawg Den", location: "HolePOI2", width: 187, height: 93 },
    { name: "Bravery", location: "HolePOI3", width: 141, height: 161 },
    { name: "Bell", location: "HolePOI4", width: 260, height: 166 },
    { name: "Harp", location: "HolePOI5", width: 106, height: 116 },
    { name: "Lamp", location: "HolePOI6", width: 183, height: 103 },
    { name: "Undying Hive", location: "HolePOI7", width: 100, height: 105 },
    { name: "Gloomie Mushroom Grotto", location: "HolePOI8", width: 195, height: 124 },
    { name: "Justice", location: "HolePOI9", width: 141, height: 161 },
    { name: "Jars", location: "HolePOI10_0", width: 93, height: 108 },
    { name: "Evertree", location: "HolePOI11", width: 177, height: 123 },
    { name: "Wisdom", location: "HolePOI12", width: 141, height: 161 },
    { name: "Gambit", location: "HolePOI13", width: 374, height: 125 },
    { name: "Temple", location: "HolePOI14", width: 167, height: 149 },
    { name: "Fountain", location: "HolePOI15", width: 186, height: 161 },
    { name: "Bottomless Trench", location: "HolePOI16", width: 186, height: 161 },
    { name: "Crystal Glunko Cove", location: "HolePOI17", width: 186, height: 161 },
];
const upgradeNames = ["Majik", "Schematics", "Studies", "Measurements"] as const;
const resourceCavernRailIndices = [1, 7, 11, 16];
const resourceCavernResourceNames: Record<number, string> = { 1: "Ore", 7: "Flies", 11: "Everlogs", 16: "Fish" };
const resourceCavernSynergyIds: Record<number, number[]> = { 1: [58, 15], 7: [41], 11: [80], 16: [94] };
const resourceCavernSkillIndices: Record<number, SkillingSkill> = { 1: SkillsIndex.Mining, 7: SkillsIndex.Catching, 11: SkillsIndex.Chopping, 16: SkillsIndex.Fishing };
const genuineTips = new Set([0, 2, 3, 4, 9, 13]);
type Tab = "Villagers" | "Upgrades" | "Caverns";

function number(value: number | null, reason?: string | null): string {
    return value === null ? `Unavailable${reason ? `: ${reason}` : ""}` : notateNumber(value);
}
function exact(value: number | null, reason?: string | null): string {
    return value === null ? number(null, reason) : value.toLocaleString("en-US", { maximumFractionDigits: 20 });
}
function precise(value: number | null, suffix: string, reason?: string | null): string {
    if (value === null) return number(null, reason);
    if (suffix === "") return exact(value);
    return `${Number.isInteger(value) ? commaNotation(value) : nFormatter(value, "MultiplierInfo")}${suffix}`;
}

function Portrait({ index }: { index: number }) {
    return <Box width="56px" height="64px" flex={false} style={{ overflow: "hidden" }} data-testid={`portrait-${index}`}>
        <IconImage data={{ location: `HoleUIvillager${index}`, width: 303, height: 64 }} />
    </Box>;
}

function CavernImage({ index, width = 64, height = 56 }: { index: number; width?: number; height?: number }) {
    const image = cavernArt[index];
    const scale = Math.min(width / image.width, height / image.height);
    return <Box width={`${width}px`} height={`${height}px`} flex={false} align="center" justify="center" data-cavern-art={index}>
        <IconImage data={image} scale={scale} />
    </Box>;
}

function Progress({ current, required, label, testId, requiredReason }: {
    current: number | null; required: number | null; label: string; testId: string; requiredReason?: string | null;
}) {
    return <Box gap="xxsmall" data-testid={testId}>
        <Text size="xsmall" color="accent-2">{label}</Text>
        <Text size="small">{number(current, `Saved ${label === "EXP progress" ? "EXP" : "Study progress"} is missing.`)} / {number(required, requiredReason ?? "Saved level or requirement is missing.")}</Text>
        {current !== null && required !== null && required > 0 && <Box background="grey-1" height="8px" overflow="hidden" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={required} aria-valuenow={current}>
            <Box background="brand" height="8px" flex={false} style={{ width: `${100 * Math.min(1, Math.max(0, current / required))}%` }} />
        </Box>}
    </Box>;
}

function completeRate(rate: VillagerCharacterRate | undefined): rate is VillagerCharacterRate {
    if (rate === undefined || rate.unavailableReason !== null || rate.inputs === null) return false;
    const inputs = rate.inputs;
    const numericValues = [rate.expPerHour, rate.statueBonus, rate.statueFactor, inputs.roleMultiplier, inputs.opalExp,
        inputs.accountMultiplier, inputs.exoticBonus, inputs.arcadeBonus, inputs.grimoireBonus,
        inputs.arcaneBonus, inputs.equalSpreadBonus, inputs.additiveBonus];
    return numericValues.every(value => Number.isFinite(value))
        && rate.contributors.every(row => row.value !== null && Number.isFinite(row.value) && !row.unavailableReason);
}

function equalRate(left: VillagerCharacterRate, right: VillagerCharacterRate): boolean {
    return left.expPerHour === right.expPerHour && left.statueBonus === right.statueBonus && left.statueFactor === right.statueFactor
        && Object.entries(left.inputs!).every(([key, value]) => value === right.inputs![key as keyof typeof right.inputs])
        && left.contributors.every((row, index) => row.value === right.contributors[index].value);
}

function nextUnlock(villager: Villager, hole: Hole): string {
    const next = villager.nextUnlock;
    if (!next) return number(null, villager.unlockUnavailableReason);
    if (next.releasedMaximum) return "Nothing right now";
    const level = next.requiredLevel === null ? "" : ` at level ${exact(next.requiredLevel)}`;
    switch (next.kind) {
        case "cavern": return `Next cavern: ${next.identities.map(index => cavernArt[index].name).join(", ")}${level}`;
        case "schematic": return `Next schematic: ${next.identities.map(index => hole.schematics.find(entry => entry.index === index)?.data.name.replace(/_/g, " ")).join(", ")}${level} (availability, not construction)`;
        case "measurement": return `Next Measurement${level} (access, not purchase)`;
        case "majik-point": return `Next Majik point${level}`;
        case "study-rate": return `Study speed increase${level}`;
    }
}

function Benefit({ index, effects, dailyPurchases }: { index: number; effects: StudyEffect[]; dailyPurchases: number | null }) {
    const values = new Map(effects.map(effect => [effect.key, effect]));
    const value = (key: string, suffix = "") => {
        const effect = values.get(key)!;
        return typeof effect.value === "number" ? precise(effect.value, suffix) : number(null, effect.unavailableReason);
    };
    let main: ReactNode;
    let detail: ReactNode = null;
    if ([1, 7, 11, 16].includes(index)) {
        main = "Cheaper layers in other skilling caverns";
    } else {
        switch (index) {
            case 0: main = `${value("sediment-retained-after-expansion", "%")} sediment retained; +${value("bucket-fill-per-expansion", "%")} bucket fill per expansion`; break;
            case 2: main = `${value("score-per-defeated-golden-hound", "×")} golden hound score`; break;
            case 3: main = `Minimum damage: ${value("minimum-damage-share-of-maximum", "%")} of maximum`; break;
            case 4: main = `+${value("random-bonus-levels-every-twentieth-ring")} random bonus levels every twentieth ring`; break;
            case 5: main = `${value("string-experience", "×")} string EXP`; detail = `${value("exceptional-string-experience-chance", "%")} chance for ${value("exceptional-string-experience", "×")} exceptional string EXP.`; break;
            case 6: main = `+${value("additional-daily-wishes")} daily wishes`; break;
            case 8: main = `${value("credited-gloomie-kills", "×")} credited Gloomie kills`; break;
            case 9: main = `+${value("additional-linear-reward-days")} reward days; ${value("opal-reward-chance", "×")} Opal reward chance`; break;
            case 10: main = `${value("enchantment-chance", "×")} enchantment chance`; break;
            case 12: main = `+${value("additional-starting-attempts")} starting attempts`; break;
            case 13: main = `+${value("total-gambit-points", "%")} Gambit points`; break;
            case 14: main = `+${value("additional-double-torch-chance", "%")} double-torch chance`; break;
            case 15: main = `${value("marble-production", "×")} marble production`; break;
            case 17: {
                const cost = values.get("discounted-upgrade-cost")!;
                const discount = typeof cost.value === "number" ? precise(100 - cost.value * 100, "%") : number(null, cost.unavailableReason);
                main = `First ${value("daily-discounted-upgrades")} upgrades each day cost ${discount} less`;
                detail = `Saved upgrades today: ${exact(dailyPurchases, "Saved Cove purchases today are missing.")}.`;
                break;
            }
        }
    }
    const missing = effects.filter(effect => effect.value === null);
    return <Box gap="xxsmall" data-testid={`benefit-${index}`}>
        <Text size="small">{main}</Text>
        {detail && <Text size="xsmall" color="accent-2">{detail}</Text>}
        {missing.length > 0 && <Text size="small" data-testid={`benefit-missing-${index}`}>{[...new Set(missing.map(effect => effect.unavailableReason))].join(" ")}</Text>}
    </Box>;
}

export default function HoleContent() {
    const { ref, minHeight, preserveScroll } = usePreservedScroll();
    const { data, dataStatus } = useAppDataStore(useShallow(state => ({ data: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })));
    const [tab, setTab] = useState<Tab>("Villagers");
    const [upgrade, setUpgrade] = useState<typeof upgradeNames[number]>("Studies");
    const [characterId, setCharacterId] = useState<number | null>(null);
    const [cavern, setCavern] = useState(0);
    const [search, setSearch] = useState("");
    const [showUnlocked, setShowUnlocked] = useState(false);
    const hole = data.get("hole") as Hole;
    if ((dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !hole) {
        return <Box gap="small"><Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading><Text data-testid="hole-loading">Waiting for imported account data.</Text></Box>;
    }

    const characters = (data.get("players") as Player[]).map(player => ({ playerId: player.playerID, playerName: player.playerName }));
    const rates = hole.villagers.map(villager => villager.characterRates);
    const complete = characters.length > 0 && rates.every(rows => rows.length === characters.length
        && characters.every(character => completeRate(rows.find(rate => rate.playerId === character.playerId))));
    const equal = complete && rates.every(rows => rows.every(rate => equalRate(rows[0], rate)));
    const sharedGrowth = (rates[0]?.[0]?.contributors ?? []).filter(row =>
        !["EXP per invested Opal", "Invested Opals", "Role multiplier", "Purchased EXP multiplier", "Opal Enthusiasm", "Villager Statue"].includes(row.source)
        && (row.value === null || row.unavailableReason || (row.unit === "percent" ? row.value !== 0 : row.unit === "multiplier" && row.value !== 1)));
    const sharedGrowthRows = sharedGrowth.map(row => {
        const source = row.source.replace(/ Villager EXP$/, "");
        const name = source === "Legend" ? "Legend Talents" : source === "Pristine" ? "Pristine Charm"
            : source === "Collectible" ? "Jar collectibles" : source === "Arcane" ? "Tesseract" : source;
        const value = row.unavailableReason ? null : row.value;
        return { name, value: precise(value, row.unit === "multiplier" ? "×" : "%", row.unavailableReason) };
    });
    const ledger = hole.opalLedger;
    const usefulLocations = hole.lanterns.locations.filter(location => location.quantity === null || location.quantity !== 0);
    const usefulOpalSources = ledger.sources.filter(source => source.opals === null || source.opals !== 0);
    const anotherTryState = hole.anotherTry.access === false ? "Locked"
        : hole.anotherTry.access === null ? "Unavailable: Saved Lamp access is missing"
            : hole.anotherTry.availableWishes === null || hole.anotherTry.affordable === null ? "Unavailable: Saved wish balance is missing"
                : hole.anotherTry.affordable ? ""
                    : `Not enough wishes (${exact(hole.anotherTry.availableWishes)} owned)`;
    const studies = hole.studies.map(study => {
        const effects = study.getEffects();
        const effectSearch = effects.map(effect => effect.key.replace(/-/g, " ")).join(" ");
        const skillingSearch = [1, 7, 11, 16].includes(study.index) ? "Cheaper layers in other skilling caverns" : "";
        return { study, effects, searchable: `${cavernArt[study.index].name} ${study.data.name.replace(/_/g, " ")} ${study.levelAvailable ? study.getDescription().replace(/_/g, " ") : ""} ${effectSearch} ${skillingSearch}`.toLowerCase() };
    });
    const visibleStudies = studies.filter(view => (!showUnlocked || view.study.access === true) && view.searchable.includes(search.toLowerCase()));
    const resourceCavernPosition = resourceCavernRailIndices.indexOf(cavern);
    const selectedResourceCavern = resourceCavernPosition < 0
        ? null
        : Object.values(hole.resourceCavrens.cavrens)[resourceCavernPosition];
    const skilling = data.get("skilling") as Skilling;
    const resourceCharacters = selectedResourceCavern === null ? [] : characters
        .map(character => ({
            ...character,
            efficiency: skilling.getSkillEfficiency(character.playerId, resourceCavernSkillIndices[cavern]),
        }))
        .filter(character => selectedResourceCavern.efficiencyThreshold !== null
            && character.efficiency >= selectedResourceCavern.efficiencyThreshold);
    const selectedSynergy = selectedResourceCavern === null ? [] : (resourceCavernSynergyIds[cavern] ?? []).flatMap(index => {
        const schematic = hole.schematics.find(entry => entry.index === index);
        if (!schematic?.saveAvailable || !schematic.built) return [];
        const effect = schematic.getEffects().find(entry => entry.key === `schematic:${index}:${index === 58 ? "bonus" : "intrinsic"}`);
        return [{ index, schematic, effect }];
    });
    const requirementStudies = [1, 7, 11, 16].map(index => hole.studies[index]);

    return <Box gap="small" data-testid="hole-ready" ref={ref} style={{ minWidth: 0, minHeight, fontVariantNumeric: "tabular-nums" }}>
        <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading>
        <Box direction="row" gap="large" wrap align="center" data-testid="resource-summary">
            <TipDisplay heading="Opal sources and allocation" size="small" maxWidth="560px" body={<Box gap="small" data-testid="opal-tip-body" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                {["Caverns", "Other sources"].map(group => <Box key={group} gap="xxsmall" flex={false}>
                    <Text size="xsmall" weight="bold">{group}</Text>
                    {usefulOpalSources.filter(source => source.owner.startsWith("cavern:") === (group === "Caverns")).map(source => <Grid columns={["minmax(0, 1fr)", "auto"]} gap="small" key={source.id} data-testid={`opal-source-${source.id}`}>
                        <Text size="xsmall">{source.owner.startsWith("cavern:") && cavernArt[Number(source.owner.split(":")[1])] ? cavernArt[Number(source.owner.split(":")[1])].name : source.name.replace(/_/g, " ").replace(/\b[A-Z][A-Z]+\b/g, word => word[0] + word.slice(1).toLowerCase())}</Text>
                        <Text size="xsmall">{exact(source.opals, source.unavailableReason)}</Text>
                    </Grid>)}
                </Box>)}
                {ledger.emperorSchematicFloorAdjustment !== 0 && <Text size="xsmall" data-testid="opal-floor-adjustment">Emperor + schematic floor adjustment: {exact(ledger.emperorSchematicFloorAdjustment, ledger.unavailableReason)}</Text>}
                {ledger.externalRoundingAdjustment !== 0 && <Text size="xsmall" data-testid="opal-rounding-adjustment">External subtotal rounding adjustment: {exact(ledger.externalRoundingAdjustment, ledger.unavailableReason)}</Text>}
                <Text size="xsmall" data-testid="equal-spread">Equal Spread: {precise(hole.allocationEffects.equalSpreadPercent, "%", hole.allocationEffects.equalSpreadUnavailableReason)}. Minimum unlocked-villager investment: {exact(hole.allocationEffects.leastUnlockedInvestment, hole.allocationEffects.unavailableReason)} Opals.</Text>
                {ledger.unavailableReason && <Text size="xsmall">{number(null, ledger.unavailableReason)}</Text>}
            </Box>}>
                <Box direction="row" gap="xsmall" align="center" data-testid="opal-tip"><IconImage data={Item.getImageData("Opal")} scale={0.75} /><Text size="small">Opals</Text><Text size="small" data-testid="opal-ratio">{ledger.uninvested === null || ledger.earned === null ? number(null, ledger.unavailableReason ?? "Saved Opal totals are missing.") : `${number(ledger.uninvested)} / ${number(ledger.earned)} available`}</Text><CircleInformation size="12px" /></Box>
            </TipDisplay>
            <Box direction="row" gap="xsmall" align="center"><IconImage data={Item.getImageData("Quest90")} scale={0.75} /><Text size="small">Lanterns</Text>
                <TipDisplay heading="Lantern stock" size="small" maxWidth="420px" body={<Box gap="xxsmall" data-testid="lantern-tip-body">
                    {usefulLocations.map(location => <Text size="xsmall" key={location.kind === "storage" ? "storage" : location.playerId} data-testid="lantern-location">{location.kind === "storage" ? "Storage" : `${location.playerName} inventory`}: {exact(location.quantity, location.unavailableReason)}</Text>)}
                    {usefulLocations.length === 0 && <Text size="xsmall">Total stock: {exact(hole.lanterns.totalStock, "Saved Lantern locations are missing.")}.</Text>}
                </Box>}><Box direction="row" gap="xsmall" align="center" data-testid="lantern-tip"><Text size="small">{number(hole.lanterns.totalStock, hole.lanterns.locations.find(location => location.quantity === null)?.unavailableReason ?? "Saved Lantern locations are missing.")}</Text><CircleInformation size="12px" /></Box></TipDisplay>
                <Text size="small" data-testid="lantern-uses">{number(hole.lanterns.usesToday, hole.lanterns.usageUnavailableReason)} / {hole.lanterns.dailyLimit} today</Text>
            </Box>
        </Box>
        <Box data-testid="hole-feature" gap="small">
            <Box data-testid="hole-tabs"><ContentTabs<Tab> options={[{ value: "Villagers", label: "Villagers" }, { value: "Upgrades", label: "Upgrades" }, { value: "Caverns", label: "Caverns" }]} value={tab} onChange={value => preserveScroll(() => setTab(value))} /></Box>
            {tab === "Villagers" && <Box gap="small" data-testid="villagers-panel">
                <Box direction="row" gap="medium" align="center" wrap>
                    <TipDisplay heading="Shared growth bonuses" size="small" body={<Box gap="xxsmall" data-testid="shared-growth-tip-body" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                        {sharedGrowthRows.map(row => <Grid columns={["minmax(0, 1fr)", "auto"]} gap="small" key={row.name}><Text size="xsmall">{row.name}</Text><Text size="xsmall">{row.value}</Text></Grid>)}
                        {sharedGrowthRows.length === 0 && <Text size="xsmall">No nonzero shared bonuses available.</Text>}
                    </Box>} maxWidth="420px">
                        <Box direction="row" gap="xsmall" align="center" data-testid="shared-growth-tip"><Text size="small">Shared growth bonuses</Text><CircleInformation size="12px" /></Box>
                    </TipDisplay>
                    <TipDisplay heading="Another Try" size="small" maxWidth="460px" body={<Box gap="small" data-testid="another-try-tip-body" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                        {hole.anotherTry.resets.map(reset => <Box key={reset.category} gap="xxsmall"><Text size="xsmall" weight="bold">{reset.category}</Text><Text size="xsmall">Clears: {reset.clears.join("; ")}.</Text><Text size="xsmall">Retains: {reset.retains.join("; ")}.</Text></Box>)}
                    </Box>}><Box direction="row" gap="xsmall" align="center" data-testid="another-try-tip"><Text size="small">Another Try: {exact(hole.anotherTry.wishCost)} wishes{anotherTryState ? ` · ${anotherTryState}` : ""}</Text><CircleInformation size="12px" /></Box></TipDisplay>
                </Box>
                {!equal && <Box direction="row" gap="small" align="center"><Text size="small">{complete ? "Character rates differ" : "Some character rates are unavailable. Ranges show available contexts only."}</Text><select data-testid="inspect-character" aria-label="Inspect character rates" value={characterId ?? ""} onChange={event => setCharacterId(event.target.value === "" ? null : Number(event.target.value))} style={{ font: "inherit", color: "inherit", background: "#1E2127", padding: "8px" }}><option value="">Choose a character (optional)</option>{characters.map(character => <option key={character.playerId} value={character.playerId}>{character.playerName}</option>)}</select></Box>}
                <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small" data-testid="villager-grid">{hole.villagers.map(villager => {
                    const rows = rates[villager.index];
                    const matched = equal ? rows[0] : characterId === null ? null : rows.find(rate => rate.playerId === characterId);
                    const available = rows.filter(completeRate);
                    const missingReasons = [...new Set(rows.filter(row => !completeRate(row)).map(row =>
                        row.unavailableReason ?? row.contributors.find(contributor => contributor.value === null || contributor.unavailableReason)?.unavailableReason
                        ?? "This character's complete growth inputs are unavailable."))];
                    const reason = matched?.unavailableReason
                        ?? matched?.contributors.find(row => row.value === null || row.unavailableReason)?.unavailableReason
                        ?? "This character's complete growth inputs are unavailable.";
                    const rateText = matched ? completeRate(matched) ? number(matched.expPerHour) : number(null, reason)
                        : characterId !== null ? number(null, "This character's rate is unavailable.")
                            : available.length > 0 ? `${number(Math.min(...available.map(rate => rate.expPerHour!)))}–${number(Math.max(...available.map(rate => rate.expPerHour!)))}`
                                : number(null, missingReasons.join(" ") || "No complete character rate.");
                    const enthusiasm = hole.allocationEffects.opalEnthusiasm.find(entry => entry.villagerId === villager.index)!;
                    const statue = matched?.contributors.find(row => row.source === "Villager Statue");
                    const rateTip = matched ? <Box gap="xsmall" data-testid={`rate-tip-body-${villager.index}`}>
                        <Text>Villager Statue: {matched.statueBonus === null || matched.statueFactor === null
                            ? number(null, statue?.unavailableReason ?? "Saved Villager Statue state is missing for this character.")
                            : `${precise(matched.statueBonus, "%")}; ${precise(matched.statueFactor, "×")} EXP.`}</Text>
                        {matched.contributors.filter(row => ["Purchased EXP multiplier", "Role multiplier"].includes(row.source)
                            && (row.value === null || row.unavailableReason || row.value !== 1)).map(row =>
                            <Text key={row.source}>{row.source}: {precise(row.unavailableReason ? null : row.value, "×", row.unavailableReason)}</Text>)}
                    </Box> : null;
                    return <ShadowBox key={villager.index} background="dark-1" pad="medium" gap="small" data-testid={`villager-card-${villager.index}`} style={{ minWidth: 0 }}>
                        <Box gap="small" style={{ opacity: villager.rescued === false ? 0.6 : 1 }}>
                            <Box direction="row" gap="small" align="center"><Portrait index={villager.index} /><Box flex><Text>{villager.name}</Text><Text size="xsmall" color="accent-2">{villager.title}</Text></Box><TextAndLabel label="Level" text={number(villager.saveAvailable ? villager.level : null, "Saved level is missing.")} textSize="large" /></Box>
                            <Box direction="row" gap="medium"><TextAndLabel label="Invested Opals" text={number(villager.investmentAvailable ? villager.opals : null, "Saved investment is missing.")} tooltip={`Opal Enthusiasm: ${precise(enthusiasm.percent, "%", enthusiasm.unavailableReason)} from ${number(enthusiasm.investedTens)} invested tens.`} /><TextAndLabel label="EXP/hour" text={rateText} tooltip={rateTip ?? undefined} /></Box>
                            <Progress current={villager.expAvailable ? villager.currentExp : null} required={villager.getExpRequirement()} requiredReason={villager.requirementUnavailableReason} label="EXP progress" testId={`villager-progress-${villager.index}`} />
                            <Text size="xsmall" data-testid={`next-unlock-${villager.index}`}>{nextUnlock(villager, hole)}</Text>
                        </Box>
                        {!matched && characterId === null && available.length > 0 && missingReasons.length > 0 && <Text size="small">{number(null, missingReasons.join(" "))}</Text>}
                        {villager.rescued !== true && <Text size="small">{villager.rescued === false ? "Not rescued" : number(null, villager.unlockUnavailableReason)}</Text>}
                        {villager.claimReady === true && <Text size="small" data-testid={`villager-readiness-${villager.index}`}>Ready to claim in game</Text>}
                        {villager.claimReady === null && <Text size="small">{number(null, villager.requirementUnavailableReason ?? "Saved progression is missing.")}</Text>}
                    </ShadowBox>;
                })}</Grid>
            </Box>}
            {tab === "Upgrades" && <ShadowBox flex={false} data-testid="upgrades-panel"><Grid rows="1" columns={["25%", "75%"]}>
                <Box pad="medium" height="100%" data-testid="upgrade-rail">{upgradeNames.map(name => <Box key={name} data-testid={`upgrade-nav-${name}`}><LeftNavButton text={name} isActive={upgrade === name} clickHandler={() => preserveScroll(() => setUpgrade(name))} /></Box>)}</Box>
                <Box fill background="dark-1" pad="medium" gap="small" style={{ minWidth: 0 }}>
                    <Box direction="row" gap="small" align="center"><Portrait index={upgrade === "Majik" ? 2 : upgrade === "Schematics" ? 1 : upgrade === "Measurements" ? 3 : 4} /><Heading level="3" size="small" margin="none">{upgrade}</Heading>{upgrade === "Studies" && <Text size="small" data-testid="study-speed">Study speed: {number(hole.studyRate, hole.studyInputsUnavailableReason)} progress/hour</Text>}</Box>
                    {upgrade === "Majik" && <Majik hole={hole} divinity={data.get("divinity") as Divinity} companions={data.get("companions") as Companion[]} />}
                    {upgrade === "Schematics" && <Schematics hole={hole} />}
                    {upgrade === "Measurements" && <Measurements hole={hole} />}
                    {upgrade === "Studies" && <>
                        <Box direction="row" gap="small" align="center"><TextInput data-testid="study-search" aria-label="Search Studies" placeholder="Search Studies" value={search} onChange={event => setSearch(event.target.value)} /><CheckBox data-testid="study-unlocked" label="Show unlocked" checked={showUnlocked} onChange={event => setShowUnlocked(event.target.checked)} />{search !== "" && <SmallButton data-testid="clear-study-search" label="Clear search" onClick={() => setSearch("")} style={{ whiteSpace: "nowrap", minWidth: "88px", flexShrink: 0 }} />}</Box>
                        <Text size="small" color="accent-2" data-testid="study-count">{visibleStudies.length} of {hole.studies.length} Studies</Text>
                        {visibleStudies.length === 0 && <Text data-testid="study-no-results">No Studies match. Clear search or turn off Show unlocked.</Text>}
                        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small" data-testid="study-grid">{visibleStudies.map(({ study, effects }) => <StudyCard key={study.index} study={study} effects={effects} />)}</Grid>
                    </>}
                </Box>
            </Grid></ShadowBox>}
            {tab === "Caverns" && <ShadowBox flex={false} data-testid="caverns-panel"><Grid rows="1" columns={["25%", "75%"]}>
                <Box pad="medium" height="100%" data-testid="cavern-rail">{cavernArt.map((image, index) => <Box direction="row" align="center" key={image.name} data-testid={`cavern-nav-${index}`}><CavernImage index={index} width={32} height={28} /><Box flex><LeftNavButton text={image.name} isActive={cavern === index} clickHandler={() => preserveScroll(() => setCavern(index))} /></Box></Box>)}</Box>
                <Box fill background="dark-1" pad="medium" gap="medium" style={{ minWidth: 0 }} data-testid="selected-cavern">
                    <Box direction="row" gap="small" align="center"><CavernImage index={cavern} width={96} height={80} /><Heading level="3" size="small" margin="none">{cavernArt[cavern].name}</Heading></Box>
                    {selectedResourceCavern === null ? <>
                        {hole.cavernOpalSources.filter(source => source.owner === `cavern:${cavern}`).map(source => <TextAndLabel key={source.id} label="Earned Opals" text={number(source.opals, source.unavailableReason)} tooltip={exact(source.opals, source.unavailableReason)} />)}
                        <Box gap="small"><Text color="accent-2" size="small">Owned Study benefit</Text><Benefit index={cavern} effects={studies[cavern].effects} dailyPurchases={hole.studies[cavern].dailyCoveUpgradesPurchased} /></Box>
                        <Text size="small">Other cavern tools are not supported on this website yet.</Text>
                    </> : <>
                        <Box gap="small" data-testid="resource-cavern-progress">
                            <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small" align="start" data-testid="resource-cavern-fields">
                                <TextAndLabel label={cavern === 11 ? "Trunks" : cavern === 16 ? "Depth" : "Layers"} text={number(selectedResourceCavern.completedLayers)} textSize="small" labelSize="xsmall" />
                                <Box gap="xsmall">
                                    <TipDisplay heading="Resource requirement" size="small" maxWidth="520px" body={<Box gap="xsmall" data-testid="resource-requirement-tip">
                                        <Text size="xsmall">Requirement context includes AMETHYST HEARTSTONE and these cross-cavern Studies:</Text>
                                        {requirementStudies.map(study => <Box key={study.index} gap="xxsmall"><Text size="xsmall" weight="bold">Study {study.index}: {study.data.name.replace(/_/g, " ")}</Text><Text size="xsmall">{study.getDescription().replace(/_/g, " ")}</Text></Box>)}
                                    </Box>}>
                                    <TextAndLabel
                                        label={`${resourceCavernResourceNames[cavern]} current / required`}
                                        text={`${number(selectedResourceCavern.resourceCurrent)} / ${number(selectedResourceCavern.resourceRequirement)}`}
                                        textSize="small"
                                        labelSize="xsmall"
                                        textColor={selectedResourceCavern.resourceRequirementMet === true ? "status-ok" : undefined}
                                    />
                                    </TipDisplay>
                                    {selectedResourceCavern.name === "Motherload" && <TextAndLabel label="Lifetime ore" text={number(hole.resourceCavrens.lifetimeMotherlodeOre)} textSize="small" labelSize="xsmall" />}
                                </Box>
                                <TipDisplay heading="Characters meeting requirement" size="small" maxWidth="320px" body={<ResourceCharactersTooltip
                                    efficiencyThreshold={selectedResourceCavern.efficiencyThreshold}
                                    characters={resourceCharacters}
                                />}>
                                    <TextAndLabel
                                        label={`${selectedResourceCavern.efficiencyType} required`}
                                        text={number(selectedResourceCavern.efficiencyThreshold)}
                                        textSize="small"
                                        labelSize="xsmall"
                                    />
                                </TipDisplay>
                                <TipDisplay heading="Shared cavern claims" size="small" maxWidth="420px" body={<Box gap="xsmall" data-testid="shared-claim-tip">
                                    <Text size="xsmall">Six claims per day are shared across all four resource caverns.</Text>
                                    <Text size="xsmall">Claims are made manually in game.</Text>
                                </Box>}>
                                    <TextAndLabel label="Claims remaining" text={number(hole.resourceCavrens.getRemainingSharedClaims())} textSize="small" labelSize="xsmall" />
                                </TipDisplay>
                            </Grid>
                        </Box>
                        {selectedSynergy.map(({ index, schematic, effect }) => {
                            const target = ({ 58: "Bucket Fill Rate", 15: "Well bucket fill", 41: "Harp note production", 80: "Jar Rupie value", 94: "Fountain currency" } as Record<number, string>)[index];
                            const value = effect && typeof effect.value === "number"
                                ? index === 58 ? `${effect.value > 0 ? "+" : ""}${precise(effect.value, "/hr")}` : precise(effect.value, "×")
                                : number(null, effect ? undefined : "Schematic effect is unavailable.");
                            const description = schematic.getDescription().replace(/_/g, " ");
                            return <Box key={index} direction="row" gap="small" align="center" wrap data-testid={`cavern-synergy-${index}`}>
                                <TextAndLabel label={target} text={value} textSize="small" labelSize="xsmall" />
                                {description !== "" && <TipDisplay heading={`${target} details`} size="small" maxWidth="420px" body={<Text size="xsmall">{description}</Text>}><CircleInformation size="12px" /></TipDisplay>}
                            </Box>;
                        })}
                        {selectedSynergy.length === 0 && <Text size="small">{hole.schematics.filter(schematic => (resourceCavernSynergyIds[cavern] ?? []).includes(schematic.index)).some(schematic => !schematic.saveAvailable) ? "Unavailable: Saved schematic ownership is missing." : "No owned relevant benefits."}</Text>}
                    </>}
                </Box>
            </Grid></ShadowBox>}
        </Box>
    </Box>;
}

function StudyCard({ study, effects }: { study: Study; effects: StudyEffect[] }) {
    const active = study.access === true && (study.participation === "target" || study.participation === "neighbor");
    const description = study.levelAvailable && study.level >= 1 && genuineTips.has(study.index) ? study.getDescription().replace(/_/g, " ") : null;
    const art = <Box direction="row" gap="xxsmall" align="center" data-testid={`study-art-${study.index}`}><CavernImage index={study.index} />{description !== null && <CircleInformation size="small" />}</Box>;
    return <ShadowBox background="dark-1" pad="medium" gap="small" border={active ? { color: "green-1", size: "1px" } : undefined} data-testid={`study-card-${study.index}`} data-participation={study.participation} data-access={String(study.access)} style={{ minWidth: 0 }}>
        <Box gap="small" style={{ opacity: 1 }} data-testid={`study-body-${study.index}`}>
            <Box direction="row" gap="small" align="center">{description !== null ? <TipDisplay heading={`${cavernArt[study.index].name} Study`} body={<Text data-testid={`study-tip-body-${study.index}`}>{description}</Text>} maxWidth="420px"><Box data-testid={`study-tip-${study.index}`}>{art}</Box></TipDisplay> : art}<Box flex><Text>{cavernArt[study.index].name}</Text><Text size="large" data-testid={`study-level-${study.index}`}>Level {number(study.levelAvailable ? study.level : null, "Saved Study level is missing.")}</Text></Box></Box>
            <Benefit index={study.index} effects={effects} dailyPurchases={study.dailyCoveUpgradesPurchased} />
            <Progress current={study.progressAvailable ? study.progress : null} required={study.getRequirement()} requiredReason="Saved Study level is missing." label="Progress to next level" testId={`study-progress-${study.index}`} />
        </Box>
        {study.access === false && <Text size="small" data-testid={`study-locked-${study.index}`}>Locked</Text>}
        {study.access === null && <Text size="small">Unavailable: Saved cavern access is missing.</Text>}
        {study.participation === "unavailable" && study.access !== false && <Text size="small" data-testid={`study-unavailable-${study.index}`}>{number(null, study.rateUnavailableReason ?? "Saved Study participation is missing.")}</Text>}
        {study.claimReady === true && <Text size="small" data-testid={`study-readiness-${study.index}`}>Ready to claim in game</Text>}
        {study.claimReady === null && <Text size="small">Saved Study progression is unavailable.</Text>}
    </ShadowBox>;
}
