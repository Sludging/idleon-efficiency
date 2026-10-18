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
import { getCoinsArray, notateNumber } from "../../../data/utility";

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
    return hole.currencies.find(entry => entry.data.name === name)?.getImageData() ?? undefined;
}

function GameCard({ title, image, children, testId, inactive = false }: { title: string; image?: ImageData; children: ReactNode; testId?: string; inactive?: boolean }) {
    return <RoundedShadowBox background="dark-1" pad="none" gap="none" overflow="hidden" data-testid={testId} style={inactive ? { opacity: 0.6 } : undefined}>
        <Box direction="row" gap="small" align="center" background="grey-1" pad={{ horizontal: "medium", vertical: "small" }}>
            {image && <IconImage data={image} scale={0.8} />}
            <Text size="small" weight={500}>{title}</Text>
        </Box>
        <Box pad="medium" gap="small">{children}</Box>
    </RoundedShadowBox>;
}

function WellView({ hole }: { hole: Hole }) {
    const well = hole.well;
    const theme = useContext(ThemeContext);
    const bucketSources = hole.schematics.filter(schematic => schematic.index >= 3 && schematic.index <= 11);
    const goldSchematic = hole.schematics.find(schematic => schematic.index === 104);
    return <Box gap="medium" data-testid="hole-well-details">
        <Box direction="row" gap="small" wrap>
            <TipDisplay heading="How to obtain more buckets" body={<Box gap="xsmall">
                <Text size="xsmall">Bucket count increases when you unlock these Hole schematics:</Text>
                {bucketSources.map(source => <Text key={source.index} size="xsmall" style={{ opacity: source.unlocked ? 1 : 0.6 }}>{source.data.name.replace(/_/g, " ")}</Text>)}
            </Box>} size="small">
                <Box direction="row" gap="xsmall" align="center">
                    <IconImage data={well.bucketImageData} scale={0.25} />
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
                    <IconImage data={well.goldBucketImageData} scale={0.25} />
                    <Text tabIndex={0} size="small" style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                        Gold buckets: {value(well.goldBucketCount)}
                    </Text>
                </Box>
            </TipDisplay>
            <TextAndLabel label="Gold multiplier" labelSize="xsmall" textSize="small" text={exact(well.goldBucketMultiplier, "×")} />
        </Box>
        <Section title="Sediments">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "12px", minWidth: 0 }}>
                {well.sediments.map(sediment => {
                    const timing = well.getExpansionTiming(sediment);
                    const assignmentsKnown = well.buckets.every(bucket => bucket.unlocked !== null &&
                        (bucket.unlocked === false || bucket.sedimentIndex !== null));
                    const assignedBuckets = assignmentsKnown
                        ? well.buckets.filter(bucket => bucket.unlocked === true && bucket.sedimentIndex === sediment.index).length
                        : null;
                    const stocked = sediment.unavailable !== true && sediment.current !== null && sediment.currentMax !== null;
                    const progress = stocked && sediment.currentMax > 0
                        ? Math.min(100, Math.max(0, sediment.current! / sediment.currentMax * 100)) : null;
                    return <GameCard key={sediment.index} title={sediment.data.name.replace(/_/g, " ")} image={hole.currencies.find(currency => currency.index === sediment.index)?.getImageData() ?? undefined} testId={`well-sediment-${sediment.index}`}>
                        <Box gap="xsmall">
                            <Box direction="row" justify="between" gap="small" wrap>
                                <Text size="small">{sediment.unavailable === true ? "|" : `${value(sediment.current)} / ${value(sediment.currentMax)}`}</Text>
                                <Text size="xsmall" color="accent-2">stock / capacity</Text>
                            </Box>
                            {progress !== null && <progress aria-label={`${sediment.data.name} stock toward capacity`} value={progress} max={100} style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }} />}
                        </Box>
                        <MetricStrip metrics={[
                            { label: "Buckets", value: assignedBuckets === null ? "Unavailable" : String(assignedBuckets) },
                            { label: "Group rate", value: value(sediment.bucketRate, "/hr") },
                        ]} />
                        <Text size="xsmall" color="accent-2">
                            {timing.status === "disabled" ? "Auto-expansion off."
                                : timing.status === "capped" ? "Auto-expansion capped at level 14; B_UPG 13 is not owned."
                                    : timing.status === "no-production" ? "No assigned production; no threshold time at the current rate."
                                        : timing.status === "stock-unavailable" ? "Stock is unavailable; expansion timing cannot be estimated."
                                            : timing.status === "unknown" ? "Expansion timing unavailable: saved stock, rate, or gate data is missing."
                                                : timing.hours === 0 ? "Capacity threshold reached; expansion waits for the next qualifying game update."
                                                    : `Approx. ${notateNumber(timing.hours)} hours to next capacity threshold at the current rate (snapshot estimate).`}
                        </Text>
                    </GameCard>;
                })}
            </Box>
            <Text size="xsmall" color="accent-2">Times use saved stock and current production rate; future rate changes and game-update cadence are not predicted.</Text>
        </Section>
    </Box>;
}

