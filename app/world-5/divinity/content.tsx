"use client"

import {
    Box,
    Grid,
    Heading,
    Text,
} from 'grommet'
import { useState } from 'react';
import IconImage from '../../../components/base/IconImage';
import ShadowBox from '../../../components/base/ShadowBox';
import ContentTabs from '../../../components/base/ContentTabs';
import DataRow from '../../../components/base/DataRow';
import TextAndLabel, { ComponentAndLabel } from '../../../components/base/TextAndLabel';
import { Divinity as DivinityDomain, NobisectGod } from '../../../data/domain/world-5/divinity';
import { Player } from '../../../data/domain/player';
import { Item } from '../../../data/domain/items';
import { Skilling } from '../../../data/domain/skilling';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';
import { CharacterBox } from '../../../components/base/CharacterBox';
import { commaNotation, notateNumber } from '../../../data/utility';
import CoralKidDisplay from '../../../components/world-5/divinity/coralKidDisplay';
import { CoralKid } from '../../../data/domain/world-7/coralKid';

function AlignmentDisplay({ divinity, players: playerData }: { divinity: DivinityDomain; players: Player[] }) {

    return (
        <Grid columns={{ size: 'small' }}>
            {playerData.map((player, index) => {
                return (
                    <ShadowBox style={{ opacity: divinity.playerInfo[player.playerID].active ? 1 : 0.6 }} key={index} background="dark-1" pad="medium" align="start" margin={{ right: 'medium', bottom: 'small' }}>
                        <Box gap="small">
                            <Box direction="row" gap="xsmall" align="center">
                                <IconImage data={player.getClassImageData()} scale={0.8} />
                                <Text size="small">{player.playerName}</Text>
                            </Box>
                            <Box justify="between" wrap>
                                <ComponentAndLabel
                                    label="Level"
                                    component={
                                        <Box direction="row" gap="xsmall" align="center">
                                            <IconImage data={Skilling.getSkillImageData(SkillsIndex.Divinity)} scale={0.5} />
                                            <Text>{player.skills.get(SkillsIndex.Divinity)?.level.toString() ?? "0"}</Text>
                                        </Box>
                                    }
                                    margin={{ bottom: 'small', right: 'small' }}
                                />
                                {
                                    divinity.playerInfo[player.playerID] &&
                                    <TextAndLabel
                                        label="Style"
                                        text={divinity.playerInfo[player.playerID].style.name ?? "Not Linked"}
                                        margin={{ bottom: 'small', right: 'small' }}
                                    />
                                }
                                {
                                    divinity.playerInfo[player.playerID].gods.length >= 1 &&
                                    <ComponentAndLabel
                                        label="God"
                                        component={
                                            <Box direction="row" gap="xsmall" align="center">
                                                <IconImage data={divinity.playerInfo[player.playerID].gods[0].getImageData()} scale={0.3} />
                                                <Text>{divinity.playerInfo[player.playerID].gods[0].data.name}</Text>
                                            </Box>
                                        }
                                        margin={{ bottom: 'small', right: 'small' }}
                                    />
                                }
                            </Box>
                        </Box>
                    </ShadowBox>
                )
            })
            }
        </Grid>
    )
};

