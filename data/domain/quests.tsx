import { initNpcRepo, NpcBase } from "./data/NpcRepo";
import { Item } from "./items";
import { ItemQuestModel } from "./model/itemQuestModel";
import { QuestModel } from "./model/questModel";
import { CustomQuestModel } from './model/customQuestModel';
import { NpcModel } from "./model/npcModel";
import { QuestTypeEnum } from "./enum/questTypeEnum";
import { CustomReqModel } from "./model/customReqModel";
import { ImageData } from "./imageData";
import { range } from "../utility";
import { Domain, RawData } from "./base/domain";

// This is a terrible solution but I'm too lazy to think of a proper one.
export class QuestInformation {
    constructor(
        public ConsumeItems: boolean,
        public ItemReqs: Item[],
        public Rewards: Item[],
        public CustomArray: CustomReqModel[],
        public QuestType: QuestTypeEnum
    ) { }
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
        const toReturn: Record<string, NPC> = {};
        data.forEach(npc => {
            toReturn[npc.id] = new NPC(npc.id.replace(" (NPC)", ""), npc.data);
        });
        return toReturn;
    }
}

export class Quests extends Domain {
    npcData: Record<string, NPC> = NPC.fromBase(initNpcRepo());
    playerData: Record<number, Record<string, number>> = {}
    dialogData: Record<number, Record<string, number>> = {}

    getTotalQuestsComplete = (): number => {
        const ignoredNPCs = ["Secretkeeper", "Game Message", "Unmade Character", "FillerNPC"];
        const filteredNPCs = Object.entries(this.npcData)
            .filter(([name, info]) => !ignoredNPCs.includes(name) && Object.entries(info.data.quests).length > 0);
        let completedQuests = 0;
        const playerQuestData = this.playerData;
        filteredNPCs.forEach(([_, npc]) => {
            Object.entries(npc.data.quests).forEach(([_, info]) => {
                if (Object.entries(playerQuestData).some(playerData =>
                    playerData[1][info.QuestName.replace(/ /g, "_")] == 1)) {
                    completedQuests++;
                }
            });
        });
        return completedQuests;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "QuestComplete_", perPlayer: true, default: {} },
            { key: "QuestStatus_", perPlayer: true, default: {} },
            { key: "NPCdialogue_", perPlayer: true, default: {} },
        ]
    }
    init(allItems: Item[], _charCount: number) {
        // Foreach NPC
        Object.entries(this.npcData).forEach(([_, npc]) => {
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

        return this;
    }
    parse(data: Map<string, any>): void {
        const questsData = data.get(this.getDataKey()) as Quests;
        const charCount = data.get("charCount") as number;

        const firstPlayerStatus = data.get("QuestStatus_0") as Record<string, unknown>;
        const missingQuests = new Set<string>();
        if (charCount > 0) {
            Object.values(questsData.npcData).forEach(npc => {
                Object.values(npc.data.quests).forEach(quest => {
                    if (quest.Type !== QuestTypeEnum.Custom && quest.Type !== QuestTypeEnum.ItemsAndSpaceRequired) return;
                    const key = quest.QuestName.replace(/ /g, "_");
                    if (!Object.prototype.hasOwnProperty.call(firstPlayerStatus, key)) missingQuests.add(key);
                });
            });
        }

        range(0, charCount).forEach((_, index) => {
            const completion = { ...data.get(`QuestComplete_${index}`) as Record<string, number> };
            missingQuests.forEach(key => {
                if (!Object.prototype.hasOwnProperty.call(completion, key)) completion[key] = -1;
            });
            questsData.playerData[index] = completion;
            questsData.dialogData[index] = data.get(`NPCdialogue_${index}`) as Record<string, number>
        });

    }
}
