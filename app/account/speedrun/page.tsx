import { Suspense } from "react";
import type { Metadata } from "next";
import SpeedrunContent from "./content";

export const metadata: Metadata = {
    title: "Speedrun",
};

export default function Page() {
    return <Suspense><SpeedrunContent /></Suspense>;
}