function BellView({ hole, totalMoney }: { hole: Hole; totalMoney: number }) {
    const bell = hole.bell;
    const mode = bell.mode === null ? "Unavailable" : bell.modeNames[bell.mode] ?? "Unavailable";
    const selectedXp = bell.mode === null ? null : bell.xpBanks[bell.mode] ?? null;
    const modeRecords = bell.modeNames.map((name, index) => ({ name, bank: bell.xpBanks[index], rate: bell.modeRates[index], requirement: bell.modeRequirements[index] }));
    return <Box gap="medium" data-testid="hole-bell-details">
        <Section title="Saved mode">
            <MetricStrip metrics={[
                { label: "Mode", value: mode },
                { label: "Rate", value: value(bell.selectedRate, " XP/hr") },
                { label: "Current / required XP", value: `${value(selectedXp)} / ${value(bell.selectedRequirement)}` },
                { label: "Clean odds", value: bell.cleanOdds === null ? "Unavailable" : `${(bell.cleanOdds * 100).toLocaleString("en-US", { maximumFractionDigits: 3 })}%` },
                { label: "Clean failures", value: value(bell.cleanFailures) },
            ]} />
        </Section>
        <Section title="Bell banks">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "12px", minWidth: 0 }}>
                {modeRecords.map((record, index) => <GameCard key={record.name} title={record.name} testId={`bell-bank-${index}`}>
                    <MetricStrip metrics={[
                        { label: "Current / required XP", value: `${value(record.bank)} / ${value(record.requirement)}` },
                        { label: "Rate", value: value(record.rate, " XP/hr") },
                    ]} />
                </GameCard>)}
            </Box>
        </Section>
        <Section title="Improvements">
            <Box gap="small">
                {bell.improvements.map(improvement => {
                    const wallet = improvement.wallet;
                    const currency = improvement.data.resource;
                    const cost = improvement.cost;
                    const balance = improvement.index === 0 ? totalMoney : wallet?.type === "account" ? wallet.balance : null;
                    const affordabilityColor = cost === null || balance === null ? undefined : balance >= cost ? "green-1" : "critical";
                    const image = resourceImage(hole, currency);
                    return <GameCard key={improvement.index} title={improvement.data.bonus.replace(/[{}]/g, "").replace(/\s+/g, " ").trim()} image={image} testId={`bell-improvement-${improvement.index}`}>
                        <Text size="xsmall" color="accent-2">{currency}</Text>
                        <MetricStrip metrics={[
                            { label: "Level", value: value(improvement.level) },
                            { label: "Current quantity", value: value(improvement.quantity) },
                        ]} />
                        <Box direction="row" gap="small" align="center" wrap>
                            {currency === "Coins" ? <><CoinsDisplay coinMap={getCoinsArray(balance!)} maxCoins={4} regularRow /><Text size="xsmall" color={affordabilityColor}> / </Text>{cost === null ? <Text size="xsmall">Unavailable required</Text> : <><CoinsDisplay coinMap={getCoinsArray(cost)} maxCoins={4} regularRow textColor={affordabilityColor} /><Text size="xsmall" color={affordabilityColor}> required</Text></>}</>
                                : currency === "Bits" ? <>{balance === null ? "Unavailable" : <BitsDisplay value={balance} />}<Text size="xsmall" color={affordabilityColor}> / </Text>{cost === null ? <Text size="xsmall">Unavailable required</Text> : <><BitsDisplay value={cost} textColor={affordabilityColor} /><Text size="xsmall" color={affordabilityColor}> required</Text></>}</>
                                    : <>{image && <IconImage data={image} scale={0.65} />}<Text size="xsmall" color={affordabilityColor}>{balance === null ? "Unavailable" : notateNumber(balance)} / {cost === null ? "Unavailable" : notateNumber(cost)} required</Text></>}
                        </Box>
                    </GameCard>;
                })}
            </Box>
        </Section>
        <Section title="Bonuses">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "12px", minWidth: 0 }}>
                {bell.bonuses.slice(0, 7).map(bonus => <GameCard key={bonus.index} title={`Bonus ${bonus.index + 1}`} testId={`bell-bonus-${bonus.index}`}>
                    <Text size="small">{bonus.getDescription()}</Text>
                    <Text size="xsmall" color="accent-2">Level {value(bonus.level)}</Text>
                </GameCard>)}
            </Box>
            <RoundedShadowBox background="dark-1" pad="medium" gap="small" data-testid="bell-renew-context">
                <Text size="small" weight={500}>Renew clears</Text>
                <Text size="xsmall">Renew charge: {value(bell.renewEffects.renewXpConsumed)} XP · Ringing charge: {value(bell.renewEffects.resetBellXp)} XP</Text>
                <Text size="xsmall">Bonus levels: {bell.renewEffects.clearedBonusLevels.every(level => level === null) ? "Unavailable" : `${bell.renewEffects.clearedBonusLevels.filter(level => level !== 0).length} of 12 currently nonzero; reset to 0`}</Text>
                <Text size="xsmall">Improvements retained: {bell.renewEffects.retainedImprovementLevels.every(level => level === null) ? "Unavailable" : `${bell.renewEffects.retainedImprovementLevels.filter(level => level !== null).length} methods`}</Text>
                <Text size="xsmall">Opals retained: {value(bell.renewEffects.retainedOpals)}</Text>
            </RoundedShadowBox>
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
    return <Box gap="medium" data-testid="hole-lamp-details">
        <Section title="Wish stock">
            <Box direction="row" gap="small" align="center" wrap>
                <IconImage data={lamp.wishStockImageData} scale={0.8} />
                <MetricStrip metrics={[
                    { label: "Wishes", value: value(lamp.wishStock) },
                    { label: "Expected daily gain", value: lamp.wishesPerDay === null ? "Unavailable" : `${lamp.wishesPerDay.toLocaleString("en-US", { maximumFractionDigits: 2 })} wishes/day` },
                ]} />
            </Box>
        </Section>
        <Section title="Wishes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "12px", minWidth: 0 }}>
                {lamp.wishes.map(wish => {
                    const benefit = effectiveWishBonus(wish.index);
                    const cost = lamp.getWishCost(wish.index);
                    const metrics = [
                        { label: "Level", value: value(wish.wishCount) },
                        ...(benefit === null ? [] : [{ label: "Well / Harp gain", value: benefit }]),
                        { label: "Next cost", value: cost === null ? "Unavailable" : `${notateNumber(cost)} wishes` },
                    ];
                    return <GameCard key={wish.index} title={wish.data.name} testId={`lamp-wish-${wish.index}`}>
                        <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{wishDescription(wish)}</Text>
                        <MetricStrip metrics={metrics} />
                    </GameCard>;
                })}
            </Box>
        </Section>
        <Section title="Schematic price">
            <GameCard title="A Moderate Discount" testId="lamp-schematic-discount">
                <TextAndLabel label="Current schematic cost factor" text={exact(lamp.schematicCostDiscount, "×")} />
            </GameCard>
        </Section>
        <Section title="Another Try">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "12px", minWidth: 0 }}>
                {lamp.resetConsequences.map(reset => <GameCard key={reset.category} title={reset.category} testId={`lamp-reset-${reset.category}`}>
                    <Text size="xsmall">{resetSummary(reset)}</Text>
                </GameCard>)}
            </Box>
            <Text size="xsmall" color="accent-2">One Opal is granted by the “1000000 Opals” wish. Bring Them Back adds 12 hours to a selected Monument.</Text>
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
