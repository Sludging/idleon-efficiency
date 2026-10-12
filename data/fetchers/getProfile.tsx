"use client"

import { ProfileDownloader } from "../storage/profiles";

export const fetcher = async (profileName: string): Promise<{ data: Map<string, any> | undefined, charNames: string[] | undefined, domain: string }> => {
    if (profileName !== "") {
        try {
            const downloader = new ProfileDownloader();
            const jsonData = await downloader.downloadProfile(profileName);
            if (jsonData) {
                const charNames = jsonData["playerNames"] ?? [...Array(10)].map((_, index) => `Player_${index}`);
                return {
                    data: jsonData as Map<string, any>,
                    charNames,
                    domain: profileName
                };
            }
        }
        catch (e) {
            console.debug(e);
            throw new Error("Failed fetching data for " + profileName);
        }
    }

    return { data: new Map(), charNames: undefined, domain: "" };
}
