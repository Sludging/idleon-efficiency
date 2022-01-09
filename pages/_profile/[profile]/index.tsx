import { promises as fs } from 'fs'
import path from 'path'

import type { NextPage } from 'next'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../../data/firebase/authContext'

import { Box, Text } from 'grommet';
import Welcome from '../../../components/welcome';

interface PageProps {
  profile: string,
  data: Map<string, any>,
  charNames: string[]
}

const Home: NextPage<PageProps> = ({ profile, data, charNames }) => {
  const authData = useContext(AuthContext);
  const [validState, setValidState] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    console.log("UseEffect: Index");
    if (authData?.user || authData?.publicProfile) {
      setValidState(true);
    }
    else {
      setValidState(false);
      if (profile && data) {
        authData?.handlePublicProfile(profile, data, charNames);
      }
    }

    setLoading(authData?.isLoading ?? true);
  }, [authData])

  return (
    <React.Fragment>
      {loading ?
        <Box pad="large" fill align="center">
          <Text size="large">Loading Data</Text>
        </Box>
        :
        validState ? <Welcome />
          : <Box pad="large" fill align="center">
            <Text size="large">Bad Profile</Text>
          </Box>
      }
    </React.Fragment>
  )
}


export default Home


const mockDB = [
  {
    profile: 'sludger',
    char_names: [...Array(9)].map((number, index) => { return `Player_${number}` })
  },
]

export async function getStaticPaths() {
  // get all known public profiles.
  // build paths for each of the sites in the previous two lists
  const paths = [
    ...mockDB.map((item) => {
      return { params: { profile: item.profile } }
    })
  ]
  return {
    paths: paths,
    fallback: true, // fallback true allows sites to be generated using ISR
  }
}

export async function getStaticProps({ params: { profile } }: { params: { profile: string } }) {
  const profileDirectory = path.join(process.cwd(), 'profiles')
  // fetch data from mock database using the site value as the key
  console.log("Got profile: ", profile);
  if (profile) {
    let profileData = {};
    let charNames: string[] = [];
    const data = mockDB.filter((item) => item.profile == profile)[0]
    if (data) {
      const filePath = path.join(profileDirectory, `${profile}.json`);
      charNames = data.char_names;
      try {
        const fileContents = await fs.readFile(filePath, 'utf8')
        profileData = JSON.parse(fileContents);
      }
      catch (e) {
        console.debug("Invalid profile ", profile);
      }
      return {
        props: { data: profileData, charNames: charNames, profile: profile },
        revalidate: 10, // set revalidate interval of 10s
      }
    }
  }

  return {
    props: { data: null, charNames: null, profile: profile },
    revalidate: 10, // set revalidate interval of 10s
  }
}