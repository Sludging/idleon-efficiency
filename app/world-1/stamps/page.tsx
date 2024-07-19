import { Box } from "grommet";
import { Metadata } from "next";
import Stamps from "./content";

export const metadata: Metadata = {
    title: "Stamps",
}

export default function Page() {
    return (
        <Box>
            <Stamps />
        </Box>
    )
}