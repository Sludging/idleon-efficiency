"use client"
import { Box, Button, Text, TextInput } from "grommet";
import ShadowBox from "../base/ShadowBox";
import { useAuthStore } from "../../lib/providers/authStoreProvider";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";


export default function SteamLogin() {
    const FIXED_STEAM_URL = "https://steamcommunity.com/openid/login?openid.ns=http://specs.openid.net/auth/2.0&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&openid.identity=http://specs.openid.net/auth/2.0/identifier_select&openid.return_to=https://www.legendsofidleon.com/steamsso/&openid.realm=https://www.legendsofidleon.com/steamsso/&openid.mode=checkid_setup"
    const [redirectUrl, setRedirectUrl] = useState<string>("");

    const { uglySteamLogin } = useAuthStore(useShallow(
        (state) => ({
            uglySteamLogin: state.uglySteamLogin,
        })
    ))

    return (
        <ShadowBox background="dark-1" pad="large" gap="medium" width="500px">
            <Box border={{ color: 'accent-3', side: 'bottom' }} pad={{ bottom: 'medium' }} fill>
                <Text size="24px">How to login with Steam</Text>
            </Box>
            <Box direction="row" gap="small" border={{ color: 'accent-3', side: 'bottom' }} pad={{ bottom: 'small' }} fill>
                <Box round="full" background="brand" width="24px" height="24px" align="center" justify="center">1</Box>

                <Box gap="small" align="start">
                    <Text size="xsmall">Click the steam login button below. A new tab will open. Log into your Steam account.</Text>
                    <Button onClick={() => window.open(FIXED_STEAM_URL, "_blank")}>
                        <img src="https://community.fastly.steamstatic.com/public/images/signinthroughsteam/sits_01.png" />
                    </Button>
                </Box>
            </Box>
            <Box direction="row" gap="small" pad={{ bottom: 'small' }} fill>
                <Box round="full" background="brand" width="24px" height="24px" align="center" justify="center">2</Box>
                <Box fill>
                    <Text size="xsmall">After logging in, you’ll see a Legend of Idleon page. Do nothing. Just copy the URL.
                        Come back here, paste the URL in the box, and click Login.</Text>
                </Box>
            </Box>
            <Box gap="small" fill>
                <Box width="medium" gap="small">
                    <TextInput
                        placeholder="Enter URL"
                        value={redirectUrl}
                        onChange={event => setRedirectUrl(event.target.value)}
                    />
                    <Button primary color="brand" label="Login" onClick={() => uglySteamLogin(redirectUrl)} />
                </Box>
            </Box>
            <Box pad={{ top: 'small' }}>
                <Box background='grey-1' pad='medium' round='xsmall'>
                    <Text size="xsmall">Tip: If you see "Unknown Error Occurred," ignore it. Just copy the URL and return here.</Text>
                </Box>
            </Box>
        </ShadowBox>
    )
}