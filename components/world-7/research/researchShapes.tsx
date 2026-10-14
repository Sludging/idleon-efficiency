import { Box, Text } from "grommet";
import type { ResearchGrid } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import ResearchSources from "./researchSources";

export default function ResearchShapes({ research }: { research: ResearchGrid }) {
    const ownership = research.shapeOwnership;

    return (
        <Box gap="small">
            <Box background="dark-1" pad="medium" gap="small">
                <Box direction="row" gap="medium" wrap>
                    <Text size="small">Owned Shapes: {commaNotation(ownership.count)} / {commaNotation(ownership.cap)}</Text>
                    <Text size="small">Rotation requirement: Research level {commaNotation(ownership.rotationRequiredLevel)}</Text>
                </Box>
                <Text size="xsmall">Supported ownership sources are not a complete list of ways to obtain Shapes.</Text>
                <ResearchSources entries={ownership.contributors} unit="Shape" />
            </Box>
            <Box gap="small">
                {research.shapes.map(shape => {
                    const placement = shape.placement;
                    const rotation = shape.rotationModuloDegrees;
                    const positionText = !shape.owned ? "Not owned" : placement === undefined
                        ? "No saved placement"
                        : `x: ${commaNotation(placement.x)} px · y: ${commaNotation(placement.y)} px`;
                    const rotationText = !shape.owned ? "Not owned" : rotation === undefined
                        ? "No saved placement"
                        : `${commaNotation(rotation)}°`;

                    return (
                        <Box key={shape.index} data-shape-index={shape.index}>
                            <DataRow
                                opacity={shape.owned ? 1 : 0.6}
                                columns={["minmax(0, 28fr)", "minmax(0, 15fr)", "minmax(0, 17fr)", "minmax(0, 28fr)", "minmax(0, 17fr)"]}
                                fields={[
                                    { key: "identity", kind: "identity", name: shape.data.name, artwork: <IconImage data={shape.getImageData()} scale={0.6} /> },
                                    { key: "ownership", kind: "text", label: "Ownership", value: shape.owned ? "Owned" : "Not owned" },
                                    { key: "factor", kind: "text", label: "Grid bonus factor", value: `×${notateNumber(shape.bonusMultiplier, "Smaller")}` },
                                    { key: "position", kind: "text", label: "Position (pixels)", value: positionText },
                                    { key: "rotation", kind: "text", label: "Rotation (degrees)", value: rotationText },
                                ]}
                                details={[
                                    {
                                        key: "description",
                                        label: "Description",
                                        content: <Text size="xsmall">{shape.getDescription().replace(/_/g, " ").replace(/\s*@\s*/g, " ")}</Text>,
                                    },
                                    {
                                        key: "coverage",
                                        label: "Active covered upgrades",
                                        content: !shape.owned
                                            ? <Text size="xsmall">Not owned</Text>
                                            : shape.coveredUpgrades.length === 0
                                                ? <Text size="xsmall">No active upgrade coverage</Text>
                                                : <Box gap="xxsmall">{shape.coveredUpgrades.map(upgrade => <Text key={upgrade.index} size="xsmall">{upgrade.data.name}</Text>)}</Box>,
                                    },
                                ]}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
}
