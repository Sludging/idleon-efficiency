import {
    Box,
    Text,
    Tabs,
    Tab,
    Grid,
    Stack
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'


function RawData() {
    const [rawData, setRawData] = useState<any>();

    const idleonData = useContext(AppContext);

    useEffect(() => {
        if (idleonData) {
            const theData = idleonData.getData();
            setRawData(theData.get("rawData"));
        }
    }, [idleonData]);
    return (
        <Box align="center">
            <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
        </Box>
    )
}

export default RawData;