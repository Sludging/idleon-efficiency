import { useContext } from "react";
import { Box, Grid, ResponsiveContext, Table, TableBody, TableCell, TableHeader, TableRow, Text } from "grommet";
import type { Alchemy, Cauldron } from "../../../data/domain/world-2/alchemy/alchemy";
import type { Player } from "../../../data/domain/player";
import { commaNotation, notateNumber } from "../../../data/utility";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import TipDisplay from "../../base/TipDisplay";
import TextAndLabel from "../../base/TextAndLabel";

const amount = (value: number) => notateNumber(value, "Smaller");
const precise = (value: number) => value.toLocaleString(undefined, { maximumSignificantDigits: 4 });
const boostNames = ["Speed", "Luck", "Cost", "Extra"];

function AmountPair({ current, requirement, heading, unit, color }: {
    current: number; requirement: number; heading: string; unit?: string; color?: string;
}) {
    const suffix = unit ? ` ${unit}` : "";
    const value = <Text size="small" color={color}>{amount(current)} / {amount(requirement)}{suffix}</Text>;
    if (Number(amount(current)) === current && Number(amount(requirement)) === requirement) {
        return value;
    }
    return (<Box tabIndex={0}>{value}</Box>);
}

function NextBubbles({ cauldron }: { cauldron: Cauldron }) {
    return <Box as="details" flex="grow" style={{ minWidth: 0 }}>
        <Text as="summary" size="small" color="accent-2" style={{ cursor: "pointer" }}>Next 10 bubbles</Text>
        <Box margin={{ top: "small" }} overflow="auto">
            <Table aria-label={`${cauldron.name} next 10 bubbles`}>
                <TableHeader><TableRow>
                    {["Bubble", "World", "Brew points / attempt", "Chance"].map(label => <TableCell key={label} scope="col" pad="xsmall"><Text size="xsmall" color="accent-2">{label}</Text></TableCell>)}
                </TableRow></TableHeader>
                <TableBody>{cauldron.bestBrewerPreview.nextBubbles.map(bubble => <TableRow key={bubble.bubbleNumber}>
                    <TableCell pad="xsmall"><Text size="xsmall">{bubble.bubbleNumber}</Text></TableCell>
                    <TableCell pad="xsmall"><Text size="xsmall">{bubble.worldNumber}</Text></TableCell>
                    <TableCell pad="xsmall">{Number(amount(bubble.brewRequirement)) === bubble.brewRequirement
                        ? <Text size="xsmall">{amount(bubble.brewRequirement)}</Text>
                        : <TipDisplay heading="Brew points per attempt" body={String(bubble.brewRequirement)}><Text tabIndex={0} size="xsmall" style={{ cursor: "help" }}>{amount(bubble.brewRequirement)}</Text></TipDisplay>}</TableCell>
                    <TableCell pad="xsmall"><Text size="xsmall">{bubble.chancePercent >= 100 ? "Guaranteed" : `${precise(bubble.chancePercent)}%`}</Text></TableCell>
                </TableRow>)}</TableBody>
            </Table>
        </Box>
    </Box>;
}

