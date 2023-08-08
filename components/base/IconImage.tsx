import { Box } from "grommet";
import Image, { ImageLoaderProps } from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn2.idleonefficiency.com/images"

const cdnLoader = ({ src, width, quality } : ImageLoaderProps): string => {
    return `${BASE_URL}/${src}.png`;
}

const IconImage = ({ data, scale = 1, style }: { data: ImageData, scale?: number, style?: React.CSSProperties }) => {
    if (data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }
    return (
        <Box style={style} height={`${data.height * scale}px`} width={`${data.width * scale}px`}>
            <Image
                src={data.location}
                loader={cdnLoader}
                height={data.height * scale}
                width={data.width * scale}
                layout='fixed'
                objectFit='contain'
                loading='eager'
            />
        </Box>
    )
}

export default IconImage;