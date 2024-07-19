import { Box } from "grommet";
import { Metadata } from "next";
import TaskBoard from "./content";

export const metadata: Metadata = {
    title: "Task Board",
}

export default function Page() {
    return (
        <Box>
            <TaskBoard />
        </Box>
    )
}