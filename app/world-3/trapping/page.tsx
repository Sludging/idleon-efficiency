import { Box } from "grommet";
import { Metadata } from "next";
import Traps from "./content";

export const metadata: Metadata = {
    title: "Traps",
}

export default function Page() {
    return (
        <Box>
            <Traps />
        </Box>
    )
}