"use client"

import {
    Box, Button, Text, Spinner
} from 'grommet'
import { useState, useEffect } from 'react';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { DataStatus } from '../../lib/stores/appDataStore';

function RawData() {
    const [rawData, setRawData] = useState<any>();
    const [copyMessage, setCopyMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { dataStatus, theData } = useAppDataStore(useShallow(
        (state) => ({ dataStatus: state.dataStatus, theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const copyToClipboard = () => {
        if (!navigator || !navigator.clipboard) {
            return Promise.reject('The Clipboard API is not available.');
        }

        if (copyMessage !== "") {
            return Promise.resolve();
        }

        setCopyMessage("Copied!");
        setTimeout(() => {
            setCopyMessage("");
        }, 1500);
        return navigator.clipboard.writeText(JSON.stringify(rawData, null, 2));        
    }

    useEffect(() => {
        setIsLoading(!rawData);

        if (!theData) {
            return;
        }

        // This is very ugly but I don't really want to overthink this.
        const rawDataElement = theData.get("rawData");

        if (!rawDataElement) {
            return;
        }

        const cleanRaw = JSON.parse(JSON.stringify(rawDataElement));

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
            {isLoading && (
                <Box direction="row" gap="small" align="center" margin={{ bottom: "medium" }}>
                    <Spinner size="small" /><Text>Loading data...</Text>
                </Box>
            )}
            <Box direction="row" gap="medium" align="center" margin={{ bottom: "medium" }}>
                <Button 
                    style={{ color: "white" }}
                    primary 
                    color={copyMessage !== "" ? "status-ok" : "brand"} 
                    label={copyMessage !== "" ? copyMessage : "Copy Raw JSON"} 
                    onClick={() => copyToClipboard()} 
                    disabled={isLoading || !rawData}
                />
            </Box>
            
            {!isLoading && (
                !rawData ? (
                    <Box direction="row" gap="small" align="center">
                        <Text>No data available</Text>
                    </Box>
                ) : (
                    <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
                )
            )}
        </Box>
    )
}

export default RawData;