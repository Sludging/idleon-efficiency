import {
    Box,
    Text,
    Tabs,
    Tab,
    Grid,
    Stack,
    Button
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { NextSeo } from 'next-seo';
import { ProfileStorage } from '../data/storage/profiles';
import { AuthContext } from '../data/firebase/authContext';

function RawData() {
    const [rawData, setRawData] = useState<any>();
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);

    const uploadData = () => {
        const user = authContext?.user;
        if (user) {
            ProfileStorage.uploadProfile(appContext.data, user);
        }
    }
    
    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            setRawData(theData.get("rawData"));
        }
    }, [appContext]);
    return (
        <Box align="center">
            <NextSeo title="Raw Data" />
            <Box>
                <Button onClick={() => uploadData()}>Upload</Button>
            </Box>
            <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
        </Box>
    )
}

export default RawData;