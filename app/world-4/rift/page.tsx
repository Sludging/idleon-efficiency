import { Box } from "grommet";
import { Metadata } from "next";
import RiftDisplay from "./content";

export const metadata: Metadata = {
    title: "Rift",
}

export default function Page() {
    return (
        <Box>
            <RiftDisplay />
        </Box>
    )
}