import { Box } from "grommet";
import { Metadata } from "next";
import Gaming from "./content";

export const metadata: Metadata = {
    title: "Gaming",
}

export default function Page() {
    return (
        <Box>
            <Gaming />
        </Box>
    )
}