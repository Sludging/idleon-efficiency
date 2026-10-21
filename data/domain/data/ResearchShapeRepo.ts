import { ResearchPointModel } from '../model/researchPointModel';
import { ResearchShapeModel } from '../model/researchShapeModel';

export class ResearchShapeBase { constructor(public index: number, public data: ResearchShapeModel) { } }



export const initResearchShapeRepo = () => {
    return [    
        new ResearchShapeBase(0, <ResearchShapeModel>{
                "index": 0,
                "name": "Purple Diamond",
                "vertices": [
                    <ResearchPointModel>{"x": 16, "y": 0},
                    <ResearchPointModel>{"x": 32, "y": 29},
                    <ResearchPointModel>{"x": 16, "y": 59},
                    <ResearchPointModel>{"x": 0, "y": 30}
                ],
                "width": 33,
                "height": 60,
                "bonusPercent": 25,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(1, <ResearchShapeModel>{
                "index": 1,
                "name": "Blue Circle",
                "vertices": [
                    <ResearchPointModel>{"x": 29, "y": 0},
                    <ResearchPointModel>{"x": 45, "y": 5},
                    <ResearchPointModel>{"x": 55, "y": 16},
                    <ResearchPointModel>{"x": 58, "y": 28},
                    <ResearchPointModel>{"x": 54, "y": 44},
                    <ResearchPointModel>{"x": 47, "y": 52},
                    <ResearchPointModel>{"x": 31, "y": 58},
                    <ResearchPointModel>{"x": 15, "y": 54},
                    <ResearchPointModel>{"x": 4, "y": 44},
                    <ResearchPointModel>{"x": 0, "y": 30},
                    <ResearchPointModel>{"x": 3, "y": 16},
                    <ResearchPointModel>{"x": 14, "y": 4}
                ],
                "width": 59,
                "height": 59,
                "bonusPercent": 15,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(2, <ResearchShapeModel>{
                "index": 2,
                "name": "Green Microsquare",
                "vertices": [
                    <ResearchPointModel>{"x": 1, "y": 1},
                    <ResearchPointModel>{"x": 31, "y": 1},
                    <ResearchPointModel>{"x": 31, "y": 31},
                    <ResearchPointModel>{"x": 1, "y": 31}
                ],
                "width": 33,
                "height": 33,
                "bonusPercent": 50,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(3, <ResearchShapeModel>{
                "index": 3,
                "name": "Cyan Hexagon",
                "vertices": [
                    <ResearchPointModel>{"x": 17, "y": 0},
                    <ResearchPointModel>{"x": 58, "y": 0},
                    <ResearchPointModel>{"x": 75, "y": 33},
                    <ResearchPointModel>{"x": 58, "y": 67},
                    <ResearchPointModel>{"x": 17, "y": 67},
                    <ResearchPointModel>{"x": 0, "y": 34}
                ],
                "width": 76,
                "height": 68,
                "bonusPercent": 20,
                "descriptionTemplate": "+{% Research EXP per highlighted bonus"
            }),
        new ResearchShapeBase(4, <ResearchShapeModel>{
                "index": 4,
                "name": "Golden Rectangle",
                "vertices": [
                    <ResearchPointModel>{"x": 0, "y": 0},
                    <ResearchPointModel>{"x": 111, "y": 0},
                    <ResearchPointModel>{"x": 111, "y": 80},
                    <ResearchPointModel>{"x": 0, "y": 80}
                ],
                "width": 111,
                "height": 83,
                "bonusPercent": 20,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(5, <ResearchShapeModel>{
                "index": 5,
                "name": "Orange Star",
                "vertices": [
                    <ResearchPointModel>{"x": 42, "y": 0},
                    <ResearchPointModel>{"x": 53, "y": 26},
                    <ResearchPointModel>{"x": 83, "y": 29},
                    <ResearchPointModel>{"x": 63, "y": 50},
                    <ResearchPointModel>{"x": 71, "y": 80},
                    <ResearchPointModel>{"x": 42, "y": 67},
                    <ResearchPointModel>{"x": 12, "y": 80},
                    <ResearchPointModel>{"x": 20, "y": 50},
                    <ResearchPointModel>{"x": 0, "y": 29},
                    <ResearchPointModel>{"x": 30, "y": 26}
                ],
                "width": 84,
                "height": 82,
                "bonusPercent": 35,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(6, <ResearchShapeModel>{
                "index": 6,
                "name": "Maroon Triangle",
                "vertices": [<ResearchPointModel>{"x": 110, "y": 0}, <ResearchPointModel>{"x": 141, "y": 63}, <ResearchPointModel>{"x": 0, "y": 58}],
                "width": 142,
                "height": 64,
                "bonusPercent": 25,
                "descriptionTemplate": "+{% Research EXP per highlighted bonus"
            }),
        new ResearchShapeBase(7, <ResearchShapeModel>{
                "index": 7,
                "name": "White Moon",
                "vertices": [
                    <ResearchPointModel>{"x": 62, "y": 0},
                    <ResearchPointModel>{"x": 92, "y": 8},
                    <ResearchPointModel>{"x": 103, "y": 21},
                    <ResearchPointModel>{"x": 67, "y": 18},
                    <ResearchPointModel>{"x": 46, "y": 30},
                    <ResearchPointModel>{"x": 35, "y": 52},
                    <ResearchPointModel>{"x": 37, "y": 82},
                    <ResearchPointModel>{"x": 48, "y": 99},
                    <ResearchPointModel>{"x": 71, "y": 109},
                    <ResearchPointModel>{"x": 102, "y": 105},
                    <ResearchPointModel>{"x": 100, "y": 113},
                    <ResearchPointModel>{"x": 86, "y": 122},
                    <ResearchPointModel>{"x": 65, "y": 127},
                    <ResearchPointModel>{"x": 40, "y": 123},
                    <ResearchPointModel>{"x": 20, "y": 110},
                    <ResearchPointModel>{"x": 5, "y": 90},
                    <ResearchPointModel>{"x": 0, "y": 70},
                    <ResearchPointModel>{"x": 2, "y": 45},
                    <ResearchPointModel>{"x": 15, "y": 22},
                    <ResearchPointModel>{"x": 36, "y": 6}
                ],
                "width": 104,
                "height": 128,
                "bonusPercent": 30,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(8, <ResearchShapeModel>{
                "index": 8,
                "name": "Pink Heart",
                "vertices": [
                    <ResearchPointModel>{"x": 20, "y": 0},
                    <ResearchPointModel>{"x": 31, "y": 3},
                    <ResearchPointModel>{"x": 35, "y": 7},
                    <ResearchPointModel>{"x": 39, "y": 3},
                    <ResearchPointModel>{"x": 50, "y": 0},
                    <ResearchPointModel>{"x": 63, "y": 5},
                    <ResearchPointModel>{"x": 70, "y": 19},
                    <ResearchPointModel>{"x": 64, "y": 34},
                    <ResearchPointModel>{"x": 35, "y": 63},
                    <ResearchPointModel>{"x": 4, "y": 32},
                    <ResearchPointModel>{"x": 0, "y": 18},
                    <ResearchPointModel>{"x": 7, "y": 5}
                ],
                "width": 71,
                "height": 64,
                "bonusPercent": 35,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            }),
        new ResearchShapeBase(9, <ResearchShapeModel>{
                "index": 9,
                "name": "Bat Symbol",
                "vertices": [
                    <ResearchPointModel>{"x": 14, "y": 0},
                    <ResearchPointModel>{"x": 33, "y": 10},
                    <ResearchPointModel>{"x": 40, "y": 0},
                    <ResearchPointModel>{"x": 47, "y": 11},
                    <ResearchPointModel>{"x": 55, "y": 11},
                    <ResearchPointModel>{"x": 62, "y": 0},
                    <ResearchPointModel>{"x": 69, "y": 10},
                    <ResearchPointModel>{"x": 88, "y": 0},
                    <ResearchPointModel>{"x": 102, "y": 25},
                    <ResearchPointModel>{"x": 99, "y": 30},
                    <ResearchPointModel>{"x": 102, "y": 34},
                    <ResearchPointModel>{"x": 89, "y": 60},
                    <ResearchPointModel>{"x": 57, "y": 45},
                    <ResearchPointModel>{"x": 51, "y": 54},
                    <ResearchPointModel>{"x": 45, "y": 45},
                    <ResearchPointModel>{"x": 13, "y": 60},
                    <ResearchPointModel>{"x": 0, "y": 34},
                    <ResearchPointModel>{"x": 3, "y": 30},
                    <ResearchPointModel>{"x": 0, "y": 25}
                ],
                "width": 103,
                "height": 61,
                "bonusPercent": 60,
                "descriptionTemplate": "Multiplies highlighted bonuses by }x"
            })    
]
}
