import { Box } from "grommet";
import { Metadata } from "next";
import Constellations from "./content";

export const metadata: Metadata = {
    title: "Constellations",
}

export default function Page() {
    return (
        <Box>
            <Constellations />
        </Box>
    )
}