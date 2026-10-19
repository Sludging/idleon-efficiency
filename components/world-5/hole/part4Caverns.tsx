import { Box, Text, ThemeContext } from "grommet";
import type { ReactNode } from "react";
import { useContext, useState } from "react";
import { normalizeColor } from "grommet/utils";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import ContentTabs from "../../base/ContentTabs";
import CoinsDisplay from "../../coinsDisplay";
import BitsDisplay from "../../bitsDisplay";
import { Item } from "../../../data/domain/items";
import { AtomCollider } from "../../../data/domain/world-3/construction/atomCollider";
import type { ImageData } from "../../../data/domain/imageData";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { getCoinsArray, notateNumber, toTime } from "../../../data/utility";

import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

function value(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${notateNumber(amount)}${suffix}`;
}

function exact(amount: number | null, suffix = ""): string {
    return amount === null ? "Unavailable" : `${amount.toLocaleString("en-US", { maximumFractionDigits: 20 })}${suffix}`;
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
function JarView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const jar = hole.jar;
    const study = hole.studies[10];
    const ownedTypeCount = jar.ownedTypeCount;
    const nextTypeCost = jar.nextTypeCost;
    const nextTypeCurrency = ownedTypeCount === null || nextTypeCost === null ? null
        : hole.currencies.find(currency => currency.index === 20 + ownedTypeCount)!;
    const nextTypeCurrencyImage = nextTypeCurrency?.getImageData();
    const boardTypes = jar.jarTypes.map(type => ({
        type,
        entries: jar.board.filter(entry => entry.type === type.index),
    }));

    return <Box gap="medium" data-testid="hole-jars-details">
        <Section title="Production">
            <CavernMetricStrip metrics={[
                { label: "Board", value: jar.boardAvailable ? `${jar.board.length} / 120 jars` : "Unavailable" },
                { label: "Gilded bonus", value: value(jar.gildedBonusPercent, "%") },
                { label: "Owned types", value: value(jar.ownedTypeCount, " / 9") },
                {
                    label: "Next type cost",
                    value: nextTypeCost === null || nextTypeCurrency === null ? "Unavailable"
                        : `${notateNumber(nextTypeCost)} ${nextTypeCurrency.data.name.replace(/_/g, " ")}`,
                    image: nextTypeCurrencyImage,
                },
            ]} />
            <Box direction="row" gap="medium" wrap>
                {jar.producerAssignments.map(assignment => {
                    const producer = jar.producers.find(entry => entry.index === assignment.index);
                    const type = assignment.type === null ? null : jar.jarTypes[assignment.type];
                    return <Box key={assignment.index} gap="xxsmall" pad="small" background="dark-1" data-testid={`jar-producer-${assignment.index}`}>
                        <Text size="small" weight={500}>Producer {assignment.index + 1}</Text>
                        <Text size="xsmall">Assignment: {type ? type.data.name.replace(/_/g, " ") : assignment.type === null ? "Unavailable" : "Unassigned"}</Text>
                        <Text size="xsmall">Work: {value(assignment.work)}</Text>
                        <Text size="xsmall">Requirement: {value(producer?.requirement ?? null)}</Text>
                        <Text size="xsmall">Quality: {value(producer?.quality ?? null)}</Text>
                        <Text size="xsmall">Current rate: {value(producer?.ratePerHour ?? null, "/hr")}</Text>
                    </Box>;
                })}
                {jar.producerAssignments.length === 0 && <Text size="small">Producer assignments unavailable.</Text>}
            </Box>
            <Text size="xsmall" color="accent-2">Production opens at 11 owned caverns. Work is production progress, not spendable stock. Jar rewards depend on the in-game break order.</Text>
        </Section>

        <Section title="Jar types and holdings">
            <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "760px", borderCollapse: "collapse" }} data-testid="jar-type-table">
                    <thead><tr>{["Type", "Access", "Saved jars", "Requirement balance", "Next cost"].map(label =>
                        <th key={label} scope="col" style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}><Text size="xsmall" color="accent-2">{label}</Text></th>)}</tr></thead>
                    <tbody>{boardTypes.map(({ type, entries }) => <tr key={type.index} data-testid={`jar-type-${type.index}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        <td style={{ padding: "8px" }}><Box gap="xxsmall"><Text size="small" weight={500}>{type.data.name.replace(/_/g, " ")}</Text><Text size="xsmall" color="accent-2">{type.getDescription()}</Text></Box></td>
                        <td style={{ padding: "8px" }}><Text size="xsmall">{type.unlocked === null ? "Unavailable" : type.unlocked ? "Unlocked" : "Locked"}</Text></td>
                        <td style={{ padding: "8px" }}><Text size="xsmall">{jar.boardAvailable ? entries.length : "Unavailable"}</Text></td>
                        <td style={{ padding: "8px" }}><Text size="xsmall">{value(jar.requirementBalances[type.index])}</Text></td>
                        <td style={{ padding: "8px" }}>
                            {type.index === ownedTypeCount && nextTypeCost !== null && nextTypeCurrency !== null
                                ? <Box direction="row" gap="xsmall" align="center">
                                    {nextTypeCurrencyImage && <IconImage data={nextTypeCurrencyImage} scale={0.65} />}
                                    <Text size="xsmall">{notateNumber(nextTypeCost)} {nextTypeCurrency.data.name.replace(/_/g, " ")}</Text>
                                </Box>
                                : "—"}
                        </td>
                    </tr>)}</tbody>
                </table>
            </Box>
            <Box direction="row" gap="small" wrap data-testid="jar-wallets">
                {jar.holdings.map((balance, index) => {
                    const currency = hole.currencies.find(entry => entry.index === index + 20);
                    const specialName = index === 10 ? "Golden Plop" : index === 11 ? "Turquoise Rupie" : null;
                    const image = specialName === null ? currency?.getImageData() : resourceImage(hole, specialName);
                    return <Box key={index} data-testid={`jar-wallet-${index}`} direction="row" gap="xsmall" align="center" pad="xsmall" background="dark-1">
                        {image && <IconImage data={image} scale={0.7} />}
                        <Text size="xsmall">{currency?.data.name.replace(/_/g, " ") ?? specialName}: {value(balance)}</Text>
                    </Box>;
                })}
            </Box>
        </Section>

        <Section title="Saved board">
            {jar.boardAvailable && jar.board.length > 0
                ? <Box style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "8px" }} data-testid="jar-board">
                    {jar.board.map((entry, index) => <Box key={index} pad="small" background="dark-1" data-testid={`jar-board-entry-${index}`}>
                        <Text size="xsmall" weight={500}>{jar.jarTypes[entry.type]?.data.name.replace(/_/g, " ") ?? "Unknown type"}</Text>
                        <Text size="xsmall">Quality {entry.quality} · Position {entry.x}, {entry.y}</Text>
                    </Box>)}
                </Box>
                : <Text size="small">{jar.boardAvailable ? "No saved jars on the board." : "Saved Jar board is unavailable."}</Text>}
        </Section>
        <Section title="Collectibles">
            <Box direction="row" gap="small" align="center" wrap>
                <Text size="small">Preferred enchantment target: {jar.preferredCollectibleTarget === null
                    ? "Unavailable" : jar.jarBonuses[jar.preferredCollectibleTarget]?.data.name.replace(/_/g, " ") ?? "Unavailable"}</Text>
                <Text size="xsmall" color="accent-2">Preferred target is probabilistic, not guaranteed.</Text>
            </Box>
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "8px" }} data-testid="jar-collectibles">
                {jar.jarBonuses.map(bonus => {
                    const level = bonus.level;
                    const effect = bonus.getBonus();
                    const unit = bonus.getUnit();
                    const undiscovered = level === 0;
                    const futurePlaceholder = !bonus.hasReleasedEffect();
                    const description = undiscovered && !futurePlaceholder
                        ? bonus.getFirstDiscoveryDescription()
                        : bonus.getDescription();
                    return <Box key={bonus.index} pad="small" gap="xsmall" background="dark-1" data-testid={`jar-collectible-${bonus.index}`}>
                        <Box direction="row" justify="between" gap="xsmall">
                            <Text size="xsmall" weight={500}>{bonus.data.name.replace(/_/g, " ")}</Text>
                            <Text size="xsmall" color="accent-2">Lv. {value(level)}</Text>
                        </Box>
                        <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{futurePlaceholder
                            ? `Future-cavern effect not released · ${description}`
                            : undiscovered && effect !== null && unit !== null
                                ? `First-discovery effect · ${description}`
                                : effect === null || unit === null ? `Effective benefit unavailable · ${description}` : description}</Text>
                        <Text size="xsmall" color="accent-2">{level === null ? "Saved discovery level unavailable" : level === 0 ? "Undiscovered" : level === 1 ? "Discovered" : `Enchanted ${level - 1} times`}</Text>
                    </Box>;
                })}
            </Box>
            {!jar.collectibleLevelsAvailable && <Text size="xsmall">Saved collectible levels are missing; effects that depend on them remain unavailable.</Text>}
        </Section>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}


