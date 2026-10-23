import { LegendTalentActivationModel } from '../model/legendTalentActivationModel';
import { LegendTalentMenagerieCapSourceModel } from '../model/legendTalentMenagerieCapSourceModel';
import { LegendTalentMetadataModel } from '../model/legendTalentMetadataModel';
import { LegendTalentResearchCapSourceModel } from '../model/legendTalentResearchCapSourceModel';

export class LegendTalentMetadataBase { constructor(public index: number, public data: LegendTalentMetadataModel) { } }



export const initLegendTalentMetadataRepo = () => {
    return [    
        new LegendTalentMetadataBase(0, <LegendTalentMetadataModel>{
                "researchCapSources": [
                    <LegendTalentResearchCapSourceModel>{"researchGridIndex": 130, "talentIndices": [2, 13, 3, 18, 5]},
                    <LegendTalentResearchCapSourceModel>{"researchGridIndex": 131, "talentIndices": [9, 23, 33, 1, 16]},
                    <LegendTalentResearchCapSourceModel>{"researchGridIndex": 132, "talentIndices": [20, 31, 19, 27, 8]},
                    <LegendTalentResearchCapSourceModel>{"researchGridIndex": 152, "talentIndices": [34, 30, 29, 6, 26]}
                ],
                "menagerieCapSources": [
                    <LegendTalentMenagerieCapSourceModel>{
                        "menagerieUnlockIndex": 19,
                        "talentIndices": [
                            35,
                            33,
                            36,
                            0,
                            20,
                            31,
                            15,
                            32,
                            6
                        ],
                        "capIncrement": 3
                    }
                ],
                "activations": [
                    <LegendTalentActivationModel>{
                        "talentIndex": 40,
                        "menagerieUnlockIndex": 14,
                        "canonicalName": "Minehead My Beloved"
                    },
                    <LegendTalentActivationModel>{
                        "talentIndex": 41,
                        "menagerieUnlockIndex": 14,
                        "canonicalName": "Two Time Jelly Operation"
                    }
                ]
            })    
]
}
