import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components'
import {
    Header,
    Text,
    Button,
    Box,
    Main,
    Nav,
    Footer,
    Anchor,
    ThemeContext,
    ResponsiveContext,
    Menu,
    Avatar,
    DropButton
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext, AppStatus } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'
import { useRouter } from 'next/dist/client/router';

import { CaretDownFill, FormDown, Menu as MenuIcon, User } from 'grommet-icons';
import TextAndLabel from './base/TextAndLabel';
import Icon from './leaderboards/icon';
import Discord from '../lib/discord';
import IconLink from './base/IconLink';

declare const window: Window &
    typeof globalThis & {
        adsbygoogle: any
    }

const NavButton = styled(Button)`
    color: ${props => props.color};
    font-size: 16px;
    font-weight: 500;
    height: 56px;
    margin-top: auto;
    margin-bottom: auto;

    border: ${props => props.style?.border};

    &:hover {
        color: #0376E3;
    }
    &.active {
        border-bottom: 2px solid #0376E3;
        color: #0376E3;
    }
`

const NavMenu = styled(Menu)`
    color: ${props => props.color};

    span {
        font-size: 16px;
        font-weight: 500;
    }

    div {
        padding: 0px;
    }

    height: 56px;
    margin-top: auto;
    margin-bottom: auto;

    &:hover {
        color: #0376E3;
    }
    &.active {
        border-bottom: 2px solid #0376E3;
        color: #0376E3;
    }
`

const PointerImage = styled(Image)`
    cursor: pointer;
`

const customNavDrop = {
    button: {
        size: {
            small: {
                pad: {
                    verical: '200px'
                }
            },
            medium: {
                pad: {
                    verical: '200px'
                }
            }
        }
    }
}

const specialRoutes = [
    "/players",
    "/account/task-board"
]


function OnHoverNav({ link, label, subLinks }: { link: string, label: string, subLinks: { subLink: string, label: string }[] | undefined }) {
    const router = useRouter();

    if (subLinks) {
        return (
            <NavMenu
                key={`link_${label}`}
                dropBackground="dark-1"
                dropProps={{ align: { top: 'bottom' }, elevation: 'navigation' }}
                items={subLinks.map(({ subLink, label }) => (
                    {
                        label: <Text size="small">{label}</Text>,
                        onClick: () => { router.push(link + subLink) },
                    }

                ))}
                icon={<FormDown size="medium" color="accent-3" />}
                label={label}
                className={router.pathname.includes(link) ? 'active' : ''} color="accent-2" />
        )
    }

    return (
        <Link key={`link_${label}`} href={link}><NavButton className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>
    )
}


