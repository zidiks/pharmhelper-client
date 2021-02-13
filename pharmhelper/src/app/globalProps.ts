export interface globalProps {
    symptomsData: Array<any>,
    allSymptoms: Array<any>,
    addedSymptoms: Array<any>,
    addedIDs: Set<string>,
    symptInput: string
}

export const globalProps: globalProps = {
    symptomsData: [],
    allSymptoms: [],
    addedSymptoms: [],
    addedIDs: new Set(),
    symptInput: ''
}