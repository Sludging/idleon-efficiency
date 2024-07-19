import { Box } from "grommet";
import { Metadata } from "next";
import Forge from "./content";

export const metadata: Metadata = {
    title: "Forge",
}

export default function Page() {
    return (
        <Box>
            <Forge />
        </Box>
    )
}