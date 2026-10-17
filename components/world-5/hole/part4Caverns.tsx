import { Box, Grid, Text, ThemeContext } from "grommet";
import type { ReactNode } from "react";
import { useContext } from "react";
import { normalizeColor } from "grommet/utils";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import CoinsDisplay from "../../coinsDisplay";
import BitsDisplay from "../../bitsDisplay";
import { Item } from "../../../data/domain/items";
import type { ImageData } from "../../../data/domain/imageData";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import type { Player } from "../../../data/domain/player";
import { getCoinsArray, notateNumber } from "../../../data/utility";

function value(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${notateNumber(amount)}${suffix}`;
}

function exact(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${amount.toLocaleString("en-US", { maximumFractionDigits: 20 })}${suffix}`;
}

function MetricStrip({ metrics }: { metrics: { label: string; value: string }[] }) {
    return <Box background="grey-1" pad="xsmall" round="small" style={{ minWidth: 0 }}>
        <Grid columns={{ size: "auto", count: metrics.length }} gap="none" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))" }}>
            {metrics.map((metric, index) => <Box key={metric.label} gap="xxsmall" pad="small" border={index < metrics.length - 1 ? { side: "right", color: "dark-1" } : undefined} style={{ minWidth: 0 }}>
                <Text size="small" style={{ overflowWrap: "anywhere" }}>{metric.value}</Text>
                <Text size="xsmall" color="accent-2">{metric.label}</Text>
            </Box>)}
        </Grid>
    </Box>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return <Box gap="small"><Text size="medium" weight={500}>{title}</Text>{children}</Box>;
}

function ArtTile({ data }: { data: ImageData }) {
    return <Box width="48px" height="48px" flex={false} align="center" justify="center" round="small" background="dark-2">
        <IconImage data={data} scale={0.8} />
    </Box>;
}

function WellView({ hole }: { hole: Hole }) {
    const well = hole.well;
    const nextBucket = well.buckets.find(bucket => bucket.unlocked === false);
    const nextBucketSchematic = nextBucket?.unlockSchematicIndex === null || nextBucket?.unlockSchematicIndex === undefined
        ? undefined : hole.schematics.find(schematic => schematic.index === nextBucket.unlockSchematicIndex);
    return <Box gap="medium" data-testid="hole-well-details">
        <MetricStrip metrics={[
            { label: "Expansion level", value: value(well.expansionLevel) },
            { label: "Expansion count", value: value(well.expansionCount) },
            { label: "Owned buckets", value: value(well.ownedBucketCount) },
            { label: "Gold buckets", value: value(well.goldBucketCount) },
            { label: "Gold multiplier", value: exact(well.goldBucketMultiplier, "×") },
            { label: "Next Opal cost", value: well.opalCost === null ? "Unavailable" : `${notateNumber(well.opalCost)} Opals` },
        ]} />
        <Section title="Buckets">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "12px", minWidth: 0 }}>
                {well.buckets.map(bucket => {
                    const sediment = bucket.sedimentIndex === null ? undefined : well.sediments[bucket.sedimentIndex];
                    const assignedName = sediment?.data.name.replace(/_/g, " ") ?? "Unavailable";
                    const status = bucket.unlocked === null ? "Unavailable" : bucket.unlocked ? "Available" : "Locked";
                    return <RoundedShadowBox key={bucket.index} background="dark-1" pad="medium" gap="small" data-testid={`well-bucket-${bucket.index}`}>
                        <Box gap="small">
                            <Text size="small" weight={500}>Bucket {bucket.index + 1}</Text>
                            <Text size="xsmall" color="accent-2">{assignedName} · {status}</Text>
                        </Box>
                        <MetricStrip metrics={[
                            { label: "Rate", value: value(bucket.rate, "/hr") },
                            { label: "Gold bucket", value: bucket.goldBucket === null ? "Unavailable" : bucket.goldBucket ? "Yes" : "No" },
                        ]} />
                    </RoundedShadowBox>;
                })}
            </Box>
            {nextBucket && <Text size="xsmall" color="accent-2" data-testid="well-next-bucket-gate">
                Next bucket gate: {nextBucketSchematic ? nextBucketSchematic.data.name.replace(/_/g, " ") : "Unavailable"}
            </Text>}
        </Section>
        <Section title="Sediment stock and capacity">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "12px", minWidth: 0 }}>
                {well.sediments.map(sediment => <RoundedShadowBox key={sediment.index} background="dark-1" pad="medium" gap="small" data-testid={`well-sediment-${sediment.index}`}>
                    <Text size="small" weight={500}>{sediment.data.name.replace(/_/g, " ")}</Text>
                    <MetricStrip metrics={[
                        { label: "Stock", value: sediment.unavailable === true ? "|" : value(sediment.current) },
                        { label: "Capacity", value: value(sediment.currentMax) },
                        { label: "Group rate", value: value(sediment.bucketRate, "/hr") },
                    ]} />
                </RoundedShadowBox>)}
            </Box>
        </Section>
    </Box>;
}

