'use client'

import { Box } from "grommet";
import Image from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn2.idleonefficiency.com/images"

const IconImage = ({ data, scale = 1, style }: { data: ImageData, scale?: number, style?: React.CSSProperties }) => {
    if (!data.location || data.location == "" || data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }

    const realLocation = `${BASE_URL}/${data.location}.png`;
    return (
        <Box style={style} height={`${data.height * scale}px`} width={`${data.width * scale}px`}>
            <Image
                src={realLocation}
                alt={data.location}
                height={data.height * scale}
                width={data.width * scale}
                loading='eager'
                style={{
                    objectFit: "contain"
                }} />
        </Box>
    );
}

export const AdaptativeIconImage = ({ data, scale = 1, style }: { data: ImageData, scale?: number, style?: React.CSSProperties }) => {
    if (!data.location || data.location == "" || data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }

    const realLocation = `${BASE_URL}/${data.location}.png`;
    return (
        <Box style={style} height='auto' width='auto' >
            <Image
                src={realLocation}
                alt={data.location}
                height={data.height * scale}
                width={data.width * scale}
                loading='eager'
                onLoad={(e: any) => {
                    let newHeight = data.height;
                    let newWidth = data.width

                    if (data.height == 0) {
                        if(data.width > 0) {
                            const ratio = data.width / e.target.naturalWidth;
                            newHeight = e.target.naturalHeight * ratio;
                        } else {
                            newHeight = e.target.naturalHeight;
                        }
                    }
                
                    if (data.width == 0) {
                        if(data.height > 0) {
                            const ratio = data.height / e.target.naturalHeight;
                            newWidth = e.target.naturalWidth * ratio;
                        } else {
                            newWidth = e.target.naturalWidth;
                        }
                    }

                    e.target.width = newWidth;
                    e.target.height = newHeight;
                }} />
        </Box>
    );
}

export default IconImage;
