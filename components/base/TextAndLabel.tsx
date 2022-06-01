import { Box, Text } from "grommet";
import { ReactNode } from "react";
import { MarginType } from "grommet/utils";

export default function TextAndLabel({label, text, textSize = "medium", labelSize = "small", labelColor = "accent-2", center = false, right = false, textColor, margin }: 
    { label: string, text: string, textSize?: string, labelSize?: string, labelColor?: string, center?: boolean, right?: boolean, textColor?: string, margin?: MarginType}) {

    return (
        <Box align={ center ? "center" : right ? "end" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            <Text color={labelColor} size={labelSize}>{label}</Text>
            <Text color={textColor} size={textSize}>{text}</Text>
        </Box>
    )
}

export function ComponentAndLabel({label, component, labelSize = "small", labelColor = "accent-2", center = false, margin }: 
    { label: string, component: ReactNode, labelSize?: string, labelColor?: string, center?: boolean, margin?: MarginType}) {

    return (
        <Box align={ center ? "center" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            <Text color={labelColor} size={labelSize}>{label}</Text>
            {component}
        </Box>
    )
}