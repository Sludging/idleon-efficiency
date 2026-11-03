import { useContext, type ReactNode } from "react";
import { Box, Grid, ResponsiveContext, Text } from "grommet";
import type { Alchemy, AlchemySourceReward, AlchSourceRewardBasis } from "../../../data/domain/world-2/alchemy/alchemy";
import type { Sigils } from "../../../data/domain/world-2/alchemy/sigils";
import type { Tesseract } from "../../../data/domain/tesseract";
import { commaNotation, notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TipDisplay from "../../base/TipDisplay";

function SourceValue({ label, value, valueSize, children }: {
    label: string;
    value: string;
    valueSize: "large" | "xxlarge";
    children: ReactNode;
}) {
    return <Box gap="xxsmall">
        <TipDisplay heading={label} size="small" maxWidth="620px" body={
            <Box gap="small" style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                {children}
            </Box>
        }>
            <Text size={valueSize} tabIndex={0} style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>{value}</Text>
        </TipDisplay>
        <Text size="xsmall" color="accent-2">{label}</Text>
    </Box>;
}

const sourceBasisText: Record<AlchSourceRewardBasis, string> = {
    value: "when obtained",
    perLevel: "per level",
    levelOne: "at level 1",
    whenUnlocked: "when unlocked",
    perMaxedVial: "per level-13 vial",
    perEtherealSigil: "per Ethereal-or-higher sigil",
    whenWinning: "if this bonus wins",
    afterWorld7Winning: "after reaching World 7, if this bonus wins",
};

function SourceReward({ label, value, reward, factor = false }: {
    label: string;
    value: number;
    reward: AlchemySourceReward;
    factor?: boolean;
}) {
    // Vial Mastery can be active before any vial reaches level 13.
    const perUnit = reward.basis === "perMaxedVial";
    const showPotential = !reward.active || perUnit;
    const displayedValue = showPotential ? reward.potentialValue : value;
    const formattedValue = displayedValue !== 0 && Math.abs(displayedValue) < 0.01
        ? Number(displayedValue.toPrecision(4)).toString()
        : notateNumber(displayedValue, "Smaller");
    const basisText = factor ? "when active" : sourceBasisText[reward.basis];

    return <Text size="xsmall" style={{ opacity: reward.active ? 1 : 0.6 }}>
        {label}: {factor ? "×" : displayedValue >= 0 ? "+" : ""}{formattedValue}{factor ? "" : "%"}
        {showPotential ? ` ${basisText}` : ""}
    </Text>;
}

export default function AlchemySummary({ alchemy, tesseract, sigils }: { alchemy: Alchemy; tesseract: Tesseract; sigils: Sigils }) {
    const small = useContext(ResponsiveContext) === "small";
    const prismaSources = alchemy.prismaticMultiplierSources;
    const vialSources = alchemy.vialMultiplierSources;
    const prismaRewards = alchemy.prismaticMultiplierSourceRewards;
    const vialRewards = alchemy.vialMultiplierSourceRewards;

    return <Box direction={small ? "column" : "row"} gap="medium" pad={{ vertical: "small" }}>
        <Box gap="small" pad={small ? undefined : { right: "medium" }}>
            <Box direction="row" align="center" gap="xsmall">
                <IconImage data={tesseract.getPrismaBubbleImageData()} scale={0.8} />
                <Text size="small">Prisma</Text>
            </Box>
            <Box direction="row" gap="medium" wrap align="baseline">
                <Box gap="xxsmall"><Text size="xxlarge" weight="normal">{commaNotation(alchemy.prismaFragments)}</Text><Text size="xsmall" color="accent-2">Fragments</Text></Box>
                <SourceValue label="Prismatic multiplier" value={`${notateNumber(alchemy.prismaticMultiplier, "Smaller")}x`} valueSize="large">
                    <Box direction="row" gap="medium">
                        <Text size="xsmall">Base: ×{notateNumber(alchemy.prismaticBaseMultiplier, "Smaller")}</Text>
                        <Text size="xsmall">Maximum: ×{notateNumber(alchemy.prismaticMaximumMultiplier, "Smaller")}</Text>
                    </Box>
                    <Box gap="xsmall">
                        <Text size="xsmall" weight="bold">Additive bonuses</Text>
                        <Box gap="xxsmall">
                            <SourceReward label="Tesseract — Pinnacle of Prisma" value={prismaSources.tesseractPercent} reward={prismaRewards.tesseractPercent} />
                            <SourceReward label="Arcade" value={prismaSources.arcadePercent} reward={prismaRewards.arcadePercent} />
                            <SourceReward label="Sushi — Tobo Tamago" value={prismaSources.sushiPercent} reward={prismaRewards.sushiPercent} />
                            <SourceReward label="Jelly Operator — Bowling Pin" value={prismaSources.jellyOperatorPercent} reward={prismaRewards.jellyOperatorPercent} />
                            <SourceReward label="World 6 trophy — Heroic Spirit" value={prismaSources.world6TrophyPercent} reward={prismaRewards.world6TrophyPercent} />
                            <SourceReward label="Gaming palette — Violet" value={prismaSources.palettePercent} reward={prismaRewards.palettePercent} />
                            <SourceReward label="Ethereal-or-higher sigils" value={prismaSources.purpleSigilsPercent} reward={prismaRewards.purpleSigilsPercent} />
                            <SourceReward label="Exotic Market — PRISMA PETAL" value={prismaSources.exoticMarketPercent} reward={prismaRewards.exoticMarketPercent} />
                            <SourceReward label="Legend talent — Wowa Woowa" value={prismaSources.legendTalentPercent} reward={prismaRewards.legendTalentPercent} />
                            <SourceReward label="Companion — Rift Hivemind" value={prismaSources.companionPercent} reward={prismaRewards.companionPercent} />
                        </Box>
                    </Box>
                </SourceValue>
            </Box>
        </Box>
        <Box gap="small" pad={small ? undefined : { horizontal: "medium" }} border={small ? undefined : { side: "left", color: "grey-1" }}>
            <Box direction="row" align="center" gap="xsmall">
                <IconImage data={alchemy.vials[0].getBackgroundImageData()} scale={0.26} />
                <Text size="small">Vials</Text>
            </Box>
            <SourceValue label="Overall vial multiplier" value={`${notateNumber(alchemy.vialBonusMultiplier, "Smaller")}x`} valueSize="xxlarge">
                <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="medium">
                    <Box gap="xsmall">
                        <Text size="xsmall" weight="bold">Vial Mastery + Vault</Text>
                        <Box gap="xxsmall">
                            <Text size="xsmall">Additive bonuses</Text>
                            <SourceReward label="Rift — Vial Mastery" value={vialSources.vialMasteryPercent} reward={vialRewards.vialMasteryPercent} />
                            <SourceReward label="Upgrade Vault — Vial Overtune 製" value={vialSources.vaultPercent} reward={vialRewards.vaultPercent} />
                        </Box>
                    </Box>
                    <Box gap="xsmall">
                        <Text size="xsmall" weight="bold">Separate multipliers</Text>
                        <SourceReward label="Lab — My 1st Chemistry Set" value={vialSources.labFactor} reward={vialRewards.labFactor} factor />
                        <SourceReward label="Meritocracy" value={vialSources.meritocracyPercent} reward={vialRewards.meritocracyPercent} />
                    </Box>
                </Grid>
            </SourceValue>
        </Box>
        <Box gap="small" pad={small ? undefined : { left: "medium" }} border={small ? undefined : { side: "left", color: "grey-1" }}>
            <Box direction="row" align="center" gap="xsmall">
                <IconImage data={sigils.sigils[0].getImageData()} scale={0.85} />
                <Text size="small">Sigils</Text>
            </Box>
            <Box gap="xxsmall"><Text size="xxlarge" weight="normal">{commaNotation(alchemy.sigilSyrup)}</Text><Text size="xsmall" color="accent-2">Sigil Syrup</Text></Box>
        </Box>
    </Box>;
}
