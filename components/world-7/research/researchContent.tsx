"use client";

import { Box, Grid, Heading, ResponsiveContext, Text, TextInput } from "grommet";
import { useContext, useState, type ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import type { Observation, PostyNote, ResearchContributor, ResearchGrid } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";

const amount = (value: number) => notateNumber(value, "Smaller");
const percent = (value: number) => `${amount(value)}%`;
const rate = (value: number) => `${amount(value)} / hour`;
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
    return <Box as="section" id={id} gap="small" aria-labelledby={`${id}-heading`}>
        <Heading id={`${id}-heading`} level="3" size="small" margin="none" style={{ fontWeight: "normal" }}>{title}</Heading>
        {children}
    </Box>;
}

function Value({ label, value, exact }: { label: string; value: string; exact?: string }) {
    return <TextAndLabel label={label} text={value} textSize="small" labelSize="xsmall" tooltip={exact} />;
}

function ExactText({ heading, exact, children, size = "xsmall", color, weight }: {
    heading: string; exact: string; children: ReactNode; size?: string; color?: string; weight?: "bold";
}) {
    return <TipDisplay heading={heading} body={exact}>
        <Text tabIndex={0} size={size} color={color} weight={weight}>{children}</Text>
    </TipDisplay>;
}

function Contributors({ entries, sharedReferences = false, percentagePoints = false }: { entries: readonly ResearchContributor[]; sharedReferences?: boolean; percentagePoints?: boolean }) {
    return <Box gap="xxsmall">
        {entries.map((entry, index) => {
            const unit = entry.operation === "addPercent" ? (percentagePoints ? " percentage points" : "%") : "";
            const applied = entry.operation === "multiply"
                ? `Multiplier ×${amount(entry.value)}`
                : `${percentagePoints && entry.operation === "addPercent" ? "" : "Bonus "}${entry.value >= 0 ? "+" : ""}${amount(entry.value)}${unit}`;
            const shared = sharedReferences && (entry.source === "Shared Research EXP multiplier" || entry.source === "Shared Insight multiplier");
            const source = entry.source === "Quest116" ? "Professional Papers"
                : entry.source === "The Hole Gambit: +{% Research AFK Gains rate" ? "The Hole Gambit: Research AFK gains"
                : entry.source === "Arcade: +{% Research XP" ? "Arcade: Research EXP" : entry.source;
            const percentInput = entry.operation === "multiply" && entry.inputValue !== entry.value;
            const showInput = (entry.cap !== undefined || Boolean(entry.gate)) && entry.inputValue !== entry.value && entry.operation !== "multiply";
            const gambitGate = entry.source === "The Hole Gambit: +{% Research AFK Gains rate"
                ? entry.gate?.match(/^Requires score ([0-9]+(?:\.[0-9]+)?)( and .+)$/) : undefined;
            const exact = entry.operation === "multiply"
                ? `Multiplier ×${entry.value}.`
                : `${entry.value >= 0 ? "+" : ""}${entry.value}${unit}.`;
            return <Box key={`${entry.source}-${index}`} gap="xxsmall" data-contributor-source={entry.source}>
                <ExactText heading={source} exact={`${exact}${percentInput ? ` Source bonus: ${entry.inputValue >= 0 ? "+" : ""}${entry.inputValue}%.` : ""}${showInput ? ` Input before condition/cap: ${entry.inputValue}${unit}.` : ""}${entry.cap !== undefined ? ` Cap: ${entry.cap}${unit}.` : ""}`}>
                    {source}: {applied}.{percentInput ? ` From ${entry.inputValue >= 0 ? "+" : ""}${percent(entry.inputValue)}.` : ""}{showInput ? ` Input before condition/cap: ${amount(entry.inputValue)}${unit}.` : ""}{entry.cap !== undefined ? ` Cap: ${amount(entry.cap)}${unit}.` : ""}
                </ExactText>
                {entry.gate && <Text size="xsmall" color="accent-2">Condition: {gambitGate ? <>Requires score <TipDisplay heading="Exact Hole Gambit score requirement" body={gambitGate[1]}>
                    <Text tabIndex={0} data-hole-gambit-score aria-label={`Hole Gambit score requirement ${amount(Number(gambitGate[1]))}; exact value ${gambitGate[1]} in tooltip`}>{amount(Number(gambitGate[1]))}</Text>
                </TipDisplay>{gambitGate[2]}</> : entry.gate}</Text>}
                {entry.characterID !== undefined && <Text size="xsmall" color="accent-2">Character ID: {entry.characterID}.</Text>}
                {shared && <Text size="xsmall" color="accent-2">Sources appear in Current production and lenses above.</Text>}
                {entry.components && !shared && <Box gap="xxsmall" margin={{ left: "small" }} border={{ side: "left", color: "grey-1" }} pad={{ left: "small" }}>
                    {entry.companionGroups ? <>
                        <Text size="xsmall">These three independent factors multiply together. Each factor adds its bonuses to baseline 1.</Text>
                        {entry.companionGroups.map(group => {
                            const additions = group.components.map(component => amount(component.value)).join(" + ");
                            const exactAdditions = group.components.map(component => `${component.source}: +${component.value}`).join("; ");
                            return <Box key={group.id} gap="xxsmall" data-companion-factor={group.id}>
                                <ExactText heading={`${group.name} factor`} exact={`Baseline 1; ${exactAdditions}. Resulting factor ×${group.factor}.`}>
                                    {group.name}: (1 + {additions}) = ×{amount(group.factor)}.
                                </ExactText>
                                <Contributors entries={group.components} percentagePoints={percentagePoints} />
                            </Box>;
                        })}
                    </> : <Contributors entries={entry.components} percentagePoints={percentagePoints} />}
                </Box>}
            </Box>;
        })}
    </Box>;
}

