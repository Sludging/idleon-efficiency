import { Box } from 'grommet';
import type { NextPage } from 'next'
import React, { useContext } from 'react'
import Welcome from '../components/welcome';
import { AppContext, AppStatus } from '../data/appContext';

const Home: NextPage = () => {
  const appContext = useContext(AppContext);

  return (
    <React.Fragment>
      { appContext.status == AppStatus.InvalidProfile ? 
        <Box>
          Invalid profile!
        </Box>
        :
      <Welcome />
      }
    </React.Fragment>
  )
}


export default Home
