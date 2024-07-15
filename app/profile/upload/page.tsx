import { Box } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import UploadProfile from "./content";

export const metadata: Metadata = {
    title: "User Profile - Upload Public Profile",
}

export default function Page() {
    return (
        <Box>
            <Suspense><UploadProfile /></Suspense>
        </Box>
    )
}