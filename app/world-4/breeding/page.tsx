import { Box } from "grommet";
import { Metadata } from "next";
import Breeding from "./content";

export const metadata: Metadata = {
    title: "Breeding",
}

export default function Page() {
    return (
        <Box>
            <Breeding />
        </Box>
    )
}