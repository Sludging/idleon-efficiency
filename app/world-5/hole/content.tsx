"use client";

import { useState, type ReactNode } from "react";
import { Box, CheckBox, Grid, Heading, Text, TextInput } from "grommet";
import { CircleInformation } from "grommet-icons";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../../components/base/ContentTabs";
import DataRow from "../../../components/base/DataRow";
import IconImage from "../../../components/base/IconImage";
import LeftNavButton from "../../../components/base/LeftNavButton";
import ShadowBox from "../../../components/base/ShadowBox";
import SmallButton from "../../../components/base/SmallButton";
import TextAndLabel from "../../../components/base/TextAndLabel";
import TipDisplay from "../../../components/base/TipDisplay";
import { Item } from "../../../data/domain/items";
import type { Player } from "../../../data/domain/player";
import { Hole, type StudyEffect } from "../../../data/domain/world-5/hole/hole";
import type { Villager, VillagerCharacterRate } from "../../../data/domain/world-5/hole/villager";
import { commaNotation, nFormatter, notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";

const cavernNames = ["Well", "Motherlode", "Dawg Den", "Bravery", "Bell", "Harp", "Lamp", "Undying Hive", "Gloomie Mushroom Grotto", "Justice", "Jars", "Evertree", "Wisdom", "Gambit", "Temple", "Fountain", "Bottomless Trench", "Crystal Glunko Cove"];
const upgradeNames = ["Majik", "Schematics", "Studies", "Measurements"] as const;
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
    if (next.releasedMaximum) return next.kind === "cavern" ? "All released caverns available" : "Released maximum reached";
    const level = next.requiredLevel === null ? "" : ` at level ${exact(next.requiredLevel)}`;
    switch (next.kind) {
        case "cavern": return `Next cavern: ${next.identities.map(index => cavernNames[index]).join(", ")}${level}`;
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
    const owned = (key: string, yes: string, no: string) => {
        const effect = values.get(key)!;
        return effect.value === null ? number(null, effect.unavailableReason) : effect.value ? yes : no;
    };
    let main: ReactNode;
    let detail: ReactNode = null;
    if ([1, 7, 11, 16].includes(index)) {
        main = "Cheaper layers in other skilling caverns";
        const accumulated = values.get("skilling-requirement-divisor-contribution")!;
        const accumulatedText = accumulated.value === null
            ? `Current accumulated bonus: ${number(null, accumulated.unavailableReason)}`
            : `${value("skilling-requirement-divisor-contribution", "%")} accumulated.`;
        detail = `${value("skilling-requirement-divisor-contribution-per-layer", "%")} per completed layer; ${accumulatedText} Completed layers, other Studies, and collectibles combine to lower resource costs.`;
    } else {
        switch (index) {
            case 0: main = `${value("sediment-retained-after-expansion", "%")} sediment retained; +${value("bucket-fill-per-expansion", "%")} bucket fill per expansion`; break;
            case 2: main = `${value("score-per-defeated-golden-hound", "×")} golden hound score; ${owned("golden-hound-respawns", "golden hounds respawn", "no owned respawn benefit")}`; break;
            case 3: main = `Minimum damage: ${value("minimum-damage-share-of-maximum", "%")} of maximum`; detail = owned("skip-guaranteed-one-hit-fights", "Skips guaranteed one-hit fights.", "One-hit fight skip is not owned."); break;
            case 4: main = `+${value("random-bonus-levels-every-twentieth-ring")} random bonus levels every twentieth ring`; break;
            case 5: main = `${value("string-experience", "×")} string EXP`; detail = `${value("exceptional-string-experience-chance", "%")} chance for ${value("exceptional-string-experience", "×")} exceptional string EXP.`; break;
            case 6: main = `+${value("additional-daily-wishes")} daily wishes`; break;
            case 8: main = `${value("credited-gloomie-kills", "×")} credited Gloomie kills`; break;
            case 9: main = `+${value("additional-linear-reward-days")} reward days; ${value("opal-reward-chance", "×")} Opal reward chance`; break;
            case 10: main = `${value("enchantment-chance", "×")} enchantment chance`; detail = `${owned("choose-enchantment-target", "Can prefer an enchantment target.", "Target preference is not owned.")} Jar preference does not guarantee selection.`; break;
            case 12: main = `+${value("additional-starting-attempts")} starting attempts`; detail = `${owned("instamatch-when-round-ends-with-none", "Recovers Instamatch when a round ends with none.", "Instamatch recovery is not owned.")} Recovery requires normal-story Instamatch capacity of at least one.`; break;
            case 13: main = `+${value("total-gambit-points", "%")} Gambit points`; detail = `${value("preserve-daily-attempt-chance", "%")} chance to preserve a daily attempt.`; break;
            case 14: main = `+${value("additional-double-torch-chance", "%")} double-torch chance`; break;
            case 15: main = `${value("marble-production", "×")} marble production`; detail = `${owned("owned-repeat-marbleization-rule", "Repeat marbleization rule owned.", "Repeat marbleization rule not owned.")} This rule does not prove upgrade eligibility. Upgrade exclusions still apply.`; break;
            case 17: {
                const cost = values.get("discounted-upgrade-cost")!;
                const discount = typeof cost.value === "number" ? precise(100 - cost.value * 100, "%") : number(null, cost.unavailableReason);
                main = `First ${value("daily-discounted-upgrades")} upgrades each day cost ${discount} less`;
                detail = `Saved upgrades today: ${exact(dailyPurchases, "Saved Cove purchases today are missing.")}. Current cost: ${value("current-upgrade-cost", "×")}. This limits discounted upgrades, not purchases.`;
                break;
            }
        }
    }
    const missing = effects.filter(effect => effect.value === null);
    return <Box gap="xxsmall" data-testid={`benefit-${index}`}>
        {detail ? <TipDisplay heading={`${cavernNames[index]} Study benefit`} body={<Text data-testid={`benefit-tip-body-${index}`}>{detail}</Text>} maxWidth="420px">
            <Box direction="row" gap="xsmall" align="center" data-testid={`benefit-tip-${index}`}><Box flex>{typeof main === "string" ? <Text size="small">{main}</Text> : main}</Box><Box flex={false}><CircleInformation size="small" /></Box></Box>
        </TipDisplay> : typeof main === "string" ? <Text size="small">{main}</Text> : main}
        {missing.length > 0 && <Text size="small" data-testid={`benefit-missing-${index}`}>{[...new Set(missing.map(effect => effect.unavailableReason))].join(" ")}</Text>}
    </Box>;
}

export default function HoleContent() {
    const { data, dataStatus } = useAppDataStore(useShallow(state => ({ data: state.data.getData(), dataStatus: state.dataStatus, lastUpdated: state.lastUpdated })));
    const [tab, setTab] = useState<Tab>("Villagers");
    const [upgrade, setUpgrade] = useState<typeof upgradeNames[number]>("Studies");
    const [cavern, setCavern] = useState(0);
    const [search, setSearch] = useState("");
    const [showUnlocked, setShowUnlocked] = useState(false);
    const [characterId, setCharacterId] = useState<number | null>(null);
    const hole = data.get("hole") as Hole;
    if ((dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !hole) {
        return <Box gap="small"><Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading><Text data-testid="hole-loading">Waiting for imported account data.</Text></Box>;
    }

    const importedPlayers = data.get("players") as Player[];
    const characters = importedPlayers.map(player => ({ playerId: player.playerID, playerName: player.playerName }));
    const displayedRates = hole.villagers.map(villager => villager.characterRates);
    const complete = characters.length > 0 && displayedRates.every(rates => rates.length === characters.length
        && characters.every(character => completeRate(rates.find(rate => rate.playerId === character.playerId))));
    const equal = complete && displayedRates.every(rates => rates.every(rate => equalRate(rates[0], rate)));
    const sharedGrowth = (displayedRates[0]?.[0]?.contributors ?? []).filter(row =>
        !["EXP per invested Opal", "Invested Opals", "Role multiplier", "Purchased EXP multiplier", "Opal Enthusiasm", "Villager Statue"].includes(row.source)
        && (row.value === null || row.unavailableReason || (row.unit === "percent" ? row.value !== 0 : row.unit === "multiplier" && row.value !== 1)));
    const sharedGrowthText = sharedGrowth.map(row => {
        const source = row.source.replace(/ Villager EXP$/, "");
        const name = source === "Legend" ? "Legend Talents" : source === "Pristine" ? "Pristine Charm"
            : source === "Collectible" ? "Jar collectibles" : source === "Arcane" ? "Tesseract" : source;
        return `${name}: ${precise(row.unavailableReason ? null : row.value, row.unit === "multiplier" ? "×" : "%", row.unavailableReason)}`;
    }).join("; ");
    const selectedCharacter = characterId === null ? null : characters.find(character => character.playerId === characterId);
    const contextLabel = equal ? `Same rates for all ${characters.length} imported characters`
        : selectedCharacter ? `Rates for ${selectedCharacter.playerName}`
            : complete ? "Character rates differ" : "Some character rates unavailable";
    const ledger = hole.opalLedger;
    const locations = hole.lanterns.locations;
    const usefulLanternLocations = locations.filter(location => location.quantity === null || location.quantity !== 0);
    const lanternStock = hole.lanterns.totalStock;
    const studyViews = hole.studies.map(study => {
        const effects = study.getEffects();
        const effectSearch = effects.map(effect => effect.key.replace(/-/g, " ")).join(" ");
        const skillingSearch = [1, 7, 11, 16].includes(study.index) ? "Cheaper layers in other skilling caverns" : "";
        return { study, effects, searchable: `${cavernNames[study.index]} ${study.data.name.replace(/_/g, " ")} ${study.levelAvailable ? study.getDescription().replace(/_/g, " ") : ""} ${effectSearch} ${skillingSearch}`.toLowerCase() };
    });
    const visibleStudies = studyViews.filter(view => (!showUnlocked || view.study.access === true) && view.searchable.includes(search.toLowerCase()));

    return <Box gap="small" data-testid="hole-ready" style={{ minWidth: 0, fontVariantNumeric: "tabular-nums" }}>
        <Heading level="2" size="medium" style={{ fontWeight: "normal" }}>The Hole</Heading>
        <Box gap="small" data-testid="hole-feature">
            <Box data-testid="hole-tabs"><ContentTabs<Tab> options={[{ value: "Villagers", label: "Villagers" }, { value: "Upgrades", label: "Upgrades" }, { value: "Caverns", label: "Caverns" }]} value={tab} onChange={setTab} /></Box>
            {tab === "Villagers" && <Box gap="small" data-testid="villagers-panel">
                <Box direction="row" align="center" gap="medium">
                    <Text weight="bold" data-testid="rate-context-label">{contextLabel}</Text>
                    <TipDisplay heading="Shared growth bonuses" body={<Text data-testid="shared-growth-tip-body">{sharedGrowthText || "No nonzero shared bonuses available."}</Text>} maxWidth="420px">
                        <Box direction="row" gap="xsmall" align="center" data-testid="shared-growth-tip"><Text size="small">Shared growth bonuses</Text><CircleInformation size="small" /></Box>
                    </TipDisplay>
                    {!equal && <select data-testid="inspect-character" aria-label="Inspect character rates" value={characterId ?? ""} onChange={event => setCharacterId(event.target.value === "" ? null : Number(event.target.value))} style={{ font: "inherit", color: "inherit", background: "#1E2127", padding: "8px" }}>
                        <option value="">Choose a character (optional)</option>{characters.map(character => <option key={character.playerId} value={character.playerId}>{character.playerName}</option>)}
                    </select>}
                </Box>
                {!complete && <Text size="small" data-testid="incomplete-context">Some imported character rates are unavailable. Ranges include available contexts only.</Text>}
                {hole.villagers.map(villager => {
                    const rates = displayedRates[villager.index];
                    const matched = equal ? rates[0] : characterId === null ? null : rates.find(rate => rate.playerId === characterId);
                    const available = rates.filter(completeRate);
                    const rateReason = matched?.unavailableReason
                        ?? matched?.contributors.find(row => row.value === null || row.unavailableReason)?.unavailableReason
                        ?? "This imported character's complete growth inputs are unavailable.";
                    const rateText = matched ? completeRate(matched) ? number(matched.expPerHour) : number(null, rateReason)
                        : characterId !== null ? number(null, "This imported character's rate is unavailable.")
                            : available.length > 0 ? `${number(Math.min(...available.map(rate => rate.expPerHour!)))}–${number(Math.max(...available.map(rate => rate.expPerHour!)))}`
                                : "Unavailable: No complete character rate.";
                    const statue = matched?.contributors.find(row => row.source === "Villager Statue");
                    const useful = matched?.contributors.filter(row => ["Purchased EXP multiplier", "Role multiplier"].includes(row.source)
                        && (row.value === null || row.unavailableReason || row.value !== 1)) ?? [];
                    const rateTip = <Box gap="xsmall" data-testid={`rate-tip-body-${villager.index}`}>
                        {matched ? <>
                            <Text>{equal ? "All imported characters have the same statue bonus." : `Matched character: ${selectedCharacter?.playerName ?? matched.playerName}.`}</Text>
                            <Text>Character's Villager Statue: {matched.statueBonus === null || matched.statueFactor === null
                                ? number(null, statue?.unavailableReason ?? "Saved Villager Statue state is missing for this character.")
                                : `${precise(matched.statueBonus, "%")}; ${precise(matched.statueFactor, "×")} EXP.`}</Text>
                            {useful.map(row => <Text key={row.source}>{row.source}: {precise(row.unavailableReason ? null : row.value, "×", row.unavailableReason)}</Text>)}
                        </> : characterId !== null ? <Text>Character's Villager Statue: {number(null, "This imported character's rate context is unavailable.")}</Text>
                            : <Text>Choose a named character to inspect matched modifiers. This range is not an account-wide rate.</Text>}
                    </Box>;
                    const enthusiasm = hole.allocationEffects.opalEnthusiasm.find(entry => entry.villagerId === villager.index)!;
                    const requirement = villager.getExpRequirement();
                    const ready = villager.claimReady;
                    const stored = villager.expAvailable ? villager.currentExp : null;
                    return <Box key={villager.index} data-testid={`villager-row-${villager.index}`}>
                        <DataRow opacity={villager.rescued === false ? 0.6 : 1} columns={["minmax(0, 23fr)", "minmax(0, 6fr)", "minmax(0, 10fr)", "minmax(0, 19fr)", "minmax(0, 15fr)", "minmax(0, 22fr)"]} fields={[
                            { key: "identity", kind: "content", label: null, content: <Box direction="row" gap="small" align="center"><Portrait index={villager.index} /><Box><Text>{villager.name}</Text><Text size="xsmall" color="accent-2">{villager.title}</Text>{villager.rescued !== true && <Text size="xsmall">{villager.rescued === false ? "Not rescued" : number(null, villager.unlockUnavailableReason)}</Text>}</Box></Box> },
                            { key: "level", kind: "text", label: "Level", value: number(villager.saveAvailable ? villager.level : null, "Saved level is missing.") },
                            { key: "opals", kind: "text", label: "Invested Opals", value: number(villager.investmentAvailable ? villager.opals : null, "Saved investment is missing."), tooltip: <Text>Opal Enthusiasm: {precise(enthusiasm.percent, "%", enthusiasm.unavailableReason)} from {number(enthusiasm.investedTens)} invested tens.</Text> },
                            { key: "progress", kind: "content", label: "Stored EXP / next", content: <Box><Text size="small">{`${number(stored, "Saved EXP is missing.")} / ${number(requirement, villager.requirementUnavailableReason)}`}</Text>{ready === true && <Text size="xsmall" data-testid={`villager-readiness-${villager.index}`}>Ready to claim in game</Text>}{ready === null && <Text size="xsmall">{number(null, villager.requirementUnavailableReason ?? "Saved progression is missing.")}</Text>}</Box> },
                            { key: "rate", kind: "text", label: "EXP/hour", value: rateText, tooltip: rateTip },
                            { key: "next", kind: "text", label: "Next unlock", value: nextUnlock(villager, hole), role: "description" },
                        ]} />
                    </Box>;
                })}
                <Box background="dark-1" pad="medium" gap="small" data-testid="resources">
                    <Box direction="row" gap="large" wrap align="center" data-testid="opal-summary">
                        <Box direction="row" gap="small" align="center"><IconImage data={Item.getImageData("Opal")} /><Text weight="bold">Opals</Text></Box>
                        <TextAndLabel label="Available" text={number(ledger.uninvested, ledger.unavailableReason)} tooltip={exact(ledger.uninvested, ledger.unavailableReason)} />
                        <TextAndLabel label="Invested" text={number(ledger.invested, ledger.unavailableReason)} tooltip={exact(ledger.invested, ledger.unavailableReason)} />
                        <TipDisplay heading="Earned Opals" maxWidth="420px" body={<Text data-testid="opal-earned-tip-body">Caverns: {exact(ledger.cavernEarned)}. External sources: {exact(ledger.externalEarned, ledger.unavailableReason)}. Earned: {exact(ledger.earned, ledger.unavailableReason)}.</Text>}><Box direction="row" gap="xsmall" align="center" data-testid="opal-earned-tip"><TextAndLabel label="Earned" text={number(ledger.earned, ledger.unavailableReason)} /><CircleInformation size="small" /></Box></TipDisplay>
                    </Box>
                    {ledger.unavailableReason && <Text size="small" data-testid="ledger-warning">{ledger.unavailableReason}</Text>}
                    <details data-testid="opal-sources"><summary style={{ cursor: "pointer" }}>Opal sources</summary><Box gap="small" margin={{ top: "small" }}>
                        {ledger.sources.filter(source => source.opals === null || source.opals !== 0).map(source => <Box direction="row" justify="between" key={source.id} data-testid={`opal-source-${source.id}`}><Text size="small">{source.owner.startsWith("cavern:") && cavernNames[Number(source.owner.split(":")[1])] ? cavernNames[Number(source.owner.split(":")[1])] : source.name.replace(/_/g, " ").replace(/\b[A-Z][A-Z]+\b/g, word => word[0] + word.slice(1).toLowerCase())}</Text><Text size="small">{exact(source.opals, source.unavailableReason)}</Text></Box>)}
                        {ledger.emperorSchematicFloorAdjustment !== 0 && <Text size="small" data-testid="opal-floor-adjustment">Emperor + schematic floor adjustment: {exact(ledger.emperorSchematicFloorAdjustment, ledger.unavailableReason)}</Text>}
                        {ledger.externalRoundingAdjustment !== 0 && <Text size="small" data-testid="opal-rounding-adjustment">External subtotal rounding adjustment: {exact(ledger.externalRoundingAdjustment, ledger.unavailableReason)}</Text>}
                    </Box></details>
                    <Text size="small" data-testid="equal-spread">Equal Spread: {precise(hole.allocationEffects.equalSpreadPercent, "%", hole.allocationEffects.equalSpreadUnavailableReason)}. Minimum unlocked-villager investment: {number(hole.allocationEffects.leastUnlockedInvestment, hole.allocationEffects.unavailableReason)} Opals.</Text>
                    <TipDisplay heading="Another Try" maxWidth="460px" body={<Box gap="small" data-testid="another-try-tip-body">{hole.anotherTry.resets.map(reset => <Box key={reset.category}><Text weight="bold">{reset.category}</Text><Text>Clears: {reset.clears.join("; ")}.</Text><Text>Retains: {reset.retains.join("; ")}.</Text></Box>)}</Box>}>
                        <Box direction="row" gap="xsmall" align="center" data-testid="another-try-tip"><Text size="small">Another Try: {exact(hole.anotherTry.wishCost)} wishes · {number(hole.anotherTry.availableWishes, "Saved wish balance is missing.")} owned · {hole.anotherTry.access === null ? "Availability unavailable" : hole.anotherTry.access ? "Available" : "Not available"} · {hole.anotherTry.affordable === null ? "Affordability unavailable" : hole.anotherTry.affordable ? "Affordable" : "Not affordable"}</Text><CircleInformation size="small" /></Box>
                    </TipDisplay>
                    <Box direction="row" gap="large" wrap align="center" data-testid="lantern-summary">
                        <Box direction="row" gap="small" align="center"><IconImage data={Item.getImageData("Quest90")} /><Text weight="bold">Blinding Lanterns</Text></Box>
                        <TipDisplay heading="Lantern stock" maxWidth="420px" body={<Box gap="xsmall" data-testid="lantern-tip-body">{usefulLanternLocations.map(location => <Text key={location.kind === "storage" ? "storage" : location.playerId} data-testid="lantern-location">{location.kind === "storage" ? "Storage" : `${location.playerName} inventory`}: {exact(location.quantity, location.unavailableReason)}</Text>)}{usefulLanternLocations.length === 0 && <Text>Total stock: {exact(lanternStock, "Saved Lantern locations are missing.")}.</Text>}</Box>}><Box direction="row" gap="xsmall" align="center" data-testid="lantern-tip"><TextAndLabel label="Stock" text={number(lanternStock, locations.find(location => location.quantity === null)?.unavailableReason)} /><CircleInformation size="small" /></Box></TipDisplay>
                        <TextAndLabel label="Uses today" text={`${number(hole.lanterns.usesToday, hole.lanterns.usageUnavailableReason)} / ${hole.lanterns.dailyLimit}`} />
                        <TipDisplay heading="Lantern effect" maxWidth="440px" body={<Text data-testid="lantern-effect-tip-body">Advances: {hole.lanterns.advances.join("; ")}. Excludes: {hole.lanterns.excludes.join("; ")}.</Text>}><Box direction="row" gap="xsmall" align="center" data-testid="lantern-effect-tip"><TextAndLabel label="Per use" text={`+${hole.lanterns.hoursPerUse} hours`} /><CircleInformation size="small" /></Box></TipDisplay>
                    </Box>
                </Box>
            </Box>}
            {tab === "Upgrades" && <ShadowBox flex={false} data-testid="upgrades-panel"><Grid rows="1" columns={["25%", "75%"]}>
                <Box pad="medium" height="100%" data-testid="upgrade-rail">{upgradeNames.map(name => <Box key={name} data-testid={`upgrade-nav-${name}`}><LeftNavButton text={name} isActive={upgrade === name} clickHandler={() => setUpgrade(name)} /></Box>)}</Box>
                <Box fill background="dark-1" pad="medium" gap="small" style={{ minWidth: 0 }}>
                    <Box direction="row" gap="small" align="center">{upgrade === "Studies" && <Portrait index={4} />}<Heading level="3" size="small" margin="none">{upgrade}</Heading></Box>
                    {upgrade !== "Studies" ? <Text data-testid="unsupported-upgrade">These upgrade tools are not supported on this website yet.</Text> : <>
                        <Box gap="small" data-testid="study-summary">
                            <TextAndLabel label="Study speed" text={`${number(hole.studyRate, hole.studyInputsUnavailableReason)} progress/hour`} />
                            <TipDisplay heading="Study participation" body={<Text data-testid="study-participation-tip-body">The saved target and eligible immediate neighbors use this speed. Neighbor participation requires the relevant Superbit. Website selection does not change the game target.</Text>} maxWidth="420px"><Box data-testid="study-participation-tip">
                                <Box direction="row" gap="xsmall" align="center"><Text size="small">Studying: {hole.savedStudyTarget === null ? hole.studyTargetAvailable ? "None" : number(null, hole.studyTargetUnavailableReason) : cavernNames[hole.savedStudyTarget]}</Text><CircleInformation size="small" /></Box>
                                <Text size="small">Also studying: {hole.eligibleStudyNeighbors === null ? number(null, hole.studyNeighborEligibilityUnavailableReason) : hole.eligibleStudyNeighbors.map(index => cavernNames[index]).join(", ") || "None"}</Text>
                            </Box></TipDisplay>
                        </Box>
                        <Box direction="row" gap="small" align="center"><TextInput data-testid="study-search" aria-label="Search Studies" placeholder="Search Studies" value={search} onChange={event => setSearch(event.target.value)} /><CheckBox data-testid="study-unlocked" label="Show unlocked" checked={showUnlocked} onChange={event => setShowUnlocked(event.target.checked)} />{search !== "" && <SmallButton data-testid="clear-study-search" label="Clear search" onClick={() => setSearch("")} style={{ whiteSpace: "nowrap", minWidth: "88px", flexShrink: 0 }} />}</Box>
                        <Text size="small" color="accent-2" data-testid="study-count">{visibleStudies.length} of {hole.studies.length} Studies</Text>
                        {visibleStudies.length === 0 && <Text data-testid="study-no-results">No Studies match. Clear search or turn off Show unlocked.</Text>}
                        {visibleStudies.map(({ study, effects }) => {
                            const requirement = study.getRequirement();
                            const claimReady = study.claimReady;
                            const progress = study.progressAvailable ? study.progress : null;
                            return <Box key={study.index} data-testid={`study-row-${study.index}`}><DataRow opacity={study.access === false ? 0.6 : 1}
                                columns={["minmax(0, 19fr)", "minmax(0, 7fr)", "minmax(0, 20fr)", "minmax(0, 17fr)", "minmax(0, 32fr)"]} fields={[
                                    { key: "identity", kind: "identity", name: `${study.index + 1}. ${cavernNames[study.index]}` },
                                    { key: "level", kind: "text", label: "Level", value: number(study.levelAvailable ? study.level : null, "Saved Study level is missing.") },
                                    { key: "progress", kind: "content", label: "Stored / next", content: <Box><Text size="small">{`${number(progress, "Saved Study progress is missing.")} / ${number(requirement, "Saved Study level is missing.")}`}</Text>{claimReady === true && <Text size="xsmall" data-testid={`study-readiness-${study.index}`}>Ready to claim in game</Text>}{claimReady === null && <Text size="xsmall">Saved Study progression is unavailable.</Text>}</Box> },
                                    { key: "participation", kind: "text", label: "Participation", value: study.access === false ? "Locked" : study.access === null ? "Unavailable: Saved cavern access is missing." : study.participation === "inactive" ? "Inactive" : study.participation === "unavailable" ? number(null, study.rateUnavailableReason) : `${study.participation === "target" ? "Studying" : "Also studying"} · ${number(study.progressPerHour, study.rateUnavailableReason)}/hour` },
                                    { key: "benefit", kind: "content", label: "Owned benefit", content: <Benefit index={study.index} effects={effects} dailyPurchases={study.dailyCoveUpgradesPurchased} /> },
                                ]} /></Box>;
                        })}
                    </>}
                </Box>
            </Grid></ShadowBox>}
            {tab === "Caverns" && <ShadowBox flex={false} data-testid="caverns-panel"><Grid rows="1" columns={["25%", "75%"]}>
                <Box pad="medium" height="100%" data-testid="cavern-rail">{cavernNames.map((name, index) => <Box key={name} data-testid={`cavern-nav-${index}`}><LeftNavButton text={`${index + 1}. ${name}`} isActive={cavern === index} clickHandler={() => setCavern(index)} /></Box>)}</Box>
                <Box fill background="dark-1" pad="medium" gap="medium" style={{ minWidth: 0 }} data-testid="selected-cavern">
                    <Heading level="3" size="small" margin="none">{cavern + 1}. {cavernNames[cavern]}</Heading>
                    {hole.cavernOpalSources.filter(source => source.owner === `cavern:${cavern}`).map(source => <TextAndLabel key={source.id} label="Earned Opals" text={number(source.opals, source.unavailableReason)} tooltip={exact(source.opals, source.unavailableReason)} />)}
                    <Box gap="small"><Text color="accent-2" size="small">Owned Study benefit</Text><Benefit index={cavern} effects={studyViews[cavern].effects} dailyPurchases={hole.studies[cavern].dailyCoveUpgradesPurchased} /></Box>
                    <Text size="small">Other cavern tools are not supported on this website yet.</Text>
                </Box>
            </Grid></ShadowBox>}
        </Box>
    </Box>;
}
