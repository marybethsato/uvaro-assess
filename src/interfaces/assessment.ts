interface Assessment {
    id: number,
    start_date_time: Date,
    end_date_time: Date
    levels: Level[],
    answers: Answer[]
    notes : Note[]
}

export interface Level {
    level_name: string,
    level_id: number,
    level_statement: string,
    category_id: number
}

export interface Answer {
    answer_id: number,
    answer_text: string,
    quetion_id: number,
    weighting: number
}

interface Note {
    assessment_id: number,
    category_id : number,
    note_text: string
}

export default Assessment;