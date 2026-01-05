"use client"

import { User } from "firebase/auth";
import { IdleonData } from "../domain/idleonData";

const cdn_location: string = 'https://cdn.idleonefficiency.com'
const api_location: string = "https://api.idleonefficiency.com/publish-profile"
//const dev_location: string = "https://9eqcjtmya2.execute-api.us-east-1.amazonaws.com/dev/publish-profile";

export class ProfileUploader {
    constructor() {}
    
    private gemKeys: string[] = ["GemsOwned", "ServerGemsReceived", "BundlesReceived", "GemsPacksPurchased", "ServerGems", "CYGems"];
    private cleanGemData = async (data: Map<string, any>) => {
        const toRemove = this.gemKeys;
        if (data.has("BundlesReceived")) {
            toRemove.push(...Object.keys(JSON.parse(data.get("BundlesReceived"))))
        }
        toRemove.forEach(key => {
            if (data.has(key)) {
                data.delete(key)
            }
        });
        return data;
    }

    uploadProfile = async (data: IdleonData, user: User, removeGemData: boolean = true) => {
        try {
            const theData = data.getData();
            // Convert raw JSON to map so it's easier to clean.
            let toClean = new Map<string, any>(Object.entries(theData.get("rawData")));
            if (removeGemData) {
                toClean = await this.cleanGemData(toClean);
            }

            // This helps AutoReview, reason for doing it here is because I'm lazy to change the backend
            // and backend only expects rawData and playerName fields. 
            // It functionally is the same so I'm cheating by just adding to raw data keys.
            toClean.set("companions", Array.from(new Set(theData.get("ownedCompanions")))); // can probably remove duplicates earlier on, but :shrug:
            toClean.set("servervars", theData.get("servervars"));

            const uploadData = JSON.stringify({
                rawData: Object.fromEntries(toClean), // revert the map to json after clean.
                playerNames: theData.get("playerNames"),
            })
            const userJWT = await user.getIdToken();
            const res = await fetch(api_location,
                {
                    method: 'POST',
                    body: uploadData,
                    headers: [
                        ["Authorization", `Bearer ${userJWT}`],
                        ["Content-Type", "application/json"],
                    ]
                });
            const jsonData = await res.json();
            if (res.ok) {    
                return { success: true, message: jsonData.profile };
            }
            else {
                return { success: false, error: jsonData.error };
            }
        }
        catch (e) {
            console.debug(e);
            return { success: false, message: "Unknown error."};
        }
    }
}

export class ProfileDownloader {
    constructor() {}

    downloadProfile = async (profile: string) => {
        try {
            const res = await fetch(`${cdn_location}/profiles/${profile}.json`, {
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            });
            if (res.ok) {
                const jsonData = await res.json();
                return jsonData;
            }
            return undefined;
        }
        catch (e) {
            console.debug(e);
        }
    }
}