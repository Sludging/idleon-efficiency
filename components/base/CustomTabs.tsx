import { Box, Text } from "grommet";
import { css } from "styled-components";
import { Player } from "../../data/domain/player";
import IconImage from "./IconImage";

export const customTabsTheme = {
    tab: {
        active: {
            color: 'brand',
            background: 'none',
            border: undefined,
        },
        border: undefined,
        pad: {
            top: 'small',
            bottom: undefined,
            horizontal: 'small',
        },
        extend: ({ _theme }: { _theme: any }) => css`
            height: 56px;
            weight: 'none';
        `
    },
    tabs: {
        extend: ({ _theme }: { _theme: any }) => css`
            max-width: 100%;
            min-width: 100%;
            margin-left: auto;
            margin-right: auto;
        `,
        header: {
            background: 'dark-2',
            extend: ({ _theme }: { _theme: any }) => css`
                alignItems: "center";
                box-shadow: -7px 8px 16px 0 rgba(0,0,0,0.17);
        `,
        }
    }
}

export const CustomTabTitle = ({ label, isActive, player }: { label?: string, isActive: boolean, player?: Player }) => {
    if (label) {
        return (
            <Box direction="row" align="center" margin={{ top: "xsmall", bottom: "xsmall" }}>
                <Text size="small" color={isActive ? 'brand' : 'accent-2'}>
                    {label}
                </Text>
            </Box>
        )
    }

    if (player) {
        return (
            <Box direction="row" align="center" margin={{ vertical: 'xsmall' }}>
                <Box margin={{ right: 'xsmall' }}>
                    <IconImage data={player.getClassImageData()} scale={0.6} />
                </Box>
                <Box margin={{ right: 'xsmall' }}>
                    <Text size="xsmall" color={isActive ? 'brand' : 'accent-2'}>
                        {player.playerName ? player.playerName : `Character ${player.playerID}`}
                    </Text>
                </Box>
                {/* <IconImage data={player.getActivityIcon()} scale={0.4} /> */}
            </Box>
        )
    }

    return <></>;
}
