import { Box, Text } from "grommet";
import { ReactNode, useContext } from "react";
import { MarginType } from "grommet/utils";
import { ResponsiveContext } from 'grommet';
import TipDisplay from "./TipDisplay";
import { CircleInformation } from "grommet-icons";

export default function TextAndLabel({ label, text, textSize = "medium", labelSize = "small", labelColor = "accent-2", center = false, right = false, textColor, margin, tooltip }:
    { label: string, text: string, textSize?: string, labelSize?: string, labelColor?: string, center?: boolean, right?: boolean, textColor?: string, margin?: MarginType, tooltip?: ReactNode }) {

    const size = useContext(ResponsiveContext)
    return (
        <Box align={center ? "center" : right ? "end" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            {
                tooltip ?
                    <Box gap="xxsmall" direction="row">
                        <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
                        <TipDisplay
                            maxWidth="250px"
                            heading={label}
                            body={tooltip}
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                    : <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
            }
            <Text color={textColor} size={size == "small" ? 'xsmall' : textSize}>{text}</Text>
        </Box>
    )
}

export function ComponentAndLabel({ label, component, labelSize = "small", labelColor = "accent-2", center = false, margin }:
    { label: string, component: ReactNode, labelSize?: string, labelColor?: string, center?: boolean, margin?: MarginType }) {

    const size = useContext(ResponsiveContext)
    return (
        <Box align={center ? "center" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
            {component}
        </Box>
    )
}