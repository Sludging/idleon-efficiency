"use client"

import {
    Box, Button, Text
} from 'grommet'
import { useMemo, useState, useEffect } from 'react';
import { useAppDataStore } from '../../lib/providers/appDataStoreProvider';
import { useShallow } from 'zustand/react/shallow';

function RawData() {
    const [copyMessage, setCopyMessage] = useState<string>("");
    const { theData, lastUpdated } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const rawData = useMemo(() => {
        if (!theData) {
            return undefined;
        }

        // This is very ugly but I don't really want to overthink this.
        const rawDataElement = theData.get("rawData");
        if (!rawDataElement) {
            return undefined;
        }

        const cleanRaw = JSON.parse(JSON.stringify(rawDataElement));
        if (!cleanRaw) {
            return undefined;
        }

        cleanRaw["playerNames"] = theData.get("playerNames");
        cleanRaw["companions"] = theData.get("ownedCompanions");
        cleanRaw["servervars"] = theData.get("servervars");

        return cleanRaw;
    }, [theData, lastUpdated]);

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

    return (
        <Box align="center" pad="medium">
            <Box direction="row" gap="medium" align="center" margin={{ bottom: "medium" }}>
                <Button 
                    style={{ color: "white" }}
                    primary 
                    color={copyMessage !== "" ? "status-ok" : "brand"} 
                    label={copyMessage !== "" ? copyMessage : "Copy Raw JSON"} 
                    onClick={() => copyToClipboard()} 
                    disabled={!rawData}
                />
            </Box>
            
            {!rawData ? (
                <Box direction="row" gap="small" align="center">
                    <Text>No data available</Text>
                </Box>
            ) : (
                <pre style={{ maxWidth: "800px" }}>{JSON.stringify(rawData, null, 2)}</pre>
            )}
        </Box>
    )
}

export default RawData;
