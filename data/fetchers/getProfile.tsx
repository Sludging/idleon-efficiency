"use client"

import { ProfileDownloader } from "../storage/profiles";

export const fetcher = async (profileName: string): Promise<{ data: Map<string, any> | undefined, charNames: string[] | undefined, domain: string }> => {
    if (profileName != "") {
        if (process.env.NEXT_PUBLIC_APP_STAGE == "local") {
            try {
                const res = await fetch(`/api/publicProfile?profile=${profileName}`);
                if (res.ok) {
                    const jsonData = await res.json();
                    return {
                        data: jsonData as Map<string, any>,
                        charNames: [...Array(10)].map((number, index) => `Player_${index}`),
                        domain: profileName
                    }
                }
                else {
                    return { data: new Map(), charNames: undefined, domain: "" };
                }
            }
            catch (e) {
                console.debug(e);
                throw new Error("Failed fetching data for " + profileName);
            }
        }
        else {
            try {
                const downloader = new ProfileDownloader();
                const jsonData = await downloader.downloadProfile(profileName);
                if (jsonData) {
                    const playerNames = jsonData["playerNames"] ?? [...Array(10)].map((number, index) => `Player_${index}`)
                    return {
                        data: jsonData as Map<string, any>,
                        charNames: playerNames,
                        domain: profileName
                    }
                }
            }
            catch (e) {
                console.debug(e);
                throw new Error("Failed fetching data for " + profileName);
            }
        }
    }

    return { data: new Map(), charNames: undefined, domain: "" };
}