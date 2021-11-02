import {
    Box,
    Text,
} from "grommet"

import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../data/appContext';
import { Bribe } from "../data/domain/bribes";

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
        <Box gap="small" pad="medium">
            {
                bribeData ?
                    bribeData.filter(x => x.name != "Filler").map((bribe, index) => {
                        return (<Box key={`bribe_${index}`} direction="row" gap="medium">
                            <Text>{bribe.description}</Text>
                            <Text>{bribe.purchased ? "Purchased!" : "Nope!"}</Text>
                        </Box>)
                    })
                    : <></>
            }
        </Box>
    )
}