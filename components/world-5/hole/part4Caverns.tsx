import { Box, Grid, Text, ThemeContext } from "grommet";
import type { ReactNode } from "react";
import { useContext } from "react";
import { normalizeColor } from "grommet/utils";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import CoinsDisplay from "../../coinsDisplay";
import BitsDisplay from "../../bitsDisplay";
import { Item } from "../../../data/domain/items";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import type { ImageData } from "../../../data/domain/imageData";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { getCoinsArray, notateNumber, toTime } from "../../../data/utility";

function value(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${notateNumber(amount)}${suffix}`;
}

function exact(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${amount.toLocaleString("en-US", { maximumFractionDigits: 20 })}${suffix}`;
}

function MetricStrip({ metrics }: { metrics: { label: string; value: string }[] }) {
    return <Box>
        <Grid columns={{ size: "auto", count: metrics.length }} gap="none" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
            {metrics.map((metric, index) => <Box key={metric.label} gap="xxsmall" pad={{ vertical: "xsmall", right: "small", left: index ? "small" : undefined }} border={index < metrics.length - 1 ? { side: "right", color: "grey-1" } : undefined} style={{ minWidth: 0 }}>
                <Text size="small" style={{ overflowWrap: "anywhere" }}>{metric.value}</Text>
                <Text size="xsmall" color="accent-2">{metric.label}</Text>
            </Box>)}
        </Grid>
    </Box>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return <Box gap="small"><Text size="medium" weight={500}>{title}</Text>{children}</Box>;
}

function resourceImage(hole: Hole, name: string): ImageData | undefined {
    if (name === "Atoms") return AtomCollider.getParticleImageData();
    if (name === "Bits") return Item.getImageData("Bits");
    if (name === "Coins") return Item.getImageData("Coins1");
    if (name === "Turquoise Rupie") return hole.currencies.find(entry => entry.index === 25)!.getImageData() ?? undefined;
    return hole.currencies.find(entry => entry.data.name === name)?.getImageData() ?? undefined;
}

function GameCard({ title, image, children, testId, inactive = false, headerRight }: { title: string; image?: ImageData; children: ReactNode; testId?: string; inactive?: boolean; headerRight?: ReactNode }) {
    return <RoundedShadowBox background="dark-1" pad="none" gap="none" overflow="hidden" data-testid={testId} style={inactive ? { opacity: 0.6 } : undefined}>
        <Box direction="row" gap="small" align="center" justify="between" background="grey-1" pad={{ horizontal: "medium", vertical: "small" }} style={{ minWidth: 0 }}>
            <Box direction="row" gap="small" align="center" style={{ minWidth: 0, flex: "1 1 auto" }}>
                {image && <IconImage data={image} scale={0.8} />}
                <Text size="small" weight={500} style={{ overflowWrap: "anywhere" }}>{title}</Text>
            </Box>
            {headerRight}
        </Box>
        <Box pad="medium" gap="small">{children}</Box>
    </RoundedShadowBox>;
}

