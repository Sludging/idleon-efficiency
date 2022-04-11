import { Box } from "grommet";
import Image from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn.idleonefficiency.com/images"

const IconImage = ({ data, scale = 1 }: { data: ImageData, scale?: number }) => {
    if (data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }
    return (
        <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`}>
            <Image src={`${BASE_URL}/${data.location}.png`} height={data.height * scale} width={data.width * scale} layout="responsive"  />
        </Box>
    )
}

export default IconImage;