export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const authData = useContext(AuthContext);
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);
    const router = useRouter();

    const [validState, setValidState] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [profileDropDownOpen, setProfileDropDownOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    const navItems = [
        { link: "/stamps", label: "Stamps" },
        {
            link: "/world-2", label: "World 2", subLinks: [
                { subLink: "/alchemy", label: "Alchemy" },
                { subLink: "/arcade", label: "Arcade" },
            ]
        },
        {
            link: "/world-3", label: "World 3", subLinks: [
                { subLink: "/construction", label: "Construction" },
                { subLink: "/worship", label: "Worship" },
                { subLink: "/trapping", label: "Trapping" },
            ]
        },
        { link: "/players", label: "Players" },
        // { link: "/bribes", label: "Bribes - WIP"},
        {
            link: "/account", label: "Account Wide", subLinks: [
                { subLink: "/task-board", label: "Task Board" },
                { subLink: "/constellations", label: "Constellations" },
                { subLink: "/quests", label: "Quests" },
                { subLink: "/looty-tracker", label: "Looty Tracker" },
                { subLink: "/storage", label: "Storage" },
                { subLink: "/obols", label: "Obols" },
                { subLink: "/dungeons", label: "Dungeons" },
            ]
        },
        { link: "/raw-data", label: "Raw Data" },
    ]

    const onButtonClick = (toCall: Function | undefined, value?: string) => {
        try {
            if (toCall) {
                if (value) {
                    toCall(value);
                }
                else {
                    toCall();
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (appContext.status == AppStatus.LiveData || appContext.status == AppStatus.StaticData) {
            setValidState(true);
        }
        else {
            setValidState(false);
        }
        setLastUpdated(appContext.data.getLastUpdated() as string)
        setLoading(authData ? authData.isLoading : true);
    }, [authData, appContext])

    if (loading) {
        return (
            <Box pad="large" fill align="center">
                <Text size="large">Loading Data</Text>
            </Box>);
    }

    if (!loading && !validState && router.pathname != "/") {
        router.push('/');
    }

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
                    {validState &&
                        <Box direction="row" gap="xlarge" pad="medium">
                            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={lastUpdated} />
                            {
                                appContext.status == AppStatus.LiveData &&
                                <Box direction="row">
                                    <DropButton
                                        plain={true}
                                        label={
                                            <Avatar direction='row'>
                                                <User color="accent-3" />
                                                <CaretDownFill size="small" />
                                            </Avatar>
                                        }
                                        open={profileDropDownOpen}
                                        title='Manage Profile'
                                        dropAlign={{ top: 'bottom', right: 'right' }}
                                        dropProps={{
                                            plain: true,
                                            elevation: 'navigation',
                                            background: 'dark-2',
                                            round: "small",
                                            onClickOutside: () => setProfileDropDownOpen(false),
                                            onEsc: () => setProfileDropDownOpen(false),
                                        }}
                                        onClick={() => setProfileDropDownOpen(true)}
                                        dropContent={
                                            <Box width="small" border={{ color: 'grey-1' }} round="small">
                                                <Link href={'/profile/upload'}>
                                                    <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                                        <Box pad="small">Public Profile</Box>
                                                    </Button>
                                                </Link>
                                                <Box border={{ color: 'grey-1' }} fill />
                                                <Button hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2" onClick={() => { onButtonClick(authData?.logoutFunction); setProfileDropDownOpen(false) }}>
                                                    <Box pad="small">Sign Out</Box>
                                                </Button>
                                            </Box>
                                        }
                                    />
                                </Box>
                            }
                            {
                                appContext.status == AppStatus.StaticData &&
                                <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label="Public Profile" text={appContext.profile} />
                            }
                        </Box>
                    }
                </Box>
            </Header>
            <Main>
                {validState && (size === 'small' ?
                    <Box justify="end">
                        <Menu
                            a11yTitle="Navigation Menu"
                            dropProps={{ align: { top: 'bottom', right: 'right' } }}
                            icon={<MenuIcon color="brand" />}
                            dropBackground="dark-1"
                            margin="small"
                            items={navItems.flatMap(({ link, label, subLinks }, index) => {
                                if (subLinks) {
                                    return subLinks.map(({ subLink, label }) => {
                                        return { pad: 'large', label: <Link key={index} href={link + subLink}><Box className={router.pathname == link + subLink ? 'active' : ''} color="accent-2">{label}</Box></Link> }
                                    })
                                }
                                return { pad: 'large', label: <Link key={index} href={link}><Box className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</Box></Link> }
                            })}
                        />
                    </Box>
                    :
                    <Box height={{ min: "56px", max: "56px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} elevation='navigation'>
                        <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                            <ThemeContext.Extend value={customNavDrop}>
                                <Nav direction="row">
                                    {
                                        navItems.map(({ link, label, subLinks }, index) => (<OnHoverNav key={index} link={link} label={label} subLinks={subLinks} />))
                                    }
                                </Nav>
                            </ThemeContext.Extend>
                        </Box>
                    </Box>)
                }
                <Box width={{ max: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', left: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', bottom: 'medium' }}>
                        {children}
                    </Box>
                </Box>
            </Main>
            <Footer height={{ min: "82px" }} background="dark-1">
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                    <Box direction="row" gap="medium" align="center">
                        <Box margin={{right: 'medium'}}>
                            <Image alt="Logo" src="/logo.svg" height="21px" width="171px" />
                        </Box>
                        <IconLink icon={Icon} href="/leaderboards" text="Leaderboards" />
                        <Box align="center" pad="small">
                            <Text size="12px" color="grey-2">|</Text>
                        </Box>
                        <IconLink icon={Discord} href="https://discord.gg/AfsyBkSd2q" text="Idleon Efficiency" />
                    </Box>
                    <Box justify="end" direction="row" gap="medium">
                        <Anchor href="https://www.buymeacoffee.com/sludger" target="_blank"><Image src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" height="40px" width="150px" /></Anchor>
                        
                    </Box>
                </Box>
            </Footer>
        </Box>
    )
}