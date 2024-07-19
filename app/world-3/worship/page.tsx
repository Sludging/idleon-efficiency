import { Box } from "grommet";
import { Metadata } from "next";
import Worship from "./content";

export const metadata: Metadata = {
    title: "Worship",
}

export default function Page() {
    return (
        <Box>
            <Worship />
        </Box>
    )
}