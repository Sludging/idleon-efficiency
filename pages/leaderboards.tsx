import { Anchor, Box, Button, Footer, Grid, Header, Heading, Main, ResponsiveContext, Text } from "grommet"
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ShadowBox from "../components/base/ShadowBox";
import TextAndLabel from "../components/base/TextAndLabel";
import Category from "../components/leaderboards/category";
import { AppContext, AppStatus } from "../data/appContext";
import { CategoryData, CategoryGroup, LeaderboardsData, TitleMap } from "../data/domain/leaderboards/data";
import { Player } from "../data/domain/player";
import { dateToText } from "../data/utility";

const PointerImage = styled(Image)`
    cursor: pointer;
`

const Leaderboards = ({ leaderboards }: { leaderboards: LeaderboardsData }) => {
    const [currentUser, setCurrentUser] = useState<string | undefined>(undefined);
    const [activeCategory, setActiveCategory] = useState<CategoryGroup | undefined>(undefined);
    const [filteredCategories, setFilteredCategories] = useState<CategoryData[] | undefined>(undefined);
    const size = useContext(ResponsiveContext);
    const appContext = useContext(AppContext);

    const categoryUpdateTime = new Date(leaderboards.data[0].UpdatedAt);

    const handleCategoryFilter = (group: CategoryGroup) => {
        if (activeCategory != undefined && activeCategory == group) {
            setActiveCategory(undefined);
            setFilteredCategories(undefined);
        }
        else {
            setActiveCategory(group)
        }
    }

    useEffect(() => {
        if (appContext.status == AppStatus.LiveData) {
            const data = appContext.data.getData();
            const playerData = data.get("players") as Player[];
            if (playerData && playerData.length > 0) {
                setCurrentUser(playerData[0].playerName.toLowerCase());
            }
        }

        if (activeCategory != undefined) {
            setFilteredCategories(leaderboards.data.filter(category => TitleMap.get(category.Category)?.group == activeCategory))
        }
    }, [appContext, activeCategory]);

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
                    <Box pad="medium">
                        {categoryUpdateTime instanceof Date && !isNaN(categoryUpdateTime.getTime()) &&
                            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={dateToText(categoryUpdateTime)} />
                        }
                    </Box>
                </Box>
            </Header>
            <Main>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: 'large', left: 'large', bottom: 'medium' }}>
                        <Box fill align="center" margin={{ bottom: 'small' }}>
                            <Heading margin={{ bottom: 'small' }} level="1">Leaderboards</Heading>
                        </Box>
                        {leaderboards.metadata &&
                            <Box pad={{ horizontal: "medium" }} fill direction="row" justify="between" gap="small">
                                <ShadowBox background="dark-1" pad="medium" fill>
                                    <TextAndLabel
                                        labelSize="xsmall"
                                        textSize="xxlarge"
                                        label="Total Profiles"
                                        text={leaderboards.metadata.TotalProfiles.toString()}
                                    />
                                </ShadowBox>
                                <ShadowBox background="dark-1" pad="medium" fill>
                                    <TextAndLabel
                                        labelSize="xsmall"
                                        textSize="xxlarge"
                                        label="Updated in the last week"
                                        text={leaderboards.metadata.UpdatedRecently.toString()}
                                    />
                                </ShadowBox>
                            </Box>
                        }
                        <Box direction="row" pad="medium" gap="medium" justify='center'>
                            {
                                Object.keys(CategoryGroup).reverse().map((group, index) => {
                                    if (isNaN(parseInt(group))) {
                                        const asEnum = CategoryGroup[group as keyof typeof CategoryGroup];
                                        return (
                                            <Button key={index} plain onClick={() => handleCategoryFilter(asEnum)}>
                                                <Box border={{ color: asEnum == activeCategory ? 'white' : 'grey-1', size: '2px' }} round="50px" align="center" pad={{ vertical: '10px', horizontal: '20px' }}>
                                                    <Text size="16px">{group}</Text>
                                                </Box>
                                            </Button>
                                        )
                                    }
                                })
                            }
                        </Box>
                        <Grid columns={size == "small" ? "1" : "1/3"} pad="medium" gap="small">
                            {
                                (filteredCategories ? filteredCategories : leaderboards.data).map((category, index) => (
                                    <Category key={index} data={category} currentUser={currentUser} />
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
    const leaderboards = await res.json() as LeaderboardsData;

    const isLocal = process.env.NEXT_PUBLIC_ROOT_URL == "localhost:3000";
    if (isLocal) {
        leaderboards.data = leaderboards.data
            .sort((category1, category2) => (TitleMap.get(category1.Category)?.group ?? 9999) > (TitleMap.get(category2.Category)?.group ?? 9999) ? -1 : 1)
    }
    else {
        leaderboards.data = leaderboards.data.filter(category => TitleMap.get(category.Category) != undefined)
            .sort((category1, category2) => (TitleMap.get(category1.Category)?.group ?? 9999) > (TitleMap.get(category2.Category)?.group ?? 9999) ? -1 : 1)
    }

    return {
        props: {
            leaderboards
        },
        revalidate: 1800,
    }
}

export default Leaderboards;
