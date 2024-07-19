import { Box } from "grommet";
import { Metadata } from "next";
import Anvil from "./content";

export const metadata: Metadata = {
    title: "Anvil",
}

export default function Page() {
    return (
        <Box>
            <Anvil />
        </Box>
    )
}