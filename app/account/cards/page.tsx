import { Box } from "grommet";
import { Metadata } from "next";
import CardsDisplay from "./content";

export const metadata: Metadata = {
    title: "Cards",
}

export default function Page() {
    return (
        <Box>
            <CardsDisplay />
        </Box>
    )
}