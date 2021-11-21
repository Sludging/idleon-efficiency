import type { NextPage } from 'next'
import React, { useState, useContext, useEffect } from 'react'
import Link from 'next/link';

import { AppContext } from '../data/appContext';
import { AuthContext } from '../data/firebase/authContext'
import { User } from '@firebase/auth'

import { Box, Text, Nav, Anchor } from 'grommet';
import Welcome from '../components/welcome';

const Home: NextPage = () => {
  const idleonData = useContext(AppContext);
  const authData = useContext(AuthContext);

  const [index, setIndex] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | undefined | null>(null);

  const onActive = (nextIndex: number) => setIndex(nextIndex);

  useEffect(() => {
    setUser(authData?.user);
    setLoading(authData ? authData.isLoading : true);
  }, [idleonData, authData])

  return (
    <React.Fragment>
      {loading ?
        <Box pad="large" fill align="center">
          <Text size="large">Loading Data</Text>
        </Box>
        : <Welcome />
      }
    </React.Fragment>
  )
}


export default Home