function FountainView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const fountain = hole.fountain;
    const [page, setPage] = useState<"Regular" | "Yellow" | "Green">("Regular");
    const pageIndex = ["Regular", "Yellow", "Green"].indexOf(page);
    const pageNames = ["Regular", "Yellow", "Green"] as const;
    const study = hole.studies[15];
    const opalCost = fountain.getOpalCost();
    const opalAffordable = fountain.canAffordOpal();
    const royalChance = fountain.getRoyalChance();
    const duckChance = fountain.getDuckChance();
    const currencyName = (id: number) => fountain.currencies[id]?.data.name.replace(/_/g, " ") ?? "Unavailable currency";

    return <Box gap="medium" data-testid="hole-fountain-details">
        <Section title="Wallets and pending stacks">
            <CavernMetricStrip metrics={[
                { label: "Pending items", value: value(fountain.getStackItemCount()) },
                { label: "Occupied / capacity", value: `${value(fountain.getOccupiedSpaceCount())} / ${value(fountain.getCapacity())}` },
                { label: "Open positions", value: value(fountain.getAvailableSpaceCount()) },
                { label: "Effective capacity", value: `${value(fountain.getCapacity())} positions · ${value(fountain.getMaximumStackSize())} items each` },
                { label: "Pending value", value: value(fountain.getPendingStackValue()) },
            ]} />
            <Box direction="row" gap="small" wrap data-testid="fountain-wallets">
                {fountain.currencies.map(currency => {
                    const luckyCoinChance = fountain.getLuckyCoinChance(currency.index);
                    return <Box key={currency.index} gap="xxsmall" pad="xsmall" background="dark-1" data-testid={`fountain-wallet-${currency.index}`}>
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={Item.getImageData(currency.data.icon)} scale={0.7} />
                            <Text size="xsmall">{currency.data.name.replace(/_/g, " ")}: {value(currency.wallet)}</Text>
                        </Box>
                        <Text size="xsmall" color="accent-2">Lucky coins {value(currency.luckyCoins)}</Text>
                        <Text size="xsmall" color="accent-2">Value {value(fountain.getCurrencyValue(currency.index))}</Text>
                        <Text size="xsmall" color="accent-2">Overflow {value(fountain.getOverflowValue(currency.index))}</Text>
                        <Text size="xsmall" color="accent-2">Lucky chance {value(luckyCoinChance === null ? null : luckyCoinChance * 100, "%")}</Text>
                    </Box>;
                })}
            </Box>
            <Box direction="row" gap="small" wrap align="center">
                <Text size="xsmall">Desire: {fountain.desireCurrencyId === null ? "Unavailable" : currencyName(fountain.desireCurrencyId)}</Text>
                <Text size="xsmall">Excluded from generation: {fountain.excludedGenerationCurrencyIds === null ? "Unavailable" : fountain.excludedGenerationCurrencyIds.map(currencyName).join(", ") || "None"}</Text>
                <Text size="xsmall">Value exponent: {value(fountain.currencyValueExponent)}</Text>
            </Box>
            <Box gap="xsmall" data-testid="fountain-stacks">
                {fountain.stacksAvailable ? fountain.stacks.map(stack => {
                    const groupedItems = new Map<string, { currencyId: number; value: number | null; count: number }>();
                    stack.items.forEach(item => {
                        const key = JSON.stringify([item.currencyId, item.value]);
                        const group = groupedItems.get(key);
                        if (group) {
                            group.count += 1;
                        } else {
                            groupedItems.set(key, { ...item, count: 1 });
                        }
                    });
                    return <Box key={stack.space} direction="row" gap="small" align="center" wrap pad="xsmall" background="dark-1" data-testid={`fountain-stack-${stack.space}`}>
                        <Text size="xsmall" weight={500}>Position {stack.space + 1}</Text>
                        <Text size="xsmall">{stack.items.length} items</Text>
                        <Text size="xsmall">Royal: {stack.royal === null ? "Unavailable" : stack.royal ? "Yes" : "No"}</Text>
                        <Text size="xsmall">Snapshot value: {value(stack.value)}</Text>
                        <Box direction="row" gap="xsmall" wrap>{Array.from(groupedItems.values(), (item, index) =>
                            <Text key={index} size="xsmall" data-testid={`fountain-stack-${stack.space}-group-${index}`} data-currency-id={item.currencyId} data-value={item.value === null ? "unavailable" : item.value} data-count={item.count}>{item.count} × {currencyName(item.currencyId)}: {value(item.value)} each</Text>)}</Box>
                    </Box>;
                }) : <Text size="small">Saved pending stacks or royal flags are unavailable.</Text>}
            </Box>
        </Section>

        <Section title="Fountain bars and Opals">
            <Box direction="row" gap="small" wrap>
                {fountain.barProgress.map((progress, index) => <Box key={index} gap="xxsmall" pad="small" background="dark-1" data-testid={`fountain-bar-${index}`}>
                    <Text size="small" weight={500}>Bar {index + 1}</Text>
                    <Text size="xsmall">Progress: {progress === null ? "Unavailable" : toTime(progress)}</Text>
                    <Text size="xsmall">Required: {toTime(fountain.getBarRequirement(index))}</Text>
                    <Text size="xsmall">Rate: {value(fountain.getEffectiveBarSpeed(index), "×")}</Text>
                    <Text size="xsmall">Access: {fountain.getBarUnlocked(index) === null ? "Unavailable" : fountain.getBarUnlocked(index) ? "Unlocked" : "Locked"}</Text>
                </Box>)}
            </Box>
            <Box direction="row" gap="small" wrap align="center">
                <Text size="small">Marbles: {value(fountain.marbleCount)}</Text>
                <Text size="small">Marble yield: {value(fountain.getMarbleYield())}</Text>
                <Text size="small">Opals earned: {value(fountain.opalProgress)}</Text>
                <Text size="small">Next Opal: {opalCost === null ? "Unavailable" : `${notateNumber(opalCost.amount)} ${currencyName(opalCost.currencyId)}${opalCost.available ? "" : " · currency unavailable"}`}</Text>
                <Text size="xsmall" color={opalAffordable === null ? "accent-2" : opalAffordable ? "status-ok" : "critical"}>{opalAffordable === null ? "Affordability unavailable" : opalAffordable ? "Affordable" : "Not affordable"}</Text>
            </Box>
            <Box direction="row" gap="small" wrap>
                <Text size="xsmall">Royal chance: {value(royalChance === null ? null : royalChance * 100, "%")}</Text>
                <Text size="xsmall">Duck chance: {value(duckChance === null ? null : duckChance * 100, "%")}</Text>
                <Text size="xsmall">Ducks: {value(fountain.duckCount)}</Text>
            </Box>
            <Text size="xsmall" color="accent-2">Pending value is a saved snapshot. Wallets are spendable balances; current values do not predict future generation or rewards.</Text>
        </Section>

        <Section title="Upgrades and marbleization">
            <ContentTabs<typeof page> options={pageNames.map(name => ({ value: name, label: name }))} value={page} onChange={setPage} />
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }} data-testid={`fountain-upgrades-${page.toLowerCase()}`}>
                {fountain.upgrades.filter(upgrade => upgrade.data.waterIndex === pageIndex).map(upgrade => {
                    const cost = upgrade.getCost();
                    const wallet = fountain.wallets[upgrade.data.costCurrencyIndex];
                    const affordable = fountain.canAffordUpgrade(upgrade.data.waterIndex, upgrade.data.index);
                    const shortfall = cost === null || wallet === null ? null : Math.max(0, cost - wallet);
                    const unlocked = upgrade.isUnlocked(fountain.upgrades);
                    const description = upgrade.getDescription(fountain);
                    const prerequisite = upgrade.data.prerequisiteIndex < 0 ? "None"
                        : `Upgrade ${upgrade.data.prerequisiteIndex + 1}: ${unlocked === null ? "Unavailable" : unlocked ? "Met" : "Not met"}`;
                    const marbleCost = fountain.getMarbleizeCost(upgrade.data.waterIndex, upgrade.data.index);
                    const currencyImage = resourceImage(hole, currencyName(upgrade.data.costCurrencyIndex));
                    return <GameCard key={upgrade.index} title={`${upgrade.data.index + 1}. ${upgrade.data.name.replace(/_/g, " ")}`} testId={`fountain-upgrade-${pageIndex}-${upgrade.data.index}`}
                        inactive={upgrade.level === 0 || unlocked === false}
                        headerRight={<Text size="xsmall">Lv. {value(upgrade.level)}</Text>}>
                        {description !== null && <Text size="xsmall" style={{ whiteSpace: "pre-line" }}>{description}</Text>}
                        <Text size="xsmall">Prerequisite: {prerequisite}</Text>
                        <Box direction="row" gap="xsmall" align="center" wrap>
                            {currencyImage && <IconImage data={currencyImage} scale={0.65} />}
                            <Text size="xsmall" color={affordable === null ? undefined : affordable ? "status-ok" : "critical"}>Cost / wallet: {value(cost)} / {value(wallet)}</Text>
                            <Text size="xsmall">Shortfall: {value(shortfall)}</Text>
                        </Box>
                        <Box direction="row" gap="xsmall" align="center" wrap>
                            <Text size="xsmall">Marbleization: {upgrade.data.marbleizeEligible ? `Lv. ${value(upgrade.marbleizationLevel)} · cost ${value(marbleCost)}` : "Not eligible"}</Text>
                            <Text size="xsmall">Base level {value(upgrade.level)} · marbleized level {value(upgrade.marbleizationLevel)}</Text>
                        </Box>
                    </GameCard>;
                })}
            </Box>
            <Text size="xsmall" color="accent-2">Effective capacity is capped at 16 positions and 50 items per position. Purchased capacity levels do not raise those caps.</Text>
        </Section>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function CoveView({ hole, onOpenStudies, characters }: { hole: Hole; onOpenStudies: () => void; characters: { playerId: number; playerName: string }[] }) {
    const cove = hole.cove;
    const study = hole.studies[17];
    const dailyPurchases = study.dailyCoveUpgradesPurchased;
    const studyBonus = study.getEffects().find(effect => effect.key === "daily-discounted-upgrades")!.value as number | null;

    return <Box gap="medium" data-testid="hole-cove-details">
        <Section title="Shapes and Cove state">
            <CavernMetricStrip metrics={[
                { label: "Glunko kills", value: value(cove.glunkoKills) },
                { label: "Opals earned", value: value(cove.rewards.opalsEarned) },
                { label: "Ribbon reward", value: cove.rewards.ribbonRewardEarned === null ? "Unavailable" : cove.rewards.ribbonRewardEarned ? "Earned" : "Not earned" },
                { label: "Study purchases today", value: dailyPurchases === null ? "Unavailable: Saved daily purchases are missing." : exact(dailyPurchases) },
                { label: "Study discount level", value: studyBonus === null ? "Unavailable" : value(studyBonus) },
            ]} />
            <Box direction="row" gap="small" wrap>
                <Text size="xsmall">Blue target: {cove.blueShapeTargetAvailable ? cove.blueShapeTargetId === null ? "None saved" : cove.shapes[cove.blueShapeTargetId]?.name ?? "Unavailable" : "Unavailable"}</Text>
                <Text size="xsmall">Purple target: {cove.purpleShapeTargetAvailable ? cove.purpleShapeTargetId === null ? "None saved" : cove.shapes[cove.purpleShapeTargetId]?.name ?? "Unavailable" : "Unavailable"}</Text>
            </Box>
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }} data-testid="cove-shapes">
                {cove.shapes.map(shape => {
                    const balance = shape.color === "blue" ? cove.blueShapeBalances[shape.id] : cove.purpleShapeBalances[shape.id - 6];
                    const targetId = shape.color === "blue" ? cove.blueShapeTargetId : cove.purpleShapeTargetId;
                    const targetKnown = shape.color === "blue" ? cove.blueShapeTargetAvailable : cove.purpleShapeTargetAvailable;
                    return <Box key={shape.id} direction="row" gap="small" align="center" pad="small" background="dark-1" data-testid={`cove-shape-${shape.id}`}>
                        <IconImage data={Item.getImageData(shape.data.internalName)} scale={0.8} />
                        <Box flex><Text size="xsmall" weight={500}>{shape.name}</Text><Text size="xsmall">{value(balance)}</Text></Box>
                        <Text size="xsmall" color="accent-2">{targetKnown ? targetId === shape.id ? "Boosted target" : "" : "Target unavailable"}</Text>
                    </Box>;
                })}
            </Box>
        </Section>

        <Section title="Upgrades">
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }} data-testid="cove-upgrades">
                {cove.upgrades.map(upgrade => {
                    const balance = cove.getCurrencyBalance(upgrade.index);
                    const cost = dailyPurchases === null || studyBonus === null
                        ? null : cove.getUpgradeCost(upgrade.index, dailyPurchases, studyBonus);
                    const shortfall = cost === null || balance === null ? null : Math.max(0, cost - balance);
                    const description = upgrade.getDescription();
                    const purchaseEffects = cove.getPurchaseEffects(upgrade.index);
                    const shapeId = Math.floor(upgrade.index % 12 / 2) + (Math.floor(upgrade.index / 12) === 0 ? 0 : 6);
                    return <GameCard key={upgrade.index} title={upgrade.name} testId={`cove-upgrade-${upgrade.index}`}
                        inactive={upgrade.level === 0} headerRight={<Text size="xsmall">Lv. {value(upgrade.level)}</Text>}>
                        {description !== null && <Text size="xsmall">{description}</Text>}
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={Item.getImageData(cove.shapes[shapeId].data.internalName)} scale={0.65} />
                            <Text size="xsmall">Cost / balance: {value(cost)} / {value(balance)}</Text>
                            <Text size="xsmall">Shortfall: {value(shortfall)}</Text>
                        </Box>
                        <Text size="xsmall">{purchaseEffects.opalsEarned > 0 ? "Earns an Opal when purchased. " : ""}{purchaseEffects.resetsMonsterRespawnTime ? "Resets monster respawn time when purchased. " : ""}{purchaseEffects.incrementsStudyDailyCounter === false ? "Ribbon purchase does not increment the Study counter." : ""}</Text>
                    </GameCard>;
                })}
            </Box>
            <Text size="xsmall" color="accent-2">The Study discount applies while its daily use count is below the saved Study amount. It is not a purchase limit.</Text>
        </Section>

        <Section title="Prospective character-local effects">
            <Text size="xsmall" color="accent-2">Current map or cavern assignment does not change these saved-input values. Context shows whether the character is on map 216 and assigned to cavern 17.</Text>
            <Box style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", minWidth: "820px", borderCollapse: "collapse" }} data-testid="cove-character-effects">
                    <thead><tr>{["Character", "Cove context", "Drop rate", "AFK gain", "Per damage tier / base multikill", "Respawn", "Blue pickup", "Purple pickup", "Random double"].map(label =>
                        <th key={label} scope="col" style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid rgba(255,255,255,0.14)" }}><Text size="xsmall" color="accent-2">{label}</Text></th>)}</tr></thead>
                    <tbody>{characters.map(character => {
                        const effects = cove.localEffectsByPlayerId.get(character.playerId);
                        const blueTarget = effects?.bluePickupTargetId === null || effects?.bluePickupTargetId === undefined ? "None" : cove.shapes[effects.bluePickupTargetId]?.name ?? "Unavailable";
                        const purpleTarget = effects?.purplePickupTargetId === null || effects?.purplePickupTargetId === undefined ? "None" : cove.shapes[effects.purplePickupTargetId]?.name ?? "Unavailable";
                        return <tr key={character.playerId} data-testid={`cove-character-${character.playerId}`} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{character.playerName}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{effects ? effects.inCoveContext ? "Yes" : "No" : "Unavailable"}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{value(effects?.dropRateMultiplier ?? null, "×")}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{exact(effects?.afkGainMultiplier ?? null, "×")}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{exact(effects?.multikillPerDamageTier ?? null)} / {exact(effects?.baseMultikill ?? null)}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{exact(effects?.respawnTimeMultiplier ?? null, "×")}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{blueTarget} · {value(effects?.bluePickupAmount ?? null)}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{purpleTarget} · {value(effects?.purplePickupAmount ?? null)}</Text></td>
                            <td style={{ padding: "8px" }}><Text size="xsmall">{value(effects?.pickupRandomDoubleChance === null || effects?.pickupRandomDoubleChance === undefined ? null : effects.pickupRandomDoubleChance * 100, "%")}</Text></td>
                        </tr>;
                    })}</tbody>
                </table>
            </Box>
        </Section>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}


function WellView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
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

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function BellView({ hole, totalMoney, onOpenStudies }: { hole: Hole; totalMoney: number; onOpenStudies: () => void }) {
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
    const methodsComplete = bell.methodsOwned === 6;
    const study = hole.studies[4];
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

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function HarpView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const harp = hole.harp;
    const theme = useContext(ThemeContext);
    const showNextNoteCost = harp.highestUnlockedNoteIndex === null || harp.highestUnlockedNoteIndex < 9;
    const nextNoteCost = harp.highestUnlockedNoteIndex === null ? "Unavailable"
        : harp.noteCost === null ? "Unavailable"
            : `${value(harp.noteCost)} ${hole.currencies[11 + harp.highestUnlockedNoteIndex].data.name.replace(/_/g, " ")}`;
    const opalsFound = hole.cavernOpalSources.find(source => source.id === "cavern:5")?.opals ?? null;
    const tuneName = harp.tune === null ? "Unavailable"
        : harp.notes.find(note => note.index === harp.tune)?.name ?? "Unavailable";
    const strings = harp.strings.filter(string => string.index < 6 || (string.index === 6 && string.level !== null && string.level > 0));
    const totalStringLevels = harp.strings.some(string => string.level === null) ? null
        : harp.strings.reduce((sum, string) => sum + (string.level ?? 0), 0);
    const study = hole.studies[5];
    const noteCurrencyImage = showNextNoteCost && harp.highestUnlockedNoteIndex !== null && harp.noteCost !== null
        ? hole.currencies[11 + harp.highestUnlockedNoteIndex].getImageData() : undefined;

    const triggerContext = (stringIndex: number): string => {
        const contexts = harp.assignedStringEffects.filter(effect => effect.stringIndex === stringIndex);
        if (contexts.length === 0) return stringIndex >= 0 && harp.layoutAvailable && harp.slotCount !== null && harp.strings.find(string => string.index === stringIndex)?.assignedSlots.length === 0
            ? "Not assigned" : "Trigger context unavailable";
        return [...new Set(contexts.map(context => {
            if (context.effect.type === "none") return "No trigger effect.";
            const status = context.triggerStatus === "power-below-threshold" ? "Below power threshold"
                : context.triggerStatus === "power-unavailable" ? "Power unavailable"
                    : null;
            const effect = context.effect.type === "notes" ? "Creates notes"
                : context.effect.type === "opal" ? "Finds Opals"
                    : "Creates String EXP";
            return status === null ? `${effect}.` : `${status}. ${effect}.`;
        }))].join(" ");
    };
    return <Box gap="medium" data-testid="hole-harp-details">
        <Section title="Power">
            <Box direction="row" gap="medium" wrap align="center" data-testid="harp-power-summary">
                <Text size="large" style={{ fontVariantNumeric: "tabular-nums" }}>{value(harp.power)}</Text>
                <Box direction="row" gap="small" wrap align="center">
                    <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Power rate</Text>
                        <Text size="small">{value(harp.powerPerHour, "/hr")}</Text>
                    </Box>
                    {showNextNoteCost && <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }} data-testid="harp-next-note-cost">
                        <Text size="xsmall" color="accent-2">Next note cost</Text>
                        {noteCurrencyImage && <IconImage data={noteCurrencyImage} scale={0.65} />}
                        <Text size="small">{nextNoteCost}</Text>
                    </Box>}
                    <Box direction="row" gap="xsmall" align="center" pad={{ right: "small" }} border={{ side: "right", color: "grey-1" }}>
                        <Text size="xsmall" color="accent-2">Opal chance</Text>
                        <TipDisplay heading="Baseline Opal chance" body={<Text size="xsmall">Baseline chance uses saved power before any strings are plucked. Domino Effect increases this chance as strings are plucked.</Text>} size="small">
                            <Text size="small" tabIndex={0} style={{ textDecoration: "underline dotted", textUnderlineOffset: "3px", cursor: "help" }}>
                                {harp.baselineOpalChance === null ? "Unavailable" : `${(harp.baselineOpalChance * 100).toLocaleString("en-US", { maximumFractionDigits: 2 })}%`}
                            </Text>
                        </TipDisplay>
                    </Box>
                    <Box direction="row" gap="xsmall" align="center">
                        <Text size="xsmall" color="accent-2">Opals found</Text>
                        <IconImage data={Item.getImageData("Opal")} scale={0.65} />
                        <Text size="small">{value(opalsFound)}</Text>
                    </Box>
                </Box>
            </Box>
        </Section>

        <Section title="Notes">
            <Box direction="row" gap="xsmall" align="center">
                <Text size="xsmall" color="accent-2">Tune</Text>
                <Text size="xsmall">{tuneName}</Text>
            </Box>
            <RoundedShadowBox background="dark-1" pad="none" overflow="hidden" data-testid="harp-note-grid">
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", minWidth: 0 }}>
                    {harp.notes.map((note, index) => {
                        const currency = hole.currencies.find(entry => entry.index === 10 + note.index);
                        const image = currency?.getImageData();
                        return <Box key={note.index} direction="row" align="center" justify="center" gap="xsmall" pad="small"
                            aria-label={`${note.name}: ${value(note.current)}`}
                            title={note.name}
                            style={{
                                minWidth: 0,
                                opacity: note.accessible === false ? 0.6 : 1,
                                borderRight: index % 5 !== 4 ? `${normalizeColor("grey-1", theme)} solid 1px` : undefined,
                                borderBottom: index < 5 ? `${normalizeColor("grey-1", theme)} solid 1px` : undefined,
                            }}
                            data-testid={`harp-note-${note.index}`}>
                            {image && <IconImage data={image} scale={0.7} />}
                            <Text size="xsmall" style={{ overflowWrap: "anywhere" }}>{value(note.current)}</Text>
                        </Box>;
                    })}
                </Box>
            </RoundedShadowBox>
        </Section>

        <Section title="Strings">
            <Box direction="row" align="center" justify="between" gap="small" wrap>
                <Text size="xsmall" color="accent-2">{harp.slotCount === null ? "Unavailable" : `${harp.slotCount} slots`}</Text>
                <Text size="xsmall" color="accent-2">Owned string levels: {value(totalStringLevels)}</Text>
            </Box>
            <RoundedShadowBox background="dark-1" pad="small" data-testid="harp-assignment-order">
                {!harp.layoutAvailable || harp.slotCount === null
                    ? <Text size="xsmall" color="accent-2">Assignment layout unavailable</Text>
                    : <Box direction="row" gap="small" align="center" style={{ overflowX: "auto", minWidth: 0 }}>
                        {Array.from({ length: harp.slotCount }, (_, slot) => {
                            const stringIndex = harp.layoutAvailable ? harp.layout[slot] : null;
                            const string = stringIndex === null || stringIndex === undefined
                                ? undefined : harp.strings.find(entry => entry.index === stringIndex);
                            const slotUnavailable = slot >= harp.layout.length || (stringIndex !== null && string === undefined);
                            return <Box key={slot} direction="column" align="center" gap="xxsmall" flex={false} aria-label={`Slot ${slot + 1}: ${slotUnavailable ? "Unavailable" : string ? `String ${string.data.stringLetter}` : "Empty"}`}>
                                <Text size="xsmall" color="accent-2">#{slot + 1}</Text>
                                {slotUnavailable ? <Text size="small">Unavailable</Text>
                                    : string ? <IconImage data={string.imageData} scale={0.8} />
                                        : <Text size="small">—</Text>}
                            </Box>;
                        })}
                    </Box>}
            </RoundedShadowBox>
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", minWidth: 0, gap: "8px" }}>
                {strings.map((string, index) => {
                    const passiveDescription = string.index === 6 ? null : string.getPassiveDescription();
                    const currentLevel = string.level === null ? "Unavailable" : `${string.level}`;
                    const levelDetails = string.level === null || string.experience === null || string.nextLevelExperience === null
                        ? "Saved level or EXP is unavailable."
                        : `Current EXP: ${exact(string.experience)}. Next level: ${exact(string.nextLevelExperience)} EXP.`;
                    return <GameCard key={string.index} title={`String ${string.data.stringLetter}`} image={string.imageData}
                        testId={`harp-string-${string.index}`} inactive={string.unlocked === false}
                        headerRight={<TipDisplay heading={`String ${string.data.stringLetter} · Lv. ${currentLevel}`} body={<Text size="xsmall">{levelDetails}</Text>} size="small">
                            <Text size="xsmall" style={{ whiteSpace: "nowrap", cursor: "help" }} tabIndex={0}>Lv. {currentLevel}</Text>
                        </TipDisplay>}>
                        {string.index === 6
                            ? <Text size="xsmall">Reserved string.</Text>
                            : <>
                                <Text size="xsmall">{string.unlocked === null ? "Ownership unavailable" : triggerContext(string.index)}</Text>
                                <Box pad={{ top: "xsmall" }} border={{ side: "top", color: "grey-1" }}>
                                    <Text size="xsmall">{passiveDescription ?? "Passive unavailable"}</Text>
                                </Box>
                            </>}
                    </GameCard>;
                })}
            </Box>
        </Section>

        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

