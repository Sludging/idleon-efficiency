import {
    Box,
    Text,
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { Bribe, BribeStatus } from "../data/domain/bribes";

export default function BribeData() {
    const [bribeData, setBribeData] = useState<Bribe[]>();
    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setBribeData(theData.get("bribes"));
        }
    }, [idleonData])
    return (
        <Box gap="small" pad="xlarge">
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
        </Box>
    )
}