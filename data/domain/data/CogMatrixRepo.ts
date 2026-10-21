import { CogMatrixModel } from '../model/cogMatrixModel';

export class CogMatrixBase { constructor(public index: number, public data: CogMatrixModel) { } }



export const initCogMatrixRepo = () => {
    return [    
        new CogMatrixBase(0, <CogMatrixModel>{
                "matrixIndex": 0,
                "offsets": [
                    [0, 1],
                    [0, -1],
                    [1, 0],
                    [-1, 0]
                ]
            }),
        new CogMatrixBase(1, <CogMatrixModel>{
                "matrixIndex": 1,
                "offsets": [
                    [1, 1],
                    [1, -1],
                    [-1, -1],
                    [-1, 1]
                ]
            }),
        new CogMatrixBase(2, <CogMatrixModel>{
                "matrixIndex": 2,
                "offsets": [
                    [-1, 0],
                    [-2, 0],
                    [-1, 1],
                    [-1, -1],
                    [-2, 1],
                    [-2, -1]
                ]
            }),
        new CogMatrixBase(3, <CogMatrixModel>{
                "matrixIndex": 3,
                "offsets": [
                    [1, 0],
                    [2, 0],
                    [1, 1],
                    [1, -1],
                    [2, 1],
                    [2, -1]
                ]
            }),
        new CogMatrixBase(4, <CogMatrixModel>{
                "matrixIndex": 4,
                "offsets": [
                    [0, -1],
                    [0, -2],
                    [-1, -1],
                    [1, -1],
                    [-1, -2],
                    [1, -2]
                ]
            }),
        new CogMatrixBase(5, <CogMatrixModel>{
                "matrixIndex": 5,
                "offsets": [
                    [0, 1],
                    [0, 2],
                    [1, 1],
                    [-1, 1],
                    [1, 2],
                    [-1, 2]
                ]
            }),
        new CogMatrixBase(6, <CogMatrixModel>{"matrixIndex": 6, "offsets": [
                [0, 0]
            ]}),
        new CogMatrixBase(7, <CogMatrixModel>{"matrixIndex": 7, "offsets": [
                [0, 0]
            ]}),
        new CogMatrixBase(8, <CogMatrixModel>{
                "matrixIndex": 8,
                "offsets": [
                    [2, 2],
                    [2, -2],
                    [-2, 2],
                    [-2, -2]
                ]
            }),
        new CogMatrixBase(9, <CogMatrixModel>{
                "matrixIndex": 9,
                "offsets": [
                    [0, 1],
                    [0, -1],
                    [1, 0],
                    [-1, 0]
                ]
            }),
        new CogMatrixBase(10, <CogMatrixModel>{
                "matrixIndex": 10,
                "offsets": [
                    [0, 1],
                    [0, -1],
                    [1, 0],
                    [-1, 0],
                    [1, 1],
                    [1, -1],
                    [-1, -1],
                    [-1, 1],
                    [0, 2],
                    [0, -2],
                    [2, 0],
                    [-2, 0]
                ]
            })    
]
}
