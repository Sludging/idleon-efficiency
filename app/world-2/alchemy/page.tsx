import { Box } from "grommet";
import { Metadata } from "next";
import Alchemy from "./content";

export const metadata: Metadata = {
    title: "Alchemy",
}

export default function Page() {
    return (
        <Box>
            <Alchemy />
        </Box>
    )
}