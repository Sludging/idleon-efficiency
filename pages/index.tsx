import type { NextPage } from 'next'
import React from 'react'
import Welcome from '../components/welcome';

const Home: NextPage<{domain: string}> = ({ domain }) => {
  return (
    <React.Fragment>
      <Welcome />
    </React.Fragment>
  )
}


export default Home
