import React from 'react'
import {
    Text,
    Box,
    Main,
} from "grommet"
import { useContext } from 'react'
import { AppContext, AppStatus, DataStatus } from '../data/appContext'
import { AuthStatus } from '../data/firebase/authContext'
import { useRouter } from 'next/dist/client/router';

import { HeaderComponent } from './header/header';
import { Navigation } from './navigation';
import { FooterComponent } from './footer/footer';
import { useAuthStore } from '../lib/providers/authStoreProvider';

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
    const { authStatus } = useAuthStore(
        (state) => state,
    )
    const appContext = useContext(AppContext);
    const router = useRouter();
    const validState = appContext.status == AppStatus.Ready;

    if (authStatus == AuthStatus.NoUser && appContext.status == AppStatus.Ready && appContext.dataStatus == DataStatus.NoData && !["/", "/privacy-policy"].includes(router.pathname)) {
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