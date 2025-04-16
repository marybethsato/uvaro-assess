interface Assessment {
    assessmentId: number,
    startDateTime: Date,
    endDateTime: Date
    levels: Level[],
    answers: Answer[]
    notes : Note[]
}

export interface Level {
    levelName: string,
    levelId: number,
    levelStatement: string,
    categoryId: number
}

export interface Answer {
    answerId: number,
    answerText: string,
    questionId: number,
    weightingId: number
}

interface Note {
    assessmentId: number,
    categoryId : number,
    noteText: string
}

export default Assessment;