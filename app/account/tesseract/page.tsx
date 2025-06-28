import { Box, Heading } from "grommet";
import { Suspense } from "react";
import { Metadata } from "next";
import { TesseractDisplay } from "../../../components/account/tesseractDisplay";

export const metadata: Metadata = {
    title: "Tesseract",
    description: "View and manage your Tesseract upgrades"
}

export default function Page() {
    return (
        <Box pad={{ horizontal: "medium" }}>
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Tesseract Upgrades</Heading>
            <Suspense fallback={<Box pad="large">Loading Tesseract data...</Box>}>
                <TesseractDisplay />
            </Suspense>
        </Box>
    )
} 
