import { Box, Button, CheckBox, Grid, ResponsiveContext, Select, Text, ThemeContext, Tip } from "grommet";
import { Grid as GridIcon, List } from "grommet-icons";
import { useContext, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Player, TalentTab } from "../../data/domain/player";
import { ClassTalentMap, GetTalentArray, Talent } from "../../data/domain/talents";
import { getTalentSourceGroups, TalentBonusSource } from "../../data/domain/talentSources";
import { Construction } from "../../data/domain/world-3/construction/construction";
import { LegendTalents } from "../../data/domain/world-7/legendTalents";
import { notateNumber } from "../../data/utility";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { UpgradeTable } from "../account/shared/UpgradeTable";
import type { FilterOptions } from "../account/shared/UpgradeTableFilters";
import IconImage from "../base/IconImage";
import TextAndLabel from "../base/TextAndLabel";

const focusOptions = ["All talents", "Super Talents", "Fully booked", "Can book higher", "No points spent"] as const;
type Focus = typeof focusOptions[number];
type TalentRow = { id: number; talent: Talent; page: string; order: number };

function TalentSourceRows({ sources }: { sources: readonly TalentBonusSource[] }) {
    return <Box gap="xxsmall">
        {sources.map(source => {
            const value = source.active ? source.value : source.obtainableValue ?? source.value;
            return <Text key={source.name} size="xsmall" style={{ opacity: source.active ? 1 : 0.6 }}>
                {source.name}: {value >= 0 ? "+" : ""}{notateNumber(value, "Smaller")}{!source.active && source.basis ? ` ${source.basis}` : ""}
            </Text>;
        })}
    </Box>;
}

function matchesFocus(talent: Talent, focus: Focus): boolean {
    switch (focus) {
        case "Super Talents": return talent.isSupered;
        case "Fully booked": return talent.isFullyBooked();
        case "Can book higher": return talent.canBookHigher();
        case "No points spent": return talent.pointsSpent === 0;
        default: return true;
    }
}

function TalentTip({ talent, children }: { talent: Talent; children: React.ReactNode }) {
    return <Tip plain content={<Box pad="small" gap="xsmall" background="white" width={{ max: "medium" }}>
        <Text weight="bold" size="small">{talent.name}</Text>
        <Text size="small">{talent.getBonusText()}</Text>
        <Text size="small">Points spent: {talent.pointsSpent}</Text>
        <Text size="small">Level / max level: {talent.level} / {talent.maxLevel}</Text>
        <Text size="small">Book level: {talent.bookMaxLevel}</Text>
        <Text size="small">Max book level: {talent.libraryMaxLevel ?? "-"}</Text>
        <Text size="small">Super Talent: {talent.isSupered ? "Selected" : "Not selected"}</Text>
    </Box>} dropProps={{ align: { top: "bottom" } }}>{children}</Tip>;
}


