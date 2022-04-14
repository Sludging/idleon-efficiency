import { Box, Button, Text } from "grommet";
import { Next } from "grommet-icons";
import { MouseEventHandler } from "react";
import { ImageData } from "../../data/domain/imageData";
import IconImage from "./IconImage";

export default function LeftNavButton({ isActive, text, clickHandler, iconImageData }: { isActive: boolean, text: string, clickHandler: MouseEventHandler, iconImageData?: ImageData }) {
    return (
        <Button fill="horizontal" plain active={isActive} onClick={clickHandler} gap="medium">
            <Box background={isActive ? 'accent-4' : 'dark-2'} pad={{ left: 'medium', right: 'small', top: 'xsmall', bottom: 'xsmall' }} direction="row" justify="between" align="center" gap="small" height="40px">
                <Box direction="row" gap="small">
                    { iconImageData && <IconImage data={iconImageData} scale={0.6} /> }
                    <Text color='accent-2' size="small" weight={isActive ? 'bold' : 'normal'}>{text}</Text>
                </Box>
                {isActive && <Next size="small" />}
            </Box>
        </Button>
    )
}