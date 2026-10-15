import { Box, Button, Grid, Select, Text, TextInput } from "grommet";
import { useState } from "react";
import type { ResearchGrid, ResearchShape } from "../../../data/domain/world-7/research";
import { commaNotation, notateNumber } from "../../../data/utility";
import IconImage from "../../base/IconImage";
import TextAndLabel, { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import ResearchSources, { ResearchSourceValue, useResearchTooltipScroll } from "./researchSources";

const signedCount = (value: number) => value < 0 ? `-${commaNotation(Math.abs(value))}` : commaNotation(value);
const shapeStates = ["All", "Owned", "Not owned"] as const;
type ShapeState = typeof shapeStates[number];

function ShapeCard({ shape, description }: { shape: ResearchShape; description: string }) {
    const image = shape.getImageData();
    const placement = shape.placement;
    const rotation = shape.rotationModuloDegrees;
    const { ref: tooltipRef, onKeyDown: onTooltipKeyDown } = useResearchTooltipScroll();
    return <Box background="dark-1" pad="small" gap="xsmall" data-shape-index={shape.index}
        style={{ opacity: shape.owned ? 1 : 0.35, minWidth: 0 }}>
        <Box direction="row" gap="small" align="center">
            <Box flex={false}><IconImage data={image} scale={Math.min(0.6, 52 / Math.max(image.width, image.height))} /></Box>
            <Text size="small" weight="bold" data-card-name>{shape.data.name}</Text>
        </Box>
        <Text size="small" data-card-description>{description}</Text>
        <TextAndLabel label="Grid bonus" text={`×${notateNumber(shape.bonusMultiplier, "Smaller")}`} textSize="small" labelSize="xsmall" />
        {shape.owned && <>
            <TipDisplay heading="Shape details" maxWidth="620px" size="small"
                body={<Box ref={tooltipRef} tabIndex={0} flex={false} data-shape-coverage-tooltip={shape.index} gap="xxsmall"
                    style={{ maxHeight: "40vh", overflowY: "auto", overflowWrap: "anywhere" }}>
                    <Text size="xsmall" style={{ flexShrink: 0 }}>{placement
                        ? `Saved position: x ${signedCount(placement.x)} px, y ${signedCount(placement.y)} px; rotation: ${signedCount(rotation!)}°`
                        : "No saved placement"}</Text>
                    <Text size="xsmall" weight="bold" style={{ flexShrink: 0 }}>Active upgrade coverage</Text>
                    {shape.coveredUpgrades.length === 0 && <Text size="xsmall" style={{ flexShrink: 0 }}>No active upgrade coverage</Text>}
                    {shape.coveredUpgrades.map(upgrade => <Text key={upgrade.index} size="xsmall" style={{ flexShrink: 0 }}>{upgrade.data.name}</Text>)}
                </Box>}>
                <Text tabIndex={0} onKeyDown={onTooltipKeyDown} size="xsmall" data-shape-coverage aria-label={`Placement and active coverage for ${shape.data.name}`}
                    style={{ textDecoration: "underline dotted", textUnderlineOffset: "4px", cursor: "help" }}>{shape.coveredUpgrades.length === 0 ? "No active upgrade coverage" : `Active coverage (${shape.coveredUpgrades.length})`}</Text>
            </TipDisplay>
        </>}
    </Box>;
}

export default function ResearchShapes({ research }: { research: ResearchGrid }) {
    const [query, setQuery] = useState("");
    const [state, setState] = useState<ShapeState>("All");
    const normalizedQuery = query.trim().toLowerCase();
    const shapes = research.shapes.map(shape => ({
        shape,
        description: shape.getDescription().replace(/_/g, " ").replace(/\s*@\s*/g, " ").trim(),
    })).filter(({ shape, description }) => (shape.data.name.toLowerCase().includes(normalizedQuery)
        || description.toLowerCase().includes(normalizedQuery))
        && (state === "All" || (state === "Owned" ? shape.owned : !shape.owned)));
    const ownership = research.shapeOwnership;
    const changed = query !== "" || state !== "All";
    return <Box as="section" id="research-shapes" gap="small" aria-label="Shapes">
        <Box direction="row" wrap gap="medium" align="end">
            <ResearchSourceValue label="Owned Shapes" value={`${commaNotation(ownership.count)}/${commaNotation(ownership.cap)}`}>
                <Box flex={false} gap="small">
                    <ResearchSources entries={ownership.contributors} unit="Shape" />
                    <Text size="small">Supported sources do not show every way to obtain Shapes.</Text>
                </Box>
            </ResearchSourceValue>
            <Text size="small">Rotation requires Research level {commaNotation(ownership.rotationRequiredLevel)}</Text>
        </Box>
        <Box direction="row" wrap gap="small" align="end">
            <Box width="medium">
                <ComponentAndLabel label={<label htmlFor="research-shapes-search"><Text size="xsmall" color="accent-2">Search</Text></label>}
                    component={<TextInput id="research-shapes-search" aria-label="Search Shape names or effects" placeholder="Search names or effects"
                        style={{ height: "48px" }} value={query} onChange={event => setQuery(event.target.value)} />} />
            </Box>
            <Box width="180px">
                <ComponentAndLabel label={<label htmlFor="research-shapes-state"><Text size="xsmall" color="accent-2">State</Text></label>}
                    component={<Select id="research-shapes-state" aria-label="Shape State" size="medium" options={[...shapeStates]}
                        value={state} onChange={({ option }) => setState(option)} />} />
            </Box>
            {query && <Button plain label={<Text size="small" color="brand">Clear search</Text>} onClick={() => setQuery("")} />}
            {changed && <Button plain label={<Text size="small" color="brand">Clear filters</Text>}
                onClick={() => { setQuery(""); setState("All"); }} />}
            <Text size="xsmall" color="accent-2">{shapes.length} Shapes</Text>
        </Box>
        <Grid columns={["minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)", "minmax(0, 1fr)"]} gap="small">
            {shapes.map(({ shape, description }) => <ShapeCard key={shape.index} shape={shape} description={description} />)}
        </Grid>
        {shapes.length === 0 && <Box background="dark-1" pad="small"><Text data-research-shapes-empty>No Shapes match these filters.</Text></Box>}
    </Box>;
}
