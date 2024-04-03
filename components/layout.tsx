import React from 'react'
import Image from "next/image";
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
    DropButton,
    ThemeType
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext, AppStatus, DataStatus } from '../data/appContext'
import { AuthContext, AuthStatus } from '../data/firebase/authContext'
import { useRouter } from 'next/dist/client/router';

import { CaretDownFill, FormDown, Menu as MenuIcon } from 'grommet-icons';
import TextAndLabel from './base/TextAndLabel';
import Icon from './leaderboards/icon';
import Discord from '../lib/discord';
import IconLink from './base/IconLink';
import { ArrowsClockwise, Spinner, User } from '@phosphor-icons/react';
import { normalizeColor } from 'grommet/utils';

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
                dropProps={{ align: { top: 'bottom', left: 'left' }, elevation: 'navigation' }}
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

    return <Link key={`link_${label}`} href={link} legacyBehavior><NavButton className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>;
}


export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const [profileDropDownOpen, setProfileDropDownOpen] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<string>("Loading");
    const [validState, setValidState] = useState<boolean>(false);

    const theme = useContext<ThemeType>(ThemeContext);
    const authData = useContext(AuthContext);
    const appContext = useContext(AppContext);
    const size = useContext(ResponsiveContext);
    const router = useRouter();

    useEffect(() => {
        setValidState(appContext.status == AppStatus.Ready);
        setLastUpdated(appContext.data.getLastUpdated() as string);
    }, [appContext]);

    const navItems = [
        {
            link: "/", label: "Dashboard"
        },
        {
            link: "/world-1", label: "W1", subLinks: [
                { subLink: "/stamps", label: "Stamps" },
                { subLink: "/forge", label: "Forge" },
                { subLink: "/anvil", label: "Anvil" },
            ]
        },
        {
            link: "/world-2", label: "W2", subLinks: [
                { subLink: "/alchemy", label: "Alchemy" },
                { subLink: "/arcade", label: "Arcade" },
            ]
        },
        {
            link: "/world-3", label: "W3", subLinks: [
                { subLink: "/construction", label: "Construction" },
                { subLink: "/worship", label: "Worship" },
                { subLink: "/trapping", label: "Trapping" },
                { subLink: "/equinox", label: "Equinox" },
            ]
        },
        {
            link: "/world-4", label: "W4", subLinks: [
                { subLink: "/cooking", label: "Cooking" },
                { subLink: "/lab", label: "Lab" },
                { subLink: "/breeding", label: "Breeding" },
                { subLink: "/rift", label: "Rift" },
            ]
        },
        {
            link: "/world-5", label: "W5", subLinks: [
                { subLink: "/divinity", label: "Divinity" },
                { subLink: "/sailing", label: "Sailing" },
                { subLink: "/gaming", label: "Gaming" },
            ]
        },
        {
            link: "/world-6", label: "W6", subLinks: [
                { subLink: "/sneaking", label: "Sneaking" },
                { subLink: "/summoning", label: "Summoning" },
                { subLink: "/farming", label: "Farming" },
            ]
        },
        { link: "/players", label: "Players" },
        // { link: "/bribes", label: "Bribes - WIP"},
        {
            link: "/account", label: "Account Wide", subLinks: [
                { subLink: "/task-board", label: "Task Board" },
                { subLink: "/constellations", label: "Constellations" },
                { subLink: "/quests", label: "Quests" },
                { subLink: "/slab", label: "Slab" },
                { subLink: "/storage", label: "Storage" },
                { subLink: "/obols", label: "Obols" },
                { subLink: "/dungeons", label: "Dungeons" },
                { subLink: "/companions", label: "Companions" },
                { subLink: "/cards", label: "Cards" },
            ]
        },
        { link: "/raw-data", label: "Raw Data" },
    ]

    const onMobileClick = (href: string) => {
        router.push(href);
    }

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

    if (authData?.authStatus == AuthStatus.NoUser && appContext.status == AppStatus.Ready && appContext.dataStatus == DataStatus.NoData && !["/", "/privacy-policy"].includes(router.pathname)) {
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
                    <Link passHref href={"/"} legacyBehavior>
                        <Box>
                            <PointerImage alt="Logo" src="/logo.svg" height={21} width={171} />
                        </Box>
                    </Link>
                    {validState &&
                        <Box direction="row" gap="xlarge" pad="medium">
                            {
                                [DataStatus.Init, DataStatus.Loading].includes(appContext.dataStatus) && <Box align="center" justify='center' animation={'rotateRight'}><ArrowsClockwise color={normalizeColor("green-2", theme)} size={24} /></Box>
                            }
                            {
                                [DataStatus.LiveData, DataStatus.StaticData].includes(appContext.dataStatus) && <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={lastUpdated} />
                            }

                            {
                                authData?.authStatus == AuthStatus.Valid &&
                                <Box direction="row">
                                    <DropButton
                                        plain={true}
                                        label={
                                            <Avatar direction='row'>
                                                <User color={normalizeColor("accent-3", theme)} size={24} />
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
                                                {appContext.dataStatus == DataStatus.LiveData && <Link href={'/profile/upload'} legacyBehavior>
                                                    <Button onClick={() => setProfileDropDownOpen(false)} hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2">
                                                        <Box pad="small">Public Profile</Box>
                                                    </Button>
                                                </Link>
                                                }
                                                < Box border={{ color: 'grey-1' }} fill />
                                                <Button hoverIndicator={{ color: 'brand', size: 'large' }} color="accent-2" onClick={() => { onButtonClick(authData?.logoutFunction); setProfileDropDownOpen(false) }}>
                                                    <Box pad="small">Sign Out</Box>
                                                </Button>
                                            </Box>
                                        }
                                    />
                                </Box>
                            }
                            {
                                appContext.dataStatus == DataStatus.StaticData &&
                                <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label="Public Profile" text={appContext.profile} />
                            }
                        </Box>
                    }
                </Box>
            </Header>
            <Main>
                {!validState && (
                    <Box pad="large" fill align="center">
                        <Text size="large">Loading Data</Text>
                    </Box>)
                }
                {validState && appContext.dataStatus != DataStatus.NoData && (size === 'small' ?
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
                                        return { fill: true, pad: 'large', onClick: () => onMobileClick(link + subLink), label: <Box key={index} className={router.pathname == link + subLink ? 'active' : ''} color="accent-2">{label}</Box> }
                                    })
                                }
                                return { fill: true, pad: 'large', onClick: () => onMobileClick(link), label: <Box key={index} className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</Box> }
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
                    </Box>
                )
                }
                {validState &&
                    <Box width={{ max: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                        <Box pad={{ right: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', left: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', bottom: 'medium' }}>
                            {children}
                        </Box>
                    </Box>
                }
            </Main>
            <Footer height={{ min: "182px" }} background="dark-1" align="start">
                <Box height={{ max: "82px" }} fill>
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
                            <IconLink icon={Icon} href="/privacy-policy" text="Privacy Policy" target="_self" />
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
                </Box>
            </Footer>
        </Box>
    );
}