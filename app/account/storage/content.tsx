"use client"

import {
    Box,
    Text,
    Heading,
    CheckBox,
    Select
} from "grommet"
import { useEffect, useState, useMemo } from 'react';
import ShadowBox from "../../../components/base/ShadowBox";
import { Storage } from "../../../data/domain/storage";
import { nFormatter, notUndefined } from "../../../data/utility";
import IconImage from "../../../components/base/IconImage";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

function StorageDisplay() {
    const [storage, setStorage] = useState<Storage>();
    const [typeFilter, setTypeFilter] = useState<string>('None');
    const [subTypeFilter, setSubTypeFilter] = useState<string>('None');
    const [grouped, setGrouped] = useState<boolean>(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    useEffect(() => {
        setStorage(theData.get("storage"));
    }, [theData])

    const chestItemsToShow = useMemo(() => {
        let filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank") ?? [];
        if (typeFilter != 'None') {
            filteredItems = filteredItems.filter((item) => item.getArchType() == typeFilter);
            if (subTypeFilter != "None") {
                filteredItems = filteredItems.filter((item) => item.type == subTypeFilter);
            }
        }

        return filteredItems;
    }, [storage, typeFilter, subTypeFilter])

    const storageTypes = useMemo(() => {
        const filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank") ?? [];
        return Array.from(new Set(filteredItems.map(x => x.getArchType())));
    }, [storage])

    const storageSubTypes = useMemo(() => {
        if (typeFilter == 'None') {
            return [];
        }

        const filteredItems = storage?.chest.filter((item) => item.internalName != "LockedInvSpace" && item.internalName != "Blank" && item.getArchType() == typeFilter) ?? [];
        return Array.from(new Set(filteredItems.map(x => x.type)));
    }, [storage, typeFilter])

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Storage</Heading>
            <Box pad="small" gap="small">
                <Box>
                    <Text>Filters</Text>
                </Box>
                <Box direction="row" gap="medium">
                    <CheckBox
                        checked={grouped}
                        label="Group by type"
                        onChange={(event) => { setGrouped(event.target.checked); }}
                    />
                    <Select
                        placeholder="Filter by Type"
                        clear
                        value={typeFilter}
                        options={[...storageTypes]}
                        onChange={({ value: nextValue }) => { setTypeFilter(nextValue != '' ? nextValue : 'None'); setSubTypeFilter('None'); }}
                    />
                    {storageSubTypes.length > 0 &&
                        <Select
                            placeholder="Filter by Sub type"
                            clear
                            value={subTypeFilter}
                            options={[...storageSubTypes]}
                            onChange={({ value: nextValue }) => { setSubTypeFilter(nextValue != '' ? nextValue : 'None') }}
                        />
                    }
                </Box>
            </Box>
            {
                grouped ? (typeFilter == "None" ? storageTypes : storageSubTypes).map((type) => {
                    if (chestItemsToShow.filter(x => (typeFilter == "None" ? x.getArchType() : x.type) == type).length == 0) {
                        return undefined;
                    }
                    return (<ShadowBox key={type} background="dark-1" pad="medium" gap="small">
                        <Text>{type}</Text>
                        <Box direction="row" wrap>
                            {
                                chestItemsToShow.filter(x => (typeFilter == "None" ? x.getArchType() : x.type) == type).map((item, index) => (
                                    <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                        <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                            <Box>
                                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                            </Box>
                                            <Text color={item.count > 1e7 ? 'green-1' : ''} size="small">{nFormatter(item.count)}</Text>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>)
                }).filter(notUndefined)
                    :
                    <ShadowBox background="dark-1" pad="medium" gap="small">
                        {typeFilter != "None" && <Text>{subTypeFilter == "None" ? typeFilter : subTypeFilter}</Text>}
                        <Box direction="row" wrap>
                            {
                                chestItemsToShow.map((item, index) => (
                                    <Box key={index} border={{ color: 'grey-1' }} background="accent-4" width={{ max: '100px', min: '100px' }} align="center">
                                        <Box direction="row" pad={{ vertical: 'small' }} align="center">
                                            <Box>
                                                <IconImage data={item.getImageData()} scale={item.getImageData().width > 36 ? 0.5 : 1} />
                                            </Box>
                                            <Text color={item.count > 1e7 ? 'green-1' : ''} size="small">{nFormatter(item.count)}</Text>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                    </ShadowBox>
            }
        </Box>
    )
}

export default StorageDisplay;