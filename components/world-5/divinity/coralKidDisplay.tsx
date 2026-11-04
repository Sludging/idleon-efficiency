"use client";

import { Box, Grid, Text } from "grommet";
import { useState } from "react";
import styled from "styled-components";
import { CoralKid, CoralKidBonus } from "../../../data/domain/world-7/coralKid";
import { Player } from "../../../data/domain/player";
import { Item } from "../../../data/domain/items";
import { Skilling } from "../../../data/domain/skilling";
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import { commaNotation, notateNumber, toTime } from "../../../data/utility";
import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import ContentTabs from "../../base/ContentTabs";
import IconImage from "../../base/IconImage";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";

const amount = (value: number) => notateNumber(value, "Smaller");

const GreyCardHeader = styled(Box)`
    position: relative;
    z-index: 1;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.18);
`;

type CoralKidDisplayProps = {
    coralKid: CoralKid;
    players: Player[];
    divinityPoints: number;
};

function effectText(upgrade: CoralKidBonus): string {
    let description = upgrade.data.description;
    if (upgrade.index === 3) {
        description = description.split("@")[0];
    }
    description = description.replaceAll("{", amount(upgrade.getBonus()));
    if (description.includes("}")) {
        description = description.replaceAll("}", amount(upgrade.getPercentageMultiplier()));
    }
    description = description.replaceAll("$", amount(upgrade.getTotalBonus()));
    return description.replaceAll("@", " ").replaceAll("''", '"').replace(/\s+/g, " ").trim();
}

function comparisonText(upgrade: CoralKidBonus, level: number): string {
    switch (upgrade.index) {
        case 1:
            return `+${commaNotation(upgrade.getBonus(level))} levels`;
        case 2:
        case 11:
            return `×${amount(upgrade.getTotalBonus(level))}`;
        case 3:
            return `+${amount(upgrade.getBonus(level))}%`;
        case 4:
        case 9:
            return `+${amount(upgrade.getTotalBonus(level))}%`;
        case 5:
            return `+${amount(upgrade.getBonus(level))}%`;
        default:
            return `×${amount(upgrade.getPercentageMultiplier(level))}`;
    }
}

function MinorLinkEffects({ coralKid, players }: Pick<CoralKidDisplayProps, "coralKid" | "players">) {
    const upgrade = coralKid.coralKidBonuses[3];
    return <Box gap="xsmall">
        {players.map(player => <Box key={player.playerID} direction="row" gap="small" justify="between" align="center">
            <Text size="small" color="dark-1">{player.playerName} · Divinity Lv. {commaNotation(player.skills.get(SkillsIndex.Divinity)!.level)}</Text>
            <Text size="small" color="dark-1">
                ×{amount(coralKid.minorLinkSkillMultipliersByPlayerIndex[player.playerID])}
                {" → "}×{amount(upgrade.getMinorLinkSkillMultiplier(player.skills.get(SkillsIndex.Divinity)!.level, upgrade.level + 1))}
            </Text>
        </Box>)}
    </Box>;
}

function SingularitySummary({ coralKid }: Pick<CoralKidDisplayProps, "coralKid">) {
    const singularity = coralKid.singularity;
    return <Box direction="row" wrap gap="medium" align="start" pad={{ vertical: "small" }} style={{ fontVariantNumeric: "tabular-nums" }}>
        <ComponentAndLabel label="Spirals from transmutation" component={<Box direction="row" gap="xsmall" align="center">
            <IconImage data={Item.getImageData("CKsing")} scale={0.7} />
            <Text size="large">{commaNotation(singularity.spiralsOnClaim)}</Text>
        </Box>} />
        <TextAndLabel label="Kill multiplier" text={`×${amount(singularity.killMultiplier)}`}
            tooltip={<Text size="small" color="dark-1">{notateNumber(singularity.kills)} kills</Text>} />
        <TextAndLabel label="Time multiplier" text={`×${amount(singularity.timeMultiplier)}`}
            tooltip={<Text size="small" color="dark-1">{toTime(singularity.elapsedHours * 3600).trim()}</Text>} />
    </Box>;
}

