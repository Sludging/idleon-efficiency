import { Box, Text } from "grommet";
import { ReactNode, useContext } from "react";
import { MarginType } from "grommet/utils";
import { ResponsiveContext } from 'grommet';
import TipDisplay from "./TipDisplay";
import { CircleInformation } from "grommet-icons";

export default function TextAndLabel({ label, text, textSize = "medium", labelSize = "small", labelColor = "accent-2", center = false, right = false, textColor, margin, tooltip }:
    { label: ReactNode, text: string, textSize?: string, labelSize?: string, labelColor?: string, center?: boolean, right?: boolean, textColor?: string, margin?: MarginType, tooltip?: ReactNode }) {

    const size = useContext(ResponsiveContext)
    return (
        <Box align={center ? "center" : right ? "end" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            {
                tooltip ?
                    <Box gap="xxsmall" direction="row">
                        {typeof label === 'string' ? (
                            <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
                        ) : (
                            label
                        )}
                        <TipDisplay
                            maxWidth="250px"
                            heading={typeof label === 'string' ? label : ''}
                            body={tooltip}
                        >
                            <CircleInformation size="small" />
                        </TipDisplay>
                    </Box>
                    : typeof label === 'string' ? (
                        <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
                    ) : (
                        label
                    )
            }
            <Text color={textColor} size={size == "small" ? 'xsmall' : textSize}>{text}</Text>
        </Box>
    )
}

export function ComponentAndLabel({ label, component, labelSize = "small", labelColor = "accent-2", center = false, margin }:
    { label: ReactNode, component: ReactNode, labelSize?: string, labelColor?: string, center?: boolean, margin?: MarginType }) {

    const size = useContext(ResponsiveContext)
    return (
        <Box align={center ? "center" : ""} gap="xxsmall" margin={margin ? margin : undefined}>
            {typeof label === 'string' ? (
                <Text color={labelColor} size={size == "small" ? 'xsmall' : labelSize}>{label}</Text>
            ) : (
                label
            )}
            {component}
        </Box>
    )
}