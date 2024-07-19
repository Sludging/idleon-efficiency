import { Box } from "grommet";
import { Metadata } from "next";
import Divinity from "./content";

export const metadata: Metadata = {
    title: "Divinity",
}

export default function Page() {
    return (
        <Box>
            <Divinity />
        </Box>
    )
}