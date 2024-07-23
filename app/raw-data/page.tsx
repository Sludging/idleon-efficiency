import { Box } from "grommet";
import { Metadata } from "next";
import RawData from "./content";

export const metadata: Metadata = {
    title: "Raw Data",
}

export const dynamic = 'force-static';

export default function Page() {
    return (
        <Box>
            <RawData />
        </Box>
    )
}