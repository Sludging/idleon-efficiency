"use client"

import { Box } from "grommet";
import Link from "next/link";
import { ComponentType, createElement, useState } from "react";

const IconLink = ({ icon, href, text, target = "_blank", rel = "noopener" }: { icon?: ComponentType<any>, href: string, text: string, target?: string, rel?: string }) => {
    const [color, setColor] = useState<string>("#828D99");
    const onHover = () => {
        setColor("#0376E3")
    }

    const onExit = () => {
        setColor("#828D99")
    }


    return (
        <Box onMouseLeave={() => onExit()} onMouseEnter={() => onHover()} direction="row" gap="small" justify="end" align="center">
            { icon && createElement(icon, {
                "fill": color,
                "width": '16px',
                "height": '16px'
            }) }
            <Link prefetch={false} style={{ textDecoration: 'none', color: color, fontWeight: 'bold' }} rel={rel} target={target} href={href}>{text}</Link>
        </Box>
    )
}

export default IconLink;
