import { Box, Text } from "grommet";

export default function TextAndLabel({label, text, textSize = "medium", labelSize = "small", labelColor = "accent-2", center = false }: 
    { label: string, text: string, textSize?: string, labelSize?: string, labelColor?: string, center?: boolean}) {

    return (
        <Box align={ center ? "center" : ""} gap="xxsmall">
            <Text color={labelColor} size={labelSize}>{label}</Text>
            <Text size={textSize}>{text}</Text>
        </Box>
    )
}