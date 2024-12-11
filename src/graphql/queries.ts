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
