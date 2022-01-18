import { User } from "firebase/auth";
import { IdleonData } from "../domain/idleonData";

const cdn_location: string = 'https://cdn.idleonefficiency.com'
const api_location: string = "https://api.idleonefficiency.com/publish-profile"

export class ProfileStorage {
    static _Initialize() {
        this._Initialize = () => { } // prevent any additional calls to initialize.
    }

    private static gemKeys: string[] = ["GemsOwned", "ServerGemsReceived", "BundlesReceived", "GemsPacksPurchased", "GemItemsPurchased", "ServerGems", "CYGems"];
    private static cleanGemData = async (data: Map<string, any>) => {
        let toRemove = ProfileStorage.gemKeys;
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

    static uploadProfile = async (data: IdleonData, user: User, removeGemData: boolean = true) => {
        try {
            const theData = data.getData();
            // Convert raw JSON to map so it's easier to clean.
            let toClean = new Map<string, any>(Object.entries(theData.get("rawData")));
            if (removeGemData) {
                toClean = await this.cleanGemData(toClean);
            }
            const uploadData = JSON.stringify({
                rawData: Object.fromEntries(toClean), // revert the map to json after clean.
                playerNames: theData.get("playerNames")
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

    static downloadProfile = async (profile: string) => {
        try {
            const res = await fetch(`${cdn_location}/profiles/${profile}.json`);
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

ProfileStorage._Initialize();