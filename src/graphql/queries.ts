export const ALL_CATEGORIES = `
  query AllCategories {
  allCategories {
    categoryDescription
    categoryId
    categoryImage
    categoryName
    questions {
      questionId
      questionText
      followUp
      categoryId
      answers {
        questionId
        answerText
        answerId
      }
    }
  }
}
`;

export const GET_FOLLOW_UP_QUESTIONS = `
query GetFollowUpQuestionsByCategory($categoryId: Int!) {
  getFollowUpQuestionsByCategory(categoryId: $categoryId) {
    categoryId
    followUp
    questionId
    questionText
  }
}
`;

export const INSERT_NOTES = `
  mutation InsertNote($insertNoteAssessmentId2: Int!, $insertNoteCategoryId2: Int!, $noteText: String!) {
    insertNote(assessmentId: $insertNoteAssessmentId2, categoryId: $insertNoteCategoryId2, noteText: $noteText) {
      noteText
    }
  }
`;

export const CALCULATE_LEVEL_GUEST = `
query CalculateLevel($categoryId: Int!, $answers: [GetLevelInput!]!) {
  calculateLevel(categoryId: $categoryId, answers: $answers) {
    levelId
    levelName
    levelStatement
    levelImage
    weightingId
    categoryId
  }
}
`;

export const CALCULATE_LEVEL_AUTHENTICATED = `
mutation CompleteCategory($categoryId: Int!, $assessmentId: Int!, $answers: [GetLevelInput!]!) {
  completeCategory(categoryId: $categoryId, assessmentId: $assessmentId, answers: $answers) {
    levelId
    levelName
    levelStatement
    levelImage
    weightingId
    categoryId
  }
}
`;

export const ADD_ASSESSMENT_AS_GUEST = `
  mutation AddAssessmentAsGuest {
    addAssessmentAsGuest {
      id
      startDateTime
      endDateTime
      userId
    }
  }
`;

export const ADD_ASSESSMENT = `
mutation Mutation {
  addAssessment {
    assessmentId
    endDateTime
    startDateTime
    userId
  }
}
`;

export const GET_USER = `
query GetUser {
  getUser {
    email
    firstName
    lastName
  }
}
`;



export const INSERT_ANSWER = `
  mutation Mutation($assessmentId: Int!, $questionId: Int!, $answerId: Int!) {
    insertAnswer(assessmentId: $assessmentId, questionId: $questionId, answerId: $answerId) {
      assessmentId
      answerId
      questionId
    }
  }
`;

export const END_ASSESSSMENT = `
mutation EndAssessment($assessmentId: Int!) {
  endAssessment(assessmentId: $assessmentId) {
    levelId
    levelName
    levelStatement
    levelImage
    weightingId
    categoryId
  }
}
`;

export const GET_ASSESSMENT_BY_ID = `
query GetAssessmentById($getAssessmentByIdId: Int!) {
  getAssessmentById(id: $getAssessmentByIdId) {
    id,
    levels {
      categoryId,
      levelName,
      levelStatement
    },
    notes {
      noteText
    }
  }
}
`;

export const GET_USER_ASSESSMENTS = `
query GetUserAssessments {
  getUserAssessments {
    answers {
      answerId
      answerText
      questionId
      weightingId
    }
    assessmentId
    endDateTime
    levels {
      categoryId
      levelId
      levelImage
      levelName
      levelStatement
      weightingId
    }
    notes {
      assessmentId
      categoryId
      noteText
    }
    startDateTime
    userId
  }
}
`;
