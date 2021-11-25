import React from 'react'
import Script from 'next/script'
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
    ResponsiveContext,
    Menu
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'
import { User } from '@firebase/auth'
import { useRouter } from 'next/dist/client/router';

import { Menu as MenuIcon } from 'grommet-icons';

declare const window: Window &
    typeof globalThis & {
        adsbygoogle: any
    }

const NavButton = styled(Button)`
    color: ${props => props.color};
    font-size: 16px;
    font-weight: bold;
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

function FooterAd() {
    useEffect(() => {
        (window.adsbygoogle = window.adsbygoogle || []).push({});

        return () => {
            (window.adsbygoogle = window.adsbygoogle || []).length = 0;
        }
    })

    return (
        <Box>
            <ins className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9755300710945447"
                data-ad-slot="3258534874"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </Box>
    )
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
    const [user, setUser] = useState<User | undefined | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);

    const navItems = [
        { link: "/stamps", label: "Stamps"},
        { link: "/alchemy", label: "Alchemy"},
        { link: "/traps", label: "Traps"},
        { link: "/players", label: "Players"},
        // { link: "/bribes", label: "Bribes - WIP"},
        { link: "/achievements", label: "Achievements"},
        { link: "/looty-tracker", label: "Looty Tracker"},
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
        setUser(authData?.user);
        setLastUpdated(idleonData.getLastUpdated())
        setLoading(authData ? authData.isLoading : true);
    }, [authData, idleonData])

    if (loading) {
        return (
            <Box pad="large" fill align="center">
                <Text size="large">Loading Data</Text>
            </Box>);
    }

    if (!user && !loading && router.pathname != "/") {
        router.push('/');
    }

    return (
        <Box
            flex
            margin={{ horizontal: "auto" }}
            height={{ min: "100%" }}
        >
            <Script async key="adsense" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9755300710945447" crossOrigin="anonymous"></Script>
            <Header background="dark-1" height="56px" border={{ color: "white-1", side: "bottom" }}>
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' align="center" pad="small" fill>
                    <Link passHref href={"/"}>
                        <Box>
                            <PointerImage alt="Logo" src="/logo.svg" height="21px" width="171px" />
                        </Box>
                    </Link>
                    {user && <Box direction="row" gap="xlarge" pad="medium"><Text color="accent-3" size="small">Last Updated: {lastUpdated}</Text><Button onClick={() => onButtonClick(authData?.logoutFunction)}>Logout</Button></Box>}
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
                {user && (size === 'small' ?
                        <Box justify="end">
                            <Menu
                                a11yTitle="Navigation Menu"
                                dropProps={{ align: { top: 'bottom', right: 'right' } }}
                                icon={<MenuIcon color="brand" />}
                                dropBackground="dark-1"
                                margin="small"
                                items={navItems.map(({link, label}) => { return { label: <Link href={link}><Box className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</Box></Link>}})}
                            />
                        </Box>
                    :
                    <Box height={{ min: "56px", max: "56px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} style={{ boxShadow: "-7px 8px 16px 0 rgba(0,0,0,0.17)" }}>
                        <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                            <Nav direction="row">
                                {
                                    navItems.map(({link, label}) => (
                                        <Link key={`link_${label}`} href={link}><NavButton className={router.pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>
                                    ))
                                }
                            </Nav>
                        </Box>
                    </Box>)
                }
                <Box width={{ max: (router.pathname != '/players' && router.pathname != '/') ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                    <Box pad={{ right: (router.pathname != '/players' && router.pathname != '/') ? 'large' : '', left: (router.pathname != '/players' && router.pathname != '/') ? 'large' : '', bottom: 'medium' }}>
                        {children}
                    </Box>
                </Box>
                {/* <FooterAd /> */}
            </Main>
            <Footer height={{ min: "82px" }} background="dark-1">
                <Box width={{ max: '1440px' }} margin={{ left: 'auto', right: 'auto' }} direction="row" justify='between' fill="horizontal" align="center" pad="small">
                    <Image alt="Logo" src="/logo.svg" height="21px" width="171px" />
                    <Box direction="row" gap="small" pad="small">
                        <Image alt="discord_logo" src={"/discord-logo.svg"} height="21px" width="21px"/>
                        <Anchor color="white" target="_blank" href="https://discord.gg/zDb5sbR3">Idleon Efficiency</Anchor>
                    </Box>
                </Box>
            </Footer>
        </Box>
    )
}