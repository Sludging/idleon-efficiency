'use client';

import { Box, CheckBox, Heading, Select, Table, TableBody, TableCell, TableHeader, TableRow, Text } from "grommet";
import { useState } from "react";
import type { Gaming } from "../../../data/domain/world-5/gaming";
import type { PaletteColor } from "../../../data/domain/world-5/gaming/palette";
import { Menagerie } from "../../../data/domain/menagerie";
import { commaNotation, notateNumber } from "../../../data/utility";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import { DoublerBadge, DoublerSummary } from "../../base/DoublerStatus";

const colorFilters = ["All colors", "Unlocked colors", "Locked colors"];
const colorSorts = ["Game order", "Name A–Z", "Name Z–A", "Level high–low", "Level low–high"];

function formatBonus(color: PaletteColor): string {
    return color.bonusText
        .replace("{", commaNotation(color.bonus))
        .replace("#", `${Math.floor(100 * color.bonus) / 100}`)
        .replace("}", notateNumber(1 + color.bonus / 100, "MultiplierInfo").replace("#", ""));
}

function formatChance(probability: number): string {
    return `${(100 * probability).toLocaleString(undefined, { maximumSignificantDigits: 3 })}%`;
}

function ColorName({ color }: { color: PaletteColor }) {
    const blackStarState = color.getBlackStarState();

    return (
        <Box direction="row" gap="small" align="center">
            <Box
                width="16px"
                height="16px"
                flex={false}
                background={`rgb(${color.red}, ${color.green}, ${color.blue})`}
                aria-hidden="true"
            />
            <Box gap="small" direction="row" align="center">
                <Text size="small">{color.name}</Text>
                {blackStarState > 0 && (
                    <DoublerBadge
                        image={color.getBlackStarImageData()}
                        label={blackStarState === 2 ? "Two Black Stars applied" : "Black Star applied"}
                    />
                )}
            </Box>
        </Box>
    );
}

