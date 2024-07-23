import { Box } from "grommet";
import { Metadata } from "next";
import Players from "./content";

export const metadata: Metadata = {
    title: "Players",
}

export const dynamic = 'force-static';


export default function Page() {
    return (
        <Box>
            <Players />
        </Box>
    )
}