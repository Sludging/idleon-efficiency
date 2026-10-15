import { useState } from "react";
import { Box, Grid, Heading, Text } from "grommet";
import type { Divinity } from "../../../data/domain/world-5/divinity";
import type { CosmoUpgrade, Hole } from "../../../data/domain/world-5/hole/hole";
import { CosmoTypeEnum } from "../../../data/domain/enum/cosmoTypeEnum";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import ShadowBox from "../../base/ShadowBox";
import { Description, Disclosure, EffectValues, Values, number, precise, readable, selectStyle, state } from "./upgradeInspection";

function MajikCard({ upgrade, hole }: { upgrade: CosmoUpgrade; hole: Hole }) {
    const prerequisite = upgrade.prerequisiteId === null ? "None" : hole.majiks.upgrades.find(row => row.index === upgrade.prerequisiteId)!.name;
    const atCap = upgrade.currentCap !== null && upgrade.saveAvailable && upgrade.level >= upgrade.currentCap;
    const enoughPoints = hole.majiks.remainingPoints === null ? null : hole.majiks.remainingPoints >= upgrade.pointsRequired;
    return <ShadowBox background="dark-1" pad="medium" gap="small" style={{ minWidth: 0 }}>
        <Box direction="row" gap="small" justify="between" align="center">
            <Text size="small" weight="bold">{upgrade.name}</Text>
            <Text size="small">Level {number(upgrade.saveAvailable ? upgrade.level : null)}</Text>
        </Box>
        <Text size="xsmall" color="accent-2">{!upgrade.saveAvailable ? "Owned level unavailable" : upgrade.level === 0 ? "Purpose — not owned" : "Owned benefit"}</Text>
        <Description value={upgrade.saveAvailable && upgrade.level > 0 ? upgrade.getDescription() : upgrade.data.desc} />
        <Values values={[
            { label: "Initial level", value: number(upgrade.saveAvailable ? upgrade.initialLevel : null) },
            { label: "Enhancement levels", value: number(upgrade.saveAvailable ? upgrade.enhancementLevel : null) },
            { label: "Current cap", value: number(upgrade.currentCap) },
            { label: "Full enhancement cap", value: `1 initial + ${upgrade.data.maxEnhance} enhancements` },
        ]} />
        <Text size="xsmall">Prerequisite: {prerequisite}{upgrade.prerequisiteId === null ? "" : ` · ${state(upgrade.prerequisiteMet, "Met", "Not met")}`}. Access: {state(upgrade.access, "Accessible", "Locked")}.</Text>
        <Text size="xsmall">Enhancement gate — Cosmo, Enhance!: {state(upgrade.enhancementAllowed, "Enabled", "Not enabled")}.</Text>
        <Text size="xsmall">{atCap
            ? upgrade.enhancementAllowed ? "Maxed — no next level." : "At current cap. Cosmo, Enhance! is required for enhancements."
            : `Next level: ${upgrade.pointsRequired} point · ${state(enoughPoints, "Enough points", "Insufficient points")} · ${state(upgrade.canPurchase, "All requirements met", "Requirements not met")}.`}</Text>
        <Disclosure title="Owned effects"><EffectValues effects={upgrade.getEffects()} /></Disclosure>
    </ShadowBox>;
}

function GodSet({ ids, divinity }: { ids: number[] | null; divinity: Divinity }) {
    if (ids === null) return <Text size="small">Unavailable: saved links or Pocket inputs are missing.</Text>;
    if (ids.length === 0) return <Text size="small">None</Text>;
    return <Box direction="row" wrap gap="small">{ids.map(id => {
        const god = divinity.gods.find(god => god.index === id)!;
        return <Box key={id} direction="row" align="center" gap="xsmall"><IconImage data={god.getImageData()} scale={0.35} /><Text size="small">{readable(god.data.name)}</Text></Box>;
    })}</Box>;
}

