import { ItemRequirementModel } from '../model/itemRequirementModel';
import { MeasurementModel } from '../model/measurementModel';
import { MeasurementTypeModel } from '../model/measurementTypeModel';

export class MeasurementBase { constructor(public index: number, public data: MeasurementModel) { } }



export const initMeasurementRepo = () => {
    return [    
        new MeasurementBase(0, <MeasurementModel>{
                "index": 0,
                "itemRequirement": <ItemRequirementModel>{"id": "3", "name": "HoleWellFill4"},
                "measurementType": <MeasurementTypeModel>{"type": "3", "name": "Tome score"},
                "description": "+{% VILLAGER EXP GAIN",
                "formula": "45TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(1, <MeasurementModel>{
                "index": 1,
                "itemRequirement": <ItemRequirementModel>{"id": "10", "name": "HoleHarpNote0"},
                "measurementType": <MeasurementTypeModel>{"type": "4", "name": "All skill lv"},
                "description": "+{% BRAVERY SWORD MAX DMG",
                "formula": "2",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(2, <MeasurementModel>{
                "index": 2,
                "itemRequirement": <ItemRequirementModel>{"id": "4", "name": "HoleWellFill5"},
                "measurementType": <MeasurementTypeModel>{"type": "6", "name": "Deathnote pts"},
                "description": "+{% BELL RING  PING RATE",
                "formula": "10",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(3, <MeasurementModel>{
                "index": 3,
                "itemRequirement": <ItemRequirementModel>{"id": "12", "name": "HoleHarpNote2"},
                "measurementType": <MeasurementTypeModel>{"type": "8", "name": "Slab Items"},
                "description": "+{% HARP NOTE GAIN",
                "formula": "6",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(4, <MeasurementModel>{
                "index": 4,
                "itemRequirement": <ItemRequirementModel>{"id": "14", "name": "HoleHarpNote4"},
                "measurementType": <MeasurementTypeModel>{"type": "1", "name": "Crops"},
                "description": "+{% DAILY LAMP WISHES",
                "formula": "80TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(5, <MeasurementModel>{
                "index": 5,
                "itemRequirement": <ItemRequirementModel>{"id": "5", "name": "HoleWellFill6"},
                "measurementType": <MeasurementTypeModel>{"type": "7", "name": "Highest DMG"},
                "description": "+{% BUCKET FILL RATE",
                "formula": "11",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(6, <MeasurementModel>{
                "index": 6,
                "itemRequirement": <ItemRequirementModel>{"id": "16", "name": "HoleHarpNote6"},
                "measurementType": <MeasurementTypeModel>{"type": "2", "name": "Account lv"},
                "description": "+{% HARP STRING EXP",
                "formula": "13",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(7, <MeasurementModel>{
                "index": 7,
                "itemRequirement": <ItemRequirementModel>{"id": "6", "name": "HoleWellFill7"},
                "measurementType": <MeasurementTypeModel>{"type": "8", "name": "Slab Items"},
                "description": "+{% VILLAGER EXP GAIN",
                "formula": "60TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(8, <MeasurementModel>{
                "index": 8,
                "itemRequirement": <ItemRequirementModel>{"id": "17", "name": "HoleHarpNote7"},
                "measurementType": <MeasurementTypeModel>{"type": "3", "name": "Tome score"},
                "description": "+{% HARP NOTE GAIN",
                "formula": "30",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(9, <MeasurementModel>{
                "index": 9,
                "itemRequirement": <ItemRequirementModel>{"id": "7", "name": "HoleWellFill8"},
                "measurementType": <MeasurementTypeModel>{"type": "0", "name": "Gloomie Kills"},
                "description": "+{% MULTIKILL PER TIER",
                "formula": "40TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(10, <MeasurementModel>{
                "index": 10,
                "itemRequirement": <ItemRequirementModel>{"id": "20", "name": "HoleJarR0"},
                "measurementType": <MeasurementTypeModel>{"type": "9", "name": "Studies done"},
                "description": "+{% RUPIE VALUE",
                "formula": "10",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(11, <MeasurementModel>{
                "index": 11,
                "itemRequirement": <ItemRequirementModel>{"id": "21", "name": "HoleJarR1"},
                "measurementType": <MeasurementTypeModel>{"type": "4", "name": "All skill lv"},
                "description": "+{% MONUMENT AFK RATE",
                "formula": "5TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(12, <MeasurementModel>{
                "index": 12,
                "itemRequirement": <ItemRequirementModel>{"id": "23", "name": "HoleJarR3"},
                "measurementType": <MeasurementTypeModel>{"type": "2", "name": "Account lv"},
                "description": "+{% JAR PRODUCE SPD",
                "formula": "30TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(13, <MeasurementModel>{
                "index": 13,
                "itemRequirement": <ItemRequirementModel>{"id": "24", "name": "HoleJarR4"},
                "measurementType": <MeasurementTypeModel>{"type": "6", "name": "Deathnote pts"},
                "description": "+{% GAMBIT POINTS",
                "formula": "10TOT",
                "formulaType": "TOT"
            }),
        new MeasurementBase(14, <MeasurementModel>{
                "index": 14,
                "itemRequirement": <ItemRequirementModel>{"id": "26", "name": "HoleJarR6"},
                "measurementType": <MeasurementTypeModel>{"type": "7", "name": "Highest DMG"},
                "description": "+{% RUPIE VALUE",
                "formula": "18",
                "formulaType": "REGULAR"
            }),
        new MeasurementBase(15, <MeasurementModel>{
                "index": 15,
                "itemRequirement": <ItemRequirementModel>{"id": "29", "name": "HoleJarR9"},
                "measurementType": <MeasurementTypeModel>{"type": "10", "name": "Golem kills"},
                "description": "+{% DROP RATE",
                "formula": "50TOT",
                "formulaType": "TOT"
            })    
]
}
