import { Box, Stack, Text } from "grommet";
import DataRow from "../../base/DataRow";
import IconImage from "../../base/IconImage";
import { SneakingActivity, SneakingFloor, SneakingItem, SneakingPlayer } from "../../../data/domain/world-6/sneaking";
import { ImageData } from "../../../data/domain/imageData";
import { Player } from "../../../data/domain/player";
import TextAndLabel from "../../base/TextAndLabel";
import TipDisplay from "../../base/TipDisplay";
import { commaNotation, notateNumber } from "../../../data/utility";

export const PlayerActivity = ({ player }: { player: SneakingPlayer }) => {
    const imageData: ImageData = {
        location: `sneaking_activity_${player.activity.toString().toLowerCase().replace(" ", "")}`,
        width: 40,
        height: 40
    }
    const text = <Text size="xsmall">{player.activity == SneakingActivity.KnockedOut ? "KOed" : player.activity.toString()}</Text>;

    return (
        <Box direction="row" align="center" pad={{ bottom: 'xsmall' }} gap="xsmall">
            <IconImage data={imageData} scale={0.6} />
            {/* The image has some blank space on top, so we pad the text a bit to make it more aligned. */}
            <Box pad={{ top: 'xsmall' }}>{text}</Box>
        </Box>
    )
}

function EquippedItem({ slot, item }: { slot: string, item: SneakingItem | undefined }) {
    const levelDisplay = item?.level ? `+${item.level}` : "";

    return (
        <TipDisplay
            heading={item ? `${slot}: ${item.data.name}${levelDisplay ? ` (${levelDisplay})` : ""}` : slot}
            body={item ? item.getDisplayText() : "No item equipped."}
            maxWidth="300px"
        >
            <Box
                tabIndex={0}
                aria-label={item ? `${slot}: ${item.data.name}${levelDisplay ? ` ${levelDisplay}` : ""}` : `${slot}: Empty`}
                width="40px"
                height="40px"
                align="center"
                justify="center"
                background="dark-1"
                border={{ color: 'grey-1' }}
            >
                {item ? (
                    <Stack anchor="top-right">
                        <IconImage data={item.getImageData()} scale={0.6} />
                        {levelDisplay && (
                            <Box background="dark-2" pad={{ horizontal: 'xxsmall' }}>
                                <Text size="xsmall">{levelDisplay}</Text>
                            </Box>
                        )}
                    </Stack>
                ) : (
                    <Text size="xsmall" color="accent-2">Empty</Text>
                )}
            </Box>
        </TipDisplay>
    );
}

export const PlayerActivitySection = ({ sneakingPlayers, players, floors, selectedMastery }: {
    sneakingPlayers: SneakingPlayer[],
    players: Player[],
    floors: SneakingFloor[],
    selectedMastery: number
}) => {
    const occupiedFloors = [...new Set(sneakingPlayers.map(player => player.floor))]
        .sort((first, second) => first - second)
        .map(index => floors[index]);

    return (
        <Box gap="small">
            <Text size="small" color="accent-2">Current mastery: {selectedMastery}</Text>
            <Box direction="row" gap="small" wrap margin={{ bottom: 'small' }}>
                {occupiedFloors.map(floor => (
                    <Box
                        key={floor.index}
                        role="group"
                        aria-label={`Floor ${floor.index + 1} overview`}
                        background="dark-1"
                        pad="small"
                        gap="medium"
                        direction="row"
                        align="center"
                        wrap
                    >
                        <Text size="small" weight={600}>Floor {floor.index + 1}</Text>
                        <TextAndLabel label="KO Flowers" text={commaNotation(floor.flowerStacks)} textSize="small" labelSize="xsmall" />
                        {floor.remainingHP > 0 && (
                            <TextAndLabel
                                label="Door HP"
                                text={`${floor.remainingHP === Infinity ? '∞' : notateNumber(floor.remainingHP, 'Big')} / ${floor.maxHP === Infinity ? '∞' : notateNumber(floor.maxHP, 'Big')}`}
                                textSize="small"
                                labelSize="xsmall"
                            />
                        )}
                    </Box>
                ))}
            </Box>
            {sneakingPlayers.map(player => {
                const playerData = players[player.index];
                const detectionPercent = player.detectionChance * 100;

                return (
                    <DataRow
                        key={player.index}
                        columns={["minmax(0, 2fr)", "minmax(0, 1fr)", "minmax(0, 1.3fr)", "minmax(0, .7fr)", "minmax(0, 1fr)", "minmax(190px, 2fr)"]}
                        fields={[
                            {
                                key: "identity",
                                kind: "identity",
                                name: playerData.playerName,
                                artwork: <IconImage data={playerData.getClassImageData()} scale={0.7} />
                            },
                            { key: "level", kind: "text", label: "Sneaking level", value: commaNotation(player.level) },
                            { key: "activity", kind: "content", label: "Activity", content: <PlayerActivity player={player} /> },
                            { key: "floor", kind: "text", label: "Floor", value: String(player.floor + 1) },
                            {
                                key: "detection",
                                kind: "text",
                                label: "Detection",
                                value: `${detectionPercent.toFixed(detectionPercent < 1 ? 4 : 2)}%`,
                                tooltip: `This is the chance that this ninja gets noticed while acting. Stealth: ${notateNumber(player.stealth, 'Big')}. Higher Stealth makes this ninja harder to notice. Shared bonuses use the best values available across your account. In-game values can differ with the character you play.`
                            },
                            {
                                key: "equipment",
                                kind: "content",
                                label: "Equipment",
                                content: (
                                    <Box direction="row" gap="xsmall" wrap>
                                        <EquippedItem slot="Hat" item={player.equipment.hat} />
                                        <EquippedItem slot="Weapon" item={player.equipment.weapon} />
                                        <EquippedItem slot="Charm 1" item={player.equipment.Trinket1} />
                                        <EquippedItem slot="Charm 2" item={player.equipment.Trinket2} />
                                    </Box>
                                )
                            }
                        ]}
                    />
                );
            })}
        </Box>
    );
}