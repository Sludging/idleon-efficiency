"use client"

import { useContext } from "react";
import { Box, Notification, Text, ThemeContext, ThemeType } from "grommet";
import TextAndLabel from "../base/TextAndLabel";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowsClockwise";
import { normalizeColor } from "grommet/utils";
import { DataStatus } from "../../lib/stores/appDataStore";
import { useAppDataStore } from "../../lib/providers/appDataStoreProvider";
import { useShallow } from 'zustand/react/shallow'

export const DataStatusDisplay = () => {
    const theme = useContext<ThemeType>(ThemeContext);

    const { dataStatus, lastUpdated } = useAppDataStore(
        useShallow((state) => ({ dataStatus: state.dataStatus, lastUpdated : state.data.getLastUpdated() as string }))
    )

    if ([DataStatus.Init, DataStatus.Loading].includes(dataStatus)) {
        return (
            <Box align="center" justify='center' animation={'rotateRight'}><ArrowsClockwiseIcon color={normalizeColor("green-2", theme)} size={24} /></Box>
        )
    }
    if ([DataStatus.LiveData, DataStatus.StaticData].includes(dataStatus)) {
        return (
            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={lastUpdated} />
        )
    }

    if ([DataStatus.MissingData].includes(dataStatus)) {
        return (
            <Box align="center" justify="center">
                <Notification
                        toast
                        title="No data"
                        message="No data available for this account, did you use the wrong account?"
                        status="critical"
                    />
                <Text size="small" color="accent-1">No data available for this account. Sign out and try again.</Text>
            </Box>
        )
    }

    return null;
}