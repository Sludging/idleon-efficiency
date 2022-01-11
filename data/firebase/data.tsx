import { FirebaseApp } from "firebase/app";
import { Unsubscribe } from "firebase/auth";
import { child, Database, get, getDatabase, goOnline, ref } from "firebase/database";
import { doc, Firestore, getDoc, initializeFirestore, onSnapshot } from "firebase/firestore";
import { sendEvent } from "../../lib/gtag";
import { cloudsaveConverter } from "../domain/cloudsave";

export class FirestoreData {
    db: Firestore;
    realDB: Database;  

    charNames: string[] = [];
    serverVars: Record<string, any> = {};

    onUpdateFunction: Function
    unsubscribe: Unsubscribe | undefined = undefined;

    constructor(public uid: string, app: FirebaseApp, onUpdate: Function) {
        this.db = initializeFirestore(app, {});
        this.realDB = getDatabase(app);
        this.getServerVars();
        this.getAccountData();
        this.onUpdateFunction = onUpdate;
    }

    getAccountData = async () => {
        if (this.db?.type == "firestore") {
            if (this.charNames.length == 0 && this.realDB) {
                goOnline(this.realDB);
                const dbRef = ref(this.realDB);
                get(child(dbRef, `_uid/${this.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {
                        this.charNames = snapshot.val() as string[];
                    } else {
                        console.log("No data available");
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }

            this.unsubscribe = onSnapshot(doc(this.db, "_data", this.uid).withConverter(cloudsaveConverter),
                { includeMetadataChanges: true }, (doc) => {
                    if (doc.exists()) {
                        console.log("Firestore - Got Data");
                        const cloudsave = doc.data();
                        this.onUpdateFunction(cloudsave, this.charNames, false);
                        sendEvent({
                            action: "handle_snapshot",
                            category: "engagement",
                            label: this.uid,
                            value: 1,
                        });
                    }
                });
        }
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