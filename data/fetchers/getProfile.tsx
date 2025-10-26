"use client"

import { ProfileDownloader } from "../storage/profiles";
import data from '../../profiles/sludger.json';

export const fetcher = async (profileName: string): Promise<{ data: Map<string, any> | undefined, charNames: string[] | undefined, domain: string }> => {
    if (profileName != "") {
        if (process.env.NEXT_PUBLIC_APP_STAGE == "local") {
            console.log("Fetching data for sludger.json");
            try {
                const jsonData = JSON.parse(JSON.stringify(data));
                const charNames = jsonData["playerNames"] ?? [...Array(10)].map((number, index) => `Player_${index}`)
                return {
                    data: jsonData as Map<string, any>,
                    charNames: charNames,
                    domain: profileName
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
