import { Box, Text } from "grommet";
import IconImage from "./IconImage";
import { Player } from "../../data/domain/player";
import { ReactNode } from "react";

export function CharacterBox({ player, borderColor = "none", title = player.playerName, opacity = 1, textColor = "grey-2", children }: { player: Player, title?: string, borderColor?: string, opacity?: number, textColor?: string, children?: ReactNode }) {
    return (
        <Box title={title} background="dark-2" pad={{ top: "xsmall", bottom: "xsmall", left: "small", right: "small" }} border={{ size: '1px', color: borderColor }}>
            <Box gap="xsmall" direction="row" align="center">
                <Box style={{ opacity: opacity }}>
                    <IconImage data={player.getClassImageData()} scale={0.7} />
                </Box>
                <Box>
                    <Text color={textColor} size="12px" truncate={true}>{player.playerName}</Text>
                </Box>
            </Box>
            {children}
        </Box>
    )
}