import { Cloudsave } from "./cloudsave";
import { initNpcRepo, NpcBase } from "./data/NpcRepo";
import { Item } from "./items";
import { ItemQuestModel } from "./model/itemQuestModel";
import { QuestModel } from "./model/questModel";
import { CustomQuestModel } from './model/customQuestModel';
import { NpcModel } from "./model/npcModel";
import { QuestTypeEnum } from "./enum/questTypeEnum";
import { CustomReqModel } from "./model/customReqModel";
import { ImageData } from "./imageData";
import { IParser } from "./idleonData";
import { range } from "../utility";

// This is a terrible solution but I'm too lazy to think of a proper one.
export class QuestInformation {
    constructor(
        public ConsumeItems: boolean,
        public ItemReqs: Item[],
        public Rewards: Item[],
        public CustomArray: CustomReqModel[],
        public QuestType: QuestTypeEnum
    ) {}
}

const isItemQuestModel = (x: QuestModel): x is ItemQuestModel => "ItemReq" in x 
const isCustomQuestModel = (x: QuestModel): x is CustomQuestModel => "CustomArray" in x 


export class NPC {
    convertedItemReqs: Record<string, Item[]> = {};
    convertedRewards: Record<string, Item[]> = {};
    constructor(public name: string, public data: NpcModel) { }

    getImageData = (): ImageData => {
        return {
            location: this.name.replace(/ /g, "_").toLowerCase(),
            height: 50,
            width: 50
        };
    }

    getQuestInformation = (questName: string): QuestInformation => {
        const quest = this.data.quests[questName];
        if (isCustomQuestModel(quest)) {
            return new QuestInformation(
                quest.ConsumeItems,
                this.convertedItemReqs[questName],
                this.convertedRewards[questName],
                quest.CustomArray,
                quest.Type
            );
        }

        return new QuestInformation(
            quest.ConsumeItems,
            this.convertedItemReqs[questName],
            this.convertedRewards[questName],
            [],
            quest.Type
        );
    }

    static fromBase(data: NpcBase[]): Record<string, NPC> {
        var toReturn: Record<string, NPC> = {};
        data.forEach(npc => {
            toReturn[npc.id] = new NPC(npc.id.replace(" (NPC)", ""), npc.data);
        });
        return toReturn;
    }
}

export class Quests {
    npcData: Record<string, NPC> = NPC.fromBase(initNpcRepo());
    playerData: Record<number, Record<string, number>> = {}
    dialogData: Record<number, Record<string, number>> = {}
}

export const initQuests = (allItems: Item[]) => {
    const questsData = new Quests();

    // Foreach NPC
    Object.entries(questsData.npcData).forEach(([_, npc]) => {
        // For each quest under this NPC
        Object.entries(npc.data.quests).forEach(([_, quest]) => {
            // init the array.
            npc.convertedItemReqs[quest.Name!] = [];
            npc.convertedRewards[quest.Name!] = [];

            if (isItemQuestModel(quest)) {
                quest.ItemReq.forEach((item) => {
                    const theItem = allItems.find((parsedItem) => parsedItem.internalName == item.item)?.duplicate();
                    if (theItem) {
                        theItem.count = item.quantity;
                        npc.convertedItemReqs[quest.Name!].push(theItem);
                    }
                })
            }
    
            quest.Rewards.forEach((item) => {
                const theItem = allItems.find((parsedItem) => parsedItem.internalName == item.item)?.duplicate();
                if (theItem) {
                    theItem.count = item.quantity;
                    npc.convertedRewards[quest.Name!].push(theItem);
                }
            })
        });
    });

    return questsData;
}

const parseQuests: IParser = function (raw: Cloudsave, data: Map<string, any>) {
    const questsData = data.get("quests") as Quests;
    const charCount = data.get("charCount") as number;

    range(0, charCount).forEach((_, index) => {
        questsData.playerData[index] = JSON.parse(raw.get(`QuestComplete_${index}`)) as Record<string, number>
        questsData.dialogData[index] = JSON.parse(raw.get(`NPCdialogue_${index}`)) as Record<string, number>
    });

    data.set("quests", questsData);
}

export default parseQuests;