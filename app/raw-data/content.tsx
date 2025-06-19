"use client"

import {
    Box, Button, Text,
} from 'grommet'
import { useState, useEffect } from 'react';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { DataStatus } from '../../lib/stores/appDataStore';

function RawData() {
    const [rawData, setRawData] = useState<any>();
    const [copyMessage, setCopyMessage] = useState<string>("");
    const { dataStatus, theData } = useAppDataStore(useShallow(
        (state) => ({ dataStatus: state.dataStatus, theData: state.data.getData(), lastUpdated: state.lastUpdated })
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
        if ([DataStatus.Init, DataStatus.Loading, DataStatus.MissingData].includes(dataStatus)) {
            return;
        }

        if (!theData) {
            return;
        }

        // This is very ugly but I don't really want to overthink this.
        const rawData = theData.get("rawData");

        if (!rawData) {
            return;
        }

        const cleanRaw = JSON.parse(JSON.stringify(rawData));

        if (!cleanRaw) {
            return;
        }

        cleanRaw["playerNames"] = theData.get("playerNames");
        cleanRaw["companions"] = Array.from(new Set(theData.get("ownedCompanions"))); // can probably remove duplicates earlier on, but :shrug:
        cleanRaw["servervars"] = theData.get("servervars");
        setRawData(cleanRaw);
    }, [theData, dataStatus]);
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