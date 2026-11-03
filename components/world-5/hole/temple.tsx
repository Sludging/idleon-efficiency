import { Box, Text } from "grommet";
import { Item } from "../../../data/domain/items";
import type { Hole } from "../../../data/domain/world-5/hole/hole";
import { commaNotation, notateNumber } from "../../../data/utility";
import { ResourceDisplay } from "../../account/shared/ResourceDisplay";
import RoundedShadowBox from "../../base/RoundedShadowBox";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import { CavernMetricStrip, CavernStudySummary } from "./cavernLayout";

export default function TempleView({ hole, onOpenStudies }: { hole: Hole; onOpenStudies: () => void }) {
    const temple = hole.temple;
    const torchImage = Item.getImageData("Quest94");

    // Native action names use font glyphs, not ordinary generated static text.
    const actions = [
        {
            name: "Illuminate",
            level: temple.illuminateLevel,
            label: "Search chance multiplier",
            effect: temple.illuminateSearchMultiplier,
            unit: "×",
            cost: temple.illuminateCost,
        },
        {
            name: "Search",
            level: temple.searchLevel,
            label: "Centurion awakening chance",
            effect: temple.centurionAwakenChancePercent,
            unit: "%",
            cost: temple.searchCost,
        },
        {
            name: "Amplify",
            level: temple.amplifyLevel,
            label: "Golem respawn speed",
            effect: temple.golemRespawnSpeedPercent,
            unit: "%",
            cost: temple.amplifyCost,
        },
    ];

    return <Box gap="medium">
        <CavernMetricStrip metrics={[
            {
                label: "Torches",
                value: notateNumber(temple.torches),
                image: torchImage,
                tooltip: <Text size="small">{temple.torches.toLocaleString("en-US", { maximumFractionDigits: 0 })}</Text>,
            },
            { label: "Sanctum", value: commaNotation(temple.layer) },
            {
                label: "Extra torch chance",
                value: `${temple.extraTorchChance.toLocaleString("en-US", { maximumFractionDigits: 2 })}%`,
            },
            { label: "Opals found", value: commaNotation(temple.opalsFound), image: Item.getImageData("Opal") },
        ]} />

        <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "12px", minWidth: 0 }}>
            {actions.map(action => <RoundedShadowBox key={action.name} background="dark-1" pad="none" gap="none" overflow="hidden">
                <Box direction="row" justify="between" align="center" gap="small" background="grey-1" pad={{ horizontal: "medium", vertical: "small" }}>
                    <Text size="small" weight={500}>{action.name}</Text>
                    <Text size="xsmall" color="accent-2" style={{ whiteSpace: "nowrap" }}>Lv. {commaNotation(action.level)}</Text>
                </Box>
                <Box pad="medium" gap="small">
                    <TextAndLabel
                        label={action.label}
                        text={`${action.effect.toLocaleString("en-US", { maximumSignificantDigits: 4 })}${action.unit}`}
                        textSize="small"
                        labelSize="xsmall"
                        tooltip={action.name === "Search" ? <Text size="small">Chance shown before you spend torches on Search.</Text> : undefined}
                    />
                    <ComponentAndLabel
                        label="Current cost"
                        labelSize="xsmall"
                        component={<ResourceDisplay
                            cost={action.cost}
                            resourceImageData={torchImage}
                            textSize="small"
                            showTooltip
                            tooltipHeading="Temple Torch cost"
                        />}
                    />
                </Box>
            </RoundedShadowBox>)}
        </Box>

        <CavernStudySummary study={hole.studies[14]} onOpenStudies={onOpenStudies} />
    </Box>;
}
