"use client";

import { Box, Button, Grid, Heading, ResponsiveContext, Select, Text, TextInput, ThemeContext } from "grommet";
import { useContext, useState, type ReactNode } from "react";
import { useShallow } from "zustand/react/shallow";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import type { Observation, PostyNote, ResearchOfflineContributor, ResearchContributorReward, ResearchGrid } from "../../../data/domain/world-7/research";
import { Skilling } from "../../../data/domain/skilling";
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import { commaNotation, notateNumber } from "../../../data/utility";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { DataStatus } from "../../../lib/stores/appDataStore";
import ResearchGridDisplay from "./researchGrid";
import ResearchShapes from "./researchShapes";

const amount = (value: number) => notateNumber(value, "Smaller");
const percent = (value: number) => `${amount(value)}%`;
const rate = (value: number) => `${amount(value)} / hour`;
const tabs = ["Observations", "Lenses", "Posty Notes", "Papers", "Grid", "Shapes"] as const;
type ResearchTab = typeof tabs[number];
const sorts = ["Game order", "Research EXP highest", "Insight highest"] as const;

function obtainableReward(reward: ResearchContributorReward, percentagePoints = false) {
    const value = reward.operation === "multiply" ? `×${amount(reward.value)}`
        : `${reward.value >= 0 ? "+" : ""}${amount(reward.value)}${reward.operation === "addPercent" ? percentagePoints ? " pp" : "%" : ""}`;
    const basis = reward.basis && reward.basis !== "unlock" ? ` ${reward.basis}` : "";
    const condition = reward.requiredResearchLevel ? ` · Research Lv. ${reward.requiredResearchLevel}` : "";
    return `${value} ${reward.unit}${basis}${condition}`;
}

function sourceName(source: string) {
    if (source === "Quest116") return "Professional Papers";
    if (source === "The Hole Gambit: +{% Research AFK Gains rate") return "Hole Gambit";
    if (source === "Arcade: +{% Research XP") return "Arcade";
    if (source.startsWith("Posty Note: Research level ")) return source.replace("Posty Note: Research level ", "Posty Note, level ");
    return source.replace(/^(Research Grid|Sushi|Companion|Owned card|Farming sticker): /, "");
}

function Contributions({ entries, percentagePoints = false }: { entries: readonly ResearchOfflineContributor[]; percentagePoints?: boolean }) {
    return <Box gap="xxsmall">
        {entries.flatMap((entry, index) => {
            if (entry.companionGroups) {
                return entry.companionGroups.map(group => <Text key={group.id} size="xsmall" data-companion-group={group.id} style={{ opacity: group.reward.active ? 1 : 0.6 }}>
                    {group.name}: {group.reward.active ? `×${amount(group.factor)}` : obtainableReward(group.reward, percentagePoints)}
                </Text>);
            }
            if (entry.value === null) {
                return [<Text key={`${entry.source}-${index}`} size="xsmall" data-contributor-source={entry.source}>
                    {sourceName(entry.source)}: Unavailable
                </Text>];
            }
            const inactive = entry.reward ? !entry.reward.active : entry.operation === "multiply" ? entry.value === 1 : entry.value === 0;
            const value = entry.operation === "multiply" ? `×${amount(entry.value)}`
                : `${entry.value >= 0 ? "+" : ""}${amount(entry.value)}${entry.operation === "addPercent" ? percentagePoints ? " pp" : "%" : ""}`;
            return [<Text key={`${entry.source}-${index}`} size="xsmall" data-contributor-source={entry.source} style={{ opacity: inactive ? 0.6 : 1 }}>
                {sourceName(entry.source)}: {entry.reward && inactive ? obtainableReward(entry.reward, percentagePoints) : value}
            </Text>];
        })}
    </Box>;
}

