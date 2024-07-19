import { Box } from "grommet";
import { Metadata } from "next";
import Players from "./content";

export const revalidate = 604800;

export const metadata: Metadata = {
    title: "Players",
}

export default function Page() {
    return (
        <Box>
            <Players />
        </Box>
    )
}