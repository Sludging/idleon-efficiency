import { FirebaseApp, initializeApp } from "firebase/app";
import { User } from "firebase/auth";
import { getStorage, FirebaseStorage, uploadString, ref, StringFormat, getBlob, getDownloadURL } from "firebase/storage"
import { IdleonData } from "../domain/idleonData";

const firebaseConfig = {
    apiKey: "AIzaSyADpfFlMESRe2upVSG9aiIi92JLMZRncXI",
    authDomain: "idleon-efficiency.firebaseapp.com",
    projectId: "idleon-efficiency",
    storageBucket: "idleon-efficiency.appspot.com",
    messagingSenderId: "256399590505",
    appId: "1:256399590505:web:ba0918e788ed4741e00ef8",
    measurementId: "G-KVT0TDMCP0"
  };

export class IdleonStorage {
    static app: FirebaseApp
    static storage: FirebaseStorage

    static _Initialize() {
        this.app = initializeApp(firebaseConfig, "efficiency-storage");
        this.storage = getStorage(this.app);
        this._Initialize = () => {} // prevent any additional calls to initialize.
    }

    static uploadProfile = async (data: IdleonData, user: User, profile: string) => {
        const storageRef = ref(this.storage, `/profile/${profile}.json`);
        try {
            const jsonData = JSON.stringify(data.getData());
            await uploadString(storageRef, jsonData, StringFormat.RAW, {
                contentType: 'application/json',
                customMetadata: {
                    owner: user.uid
                }
            });
        }
        catch (e) {
            console.debug(e);
            return false;
        }
        return true;
    }

    static downloadProfile = async (profile: string) => {
        try {
            const storageRef = ref(this.storage, `/profile/${profile}.json`);
            // const getResult = await getBlob(storageRef);
            // return JSON.parse(await getResult.text()) as Map<string, any>;
            const downloadURL = await getDownloadURL(storageRef);
            const res = await fetch(downloadURL);
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

IdleonStorage._Initialize();