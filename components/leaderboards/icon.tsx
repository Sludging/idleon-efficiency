import { CircleInformation } from "grommet-icons";

const Icon = ({ fill = "#283F70", width, height }: { fill?: string, width: string, height: string }) => {
    return (
        <CircleInformation size={width} color={fill} />
    )
}

export default Icon;