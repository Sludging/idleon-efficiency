import { Box } from "grommet";
import { Metadata } from "next";
import Sneaking from "./content";

export const metadata: Metadata = {
    title: "Sneaking",
}

export default function Page() {
    return (
        <Box>
            <Sneaking />
        </Box>
    )
}