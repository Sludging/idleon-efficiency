import { Box } from "grommet";
import { Metadata } from "next";
import Summoning from "./content";

export const metadata: Metadata = {
    title: "Summoning",
}

export default function Page() {
    return (
        <Box>
            <Summoning />
        </Box>
    )
}