function SourceValue({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
    return <ComponentAndLabel label={label} labelSize="xsmall" component={children
        ? <TipDisplay heading={label} body={<Box style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>{children}</Box>} maxWidth="620px" size="small">
            <Text tabIndex={0} size="small" data-research-source-value={label} style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>{value}</Text>
        </TipDisplay>
        : <Text size="small" data-research-source-value={label}>{value}</Text>} />;
}

function ExpBonuses({ research }: { research: ResearchGrid }) {
    return <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="medium">
        <Box gap="xsmall"><Text size="xsmall" weight="bold">Additive bonuses</Text><Contributions entries={research.production.additiveExpContributors} /></Box>
        <Box gap="xsmall"><Text size="xsmall" weight="bold">Multipliers</Text><Contributions entries={research.production.expMultiplierContributors} /></Box>
    </Grid>;
}

function ObservationContext({ observation, research }: { observation: Observation; research: ResearchGrid }) {
    const lenses = new Map<string, number>();
    for (const lens of observation.assignedLenses) lenses.set(lens.data.name, (lenses.get(lens.data.name) ?? 0) + 1);
    for (const lens of observation.supportingKaleidoscopes) {
        const target = research.observations.find(entry => entry.index === lens.targetObservationIndex)!;
        const name = `Kaleidoscope on ${target.data.name}`;
        lenses.set(name, (lenses.get(name) ?? 0) + 1);
    }
    return <Box gap="xxsmall">
        {[...lenses].map(([name, count]) => <Text size="xsmall" key={name}>{name}: {count}</Text>)}
        {observation.kaleidoscopeMultiplier !== 1 && <Text size="xsmall">Adjacent support: ×{amount(observation.kaleidoscopeMultiplier)}</Text>}
    </Box>;
}

function ObservationCard({ observation, research }: { observation: Observation; research: ResearchGrid }) {
    const conditions = observation.discoveryConditions;
    const context = <ObservationContext observation={observation} research={research} />;
    const revealRequirement = !observation.found && !observation.revealed
        ? research.getObservationRevealRequirement(observation.index) : undefined;
    return <ShadowBox background="dark-1" pad="medium" gap="small"
        data-observation-index={observation.index} data-observation-found={String(observation.found)}
        data-observation-revealed={String(observation.revealed)} data-component="observation-card"
        style={{ opacity: observation.found ? 1 : observation.revealed ? 0.65 : 0.35, minWidth: 0 }}
        aria-label={`${observation.data.name}, ${observation.found ? "owned" : observation.revealed ? "revealed, not found" : "not yet revealed"}`}>
        <Box direction="row" gap="small" align="center">
            <IconImage data={observation.getImageData()} style={{ filter: observation.getInsightImageFilter() }} />
            <Box gap="xxsmall"><Text size="small">{observation.data.name}</Text><Text size="xsmall" color="accent-2">{observation.map.data.map.name}</Text></Box>
        </Box>
        {observation.found ? <>
            <Box gap="xxsmall">
                <Text size="small" data-insight-current-level>Insight level {observation.insightLevel}</Text>
                <Text size="xsmall" color="accent-2">{amount(observation.insightExperience)} / {amount(observation.nextInsightRequirement)} EXP</Text>
                <Box data-insight-track background="grey-1" height="8px" overflow="hidden"
                    role="progressbar" aria-label={`${observation.data.name} Insight progress`}
                    aria-valuemin={0} aria-valuemax={observation.nextInsightRequirement} aria-valuenow={observation.insightExperience}>
                    <Box data-insight-fill background="brand" height="8px" flex={false} style={{
                        width: `${100 * Math.min(1, observation.insightExperience / observation.nextInsightRequirement)}%`,
                    }} />
                </Box>
            </Box>
            <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
                <SourceValue label="Research EXP" value={rate(observation.expPerHour)}>{observation.expPerHour > 0 ? <>
                    {context}<Text size="xsmall" data-contributor-source={observation.localInsightExpContributor.source}
                        style={{ opacity: (observation.localInsightExpContributor.reward ? observation.localInsightExpContributor.reward.active : observation.localInsightExpBonusPercent !== 0) ? 1 : 0.6 }}>
                        Insight level: {observation.localInsightExpContributor.reward && !observation.localInsightExpContributor.reward.active
                            ? obtainableReward(observation.localInsightExpContributor.reward) : `+${percent(observation.localInsightExpBonusPercent)}`}
                    </Text>
                </> : undefined}</SourceValue>
                <SourceValue label="Insight gain" value={rate(observation.insightAccrualPerHour)}>{observation.assignedLenses.length > 0 || observation.supportingKaleidoscopes.length > 0 ? context : undefined}</SourceValue>
            </Grid>
            {observation.study.unmetResearchLevel && <Text size="xsmall" color="status-warning">Study at Research Lv. {observation.study.requiredResearchLevel}</Text>}
        </> : <>
            <Text size="xsmall">{observation.data.hint}</Text>
            {revealRequirement && <Text size="xsmall" data-observation-reveal>
                {revealRequirement.requiresFirstDiscovery ? "Find your first Observation to reveal"
                    : `Reveals at Research level ${revealRequirement.researchLevel}`}
            </Text>}
            <Text size="small" color={conditions.insufficientMaximumRoll ? "status-warning" : undefined}>Roll {observation.data.discoveryRollRequirement} or higher</Text>
            {conditions.exhaustedAttempts && <Text size="xsmall" color="status-warning">No discovery attempts remain</Text>}
            {conditions.insufficientMaximumRoll && <Text size="xsmall" color="status-warning">Maximum roll is too low</Text>}
            <Text size="xsmall" data-observation-study color={observation.study.unmetResearchLevel ? "status-warning" : undefined}>Study at Research Lv. {observation.study.requiredResearchLevel}</Text>
        </>}
    </ShadowBox>;
}

function NoteReward({ note }: { note: PostyNote }) {
    const context = note.context;
    switch (context.kind) {
        case "lens": return <Text size="small">+{context.additionalLenses} Magnifying Glass</Text>;
        case "capacity": return <Text size="small">{context.capacity} lenses per Observation</Text>;
        case "shape": return <Box gap="xxsmall"><Text size="small">+{context.additionalShapes} Shape</Text>{!context.canAddOwnedShape && !note.reached && <Text size="xsmall">Shape ownership is full</Text>}</Box>;
        case "rotation": return <Text size="small">Rotate Shapes in {context.stepDegrees}° steps</Text>;
        case "points": return <Text size="small">+1 Grid Point every 10 Research levels</Text>;
    }
}

export default function ResearchContent() {
    const size = useContext(ResponsiveContext);
    const { theData, dataStatus } = useAppDataStore(useShallow(state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated, dataStatus: state.dataStatus })));
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState<ResearchTab>("Observations");
    const [sort, setSort] = useState<typeof sorts[number]>("Game order");
    const research = theData.get("research") as ResearchGrid | undefined;
    if ((dataStatus !== DataStatus.StaticData && dataStatus !== DataStatus.LiveData) || !research) {
        return <Box pad={{ vertical: "medium" }}><Text>Loading Research data…</Text></Box>;
    }
    const { progress, discoveryAllowance: discovery, production, lensOwnership: ownership, offlineGains: offline, papers } = research;
    const normalizedQuery = query.trim().toLowerCase();
    const visibleObservations = research.observations.filter(observation => {
        return observation.data.name.toLowerCase().includes(normalizedQuery) || observation.map.data.map.name.toLowerCase().includes(normalizedQuery);
    }).sort((left, right) => {
        const difference = sort === "Research EXP highest" ? right.expPerHour - left.expPerHour
            : sort === "Insight highest" ? right.insightAccrualPerHour - left.insightAccrualPerHour : 0;
        return difference || left.index - right.index;
    });
    const nextNote = research.postyNotes.find(note => !note.reached);
    return <Box id="research" gap="medium" pad={{ vertical: "medium" }} style={{ fontVariantNumeric: "tabular-nums", overflowWrap: "anywhere" }}>
        <Heading level="2" size="medium" margin="none" style={{ fontWeight: "normal" }}>Research</Heading>
        <Grid id="research-top" columns={size === "small" ? ["minmax(0, 1fr)"] : ["minmax(0, 1fr)", "minmax(0, 1.3fr)", "minmax(0, 1fr)"]} gap="small">
            <Box background="dark-1" pad="medium" gap="small" data-research-summary="skill">
                <Box direction="row" gap="small" align="center"><IconImage data={Skilling.getSkillImageData(SkillsIndex.Research)} /><Text size="large">Level {commaNotation(progress.highestLevel)}</Text></Box>
                {progress.savedExpCopy && <TextAndLabel label="Research EXP" text={`${amount(progress.savedExpCopy.currentXP)} / ${progress.savedExpCopy.xpReq === undefined ? "Unavailable" : amount(progress.savedExpCopy.xpReq)}`} textSize="small" labelSize="xsmall" />}
                <TextAndLabel label="Total Insight levels" text={commaNotation(progress.totalObservationLevels)} textSize="small" labelSize="xsmall" />
            </Box>
            <Box background="dark-1" pad="medium" gap="small" data-research-summary="discovery">
                <Text size="small" weight="bold">Observation discovery</Text>
                <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
                    <SourceValue label="Attempts remaining" value={String(discovery.remainingAttempts)} />
                    <SourceValue label="Attempts per day" value={String(discovery.dailyAllocation)}><Contributions entries={discovery.dailyAllocationContributors} /></SourceValue>
                    <SourceValue label="Roll range" value={`${discovery.minimumRoll}–${discovery.maximumRoll}`}><Box gap="small"><Contributions entries={discovery.minimumRollContributors} /><Contributions entries={discovery.maximumRollContributors} /></Box></SourceValue>
                </Grid>
            </Box>
            <Box background="dark-1" pad="medium" gap="small" data-research-summary="gains">
                <Text size="small" weight="bold">Current gains</Text>
                <SourceValue label="Research EXP" value={rate(production.expPerHour)}><ExpBonuses research={research} /></SourceValue>
                <SourceValue label="Insight" value={rate(production.insightAccrualPerHour)}><Contributions entries={production.insightContributors} /></SourceValue>
                <SourceValue label="Offline gains" value={offline.percent === null ? "Unavailable" : percent(offline.percent)}><Contributions entries={offline.contributors} percentagePoints /></SourceValue>
            </Box>
        </Grid>
        <Box gap="medium" style={{ overflowWrap: "normal" }}>
            <ThemeContext.Extend value={size === "small" ? { text: { medium: { size: "12px", height: "20px" } } } : {}}>
                <ContentTabs options={tabs.map(value => ({ value, label: value === "Observations" ? `Observations (${progress.discoveries}/${research.observations.length})` : value }))} value={tab} onChange={setTab} />
            </ThemeContext.Extend>
            {tab === "Observations" && <Box as="section" id="research-observations" gap="small" aria-label="Observations">
                <Box direction={size === "small" ? "column" : "row"} wrap={size !== "small"} gap="small" align={size === "small" ? "start" : "end"}>
                    <Box width={size === "small" ? "100%" : "medium"}><ComponentAndLabel label={<label htmlFor="research-search"><Text size="xsmall" color="accent-2">Search</Text></label>} component={<TextInput id="research-search" aria-label="Search Observation names or maps" placeholder="Search names or maps" style={{ height: "48px" }} value={query} onChange={event => setQuery(event.target.value)} />} /></Box>
                    <Box width="240px"><ComponentAndLabel label={<label htmlFor="research-sort"><Text size="xsmall" color="accent-2">Sort</Text></label>} component={<Select id="research-sort" aria-label="Observation sort" size="medium" options={[...sorts]} value={sort} onChange={({ option }) => setSort(option)} />} /></Box>
                    {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery("")} />}
                </Box>
                <Grid columns={{ count: size === "small" ? 1 : 3, size: "auto" }} gap="small" data-observation-cards>
                    {visibleObservations.map(observation => <ObservationCard key={observation.index} observation={observation} research={research} />)}
                </Grid>
                {visibleObservations.length === 0 && <Box background="dark-1" pad="medium"><Text data-observation-empty>No Observations match this search.</Text></Box>}
            </Box>}
            {tab === "Lenses" && <Box as="section" id="research-lenses" gap="medium" aria-label="Lenses">
                <Box direction="row" wrap gap="medium" data-research-ownership>
                    <SourceValue label="Owned lenses" value={String(ownership.total)}><Contributions entries={ownership.contributors} /></SourceValue>
                    <SourceValue label="Capacity per Observation" value={String(ownership.capacityPerObservation)}><Contributions entries={ownership.capacityContributors} /></SourceValue>
                    <SourceValue label="Unplaced" value={String(ownership.unplacedLensCount)} />
                </Box>
                <Box direction="row" wrap gap="medium">
                    <Text size="small">{ownership.magnifyingGlasses} Magnifying Glasses</Text><Text size="small">{ownership.opticalMonocles} Optical Monocles</Text><Text size="small">{ownership.kaleidoscopes} Kaleidoscopes</Text>
                </Box>
                <Grid columns={{ count: size === "small" ? 1 : 3, size: "auto" }} gap="small">
                    {research.lenses.map(lens => <ShadowBox key={lens.index} background="dark-1" pad="medium" gap="small" data-owned-lens-id={lens.index}>
                        <Box direction="row" gap="small" align="center"><IconImage data={lens.getImageData()} /><Text size="small">{lens.data.name}</Text></Box>
                        <Text size="small">{lens.targetObservationIndex === undefined ? "Unplaced" : research.observations.find(observation => observation.index === lens.targetObservationIndex)!.data.name}</Text>
                    </ShadowBox>)}
                </Grid>
                {research.lenses.length === 0 && <Text size="small">No owned lenses.</Text>}
            </Box>}
            {tab === "Posty Notes" && <Box as="section" id="research-posty-notes" gap="medium" aria-label="Posty Notes">
                <Box direction="row" wrap gap="medium">
                    <SourceValue label="Owned Shapes" value={String(research.shapeOwnership.count)}><Box gap="small"><Text size="xsmall">{research.shapeOwnership.ownedShapes.map(shape => shape.name).join(", ") || "None"}</Text><Contributions entries={research.shapeOwnership.contributors} /></Box></SourceValue>
                    {nextNote && <TextAndLabel label="Next Posty Note" text={`Research level ${nextNote.data.requiredResearchLevel}`} textSize="small" labelSize="xsmall" />}
                </Box>
                <Grid columns={{ count: size === "small" ? 1 : 3, size: "auto" }} gap="medium">
                    {research.postyNotes.map(note => <ShadowBox key={note.index} background="dark-1" pad="medium" gap="small" data-posty-note-index={note.index} data-posty-reached={String(note.reached)} style={{ opacity: note.reached ? 1 : 0.6 }}>
                        <Box direction="row" gap="small" align="center"><IconImage data={note.getImageData()} scale={0.4} /><Box gap="xxsmall"><Text size="small">Posty Note #{note.index + 1}</Text><Text size="xsmall" color="accent-2">Research level {note.data.requiredResearchLevel}{note === nextNote ? " · Next" : note.reached ? " · Reached" : ""}</Text></Box></Box>
                        <NoteReward note={note} />
                    </ShadowBox>)}
                </Grid>
            </Box>}
            {tab === "Papers" && <Grid as="section" id="research-papers" columns={{ count: size === "small" ? 1 : 2, size: "auto" }} gap="medium" aria-label="Papers">
                <ShadowBox background="dark-1" pad="medium" gap="small">
                    <Box direction="row" gap="small" align="center"><IconImage data={papers.consumable.item.getImageData()} /><Text size="small">Half Finished Research Papers</Text></Box>
                    <TextAndLabel label="Inventory" text={commaNotation(papers.consumable.count)} textSize="small" labelSize="xsmall" />
                    <Text size="small">Each Paper grants {papers.consumable.grantHours} hours of progress, including Minehead Currency.</Text>
                </ShadowBox>
                <ShadowBox background="dark-1" pad="medium" gap="small">
                    <Text size="small">Professional Papers</Text>
                    <TextAndLabel label="Permanent purchases" text={commaNotation(papers.permanent.purchasedCount)} textSize="small" labelSize="xsmall" />
                    <TextAndLabel label="Offline gains bonus" text={`+${amount(papers.permanent.offlinePercent)} percentage points`} textSize="small" labelSize="xsmall" />
                </ShadowBox>
            </Grid>}
            {tab === "Grid" && <ResearchGridDisplay research={research} />}
            {tab === "Shapes" && <ResearchShapes research={research} />}
        </Box>
    </Box>;
}
