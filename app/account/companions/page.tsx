import { Box } from "grommet";
import { Metadata } from "next";
import CompanionDisplay from "./content";

export const metadata: Metadata = {
    title: "Companions",
}

export default function Page() {
    return (
        <Box>
            <CompanionDisplay />
        </Box>
    )
}