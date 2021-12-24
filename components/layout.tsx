import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components'
import {
    Header,
    Text,
    Button,
    Box,
    Layer,
    Main,
    TextInput,
    Nav,
    Footer,
    Anchor,
    ThemeContext,
    ResponsiveContext,
    Menu
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'
import { useRouter } from 'next/dist/client/router';

import { FormDown, Menu as MenuIcon } from 'grommet-icons';

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
                pad:  {
                    verical: '200px'
                }
            },
            medium: {
                pad:  {
                    verical: '200px'
                }
            }
        }
    }
}


export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const authData = useContext(AuthContext);
    const idleonData = useContext(AppContext);
    const size = useContext(ResponsiveContext);
    const router = useRouter();

    const [showLayer, setShowLayer] = useState(false);
    const [validState, setValidState] = useState<boolean>(false);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);

    const navItems = [
        { link: "/stamps", label: "Stamps"},
        { link: "/alchemy", label: "Alchemy"},
        { link: "/world-3", label: "World 3", subLinks: [
            { subLink: "/construction", label: "Construction"},
            { subLink: "/worship", label: "Worship"},
            { subLink: "/trapping", label: "Trapping"},
        ]},
        { link: "/players", label: "Players"},
        // { link: "/bribes", label: "Bribes - WIP"},
        { link: "/account", label: "Account Wide", subLinks: [
            { subLink: "/achievements", label: "Achievements"},
            { subLink: "/constellations", label: "Constellations"},
            { subLink: "/quests", label: "Quests"},
            { subLink: "/looty-tracker", label: "Looty Tracker"},
            { subLink: "/storage", label: "Storage"},
        ]},
        { link: "/raw-data", label: "Raw Data"},
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
        finally {
            setShowLayer(false);
        }
    }

    useEffect(() => {
        if (authData?.user || authData?.isDemo) {
            setValidState(true);
        }
        else {
            setValidState(false);
        }
        setLastUpdated(idleonData.getLastUpdated() as string)
        setLoading(authData ? authData.isLoading : true);
    }, [authData, idleonData])

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
                    {validState && <Box direction="row" gap="xlarge" pad="medium"><Text color="accent-3" size="small">Last Updated: {lastUpdated}</Text><Button onClick={() => onButtonClick(authData?.logoutFunction)}>Logout</Button></Box>}
                {showLayer &&
                    <Layer
                        onEsc={() => setShowLayer(false)}
                        onClickOutside={() => setShowLayer(false)}
                        modal={true}
                        position="center"


                >
                        <Box pad="medium" gap="small" width="medium" background="grey">
                            <Button disabled label="Google Login" color="black" onClick={() => onButtonClick(authData?.loginFunction)} />
                            <Box align="center" flex="grow" pad="small">
                                <Text>or</Text>
                            </Box>
                            <TextInput
                                placeholder="ID Token"
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />
                            <Button label="Handle Token" color="black" onClick={() => onButtonClick(authData?.tokenFunction, value)} />
                        </Box>
                    </Layer>
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
                                items={navItems.flatMap(({link, label, subLinks}) => { 
                                    if (subLinks)  {
                                        return subLinks.map(({ subLink, label}) => {
                                            return { pad: 'large', label: <Link href={link+subLink}><Box className={router.pathname == link+subLink ? 'active' : ''} color="accent-2">{label}</Box></Link>}
                                        })
                                    }
                                    return { pad: 'large', label: <Link href={link}><Box className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</Box></Link>}})}
                            />
                        </Box>
                    :
                    <Box height={{ min: "56px", max: "56px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} elevation='navigation'>
                        <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                            <ThemeContext.Extend value={customNavDrop}>
                                <Nav direction="row">
                                    {
                                        navItems.map(({link, label, subLinks}) => {
                                            if (subLinks) {
                                                return (
                                                    <NavMenu
                                                    key={`link_${label}`} 
                                                    dropBackground="dark-1"
                                                    dropProps={{ align: { top: 'bottom' },  elevation: 'navigation' }}
                                                    items={subLinks.map(({ subLink, label}) => (
                                                        { 
                                                            label: <Text size="small">{label}</Text>,
                                                            onClick: () => { router.push(link + subLink)},
                                                        }
                                                        
                                                    ))} 
                                                    icon={<FormDown size="medium" color="accent-1"/>}
                                                    label={label}
                                                    className={router.pathname.includes(link) ? 'active' : ''} color="accent-2" />
                                                )
                                            }
                                            
                                            return (
                                                <Link key={`link_${label}`} href={link}><NavButton className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>
                                            )
                                        })
                                    }
                                </Nav>
                            </ThemeContext.Extend>
                        </Box>
                    </Box>)
                }
                <Box width={{ max: (router.pathname != '/players' && router.pathname != '/') ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: (router.pathname != '/players' && router.pathname != '/') ? 'large' : '', left: (router.pathname != '/players' && router.pathname != '/') ? 'large' : '', bottom: 'medium' }}>
                        {children}
                    </Box>
                </Box>
            </Main>
            <Footer height={{ min: "82px" }} background="dark-1">
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                    <Image alt="Logo" src="/logo.svg" height="21px" width="171px" />
                    <Box justify="end" direction="row" gap="medium">
                        <Anchor href="https://www.buymeacoffee.com/sludger" target="_blank"><Image src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" height="40px" width="150px" /></Anchor>
                        <Box direction="row" gap="small" pad="small" justify="end">
                            <Image alt="discord_logo" src={"/discord-logo.svg"} height="21px" width="21px"/>
                            <Anchor color="white" target="_blank" href="https://discord.gg/AfsyBkSd2q">Idleon Efficiency</Anchor>
                        </Box>
                    </Box>
                </Box>
            </Footer>
        </Box>
    )
}