import { Box } from "grommet";
import Image, { ImageLoaderProps } from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn.idleonefficiency.com/images"

const cdnLoader = ({ src, width, quality } : ImageLoaderProps): string => {
    return `${BASE_URL}/${src}.png`;
}

const IconImage = ({ data, scale = 1 }: { data: ImageData, scale?: number }) => {
    if (data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }
    return (
        <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`}>
            <Image
                src={data.location}
                loader={cdnLoader}
                height={data.height * scale}
                width={data.width * scale}
                layout='fixed'
                loading='eager'
            />
        </Box>
    )
}

export default IconImage;