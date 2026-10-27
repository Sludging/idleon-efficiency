

export interface MapTransitionModel {
    sourceMapId: number,
    transitionIndex: number,
    transitionCode: string,
    destinationScene: string,
    destinationMapId?: number,
    requirementIndex?: number,
    initialRequirement?: number
}
