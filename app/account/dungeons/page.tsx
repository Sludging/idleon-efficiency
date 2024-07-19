import { Box } from "grommet";
import { Metadata } from "next";
import DungeonsDisplay from "./content";

export const metadata: Metadata = {
    title: "Dungeons",
}

export default function Page() {
    return (
        <Box>
            <DungeonsDisplay />
        </Box>
    )
}