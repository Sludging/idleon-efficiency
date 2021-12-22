import { Box, Button, Text } from "grommet";
import { MouseEventHandler } from "react";

export default function TabButton({ isActive, text, clickHandler }: { isActive: boolean, text: string, clickHandler: MouseEventHandler }) {
    return (
        <Button hoverIndicator plain onClick={clickHandler} gap="medium">
            <Box border={{ side: isActive ? 'bottom' : 'between', color: 'brand', size: '2px' }} pad="small" direction="row" justify="between" align="center" gap="small" height="40px">
                <Text color={isActive ? 'brand' : 'accent-2'} size="medium">{text}</Text>
            </Box>
        </Button>
    )
}