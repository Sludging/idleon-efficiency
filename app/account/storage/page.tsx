import { Box } from "grommet";
import { Metadata } from "next";
import StorageDisplay from "./content";

export const metadata: Metadata = {
    title: "Storage",
}

export default function Page() {
    return (
        <Box>
            <StorageDisplay />
        </Box>
    )
}