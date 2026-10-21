import { Box, Text } from "grommet";

type ResourceCharactersTooltipProps = {
    characters: readonly { playerId: number; playerName: string }[];
};

export default function ResourceCharactersTooltip({ characters }: ResourceCharactersTooltipProps) {
    return <Box gap="xxsmall" data-testid="characters-meeting-requirement">
        {characters.length === 0
            ? <Text size="xsmall">None</Text>
            : characters.map(character => <Text size="xsmall" key={character.playerId}>{character.playerName}</Text>)}
    </Box>;
}