export function GamingPalette({ gaming, menagerie }: { gaming: Gaming; menagerie: Menagerie }) {
    const [colorFilter, setColorFilter] = useState("All colors");
    const [equippedOnly, setEquippedOnly] = useState(false);
    const [sort, setSort] = useState("Game order");
    const [plantStage, setPlantStage] = useState(1);
    const palette = gaming.palette;
    const balances = menagerie.getResourceBalances();
    const equippedColors = gaming.paletteColors
        .filter(color => color.equipped)
        .sort((left, right) => left.equippedSlot! - right.equippedSlot!);
    const visibleColors = gaming.paletteColors.filter(color => {
        if (colorFilter === "Unlocked colors" && !color.unlocked) return false;
        if (colorFilter === "Locked colors" && color.unlocked) return false;
        return !equippedOnly || color.equipped;
    });

    if (sort === "Name A–Z") {
        visibleColors.sort((left, right) => left.name.localeCompare(right.name));
    } else if (sort === "Name Z–A") {
        visibleColors.sort((left, right) => right.name.localeCompare(left.name));
    } else if (sort === "Level high–low") {
        visibleColors.sort((left, right) => right.level - left.level || left.index - right.index);
    } else if (sort === "Level low–high") {
        visibleColors.sort((left, right) => left.level - right.level || left.index - right.index);
    }

    return (
        <Box gap="medium">
            {gaming.level < 150 && <Text size="small">Reach Gaming level 150 to unlock Palette.</Text>}
            <Box direction="row" gap="large" wrap>
                <TextAndLabel
                    label="Palette mode"
                    text={palette.active ? "On" : "Off"}
                    textSize="small"
                    tooltip="Palette mode gives 100x Bits and slows growth 100x. Change the mode in game."
                />
                <TextAndLabel
                    label="Palette Luck"
                    text={`${notateNumber(palette.bonusLuck, "MultiplierInfo").replace("#", "")}x`}
                    textSize="small"
                />
                <TextAndLabel label="Total color levels" text={commaNotation(palette.totalLevels)} textSize="small" />
                <DoublerSummary
                    label="Black Stars"
                    owned={balances.blackStarsOwned}
                    available={balances.blackStarsAvailable}
                    image={Menagerie.getUsableResourceImageData("blackStarsOwned")}
                    description="Black Stars double a color's bonus. A second Black Star doubles it again."
                />
            </Box>
            <Box as="section" aria-label="Equipped colors" background="dark-1" pad="medium" gap="small">
                <Box direction="row" align="center" gap="medium" wrap>
                    <Heading level={3} size="small" margin="none">Equipped colors</Heading>
                    <Text size="small" color="accent-2">{equippedColors.length} / {palette.slotLimit} equipped</Text>
                </Box>
                <Text size="small" color="accent-2">Equipped colors affect new plants. Earned bonuses stay active when unequipped.</Text>
                {equippedColors.length === 0 ? (
                    <Text size="small">No colors equipped. Select colors in game to color new plants.</Text>
                ) : equippedColors.map(color => (
                    <Box key={color.index} direction="row" gap="medium" align="center" wrap>
                        <Box width="220px" flex={false}><ColorName color={color} /></Box>
                        <Text size="small">Level {color.level}</Text>
                        <Text size="small">{formatBonus(color)}</Text>
                    </Box>
                ))}
            </Box>
            <Box direction="row" align="end" gap="medium" wrap>
                <ComponentAndLabel
                    label="Colors"
                    component={
                        <Select
                            aria-label="Colors"
                            options={colorFilters}
                            value={colorFilter}
                            onChange={({ option }) => setColorFilter(option)}
                            size="small"
                        />
                    }
                />
                <ComponentAndLabel
                    label="Sort"
                    component={
                        <Select
                            aria-label="Sort"
                            options={colorSorts}
                            value={sort}
                            onChange={({ option }) => setSort(option)}
                            size="small"
                        />
                    }
                />
                <ComponentAndLabel
                    label="Plant stage"
                    component={
                        <Select
                            aria-label="Plant stage"
                            options={Array.from({ length: gaming.garden.maximumStage }, (_, index) => index + 1)}
                            value={plantStage}
                            onChange={({ option }) => setPlantStage(option)}
                            size="small"
                        />
                    }
                />
                <Box pad={{ bottom: "small" }}>
                    <CheckBox
                        label="Equipped only"
                        checked={equippedOnly}
                        onChange={event => setEquippedOnly(event.target.checked)}
                    />
                </Box>
            </Box>
            <Box direction="row" gap="medium" wrap>
                <Text size="small" color="accent-2">Showing {visibleColors.length} / {gaming.paletteColors.length} colors</Text>
                <TipDisplay
                    heading="Palette chances"
                    body="Chances include your Palette Luck and the selected plant stage. Each chance applies to an eligible colored plant harvest."
                    maxWidth="300px"
                >
                    <Text size="small" color="accent-2">Chance per eligible harvest at stage {plantStage}</Text>
                </TipDisplay>
            </Box>
            {visibleColors.length === 0 ? (
                <Box background="dark-1" pad="medium">
                    <Text size="small">No colors match these filters. Select All colors or turn off Equipped only.</Text>
                </Box>
            ) : (
                <Table style={{ tableLayout: "fixed", width: "100%" }}>
                    <TableHeader>
                        <TableRow>
                            <TableCell scope="col" size="22%"><Text size="small" weight="bold">Color</Text></TableCell>
                            <TableCell scope="col" size="8%"><Text size="small" weight="bold">Level</Text></TableCell>
                            <TableCell scope="col" size="40%"><Text size="small" weight="bold">Earned bonus</Text></TableCell>
                            <TableCell scope="col" size="15%"><Text size="small" weight="bold">Unlock chance</Text></TableCell>
                            <TableCell scope="col" size="15%"><Text size="small" weight="bold">Level-up chance</Text></TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visibleColors.map(color => (
                            <TableRow
                                key={color.index}
                                aria-label={color.name}
                                style={{ opacity: color.unlocked ? 1 : 0.7 }}
                            >
                                <TableCell background={color.unlocked ? "dark-1" : "dark-2"}>
                                    <Box gap="small" direction="row" align="center">
                                        <ColorName color={color} />
                                        {color.equipped && <Text size="xsmall" color="accent-2">Equipped</Text>}
                                    </Box>
                                </TableCell>
                                <TableCell background={color.unlocked ? "dark-1" : "dark-2"}>
                                    <Text size="small">{color.level}</Text>
                                </TableCell>
                                <TableCell background={color.unlocked ? "dark-1" : "dark-2"}>
                                    <Text size="small">{formatBonus(color)}</Text>
                                </TableCell>
                                <TableCell background={color.unlocked ? "dark-1" : "dark-2"}>
                                    <Text size="small">{color.unlocked ? "—" : formatChance(color.getUnlockProbability(plantStage))}</Text>
                                </TableCell>
                                <TableCell background={color.unlocked ? "dark-1" : "dark-2"}>
                                    <Text size="small">{color.unlocked ? formatChance(color.getLevelUpProbability(plantStage)) : "—"}</Text>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </Box>
    );
}