function LampView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
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
    const study = hole.studies[6];
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
                        <CavernMetricStrip metrics={metrics} />
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
                            </Box>
                        </details>}
                    </GameCard>;
                })}
            </Box>
        </Section>
        <CavernStudySummary study={study} onOpenStudies={onOpenStudies} />
    </Box>;
}

export default function Part4CavernDetails({ hole, cavern, totalMoney, onOpenStudies, characters }: {
    hole: Hole;
    cavern: number;
    totalMoney: number;
    onOpenStudies: () => void;
    characters: { playerId: number; playerName: string }[];
}) {
    switch (cavern) {
        case 0: return <WellView hole={hole} onOpenStudies={onOpenStudies} />;
        case 4: return <BellView hole={hole} totalMoney={totalMoney} onOpenStudies={onOpenStudies} />;
        case 5: return <HarpView hole={hole} onOpenStudies={onOpenStudies} />;
        case 6: return <LampView hole={hole} onOpenStudies={onOpenStudies} />;
        case 10: return <JarView hole={hole} onOpenStudies={onOpenStudies} />;
        case 15: return <FountainView hole={hole} onOpenStudies={onOpenStudies} />;
        case 17: return <CoveView hole={hole} onOpenStudies={onOpenStudies} characters={characters} />;
        default: return null;
    }
}
