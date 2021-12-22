import { Box, Text } from "grommet";

export default function TextAndLabel({label, text, textSize = "medium", labelSize = "small", labelColor = "accent-2", center = false, textColor }: 
    { label: string, text: string, textSize?: string, labelSize?: string, labelColor?: string, center?: boolean, textColor?: string}) {

    return (
        <Box align={ center ? "center" : ""} gap="xxsmall">
            <Text color={labelColor} size={labelSize}>{label}</Text>
            <Text color={textColor} size={textSize}>{text}</Text>
        </Box>
    )
}