function GodDisplay({ divinity, players }: { divinity: DivinityDomain; players: Player[] }) {

    return (
        <Box margin={{ top: 'small' }} gap="small">
            {
                divinity.gods.map((god, index) => {
                    const unlinkedBlessingPlayers = god instanceof NobisectGod
                        ? players.filter(player => !god.linkedPlayers.some(linkedPlayer => linkedPlayer.playerID === player.playerID))
                        : [];

                    return (
                        <DataRow
                            key={index}
                            columns={{ count: 5, size: 'auto' }}
                            opacity={god.unlocked ? 1 : 0.5}
                            fields={[
                                {
                                    key: 'identity',
                                    kind: 'identity',
                                    name: god.data.name,
                                    artwork: <IconImage data={god.getImageData()} scale={0.5} />,
                                },
                                {
                                    key: 'major-bonus',
                                    kind: 'text',
                                    label: 'Link Bonus',
                                    value: god.data.majorBonus,
                                    role: 'description',
                                },
                                {
                                    key: 'minor-bonus',
                                    kind: 'text',
                                    label: 'Minor Link Bonus',
                                    value: god.getMaxMinorLinkBonusText(),
                                    role: 'description',
                                    tooltip: (
                                        <Text>This is the max possible bonus, each character gets a reduced amount based on their divinity level.</Text>
                                    ),
                                },
                                {
                                    key: 'blessing-level',
                                    kind: 'text',
                                    label: 'Blessing Level',
                                    value: `${god.blessLevel}/${god.blessMaxLevel}`,
                                },
                                {
                                    key: 'blessing-bonus',
                                    kind: 'text',
                                    label: 'Blessing Bonus',
                                    value: god.getBlessingBonusText(),
                                    role: 'description',
                                },
                            ]}
                            details={[
                                ...(god.linkedPlayers.length > 0 ? [
                                    {
                                        key: 'linked-characters',
                                        label: god instanceof NobisectGod
                                            ? 'Linked Characters (base skill efficiency)'
                                            : 'Linked Characters',
                                        content: (
                                            <Box direction="row" wrap gap="xsmall" pad="small" data-nobisect-blessings={god instanceof NobisectGod ? true : undefined}>
                                                {god.linkedPlayers.map((player, index) => (
                                                    <CharacterBox
                                                        key={index}
                                                        player={player}
                                                    >
                                                        {god instanceof NobisectGod && (
                                                            <Box align="end">
                                                                <Text size="small" data-nobisect-blessing={player.playerID}>
                                                                    +{commaNotation(god.getBlessingBonus(player))}
                                                                </Text>
                                                            </Box>
                                                        )}
                                                    </CharacterBox>
                                                ))}
                                            </Box>
                                        ),
                                    },
                                ] : []),
                                ...(god instanceof NobisectGod && unlinkedBlessingPlayers.length > 0 ? [
                                    {
                                        key: 'unlinked-character-blessings',
                                        label: 'Blessing for unlinked characters (base skill efficiency)',
                                        content: (
                                            <Box direction="row" wrap gap="xsmall" pad="small" data-nobisect-blessings>
                                                {unlinkedBlessingPlayers.map(player => (
                                                    <CharacterBox key={player.playerID} player={player}>
                                                        <Box align="end">
                                                            <Text size="small" data-nobisect-blessing={player.playerID}>
                                                                +{commaNotation(god.getBlessingBonus(player))}
                                                            </Text>
                                                        </Box>
                                                    </CharacterBox>
                                                ))}
                                            </Box>
                                        ),
                                    },
                                ] : []),
                            ]}
                        />
                    )
                })
            }
        </Box>
    )
}

function Divinity() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const [activeTab, setActiveTab] = useState<string>("Gods");

    if (!hydrated || !theData.has("divinity") || !theData.has("players") || !theData.has("coralKid")) {
        return <Box pad={{ vertical: 'medium' }}><Text>Loading Divinity data…</Text></Box>;
    }

    const divinity = theData.get("divinity") as DivinityDomain;
    const players = theData.get("players") as Player[];
    const coralKid = theData.get("coralKid") as CoralKid;

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Divinity</Heading>
            <Box gap="small">
                <Grid columns={["max-content", "max-content", "max-content"]} gap={{ column: "medium", row: "xxsmall" }}
                    pad={{ vertical: "small" }} style={{ gridTemplateRows: "auto auto" }}>
                    <Box style={{ display: "grid", gridRow: "span 2", gridTemplateRows: "subgrid", alignItems: "center" }}>
                        <Text size="large">{commaNotation(divinity.godRank)}</Text>
                        <Text size="xsmall" color="accent-2">God Rank</Text>
                    </Box>
                    <Box style={{ display: "grid", gridRow: "span 2", gridTemplateRows: "subgrid", alignItems: "center" }}>
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={Skilling.getSkillImageData(SkillsIndex.Divinity)} scale={0.5} />
                            <Text size="large">{notateNumber(divinity.currentDivinity)}</Text>
                        </Box>
                        <Text size="xsmall" color="accent-2">Current Divinity</Text>
                    </Box>
                    <Box style={{ display: "grid", gridRow: "span 2", gridTemplateRows: "subgrid", alignItems: "center" }}>
                        <Box direction="row" gap="xsmall" align="center">
                            <IconImage data={Item.getImageData('CKsing')} scale={0.7} />
                            <Text size="large">{notateNumber(coralKid.singularity.spiralsOwned)}</Text>
                        </Box>
                        <Text size="xsmall" color="accent-2">Singularity Spirals</Text>
                    </Box>
                </Grid>
                <ContentTabs
                    options={["Gods", "Alignment", "Coral Kid"].map(tabName => ({ value: tabName, label: tabName }))}
                    value={activeTab}
                    onChange={setActiveTab}
                />
                {activeTab == "Gods" && <GodDisplay divinity={divinity} players={players} />}
                {activeTab == "Alignment" && <AlignmentDisplay divinity={divinity} players={players} />}
                {activeTab == "Coral Kid" && <CoralKidDisplay coralKid={coralKid} players={players} divinityPoints={divinity.currentDivinity} />}
            </Box>
        </Box>
    )
}

export default Divinity;