function BellView({ hole, players }: { hole: Hole; players: Player[] }) {
    const bell = hole.bell;
    const mode = bell.mode === null ? "Unavailable" : bell.modeNames[bell.mode] ?? "Unavailable";
    const moneyWallet = bell.improvements.find(improvement => improvement.wallet?.type === "character")?.wallet;
    const modeRecords = bell.modeNames.map((name, index) => ({ name, bank: bell.xpBanks[index], rate: bell.modeRates[index], requirement: bell.modeRequirements[index] }));
    return <Box gap="medium" data-testid="hole-bell-details">
        <Section title="Saved mode">
            <MetricStrip metrics={[
                { label: "Mode", value: mode },
                { label: "Rate", value: value(bell.selectedRate, " XP/hr") },
                { label: "Required XP", value: value(bell.selectedRequirement) },
                { label: "Clean odds", value: bell.cleanOdds === null ? "Unavailable" : `${(bell.cleanOdds * 100).toLocaleString("en-US", { maximumFractionDigits: 3 })}%` },
                { label: "Clean failures", value: value(bell.cleanFailures) },
            ]} />
        </Section>
        <Section title="Bell banks">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "12px", minWidth: 0 }}>
                {modeRecords.map((record, index) => <RoundedShadowBox key={record.name} background="dark-1" pad="medium" gap="small" data-testid={`bell-bank-${index}`}>
                    <Text size="small" weight={500}>{record.name}</Text>
                    <MetricStrip metrics={[
                        { label: "XP bank", value: value(record.bank) },
                        { label: "Rate", value: value(record.rate, " XP/hr") },
                        { label: "Required XP", value: value(record.requirement) },
                    ]} />
                </RoundedShadowBox>)}
            </Box>
        </Section>
        <Section title="Improvements">
            <Box gap="small">
                {bell.improvements.map(improvement => {
                    const wallet = improvement.wallet;
                    const currency = improvement.data.resource;
                    const cost = improvement.cost;
                    return <RoundedShadowBox key={improvement.index} background="dark-1" pad="medium" gap="small" data-testid={`bell-improvement-${improvement.index}`}>
                        <Box direction="row" gap="small" align="center">
                            <ArtTile data={Item.getImageData(currency === "Coins" ? "Coins1" : currency)} />
                            <Box gap="xxsmall" style={{ minWidth: 0 }}>
                                <Text size="small" weight={500}>{improvement.data.bonus.replace(/[{}]/g, "").replace(/\s+/g, " ").trim()}</Text>
                                <Text size="xsmall" color="accent-2">{currency}</Text>
                            </Box>
                        </Box>
                        <MetricStrip metrics={[
                            { label: "Level", value: value(improvement.level) },
                            { label: "Current quantity", value: value(improvement.quantity) },
                            { label: "Next cost", value: cost === null ? "Unavailable" : `${notateNumber(cost)} ${currency}` },
                        ]} />
                        {wallet?.type === "account" && wallet.balance !== null && wallet.balance !== undefined && <Box direction="row" gap="xsmall" align="center">
                            {currency === "Coins" ? <CoinsDisplay coinMap={getCoinsArray(wallet.balance)} maxCoins={3} regularRow />
                                : currency === "Bits" ? <BitsDisplay value={wallet.balance} />
                                    : <><IconImage data={Item.getImageData(currency)} scale={0.65} /><Text size="xsmall">{notateNumber(wallet.balance)}</Text></>}
                            <Text size="xsmall" color="accent-2">owned</Text>
                        </Box>}
                    </RoundedShadowBox>;
                })}
            </Box>
            <Box gap="xsmall" data-testid="bell-money-balances">
                <Text size="xsmall" color="accent-2">Money · per character</Text>
                {moneyWallet?.type === "character" && moneyWallet.values.map(entry => {
                    const player = players.find(candidate => candidate.playerID === entry.playerID);
                    return <Box key={entry.playerID} direction="row" gap="small" align="center">
                        <Text size="xsmall">{player?.playerName ?? "Unavailable"}</Text>
                        <CoinsDisplay coinMap={getCoinsArray(entry.balance)} maxCoins={3} regularRow />
                    </Box>;
                })}
            </Box>
        </Section>
        <Section title="Bonuses">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "12px", minWidth: 0 }}>
                {bell.bonuses.slice(0, 7).map(bonus => <RoundedShadowBox key={bonus.index} background="dark-1" pad="medium" gap="xsmall" data-testid={`bell-bonus-${bonus.index}`}>
                    <Text size="xsmall" color="accent-2">{bonus.data.description}</Text>
                    <Text size="small">{bonus.getDescription()}</Text>
                    <Text size="xsmall" color="accent-2">Level {value(bonus.level)}</Text>
                </RoundedShadowBox>)}
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
    const noteCurrency = harp.highestUnlockedNoteIndex === null ? undefined : hole.currencies.find(currency => currency.index === 10 + harp.highestUnlockedNoteIndex + 1);
    const noteCost = harp.noteCost;
    return <Box gap="medium" data-testid="hole-harp-details">
        <Section title="Saved settings">
            <MetricStrip metrics={[
                { label: "Saved power", value: value(harp.power) },
                { label: "Power per hour", value: value(harp.powerPerHour, "/hr") },
                { label: "Tune", value: harp.tune === null ? "Unavailable" : harp.notes.find(note => note.index === harp.tune)?.name ?? "Unavailable" },
                { label: "Active slots", value: value(harp.slotCount) },
                { label: "Layout", value: harp.layoutAvailable ? "Saved order shown below" : "Unavailable" },
            ]} />
        </Section>
        <Section title="Notes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: "12px", minWidth: 0 }}>
                {harp.notes.map(note => <RoundedShadowBox key={note.index} background="dark-1" pad="medium" gap="small" data-testid={`harp-note-${note.index}`}>
                    <Box direction="row" gap="small" align="center">
                        <Text size="small" weight={500}>{note.name}</Text>
                    </Box>
                    <MetricStrip metrics={[
                        { label: "Balance", value: value(note.current) },
                        { label: "Access", value: note.accessible === null ? "Unavailable" : note.accessible ? "Available" : "Locked" },
                    ]} />
                </RoundedShadowBox>)}
            </Box>
            <Box direction="row" gap="xsmall" align="center" data-testid="harp-next-note-cost">
                {noteCurrency?.getImageData() && <IconImage data={noteCurrency.getImageData()!} scale={0.7} />}
                <Text size="xsmall" color="accent-2">Next note cost: {exact(noteCost)} {noteCurrency?.data.name.replace(/_/g, " ") ?? "Unavailable"}</Text>
            </Box>
        </Section>
        <Section title="Strings">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 270px), 1fr))", gap: "12px", minWidth: 0 }}>
                {harp.strings.map(string => <RoundedShadowBox key={string.index} background="dark-1" pad="medium" gap="small" data-testid={`harp-string-${string.index}`}>
                    <Box gap="small">
                        <Text size="small" weight={500}>String {string.data.stringLetter}</Text>
                        <Text size="xsmall" color="accent-2">{string.unlocked === null ? "Ownership unavailable" : string.unlocked ? string.assignedSlots.length ? "Assigned" : "Unassigned" : "Not owned"}</Text>
                        <Text size="xsmall">{string.getDescription()}</Text>
                    </Box>
                    <MetricStrip metrics={[
                        { label: "Level", value: value(string.level) },
                        { label: "EXP", value: `${value(string.experience)} / ${value(string.nextLevelExperience)}` },
                    ]} />
                    {string.level !== null && string.experience !== null && string.nextLevelExperience !== null && <progress aria-label={`String ${string.data.stringLetter} EXP progress`} value={string.experience} max={string.nextLevelExperience} style={{ width: "100%", height: "6px", accentColor: normalizeColor("brand", theme) }} />}
                </RoundedShadowBox>)}
            </Box>
        </Section>
        {harp.layoutAvailable && <RoundedShadowBox background="dark-1" pad="medium" gap="xsmall" data-testid="harp-assignment-order">
            <Text size="xsmall" color="accent-2">Saved assignment order</Text>
            <Text size="small">{assignments}</Text>
            <Text size="xsmall" color="accent-2">String effects trigger in this order when Harp power reaches its threshold; exact rewards depend on transient runtime state.</Text>
        </RoundedShadowBox>}
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
            <MetricStrip metrics={[
                { label: "Wishes", value: value(lamp.wishStock) },
                { label: "Expected daily gain", value: lamp.wishesPerDay === null ? "Unavailable" : `${lamp.wishesPerDay.toLocaleString("en-US", { maximumFractionDigits: 2 })} wishes/day` },
            ]} />
        </Section>
        <Section title="Wishes">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: "16px", minWidth: 0 }}>
                {lamp.wishes.map(wish => {
                    const benefit = effectiveWishBonus(wish.index);
                    const cost = lamp.getWishCost(wish.index);
                    const metrics = [
                        { label: "Level", value: value(wish.wishCount) },
                        ...(benefit === null ? [] : [{ label: "Well / Harp gain", value: benefit }]),
                        { label: "Next cost", value: cost === null ? "Unavailable" : `${notateNumber(cost)} wishes` },
                    ];
                    return <RoundedShadowBox key={wish.index} background="dark-1" pad="medium" gap="small" data-testid={`lamp-wish-${wish.index}`}>
                        <Box gap="xsmall" style={{ minWidth: 0 }}>
                            <Text size="small" weight={500}>{wish.data.name}</Text>
                            <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{wishDescription(wish)}</Text>
                        </Box>
                        <MetricStrip metrics={metrics} />
                    </RoundedShadowBox>;
                })}
            </Box>
        </Section>
        <Section title="Schematic price">
            <RoundedShadowBox background="dark-1" pad="medium" gap="small" data-testid="lamp-schematic-discount">
                <Text size="small" weight={500}>A Moderate Discount</Text>
                <TextAndLabel label="Current schematic cost factor" text={exact(lamp.schematicCostDiscount, "×")} />
            </RoundedShadowBox>
        </Section>
        <Section title="Another Try">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: "12px", minWidth: 0 }}>
                {lamp.resetConsequences.map(reset => <RoundedShadowBox key={reset.category} background="dark-1" pad="medium" gap="xsmall" data-testid={`lamp-reset-${reset.category}`}>
                    <Text size="small" weight={500}>{reset.category}</Text>
                    <Text size="xsmall">{resetSummary(reset)}</Text>
                </RoundedShadowBox>)}
            </Box>
            <Text size="xsmall" color="accent-2">One Opal is granted by the “1000000 Opals” wish. Bring Them Back adds 12 hours to a selected Monument.</Text>
        </Section>
    </Box>;
}

export default function Part4CavernDetails({ hole, cavern, players }: { hole: Hole; cavern: number; players: Player[] }) {
    switch (cavern) {
        case 0: return <WellView hole={hole} />;
        case 4: return <BellView hole={hole} players={players} />;
        case 5: return <HarpView hole={hole} />;
        case 6: return <LampView hole={hole} />;
        default: return null;
    }
}
