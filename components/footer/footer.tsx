import { Anchor, Box, Footer, Text } from "grommet"
import Image from "next/image"
import IconLink from "../base/IconLink"
import Icon from "../leaderboards/icon"
import Discord from "../../lib/discord"

export const FooterComponent = () => {
    return (
        <Footer height={{ min: "82px" }} background="dark-1">
            <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                <Box direction="row" gap="small" align="center">
                    <Box>
                        <Image
                            alt="Logo"
                            src="/logo.svg"
                            width={171}
                            height={21}
                        />
                    </Box>
                    <Box align="center" pad="small">
                        <Text size="12px" color="grey-2">|</Text>
                    </Box>
                    <Box direction="row" align="center" gap="small">
                        <Box>
                            <a href="https://www.playwire.com/contact-direct-sales" rel="noopener" target="_blank">
                                <img src="https://www.playwire.com/hubfs/Powered-by-Playwire-Badges/Ads-Powered-by-playwire-2021-standalone-small-white-300px.png" alt="Ads-Powered-by-playwire-2021-standalone-small-white-300px" loading="lazy" style={{ width: "150px", height: '40px', display: "block" }}></img>
                            </a>
                        </Box>
                        <Box>
                            <IconLink href="https://www.playwire.com/contact-direct-sales" text="Advertise on this site." target="_blank" />
                            {/* <a style={{ textDecoration: 'none', color: "#828D99", fontWeight: 'bold' }} color="#828D99" href="https://www.playwire.com/contact-direct-sales" rel="noopener" target="_blank">Advertise on this site.</a> */}
                        </Box>
                    </Box>
                    <Box align="center" pad="small">
                        <Text size="12px" color="grey-2">|</Text>
                    </Box>
                    <IconLink icon={Icon} href="https://www.idleonefficiency.com/privacy-policy" text="Privacy Policy" target="_self" />
                    <Box align="center" pad="small">
                        <Text size="12px" color="grey-2">|</Text>
                    </Box>
                    <IconLink icon={Discord} href="https://discord.gg/AfsyBkSd2q" text="Idleon Efficiency" />
                </Box>
                <Box justify="end" direction="row" gap="medium">
                    <Anchor href="https://www.buymeacoffee.com/sludger" target="_blank"><Image
                        src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png"
                        alt="Buy Me A Coffee"
                        height={40}
                        width={150}
                        unoptimized
                    /></Anchor>
                </Box>
            </Box>
        </Footer>
    )
}