"use client"

import { DocumentText } from "grommet-icons";

const Icon = ({ fill = "#283F70", width, _height }: { fill?: string, width: string, _height: string }) => {
    return (
        <DocumentText size={width} color={fill} />
    )
}

export default Icon;
