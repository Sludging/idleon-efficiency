"use client"

import {
    Box, Button, Text,
} from 'grommet'
import { useState, useEffect } from 'react';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function RawData() {
    const [rawData, setRawData] = useState<any>();
    const [copyMessage, setCopyMessage] = useState<string>("");
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

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
        // This is very ugly but I don't really want to overthink this.
        const rawData = theData.get("rawData");
        if (rawData) {
            const cleanRaw = JSON.parse(JSON.stringify(theData.get("rawData")));
            if (cleanRaw) {
                cleanRaw["playerNames"] = theData.get("playerNames");
                cleanRaw["companions"] = Array.from(new Set(theData.get("ownedCompanions"))); // can probably remove duplicates earlier on, but :shrug:
                cleanRaw["servervars"] = theData.get("servervars");
            }
            setRawData(cleanRaw);
        }
    }, [theData]);
    return (
        <Box align="center" pad="medium">
            <Box direction="row" gap="medium" align="center">
                <Button style={{ color: "white" }} primary color="brand" label="Copy Raw JSON" onClick={() => copyToClipboard()} />
                {copyMessage != "" && <Text>{copyMessage}</Text>}
            </Box>
            <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
        </Box>
    )
}

export default RawData;