import { Box } from "grommet";
import Image from "next/image"
import { ImageData } from "../../data/domain/imageData"

const IconImage = ({ data, scale = 1 }: { data: ImageData, scale?: number }) => {
    if (data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }
    return (
        <Image src={`/icons/assets/images/${data.location}.png`} height={data.height * scale} width={data.width * scale} layout="fixed"  />
    )
}

export default IconImage;