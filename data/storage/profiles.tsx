import { User } from "firebase/auth";
import { IdleonData } from "../domain/idleonData";

const cdn_location: string = 'https://cdn.idleonefficiency.com'
const api_location: string = "https://api.idleonefficiency.com/publish-profile"

export class ProfileStorage {
    static _Initialize() {
        this._Initialize = () => { } // prevent any additional calls to initialize.
    }

    static uploadProfile = async (data: IdleonData, user: User) => {
        try {
            const theData = data.getData();
            const uploadData = JSON.stringify({
                rawData: theData.get("rawData"),
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
            if (res.ok) {
                const jsonData = await res.json();
                return jsonData;
            }
        }
        catch (e) {
            console.debug(e);
            return false;
        }
        return true;
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