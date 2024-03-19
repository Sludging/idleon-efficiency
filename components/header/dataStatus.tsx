"use client"

import { useContext } from "react";
import { Box, Text, ThemeContext, ThemeType } from "grommet";
import TextAndLabel from "../base/TextAndLabel";
import { ArrowsClockwise } from "@phosphor-icons/react";
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
            <Box align="center" justify='center' animation={'rotateRight'}><ArrowsClockwise color={normalizeColor("green-2", theme)} size={24} /></Box>
        )
    }
    if ([DataStatus.LiveData, DataStatus.StaticData].includes(dataStatus)) {
        return (
            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={lastUpdated} />
        )
    }

    return null;
}