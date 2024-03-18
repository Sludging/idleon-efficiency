'use client'

import { Box } from 'grommet';
import type { NextPage } from 'next'
import React, { useContext, useEffect, useState } from 'react'
import Welcome from '../components/welcome';
import { AppContext, AppStatus, DataStatus } from '../data/appContext';
import Dashboard from '../pages/dashboard/dashboard';

enum HomeState {
    Invalid,
    NoData,
    Valid
}

const Home: NextPage = () => {
    const [homeState, setHomeState] = useState(HomeState.NoData)
    const appContext = useContext(AppContext);

    useEffect(() => {
        const dataStatus = appContext.dataStatus;
        const appStatus = appContext.status;
        if (appStatus == AppStatus.InvalidProfile) {
            setHomeState(HomeState.Invalid);
        } else if (dataStatus == DataStatus.NoData) {
            setHomeState(HomeState.NoData);
        } else if ([DataStatus.LiveData, DataStatus.StaticData].includes(dataStatus)) {
            setHomeState(HomeState.Valid);
        }
    }, [appContext])

    return (
        <React.Fragment>
            {homeState == HomeState.NoData && <Welcome />}
            {homeState == HomeState.Invalid && <Box>Invalid profile!</Box>}
            {homeState == HomeState.Valid && <Dashboard />}
        </React.Fragment>
    )
}


export default Home
