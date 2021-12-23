import {
    Box,
    Heading,
} from 'grommet'
import { useEffect, useContext } from 'react';
import { AppContext } from '../../data/appContext'
import { NextSeo } from 'next-seo';

import ShadowBox from '../../components/base/ShadowBox';


function Worship() {
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
        }
    }, [idleonData]);

    // if (!playerTraps || playerTraps.filter(x => playerNames[x[0]?.playerID] != undefined).length == 0) {
    //     return (
    //         <Box align="center" pad="medium">
    //             <Heading level='3'>Come back when you unlocked this!</Heading>
    //         </Box>
    //     )
    // }
    return (
        <Box>
            <NextSeo title="Worship" />
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Worship</Heading>
            <ShadowBox background="dark-1" pad="large">
                Nothing here yet sorry, come back soon!
            </ShadowBox>
        </Box>
    )
}

export default Worship;