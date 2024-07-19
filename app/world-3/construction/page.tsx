import { Box } from "grommet";
import { Metadata } from "next";
import Construction from "./content";

export const metadata: Metadata = {
    title: "Construction",
}

export default function Page() {
    return (
        <Box>
            <Construction />
        </Box>
    )
}