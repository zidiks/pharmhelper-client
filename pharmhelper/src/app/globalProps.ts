export interface globalProps {
    symptomsData: Array<any>,
    allSymptoms: Array<any>,
    addedSymptoms: Array<any>,
    addedIDs: Set<string>,
    symptInput: string,
    activeSlide: number,
    disResult: any,
    disData: any,
    disPrev: Array<any>,
    questionSympts: Array<any>
}

export const globalProps: globalProps = {
    symptomsData: [],
    allSymptoms: [],
    addedSymptoms: [],
    addedIDs: new Set(),
    symptInput: '',
    activeSlide: 0,
    disResult: undefined,
    disData: undefined,
    disPrev: [],
    questionSympts: []
}