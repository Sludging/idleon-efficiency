import {
    Box, Button, Text,
} from 'grommet'
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../data/appContext'
import { NextSeo } from 'next-seo';

function RawData() {
    const [rawData, setRawData] = useState<any>();
    const [copyMessage, setCopyMessage] = useState<string>("");
    const appContext = useContext(AppContext);
    
    const copyToClipboard = () => {
        if (navigator && navigator.clipboard) {
            setCopyMessage("Copied!");
            setTimeout(() => {
                setCopyMessage("");
            }, 3000);
            return navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));
        }
        return Promise.reject('The Clipboard API is not available.');
    }

    useEffect(() => {
        if (appContext) {
            const theData = appContext.data.getData();
            const cleanRaw = JSON.parse(JSON.stringify(theData.get("rawData")));
            if (cleanRaw) {
                cleanRaw["playerNames"] = theData.get("playerNames");
            }
            setRawData(cleanRaw);
        }
    }, [appContext]);
    return (
        <Box align="center" pad="medium">
            <NextSeo title="Raw Data" />
            <Box direction="row" gap="medium" align="center">
                <Button style={{ color: "white" }} primary color="brand" label="Copy Raw JSON" onClick={() => copyToClipboard()} />
                { copyMessage != "" && <Text>{copyMessage}</Text> }
            </Box>
            <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
        </Box>
    )
}

export default RawData;