function SourceGroup({ title, entries, children, percentagePoints = false }: { title: string; entries: readonly ResearchContributor[]; children?: ReactNode; percentagePoints?: boolean }) {
    return <Box gap="xsmall" data-source-group={title}>
        <Text size="small" weight="bold">{title}</Text>
        {children}
        <Contributors entries={entries} percentagePoints={percentagePoints} />
    </Box>;
}

function ObservationRow({ observation, research }: { observation: Observation; research: ResearchGrid }) {
    const size = useContext(ResponsiveContext);
    const conditions = observation.discoveryConditions;
    const assigned = observation.assignedLenses.map(lens => `ID ${lens.index}: ${lens.data.name}`).join("; ");
    const support = observation.supportingKaleidoscopes.map(lens => {
        const target = research.observations.find(entry => entry.index === lens.targetObservationIndex)!;
        return `ID ${lens.index}: ${lens.data.name} on ${target.data.name}`;
    }).join("; ");
    return <Box data-observation-index={observation.index} data-observation-name={observation.data.name} data-observation-map={observation.map.data.map.name}>
        <DataRow columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1.5fr)", "minmax(0, 1.1fr)", "minmax(0, 1fr)", "minmax(0, 1.4fr)", "minmax(0, 1.5fr)"]}
            fields={[
                { key: "identity", kind: "identity", name: observation.data.name, artwork: <IconImage data={observation.getImageData()} /> },
                { key: "map", kind: "text", label: "Map", value: observation.map.data.map.name },
                { key: "discovery", kind: "text", label: "Discovery", value: `${observation.found ? "Found" : "Not found"}. Research level ${observation.data.requiredResearchLevel}; roll ≥ ${observation.data.discoveryRollRequirement}` },
                { key: "insight", kind: "text", label: "Insight progress", value: `Level ${observation.insightLevel}. ${amount(observation.insightExperience)} / ${amount(observation.nextInsightRequirement)}`, tooltip: `Saved partial Insight EXP: ${observation.insightExperience}. Next requirement: ${observation.nextInsightRequirement}.` },
                { key: "production", kind: "content", label: "Current production", content: <Box gap="xxsmall">
                    <ExactText heading="Research EXP per hour" exact={`${observation.expPerHour} / hour`} size="small">Research EXP: {rate(observation.expPerHour)}</ExactText>
                    <ExactText heading="Actual Insight accrual per hour" exact={`${observation.insightAccrualPerHour} / hour`} size="small">Actual Insight: {rate(observation.insightAccrualPerHour)}</ExactText>
                    <ExactText heading="Game-displayed Insight per hour" exact={`${observation.gameDisplayedInsightPerHour} / hour`} color="accent-2">Game-displayed Insight: {rate(observation.gameDisplayedInsightPerHour)}</ExactText>
                </Box> },
            ]}
            details={[
                { key: "hint", label: "Hint", content: <Text size="xsmall">{observation.data.hint}</Text> },
                { key: "conditions", label: "Separate discovery conditions", content: <Box direction="row" wrap gap="small" data-discovery-conditions>
                    <Text size="xsmall" data-discovery-condition="unmetResearchLevel" data-condition-value={String(conditions.unmetResearchLevel)}>{conditions.unmetResearchLevel ? "Required Research level not met" : "Research level met"}</Text>
                    <Text size="xsmall" data-discovery-condition="alreadyDiscovered" data-condition-value={String(conditions.alreadyDiscovered)}>{conditions.alreadyDiscovered ? "Already discovered" : "Not yet discovered"}</Text>
                    <Text size="xsmall" data-discovery-condition="exhaustedAttempts" data-condition-value={String(conditions.exhaustedAttempts)}>{conditions.exhaustedAttempts ? "No attempts remain" : "Attempts remain"}</Text>
                    <Text size="xsmall" data-discovery-condition="insufficientMaximumRoll" data-condition-value={String(conditions.insufficientMaximumRoll)}>{conditions.insufficientMaximumRoll ? "Maximum roll below threshold" : "Maximum roll meets threshold"}</Text>
                </Box> },
                { key: "placements", label: "Assigned owned lenses", content: <Text size="xsmall">{assigned || "None"}. Capacity: {research.lensOwnership.capacityPerObservation} lenses per Observation.</Text> },
                { key: "support", label: "Kaleidoscope support", content: <Box gap="xxsmall">
                    <Text size="xsmall">{support || "No supporting owned Kaleidoscopes"}.</Text>
                    <ExactText heading="Applied Kaleidoscope support multiplier" exact={`×${observation.kaleidoscopeMultiplier}`}>Applied support multiplier: ×{amount(observation.kaleidoscopeMultiplier)}. Each orthogonal neighbor adds its boost; diagonals and the lens itself do not contribute.</ExactText>
                </Box> },
                { key: "effects", label: "Local Insight effect", content: <Box gap="xxsmall">
                    <ExactText heading="Local Insight Research EXP bonus" exact={`+${observation.localInsightExpBonusPercent}%`}>+{percent(observation.localInsightExpBonusPercent)} Research EXP on this Observation.</ExactText>
                    {!observation.eligibleForProduction && <Text size="xsmall">This Observation does not currently produce Research EXP or Insight.</Text>}
                </Box> },
                { key: "contributors", label: "Current production contributors", content: <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="medium">
                    <Box gap="xxsmall"><ExactText heading="Research EXP before shared multiplier" exact={`${observation.expBeforeSharedMultiplierPerHour} / hour`} weight="bold">Research EXP before shared multiplier: {rate(observation.expBeforeSharedMultiplierPerHour)}</ExactText><Contributors entries={observation.expContributors} sharedReferences /></Box>
                    <Box gap="xxsmall"><Text size="xsmall" weight="bold">Actual Insight factors</Text><Contributors entries={observation.insightContributors} sharedReferences /></Box>
                </Grid> },
            ]}
        />
    </Box>;
}

