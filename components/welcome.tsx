'use client'

import {
    Box,
    Text,
    Anchor,
    Grid,
    ResponsiveContext,
} from 'grommet'
import { useContext } from 'react';
import { AuthStatus } from '../data/firebase/authContext'
import ShadowBox from './base/ShadowBox';
import { useAuthStore } from '../lib/providers/authStoreProvider';
import { DataStatus } from '../lib/stores/appDataStore';
import { useAppDataStore } from '../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow'
import IconImage from './base/IconImage';
import LoginForm from './login/loginForm';

export default function Welcome() {
    const { user, authStatus } = useAuthStore(
        useShallow((state) => ({
            user: state.user,
            authStatus: state.authStatus,
        })),
    )
    const { profile, dataStatus } = useAppDataStore(
        useShallow((state) => ({ profile: state.profile, dataStatus: state.dataStatus }))
    )

    const size = useContext(ResponsiveContext);
    const isLoading = authStatus == AuthStatus.Loading;

    return (
        <Box>
            <Box fill align="center" gap="medium" height={{ min: '571px', max: '571px' }} background="brand">
                <Box margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns="1/2" fill pad="xlarge">
                        <Box pad="small" gap="small">
                            <Text size={size == "small" ? "32px" : "52px"}>Welcome to Idleon Efficiency</Text>
                            <Text size={size == "small" ? "18px" : "27px"}>Aimed to provide players of the game Legends of Idleon with tools to become more efficient</Text>
                        </Box>
                        <Box></Box>
                    </Grid>
                </Box>
                <Box width={{ max: '1440px' }} pad="large" fill margin={{ left: 'auto', right: 'auto' }} style={{ position: 'relative', top: '150px' }} >
                    {!isLoading && !user && dataStatus != DataStatus.StaticData &&
                        <LoginForm />
                    }
                    {
                        dataStatus == DataStatus.StaticData &&
                        <ShadowBox pad="large" background="dark-2" fill margin={{ left: 'auto', right: 'auto' }} flex={false} align='center'>
                            <Box gap="medium">
                                <Box direction="row" gap='xsmall'>
                                    <Text size='large'>You are viewing the public profile of:</Text>
                                    <Text size='large' color="accent-1">{profile}</Text>
                                </Box>
                                <Box gap="small" align="center">
                                    <Text size="large">Try it for yourself!</Text>
                                    <Text>Head over to <Anchor href='https://www.idleonefficiency.com' target='_blank'>https://www.idleonefficiency.com</Anchor></Text>
                                </Box>
                            </Box>
                        </ShadowBox>
                    }
                </Box>
            </Box>
            <Box height="300px"></Box>
            <Box>
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Text size={size == "small" ? "26px" : "38px"}>Awesome Features</Text>
                </Box>
                <Box width={{ max: '1440px' }} align="center" pad="small" fill margin={{ left: 'auto', right: 'auto' }}>
                    <Grid columns={["2/3", "1/3"]} fill>
                        <Box>
                            <IconImage data={{ location: 'feature1', width: 993, height: 671 }} />
                        </Box>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={size == "small" ? "medium" : "xlarge"}>Easily see your stamps</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>Keep tracks of your stamps and know exactly how much the next level will cost.</Text>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid columns={["1/3", "2/3"]} fill>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={size == "small" ? "medium" : "xlarge"}>All your players - in one spot.</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>See equipment, cards, anvil information and much more!</Text>
                            </Box>
                        </Box>
                        <Box>
                            <IconImage data={{ location: 'feature2', width: 993, height: 671 }} />
                        </Box>
                    </Grid>
                    <Grid columns={["2/3", "1/3"]} fill>
                        <Box>
                            <IconImage data={{ location: 'feature3', width: 993, height: 671 }} />
                        </Box>
                        <Box direction="row" gap="medium" pad="large" align="center">
                            <Box gap="small">
                                <Text size={size == "small" ? "medium" : "xlarge"}>Achievement Tracker</Text>
                                <Text size={size == "small" ? "xsmall" : "small"}>Easily track your achievements, and see progress on ones you&apos;ve yet to complete.</Text>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