export default function CoralKidDisplay({ coralKid, players, divinityPoints }: CoralKidDisplayProps) {
    const [mode, setMode] = useState<"original" | "singularity">("original");

    return <Box gap="medium">
        <ContentTabs
            options={[{ value: "original", label: "Original" }, { value: "singularity", label: "Singularity" }]}
            value={mode}
            onChange={setMode}
        />
        {mode === "singularity" && !coralKid.singularity.unlocked &&
            <Text size="small" color="accent-2">Unlock Singularity in the Luminous Menagerie to access this mode.</Text>}
        {mode === "singularity" && <SingularitySummary coralKid={coralKid} />}
        {/* Flexible header tracks share one height across all card rows. */}
        <Grid columns={{ size: "medium", count: "fill" }} gap="medium" style={{ gridAutoRows: "1fr auto" }}>
            {coralKid.coralKidBonuses.filter(upgrade => upgrade.data.mode === mode).map(upgrade => {
                const usesDivinity = upgrade.costCurrency === "divinityPoints";
                const cost = upgrade.getUpgradeCost();
                const currencyOwned = usesDivinity ? divinityPoints : coralKid.singularity.spiralsOwned;
                const levelsRemaining = Math.max(0, upgrade.data.requiredTotalDivinityLevel - coralKid.totalDivinityLevel);
                const modeLocked = mode === "singularity" && !coralKid.singularity.unlocked;
                const locked = modeLocked || levelsRemaining > 0;
                return <RoundedShadowBox key={upgrade.index} background="dark-1" pad="none" overflow="hidden"
                    style={{
                        opacity: locked ? 0.5 : 1, minWidth: 0,
                        gridRow: "span 2", display: "grid", gridTemplateRows: "subgrid", rowGap: 0
                    }}>
                    <GreyCardHeader background="grey-1" pad={{ horizontal: "medium", vertical: "small" }} gap="xsmall" justify="between">
                        <Text size="small" weight="bold">{effectText(upgrade)}</Text>
                        <Text size="xsmall" color="accent-2">
                            {levelsRemaining > 0
                                ? `${commaNotation(levelsRemaining)} more Divinity levels to unlock · Requires ${commaNotation(upgrade.data.requiredTotalDivinityLevel)} total`
                                : modeLocked ? "Requires Menagerie Singularity unlock" : `Level ${commaNotation(upgrade.level)}`}
                        </Text>
                    </GreyCardHeader>
                    <Box pad="medium" gap="small">
                        <Box direction="row" gap="xsmall" align="center" wrap background="dark-3" pad="small" round="xsmall">
                            <Text size="small" weight="bold">{comparisonText(upgrade, upgrade.level)}</Text>
                            <Text size="small" color="accent-2">→ {comparisonText(upgrade, upgrade.level + 1)}</Text>
                        </Box>
                        {upgrade.index === 3 && <TipDisplay heading="Minor Link multipliers"
                            body={<Box style={{ maxHeight: "40vh", overflowY: "auto" }}><MinorLinkEffects coralKid={coralKid} players={players} /></Box>}>
                            <Text size="small" tabIndex={0} style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>
                                Character bonuses
                            </Text>
                        </TipDisplay>}
                        <ComponentAndLabel label="Next level cost" component={<ResourceDisplay
                            cost={cost}
                            canAfford={!locked && currencyOwned >= cost}
                            resourceImageData={usesDivinity ? Skilling.getSkillImageData(SkillsIndex.Divinity) : Item.getImageData(upgrade.costCurrency)}
                            resourceImageScale={0.5}
                            textSize="small"
                        />} />
                    </Box>
                </RoundedShadowBox>;
            })}
        </Grid>
    </Box>;
}
