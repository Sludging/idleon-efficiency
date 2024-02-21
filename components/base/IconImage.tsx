'use client'

import { Box } from "grommet";
import Image from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn2.idleonefficiency.com/images"

export const IconImage = ({ data, scale = 1, style }: { data: ImageData, scale?: number, style?: React.CSSProperties }) => {
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
                    let newData = data;

                    if (data.height == 0) {
                        if(data.width > 0) {
                            const ratio = data.width / e.target.naturalWidth;
                            newData.height = e.target.naturalHeight * ratio;
                        } else {
                            newData.height = e.target.naturalHeight;
                        }
                    }
                
                    if (data.width == 0) {
                        if(data.height > 0) {
                            const ratio = data.height / e.target.naturalHeight;
                            newData.width = e.target.naturalWidth * ratio;
                        } else {
                            newData.width = e.target.naturalWidth;
                        }
                    }

                    e.target.width = newData.width;
                    e.target.height = newData.height;
                }} />
        </Box>
    );
}

export default IconImage;