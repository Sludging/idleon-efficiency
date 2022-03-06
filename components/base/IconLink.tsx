import { Anchor, Box } from "grommet";
import { ComponentType, createElement, useState } from "react";

const IconLink = ({ icon, href, text }: { icon: ComponentType<any>, href: string, text: string }) => {
    const [color, setColor] = useState<string>("#828D99");
    const Cmp = icon;

    const onHover = () => {
        setColor("#0376E3")
    }

    const onExit = () => {
        setColor("#828D99")
    }


    return (
        <Box onMouseLeave={() => onExit()} onMouseEnter={() => onHover()} direction="row" gap="small" pad="small" justify="end" align="center">
            { createElement(icon, {
                "fill": color,
                "width": '16px',
                "height": '16px'
            }) }
            <Anchor color={color} target="_blank" href={href}>{text}</Anchor>
        </Box>
    )
}

export default IconLink;