function WellView({ hole }: { hole: Hole }) {
    const well = hole.well;
    const theme = useContext(ThemeContext);
    const bucketSources = hole.schematics.filter(schematic => schematic.index >= 3 && schematic.index <= 11);
    const goldSchematic = hole.schematics.find(schematic => schematic.index === 104);
    const study = hole.studies[0];
    const wellOpals = hole.cavernOpalSources.find(source => source.acquisition === "Purchased an Opal with Well sediment.")!.opals;
    const gravel = well.sediments[0];
    const totalExpansions = well.sediments.every(sediment => sediment.expansions !== null)
        ? well.sediments.reduce((total, sediment) => total + sediment.expansions!, 0)
        : null;
    const gravelImage = hole.currencies.find(currency => currency.index === 0)!.getImageData();
    const studyStatus = study.participation === "inactive" ? "Inactive"
        : study.participation === "target" || study.participation === "neighbor"
            ? `Study rate: ${value(study.progressPerHour, "/hr")}`
            : "Unavailable";
    const studyRequirement = study.getRequirement();
    const studyProgress = study.progressAvailable ? study.progress : null;
    const fillHelp = "Time to fill if all your buckets worked on this sediment at their current rates. Each row is independent.";

    return <Box gap="medium" data-testid="hole-well-details">
        <Section title="Expansion">
            <Box style={{ display: "grid", gridTemplateColumns: "minmax(140px, 0.9fr) repeat(2, minmax(0, 1fr))", gap: "16px", alignItems: "center" }}>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Total bar expansions</Text>
                    <Text size="large" weight={500}>{value(totalExpansions)}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Gravel cost per Opal</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        {gravelImage && <IconImage data={gravelImage} scale={0.65} />}
                        <Text size="small" color={well.opalAffordable === null ? undefined : well.opalAffordable ? "status-ok" : "critical"}>
                            {value(gravel.current)} / {value(well.opalCost)}
                        </Text>
                    </Box>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Opals found</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={Item.getImageData("Opal")} scale={0.65} />
                        <Text size="small">{value(wellOpals)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Sediment">
            <Box direction="row" gap="medium" wrap align="center">
                <TipDisplay heading="How to obtain more buckets" body={<Box gap="xsmall">
                    <Text size="xsmall">Bucket count increases when you unlock these Hole schematics:</Text>
                    {bucketSources.map(source => <Text key={source.index} size="xsmall" style={{ opacity: source.unlocked ? 1 : 0.6 }}>{source.data.name.replace(/_/g, " ")}</Text>)}
                </Box>} size="small">
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={well.bucketImageData} scale={0.2} />
                        <Text tabIndex={0} size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                            Buckets: {value(well.ownedBucketCount)}
                        </Text>
                    </Box>
                </TipDisplay>
                <TipDisplay heading="How to obtain gold buckets" body={<Box gap="xsmall">
                    <Text size="xsmall">Golden Bucket Boost from the Fountain increases the first gold bucket's fill rate.</Text>
                    {goldSchematic && <Text size="xsmall">{goldSchematic.data.name.replace(/_/g, " ")} unlocks another gold bucket.</Text>}
                </Box>} size="small">
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={well.goldBucketImageData} scale={0.2} />
                        <Text tabIndex={0} size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                            Gold buckets: {value(well.goldBucketCount)}
                        </Text>
                    </Box>
                </TipDisplay>
                <TextAndLabel label="Gold multiplier" labelSize="xsmall" textSize="small" text={well.goldBucketMultiplier === null ? "Unavailable" : `${notateNumber(well.goldBucketMultiplier, "MultiplierInfo").replace("#", "")}×`} />
            </Box>

            <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "700px", borderCollapse: "collapse", tableLayout: "fixed" }}>
                    <thead>
                        <tr>
                            {["Fill", "Buckets filling it", "Expansions"].map(title => <th key={title} scope="col" style={{ width: title === "Fill" ? "36%" : "21%", textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                                <Text size="xsmall" color="accent-2">{title}</Text>
                            </th>)}
                            <th scope="col" style={{ width: "22%", textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
                                <TipDisplay heading="Full in" body={<Text size="xsmall">{fillHelp}</Text>} size="small">
                                    <Text tabIndex={0} size="xsmall" color="accent-2" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>Full in</Text>
                                </TipDisplay>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {well.sediments.map(sediment => {
                            const assignmentsKnown = well.buckets.every(bucket => bucket.unlocked !== null &&
                                (bucket.unlocked === false || bucket.sedimentIndex !== null));
                            const assignedBuckets = assignmentsKnown
                                ? well.buckets.filter(bucket => bucket.unlocked === true && bucket.sedimentIndex === sediment.index).length
                                : null;
                            const stocked = sediment.unavailable !== true && sediment.current !== null && sediment.currentMax !== null;
                            const progress = stocked && sediment.currentMax > 0
                                ? Math.min(100, Math.max(0, sediment.current! / sediment.currentMax * 100)) : null;
                            const sedimentImage = hole.currencies.find(currency => currency.index === sediment.index)!.getImageData();
                            const fullIn = well.getFullInTime(sediment);
                            const fullInText = fullIn.status === "estimate"
                                ? fullIn.hours === 0 ? "Full" : toTime(fullIn.hours * 3600)
                                : fullIn.status === "no-production" ? "No production" : "Unavailable";
                            const expansionLevel = sediment.expansions;
                            const expansionText = expansionLevel === null ? "Unavailable"
                                : well.expansionUpgradeOwned === true ? `No cap · ${value(expansionLevel)} expansions`
                                    : well.expansionUpgradeOwned === false ? `${value(expansionLevel)} / 14${expansionLevel >= 14 ? " (capped)" : " used"}`
                                        : expansionLevel >= 14 ? "Unavailable" : `${value(expansionLevel)} expansions`;
                            const inactive = assignedBuckets === 0;
                            return <tr key={sediment.index} data-testid={`well-sediment-${sediment.index}`} style={{
                                opacity: inactive ? 0.75 : 1,
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                            }}>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Box gap="xxsmall">
                                        <Box direction="row" gap="xsmall" align="center">
                                            {sedimentImage && <IconImage data={sedimentImage} scale={0.65} />}
                                            <Text size="small">{sediment.data.name}</Text>
                                        </Box>
                                        <Text size="xsmall">{sediment.unavailable === true ? "|" : `${value(sediment.current)} / ${value(sediment.currentMax)}`}</Text>
                                        {progress !== null && <progress aria-label={`${sediment.data.name} stock toward capacity`} value={progress} max={100} style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }} />}
                                    </Box>
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    {assignedBuckets === null
                                        ? <Text size="xsmall">Unavailable</Text>
                                        : assignedBuckets === 0
                                            ? <Text size="xsmall" color="accent-2">No buckets assigned</Text>
                                            : <Box gap="xxsmall">
                                                <Box direction="row" gap="xsmall" align="center">
                                                    <IconImage data={well.bucketImageData} scale={0.12} />
                                                    <Text size="xsmall">{assignedBuckets} {assignedBuckets === 1 ? "bucket" : "buckets"}</Text>
                                                </Box>
                                                <Text size="xsmall">{value(sediment.bucketRate, "/hr")}</Text>
                                            </Box>}
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Box gap="xxsmall">
                                        {expansionLevel !== null && well.expansionUpgradeOwned === false && <Box direction="row" gap="2px" aria-label={expansionText}>
                                            {Array.from({ length: 14 }, (_, index) => <Box key={index} background={index < Math.min(expansionLevel, 14) ? "brand" : "grey-1"} height="6px" width="5px" />)}
                                        </Box>}
                                        <Text size="xsmall">{expansionText}</Text>
                                    </Box>
                                </td>
                                <td style={{ padding: "8px", verticalAlign: "middle" }}>
                                    <Text size="xsmall">{fullInText}</Text>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>
            </Box>
        </Section>

        <Section title="Study">
            <Box gap="small" data-testid="well-study">
                <Box direction="row" justify="between" align="center" gap="small" wrap>
                    <Box direction="row" align="center" gap="small" wrap>
                        <Text size="small" weight={500}>Level {study.levelAvailable ? value(study.level) : "Unavailable"}</Text>
                        <Text size="xsmall">{study.levelAvailable ? study.getDescription().replace(/_/g, " ") : "Effect unavailable"}</Text>
                    </Box>
                    <Text size="xsmall" color="accent-2">{studyStatus}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Progress to next level</Text>
                    <Text size="small">{value(studyProgress)} / {value(studyRequirement)}</Text>
                    {studyProgress !== null && studyRequirement !== null && studyRequirement > 0 && <progress aria-label="Well Study progress" value={Math.min(100, Math.max(0, studyProgress / studyRequirement * 100))} max={100} style={{ width: "100%", height: "6px" }} />}
                </Box>
            </Box>
        </Section>
    </Box>;
}

function BellView({ hole, totalMoney }: { hole: Hole; totalMoney: number }) {
    const bell = hole.bell;
    const theme = useContext(ThemeContext);
    const methods = bell.modeNames.map((_, index) => ({
        name: ["Ring Bell", "Ping Bell", "Clean Bell", "Renew Bell"][index],
        bank: bell.xpBanks[index],
        rate: bell.modeRates[index],
        requirement: bell.modeRequirements[index],
        timing: bell.getMethodTiming(index),
    }));
    const bellOpals = hole.cavernOpalSources.find(source => source.acquisition === "Received an Opal from a Bell Ping.")!.opals;
    const study = hole.studies.find(entry => entry.data.name === "THE BELL")!;
    const methodsComplete = bell.methodsOwned === 6;
    const studyStatus = study.participation === "inactive" ? "Inactive"
        : study.participation === "target" || study.participation === "neighbor"
            ? `Study rate: ${value(study.progressPerHour, "/hr")}`
            : "Unavailable";
    const studyRequirement = study.getRequirement();
    const studyProgress = study.progressAvailable ? study.progress : null;
    const upgradeSeparator = normalizeColor("grey-1", theme);

    return <Box gap="medium" data-testid="hole-bell-details">
        <Section title="Overview">
            <Box direction="row" gap="small" wrap align="center">
                {!methodsComplete && <>
                    <Box flex={{ grow: 1, shrink: 0 }} pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Rings since Renew</Text>
                        <Text size="large">{value(bell.ringsSinceRenew)}</Text>
                    </Box>
                    <Box flex={{ grow: 1, shrink: 1 }} pad={{ horizontal: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">New method chance</Text>
                        <Text size="small">{bell.cleanOdds === null ? "Unavailable" : `${(bell.cleanOdds * 100).toLocaleString("en-US", { maximumFractionDigits: 3 })}%`}</Text>
                    </Box>
                </>}
                <Box flex={{ grow: 1, shrink: 1 }} pad={{ left: "small" }}>
                    <Text size="xsmall" color="accent-2">Opals earned</Text>
                    <Box direction="row" gap="xsmall" align="center">
                        <IconImage data={Item.getImageData("Opal")} scale={0.75} />
                        <Text size="small">{value(bellOpals)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Bonuses">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "24px", minWidth: 0 }}>
                {bell.bonuses.slice(0, 7).map(bonus => <Box key={bonus.index} direction="row" justify="between" align="start" gap="small" pad={{ vertical: "small" }} border={{ side: "bottom", color: "grey-1" }} data-testid={`bell-bonus-${bonus.index}`}>
                    <Text size="small" weight={500}>{bonus.level === null ? bonus.data.description.replace("{", "Unavailable").replace("}", "") : bonus.getDescription()}</Text>
                    <Text size="xsmall" color="accent-2">Lv. {value(bonus.level)}</Text>
                </Box>)}
            </Box>
        </Section>

        <Section title="Methods">
            {bell.mode === null || !bell.modeNames[bell.mode]
                ? <Text size="xsmall" color="accent-2">Current mode: Unavailable</Text>
                : null}
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", minWidth: 0 }}>
                {methods.map((method, index) => {
                    const ready = method.timing.status === "ready";
                    const topStatus = ready ? "Ready"
                        : method.timing.status === "estimate" ? `Full in ${toTime(method.timing.hours! * 3600)}`
                            : method.timing.status === "no-rate" ? "No production"
                                : "Unavailable";
                    return <Box key={method.name} pad="small" border={{
                        side: index < 2 ? "bottom" : "top",
                        color: "grey-1",
                    }} data-testid={`bell-method-${index}`}>
                        <Box direction="row" justify="between" gap="small" align="center">
                            <Text size="small" weight={500}>{method.name === "Renew Bell" ? <TipDisplay heading="Renew Bell" body={<Text size="xsmall">Renew consumes Renew XP, resets Ring XP, clears Bell bonus levels, and retains improvements and Opals.</Text>} size="small">Renew Bell</TipDisplay> : method.name}</Text>
                            {bell.mode === index && <Text size="xsmall" color="accent-2">Current mode</Text>}
                            <Text size="xsmall" color={ready ? "status-ok" : "accent-2"}>{topStatus}</Text>
                        </Box>
                        <Box direction="row" justify="between" gap="small" pad={{ top: "xsmall" }}>
                            <Text size="xsmall" color="accent-2">XP</Text>
                            <Text size="xsmall">{value(method.bank)} / {value(method.requirement)}</Text>
                        </Box>
                        {method.bank !== null && method.requirement !== null && method.requirement > 0 && <progress aria-label={`${method.name} XP progress`} value={Math.min(100, Math.max(0, method.bank / method.requirement * 100))} max={100} style={{ width: "100%", height: "6px" }} />}
                        <Text size="xsmall" color="accent-2">XP rate {value(method.rate, "/hr")}</Text>
                    </Box>;
                })}
            </Box>
        </Section>

        <Section title="Upgrades">
            <RoundedShadowBox background="dark-1" pad="none" overflow="hidden" data-testid="bell-upgrades">
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", minWidth: 0 }}>
                    {bell.improvements.map((improvement, index) => {
                        const wallet = improvement.wallet;
                        const currency = improvement.data.resource;
                        const cost = improvement.cost;
                        const balance = improvement.index === 0 ? totalMoney : wallet?.type === "account" ? wallet.balance : null;
                        const affordabilityColor = cost === null || balance === null ? undefined : balance >= cost ? "green-1" : "critical";
                        const image = resourceImage(hole, currency);
                        return <Box key={improvement.index} gap="xsmall" pad="small" style={{
                            borderRight: index % 3 !== 2 ? `1px solid ${upgradeSeparator}` : undefined,
                            borderBottom: index < 3 ? `1px solid ${upgradeSeparator}` : undefined,
                        }} data-testid={`bell-improvement-${improvement.index}`}>
                            <Text size="xsmall" color="accent-2">Lv. {value(improvement.level)}</Text>
                            <Text size="small" weight={500}>{improvement.quantity === null ? "Unavailable" : improvement.data.bonus.replace("{", notateNumber(improvement.quantity)).replace(/[{}]/g, "").replace(/\s+/g, " ").trim()}</Text>
                            <Box direction="row" gap="xsmall" align="center" wrap>
                                {currency === "Coins" ? <>
                                    {balance === null ? "Unavailable" : <CoinsDisplay coinMap={getCoinsArray(balance)} maxCoins={3} coinScale={0.75} regularRow textColor={affordabilityColor} />}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    {cost === null ? "Unavailable" : <CoinsDisplay coinMap={getCoinsArray(cost)} maxCoins={3} coinScale={0.75} regularRow textColor={affordabilityColor} />}
                                </> : currency === "Bits" ? <>
                                    {balance === null ? "Unavailable" : <BitsDisplay value={balance} scale={0.75} textSize="xsmall" textColor={affordabilityColor} />}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    {cost === null ? "Unavailable" : <BitsDisplay value={cost} scale={0.75} textSize="xsmall" textColor={affordabilityColor} />}
                                </> : <>
                                    {balance === null ? "Unavailable" : <>{image && <IconImage data={image} scale={0.75} />}<Text size="xsmall" color={affordabilityColor}>{notateNumber(balance)}</Text></>}
                                    <Text size="xsmall" color={affordabilityColor}> / </Text>
                                    {cost === null ? "Unavailable" : <>{image && <IconImage data={image} scale={0.75} />}<Text size="xsmall" color={affordabilityColor}>{notateNumber(cost)}</Text></>}
                                </>}
                            </Box>
                        </Box>;
                    })}
                </Box>
            </RoundedShadowBox>
        </Section>

        <Section title="Study">
            <Box gap="small" data-testid="bell-study">
                <Box direction="row" justify="between" align="center" gap="small" wrap>
                    <Box direction="row" align="center" gap="small" wrap>
                        <Text size="small" weight={500}>Level {study.levelAvailable ? value(study.level) : "Unavailable"}</Text>
                        <Text size="xsmall">{study.levelAvailable ? study.getDescription().replace(/_/g, " ") : "Effect unavailable"}</Text>
                    </Box>
                    <Text size="xsmall" color="accent-2">{studyStatus}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Progress to next level</Text>
                    <Text size="small">{value(studyProgress)} / {value(studyRequirement)}</Text>
                    {studyProgress !== null && studyRequirement !== null && studyRequirement > 0 && <progress aria-label="Bell Study progress" value={Math.min(100, Math.max(0, studyProgress / studyRequirement * 100))} max={100} style={{ width: "100%", height: "6px" }} />}
                </Box>
            </Box>
        </Section>
    </Box>;
}

function HarpView({ hole }: { hole: Hole }) {
    const harp = hole.harp;
    const theme = useContext(ThemeContext);
    const stringsByIndex = new Map(harp.strings.map(string => [string.index, string]));
    const assignments = !harp.layoutAvailable || harp.slotCount === null ? "Unavailable"
        : harp.layout.slice(0, harp.slotCount).flatMap((stringIndex, slot) => {
            const string = stringIndex === null ? undefined : stringsByIndex.get(stringIndex);
            return string ? [`${slot + 1}. String ${string.data.stringLetter}`] : [];
        }).join(" → ") || "No assigned strings";
    const noteCurrency = harp.noteCost === null ? undefined : harp.highestUnlockedNoteIndex === null ? undefined : hole.currencies.find(currency => currency.index === 10 + harp.highestUnlockedNoteIndex + 1);
    const nextNoteCost = harp.highestUnlockedNoteIndex === null ? "Unavailable" : harp.highestUnlockedNoteIndex >= 9
        ? "No next note" : harp.noteCost === null ? "Unavailable"
            : `${exact(harp.noteCost)} ${noteCurrency?.data.name.replace(/_/g, " ") ?? "Unavailable"}`;
    return <Box gap="medium" data-testid="hole-harp-details">
        <Section title="Saved settings">
            <MetricStrip metrics={[
                { label: "Saved power", value: value(harp.power) },
                { label: "Power per hour", value: value(harp.powerPerHour, "/hr") },
                { label: "Tune", value: harp.tune === null ? "Unavailable" : harp.notes.find(note => note.index === harp.tune)?.name ?? "Unavailable" },
                { label: "Active slots", value: value(harp.slotCount) },
            ]} />
        </Section>
        <Section title="Notes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "12px", minWidth: 0 }}>
                {harp.notes.map(note => <GameCard key={note.index} title={note.name} testId={`harp-note-${note.index}`} inactive={note.accessible === false}
                    image={resourceImage(hole, hole.currencies.find(currency => currency.index === 10 + note.index)?.data.name ?? note.name)}>
                    <MetricStrip metrics={[{ label: "Balance", value: value(note.current) }]} />
                    {note.accessible === null && <Text size="xsmall">Access unavailable</Text>}
                </GameCard>)}
            </Box>
            <Box direction="row" gap="xsmall" align="center" data-testid="harp-next-note-cost">
                {noteCurrency?.getImageData() && <IconImage data={noteCurrency.getImageData()!} scale={0.7} />}
                <Text size="xsmall" color="accent-2">Next note cost: {nextNoteCost}</Text>
            </Box>
        </Section>
        <Section title="Strings">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))", gap: "12px", minWidth: 0 }}>
                {harp.strings.map(string => {
                    const passiveDescription = string.getPassiveDescription();
                    return <GameCard key={string.index} title={`String ${string.data.stringLetter}`} image={string.imageData} testId={`harp-string-${string.index}`} inactive={string.unlocked === false}>
                        {string.unlocked === null
                            ? <Text size="xsmall">Ownership unavailable</Text>
                            : string.unlocked && <Text size="xsmall">{string.assignedSlots.length ? "Assigned" : "Unassigned"}</Text>}
                        {passiveDescription !== null && <Text size="xsmall">{passiveDescription}</Text>}
                        <MetricStrip metrics={[
                            { label: "Level", value: value(string.level) },
                            { label: "Current / required EXP", value: `${value(string.experience)} / ${value(string.nextLevelExperience)}` },
                        ]} />
                        {string.level !== null && string.experience !== null && string.nextLevelExperience !== null && <progress aria-label={`String ${string.data.stringLetter} EXP progress`} value={string.experience} max={string.nextLevelExperience} style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }} />}
                    </GameCard>;
                })}
            </Box>
        </Section>
        <RoundedShadowBox background="dark-1" pad="medium" gap="xsmall" data-testid="harp-assignment-order">
            <Text size="xsmall" color="accent-2">Saved assignment order</Text>
            <Text size="small">{assignments}</Text>
            {harp.layoutAvailable && <Text size="xsmall" color="accent-2">String effects trigger in this order when Harp power reaches its threshold; exact rewards depend on transient runtime state.</Text>}
        </RoundedShadowBox>
    </Box>;
}

function LampView({ hole }: { hole: Hole }) {
    const lamp = hole.lamp;
    const effectiveWishBonus = (wishIndex: number): string | null =>
        wishIndex === 7 && lamp.getBonus(true) !== null ? exact(lamp.getBonus(true), "%") : null;
    const wishDescription = (wish: typeof lamp.wishes[number]): string => {
        let description = wish.data.desc;
        if ([4, 6, 8, 10].includes(wish.index)) {
            const specialIndex = (wish.index - 4) / 2;
            const effects = [0, 1, 2].map(inlineIndex => lamp.getBonus(false, specialIndex, inlineIndex));
            if (effects.some(effect => effect === null)) return description.replaceAll(" @ ", "\n");
            return description.replaceAll(" @ ", "\n")
                .replace("+~%", `+${exact(effects[2])}%`)
                .replace("+{%", `+${exact(effects[0])}%`)
                .replace("+%", `+${exact(effects[1])}%`);
        }
        return description.replaceAll(" @ ", "\n");
    };
    const resetSummary = (reset: typeof lamp.resetConsequences[number]): string => {
        if (reset.before === null || reset.after === null) return "Imported target values unavailable";
        const changed = reset.before.filter((before, index) => before !== reset.after![index]).length;
        if (reset.category === "All Opals Invested") return `${changed} of ${reset.before.length} Opal slots would clear to 0`;
        if (reset.category === "Conjuror PTS Invested") return `${changed} of ${reset.before.length} point entries would clear to 0`;
        if (reset.category === "Jar Collectible Enchantment LVs") return `${changed} of ${reset.before.length} enchantment levels exceed 1; reset caps them at 1`;
        return `${changed} of ${reset.before.length} doublers would be set to -1`;
    };
    const study = hole.studies.find(entry => entry.data.name === "THE LAMP")!;
    const studyStatus = study.participation === "inactive" ? "Inactive"
        : study.participation === "target" || study.participation === "neighbor"
            ? `Study rate: ${value(study.progressPerHour, "/hr")}`
            : "Unavailable";
    const studyRequirement = study.getRequirement();
    const studyProgress = study.progressAvailable ? study.progress : null;
    return <Box gap="medium" data-testid="hole-lamp-details">
        <Section title="Wish stock">
            <Box direction="row" gap="small" align="center" wrap>
                <Box gap="xxsmall" pad={{ right: "medium" }} border={{ side: "right", color: "grey-1" }}>
                    <Text size="xsmall" color="accent-2">Wishes</Text>
                    <Text size="large" weight={500}>{value(lamp.wishStock)}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Expected daily gain</Text>
                    <Text size="small">{lamp.wishesPerDay === null ? "Unavailable" : `${lamp.wishesPerDay.toLocaleString("en-US", { maximumFractionDigits: 2 })} wishes/day`}</Text>
                </Box>
            </Box>
        </Section>
        <Section title="Wishes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "12px", minWidth: 0 }}>
                {lamp.wishes.map(wish => {
                    const benefit = effectiveWishBonus(wish.index);
                    const cost = lamp.getWishCost(wish.index);
                    const metrics = [
                        ...(benefit === null ? [] : [{ label: "Well / Harp gain", value: benefit }]),
                        { label: "Next cost", value: cost === null ? "Unavailable" : `${notateNumber(cost)} wishes` },
                    ];
                    return <GameCard key={wish.index} title={wish.data.name} testId={`lamp-wish-${wish.index}`} headerRight={<Text size="xsmall" color="accent-2" style={{ flexShrink: 0 }}>Lv. {value(wish.wishCount)}</Text>}>
                        <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{wishDescription(wish)}</Text>
                        <MetricStrip metrics={metrics} />
                        {wish.index === 5 && <details>
                            <summary style={{ cursor: "pointer" }}>Discount details</summary>
                            <Box gap="small" margin={{ top: "small" }}>
                                <Text size="xsmall">Current schematic cost factor: {exact(lamp.schematicCostDiscount, "×")}</Text>
                                <Text size="xsmall">This factor applies to current schematic costs.</Text>
                            </Box>
                        </details>}
                        {wish.index === 1 && <details>
                            <summary style={{ cursor: "pointer" }}>Reset details</summary>
                            <Box gap="small" margin={{ top: "small" }}>
                                {lamp.resetConsequences.map(reset => <Text key={reset.category} size="xsmall">{reset.category}: {resetSummary(reset)}</Text>)}
                                <Text size="xsmall">One Opal is granted by the “1000000 Opals” wish. Bring Them Back adds 12 hours to a selected Monument.</Text>
                            </Box>
                        </details>}
                    </GameCard>;
                })}
            </Box>
        </Section>
        <Section title="Study">
            <Box gap="small" data-testid="lamp-study">
                <Box direction="row" justify="between" align="center" gap="small" wrap>
                    <Box direction="row" align="center" gap="small" wrap>
                        <Text size="small" weight={500}>Level {study.levelAvailable ? value(study.level) : "Unavailable"}</Text>
                        <Text size="xsmall">{study.levelAvailable ? study.getDescription().replace(/_/g, " ") : "Effect unavailable"}</Text>
                    </Box>
                    <Text size="xsmall" color="accent-2">{studyStatus}</Text>
                </Box>
                <Box gap="xxsmall">
                    <Text size="xsmall" color="accent-2">Progress to next level</Text>
                    <Text size="small">{value(studyProgress)} / {value(studyRequirement)}</Text>
                    {studyProgress !== null && studyRequirement !== null && studyRequirement > 0 && <progress aria-label="Lamp Study progress" value={Math.min(100, Math.max(0, studyProgress / studyRequirement * 100))} max={100} style={{ width: "100%", height: "6px" }} />}
                </Box>
            </Box>
        </Section>
    </Box>;
}

export default function Part4CavernDetails({ hole, cavern, totalMoney }: { hole: Hole; cavern: number; totalMoney: number }) {
    switch (cavern) {
        case 0: return <WellView hole={hole} />;
        case 4: return <BellView hole={hole} totalMoney={totalMoney} />;
        case 5: return <HarpView hole={hole} />;
        case 6: return <LampView hole={hole} />;
        default: return null;
    }
}
