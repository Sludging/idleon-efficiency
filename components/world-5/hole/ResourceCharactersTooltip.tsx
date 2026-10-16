import { Box, Text } from "grommet";

type ResourceCharactersTooltipProps = {
    efficiencyThreshold: number | null;
    characters: readonly { playerId: number; playerName: string }[];
};

export default function ResourceCharactersTooltip({ efficiencyThreshold, characters }: ResourceCharactersTooltipProps) {
    return <Box gap="xxsmall" data-testid="characters-meeting-requirement">
        {efficiencyThreshold === null
            ? <Text size="xsmall">Unavailable</Text>
            : characters.length === 0
                ? <Text size="xsmall">None</Text>
                : characters.map(character => <Text size="xsmall" key={character.playerId}>{character.playerName}</Text>)}
    </Box>;
}
