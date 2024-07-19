import { Box } from "grommet";
import Obols from "./content";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Obols",
}

export default function Page() {
    return (
        <Box>
            <Obols />
        </Box>
    )
}