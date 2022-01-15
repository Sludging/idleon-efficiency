const cdn_location: string = 'https://d3vsh1slqhmor3.cloudfront.net/profiles'

export class ProfileStorage {
    static _Initialize() {
        this._Initialize = () => {} // prevent any additional calls to initialize.
    }

    // static uploadProfile = async (data: IdleonData, user: User, profile: string) => {
    //     const storageRef = ref(this.storage, `/profile/${profile}.json`);
    //     try {
    //         const jsonData = JSON.stringify(data.getData());
    //         await uploadString(storageRef, jsonData, StringFormat.RAW, {
    //             contentType: 'application/json',
    //             customMetadata: {
    //                 owner: user.uid
    //             }
    //         });
    //     }
    //     catch (e) {
    //         console.debug(e);
    //         return false;
    //     }
    //     return true;
    // }

    static downloadProfile = async (profile: string) => {
        try {
            const res = await fetch(`${cdn_location}/${profile}.json`);
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