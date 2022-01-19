import {
    Box,
    Text,
    Heading
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import ShadowBox from "../components/base/ShadowBox";
import { AppContext } from '../data/appContext';
import { Bribe, BribeStatus } from "../data/domain/bribes";

function Bribes() {
    const [bribeData, setBribeData] = useState<Bribe[]>();
    const appContext = useContext(AppContext);

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setBribeData(theData.get("bribes"));
        }
    }, [appContext])
    return (
        <Box gap="small">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Bribes</Heading>
            <ShadowBox background="dark-1" pad="medium" gap="small">
                {
                    bribeData ?
                        bribeData.filter(x => x.name != "Filler" && x.status != BribeStatus.Locked).map((bribe, index) => {
                            return (<Box key={`bribe_${index}`} direction="row" gap="large">
                                <Text>{bribe.description}</Text>
                                <Text>{bribe.status == BribeStatus.Purchased ? "Purchased!" : "Go buy this!"}</Text>
                            </Box>)
                        })
                        : <></>
                }
            </ShadowBox>
        </Box>
    )
}

export default Bribes;