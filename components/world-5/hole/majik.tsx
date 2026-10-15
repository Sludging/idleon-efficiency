import { useState } from "react";
import { Box, Grid, Text } from "grommet";
import type { Divinity } from "../../../data/domain/world-5/divinity";
import type { CosmoUpgrade, Hole } from "../../../data/domain/world-5/hole/hole";
import { CosmoTypeEnum } from "../../../data/domain/enum/cosmoTypeEnum";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { LocalTip, exact, hasMissingValue, number, purpose, readable, usePreservedScroll } from "./upgradeInspection";

function Pocket({ hole, divinity }: { hole: Hole; divinity: Divinity }) {
    return <Box gap="small">{[0, 1].map(slot => {
        const selection = hole.majiks.pocketDivinity.selections.find(row => row.slot === slot);
        const god = selection ? divinity.gods.find(row => row.index === selection.godId)! : null;
        const missingBonus = god !== null && hasMissingValue(god.data.majorBonus);
        const bonus = god === null ? null : missingBonus
            ? purpose(god.data.majorBonus.split(" @ ").filter(part => !part.includes("#")).join(" @ ")).replace(/:\s*·/g, ". ·")
            : readable(god.data.majorBonus);
        return <Box key={slot} direction="row" gap="small" align="center">
            {god && <IconImage data={god.getImageData()} scale={0.35} />}
            <Box gap="xxsmall">
                <Text size="small">Slot {slot + 1}: {god ? readable(god.data.name) : "Saved selection unavailable"}{selection ? selection.active === null ? " · Activation unavailable" : selection.active ? "" : " · Inactive" : ""}</Text>
                {bonus && <Text size="xsmall">{bonus}</Text>}
                {missingBonus && <Text size="xsmall">Major-bonus amount and Bubble selection unavailable.</Text>}
            </Box>
        </Box>;
    })}</Box>;
}

function MajikCard({ upgrade, hole, divinity }: { upgrade: CosmoUpgrade; hole: Hole; divinity: Divinity }) {
    const prerequisite = upgrade.prerequisiteId === null ? null : hole.majiks.upgrades.find(row => row.index === upgrade.prerequisiteId)!;
    const maxed = upgrade.saveAvailable && upgrade.level >= 1 + upgrade.data.maxEnhance;
    const enhancementGate = upgrade.saveAvailable && upgrade.currentCap !== null && upgrade.level >= upgrade.currentCap && !maxed;
    const shortfall = hole.majiks.remainingPoints === null ? null : Math.max(0, upgrade.pointsRequired - hole.majiks.remainingPoints);
    const owned = upgrade.saveAvailable && upgrade.level > 0;
    const description = owned ? upgrade.getDescription() : upgrade.data.desc;
    const missingEffect = owned && hasMissingValue(description);
    return <ShadowBox background="dark-1" pad="medium" gap="small" style={{ minWidth: 0 }}>
        <Box direction="row" gap="small" align="center" wrap>
            <Text size="small">{upgrade.name}</Text>
            <LocalTip heading={upgrade.name} body={<>
                <Text size="small">Initial investment: {number(upgrade.saveAvailable ? upgrade.initialLevel : null)} point. Enhancement investment: {number(upgrade.saveAvailable ? upgrade.enhancementLevel : null)} points.</Text>
                <Text size="small">Full cap: 1 initial + {upgrade.data.maxEnhance} enhancements.</Text>
                {prerequisite && <Text size="small">Requires {prerequisite.name}: {upgrade.prerequisiteMet === null ? "Unavailable" : upgrade.prerequisiteMet ? "Met" : "Not met"}.</Text>}
                <Text size="small">Access: {upgrade.access === null ? "Unavailable" : upgrade.access ? "Available" : "Locked"}.</Text>
                {upgrade.data.maxEnhance > 0 && <Text size="small">Cosmo, Enhance!: {upgrade.enhancementAllowed === null ? "Unavailable" : upgrade.enhancementAllowed ? "Enabled" : "Required for enhancements"}.</Text>}
            </>}><Text size="small">Lv. {number(upgrade.saveAvailable ? upgrade.level : null)} / {number(upgrade.currentCap)}</Text></LocalTip>
        </Box>
        {upgrade.index === hole.majiks.pocketDivinity.index
            ? <>{!owned && <Text size="small">{purpose(upgrade.data.desc)}</Text>}<Pocket hole={hole} divinity={divinity} /></>
            : <><Text size="small">{owned && !missingEffect ? readable(description) : purpose(description)}</Text>{missingEffect && <Text size="xsmall">Effect value unavailable.</Text>}</>}
        <Text size="xsmall" color="accent-2">
            {!upgrade.saveAvailable ? "Owned level unavailable" : maxed ? "Maxed" : enhancementGate ? "Cosmo, Enhance! required" : upgrade.level === 0 ? "Not owned" : `${upgrade.pointsRequired} point for next level`}
            {upgrade.access === false ? " · Locked" : upgrade.access === null ? " · Access unavailable" : ""}
            {upgrade.prerequisiteMet === false && prerequisite ? ` · Requires ${prerequisite.name}` : ""}
            {!maxed && !enhancementGate ? shortfall === null ? " · Points unavailable" : shortfall > 0 ? ` · Shortfall: ${shortfall} point` : "" : ""}
        </Text>
    </ShadowBox>;
}

export default function Majik({ hole, divinity }: { hole: Hole; divinity: Divinity }) {
    const [tree, setTree] = useState(CosmoTypeEnum.Hole);
    const { ref, minHeight, preserveScroll } = usePreservedScroll();
    const trees = { [CosmoTypeEnum.Hole]: hole.majiks.HoleUpgrades, [CosmoTypeEnum.Village]: hole.majiks.VillageUpgrades, [CosmoTypeEnum.Idleon]: hole.majiks.IdleonUpgrades };
    return <Box gap="small" ref={ref} style={{ minHeight }}>
        <LocalTip heading="Shared Majik points" body={<>
            <Text size="small">Invested: {exact(hole.majiks.investedPoints)}</Text>
            <Text size="small">Purchased extra points: {exact(hole.majiks.purchasedPoints)} (included in earned points)</Text>
        </>}><Text size="small">{number(hole.majiks.remainingPoints)} / {number(hole.majiks.earnedPoints)} points remaining</Text></LocalTip>
        <Box direction="row" gap="small" align="center" justify="center">
            <IconImage data={hole.majiks.getImageData(tree)} scale={0.45} />
            <ContentTabs<CosmoTypeEnum> options={Object.values(CosmoTypeEnum).map(value => ({ value, label: value }))} value={tree} onChange={value => preserveScroll(() => setTree(value))} />
        </Box>
        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{trees[tree].map(upgrade => <MajikCard key={upgrade.index} upgrade={upgrade} hole={hole} divinity={divinity} />)}</Grid>
    </Box>;
}
