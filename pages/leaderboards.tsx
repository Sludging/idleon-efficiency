import { Anchor, Box, Footer, Grid, Header, Main, ResponsiveContext } from "grommet"
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Category from "../components/leaderboards/category";
import { AppContext, AppStatus } from "../data/appContext";
import { LeaderboardsData } from "../data/domain/leaderboards/data";
import { Player } from "../data/domain/player";

const PointerImage = styled(Image)`
    cursor: pointer;
`

const Leaderboards = ({ leaderboards } : { leaderboards: LeaderboardsData }) => {
    const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
    const size = useContext(ResponsiveContext);
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext.status == AppStatus.LiveData) {
            const data = appContext.data.getData();
            const playerData = data.get("players") as Player[];
            if (playerData && playerData.length > 0) {
                setCurrentUser(playerData[0].playerName.toLowerCase());
            }
        }
    }, [appContext]);
    
    return (
        <Box
            flex
            margin={{ horizontal: "auto" }}
            height={{ min: "100%" }}
        >
            <Header background="dark-1" height="56px" border={{ color: "white-1", side: "bottom" }}>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' align="center" pad="small" fill>
                    <Link passHref href={"/"}>
                        <Box>
                            <PointerImage alt="Logo" src="/logo.svg" height="21px" width="171px" />
                        </Box>
                    </Link>
                    </Box>
            </Header>
            <Main>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: 'large', left: 'large', bottom: 'medium' }}>
                        <Grid columns={size == "small" ? "1" : "1/3"} pad="medium" gap="small">
                        {
                            leaderboards.data.map((category, index) => (
                                <Category key={index} data={category} currentUser="koneko_toujou" />
                            ))
                        }
                        </Grid>
                    </Box>
                </Box>
            </Main>
            <Footer height={{ min: "82px" }} background="dark-1">
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                    <Image alt="Logo" src="/logo.svg" height="21px" width="171px" />
                    <Box justify="end" direction="row" gap="medium">
                        <Anchor href="https://www.buymeacoffee.com/sludger" target="_blank"><Image src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" height="40px" width="150px" /></Anchor>
                        <Box direction="row" gap="small" pad="small" justify="end">
                            <Image alt="discord_logo" src={"/discord-logo.svg"} height="21px" width="21px" />
                            <Anchor color="white" target="_blank" href="https://discord.gg/AfsyBkSd2q">Idleon Efficiency</Anchor>
                        </Box>
                    </Box>
                </Box>
            </Footer>
        </Box>
    )
}

export async function getStaticProps() {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const res = await fetch('https://api.idleonefficiency.com/leaderboards')
    const leaderboards = await res.json()
  
    return {
      props: {
        leaderboards,
      },
      revalidate: 21600,
    }
  }

export default Leaderboards;