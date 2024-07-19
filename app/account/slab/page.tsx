import { Box } from "grommet";
import { Metadata } from "next";
import Slab from "./content";

export const metadata: Metadata = {
    title: "Slab",
}

export default function Page() {
    return (
        <Box>
            <Slab />
        </Box>
    )
}