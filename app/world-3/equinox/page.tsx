import { Box } from "grommet";
import { Metadata } from "next";
import Equinox from "./content";

export const metadata: Metadata = {
    title: "Equinox",
}

export default function Page() {
    return (
        <Box>
            <Equinox />
        </Box>
    )
}