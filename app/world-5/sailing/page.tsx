import { Box } from "grommet";
import { Metadata } from "next";
import Sailing from "./content";

export const metadata: Metadata = {
    title: "Sailing",
}

export default function Page() {
    return (
        <Box>
            <Sailing />
        </Box>
    ) 
}