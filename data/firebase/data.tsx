import { FirebaseApp } from "firebase/app";
import { Unsubscribe } from "firebase/auth";
import { child, Database, get, getDatabase, goOnline, ref } from "firebase/database";
import { doc, Firestore, getDoc, initializeFirestore, onSnapshot } from "firebase/firestore";
import { Cloudsave, cloudsaveConverter } from "../domain/cloudsave";
import { mergeCompanionStates } from "../domain/companions/companionState";
import type { CompanionState } from "../domain/companions/companionState";
type CompanionDataUpdate = (userUid: string, cloudsave: Cloudsave, charNames: string[], serverVars: Record<string, any>, companions: CompanionState[]) => void;
export class FirestoreData {
    app: FirebaseApp;
    db: Firestore;
    realDB: Database;
    userUid: string

    charNames: string[] = [];
    companions: CompanionState[] = [];
    serverVars: Record<string, any> = {};

    onUpdateFunction: CompanionDataUpdate
    unsubscribe: Unsubscribe | undefined = undefined;

    constructor(public uid: string, app: FirebaseApp, onUpdate: CompanionDataUpdate) {
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

    getCompanions = async (): Promise<CompanionState[]> => {
        if (!this.realDB) {
            this.realDB = getDatabase(this.app);
        }
        goOnline(this.realDB);
        const dbRef = ref(this.realDB);
        try {
            const compSnapshot = await get(child(dbRef, `_comp/${this.uid}`))
            if (compSnapshot && compSnapshot.exists()) {
                const snapshotValue = compSnapshot.val();
                const records = snapshotValue && typeof snapshotValue === "object" ? snapshotValue["l"] : undefined;
                if (!Array.isArray(records)) {
                    this.companions = [];
                    return this.companions;
                }

                const parsedCompanions: CompanionState[] = [];
                records.forEach((record: unknown) => {
                    if (typeof record !== "string") {
                        return;
                    }

                    const fields = record.split(",");
                    // The game stores companion ID in field [0] and its level state in field [4].
                    const idText = fields[0]?.trim();
                    const levelText = fields[4]?.trim();
                    if (!idText || !levelText) {
                        return;
                    }

                    const id = Number(idText);
                    const rawLevel = Number(levelText);
                    if (!Number.isFinite(id) || !Number.isFinite(rawLevel)) {
                        return;
                    }

                    // If the raw level is larger than 1, than companion level 2 is unlocked.
                    parsedCompanions.push({ id, level: rawLevel >= 1 ? 2 : 1 });
                });
                this.companions = mergeCompanionStates(parsedCompanions);
            }
            else {
                this.companions = [];
            }
        }
        catch (error) {
            console.log("Failed getting companion data", error);
        }

        return this.companions;
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