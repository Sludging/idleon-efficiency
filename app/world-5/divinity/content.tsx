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
import { Skilling } from '../../../data/domain/skilling';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { useAppDataStore } from '../../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import useHydrated from '../../../lib/hooks/useHydrated';
import { CharacterBox } from '../../../components/base/CharacterBox';
import { commaNotation } from '../../../data/utility';

function AlignmentDisplay() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));
    const divinity = theData.get("divinity") as DivinityDomain | undefined;
    const playerData: Player[] = theData.get("players");

    if (!hydrated || !divinity) {
        return (
            <Box>Still loading or error occured.</Box>
        )
    }

    return (
        <Grid columns={{ size: 'small' }}>
            {playerData && playerData.map((player, index) => {
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

function GodDisplay() {
    const hydrated = useHydrated();
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const divinity = theData.get("divinity") as DivinityDomain | undefined;
    const players: Player[] = theData.get("players");

    return (
        <Box margin={{ top: 'small' }} gap="small">
            {
                hydrated && divinity && divinity.gods.map((god, index) => {
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
    const [activeTab, setActiveTab] = useState<string>("Gods");

    return (
        <Box>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Divinity</Heading>
            <Box margin={{ bottom: 'small' }}>
                <ContentTabs
                    options={["Gods", "Alignment"].map(tabName => ({ value: tabName, label: tabName }))}
                    value={activeTab}
                    onChange={setActiveTab}
                />
            </Box>
            {activeTab == "Gods" && <GodDisplay />}
            {activeTab == "Alignment" && <AlignmentDisplay />}
        </Box>
    )
}

export default Divinity;
