"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Anchor, Box, CheckBox, Heading, Text, TextInput } from "grommet";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import DataRow from "../../../components/base/DataRow";
import IconImage from "../../../components/base/IconImage";
import LeftNavButton from "../../../components/base/LeftNavButton";
import SmallButton from "../../../components/base/SmallButton";
import TextAndLabel from "../../../components/base/TextAndLabel";
import { Item } from "../../../data/domain/items";
import { Hole, type Study, type StudyEffect } from "../../../data/domain/world-5/hole/hole";
import type { HoleContributor, Villager } from "../../../data/domain/world-5/hole/villager";
import { notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";

const cavernNames = ["Well", "Motherlode", "Dawg Den", "Bravery", "Bell", "Harp", "Lamp", "Undying Hive", "Gloomie Mushroom Grotto", "Justice", "Jars", "Evertree", "Wisdom", "Gambit", "Temple", "Fountain", "Bottomless Trench", "Crystal Glunko Cove"];
const upgradeNames = ["Majik", "Schematics", "Studies", "Measurements"] as const;
type Upgrade = typeof upgradeNames[number];
type Tab = "Villagers" | "Upgrades" | "Caverns";
type Destination = { tab: Tab; upgrade: Upgrade; cavern: number; study: number | null; source: string | null };
const externalRoutes: Record<string, { name: string; href: string }> = {
    grimoire: { name: "Grimoire", href: "/master-classes/grimoire" },
    companions: { name: "Companions", href: "/account/companions" },
    compass: { name: "Compass", href: "/master-classes/compass" },
    tesseract: { name: "Arcane", href: "/master-classes/tesseract" },
    sushi: { name: "Sushi Station", href: "/world-7/sushi" },
    stamps: { name: "Stamps", href: "/world-1/stamps" },
    legendTalents: { name: "Legend Talents", href: "/world-7/legendTalents" },
    sneaking: { name: "Sneaking", href: "/world-6/sneaking" },
    farming: { name: "Farming", href: "/world-6/farming" },
    arcade: { name: "Arcade", href: "/world-2/arcade" },
    tome: { name: "The Tome", href: "/account/tome" },
    summoning: { name: "Summoning", href: "/world-6/summoning" },
    upgradeVault: { name: "Upgrade Vault", href: "/account/upgrade-vault" },
    cards: { name: "Cards", href: "/account/cards" },
};
const namedSourceOwners: Record<string, string> = {
    gems: "Gem Shop", emperor: "Emperor", statues: "Character Statues", eventShop: "Event Shop",
};
const effectLabels: Record<string, string> = {
    "sediment-retained-after-expansion": "Sediment retained after expansion",
    "bucket-fill-per-expansion": "Bucket fill per expansion",
    "skilling-requirement-divisor-contribution-per-layer": "Requirement divisor contribution per completed layer",
    "skilling-requirement-divisor-contribution": "Total requirement divisor contribution",
    "score-per-defeated-golden-hound": "Score per defeated golden hound",
    "golden-hound-respawns": "Golden hound respawns",
    "minimum-damage-share-of-maximum": "Minimum damage share of maximum damage",
    "skip-guaranteed-one-hit-fights": "Skip guaranteed one-hit fights",
    "random-bonus-levels-every-twentieth-ring": "Random bonus levels every twentieth ring",
    "string-experience": "String EXP",
    "exceptional-string-experience-chance": "Exceptional string EXP chance",
    "exceptional-string-experience": "Exceptional string EXP",
    "additional-daily-wishes": "Additional daily wishes",
    "credited-gloomie-kills": "Credited Gloomie kills",
    "additional-linear-reward-days": "Additional linear reward days",
    "opal-reward-chance": "Opal reward chance",
    "choose-enchantment-target": "Choose enchantment target",
    "enchantment-chance": "Enchantment chance",
    "instamatch-when-round-ends-with-none": "Instamatch when a round ends with none",
    "additional-starting-attempts": "Additional starting attempts",
    "total-gambit-points": "Total Gambit points",
    "preserve-daily-attempt-chance": "Preserve daily attempt chance",
    "additional-double-torch-chance": "Additional double torch chance",
    "owned-repeat-marbleization-rule": "Owned repeat marbleization rule",
    "marble-production": "Marble production",
    "daily-discounted-upgrades": "Daily discounted upgrades",
    "discounted-upgrade-cost": "Discounted upgrade cost",
    "current-upgrade-cost": "Current upgrade cost",
};

function number(value: number | null, reason?: string | null): string {
    if (value === null) return `Unavailable${reason ? `: ${reason}` : ""}`;
    return value !== 0 && Math.abs(value) < 1 ? exact(value) : notateNumber(value);
}
function exact(value: number | null, reason?: string | null): string {
    return value === null ? number(null, reason) : value.toLocaleString("en-US", { maximumFractionDigits: 20 });
}
function decimal(value: number | null, reason?: string | null): string {
    return exact(value, reason);
}
function status(value: boolean | null, yes: string, no: string, reason?: string | null): string {
    return value === null ? number(null, reason) : value ? yes : no;
}
function readiness(value: boolean | null, reason: string | null): string {
    return status(value, "Ready to claim in game", "Not ready to claim in game", reason);
}
function readable(value: string): string {
    return value.replace(/_/g, " ");
}
function effectValue(effect: StudyEffect): string {
    if (effect.value === null) return number(null, effect.unavailableReason);
    if (typeof effect.value === "boolean") return effect.value ? "Owned rule" : "Not owned";
    if (effect.unit === "percent") return `${decimal(effect.value)}%`;
    if (effect.unit === "multiplier") return `${decimal(effect.value)}×`;
    return `${number(effect.value)} ${effect.unit}`;
}
function Disclosure({ title, id, open, children }: { title: string; id: string; open?: boolean; children: ReactNode }) {
    return <Box background="dark-1" pad="small" style={{ minWidth: 0 }}>
        <details data-testid={id} open={open}>
            <summary style={{ cursor: "pointer" }}>{title}</summary>
            <Box gap="small" margin={{ top: "small" }}>{children}</Box>
        </details>
    </Box>;
}
function Values({ values }: { values: { label: string; value: string }[] }) {
    return <Box direction="row" wrap gap="medium">
        {values.map(value => <TextAndLabel key={value.label} label={value.label} text={value.value} textSize="small" />)}
    </Box>;
}

function queryIndex(value: string | null, count: number): number | null {
    if (value === null || !/^\d+$/.test(value)) return null;
    const index = Number(value);
    return index < count ? index : null;
}
function queryDestination(params: Pick<URLSearchParams, "get">, previous: Destination): Destination {
    const study = queryIndex(params.get("study"), cavernNames.length);
    const tab = (["Villagers", "Upgrades", "Caverns"] as const).find(value => value.toLowerCase() === params.get("tab")?.toLowerCase())
        ?? (study === null ? "Villagers" : "Upgrades");
    const upgrade = upgradeNames.find(value => value.toLowerCase() === params.get("upgrade")?.toLowerCase())
        ?? (study === null ? previous.upgrade : "Studies");
    return {
        tab, upgrade, cavern: queryIndex(params.get("cavern"), cavernNames.length) ?? previous.cavern,
        study: tab === "Upgrades" && upgrade === "Studies" ? study : null,
        source: params.get("source"),
    };
}
function destinationUrl(destination: Destination): string {
    const params = new URLSearchParams({
        tab: destination.tab.toLowerCase(), upgrade: destination.upgrade.toLowerCase(), cavern: String(destination.cavern),
    });
    if (destination.study !== null && destination.tab === "Upgrades" && destination.upgrade === "Studies") {
        params.set("study", String(destination.study));
    }
    if (destination.source !== null) params.set("source", destination.source);
    return `/world-5/hole?${params.toString()}`;
}

export default function HoleContent() {
    const { data, dataStatus } = useAppDataStore(useShallow(state => ({
        data: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated,
    })));
    const router = useRouter();
    const searchParams = useSearchParams();
    const [remembered, setRemembered] = useState<Destination>({ tab: "Villagers", upgrade: "Studies", cavern: 0, study: null, source: null });
    const destination = queryDestination(searchParams, remembered);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [characterId, setCharacterId] = useState<number | null>(null);
    const [villagerDetail, setVillagerDetail] = useState<number | null>(null);
    const [search, setSearch] = useState("");
    const [showUnlocked, setShowUnlocked] = useState(false);
    const [showStudyContributors, setShowStudyContributors] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const queryTarget = searchParams.toString();

    useEffect(() => {
        if (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) return;
        const frame = requestAnimationFrame(() => {
            const root = rootRef.current;
            if (!root) return;
            const sourceKind = destination.source?.split(":")[0];
            let selector: string | null = null;
            if (destination.study !== null) selector = `[data-testid="study-detail-${destination.study}"]`;
            else if (sourceKind === "opals") selector = '[data-testid="opal-sources"] summary';
            else if (sourceKind && namedSourceOwners[sourceKind]) selector = '[data-testid="named-source-detail"]';
            else if (sourceKind === "villager") {
                const index = queryIndex(destination.source!.split(":")[1], 5);
                if (index !== null) selector = `[data-testid="villager-row-${index}"]`;
            } else if (destination.tab === "Upgrades" && destination.upgrade !== "Studies") {
                selector = '[data-testid="unsupported-upgrade"]';
            } else if (destination.tab === "Caverns") selector = '[data-testid="selected-cavern"]';
            else if (destination.tab === "Upgrades" && destination.upgrade === "Studies") selector = '[data-testid="study-summary"]';
            else if (sourceKind === "hole") selector = '[data-testid="villagers-panel"]';
            const target = selector ? root.querySelector<HTMLElement>(selector) : null;
            if (!target) return;
            target.scrollIntoView({ block: "start", behavior: "auto" });
            target.focus({ preventScroll: true });
        });
        return () => cancelAnimationFrame(frame);
    }, [dataStatus, destination.tab, destination.upgrade, destination.cavern, destination.study, destination.source, queryTarget]);

    useEffect(() => {
        setRemembered(previous => queryDestination(searchParams, previous));
    }, [searchParams]);

    if (dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) {
        return <Box gap="small"><Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading><Text data-testid="hole-loading">Waiting for imported account data.</Text></Box>;
    }
    const hole = data.get("hole") as Hole;
    const characters = hole.villagers[0].characterRates;
    const selectedCharacter = characterId === null ? null : characters.find(character => character.playerId === characterId);
    const ledger = hole.opalLedger;
    const lanterns = hole.lanterns;

    const savedGlobalTime = (data.get("timeAway") as { GlobalTime?: number }).GlobalTime;
    const saveTimestamp = typeof savedGlobalTime === "number" && Number.isFinite(savedGlobalTime)
        ? new Date(savedGlobalTime * 1000).toLocaleString() : null;

    function navigate(next: Partial<Destination>) {
        const selected = { ...destination, source: null, ...next };
        setRemembered(selected);
        setHasNavigated(true);
        router.push(destinationUrl(selected), { scroll: false });
    }
    function internalLink(next: Partial<Destination>, label: string, testId?: string): ReactNode {
        return <Anchor data-testid={testId} label={label} href={destinationUrl({ ...destination, source: null, ...next })}
            onClick={(event: MouseEvent<HTMLAnchorElement>) => {
                if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                navigate(next);
            }} />;
    }
    function ownerName(owner: string): string {
        const [kind, identity] = owner.split(":");
        const index = Number(identity);
        if (kind === "cavern") return cavernNames[index] ?? "Cavern";
        if (kind === "villager") return hole.villagers[index]?.name ?? "Villager";
        if (kind === "statues") {
            const character = characters.find(context => context.playerId === index);
            return character ? `${character.playerName} · Character Statues` : `Character Statues · Player ${identity}`;
        }
        if (kind === "jar-collectible") return readable(hole.jar.jarBonuses[index]?.data.name ?? "Jar collectible");
        if (kind === "schematic") return readable(hole.schematics.find(schematic => schematic.index === index)?.data.name ?? "Schematic");
        if (kind === "measurement") return readable(hole.measurements[index]?.data.measurementType.name ?? "Measurement");
        if (kind === "majik") {
            return [...hole.majiks.HoleUpgrades, ...hole.majiks.VillageUpgrades, ...hole.majiks.IdleonUpgrades]
                .find(upgrade => upgrade.index === index)?.data.name ?? "Majik";
        }
        const sharedOwners: Record<string, string> = { schematics: "Schematics", studies: "Studies", hole: "Villagers", opals: "Opal sources" };
        return externalRoutes[kind]?.name ?? namedSourceOwners[kind] ?? sharedOwners[kind] ?? readable(owner);
    }
    function ownerLink(owner: string, label?: string, testId?: string): ReactNode {
        const [kind, identity] = owner.split(":");
        const name = label ?? ownerName(owner);
        if (kind === "cavern") return internalLink({ tab: "Caverns", cavern: Number(identity), source: owner }, name, testId);
        if (["majik", "schematic", "schematics", "measurement", "studies"].includes(kind)) {
            const upgrade: Upgrade = kind === "majik" ? "Majik" : kind === "measurement" ? "Measurements" : kind === "studies" ? "Studies" : "Schematics";
            return internalLink({ tab: "Upgrades", upgrade, study: null, source: owner }, name, testId);
        }
        if (kind === "villager" || kind === "hole") return internalLink({ tab: "Villagers", source: owner }, name, testId);
        if (kind === "jar-collectible") return internalLink({ tab: "Caverns", cavern: 10, source: owner }, name, testId);
        const route = externalRoutes[kind];
        if (route) return <Anchor data-testid={testId} label={name} href={route.href} />;
        return internalLink({ tab: "Villagers", source: owner }, name, testId);
    }
    const sourceKind = destination.source?.split(":")[0];
    const sourceDetail = sourceKind && namedSourceOwners[sourceKind] ? ownerName(destination.source!) : null;
    const linkedVillager = sourceKind === "villager" ? queryIndex(destination.source!.split(":")[1], hole.villagers.length) : null;
    function contributors(rows: HoleContributor[]) {
        return <Box gap="small" data-testid="contributors">
            {rows.map((row, index) => <DataRow key={`${row.owner}-${row.unit}-${index}`}
                columns={["minmax(0, 3fr)", "minmax(0, 2fr)", "minmax(0, 1fr)", "minmax(0, 2fr)"]}
                fields={[
                    { key: "source", kind: "identity", name: readable(row.source) },
                    { key: "value", kind: "text", label: "Contribution", value: row.unit === "percent" ? `${decimal(row.value, row.unavailableReason)}${row.value === null ? "" : "%"}` : row.unit === "multiplier" ? `${decimal(row.value, row.unavailableReason)}${row.value === null ? "" : "×"}` : `${number(row.value, row.unavailableReason)} ${row.unit}` },
                    { key: "combination", kind: "text", label: "Combination", value: `${row.combination[0].toUpperCase()}${row.combination.slice(1)}` },
                    { key: "owner", kind: "content", label: "Source owner", content: ownerLink(row.owner) },
                ]}
                details={[
                    ...(row.sourceIds ? [{ key: "sources", label: "Included sources", content: <Box direction="row" wrap gap="small">{row.sourceIds.map(source => <Box key={source}>{ownerLink(source)}</Box>)}</Box> }] : []),
                    ...(row.unavailableReason ? [{ key: "unavailable", label: "Unavailable reason", content: <Text size="small">{row.unavailableReason}</Text> }] : []),
                ]}
            />)}
        </Box>;
    }
    function unlock(villager: Villager): ReactNode {
        const next = villager.nextUnlock;
        if (!next) return <Text size="xsmall">{number(null, villager.unlockUnavailableReason)}</Text>;
        const owner = next.kind === "cavern" ? "Caverns" : next.kind === "schematic" ? "Schematics"
            : next.kind === "measurement" ? "Measurements" : next.kind === "majik-point" ? "Majik" : "Studies";
        if (next.releasedMaximum) {
            return <Box gap="xxsmall"><Text size="xsmall">Released maximum reached</Text>
                {next.kind === "cavern"
                    ? ownerLink(`cavern:${cavernNames.length - 1}`, `${cavernNames.length}. ${cavernNames[cavernNames.length - 1]} · released maximum`, `villager-unlock-${villager.index}`)
                    : next.kind === "measurement"
                        ? ownerLink(`measurement:${hole.measurements.length - 1}`, `${readable(hole.measurements[hole.measurements.length - 1].data.measurementType.name)} · released maximum`, `villager-unlock-${villager.index}`)
                        : internalLink({ tab: "Upgrades", upgrade: owner as Upgrade, source: "schematics" }, `${owner} · released maximum`, `villager-unlock-${villager.index}`)}
            </Box>;
        }
        return <Box gap="xxsmall" data-testid={`villager-unlock-${villager.index}`}>
            <Text size="xsmall">Required level: {exact(next.requiredLevel)}</Text>
            {next.kind === "cavern" && next.identities.map(index => <Box key={index}>{ownerLink(`cavern:${index}`, `${index + 1}. ${cavernNames[index]}`)}</Box>)}
            {next.kind === "schematic" && <><Text size="xsmall">Next schematic availability, not construction:</Text>
                {next.identities.map(index => <Box key={index}>{ownerLink(`schematic:${index}`)}</Box>)}</>}
            {next.kind === "measurement" && <><Text size="xsmall">Next Measurement access, not purchase:</Text>
                {next.identities.map(index => <Box key={index}>{ownerLink(`measurement:${index}`)}</Box>)}</>}
            {next.kind === "majik-point" && internalLink({ tab: "Upgrades", upgrade: "Majik" }, "Majik point · Majik")}
            {next.kind === "study-rate" && internalLink({ tab: "Upgrades", upgrade: "Studies", study: null }, "Study rate increase · Studies")}
        </Box>;
    }
    function effects(study: Study, studyEffects: StudyEffect[]) {
        return <Box gap="small" data-testid={`study-effects-${study.index}`}>
            {studyEffects.map(effect => {
                const scope = effect.scope === "owned-study-rule" ? "Owned Study rule" : "Owned Study contribution";
                const note = effect.key === "instamatch-when-round-ends-with-none"
                    ? "Instamatch recovery also requires normal-story Instamatch capacity of at least one."
                    : effect.key === "owned-repeat-marbleization-rule"
                        ? "This owned Study rule does not establish marbleization eligibility. Upgrade exclusions still apply, independently of Study ownership."
                        : effect.note;
                return <Box key={effect.key} gap="xxsmall">
                    <Values values={[{ label: effectLabels[effect.key], value: effectValue(effect) }, { label: "Effect type", value: scope }]} />
                    <Text size="small">Unit: {effect.unit === "rule" ? "Discrete rule" : effect.unit}. Scope: {scope}. Owner: {ownerLink(effect.owner)}.</Text>
                    {note && <Text size="small">{note}</Text>}
                    {effect.unavailableReason && <Text size="small">{effect.unavailableReason}</Text>}
                </Box>;
            })}
        </Box>;
    }
    const studyViews = hole.studies.map(study => {
        const description = study.levelAvailable ? readable(study.getDescription()) : "Effective description unavailable: Saved Study level is missing.";
        const effects = study.getEffects();
        const searchableText = `${cavernNames[study.index]} ${readable(study.data.name)} ${study.levelAvailable ? description : ""} ${effects.map(effect => effectLabels[effect.key]).join(" ")}`.toLowerCase();
        return { study, description, effects, searchableText };
    });
    const normalizedSearch = search.toLowerCase();
    const accessFilteredStudies = studyViews.filter(view => !showUnlocked || view.study.access === true);
    const searchFilteredStudies = accessFilteredStudies.filter(view => view.searchableText.includes(normalizedSearch));
    const includedStudyIndices = new Set(searchFilteredStudies.map(view => view.study.index));
    if (destination.study !== null) includedStudyIndices.add(destination.study);
    const filteredStudies = studyViews.filter(view => includedStudyIndices.has(view.study.index));

    function studyEffectSummary({ study, effects }: typeof studyViews[number]) {
        const summaryCaveat = [1, 7, 11, 16].includes(study.index)
            ? "Additive divisor contribution, not a literal requirement reduction."
            : study.index === 15 ? "Owned Study rule, not cavern permission." : null;
        const detailButton = <SmallButton data-testid={`study-details-${study.index}`} label={destination.study === study.index ? "Hide details" : "Details"} onClick={() => navigate({ study: destination.study === study.index ? null : study.index })} />;
        const cavernOwnerLink = ownerLink(`cavern:${study.index}`, `${study.index + 1}. ${cavernNames[study.index]} · Cavern`, `study-owner-${study.index}`);
        return <Box gap="xxsmall">
            {effects.map(effect => <Text key={effect.key} size="xsmall">{effectLabels[effect.key]}: {effectValue(effect)}</Text>)}
            {summaryCaveat && <Text size="xsmall">{summaryCaveat}</Text>}
            <Box direction="row" wrap gap="small">{detailButton}{cavernOwnerLink}</Box>
        </Box>;
    }

    return <Box ref={rootRef} gap="small" data-testid="hole-ready" style={{ minWidth: 0, fontVariantNumeric: "tabular-nums" }}>
        <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading>
        <Text size="small" color="accent-2" data-testid="hole-snapshot">{`Imported save snapshot: ${saveTimestamp ?? "Unavailable: Saved timestamp is missing."} Values do not advance to now. All controls inspect data only.`}</Text>
        <ContentTabs<Tab> options={[{ value: "Villagers", label: "Villagers" }, { value: "Upgrades", label: "Upgrades" }, { value: "Caverns", label: "Caverns" }]} value={destination.tab} onChange={tab => navigate({ tab })} />
        {hasNavigated && <Box align="start"><SmallButton data-testid="owner-back" label="Back to previous view" onClick={() => router.back()} /></Box>}
        {sourceDetail && <Box background="dark-1" pad="small" gap="small" data-testid="named-source-detail" tabIndex={-1} aria-label={`${sourceDetail} source details`}>
            <Text weight="bold">{sourceDetail}</Text><Text size="small">This named source supplies the displayed contribution. Full details are not available on this website yet. No source page exists for this owner.</Text>
            <Text size="small" data-testid="source-context">Source owner: {sourceDetail}.</Text>
            <Box align="start"><SmallButton label="Close source details" onClick={() => navigate({ source: null })} /></Box>
        </Box>}
        {destination.tab === "Villagers" && <Box gap="small" data-testid="villagers-panel" tabIndex={-1} aria-label="Villager growth">
            <Box direction="row" align="center" gap="medium" margin={{ bottom: "small" }}>
                <Text weight="bold" data-testid="rate-context-label">{selectedCharacter ? `Rates for ${selectedCharacter.playerName}` : "Inspect character rates"}</Text>
                <select data-testid="inspect-character" aria-label="Inspect character rates" value={characterId ?? ""} onChange={event => setCharacterId(event.target.value === "" ? null : Number(event.target.value))} style={{ font: "inherit", color: "inherit", background: "#1E2127", padding: "8px", border: "1px solid #6B747F" }}>
                    <option value="">Choose a character</option>
                    {characters.map(character => <option key={character.playerId} value={character.playerId}>{character.playerName}</option>)}
                </select>
                <Text size="small" color="accent-2">No active or preferred character is inferred.</Text>
            </Box>
            {hole.villagers.map(villager => {
                const rate = characterId === null ? null : villager.characterRates.find(context => context.playerId === characterId);
                const opened = (linkedVillager ?? villagerDetail) === villager.index;
                const statueReason = rate?.contributors.find(row => row.owner === `statues:${rate.playerId}:28`)?.unavailableReason;
                return <Box key={villager.index} data-testid={`villager-row-${villager.index}`} tabIndex={-1} aria-label={`${villager.name} growth details`}>
                    <DataRow opacity={villager.rescued === false ? 0.6 : 1}
                        columns={["minmax(0, 19fr)", "minmax(0, 7fr)", "minmax(0, 7fr)", "minmax(0, 20fr)", "minmax(0, 14fr)", "minmax(0, 20fr)", "minmax(0, 10fr)"]}
                        fields={[
                            { key: "identity", kind: "content", label: "Villager", content: <Box><Text size="small">{villager.name}</Text><Text size="xsmall" color="accent-2">{villager.title}</Text><Text size="xsmall">{status(villager.rescued, "Rescued", "Not rescued", villager.unlockUnavailableReason)}</Text></Box> },
                            { key: "level", kind: "text", label: "Saved level", value: villager.saveAvailable ? number(villager.level) : number(null, "Saved villager level is missing.") },
                            { key: "opals", kind: "text", label: "Invested Opals", value: villager.investmentAvailable ? number(villager.opals) : number(null, "Saved investment is missing.") },
                            { key: "progress", kind: "content", label: "Stored EXP / next requirement", content: <Box><Text size="small">{villager.expAvailable ? number(villager.currentExp) : number(null, "Saved EXP is missing.")} / {number(villager.getExpRequirement(), villager.requirementUnavailableReason)}</Text><Text size="xsmall" data-testid={`villager-readiness-${villager.index}`}>{readiness(villager.claimReady, !villager.expAvailable ? "Saved villager EXP is missing." : villager.requirementUnavailableReason)}</Text></Box> },
                            { key: "rate", kind: "text", label: "EXP/hour", value: rate ? number(rate.expPerHour, rate.unavailableReason) : characterId === null ? "Choose a character" : number(null, "This imported character context is no longer available.") },
                            { key: "unlock", kind: "content", label: "Next intrinsic unlock", content: unlock(villager) },
                            { key: "details", kind: "content", label: null, content: <SmallButton data-testid={`villager-details-${villager.index}`} label={opened ? "Hide details" : "Growth details"} onClick={() => { setVillagerDetail(opened ? null : villager.index); if (linkedVillager !== null) navigate({ source: null }); }} /> },
                        ]}
                        details={opened ? [{ key: "growth", label: rate ? `Growth contributors for ${rate.playerName}` : "Growth contributors", content: rate ? <Box gap="small" data-testid={`villager-contributors-${villager.index}`}>
                            <Values values={[{ label: "Character Statue bonus", value: `${decimal(rate.statueBonus, statueReason)}${rate.statueBonus === null ? "" : "%"}` }, { label: "Character Statue factor", value: `${decimal(rate.statueFactor, statueReason)}${rate.statueFactor === null ? "" : "×"}` }, { label: "Purchased EXP upgrade", value: villager.purchasedUpgradeAvailable ? number(villager.purchasedExpUpgrade) : number(null, "Saved purchased EXP upgrade is missing.") }]} />
                            <Text size="small">Character-specific Statue contribution: {ownerLink(`statues:${rate.playerId}:28`, `${rate.playerName} · Character Statues`)}.</Text>
                            <Text size="small">The Character Statue factor multiplies this character's villager growth rate.</Text>
                            <Text size="small">The purchased EXP multiplier is separate from Majik enhancement. Each account contribution keeps its combination rule.</Text>
                            {rate.unavailableReason && <Text size="small" data-testid={`villager-rate-reason-${villager.index}`}>{rate.unavailableReason}</Text>}
                            <Text weight="bold" size="small">Account and villager contributors</Text>
                            {contributors(rate.contributors.filter(row => row.owner !== `statues:${rate.playerId}:28`))}
                        </Box> : <Text size="small">Choose a character to inspect matched growth contributors.</Text> }] : undefined}
                    />
                </Box>;
            })}
            <Box gap="small" margin={{ top: "medium" }} data-testid="opal-summary">
                <Box direction="row" gap="small" align="center"><IconImage data={Item.getImageData("Opal")} /><Heading level="3" size="small" margin="none">Opals</Heading></Box>
                <Values values={[{ label: "Earned", value: exact(ledger.earned, ledger.unavailableReason) }, { label: "Invested", value: exact(ledger.invested, ledger.unavailableReason) }, { label: "Uninvested", value: exact(ledger.uninvested, ledger.unavailableReason) }, { label: "Cavern subtotal", value: exact(ledger.cavernEarned, ledger.unavailableReason) }, { label: "External subtotal", value: exact(ledger.externalEarned, ledger.unavailableReason) }]} />
                {ledger.unavailableReason && <Text size="small">{ledger.unavailableReason}</Text>}
                <Disclosure title="Opal sources" id="opal-sources" open={destination.source === "opals" ? true : undefined}>
                    {ledger.sources.map(source => <DataRow key={source.id} columns={["minmax(0, 2fr)", "minmax(0, 1fr)", "minmax(0, 4fr)", "minmax(0, 2fr)"]} fields={[
                        { key: "identity", kind: "identity", name: readable(source.name) },
                        { key: "amount", kind: "text", label: source.unit, value: exact(source.opals, source.unavailableReason) },
                        { key: "acquisition", kind: "text", label: "Acquisition", value: source.acquisition, role: "description" },
                        { key: "owner", kind: "content", label: "Source owner", content: ownerLink(source.owner, undefined, `opal-owner-${source.id.replace(":", "-")}`) },
                    ]} />)}
                    <Values values={[{ label: "Emperor + schematic floor adjustment", value: decimal(ledger.emperorSchematicFloorAdjustment, ledger.unavailableReason) }, { label: "External subtotal rounding adjustment", value: decimal(ledger.externalRoundingAdjustment, ledger.unavailableReason) }]} />
                    <Text size="small">Source contributions include zeros. Emperor and schematic contributions are rounded down together, then the external subtotal is rounded.</Text>
                </Disclosure>
                <Disclosure title="Allocation effects" id="allocation-effects">
                    <Values values={[{ label: "Least investment among rescued villagers", value: number(hole.allocationEffects.leastUnlockedInvestment, hole.allocationEffects.unavailableReason) }, { label: "Equal Spread", value: `${decimal(hole.allocationEffects.equalSpreadPercent, hole.allocationEffects.equalSpreadUnavailableReason)}${hole.allocationEffects.equalSpreadPercent === null ? "" : "%"}` }]} />
                    {ownerLink("majik:14", "Equal Spread · Majik")}
                    {hole.allocationEffects.opalEnthusiasm.map(effect => <Values key={effect.villagerId} values={[{ label: `${hole.villagers[effect.villagerId].name} · invested tens`, value: number(effect.investedTens, effect.unavailableReason) }, { label: "Opal Enthusiasm", value: `${decimal(effect.percent, effect.unavailableReason)}${effect.percent === null ? "" : "%"}` }]} />)}
                    {ownerLink("majik:9", "Opal Enthusiasm · Majik")}
                </Disclosure>
                <Disclosure title="Another Try reset details" id="reset-details">
                    <Values values={[{ label: "Lamp access", value: status(hole.anotherTry.access, "Available", "Not available", "Saved cavern access is missing.") }, { label: "Wish cost", value: number(hole.anotherTry.wishCost) }, { label: "Wish balance", value: number(hole.anotherTry.availableWishes, "Saved wish balance is missing.") }, { label: "Affordability", value: status(hole.anotherTry.affordable, "Affordable", "Not affordable", hole.anotherTry.access === null ? "Saved cavern access is missing." : "Saved wish balance is missing.") }]} />
                    {hole.anotherTry.resets.map(reset => <Box key={reset.category} gap="xxsmall"><Text weight="bold" size="small">{reset.category}</Text><Text size="small">Clears: {reset.clears.join("; ")}.</Text><Text size="small">Retains: {reset.retains.join("; ")}.</Text></Box>)}
                    {ownerLink("cavern:6", "Another Try · Lamp")}
                    <Text size="small">Another Try resets one category per purchase. It spends wishes from the same stock as other Lamp wishes.</Text>
                    <Text size="small">Competing wishes: {hole.lamp.wishes.filter(wish => wish.index !== 1).map(wish => readable(wish.data.name)).join(", ")}.</Text>
                    <Text size="small">Spending these wishes reduces the stock available for other Lamp purchases.</Text>
                    <Text size="small">Inspection only. Reset actions are not available on this website.</Text>
                </Disclosure>
            </Box>
            <Box gap="small" margin={{ top: "medium" }} data-testid="lantern-summary">
                <Box direction="row" gap="small" align="center"><IconImage data={Item.getImageData("Quest90")} /><Heading level="3" size="small" margin="none">Blinding Lantern</Heading></Box>
                <Values values={[{ label: "Stored stock", value: exact(lanterns.totalStock, lanterns.locations.find(location => location.quantity === null)?.unavailableReason) }, { label: "Account uses today", value: `${number(lanterns.usesToday, lanterns.usageUnavailableReason)} / ${lanterns.dailyLimit}` }, { label: "Advancement per use", value: `+${lanterns.hoursPerUse} hours` }]} />
                <Disclosure title="Lantern locations" id="lantern-locations">
                    {lanterns.locations.map(location => <Values key={location.kind === "storage" ? "storage" : location.playerId} values={[{ label: location.kind === "storage" ? "Storage" : `${location.playerName} inventory`, value: number(location.quantity, location.unavailableReason) }]} />)}
                    <Text size="small">Advances: {lanterns.advances.join("; ")}.</Text><Text size="small">Excludes: {lanterns.excludes.join("; ")}.</Text>
                    <Text size="small">The daily use count is account-wide. Lanterns do not refill other claim allowances.</Text>
                </Disclosure>
            </Box>
        </Box>}
        {destination.tab === "Upgrades" && <Box direction="row" gap="medium" align="start" data-testid="upgrades-panel">
            <Box width="220px" flex={false} data-testid="upgrade-rail">{upgradeNames.map(upgrade => <Box key={upgrade} data-testid={`upgrade-nav-${upgrade}`}><LeftNavButton text={upgrade} isActive={destination.upgrade === upgrade} clickHandler={() => navigate({ upgrade, study: null })} /></Box>)}</Box>
            <Box flex gap="small" style={{ minWidth: 0 }}>
                <Heading level="3" size="small" margin="none">{destination.upgrade}</Heading>
                {destination.upgrade !== "Studies" ? <Box gap="small" data-testid="unsupported-upgrade" tabIndex={-1} aria-label={`${destination.upgrade} source context`}><Text>Full details are not available on this website yet.</Text><Text size="small">This describes website support, not a game lock.</Text>{destination.source && <Text size="small" data-testid="source-context">Source: {ownerName(destination.source)}.</Text>}</Box> : <>
                    <Box gap="small" data-testid="study-summary" tabIndex={-1} aria-label="Shared Study progress">
                        <Values values={[{ label: "Saved Study target", value: hole.savedStudyTarget === null ? (hole.studyTargetAvailable ? "No saved target" : number(null, hole.studyTargetUnavailableReason)) : `${hole.savedStudyTarget + 1}. ${cavernNames[hole.savedStudyTarget]}` }, { label: "Eligible immediate neighbors", value: hole.eligibleStudyNeighbors === null ? number(null, hole.studyNeighborEligibilityUnavailableReason) : hole.eligibleStudyNeighbors.map(index => `${index + 1}. ${cavernNames[index]}`).join(", ") || "None" }, { label: "Shared progress/hour", value: number(hole.studyRate, hole.studyContributors.find(row => row.value === null)?.unavailableReason ?? hole.studyInputsUnavailableReason) }]} />
                        {hole.studyTargetUnavailableReason && <Text size="small">{hole.studyTargetUnavailableReason}</Text>}
                        <Text size="small">Superbit participation follows the saved target and eligible immediate neighbors. Each participating Study uses the shared rate. Website selections do not change the game target.</Text>
                        <Box align="start"><SmallButton data-testid="study-contributors-toggle" label={showStudyContributors ? "Hide rate contributors" : "Rate contributors"} onClick={() => setShowStudyContributors(!showStudyContributors)} /></Box>
                        {showStudyContributors && contributors(hole.studyContributors)}
                    </Box>
                    <Box direction="row" gap="medium" align="center" margin={{ vertical: "small" }}>
                        <Box flex><TextInput data-testid="study-search" aria-label="Search Studies by name or effect" placeholder="Search Studies by name or effect" value={search} onChange={event => setSearch(event.target.value)} /></Box>
                        <CheckBox data-testid="study-unlocked" label="Show unlocked" checked={showUnlocked} onChange={event => setShowUnlocked(event.target.checked)} />
                        <SmallButton data-testid="clear-study-search" label="Clear search" onClick={() => setSearch("")} />
                    </Box>
                    {destination.study !== null && <Text size="small">The linked Study remains visible even when local filters do not match.</Text>}
                    <Text size="small" color="accent-2" data-testid="study-count">{filteredStudies.length} of {hole.studies.length} Studies</Text>
                    {filteredStudies.length === 0 && <Box pad="medium" background="dark-1" data-testid="study-no-results"><Text>No Studies match this search.</Text><Text size="small">Clear the search or turn off Show unlocked.</Text></Box>}
                    {filteredStudies.map(view => {
                        const { study, description, effects: studyEffects } = view;
                        return <Box key={study.index} data-testid={`study-row-${study.index}`}>
                        <DataRow opacity={study.access === false ? 0.6 : 1} columns={["minmax(0, 20fr)", "minmax(0, 7fr)", "minmax(0, 20fr)", "minmax(0, 14fr)", "minmax(0, 11fr)", "minmax(0, 24fr)"]} fields={[
                            { key: "identity", kind: "content", label: "Cavern / Study", content: <Box><Text size="small">{study.index + 1}. {cavernNames[study.index]}</Text><Text size="xsmall">{readable(study.data.name)}</Text><Text size="xsmall">{status(study.access, "Unlocked", "Locked", "Saved cavern access is missing.")}</Text></Box> },
                            { key: "level", kind: "text", label: "Saved level", value: study.levelAvailable ? number(study.level) : number(null, "Saved Study level is missing.") },
                            { key: "progress", kind: "content", label: "Stored progress / next requirement", content: <Box><Text size="small">{study.progressAvailable ? number(study.progress) : number(null, "Saved Study progress is missing.")} / {number(study.getRequirement(), "Saved Study level is missing.")}</Text><Text size="xsmall" data-testid={`study-readiness-${study.index}`}>{readiness(study.claimReady, !study.levelAvailable ? "Saved Study level is missing." : !study.progressAvailable ? "Saved Study progress is missing." : "Saved cavern access is missing.")}</Text></Box> },
                            { key: "participation", kind: "text", label: "Participation", value: study.participation === "unavailable" ? number(null, study.rateUnavailableReason) : ({ target: "Saved target", neighbor: "Eligible neighbor", inactive: "Inactive" })[study.participation] },
                            { key: "rate", kind: "text", label: "Progress/hour", value: number(study.progressPerHour, study.rateUnavailableReason) },
                            { key: "effects", kind: "content", label: "Owned effective effects", content: studyEffectSummary(view) },
                        ]} details={destination.study === study.index ? [{
                            key: "effects",
                            label: "Study description and effects",
                            content: <Box gap="small" data-testid={`study-detail-${study.index}`} tabIndex={-1} aria-label={`Study ${study.index + 1}: ${cavernNames[study.index]} details`}>
                                <Text size="small" data-testid={`study-description-${study.index}`}>
                                    {description}
                                </Text>
                                {[1, 7, 11, 16].includes(study.index) && <Text size="small">
                                    The Study description uses reduction wording. This contribution adds to the requirement divisor, not a literal percentage reduction.
                                </Text>}
                                {studyEffects.some(effect => effect.unit === "rule") && <Values values={[{
                                    label: "Owned discrete Study rule",
                                    value: status(study.levelAvailable ? study.ownedRule : null, "Owned", "Not owned", "Saved Study level is missing."),
                                }]} />}
                                {effects(study, studyEffects)}
                                {study.index === 10 && <Text size="small">A preferred Jar enchantment target does not guarantee its selection.</Text>}
                                {study.index === 15 && <Text size="small">The Study description is not the complete cavern permission check.</Text>}
                                {study.index === 17 && <Text size="small">
                                    Discounted upgrades are not a daily purchase cap.
                                    Saved purchases today: {exact(study.dailyCoveUpgradesPurchased, "Saved Cove purchases today are missing.")}.
                                </Text>}
                                {study.rateUnavailableReason && <Text size="small" data-testid={`study-rate-reason-${study.index}`}>{study.rateUnavailableReason}</Text>}
                                {study.contributors.length > 0 && <Disclosure title="This Study's rate contributors" id={`study-rate-details-${study.index}`}>
                                    {contributors(study.contributors)}
                                </Disclosure>}
                            </Box>,
                        }] : undefined} />
                    </Box>;
                    })}
                </>}
            </Box>
        </Box>}
        {destination.tab === "Caverns" && <Box direction="row" gap="medium" align="start" data-testid="caverns-panel">
            <Box width="280px" flex={false} data-testid="cavern-rail">{cavernNames.map((name, index) => <Box key={name} data-testid={`cavern-nav-${index}`}><LeftNavButton text={`${index + 1}. ${name}`} isActive={destination.cavern === index} clickHandler={() => navigate({ cavern: index })} /></Box>)}</Box>
            <Box flex gap="medium" style={{ minWidth: 0 }} data-testid="selected-cavern" tabIndex={-1} aria-label={`${destination.cavern + 1}. ${cavernNames[destination.cavern]} context`}>
                <Heading level="3" size="small" margin="none">{destination.cavern + 1}. {cavernNames[destination.cavern]}</Heading>
                <Text>Full cavern details are not available on this website yet.</Text><Text size="small">This describes website support, not a game lock.</Text><Text size="small">The following information belongs to the delivered growth, Opals, and Studies scope.</Text>
                {destination.source && <Text size="small" data-testid="source-context">Source: {ownerName(destination.source)}.</Text>}
                {hole.cavernOpalSources.filter(source => source.owner === `cavern:${destination.cavern}`).map(source => <Box key={source.id} gap="small"><Values values={[{ label: "Earned Opals", value: exact(source.opals, source.unavailableReason) }]} /><Text size="small">{source.acquisition}</Text>{internalLink({ tab: "Villagers", source: "opals" }, "Full Opal sources · Villagers", "cavern-ledger-owner")}</Box>)}
                <Box gap="small"><Heading level="4" margin="none">Relevant owned Study effects</Heading>
                    {effects(studyViews[destination.cavern].study, studyViews[destination.cavern].effects)}
                    {internalLink({ tab: "Upgrades", upgrade: "Studies", study: destination.cavern }, `Study ${destination.cavern + 1}: ${readable(hole.studies[destination.cavern].data.name)} · Studies`, "cavern-study-owner")}
                </Box>
            </Box>
        </Box>}
    </Box>;
}
