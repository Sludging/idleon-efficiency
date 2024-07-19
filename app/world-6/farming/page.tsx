import { Box } from "grommet";
import { Metadata } from "next";
import Farming from "./content";

export const metadata: Metadata = {
    title: "Farming",
}

export default function Page() {
    return (
        <Box>
            <Farming />
        </Box>
    )
}