function NoteContext({ note }: { note: PostyNote }) {
    const context = note.context;
    switch (context.kind) {
        case "lens":
            return <Text size="xsmall">Adds {context.additionalLenses} lens before the ownership cap. Current owned lenses: {context.currentTotal} / {context.cap}.</Text>;
        case "capacity":
            return <Text size="xsmall">This note sets capacity to {context.capacity} lenses per Observation. Current capacity: {context.currentCapacity}.</Text>;
        case "shape":
            return <Box gap="xsmall">
                <Text size="xsmall">{context.explanation}</Text>
                <Text size="xsmall">Current owned Shapes: {context.currentOwnership.count} / {context.currentOwnership.cap}. Uncapped count: {context.currentOwnership.uncappedCount}. {context.canAddOwnedShape ? "Ownership has room for another Shape." : "Shape ownership is at its cap; this note cannot add an owned Shape."}</Text>
                <Text size="xsmall">Owned Shape names: {context.currentOwnership.ownedShapes.map(shape => shape.name).join(", ") || "None"}.</Text>
                <Text size="xsmall">Shape reward before the ownership cap: {context.additionalShapes}.</Text>
            </Box>;
        case "rotation":
            return <Text size="xsmall">Rotation unlock: Research level {context.requiredLevel}. {context.unlocked ? "Unlocked" : "Not unlocked"}. Rotation step: {context.stepDegrees}°.</Text>;
        case "points":
            return <Box gap="xxsmall">
                <Text size="xsmall">{context.current.explanation}</Text>
                <Text size="xsmall">Reached ten-level blocks: {context.current.reachedTenLevelBlocks}. Points per block: {context.current.pointsPerTenLevelBlock}. Purchased Grid upgrade level: {context.current.purchasedGrid50Level}.</Text>
                <Text size="xsmall">Level 60: {context.current.level60Reached ? "Reached" : "Upcoming"}. Cumulative milestone Points: {context.current.cumulativeMilestonePoints}. This is milestone context, not a Point balance.</Text>
            </Box>;
    }
}

