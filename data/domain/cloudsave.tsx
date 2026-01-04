import { DocumentData, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue } from "firebase/firestore";

export class Cloudsave {
    fields: Map<string, any> = new Map();
    constructor() {}
  
    addField = (key: string, data: object | undefined) => {
        this.fields.set(key, data);
    }

    get = (key: string) => {
        return this.fields.get(key);
    }

    fakePlayerNames = () => {
        let finalCount = 0;
        [...Array(10)].map((_, index) => {
            if (this.fields.has(`Exp0_${index}`)) {
                finalCount += 1;
            }
        });

        return [...Array(finalCount)].map((_, number) => `Player_${number}`);
    }

    toJSON = () => {
      return Object.fromEntries(this.fields);
    }

    static fromJSON = (jsonData: Map<string, any>): Cloudsave => {
        const cloudsave = new Cloudsave();
        Object.entries(jsonData).forEach(([key, keyData]) => {
            cloudsave.addField(key, keyData);
        })
        return cloudsave;
    }

  }
  
export const cloudsaveConverter = {
    toFirestore(_: WithFieldValue<Cloudsave>): DocumentData {
      return {}
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): Cloudsave {
      const data = snapshot.data(options)!;
      const cloudsave = new Cloudsave();
      Object.entries(data).forEach(([key, keyData]) => {
          cloudsave.addField(key, keyData);
      })

      return cloudsave;
    }
  };
  