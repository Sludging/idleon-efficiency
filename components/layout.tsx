import React from 'react'
import Image from "next/image";
import {
    Text,
    Box,
    Main,
    Footer,
    Anchor,
} from "grommet"
import { useContext } from 'react'
import { AppContext, AppStatus, DataStatus } from '../data/appContext'
import { AuthContext, AuthStatus } from '../data/firebase/authContext'
import { useRouter } from 'next/dist/client/router';

import Icon from './leaderboards/icon';
import Discord from '../lib/discord';
import IconLink from './base/IconLink';
import { HeaderComponent } from './header/header';
import { Navigation } from './navigation';
import { FooterComponent } from './footer/footer';

declare const window: Window &
    typeof globalThis & {
        adsbygoogle: any
    }

const specialRoutes = [
    "/players",
    "/account/task-board"
]


export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const authData = useContext(AuthContext);
    const appContext = useContext(AppContext);
    const router = useRouter();

    const validState = appContext.status == AppStatus.Ready;

    if (authData?.authStatus == AuthStatus.NoUser && appContext.status == AppStatus.Ready && appContext.dataStatus == DataStatus.NoData && !["/", "/privacy-policy"].includes(router.pathname)) {
        router.push('/');
    }


    return (
        <Box
            flex
            margin={{ horizontal: "auto" }}
            height={{ min: "100%" }}
        >
            <HeaderComponent />
            <Navigation />
            <Main>
                {!validState && (
                    <Box pad="large" fill align="center">
                        <Text size="large">Loading Data</Text>
                    </Box>)
                }
                {validState &&
                    <Box width={{ max: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? '1440px' : '' }} margin={{ left: 'auto', right: 'auto' }} fill="horizontal">
                        <Box pad={{ right: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', left: (!specialRoutes.includes(router.pathname) && router.pathname != '/') ? 'large' : '', bottom: 'medium' }}>
                            {children}
                        </Box>
                    </Box>
                }
            </Main>
            <FooterComponent />
        </Box>
    );
}