export function BrewingDisplay({ alchemy, players }: { alchemy: Alchemy; players: Player[] }) {
    const small = useContext(ResponsiveContext) === "small";
    const firstBrewerId = alchemy.cauldrons[0]?.bestBrewerPreview.playerId;
    const sameBrewer = alchemy.cauldrons.every(cauldron => cauldron.bestBrewerPreview.playerId === firstBrewerId);
    const commonBrewer = sameBrewer ? players.find(player => player.playerID === firstBrewerId) : undefined;
    const brewerInstruction = sameBrewer
        ? commonBrewer
            ? `Best brewer: ${commonBrewer.playerName}. Use this character when you click Brew.`
            : "No eligible brewer."
        : `Best brewers: ${alchemy.cauldrons.map(cauldron => {
            const brewer = players.find(player => player.playerID === cauldron.bestBrewerPreview.playerId);
            return `${cauldron.name}: ${brewer ? brewer.playerName : "No eligible brewer"}`;
        }).join("; ")}. Use these characters when you click Brew.`;
    return <Box gap="small">
        <Box gap="xxsmall">
            <Text size="small">{brewerInstruction}{" "}
                Speed uses saved assignments and account context; live speed can differ.</Text>
            <Text size="xsmall" color="accent-2">Bubble Breakthrough sets the chance. Unlock estimates include fractional unlocks.</Text>
        </Box>
        {alchemy.cauldrons.map(cauldron => {
            const preview = cauldron.bestBrewerPreview;
            const attemptValue = <Text size="small">{amount(cauldron.attemptProgress)} / {amount(cauldron.brewRequirement)} points</Text>;
            return <DataRow key={cauldron.short_name}
                columns={["minmax(0, 1fr)"]}
                fields={[{ key: "overview", kind: "content", label: null, content: <Box
                    direction={small ? "column" : "row"} gap="medium" align={small ? "start" : "center"}>
                    <Box direction="row" gap="small" align="center" flex={false} width="small">
                        <IconImage data={cauldron.getImageData()} />
                        <Text size="small" weight="bold">{cauldron.name}</Text>
                    </Box>
                    <Box flex={false} width="xsmall">
                        <TextAndLabel label="Ready attempts" text={commaNotation(cauldron.readyAttempts)}
                            textSize="large" labelSize="xsmall" />
                    </Box>
                    <Box direction="row" gap="medium" wrap>
                        <TextAndLabel label="Best-brewer chance"
                            text={preview.chancePercent >= 100 ? "Guaranteed" : `${precise(preview.chancePercent)}%`}
                            textSize="small" labelSize="xsmall" />
                        <TextAndLabel label="Estimated unlocks" text={precise(preview.estimatedUnlocks)}
                            textSize="small" labelSize="xsmall" />
                    </Box>
                </Box> }]}
                details={[{ key: "progress-and-upgrades", label: null, content: <Box gap="xsmall">
                    <Grid columns={small ? ["minmax(0, 1fr)"] : ["minmax(0, 1.2fr)", "minmax(0, 1.6fr)"]} gap="medium">
                        <Box direction={small ? "column" : "row"} gap="medium">
                            <Box gap="xxsmall">
                                <Text size="xsmall" color="accent-2">Next attempt</Text>
                                <Box tabIndex={0}>{attemptValue}</Box>
                            </Box>
                            <TextAndLabel label="Estimated brew speed" text={`${amount(cauldron.brewSpeed)} points / hour`}
                                textSize="small" labelSize="xsmall" />
                        </Box>
                        <Box gap="xxsmall">
                            <Text size="xsmall" color="accent-2">Boost upgrades</Text>
                            <Grid columns={small ? ["minmax(0, 1fr)", "minmax(0, 1fr)"] : { count: 4, size: "flex" }} gap="small">
                                {cauldron.boosts.map((boost, index) => {
                                    const maxed = boost.level >= boost.maxLevel;
                                    const savedXP = <Text size="xsmall" color="accent-2">
                                        {amount(boost.progress)} / {amount(boost.requirement)} brew points
                                    </Text>;
                                    const exactXPDetail = Number(amount(boost.progress)) !== boost.progress
                                        || Number(amount(boost.requirement)) !== boost.requirement;
                                    return <Box key={boostNames[index]} gap="xxsmall">
                                        <Text size="small">{boostNames[index]} {boost.level} / {boost.maxLevel}</Text>
                                        {maxed ? <Text size="xsmall" color="accent-2">Maxed</Text>
                                            : exactXPDetail ? <TipDisplay heading={`${boostNames[index]} exact saved XP`}
                                                body={`${boost.progress} / ${boost.requirement} brew points`}>
                                                <Box tabIndex={0} style={{ cursor: "help" }}>{savedXP}</Box>
                                            </TipDisplay> : savedXP}
                                    </Box>;
                                })}
                            </Grid>
                        </Box>
                    </Grid>
                    <NextBubbles cauldron={cauldron} />
                </Box> }]}
            />;
        })}
    </Box>;
}

export function LiquidsDisplay({ alchemy }: { alchemy: Alchemy }) {
    const small = useContext(ResponsiveContext) === "small";
    return <Box gap="small">
        {alchemy.liquids.map(liquid => <DataRow key={liquid.liquidIndex}
            columns={small ? ["minmax(0, 1fr)"] : [
                "minmax(0, 1.2fr)", "minmax(0, 1.4fr)", "minmax(0, 1.2fr)",
                "minmax(0, 1.2fr)", "minmax(0, 1.4fr)",
            ]}
            fields={[
                { key: "identity", kind: "identity", name: liquid.name, artwork: <IconImage data={liquid.getImageData()} /> },
                { key: "amount", kind: "content", label: "Saved amount / capacity", content: <AmountPair
                    current={liquid.amount} requirement={liquid.capacity} heading={`${liquid.name} exact amount / capacity`} /> },
                ...([{ name: "Capacity", upgrade: liquid.capacityUpgrade }, { name: "Rate", upgrade: liquid.rateUpgrade }]).map(({ name, upgrade }) => ({
                    key: name, kind: "content" as const, label: name, content: <Box gap="xxsmall">
                        <Box direction="row" gap="xsmall" align="baseline">
                            <Text size="small">Lv. {commaNotation(upgrade.level)}</Text>
                        </Box>
                        <AmountPair current={upgrade.progress} requirement={upgrade.requirement}
                            heading={`${name} exact saved progress`} unit="points" color={upgrade.readyToRegister ? "green-1" : "accent-2"} />
                    </Box>,
                })),
                { key: "assignments", kind: "content", label: "Assigned characters", content: <Box gap="xxsmall">
                    <Text size="small">{liquid.assignedPlayers.length > 0 ? liquid.assignedPlayers.map(player => player.playerName).join(", ") : "—"}</Text>
                    <Text size="xsmall" color="accent-2">Dragonic: {liquid.dragonic ? "Active" : "Inactive"}</Text>
                </Box> },
            ]}
        />)}
    </Box>;
}
