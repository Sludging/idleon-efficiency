import { ProfileDownloader } from "../storage/profiles";

export const fetcher = async ({ windowLocation, oldDomain }: { windowLocation: string, oldDomain: string }): Promise<{ data: Map<string, any> | undefined, charNames: string[] | undefined, domain: string }> => {
    let urlDomain = windowLocation != "" ? windowLocation.split('.')[0] : "";
    
    if (urlDomain != oldDomain && urlDomain != "" && !["localhost:3000", "www", "preview"].includes(urlDomain)) {
        if (process.env.NEXT_PUBLIC_APP_STAGE == "local") {
            try {
                const res = await fetch(`/api/publicProfile?profile=${urlDomain}`);
                if (res.ok) {
                    const jsonData = await res.json();
                    return {
                        data: jsonData as Map<string, any>,
                        charNames: [...Array(10)].map((number, index) => `Player_${index}`),
                        domain: urlDomain
                    }
                }
            }
            catch (e) {
                console.debug(e);
                throw new Error("Failed fetching data for " + urlDomain);
            }
        }
        else {
            try {
                const downloader = new ProfileDownloader();
                const jsonData = await downloader.downloadProfile(urlDomain);
                if (jsonData) {
                    const playerNames = jsonData["playerNames"] ?? [...Array(10)].map((number, index) => `Player_${index}`)
                    return {
                        data: jsonData as Map<string, any>,
                        charNames: playerNames,
                        domain: urlDomain
                    }
                }
            }
            catch (e) {
                console.debug(e);
                throw new Error("Failed fetching data for " + urlDomain);
            }
        }
    }

    return { data: new Map(), charNames: undefined, domain: "" };
}