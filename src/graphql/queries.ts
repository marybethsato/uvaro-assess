export const ALL_CATEGORIES = `
  query AllCategories {
    allCategories {
      category_id
      category_name
      category_description
      category_image
      questions {
        question_id
        question_text
        answers {
          answer_id
          answer_text
        }
        follow_up
      }
    }
  }
`;

export const INSERT_NOTES = `
  mutation InsertNote($insertNoteAssessmentId2: Int!, $insertNoteCategoryId2: Int!, $noteText: String!) {
    insertNote(assessment_id: $insertNoteAssessmentId2, category_id: $insertNoteCategoryId2, note_text: $noteText) {
      note_text
    }
  }
`;

export const CALCULATE_LEVEL = `
  mutation CalculateLevel($assessmentId: Int!, $categoryId: Int!) {
    calculateLevel(assessment_id: $assessmentId, category_id: $categoryId) {
      category_id,
      category {
        category_name
        category_image,
        category_description
      },
      level_id,
      level_name,
      level_statement,
      required_weighting
    }
  }
`;

export const ADD_ASSESSMENT_AS_GUEST = `
  mutation AddAssessmentAsGuest {
    addAssessmentAsGuest {
      id
      start_date_time
      end_date_time
      user_id
    }
  }
`;

export const ADD_ASSESSMENT = `
  mutation Mutation {
  addAssessment {
    start_date_time
    user_id
    id
    end_date_time
  }
}
`;

export const GET_USER = `
query Query {
  getUser {
    user_id
    first_name
    last_name
    email
  }
}
`;



export const INSERT_ANSWER = `
  mutation Mutation($assessmentId: Int!, $questionId: Int!, $answerId: Int!) {
    insertAnswer(assessment_id: $assessmentId, question_id: $questionId, answer_id: $answerId) {
      assessment_id
      answer_id
      question_id
    }
  }
`;

export const END_ASSESSSMENT = `
  mutation Mutation($assessmentId: Int!) {
    endAssessment(assessment_id: $assessmentId) {
      id
      start_date_time
      end_date_time
      user_id
    }
  }
`;

export const GET_ASSESSMENT_BY_ID = `
query GetAssessmentById($getAssessmentByIdId: Int!) {
  getAssessmentById(id: $getAssessmentByIdId) {
    id,
    levels {
      category_id,
      level_name,
      level_statement
    },
    notes {
      note_text
    }
  }
}
`;

export const GET_USER_ASSESSMENTS = `
query Query {
  getUserAssessments {
    start_date_time
    notes {
      note_text
      category_id
      assessment_id
    }
    levels {
      category_id
      level_id
      level_name
      level_statement
      required_weighting
    }
    id
    end_date_time
    answers {
      answer_id
      answer_text
      question_id
      weighting
    }
    user_id
  }
}
`;
