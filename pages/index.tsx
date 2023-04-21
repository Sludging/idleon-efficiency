import { Box } from 'grommet';
import type { NextPage } from 'next'
import React, { useContext } from 'react'
import Welcome from '../components/welcome';
import { AppContext, AppStatus, DataStatus } from '../data/appContext';
import Dashboard from './dashboard/dashboard';

const Home: NextPage = () => {
  const appContext = useContext(AppContext);

  return (
    <React.Fragment>
      { appContext.status == AppStatus.InvalidProfile && <Box>Invalid profile!</Box> }
      { appContext.dataStatus == DataStatus.NoData && <Welcome /> }
      { (appContext.dataStatus == DataStatus.LiveData || appContext.dataStatus == DataStatus.StaticData) && <Dashboard />}
    </React.Fragment>
  )
}


export default Home
