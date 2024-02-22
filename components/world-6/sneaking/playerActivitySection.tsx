import { Box, Grid, Text } from "grommet";
import { CharacterBox } from "../../base/CharacterBox";
import IconImage from "../../base/IconImage";
import { SneakingActivity, SneakingPlayer } from "../../../data/domain/world-6/sneaking";
import { ImageData } from "../../../data/domain/imageData";
import { SkillsIndex } from "../../../data/domain/SkillsIndex";
import { Player } from "../../../data/domain/player";

export const PlayerActivity = ({ player }: { player: SneakingPlayer }) => {
    const imageData: ImageData = {
        location: `sneaking_activity_${player.activity.toString().toLowerCase().replace(" ", "")}`,
        width: 40,
        height: 40
    }
    let text = <Text size="xsmall">{player.activity == SneakingActivity.KnockedOut ? "KOed" : player.activity.toString()}</Text>;
    if (player.activity == SneakingActivity.Tied) {
        text = <Text size="xsmall">Floor {player.floor}</Text>
    }

    return (
        <Box direction="row" align="center" pad={{ bottom: 'xsmall' }} gap="xsmall">
            <IconImage data={imageData} scale={0.6} />
            {/* The image has some blank space on top, so we pad the text a bit to make it more aligned. */}
            <Box pad={{ top: 'xsmall' }}>{text}</Box>
        </Box>
    )
}

export const PlayerActivitySection = ({ sneakingPlayers, players }: { sneakingPlayers: SneakingPlayer[], players: Player[] }) => {
    return (
        <Box>
            <Text size="large">Player Activity</Text>
            <Grid columns={{ size: 'small', count: 'fill' }} pad={{ top: "small", bottom: "small" }}>
                {
                    sneakingPlayers.map((player, index) => {
                        const playerData = players[player.index]
                        return (
                            <Box key={index} margin={{ right: 'small', bottom: 'small' }}>
                                <CharacterBox player={playerData} textColor={player.activity == SneakingActivity.Tied ? 'grey-2' : 'white-2'} borderColor={player.activity == SneakingActivity.Tied ? 'grey-1' : 'green-1'}>
                                    <Box direction="row" margin={{ top: 'xsmall' }}>
                                        <Box pad={{ right: 'small' }} margin={{ right: 'small' }} direction="row" border={{ side: 'right', color: 'grey-1' }} align="center">
                                            <Box width={{ max: '15px' }} margin={{ right: 'xsmall' }}>
                                                <IconImage data={{ location: 'ClassIcons58', height: 36, width: 38 }} scale={0.4} />
                                            </Box>
                                            <Text size="small" truncate={false}>{playerData.skills.get(SkillsIndex.Sneaking)?.level}</Text>
                                        </Box>
                                        <PlayerActivity player={player} />
                                    </Box>
                                </CharacterBox>
                            </Box>)
                    })
                }
            </Grid>
        </Box>
    )
}