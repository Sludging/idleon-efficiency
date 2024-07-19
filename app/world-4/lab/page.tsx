import { Box } from "grommet";
import { Metadata } from "next";
import Lab from "./content";

export const metadata: Metadata = {
    title: "Lab",
}

export default function Page() {
    return (
        <Box>
            <Lab />
        </Box>
    )
}