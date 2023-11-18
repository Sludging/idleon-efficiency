import { Anchor, Box, Footer, Header, Heading, Main, Text } from "grommet"
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const PointerImage = styled(Image)`
    cursor: pointer;
`

const Leaderboards = () => {

    return (
        <Box
            flex
            margin={{ horizontal: "auto" }}
            height={{ min: "100%" }}
        >
            <Header background="dark-1" height="56px" border={{ color: "white-1", side: "bottom" }}>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' align="center" pad="small" fill>
                    <Link passHref href={"/"} legacyBehavior>
                        <Box>
                            <PointerImage alt="Logo" src="/logo.svg" height="21px" width="171px" />
                        </Box>
                    </Link>
                </Box>
            </Header>
            <Main>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: 'large', left: 'large', bottom: 'medium' }}>
                        <Box fill align="center" margin={{ bottom: 'small' }}>
                            <Heading margin={{ bottom: 'small' }} level="1">Leaderboards</Heading>
                        </Box>
                        <Box direction="row" pad="medium" gap="medium" justify='center'>
                            <Text>
                                The leaderboards are now officially closed. More info available <a target="_blank" rel="noreferrer" color="accent" href="https://discord.com/channels/912156088873418792/912156088873418795/1120216540189573130">here</a>.
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Main>
            <Footer height={{ min: "82px" }} background="dark-1">
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                    <Image
                        alt="Logo"
                        src="/logo.svg"
                        style={{
                            height: "21px",
                            width: "171px"
                        }} />
                    <Box justify="end" direction="row" gap="medium">
                        <Anchor href="https://www.buymeacoffee.com/sludger" target="_blank"><Image
                            src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                            alt="Buy Me A Coffee"
                            style={{
                                height: "40px",
                                width: "150px"
                            }} /></Anchor>
                        <Box direction="row" gap="small" pad="small" justify="end">
                            <Image
                                alt="discord_logo"
                                src={"/discord-logo.svg"}
                                style={{
                                    height: "21px",
                                    width: "21px"
                                }} />
                            <Anchor color="white" target="_blank" href="https://discord.gg/AfsyBkSd2q">Idleon Efficiency</Anchor>
                        </Box>
                    </Box>
                </Box>
            </Footer>
        </Box>
    );
}

export default Leaderboards;
