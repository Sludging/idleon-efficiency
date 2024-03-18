"use client"

import { useContext, useEffect, useState } from "react";
import { AppContext, AppStatus, DataStatus } from "../../data/appContext";
import { Box, Text, ThemeContext, ThemeType } from "grommet";
import TextAndLabel from "../base/TextAndLabel";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { normalizeColor } from "grommet/utils";

export const DataStatusDisplay = () => {
    const appContext = useContext(AppContext);
    const theme = useContext<ThemeType>(ThemeContext);

    const [validState, setValidState] = useState(false);
    const [lastUpdated, setLastUpdated] = useState("Loading");

    useEffect(() => {
        setValidState(appContext.status == AppStatus.Ready);
        if (validState) {
            setLastUpdated(appContext.data.getLastUpdated() as string);
        }
    }, [appContext])


    if ([DataStatus.Init, DataStatus.Loading].includes(appContext.dataStatus)) {
        return (
            <Box align="center" justify='center' animation={'rotateRight'}><ArrowsClockwise color={normalizeColor("green-2", theme)} size={24} /></Box>
        )
    }
    if ([DataStatus.LiveData, DataStatus.StaticData].includes(appContext.dataStatus)) {
        return (
            <TextAndLabel textColor='accent-3' textSize='xsmall' labelSize='xsmall' label='Last Updated' text={lastUpdated} />
        )
    }

    return null;
}