import { TrapBoxModel } from '../model/trapBoxModel';
import { TrapBoxTimeModel } from '../model/trapBoxTimeModel';

export class TrapBoxBase { constructor(public index: number, public data: TrapBoxModel) { } }



export const initTrapBoxRepo = () => {
    return [    
        new TrapBoxBase(0, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 1200, "qtyX": 1, "expX": 1, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 3600, "qtyX": 2, "expX": 2, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 28800, "qtyX": 10, "expX": 8, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 72000, "qtyX": 20, "expX": 15, "shinyX": 0}
                ]
            }),
        new TrapBoxBase(1, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 1200, "qtyX": 1, "expX": 0, "shinyX": 2},
                    <TrapBoxTimeModel>{"time": 3600, "qtyX": 2, "expX": 0, "shinyX": 4},
                    <TrapBoxTimeModel>{"time": 28800, "qtyX": 10, "expX": 0, "shinyX": 16},
                    <TrapBoxTimeModel>{"time": 72000, "qtyX": 20, "expX": 0, "shinyX": 30},
                    <TrapBoxTimeModel>{"time": 144000, "qtyX": 35, "expX": 0, "shinyX": 50}
                ]
            }),
        new TrapBoxBase(2, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 10800, "qtyX": 5, "expX": 5, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 216000, "qtyX": 50, "expX": 40, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 432000, "qtyX": 100, "expX": 80, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 432000, "qtyX": 200, "expX": 0, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 432000, "qtyX": 0, "expX": 200, "shinyX": 0}
                ]
            }),
        new TrapBoxBase(3, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 28800, "qtyX": 0, "expX": 40, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 72000, "qtyX": 0, "expX": 75, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 158000, "qtyX": 0, "expX": 120, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 518000, "qtyX": 0, "expX": 350, "shinyX": 0}
                ]
            }),
        new TrapBoxBase(4, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 10800, "qtyX": 5, "expX": 0, "shinyX": 10},
                    <TrapBoxTimeModel>{"time": 216000, "qtyX": 50, "expX": 0, "shinyX": 80},
                    <TrapBoxTimeModel>{"time": 432000, "qtyX": 100, "expX": 0, "shinyX": 160},
                    <TrapBoxTimeModel>{"time": 72000, "qtyX": 1, "expX": 0, "shinyX": 60}
                ]
            }),
        new TrapBoxBase(5, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 3600, "qtyX": 3, "expX": 3, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 36000, "qtyX": 15, "expX": 12, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 108000, "qtyX": 40, "expX": 30, "shinyX": 0},
                    <TrapBoxTimeModel>{"time": 720000, "qtyX": 220, "expX": 200, "shinyX": 0}
                ]
            }),
        new TrapBoxBase(6, <TrapBoxModel>{
                "times": [
                    <TrapBoxTimeModel>{"time": 1200, "qtyX": 2, "expX": 0, "shinyX": 4},
                    <TrapBoxTimeModel>{"time": 3600, "qtyX": 4, "expX": 0, "shinyX": 8},
                    <TrapBoxTimeModel>{"time": 36000, "qtyX": 21, "expX": 0, "shinyX": 38},
                    <TrapBoxTimeModel>{"time": 144000, "qtyX": 70, "expX": 0, "shinyX": 125},
                    <TrapBoxTimeModel>{"time": 576000, "qtyX": 250, "expX": 0, "shinyX": 375},
                    <TrapBoxTimeModel>{"time": 2419000, "qtyX": 550, "expX": 0, "shinyX": 1150}
                ]
            })    
]
}