function Pocket({ hole, divinity }: { hole: Hole; divinity: Divinity }) {
    const [characterId, setCharacterId] = useState("");
    const pocket = hole.majiks.pocketDivinity;
    const character = pocket.characters.find(row => String(row.playerId) === characterId);
    return <Box gap="small" margin={{ top: "medium" }}>
        <Heading level="3" size="small" margin="none">Pocket Divinity</Heading>
        <Text size="small">Saved gods activate once. Ordinary links, Doot, and Pocket do not duplicate the same god benefit.</Text>
        <Text size="small">Upgrade ownership: {pocket.saveAvailable ? pocket.level > 0 ? `Owned · Level ${pocket.level}` : "Not owned" : "Unavailable"}.</Text>
        <Box direction="row" gap="medium" wrap>{[0, 1].map(slot => {
            const selection = pocket.selections.find(selection => selection.slot === slot);
            const god = selection ? divinity.gods.find(god => god.index === selection.godId)! : null;
            return <Box key={slot} direction="row" gap="small" align="center">
                {god && <IconImage data={god.getImageData()} scale={0.5} />}
                <Text size="small">Slot {slot + 1}: {god ? readable(god.data.name) : "Saved selection unavailable"} · {selection ? state(selection.active, "Pocket active", "Pocket inactive") : "Activation unavailable"}</Text>
            </Box>;
        })}</Box>
        {!pocket.selectionSaveAvailable && <Text size="small">Some saved god selections are unavailable.</Text>}
        <Box direction="row" gap="small" align="center">
            <Text size="small">Inspect character</Text>
            <select aria-label="Inspect Pocket character" value={characterId} onChange={event => setCharacterId(event.target.value)} style={selectStyle}>
                <option value="">Choose a character</option>
                {pocket.characters.map(row => <option key={row.playerId} value={row.playerId}>{row.playerName} (Player {row.playerId})</option>)}
            </select>
        </Box>
        <Text size="xsmall" color="accent-2">Inspection does not select the active game character. These records use the imported snapshot.</Text>
        {character && <Box gap="small">
            <Text weight="bold">{character.playerName} · Player {character.playerId}</Text>
            <Values values={[
                { label: "Doot eligibility", value: character.ordinaryLinksAvailable ? character.dootEligible ? "Eligible" : "Not eligible" : "Unavailable" },
                { label: "Pocket activation", value: character.pocketActivationAvailable ? "Available" : "Unavailable" },
                { label: "Pocket All Stat contribution", value: precise(character.ordinaryLinksAvailable ? character.allStatPercent : null, "%") },
            ]} />
            {[
                { label: "Ordinary primary link", ids: !character.ordinaryLinksAvailable ? null : character.primaryGodId === null ? [] : [character.primaryGodId] },
                { label: "Ordinary secondary link", ids: !character.ordinaryLinksAvailable ? null : character.secondaryGodId === null ? [] : [character.secondaryGodId] },
                { label: "Selected active Pocket gods", ids: character.pocketGodIds },
                { label: "Overlapping gods (already active)", ids: character.overlappingGodIds },
                { label: "Added gods", ids: character.addedGodIds },
                { label: "Effective gods", ids: character.effectiveGodIds },
            ].map(group => <Box key={group.label} gap="xxsmall"><Text size="xsmall" color="accent-2">{group.label}</Text><GodSet ids={group.ids} divinity={divinity} /></Box>)}
            <Text size="xsmall">Doot eligibility is character-specific. Pocket All Stat is separate from god activation and imported character stats.</Text>
        </Box>}
    </Box>;
}

export default function Majik({ hole, divinity }: { hole: Hole; divinity: Divinity }) {
    const [tree, setTree] = useState(CosmoTypeEnum.Hole);
    const trees = { [CosmoTypeEnum.Hole]: hole.majiks.HoleUpgrades, [CosmoTypeEnum.Village]: hole.majiks.VillageUpgrades, [CosmoTypeEnum.Idleon]: hole.majiks.IdleonUpgrades };
    return <Box gap="small">
        <Box><Values values={[
            { label: "Earned points", value: number(hole.majiks.earnedPoints) },
            { label: "Invested points", value: number(hole.majiks.investedPoints) },
            { label: "Remaining points", value: number(hole.majiks.remainingPoints) },
            { label: "Purchased points (included in earned)", value: number(hole.majiks.purchasedPoints) },
        ]} /></Box>
        <Text size="xsmall" color="accent-2">All three trees spend one pool.</Text>
        <ContentTabs<CosmoTypeEnum> options={Object.values(CosmoTypeEnum).map(name => ({ value: name, label: `${name} (${trees[name].length})` }))} value={tree} onChange={setTree} />
        <Box direction="row" gap="small" align="center"><IconImage data={hole.majiks.getImageData(tree)} scale={0.75} /><Text size="small">{tree} Majik · {trees[tree].length} of {hole.majiks.upgrades.length} released upgrades</Text></Box>
        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">{trees[tree].map(upgrade => <MajikCard key={upgrade.index} upgrade={upgrade} hole={hole} />)}</Grid>
        {tree === CosmoTypeEnum.Idleon && <Pocket hole={hole} divinity={divinity} />}
    </Box>;
}
