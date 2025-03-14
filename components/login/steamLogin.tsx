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
        <ShadowBox background="dark-1" pad="large" gap="medium">
            <Box pad="small" gap="small">
                <Text>The <Text color='accent-3' weight='bold'>Login through Steam</Text> button below will open a new tab that will ask you to login to Steam.</Text>
                <Text>Once you are logged in, you will be redirected to a Legend of Idleon page. <Text color='accent-1' weight='bold'>You don't need to do any action on this page.</Text></Text>
                <Text>Copy the URL of that page and come back here and paste it in the box below and click Login.</Text>
                <Text>If you hit a page that says <Text color='accent-1'>"Unknown Error Occured"</Text>, you can ignore it and copy the URL and come back to this page.</Text>
            </Box>
            <Box align="center" gap="small" fill>
                <Button primary color="accent-3" label="Login through Steam" onClick={() => window.open(FIXED_STEAM_URL, "_blank")} />
            </Box>
            <Box gap="small" fill>
                <TextInput
                    placeholder="Enter URL"
                    value={redirectUrl}
                    onChange={event => setRedirectUrl(event.target.value)}
                />
                <Button primary color="brand" label="Login" onClick={() => uglySteamLogin(redirectUrl)} />
            </Box>
        </ShadowBox>
    )
}