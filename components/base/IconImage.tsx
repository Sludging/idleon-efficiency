import { Box } from "grommet";
import Image from "next/image"
import { ImageData } from "../../data/domain/imageData"

const BASE_URL = "https://cdn.idleonefficiency.com/images"

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const IconImage = ({ data, scale = 1 }: { data: ImageData, scale?: number }) => {
    if (data.location == "Blank") {
        return (
            <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`} />
        );
    }
    return (
        <Box height={`${data.height * scale}px`} width={`${data.width * scale}px`}>
            <Image
                src={`${BASE_URL}/${data.location}.png`}
                height={data.height * scale}
                width={data.width * scale}
                layout='fixed'
                loading='eager'
            />
        </Box>
    )
}

export default IconImage;