import type { NextPage } from 'next'
import { useState, useContext, useEffect } from 'react'

import StampData from '../components/stampData';
import TrapData from '../components/trapData';
import AlchemyData from '../components/alchemyData';
import PlayerData from '../components/playerData';

import Layout from '../components/layout';
import { AppContext } from '../data/appContext';

import { Tab, Tabs } from 'grommet';


const Home: NextPage = () => {
  const idleonData = useContext(AppContext);
  const [gameData, setGameData] = useState<Map<string, any>>(new Map());
  const [index, setIndex] = useState<number>(0);

  const onActive = (nextIndex: number) => setIndex(nextIndex);

  useEffect(() => {
    setGameData(idleonData.getData());
  }, [idleonData])

  return (
    <Layout>
      {gameData.size > 0 &&

        <Tabs activeIndex={index} onActive={onActive}>
          <Tab title="Stamps">
            <StampData />
          </Tab>
          <Tab title="Alchemy">
            <AlchemyData />
          </Tab>
          <Tab title="Traps">
            <TrapData />
          </Tab>
          <Tab title="Players">
            <PlayerData />
          </Tab>
        </Tabs>
      }
    </Layout>
  )
}


export default Home
