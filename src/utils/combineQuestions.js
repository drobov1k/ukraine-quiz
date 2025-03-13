export const getCombinedQuestions = (questionsData) => {
  return questionsData.map((question, index) => {
    return {
      ...question,
      index: index,
    };
  });
}
