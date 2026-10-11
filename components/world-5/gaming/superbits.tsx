'use client';

import { Anchor, Box, CheckBox, Grid, Heading, Text } from "grommet";
import { useState } from "react";
import styled from "styled-components";
import type { Gaming } from "../../../data/domain/world-5/gaming";
import ShadowBox from "../../base/ShadowBox";
import { ComponentAndLabel } from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import BitsDisplay from "../../bitsDisplay";

const boardNames = ["Superbits", "Duperbits", "Zuperbits"];
const boardUnlocks = [
    "Reach Gaming level 40.",
    "Defeat the second Lore Boss in Spelunking.",
    "Unlock Duperbits and Research H8.",
];

const SuperbitBitsCost = styled(Text)`
    span { color: inherit; }
`;

export function GamingSuperbits({ gaming }: { gaming: Gaming }) {
    const [hidePurchased, setHidePurchased] = useState(false);
    const purchasedCount = gaming.superbits.filter(superbit => superbit.purchased).length;
    const visibleCount = hidePurchased ? gaming.superbits.length - purchasedCount : gaming.superbits.length;
    const boards = gaming.superbitBoards.map(board => ({
        board,
        purchased: board.superbits.filter(superbit => superbit.purchased).length,
    }));

    return (
        <Box gap="large">
            <Box direction="row" align="center" gap="medium" wrap>
                <CheckBox
                    label="Hide purchased"
                    checked={hidePurchased}
                    onChange={event => setHidePurchased(event.target.checked)}
                />
                <Text size="small" color="accent-2">
                    Showing {visibleCount} / {gaming.superbits.length} Superbits
                </Text>
                <Box as="nav" aria-label="Superbit boards" direction="row" gap="medium" margin={{ left: "auto" }} wrap>
                    {boards.map(({ board, purchased }) => (
                        <Anchor
                            key={board.index}
                            href={`#gaming-superbit-board-${board.index}`}
                            size="small"
                            color="brand"
                            label={`${boardNames[board.index]} ${purchased} / ${board.superbits.length} purchased`}
                        />
                    ))}
                </Box>
            </Box>
            {boards.map(({ board, purchased }) => {
                const visibleRequirements = board.requirements.filter(requirement => !hidePurchased || !requirement.superbit.purchased);
                const boardName = boardNames[board.index];

                return (
                    <Box
                        as="section"
                        id={`gaming-superbit-board-${board.index}`}
                        aria-label={boardName}
                        key={board.index}
                        gap="medium"
                    >
                        <Box gap="xsmall" pad={{ bottom: "small" }} border={{ side: "bottom", color: "grey-1" }}>
                            <Box direction="row" align="center" gap="medium" wrap>
                                <Heading level={3} margin="none" size="small">{boardName}</Heading>
                                <Text size="small" color="accent-2">{purchased} / {board.superbits.length} purchased</Text>
                                <Text size="small" color="accent-2">
                                    Showing {visibleRequirements.length} / {board.superbits.length} Superbits
                                </Text>
                            </Box>
                            {(!board.accessible || (board.index === 0 && gaming.level < 40)) && (
                                <Text size="small">{boardUnlocks[board.index]}</Text>
                            )}
                        </Box>
                        {visibleRequirements.length === 0 ? (
                            <Text size="small" color="accent-2">All {boardName} are purchased. Turn off Hide purchased to show them.</Text>
                        ) : (
                            <Grid columns={{ size: "medium", count: "fill" }} gap="medium">
                                {visibleRequirements.map(requirement => {
                                    const superbit = requirement.superbit;
                                    const available = board.accessible && superbit.prerequisitesMet;
                                    const opacity = superbit.purchased ? 1 : available ? 0.85 : 0.6;
                                    const qualifyingNames = requirement.qualifyingNeighborSuperbitIds.map(id =>
                                        gaming.superbits.find(candidate => candidate.superbitId === id)!.name
                                    );

                                    return (
                                        <ShadowBox
                                            forwardedAs="article"
                                            aria-label={superbit.name}
                                            key={superbit.superbitId}
                                            background="dark-1"
                                            pad="medium"
                                            gap="small"
                                            style={{ opacity }}
                                        >
                                            <Text size="small" weight="bold">{superbit.name}</Text>
                                            <Text size="small">{superbit.getBonusText()}</Text>
                                            {!superbit.purchased && (
                                                <>
                                                    <ComponentAndLabel
                                                        label="Cost"
                                                        labelColor={superbit.affordable ? "green-1" : "accent-2"}
                                                        component={
                                                            <SuperbitBitsCost forwardedAs="div" color={superbit.affordable ? "green-1" : undefined}>
                                                                <BitsDisplay value={superbit.costBits} scale={0.8} />
                                                            </SuperbitBitsCost>
                                                        }
                                                    />
                                                    {board.accessible && !superbit.prerequisitesMet && (
                                                        <TipDisplay
                                                            heading="Unlock requirement"
                                                            body={`Buy one of these Superbits: ${qualifyingNames.join(", ")}.`}
                                                            maxWidth="350px"
                                                        >
                                                            <Text size="xsmall">Buy one adjoining Superbit first.</Text>
                                                        </TipDisplay>
                                                    )}
                                                </>
                                            )}
                                        </ShadowBox>
                                    );
                                })}
                            </Grid>
                        )}
                    </Box>
                );
            })}
        </Box>
    );
}
