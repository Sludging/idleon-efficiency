import { useState } from "react";
import { Box, Grid, Text } from "grommet";
import { getCompanionActiveBonus, type Companion } from "../../../data/domain/companions";
import type { Divinity } from "../../../data/domain/world-5/divinity";
import type { CosmoUpgrade, Hole, PocketDivinityUpgrade } from "../../../data/domain/world-5/hole/hole";
import { CosmoTypeEnum } from "../../../data/domain/enum/cosmoTypeEnum";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { LocalTip, exact, hasMissingValue, number, purpose, readable, usePreservedScroll } from "./upgradeInspection";

function Pocket({ row, divinity, companions }: { row: PocketDivinityUpgrade; divinity: Divinity; companions: Companion[] }) {
    const doot = getCompanionActiveBonus(companions, 0) > 0;
    const amount = row.getDootAllStatPercent();
    const owned = row.level > 0;
    return <Box data-doot={String(doot)} gap="xsmall">
        {!owned && <Text size="14px">{purpose(row.data.desc)}</Text>}
        {doot && <Box gap="xxsmall">
            <Text size="small" weight={500}>+{number(amount)}% All Stat</Text>
            <Text size="12px" color="accent-2">Divinity Lv. 2+</Text>
        </Box>}
        {!doot && [0, 1].map(slot => {
            const selected = row.selections.find(selection => selection.slot === slot);
            const god = selected ? divinity.gods.find(god => god.index === selected.godId) : undefined;
            const missingBonus = god !== undefined && hasMissingValue(god.data.majorBonus);
            const bonus = god === undefined ? null : missingBonus
                ? purpose(god.data.majorBonus.split(" @ ").filter(part => !part.includes("#")).join(" @ ")).replace(/:\s*·/g, ". ·")
                : readable(god.data.majorBonus);
            return <Box key={slot} data-pocket-slot={slot} direction="row" align="center" gap="small">
                {god && <IconImage data={god.getImageData()} scale={0.3} />}
                <Box gap="xxsmall">
                    <Text size="small">{god ? readable(god.data.name) : "Saved selection unavailable"}{selected && !selected.active ? " · Inactive" : ""}</Text>
                    {bonus && <Text size="12px">{bonus}</Text>}
                    {missingBonus && <Text size="12px">Major-bonus amount and Bubble selection unavailable.</Text>}
                </Box>
            </Box>;
        })}
    </Box>;
}

function MajikCard({ row, hole, divinity, companions }: { row: CosmoUpgrade; hole: Hole; divinity: Divinity; companions: Companion[] }) {
    const prerequisite = row.prerequisiteId === null ? null : hole.majiks.upgrades.find(upgrade => upgrade.index === row.prerequisiteId);
    const finalCap = row.level >= 1 + row.data.maxEnhance;
    const enhancementGate = row.level >= row.currentCap && !row.enhancementAllowed && !finalCap;
    const prerequisiteBlocked = row.prerequisiteMet === false && prerequisite !== undefined;
    const next = row.level < row.currentCap && row.access && row.prerequisiteMet;
    const points = hole.majiks.remainingPoints;
    const pointState = points >= row.pointsRequired ? "sufficient" : "insufficient";
    const owned = row.level > 0;
    const rawDescription = owned ? row.getDescription() : row.data.desc;
    const missingEffect = owned && hasMissingValue(rawDescription);
    const description = owned && !missingEffect ? readable(rawDescription) : purpose(rawDescription);
    const pocket = row.index === hole.majiks.pocketDivinity.index;
    return <ShadowBox data-majik={row.index} background="dark-1" pad="small" gap="xsmall" style={{ minWidth: 0 }}>
        <Box direction="row" gap="small" align="baseline" wrap>
            <Text size="14px" weight={500}>{row.name}</Text>
            <Text size="12px" color="accent-2">Lv. {number(row.level)} / {number(row.currentCap)}</Text>
        </Box>
        {pocket
            ? <Pocket row={hole.majiks.pocketDivinity} divinity={divinity} companions={companions} />
            : <Text data-majik-effect size="14px">{description}</Text>}
        {!pocket && missingEffect && <Text size="12px">Benefit unavailable</Text>}
        {!row.access && !prerequisiteBlocked && !enhancementGate && <Text size="12px">Locked</Text>}
        {prerequisiteBlocked && prerequisite && <Text size="12px">Requires {prerequisite.name}</Text>}
        {enhancementGate && <Text size="12px">Cosmo, Enhance! required</Text>}
        {next && <Text data-point-cost data-point-state={pointState} size="12px" color={pointState === "sufficient" ? "green-2" : "status-critical"}>
            {number(row.pointsRequired)} point{row.pointsRequired === 1 ? "" : "s"}
        </Text>}
    </ShadowBox>;
}

export default function Majik({ hole, divinity, companions }: { hole: Hole; divinity: Divinity; companions: Companion[] }) {
    const [tree, setTree] = useState(CosmoTypeEnum.Hole);
    const { ref, minHeight, preserveScroll } = usePreservedScroll();
    const trees = { [CosmoTypeEnum.Hole]: hole.majiks.HoleUpgrades, [CosmoTypeEnum.Village]: hole.majiks.VillageUpgrades, [CosmoTypeEnum.Idleon]: hole.majiks.IdleonUpgrades };
    return <Box gap="small" ref={ref} style={{ minHeight }}>
        <Box><LocalTip heading="Shared Majik points" body={<>
            <Text size="small">Invested: {exact(hole.majiks.investedPoints)}</Text>
            <Text size="small">Purchased extra points: {exact(hole.majiks.purchasedPoints)} (included in earned points)</Text>
        </>}><Text size="small">{number(hole.majiks.remainingPoints)} / {number(hole.majiks.earnedPoints)} points remaining</Text></LocalTip></Box>
        <Box>
            <ContentTabs<CosmoTypeEnum> options={Object.values(CosmoTypeEnum).map(value => ({ value, label: value }))} value={tree} onChange={value => preserveScroll(() => setTree(value))} />
        </Box>
        <Grid data-card-grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{trees[tree].map(row => <MajikCard key={row.index} row={row} hole={hole} divinity={divinity} companions={companions} />)}</Grid>
    </Box>;
}
