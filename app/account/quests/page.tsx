import { Box } from "grommet";
import { Metadata } from "next";
import Quests from "./content";

export const metadata: Metadata = {
    title: "Quests",
}

export default function Page() {
    return (
        <Box>
            <Quests />
        </Box>
    )
}