export default function ResearchContent() {
    const size = useContext(ResponsiveContext);
    const { theData, dataStatus } = useAppDataStore(useShallow(state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated, dataStatus: state.dataStatus })));
    const [query, setQuery] = useState("");
    const research = theData.get("research") as ResearchGrid | undefined;

    if ((dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !research) {
        return <Box pad={{ vertical: "medium" }}><Text>Loading Research data…</Text></Box>;
    }

    const { progress, discoveryAllowance: discovery, production, lensOwnership: ownership, offlineGains: offline, papers } = research;
    const savedCopy = progress.savedExpCopy;
    const timestamp = progress.saveGlobalTime !== undefined && Number.isFinite(progress.saveGlobalTime)
        ? new Date(progress.saveGlobalTime * 1000).toISOString() : "Unavailable";
    const normalizedQuery = query.trim().toLowerCase();
    const visibleObservations = research.observations.filter(observation =>
        observation.data.name.toLowerCase().includes(normalizedQuery) || observation.map.data.map.name.toLowerCase().includes(normalizedQuery));
    return <Box id="research" gap="large" pad={{ vertical: "medium" }} style={{ fontVariantNumeric: "tabular-nums", overflowWrap: "anywhere" }}>
        <Box as="section" id="research-top" gap="small">
            <Box gap="xxsmall">
                <Heading level="2" size="medium" margin="none" style={{ fontWeight: "normal" }}>Research</Heading>
            </Box>
            <Box background="dark-1" pad="medium" gap="small">
                <Grid columns={{ count: size === "small" ? 1 : 4, size: "auto" }} gap="medium">
                    <Value label="Highest saved Research level" value={commaNotation(progress.highestLevel)} />
                    <Value label="Saved EXP copy / same-copy requirement" value={savedCopy ? `${amount(savedCopy.currentXP)} / ${savedCopy.xpReq === undefined ? "Unavailable" : amount(savedCopy.xpReq)}` : "Unavailable"} exact={savedCopy ? `Saved EXP: ${savedCopy.currentXP}. Same-copy requirement: ${savedCopy.xpReq === undefined ? "Unavailable" : savedCopy.xpReq}.` : undefined} />
                    <Value label="Discoveries" value={`${progress.discoveries} / ${research.observations.length}`} />
                    <Value label="Total Observation Insight levels" value={commaNotation(progress.totalObservationLevels)} />
                </Grid>
                <Value label="Exact save timestamp (UTC)" value={timestamp} />
                <Text size="xsmall" color="accent-2">{savedCopy ? `Research EXP and its requirement come from the same saved character copy: ${savedCopy.characterName} (character ID ${savedCopy.characterID}). This character has the lowest ID among characters with the highest saved Research level. This saved copy does not establish total account Research EXP. It does not establish total account progress.` : "No saved character EXP copy is available."}</Text>
            </Box>
        </Box>

        <Section id="research-discovery" title="Discovery">
            <Box background="dark-1" pad="medium" gap="medium">
                <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="medium">
                    <Box gap="small"><Value label="Remaining / daily attempts" value={`${discovery.remainingAttempts} / ${discovery.dailyAllocation}`} /><SourceGroup title="Daily allocation sources" entries={discovery.dailyAllocationContributors} /></Box>
                    <Box gap="small"><Value label="Inclusive discovery roll range" value={`${discovery.minimumRoll}–${discovery.maximumRoll}`} /><SourceGroup title="Minimum roll sources" entries={discovery.minimumRollContributors} /><SourceGroup title="Maximum roll sources" entries={discovery.maximumRollContributors} /></Box>
                    <Box gap="small"><Value label="Shared failed-roll count" value={commaNotation(discovery.failedRollCount)} /><Value label="Current failure bonus / cap" value={`${amount(discovery.currentFailedRollBonus)} / ${amount(discovery.failedRollBonusCap)}`} exact={`${discovery.currentFailedRollBonus} / ${discovery.failedRollBonusCap}`} /><Text size="xsmall">The shared failure count is not attempts used today. Daily allocation minus remaining attempts does not give an attempts-used total.</Text></Box>
                </Grid>
                <Text size="xsmall" color="accent-2">The roll can include either endpoint. Each source shows its bonus, starting value when relevant, conditions, and cap.</Text>
            </Box>
        </Section>

        <Section id="research-production" title="Current production and lenses">
            <Box background="dark-1" pad="medium" gap="medium">
                <Grid columns={{ count: size === "small" ? 1 : 4, size: "auto" }} gap="medium">
                    <Value label="Research EXP" value={rate(production.expPerHour)} exact={`${production.expPerHour} / hour`} />
                    <Value label="Before shared EXP multiplier" value={rate(production.expBeforeSharedMultiplierPerHour)} exact={`${production.expBeforeSharedMultiplierPerHour} / hour`} />
                    <Value label="Actual Insight accrual" value={rate(production.insightAccrualPerHour)} exact={`${production.insightAccrualPerHour} / hour`} />
                    <Value label="Game-displayed Insight" value={rate(production.gameDisplayedInsightPerHour)} exact={`${production.gameDisplayedInsightPerHour} / hour`} />
                </Grid>
                <Text size="small">{production.insightDisplayDiscrepancy}</Text>
                <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="large">
                    <Box gap="medium">
                        <Value label="Shared Research EXP multiplier" value={`×${amount(production.expMultiplier)}`} exact={`×${production.expMultiplier}`} />
                        <SourceGroup title="Additive Research EXP percentages" entries={production.additiveExpContributors}>
                            <ExactText heading="Total additive Research EXP bonus" exact={`+${production.additiveExpPercent}%`}>Total: +{percent(production.additiveExpPercent)}. Add these percentages before applying the percentage bonus.</ExactText>
                        </SourceGroup>
                        <SourceGroup title="Multiplicative Research EXP factors" entries={production.expMultiplierContributors}>
                            <Text size="xsmall">Multiply these factors after the additive percentage bonus. Zero and inactive sources remain visible.</Text>
                        </SourceGroup>
                    </Box>
                    <Box gap="medium">
                        <Value label="Shared actual Insight multiplier" value={`×${amount(production.insightMultiplier)}`} exact={`×${production.insightMultiplier}`} />
                        <SourceGroup title="Insight bonuses and multipliers" entries={production.insightContributors} />
                        <Box gap="small">
                            <Value label="Local Research EXP bonus per Insight level" value={`+${percent(production.localInsightExpPerLevelContributor.value)} on that Observation`} exact={`+${production.localInsightExpPerLevelContributor.value}% on that Observation`} />
                            <Contributors entries={[production.localInsightExpPerLevelContributor]} />
                            <Value label="Total Observation-level Research EXP benefit" value={`+${percent(production.totalInsightExpBonusPercent)}`} exact={`+${production.totalInsightExpBonusPercent}%`} />
                            <Text size="xsmall">The local bonus uses one Observation's Insight level. The total-level benefit is separate and appears in shared EXP sources.</Text>
                        </Box>
                        <SourceGroup title={`Kaleidoscope adjacent boost · +${percent(production.kaleidoscopeBoostPercent)} per supporting lens`} entries={production.kaleidoscopeContributors}>
                            <ExactText heading="Kaleidoscope boost per supporting lens" exact={`+${production.kaleidoscopeBoostPercent}%`}>Orthogonal neighbors add their boosts. They do not multiply separate neighbor bonuses.</ExactText>
                        </SourceGroup>
                    </Box>
                </Grid>
            </Box>
            <Box background="dark-1" pad="medium" gap="medium" id="research-ownership">
                <Text size="small" weight="bold">Owned lenses and capacity</Text>
                <Grid columns={{ count: size === "small" ? 1 : 4, size: "auto" }} gap="medium">
                    <Value label="Total owned / cap" value={`${ownership.total} / ${ownership.cap} (uncapped: ${ownership.uncappedTotal})`} />
                    <Value label="Fixed lens kinds" value={`${ownership.magnifyingGlasses} Magnifying Glasses; ${ownership.opticalMonocles} Optical Monocles; ${ownership.kaleidoscopes} Kaleidoscopes`} />
                    <Value label="Capacity per Observation" value={`${ownership.capacityPerObservation} lenses`} />
                    <Value label="Unplaced owned lenses" value={commaNotation(ownership.unplacedLensCount)} />
                </Grid>
                <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="large">
                    <SourceGroup title="Ownership sources" entries={ownership.contributors} />
                    <SourceGroup title="Capacity sources" entries={ownership.capacityContributors} />
                </Grid>
            </Box>
        </Section>

        <Section id="research-observations" title="Observations">
            <Box direction="row" wrap gap="medium" align="center">
                <Box width="medium"><TextInput aria-label="Search Observation names or maps" placeholder="Search names or maps" value={query} onChange={event => setQuery(event.target.value)} /></Box>
                <Text size="small" data-observation-result-count>{visibleObservations.length} / {research.observations.length} Observations</Text>
            </Box>
            <Text size="xsmall" color="accent-2">All Observations appear with an empty search. Discovery conditions are independent; several can be true.</Text>
            <Box gap="small">
                {visibleObservations.map(observation => <ObservationRow key={observation.index} observation={observation} research={research} />)}
                {visibleObservations.length === 0 && <Box background="dark-1" pad="medium"><Text data-observation-empty>No Observations match this search. Clear the search to show all Observations.</Text></Box>}
            </Box>
        </Section>

        <Section id="research-lenses" title="Owned lens placements">
            <Text size="xsmall" color="accent-2">Magnifying Glasses produce Research EXP. Optical Monocles produce Insight. Kaleidoscopes support orthogonal neighbors.</Text>
            <Box gap="small">
                {research.lenses.map(lens => <Box key={lens.index} data-owned-lens-id={lens.index}>
                    <DataRow columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1.3fr)", "minmax(0, 1.2fr)", "minmax(0, 1fr)"]} fields={[
                        { key: "identity", kind: "identity", name: `ID ${lens.index}: ${lens.data.name}`, artwork: <IconImage data={lens.getImageData()} /> },
                        { key: "target", kind: "text", label: "Actual target", value: lens.targetObservationIndex === undefined ? "Unplaced" : research.observations.find(observation => observation.index === lens.targetObservationIndex)!.data.name },
                        { key: "position", kind: "text", label: "Saved position", value: `(${lens.x}, ${lens.y})` },
                    ]} />
                </Box>)}
                {research.lenses.length === 0 && <Text size="small">No owned lens placements are available in this save.</Text>}
            </Box>
        </Section>

        <Section id="research-offline-papers" title="Offline gains and Papers">
            <Box background="dark-1" pad="medium" gap="medium">
                <Grid columns={{ count: size === "small" ? 1 : 4, size: "auto" }} gap="medium">
                    <Value label="Online gains" value={percent(offline.onlinePercent)} exact={`${offline.onlinePercent}%`} />
                    <Value label="Current offline gains" value={percent(offline.percent)} exact={`${offline.percent}%`} />
                    <Value label="Unclamped offline gains" value={percent(offline.unclampedPercent)} exact={`${offline.unclampedPercent}%`} />
                    <Value label="Offline baseline / cap" value={`${percent(offline.baselinePercent)} / ${percent(offline.capPercent)}`} exact={`${offline.baselinePercent}% / ${offline.capPercent}%`} />
                </Grid>
                <Text size="xsmall">Each source adds percentage points to the {percent(offline.baselinePercent)} baseline. Limit the result to {percent(offline.floorPercent)}–{percent(offline.capPercent)}.</Text>
                <Contributors entries={offline.contributors} percentagePoints />
                <Grid columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="large">
                    <Box gap="small">
                        <Box direction="row" wrap gap="small" align="center"><IconImage data={papers.consumable.item.getImageData()} /><Text size="small">Half Finished Research Papers</Text></Box>
                        <Value label="Consumable inventory" value={commaNotation(papers.consumable.count)} />
                        <Value label="Progress grant per Paper" value={`${papers.consumable.grantHours} hours`} />
                        <Text size="xsmall">Pending progress is not applied to this saved view.</Text>
                        <Text size="xsmall">Papers also grant Minehead Currency, but this page does not show its balance.</Text>
                    </Box>
                    <Box gap="small">
                        <Text size="small">Professional Papers</Text>
                        <Value label="Permanent purchase count" value={commaNotation(papers.permanent.purchasedCount)} />
                        <Value label="Permanent offline bonus" value={`+${amount(papers.permanent.offlinePercent)} percentage points`} exact={`+${papers.permanent.offlinePercent} percentage points`} />
                    </Box>
                </Grid>
            </Box>
        </Section>

        <Section id="research-posty-notes" title="Posty Notes">
            <Text size="xsmall" color="accent-2">All {research.postyNotes.length} notes remain visible. Rewards use current ownership; no next Shape is promised.</Text>
            <Box id="research-shape-ownership" background="dark-1" pad="medium" gap="small">
                <Text size="small" weight="bold">Current Shape ownership and sources</Text>
                <Text size="xsmall">Current owned Shapes: {research.shapeOwnership.count} / {research.shapeOwnership.cap}. Uncapped count: {research.shapeOwnership.uncappedCount}.</Text>
                <Text size="xsmall">Owned Shape names: {research.shapeOwnership.ownedShapes.map(shape => shape.name).join(", ") || "None"}.</Text>
                <SourceGroup title="Shape ownership sources" entries={research.shapeOwnership.contributors} />
            </Box>
            <Box gap="small">
                {research.postyNotes.map(note => <Box key={note.index} data-posty-note-index={note.index}>
                    <DataRow columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 0.8fr)", "minmax(0, 0.7fr)", "minmax(0, 3fr)"]} fields={[
                        { key: "level", kind: "text", label: "Research level", value: String(note.data.requiredResearchLevel) },
                        { key: "state", kind: "text", label: "State", value: note.reached ? "Reached" : "Upcoming" },
                        { key: "description", kind: "text", label: "Description", value: note.data.description, role: "description" },
                    ]} details={[{ key: "context", label: "Current reward context", content: <NoteContext note={note} /> }]} />
                </Box>)}
            </Box>
        </Section>
    </Box>;
}