export default function TalentDisplay({ player }: { player: Player }) {
    const size = useContext(ResponsiveContext);
    const { theData } = useAppDataStore(useShallow(state => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })));
    const legendTalents = theData.get("legendTalents") as LegendTalents | undefined;
    const construction = theData.get("construction") as Construction;
    const [view, setView] = useState<"grid" | "table">("grid");
    const [focus, setFocus] = useState<Focus>("All talents");
    const [showBookCap, setShowBookCap] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>({ hideLocked: false, hideMaxed: false, searchText: "", sortBy: "default" });

    if (!legendTalents || !construction) {
        return <Box pad="medium">Talent data is not ready.</Box>;
    }

    const classPages = ClassTalentMap[player.classId];
    const pages = [...classPages, ...Array.from({ length: 5 }, (_, index) => `Special Talent ${index + 1}`)];
    const talentByIndex = new Map(player.talents.map(talent => [talent.skillIndex, talent]));
    let order = 0;
    const pageRows = pages.map(page => ({
        page,
        slots: GetTalentArray(page).map(original => {
            const talent = talentByIndex.get(original.skillIndex);
            return talent ? { id: talent.skillIndex, talent, page, order: order++ } : undefined;
        })
    })).filter(({ page, slots }) => classPages.includes(page) || slots.some(Boolean));
    const allRows = pageRows.flatMap(page => page.slots.filter((row): row is TalentRow => row !== undefined));
    const checkoutSummary = focus === "Can book higher"
        ? construction.library.getBookCheckoutSummary(allRows.map(({ talent }) => talent))
        : undefined;
    const search = filters.searchText.trim().toLowerCase();
    const rows = allRows.filter(({ talent, page }) => !search || `${talent.name} ${page} ${talent.getBonusText()}`.toLowerCase().includes(search));
    rows.sort((a, b) => {
        switch (filters.sortBy) {
            case "level": return b.talent.level - a.talent.level || a.order - b.order;
            case "allocated": return b.talent.pointsSpent - a.talent.pointsSpent || a.order - b.order;
            case "booking": {
                const aGap = a.talent.libraryMaxLevel === undefined ? -1 : Math.max(0, a.talent.libraryMaxLevel - a.talent.bookMaxLevel);
                const bGap = b.talent.libraryMaxLevel === undefined ? -1 : Math.max(0, b.talent.libraryMaxLevel - b.talent.bookMaxLevel);
                return bGap - aGap || a.order - b.order;
            }
            default: return a.order - b.order;
        }
    });
    const inputs = player.currentTalentInputs;
    const sources = getTalentSourceGroups(theData, player);
    const ordinaryTalent = allRows.find(({ talent }) => talent.skillIndex >= 0 && talent.skillIndex < 49)?.talent;
    const bonusLevels = ordinaryTalent?.getExtraLevels(inputs, false) ?? 0;
    const specialPoints = player.talentPoints.find(points => points.tab === TalentTab.SpecialTab);
    const specialTalents = pageRows.filter(({ page }) => !classPages.includes(page))
        .flatMap(({ slots }) => slots.flatMap(row => row ? [row.talent] : []));
    const specialProgress = player.getTalentPageProgress(specialTalents);
    const isHighlighted = (talent: Talent) => focus !== "All talents" && matchesFocus(talent, focus);
    const highlightedCount = rows.filter(({ talent }) => isHighlighted(talent)).length;
    const columns = [
        { property: "talent", header: "Talent / page", render: ({ talent, page }: TalentRow) => <TalentTip talent={talent}><Box className={isHighlighted(talent) ? "talent-highlight" : undefined} direction="row" align="center" gap="xsmall"><IconImage data={talent.getImageData()} scale={0.5} /><Box><Text size="small">{talent.name}</Text><Text size="xsmall" color="accent-2">{page}{talent.isSupered ? " · Super" : ""}</Text></Box></Box></TalentTip> },
        { property: "level", header: showBookCap ? "Level / book level" : "Level / max level", render: ({ talent }: TalentRow) => <Text size="small">{talent.level} / {showBookCap ? talent.bookMaxLevel : talent.maxLevel}</Text> },
        { property: "effect", header: "Current effect", render: ({ talent }: TalentRow) => <Text size="small">{talent.getBonusText()}</Text> }
    ];

    return <Box pad="medium" gap="medium">
        <Text size="medium">Talents</Text>
        <Box direction="row" wrap gap="large" align="start">
            {legendTalents.superTalentUnlocked ? <Box direction="row" wrap gap="medium">
                <TextAndLabel
                    label="Super talents"
                    text={`${player.superTalentPoints.remaining}/${player.superTalentPoints.total}`}
                    tooltip={<Box gap="xxsmall">
                        <TalentSourceRows sources={sources.points} />
                        <Text size="xsmall">Limit: 20 points.</Text>
                    </Box>}
                />
                <TextAndLabel
                    label="Super Talent bonus"
                    text={`+${inputs.superTalentLevels} levels`}
                    tooltip={<TalentSourceRows sources={sources.superLevels} />}
                />
            </Box> : <Text size="small">Super Talents Locked</Text>}
            <TextAndLabel label="Bonus talent levels" text={`+${bonusLevels}`} tooltip={<Box gap="xxsmall">
                <TalentSourceRows sources={sources.ordinaryLevels} />
                <Text size="xsmall">Total rounded down.</Text>
            </Box>} />
            <TextAndLabel label="Max book level" text={`${construction.library.maximumBookLevel}`} />
        </Box>
        <Box direction="row" gap="small" wrap align="center">
            <Text size="small">Highlight:</Text>
            <Select aria-label="Highlight" value={focus} options={focusOptions.slice()} onChange={({ option }) => setFocus(option)} />
            {focus !== "All talents" && <Text size="small">{view === "table" ? highlightedCount : allRows.filter(({ talent }) => isHighlighted(talent)).length} matching</Text>}
            <CheckBox checked={showBookCap} onChange={event => setShowBookCap(event.target.checked)} label="Show book level" />
            <Box direction="row" align="center" gap="small" margin={{ left: "auto" }}>
                <Text size="small">View:</Text>
                <Box direction="row" background="dark-2" round="small" pad="xsmall" gap="xsmall">
                    <Button plain aria-label="Grid view" aria-pressed={view === "grid"} onClick={() => setView("grid")}><Box pad="xsmall" round="xsmall" background={view === "grid" ? "brand" : "transparent"}><GridIcon size="small" /></Box></Button>
                    <Button plain aria-label="Table view" aria-pressed={view === "table"} onClick={() => setView("table")}><Box pad="xsmall" round="xsmall" background={view === "table" ? "brand" : "transparent"}><List size="small" /></Box></Button>
                </Box>
            </Box>
        </Box>
        {checkoutSummary && <Box direction="row" align="center" gap="small">
            <IconImage data={construction.library.getImageData()} />
            <TextAndLabel
                label="Library checkouts"
                text={`${construction.library.currentBooks}/${checkoutSummary.requiredCheckouts}`}
                tooltip={<Box gap="xsmall">
                    <Text size="small">Required to max out all talents assuming 20 checkouts per max-level book.</Text>
                    {checkoutSummary.vipTalentsToBook > 0 && <Text size="small">
                        Excludes {checkoutSummary.vipTalentsToBook} VIP {checkoutSummary.vipTalentsToBook === 1 ? "talent" : "talents"}.
                        {" "}VIP books roll random levels.
                    </Text>}
                </Box>}
            />
        </Box>}
        {view === "grid" ? <Box gap="medium">
            <Text size="xsmall" color="accent-2">Level / {showBookCap ? "book level" : "max level"}</Text>
            {pageRows.map(({ page, slots }, pageIndex) => {
                const isSpecial = !classPages.includes(page);
                const progress = isSpecial ? specialProgress : player.getTalentPageProgress(slots.flatMap(row => row ? [row.talent] : []));
                const points = isSpecial ? specialPoints : player.talentPoints[pageIndex];
                const showPoints = points && !progress.isMaxed && (!isSpecial || pageIndex === classPages.length);
                return <Box key={page} align="center" gap="small">
                    <Text>{page}</Text>
                    {showPoints && <Text size="xsmall" color="accent-2">Talents: {points.totalOwned}/{progress.pointsRequiredToMax}</Text>}
                    <Grid columns={{ count: 5, size: "20%" }} fill>
                        {slots.map((row, index) => row ? <TalentTip key={row.talent.skillIndex} talent={row.talent}>
                            <Box pad="xxsmall" direction={size === "small" ? "column" : "row"} gap="xxsmall" align="center" background={isHighlighted(row.talent) ? "#294665" : undefined}>
                                <IconImage data={row.talent.getImageData()} scale={size === "small" ? 0.5 : 0.8} />
                                <Text size={size === "small" ? "xsmall" : "small"}>{row.talent.level} / {showBookCap ? row.talent.bookMaxLevel : row.talent.maxLevel}</Text>
                            </Box>
                        </TalentTip> : <Box key={`empty-${index}`} />)}
                    </Grid>
                </Box>;
            })}
        </Box> : <ThemeContext.Extend value={{
            dataTable: {
                body: {
                    row: {
                        extend: `
            &:has(.talent-highlight) > td { background: #294665; }
        ` }
                }
            }
        }}>
            <UpgradeTable tableName="Talents" columns={columns} data={rows} primaryKey="id" filters={filters} onFiltersChange={setFilters}
                sortOptions={[{ label: "In-game order", value: "default" }, { label: "Level: high to low", value: "level" }, { label: "Points spent: high to low", value: "allocated" }, { label: "Most book levels to gain", value: "booking" }]}
                searchPlaceholder="Search talents" emptyMessage="No talents match your search." minWidth="680px" variant="panel" showLockedAndMaxedFilters={false} />
        </ThemeContext.Extend>}
    </Box>;
}
