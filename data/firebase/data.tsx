import { FirebaseApp } from "firebase/app";
import { Unsubscribe } from "firebase/auth";
import { child, Database, get, getDatabase, goOnline, ref } from "firebase/database";
import { doc, Firestore, getDoc, initializeFirestore, onSnapshot } from "firebase/firestore";
import { cloudsaveConverter } from "../domain/cloudsave";

export class FirestoreData {
    app: FirebaseApp;
    db: Firestore;
    realDB: Database;
    userUid: string

    charNames: string[] = [];
    companions: number[] = [];
    serverVars: Record<string, any> = {};

    onUpdateFunction: Function
    unsubscribe: Unsubscribe | undefined = undefined;

    constructor(public uid: string, app: FirebaseApp, onUpdate: Function) {
        this.app = app;
        this.userUid = uid;
        this.db = initializeFirestore(app, {});
        this.realDB = getDatabase(app);
        this.onUpdateFunction = onUpdate;
    }

    fetchData = async () => {
        await this.getServerVars();
        await this.getCharNames();
        await this.getCompanions();
        await this.subscribeToAccountData();
    }

    getCompanions = async () => {
        if (!this.realDB) {
            this.realDB = getDatabase(this.app);
        }
        goOnline(this.realDB);
        const dbRef = ref(this.realDB);
        try {
            const compSnapshot = await get(child(dbRef, `_comp/${this.uid}`))
            if (compSnapshot && compSnapshot.exists()) {
                this.companions = (compSnapshot.val()["l"] as string[]).map(comp => parseInt(comp.split(",")[0]))
            }
        }
        catch (error) {
            console.log("Failed getting companion data", error);
        }
    }

    getCharNames = async () => {
        if (!this.realDB) {
            this.realDB = getDatabase(this.app);
        }
        goOnline(this.realDB);
        const dbRef = ref(this.realDB);
        try {
            const charSnapshot = await get(child(dbRef, `_uid/${this.uid}`))
            if (charSnapshot && charSnapshot.exists()) {
                this.charNames = charSnapshot.val() as string[];
            }
        }
        catch (error) {
            console.log(error);
        }

        if (this.charNames.length == 0) {
            console.log("No character name data available, wrong account?");
            throw new Error("No character name data, invalid account");
        }
    }

    subscribeToAccountData = async () => {
        // make sure we have char names before subscribing to more data.
        // This is a fallback in case the constructor didn't do it for some reason.
        if (this.charNames.length == 0) {
            await this.getCharNames();
        }
        this.unsubscribe = onSnapshot(doc(this.db, "_data", this.uid).withConverter(cloudsaveConverter),
            { includeMetadataChanges: true }, (doc) => {
                if (doc.exists()) {
                    const cloudsave = doc.data();
                    this.onUpdateFunction(this.userUid, cloudsave, this.charNames, this.serverVars, this.companions);
                }
            });
    }

    getServerVars = async () => {
        if (this.db?.type == "firestore") {
            const res = await getDoc(doc(this.db, "_vars", "_vars"));
            if (res.exists()) {
                this.serverVars = res.data() as Record<string, any>;
            }
        }
    }
}