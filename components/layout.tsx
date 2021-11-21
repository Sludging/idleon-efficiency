import React from 'react'
import Script from 'next/script'
import Image from 'next/image';
import Head from 'next/head';
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
} from "grommet"
import { useContext, useState, useEffect } from 'react'
import { AppContext } from '../data/appContext'
import { AuthContext } from '../data/firebase/authContext'
import { User } from '@firebase/auth'
import { useRouter } from 'next/dist/client/router';

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
    const router = useRouter();

    const [showLayer, setShowLayer] = useState(false);
    const [user, setUser] = useState<User | undefined | null>(null);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(true);

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
                {user &&
                    <Box height={{ min: "56px", max: "56px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} style={{ boxShadow: "-7px 8px 16px 0 rgba(0,0,0,0.17)" }}>
                        <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                            <Nav direction="row">
                            <Link href={`/stamps`}><NavButton className={router.pathname == `/stamps` ? 'active' : ''} color="accent-2">Stamps</NavButton></Link>
                            <Link href={`/alchemy`}><NavButton className={router.pathname == `/alchemy` ? 'active' : ''} color="accent-2">Alchemy</NavButton></Link>
                            <Link href={`/traps`}><NavButton className={router.pathname == `/traps` ? 'active' : ''} color="accent-2">Traps</NavButton></Link>
                            <Link href={`/players`}><NavButton className={router.pathname == `/players` ? 'active' : ''} color="accent-2">Players</NavButton></Link>
                            <Link href={`/bribes`}><NavButton className={router.pathname == `/bribes` ? 'active' : ''} color="accent-2">Bribes - WIP</NavButton></Link>
                            <Link href={`/achievements`}><NavButton className={router.pathname == `/achievements` ? 'active' : ''} color="accent-2">Achievements - WIP</NavButton></Link>
                            <Link href={`/raw-data`}><NavButton className={router.pathname == `/raw-data` ? 'active' : ''} color="accent-2">Raw Data - No Styling</NavButton></Link>
                            </Nav>
                        </Box>
                    </Box>
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
                    <Text>Sludger.6559</Text>
                </Box>
            </Footer>
        </Box>
    )
}