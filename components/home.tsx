'use client'

import { Box } from 'grommet';
import type { NextPage } from 'next'
import React from 'react'
import Welcome from '../components/welcome';
import Dashboard from '../pages/dashboard/dashboard';
import { useAppDataStore } from '../lib/providers/appDataStoreProvider';
import { AppStatus, DataStatus } from '../lib/stores/appDataStore';
import { useShallow } from 'zustand/react/shallow'

const Home: NextPage = () => {
    const { dataStatus, appStatus } = useAppDataStore(
        useShallow((state) => ({
            dataStatus: state.dataStatus,
            appStatus: state.status
        }))
    )

    if (appStatus == AppStatus.InvalidProfile) {
        return (
            <Box>Invalid profile!</Box>
        )
    } else if ([DataStatus.LiveData, DataStatus.StaticData].includes(dataStatus)) {
        return (
            <><Dashboard /></>
        )
    }

    return <Welcome />
}


export default Home
