export const ALL_CATEGORIES = `
  query AllCategories {
    allCategories {
      category_id
      category_name
      questions {
        question_id
        question_text
        answers {
          answer_id
          answer_text
        }
      }
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

export const INSERT_ANSWER = `
  mutation Mutation($assessmentId: Int!, $questionId: Int!, $answerId: Int!) {
    insertAnswer(assessment_id: $assessmentId, question_id: $questionId, answer_id: $answerId) {
      assessment_id
      answer_id
      question_id
    }
  }
`;
